import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Tiny, consistent JSON helpers for API routes.

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(message: string, status = 400, extra?: unknown) {
  return NextResponse.json(
    { success: false, error: message, ...(extra ? { details: extra } : {}) },
    { status },
  );
}

/** Turn any thrown error (incl. ZodError) into a clean JSON response. */
export function handleError(err: unknown) {
  if (err instanceof ZodError) {
    return fail("Validation failed", 422, err.flatten());
  }
  console.error("[api] unexpected error:", err);
  const message =
    err instanceof Error ? err.message : "Unexpected server error";
  return fail(message, 500);
}
