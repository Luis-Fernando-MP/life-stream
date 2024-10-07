import { User } from '@prisma/client'

export function create(user: User) {
  try {
    console.log('Crafting -- ', user)
  } catch (error: any) {
    console.log(error?.message ?? error)
  }
}
