'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Task = {
  id: number
  title: string
  completed: boolean
}

type Props = {
  task: Task
}

export default function EditTaskForm({ task }: Props) {
  const [title, setTitle] = useState(task.title)
  const [completed, setCompleted] = useState(task.completed)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ id: task.id, title, completed }),
      headers: { 'Content-Type': 'application/json' },
    })
    
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>
      
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button 
          type="button" 
          onClick={() => router.push('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}