"use client"

import { useState } from "react"
import { ChevronDown, PlusCircle, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { workTypes } from "@/features/requests/constants"
import type { RequestFormData, RequestItem } from "@/features/requests/types"
import { formatCpf, formatSql } from "@/features/requests/utils"
import { validateRequestField } from "@/features/requests/validation"

const initialForm: RequestFormData = {
  ownerName: "",
  cpf: "",
  address: "",
  sql: "",
  type: "",
}

type RequestFormProps = {
  onCreated?: (request: RequestItem) => void
}

export function RequestForm({ onCreated }: RequestFormProps) {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name } = event.target
    let { value } = event.target

    if (name === "cpf") {
      value = formatCpf(value)
    }

    if (name === "sql") {
      value = formatSql(value)
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!touched[name]) {
        return current
      }

      const nextErrors = { ...current }

      const error = validateRequestField(name as keyof RequestFormData, value)

      if (error) {
        nextErrors[name] = error
      } else {
        delete nextErrors[name]
      }

      return nextErrors
    })
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {}
    const fields = Object.keys(formData) as Array<keyof RequestFormData>

    // Valida todos campos
    fields.forEach((field) => {
      const error = validateRequestField(field, formData[field])

      if (error) {
        nextErrors[field] = error
      }
    })

    setErrors(nextErrors)
    setTouched({
      ownerName: true,
      cpf: true,
      address: true,
      sql: true,
      type: true,
    })

    return Object.keys(nextErrors).length === 0
  }

  function handleBlur(name: string) {
    setTouched((current) => ({
      ...current,
      [name]: true,
    }))

    const error = validateRequestField(
      name as keyof RequestFormData,
      formData[name as keyof RequestFormData]
    )

    setErrors((current) => {
      const nextErrors = { ...current }

      if (error) {
        nextErrors[name] = error
      } else {
        delete nextErrors[name]
      }

      return nextErrors
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Envia novo pedido
      setIsSubmitting(true)

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerName: formData.ownerName,
          cpf: formData.cpf,
          address: formData.address,
          sql: formData.sql,
          type: formData.type,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar pedido.")
      }

      const newRequest = await response.json()

      setFormData(initialForm)
      setErrors({})
      setTouched({})
      onCreated?.(newRequest)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClear() {
    setFormData(initialForm)
    setErrors({})
    setTouched({})
  }

  return (
    <form className="space-y-6 py-2" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ownerName">
            Nome do Proprietário <span className="text-destructive">*</span>
          </Label>
          <Input
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            onBlur={() => handleBlur("ownerName")}
            placeholder="Digite o nome completo"
            aria-invalid={Boolean(errors.ownerName)}
          />
          {errors.ownerName ? (
            <p className="text-sm text-destructive">{errors.ownerName}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">
            CPF do Responsável <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            onBlur={() => handleBlur("cpf")}
            placeholder="000.000.000-00"
            aria-invalid={Boolean(errors.cpf)}
          />
          {errors.cpf ? (
            <p className="text-sm text-destructive">{errors.cpf}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Endereço do Imóvel <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={() => handleBlur("address")}
          placeholder="Rua, número, bairro - CEP"
          rows={3}
          aria-invalid={Boolean(errors.address)}
        />
        {errors.address ? (
          <p className="text-sm text-destructive">{errors.address}</p>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sql">
            SQL do Imóvel <span className="text-destructive">*</span>
          </Label>
          <Input
            id="sql"
            name="sql"
            value={formData.sql}
            onChange={handleChange}
            onBlur={() => handleBlur("sql")}
            placeholder="000.000.0000-0"
            aria-invalid={Boolean(errors.sql)}
          />
          {errors.sql ? (
            <p className="text-sm text-destructive">{errors.sql}</p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Setor-Quadra-Lote (SQL) conforme cadastro municipal
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">
            Tipo de Obra <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              onBlur={() => handleBlur("type")}
              aria-invalid={Boolean(errors.type)}
              className={`flex h-10 w-full appearance-none rounded-lg border bg-background px-3 py-2 pr-10 text-sm text-foreground transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 ${
                errors.type ? "border-destructive" : "border-input"
              }`}
            >
              <option value="">Selecione o tipo de obra</option>
              {workTypes.map((workType) => (
                <option key={workType} value={workType}>
                  {workType}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          {errors.type ? (
            <p className="text-sm text-destructive">{errors.type}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
        <Button
          className="w-full sm:w-auto"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          <PlusCircle className="size-4" />
          {isSubmitting ? "Cadastrando..." : "Cadastrar pedido"}
        </Button>
        <Button
          className="w-full sm:w-auto"
          size="lg"
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={isSubmitting}
        >
          <RotateCcw className="size-4" />
          Limpar formulário
        </Button>
      </div>
    </form>
  )
}
