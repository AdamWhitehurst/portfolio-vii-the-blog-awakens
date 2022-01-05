import { NextResponse } from 'next/server'
// For Typings
//eslint-disable-next-line
import { NextRequest } from 'next/server'

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export function middleware(request) {
  // create an instance of the class to access the public methods. This uses `next()`,
  // you could use `redirect()` or `rewrite()` as well
  let response = NextResponse.next()

  if (request.nextUrl.pathname === '/.well-known/matrix/server') {
    return NextResponse.json({ 'm.server': 'matrix.adamwhitehur.st:443' })
  }

  return response
}
