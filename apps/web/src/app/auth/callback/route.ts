import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { acceptInvite, authenticateWithGithub } from '@/http/api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth  code was not found.' },
      { status: 400 }
    )
  }
  const {
    data: { token },
  } = await authenticateWithGithub({ code })

  const cookie = await cookies()
  cookie.set('token', token, { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 7 days

  const inviteId = cookie.get('inviteId')?.value
  if (inviteId) {
    await acceptInvite(inviteId)

    cookie.delete('inviteId')
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
