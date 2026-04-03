"use client"

import { useDeferredValue, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { RequestList } from "@/components/request-list"
import { RequestForm, type RequestItem } from "@/components/request-form"
import {
  Building2,
  FileCheck,
  FileClock,
  FileX,
  FolderOpen,
  Search,
} from "lucide-react"

const statusText = {
  PENDING: "pendente",
  APPROVED: "aprovado",
  DENIED: "negado",
}

export default function Page() {
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [notice, setNotice] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const deferredSearchTerm = useDeferredValue(searchTerm)

  useEffect(() => {
    async function loadRequests() {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await fetch("/api/requests")

        if (!response.ok) {
          throw new Error("Erro ao carregar pedidos.")
        }

        const data = await response.json()
        setRequests(data)
      } catch (error) {
        console.error(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadRequests()
  }, [])

  useEffect(() => {
    if (!notice) {
      return
    }

    const timeout = window.setTimeout(() => {
      setNotice("")
    }, 2600)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [notice])

  const stats = [
    {
      title: "Total de Pedidos",
      value: requests.length,
      icon: FolderOpen,
      className: "border-[#dbe6f3]",
    },
    {
      title: "Em Análise",
      value: requests.filter((request) => request.status === "PENDING").length,
      icon: FileClock,
      className: "border-[#f3e6bf] bg-[#fffaf0]",
    },
    {
      title: "Aprovados",
      value: requests.filter((request) => request.status === "APPROVED").length,
      icon: FileCheck,
      className: "border-[#c8f0db] bg-[#f5fdf8]",
    },
    {
      title: "Negados",
      value: requests.filter((request) => request.status === "DENIED").length,
      icon: FileX,
      className: "border-[#f7d4d4] bg-[#fff8f8]",
    },
  ]

  function handleCreated(request: RequestItem) {
    setRequests((current) => [request, ...current])
    setNotice(`Pedido de ${request.ownerName} cadastrado com sucesso`)
  }

  function handleStatusUpdated(
    updatedRequest: RequestItem,
    previousStatus: RequestItem["status"]
  ) {
    setRequests((current) =>
      current.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    )

    setNotice(
      `Alterado alvará de ${updatedRequest.ownerName} de ${statusText[previousStatus]} para ${statusText[updatedRequest.status]}`
    )
  }

  function handleDeleted(request: RequestItem) {
    setRequests((current) => current.filter((item) => item.id !== request.id))
    setNotice(`Pedido de ${request.ownerName} excluído com sucesso`)
  }

  function normalizeSearchValue(value: string) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
  }

  const normalizedSearchTerm = normalizeSearchValue(deferredSearchTerm)
  const filteredRequests = normalizedSearchTerm
    ? requests.filter((request) => {
        const searchableFields = [
          request.ownerName,
          request.cpf,
          request.address,
          request.sql,
          request.type,
          request.status,
          statusText[request.status],
        ]

        return searchableFields.some((field) =>
          normalizeSearchValue(field).includes(normalizedSearchTerm)
        )
      })
    : requests

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#eef3f8]">
      {notice ? (
        <div className="fixed top-4 right-4 z-50 rounded-lg border border-border bg-background px-4 py-3 text-sm shadow-lg">
          {notice}
        </div>
      ) : null}

      <header className="border-b bg-background shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 sm:px-6">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-6" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm leading-5 text-muted-foreground">
              Secretaria Municipal de Urbanismo e Licenciamento
            </p>
            <h1 className="text-[1.75rem] font-semibold tracking-tight">
              Gestão de pequenos alvarás
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-6 lg:py-10">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className={`rounded-xl border bg-background p-5 shadow-sm ${stat.className}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted/60 text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <section className="rounded-xl border bg-background p-5 shadow-sm sm:p-6">
          <div className="mb-6 border-b pb-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              Cadastro
            </p>
            <h2 className="mt-2">Novo Pedido de Alvará</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Preencha os dados do pedido de alvará de reforma
            </p>
          </div>

          <RequestForm onCreated={handleCreated} />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              Acompanhamento
            </p>
            <h2 className="mt-2">Pedidos Cadastrados</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Visualize, gerencie e acompanhe todos os pedidos de alvará de
              reforma cadastrados no sistema
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="border-b bg-muted/10 p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="pl-9"
                  placeholder="Buscar por nome, CPF, endereço, SQL ou tipo de obra..."
                />
              </div>
            </div>

            <RequestList
              requests={filteredRequests}
              isLoading={isLoading}
              hasError={hasError}
              emptyMessage={
                normalizedSearchTerm
                  ? "Nenhum alvara encontrado para essa busca."
                  : "Nenhum pedido cadastrado até o momento."
              }
              onStatusUpdated={handleStatusUpdated}
              onDeleted={handleDeleted}
            />
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Prefeitura Municipal de São Paulo - SMUL</p>
          <p>Sistema de Gestão de Alvarás v1.0.0</p>
        </div>
      </footer>
    </div>
  )
}
