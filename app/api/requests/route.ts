import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

const ownerNamePattern = /^\p{L}+(?:\s+\p{L}+)*$/u
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
const sqlPattern = /^\d{3}\.\d{3}\.\d{4}-\d$/

export async function GET() {
  try {
    const requests = await prisma.request.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(requests, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Não foi possível listar os pedidos." },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const ownerName = body.ownerName?.trim()
    const cpf = body.cpf?.trim()
    const address = body.address?.trim()
    const sql = body.sql?.trim()
    const type = body.type?.trim()
    const status = body.status

    if (!ownerName || !cpf || !address || !sql || !type) {
      return NextResponse.json(
        { error: "Campos obrigatórios não enviados." },
        { status: 400 }
      )
    }

    // Revalida no servidor
    if (!ownerNamePattern.test(ownerName)) {
      return NextResponse.json(
        { error: "Nome do proprietário inválido." },
        { status: 400 }
      )
    }

    if (!cpfPattern.test(cpf)) {
      return NextResponse.json({ error: "CPF inválido." }, { status: 400 })
    }

    if (address.length < 10) {
      return NextResponse.json(
        { error: "Endereço do imóvel incompleto." },
        { status: 400 }
      )
    }

    if (!sqlPattern.test(sql)) {
      return NextResponse.json(
        { error: "SQL inválido." },
        { status: 400 }
      )
    }

    const newRequest = await prisma.request.create({
      data: {
        ownerName,
        cpf,
        address,
        sql,
        type,
        ...(status ? { status } : {}),
      },
    })

    return NextResponse.json(newRequest, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Não foi possível criar o pedido." },
      { status: 500 }
    )
  }
}
