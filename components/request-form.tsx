"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

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
    <form className="space-y-4 py-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="ownerName">
          Nome do Proprietário
        </label>
        <input
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          className="flex h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="cpf">
          CPF do Responsável
        </label>
        <input
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          className="flex h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="address">
          Endereço do Imóvel
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="flex w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="sql">
          SQL
        </label>
        <input
          id="sql"
          name="sql"
          value={formData.sql}
          onChange={handleChange}
          className="flex h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="type">
          Tipo de Obra
        </label>
        <input
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="flex h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <Button className="w-full" size="lg" type="submit">
        Cadastrar pedido
      </Button>
    </form>
  )
}
