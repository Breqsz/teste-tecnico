export type RequestStatus = "PENDING" | "APPROVED" | "DENIED"

export type RequestItem = {
  id: number
  ownerName: string
  cpf: string
  address: string
  sql: string
  type: string
  status: RequestStatus
}

export type RequestFormData = {
  ownerName: string
  cpf: string
  address: string
  sql: string
  type: string
}
