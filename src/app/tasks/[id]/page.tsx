import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditTaskForm from './EditTaskForm'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EditTaskPage({ params }: PageProps) {
  const { id } = await params
  const taskId = parseInt(id)
  
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  })

  if (!task) {
    notFound()
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <EditTaskForm task={task} />
    </div>
  )
}