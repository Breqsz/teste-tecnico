"use client"

import { useEffect, useState } from "react"

type RequestItem = {
  id: number
  ownerName: string
  cpf: string
  address: string
  type: string
  status: "PENDING" | "APPROVED" | "DENIED"
}

const statusLabels = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  DENIED: "Negado",
}

const statusClasses = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  DENIED: "bg-red-100 text-red-700",
}

export function RequestList() {
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

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

  if (isLoading) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        Carregando pedidos...
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="px-4 py-8 text-center text-sm text-destructive">
        Não foi possível carregar os pedidos.
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        Nenhum pedido cadastrado até o momento.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/20 text-left">
            <th className="px-4 py-3 font-semibold">Nome</th>
            <th className="px-4 py-3 font-semibold">CPF</th>
            <th className="px-4 py-3 font-semibold">Endereço</th>
            <th className="px-4 py-3 font-semibold">Tipo de Obra</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b last:border-b-0">
              <td className="px-4 py-4 font-medium">{request.ownerName}</td>
              <td className="px-4 py-4 text-muted-foreground">{request.cpf}</td>
              <td className="max-w-[320px] truncate px-4 py-4 text-muted-foreground">
                {request.address}
              </td>
              <td className="px-4 py-4 text-muted-foreground">
                {request.type}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[request.status]}`}
                >
                  {statusLabels[request.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
