import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

const allowedStatus = ["PENDING", "APPROVED", "DENIED"] as const

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const requestId = Number(id)

    if (Number.isNaN(requestId)) {
      return NextResponse.json({ error: "Id inválido." }, { status: 400 })
    }

    const body = await request.json()
    const { status } = body

    if (!allowedStatus.includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 })
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status,
      },
    })

    return NextResponse.json(updatedRequest, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Não foi possível atualizar o status do pedido." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const requestId = Number(id)

    if (Number.isNaN(requestId)) {
      return NextResponse.json({ error: "Id inválido." }, { status: 400 })
    }

    await prisma.request.delete({
      where: {
        id: requestId,
      },
    })

    return NextResponse.json(
      { message: "Pedido removido com sucesso." },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: "Não foi possível remover o pedido." },
      { status: 500 }
    )
  }
}
