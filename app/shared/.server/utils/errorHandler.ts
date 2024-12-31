import { Prisma } from "@prisma/client";

export const errorHandler = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        return new Response("Record not found", { status: 404 });
      case "P2002":
        return new Response("Unique constraint violation", { status: 409 });
      case "P2003":
        return new Response("Foreign key constraint failed", { status: 400 });
      case "P2026":
        return new Response("Error during data retrieval", { status: 500 });
      case "P2004":
        return new Response("Request timed out", { status: 504 });
      case "P2011":
        return new Response("Invalid database type", { status: 400 });
      default:
        return new Response("Database error", { status: 500 });
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new Response("Database error", { status: 500 });
  }

  if (error instanceof Response) {
    return error;
  }

  return new Response("Internal Server Error", { status: 500 });
};
