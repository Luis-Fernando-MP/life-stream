import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/practice',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/ping',
  '/api/allData',
  '/api/transform/image',
  '/api/webhooks/clerk',
  '/api/webhooks/stripe'
])
export default clerkMiddleware((auth, request) => {
  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)
  if (!isPublicRoute(request)) {
    auth().protect()
  }
  return NextResponse.next({ headers })
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
