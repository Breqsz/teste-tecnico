"use client"

import { useState } from "react"
import { ChevronDown, PlusCircle, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialForm = {
  ownerName: "",
  cpf: "",
  address: "",
  sql: "",
  type: "",
}

const workTypes = [
  "Reforma Simples",
  "Reforma com Acréscimo",
  "Alteração de Fachada",
  "Mudança de Uso",
  "Regularização",
  "Demolição Parcial",
]

export function RequestForm() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
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

      setFormData(initialForm)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClear() {
    setFormData(initialForm)
  }

  return (
    <form className="space-y-5 py-6" onSubmit={handleSubmit}>
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
            placeholder="Digite o nome completo"
          />
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
            placeholder="000.000.000-00"
          />
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
          placeholder="Rua, número, bairro - CEP"
          rows={3}
        />
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
            placeholder="000.000.0000-0"
          />
          <p className="text-xs text-muted-foreground">
            Código do imóvel conforme cadastro municipal.
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
              className="flex h-10 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
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
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row">
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
