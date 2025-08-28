import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Proteger rotas administrativas
  if (request.nextUrl.pathname.startsWith('/vagas') || 
      request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/relatorios')) {
    
    const adminSession = request.cookies.get('admin-session')
    
    if (!adminSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/vagas/:path*', '/dashboard/:path*', '/relatorios/:path*']
}
