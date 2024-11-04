import { createPerson, deletePerson, updatePerson } from '@/db/services/person'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Person } from '@prisma/client'
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
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data
      const person = {
        id,
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url ?? '',
        email: email_addresses[0].email_address,
        username: username ?? first_name ?? ''
      }
      const newUser = await createPerson(person as Person)
      return NextResponse.json({ message: 'OK', user: newUser })
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data
      const person = {
        id,
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url ?? '',
        email: email_addresses[0].email_address,
        username: username ?? first_name ?? ''
      }
      const updatedUser = await updatePerson(id, person as Person)
      return NextResponse.json({ message: 'OK', user: updatedUser })
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data
      if (!id) throw new Error('Missing clerk id')
      const deletedUser = await deletePerson(id)
      return NextResponse.json({ message: 'OK', user: deletedUser })
    }
  } catch (error: any) {
    console.error(error)
    return new Response('Internal Error', { status: 500 })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
