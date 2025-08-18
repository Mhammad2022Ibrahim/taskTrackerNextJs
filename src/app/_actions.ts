'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addTask(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  if (!title) return
  await prisma.task.create({ data: { title } })
  revalidatePath('/') // refetches data for /
}

export async function toggleTask(id: string, completed: boolean) {
  await prisma.task.update({ where: { id: parseInt(id) }, data: { completed } })
  revalidatePath('/')
}

export async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id: parseInt(id) } })
  revalidatePath('/')
}
