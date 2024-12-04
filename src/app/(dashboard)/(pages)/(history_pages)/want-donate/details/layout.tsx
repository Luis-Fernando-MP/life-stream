import { prisma } from '@/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = async ({ children }: ILayout) => {
  const { userId } = auth()
  if (!userId) redirect('/')
  const person = await prisma.person.findUnique({
    where: { id: userId },
    include: { bloodDonor: true }
  })
  if (!person) redirect('/')
  const isDonor = person.bloodDonor.length < 1
  if (isDonor) redirect('/want-donate')
  return <>{children}</>
}

export default Layout
