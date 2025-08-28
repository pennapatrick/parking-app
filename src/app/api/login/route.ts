import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }

    // Criar uma sessão simples
    const response = NextResponse.json({ success: true, user: { id: user.id, username: user.username } })
    response.cookies.set('admin-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
