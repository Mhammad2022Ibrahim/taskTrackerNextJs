# Task Tracker

A modern task management application built with Next.js 15, Prisma, and TypeScript. Features real-time updates, optimistic UI, and inline editing.

## Features

- ✅ Create, read, update, and delete tasks
- 🔄 Real-time optimistic updates
- ✏️ Inline editing (double-click to edit)
- 📄 Pagination support
- 🎯 Toggle task completion status
- 🔗 RESTful API with multiple HTTP methods (GET, POST, PUT, PATCH, DELETE)
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React useOptimistic hook

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Set up the database**:
```bash
npx prisma generate
npx prisma db push
```

3. **Run the development server**:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **Add Task**: Type in the input field and click "Add"
- **Toggle Completion**: Click the checkbox next to any task
- **Edit Task**: Double-click on any task title to edit inline
- **Delete Task**: Click the "Delete" button
- **Edit Page**: Click "Edit" to go to the dedicated edit page
- **Navigation**: Use pagination controls to browse tasks

## API Endpoints

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks` - Update a task
- `PATCH /api/tasks` - Partially update a task
- `DELETE /api/tasks` - Delete a task

## Project Structure

```
src/
├── app/
│   ├── api/tasks/          # API routes
│   ├── tasks/[id]/         # Dynamic task edit pages
│   ├── _actions.ts         # Server actions
│   └── page.tsx            # Main page
├── components/
│   └── task-list.tsx       # Task list component
└── lib/
    └── prisma.ts           # Prisma client
```
