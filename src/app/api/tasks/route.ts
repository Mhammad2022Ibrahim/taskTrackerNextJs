// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   const tasks = await prisma.task.findMany();
//   return NextResponse.json(tasks);
// }

// export async function GET_BY_ID(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const task = await prisma.task.findUnique({
//   where: { id: Number(id) },
//   });
//   return NextResponse.json(task);
// }

// export async function POST(req: Request) {
//   const { title } = await req.json();
//   const task = await prisma.task.create({
//     data: { title },
//   });
//   return NextResponse.json(task);
// }

// export async function PUT(req: Request) {
//   const { id,title, completed } = await req.json();
//   const task = await prisma.task.update({
//     where: { id },
//     data: { title, completed },
//   });
//   return NextResponse.json(task);
// }

// export async function PATCH(req: Request) {
//     const { id, title, completed } = await req.json();
//     const task = await prisma.task.update({
//       where: { id },
//       data: { title, completed },
//     });
//     return NextResponse.json(task);
// }

// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   await prisma.task.delete({ where: { id } });
//   return NextResponse.json({ success: true });
// }

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(tasks)
}

export async function GET_BY_ID(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
    }
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } })
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }
    return NextResponse.json(task, { status: 200 })
}

export async function POST(req: Request) {
  const { title } = await req.json()
  const task = await prisma.task.create({ data: { title } })
  return NextResponse.json(task, { status: 201 })
}

export async function PUT(req: Request) {
  const { id, completed } = await req.json()
  const task = await prisma.task.update({ where: { id }, data: { completed: !!completed } })
  return NextResponse.json(task)
}

export async function PATCH(req: Request) {
  const { id, title, completed } = await req.json()
  const task = await prisma.task.update({ where: { id }, data: { title, completed } })
  return NextResponse.json(task)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.task.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
