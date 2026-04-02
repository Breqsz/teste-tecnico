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
  const [updatingId, setUpdatingId] = useState<number | null>(null)

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

  async function handleStatusChange(
    requestId: number,
    status: RequestItem["status"]
  ) {
    try {
      setUpdatingId(requestId)

      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar status.")
      }

      const updatedRequest = await response.json()

      setRequests((current) =>
        current.map((request) =>
          request.id === requestId
            ? { ...request, status: updatedRequest.status }
            : request
        )
      )
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingId(null)
    }
  }

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
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[request.status]}`}
                  >
                    {statusLabels[request.status]}
                  </span>

                  <select
                    value={request.status}
                    onChange={(event) =>
                      handleStatusChange(
                        request.id,
                        event.target.value as RequestItem["status"]
                      )
                    }
                    disabled={updatingId === request.id}
                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 disabled:opacity-60"
                  >
                    <option value="PENDING">Pendente</option>
                    <option value="APPROVED">Aprovado</option>
                    <option value="DENIED">Negado</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
