import type { RequestFormData } from "@/features/requests/types"

export const ownerNamePattern = /^\p{L}+(?:\s+\p{L}+)*$/u
export const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
export const sqlPattern = /^\d{3}\.\d{3}\.\d{4}-\d$/

export function validateRequestField(
  name: keyof RequestFormData,
  value: string
) {
  if (name === "ownerName") {
    if (!value.trim()) {
      return "Informe o nome do proprietário."
    }

    if (!ownerNamePattern.test(value.trim())) {
      return "O nome do proprietario deve conter apenas letras e espacos."
    }

    return ""
  }

  if (name === "cpf") {
    if (!value.trim()) {
      return "Informe o CPF."
    }

    if (!cpfPattern.test(value.trim())) {
      return "CPF inválido"
    }

    return ""
  }

  if (name === "address") {
    if (!value.trim()) {
      return "Informe o endereço do imóvel."
    }

    if (value.trim().length < 10) {
      return "Endereço deve ser mais completo"
    }

    return ""
  }

  if (name === "sql") {
    if (!value.trim()) {
      return "Informe o SQL do imóvel."
    }

    if (!sqlPattern.test(value.trim())) {
      return "SQL deve estar no formato 000.000.0000-0"
    }

    return ""
  }

  if (name === "type") {
    if (!value.trim()) {
      return "Selecione o tipo de obra."
    }

    return ""
  }

  return ""
}

export function validateRequestPayload(data: RequestFormData) {
  const fields = Object.keys(data) as Array<keyof RequestFormData>

  for (const field of fields) {
    const error = validateRequestField(field, data[field])

    if (error) {
      return error
    }
  }

  return ""
}
