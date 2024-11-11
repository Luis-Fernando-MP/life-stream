import { prisma } from '@/db'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  try {
    const histories = await prisma.queryHistory.findMany({
      where: { personId: id }
    })
    return NextResponse.json(histories, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { userId } = auth()

  try {
    const history = await prisma.queryHistory.create({
      data: {
        description: data,
        title: 'update',
        personId: userId
      }
    })
    return NextResponse.json({ history }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const data = await req.json()
  const { userId } = auth()

  try {
    const history = await prisma.queryHistory.delete({
      where: { id: data.id, personId: userId }
    })
    console.log(history)

    return NextResponse.json({ history }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
