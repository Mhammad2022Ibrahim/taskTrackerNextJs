"use client";
import { useState } from "react";

export function AddTask() {
  const [title, setTitle] = useState("");

  async function addTask(formData: FormData) {
    const title = formData.get("title") as string;
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    setTitle("");
  }

  return (
    <form action={addTask} className="flex gap-2 mt-4">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1"
        placeholder="New task"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1">
        Add
      </button>
    </form>
  );
}

export function UpdateTask() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  async function updateTask(formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const title = formData.get("title") as string;
    const completed = formData.get("completed") === "on";
    await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify({ id, title, completed }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <form action={updateTask} className="flex gap-2 mt-4">
      <input
        type="text"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border px-2 py-1"
        placeholder="Task ID"
      />
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1"
        placeholder="New title"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit" className="bg-green-500 text-white px-3 py-1">
        Update
      </button>
    </form>
  );
}

export function PatchTask() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  async function patchTask(formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const title = formData.get("title") as string;
    const completed = formData.get("completed") === "on";
    await fetch("/api/tasks", {
      method: "PATCH",
      body: JSON.stringify({ id, title, completed }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <form action={patchTask} className="flex gap-2 mt-4">
      <input
        type="text"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border px-2 py-1"
        placeholder="Task ID"
      />
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1"
        placeholder="New title"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit" className="bg-green-500 text-white px-3 py-1">
        Update
      </button>
    </form>
  );
}

export function DeleteTask() {
  const [id, setId] = useState("");

  async function deleteTask(formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setId("");
  }

  return (
    <form action={deleteTask} className="flex gap-2 mt-4">
      <input
        type="text"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border px-2 py-1"
        placeholder="Task ID"
      />
      <button type="submit" className="bg-red-500 text-white px-3 py-1">
        Delete
      </button>
    </form>
  );
}

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

type TaskManagerProps = {
  initialTasks: Task[];
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function TaskManager({ initialTasks, page, pageSize, totalPages }: TaskManagerProps) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>
      <ul>
        {initialTasks.map((task) => (
          <li key={task.id} className="flex justify-between border-b py-2">
            <span>{task.title}</span>
            <span>{task.completed ? "✅" : "❌"}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-gray-600">
        Page {page} of {totalPages} ({initialTasks.length} tasks)
      </div>
      <AddTask />
      <UpdateTask />
      <PatchTask />
      <DeleteTask />
    </main>
  );
}