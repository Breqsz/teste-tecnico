"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"

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

export function RequestForm() {
  const [formData, setFormData] = useState(initialForm)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form className="space-y-5 py-6" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ownerName">Nome do Proprietário</Label>
          <Input
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Digite o nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF do Responsável</Label>
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
        <Label htmlFor="address">Endereço do Imóvel</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Rua, número, bairro e complemento"
          rows={4}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sql">SQL</Label>
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
          <Label htmlFor="type">Tipo de Obra</Label>
          <Input
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Ex: reforma simples"
          />
        </div>
      </div>

      <div className="flex border-t border-border pt-4">
        <Button className="w-full sm:w-auto" size="lg" type="submit">
          <PlusCircle className="size-4" />
          Cadastrar pedido
        </Button>
      </div>
    </form>
  )
}
