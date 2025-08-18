'use client'

import { useOptimistic, useTransition, useState } from 'react'
import Link from 'next/link'
import { addTask, toggleTask, deleteTask } from '@/app/_actions'

type Task = {
  id: number
  title: string
  completed: boolean
  createdAt: string | Date
}

type Props = {
  initialTasks: Task[]
  page: number
  pageSize: number
  totalPages: number
}

type OpAction =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: number; completed: boolean }
  | { type: 'delete'; id: number }
  | { type: 'patch'; id: number; title: string ; completed: boolean }
  | { type: 'update'; id: number; title: string; completed: boolean }

export default function TaskList({ initialTasks, page, pageSize, totalPages }: Props) {
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')

  const [optimisticTasks, apply] = useOptimistic<Task[], OpAction>(
    initialTasks,
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [action.task, ...state]
        case 'toggle':
          return state.map(t => (t.id === action.id ? { ...t, completed: action.completed } : t))
        case 'delete':
          return state.filter(t => t.id !== action.id)
        case 'patch':
          return state.map(t => (t.id === action.id ? { ...t, title: action.title, completed: action.completed } : t))
        case 'update':
          return state.map(t => (t.id === action.id ? { ...t, title: action.title, completed: action.completed } : t))
        default:
          return state
      }
    }
  )

  async function onAdd(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim()
    if (!title) return
    const temp: Task = {
      id: Math.floor(Math.random() * 1000000),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    apply({ type: 'add', task: temp })
    startTransition(async () => {
      await addTask(formData) // server action
    })
  }

  async function onToggle(id: number, completed: boolean) {
    apply({ type: 'toggle', id, completed })
    startTransition(async () => {
      await toggleTask(id.toString(), completed)
    })
  }

  async function onDelete(id: number) {
    apply({ type: 'delete', id })
    startTransition(async () => {
      // await deleteTask(id.toString())
      await fetch(`/api/tasks`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      })
    })
  }

  async function onPatch(id: number, title: string, completed: boolean) {
    apply({ type: 'patch', id, title, completed })
    startTransition(async () => {
      await fetch(`/api/tasks`, {
        method: 'PATCH',
        body: JSON.stringify({ id, title, completed }),
        headers: { 'Content-Type': 'application/json' },
      })
    })
  }
  async function onUpdate(id: number, title: string, completed: boolean) {
    apply({ type: 'update', id, title, completed })
    startTransition(async () => {
      await fetch(`/api/tasks`, {
        method: 'PUT',
        body: JSON.stringify({ id, title, completed }),
        headers: { 'Content-Type': 'application/json' },
      })
    })
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <form action={onAdd} className="flex gap-2">
        <input
          name="title"
          placeholder="Add a task..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="border rounded px-3 py-2">
          {isPending ? 'Adding…' : 'Add'}
        </button>
      </form>

      <ul className="space-y-2">
        {optimisticTasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 border rounded px-3 py-2">
            <form
              action={async () => onToggle(t.id, !t.completed)}
            >
              <button type="submit" aria-label="Toggle complete">
                {t.completed ? '☑' : '☐'}
              </button>
            </form>
            {editingId === t.id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => {
                  if (editTitle.trim() && editTitle !== originalTitle) {
                    onUpdate(t.id, editTitle.trim(), t.completed)
                  }
                  setEditingId(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (editTitle.trim() && editTitle !== originalTitle) {
                      onUpdate(t.id, editTitle.trim(), t.completed)
                    }
                    setEditingId(null)
                  }
                  if (e.key === 'Escape') {
                    setEditingId(null)
                  }
                }}
                className="flex-1 border rounded px-2 py-1"
                autoFocus
              />
            ) : (
              <span 
                className={`flex-1 cursor-pointer ${t.completed ? 'line-through text-gray-500' : ''}`}
                onDoubleClick={() => {
                  setEditingId(t.id)
                  setEditTitle(t.title)
                  setOriginalTitle(t.title)
                }}
              >
                {t.title}
              </span>
            )}
            <div className="ml-auto flex gap-2">
              <Link href={`/tasks/${t.id}`} className="text-sm text-blue-600">Edit</Link>
              <form action={async () => onDelete(t.id)}>
                <button type="submit" className="text-sm text-red-600">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      <nav className="flex items-center justify-center gap-4">
        <Link
          aria-disabled={page <= 1}
          className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
          href={`/?page=${page - 1}&limit=${pageSize}`}
        >
          ← Prev
        </Link>
        <span>Page {page} / {totalPages}</span>
        <Link
          aria-disabled={page >= totalPages}
          className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
          href={`/?page=${page + 1}&limit=${pageSize}`}
        >
          Next →
        </Link>
      </nav>
    </div>
  )
}
