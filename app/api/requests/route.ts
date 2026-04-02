import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

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
    const { ownerName, cpf, address, sql, type, status } = body

    if (!ownerName || !cpf || !address || !sql || !type) {
      return NextResponse.json(
        { error: "Campos obrigatórios não enviados." },
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
