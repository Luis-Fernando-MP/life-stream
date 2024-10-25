import { prisma } from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  try {
    const histories = await prisma.queryHistory.findMany({
      where: { personId: id }
    })
    if (histories.length < 1) throw new Error('empty histories')
    return NextResponse.json(histories, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
