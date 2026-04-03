import { NextResponse } from "next/server"

import type { RequestFormData } from "@/features/requests/types"
import { validateRequestPayload } from "@/features/requests/validation"
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
    const payload: RequestFormData = {
      ownerName: body.ownerName?.trim() ?? "",
      cpf: body.cpf?.trim() ?? "",
      address: body.address?.trim() ?? "",
      sql: body.sql?.trim() ?? "",
      type: body.type?.trim() ?? "",
    }
    const status = body.status

    // Revalida no servidor
    const validationError = validateRequestPayload(payload)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const newRequest = await prisma.request.create({
      data: {
        ...payload,
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
