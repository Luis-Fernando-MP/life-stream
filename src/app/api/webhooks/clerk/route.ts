/* eslint-disable @typescript-eslint/naming-convention */
import { create } from '@/db/actions/user'
import { WebhookEvent, auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

import UserEvent from './user.event.type'

async function handler(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Hey you!! WEBHOOK KEY NOTFOUND 🤓')
  }

  const headerPayload = headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent | UserEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  const eventType = evt.type
  try {
    if (eventType === 'user.created') {
      console.log(evt.data)
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data
      const user: User = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username ?? first_name ?? '',
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url ?? ''
      }
      const newUser = await create(user)
      return NextResponse.json({ message: 'OK', user: newUser })
    }

    if (eventType === 'user.updated') {
      const { id, image_url, first_name, last_name, username } = evt.data

      const user = {
        firstName: first_name,
        lastName: last_name,
        username: username!,
        photo: image_url
      }
      const updatedUser = await updateUser(id, user)
      return NextResponse.json({ message: 'OK', user: updatedUser })
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data
      const deletedUser = await deleteUser(id!)
      return NextResponse.json({ message: 'OK', user: deletedUser })
    }

    return new Response('Some...', { status: 200 })
  } catch (error) {
    return new Response('Internal Error', { status: 500 })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
