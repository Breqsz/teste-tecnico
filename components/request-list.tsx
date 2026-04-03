"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import type { RequestItem } from "@/components/request-form"

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

type RequestListProps = {
  requests: RequestItem[]
  isLoading: boolean
  hasError: boolean
  emptyMessage?: string
  onStatusUpdated?: (
    request: RequestItem,
    previousStatus: RequestItem["status"]
  ) => void
  onDeleted?: (request: RequestItem) => void
}

export function RequestList({
  requests,
  isLoading,
  hasError,
  emptyMessage = "Nenhum pedido cadastrado até o momento.",
  onStatusUpdated,
  onDeleted,
}: RequestListProps) {
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

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
      const previousRequest = requests.find(
        (request) => request.id === requestId
      )

      if (previousRequest) {
        onStatusUpdated?.(
          { ...previousRequest, status: updatedRequest.status },
          previousRequest.status
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleDelete(requestId: number) {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja excluir este pedido?"
    )

    if (!shouldDelete) {
      return
    }

    const deletedRequest = requests.find((request) => request.id === requestId)

    try {
      setDeletingId(requestId)

      const response = await fetch(`/api/requests/${requestId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir pedido.")
      }

      if (deletedRequest) {
        onDeleted?.(deletedRequest)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center text-sm text-muted-foreground">
        <p>Carregando pedidos...</p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center text-sm text-destructive">
        <p>Não foi possível carregar os pedidos.</p>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center text-sm text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/20 text-left">
            <th className="px-4 py-3 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Nome
            </th>
            <th className="px-4 py-3 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              CPF
            </th>
            <th className="px-4 py-3 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Endereço
            </th>
            <th className="px-4 py-3 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Tipo de Obra
            </th>
            <th className="px-4 py-3 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={request.id}
              className="border-b transition-colors last:border-b-0 hover:bg-muted/10"
            >
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
                    className={`inline-flex min-w-[86px] justify-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[request.status]}`}
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
              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(request.id)}
                  disabled={deletingId === request.id}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-60"
                >
                  <Trash2 className="size-4" />
                  {deletingId === request.id ? "Excluindo..." : "Excluir"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
