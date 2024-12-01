import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/practice',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/ping',
  '/api/all',
  '/api/transform/image',
  '/api/webhooks/clerk',
  '/api/webhooks/stripe'
])
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
