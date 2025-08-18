import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// This file initializes a Prisma Client instance for use in the application.
// It ensures that the Prisma Client is only instantiated once in development mode
// to avoid issues with hot reloading. In production, a new instance is created each time.
// The Prisma Client is exported for use in other parts of the application, such as API routes or server-side functions.

// Why singleton: Prisma recommends one PrismaClient instance to avoid exhausting connections 
// and other issues (even though SQLite doesn’t pool in the same way). 
