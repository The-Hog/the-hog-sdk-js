/*
 * Runtime support for The Hog SDK.
 */

import * as z from "zod/v4-mini";
import { dlv } from "./dlv.js";

export interface Env {
  THE_HOG_ACCESS_KEY?: string | undefined;
  THE_HOG_SECRET_KEY?: string | undefined;

  THE_HOG_DEBUG?: boolean | undefined;
}

export const envSchema: z.ZodMiniType<Env, unknown> = z.object({
  THE_HOG_ACCESS_KEY: z.optional(z.string()),
  THE_HOG_SECRET_KEY: z.optional(z.string()),

  THE_HOG_DEBUG: z.optional(z.coerce.boolean()),
});

/**
 * Checks for the existence of the Deno global object to determine the environment.
 * @returns {boolean} True if the runtime is Deno, false otherwise.
 */
function isDeno() {
  if ("Deno" in globalThis) {
    return true;
  }

  return false;
}

let envMemo: Env | undefined = undefined;
/**
 * Reads and validates environment variables.
 */
export function env(): Env {
  if (envMemo) {
    return envMemo;
  }

  let envObject: Record<string, unknown> = {};
  if (isDeno()) {
    envObject = (globalThis as any).Deno?.env?.toObject?.() ?? {};
  } else {
    envObject = dlv(globalThis, "process.env") ?? {};
  }

  envMemo = envSchema.parse(envObject);
  return envMemo;
}

/**
 * Clears the cached env object. Useful for testing with a fresh environment.
 */
export function resetEnv() {
  envMemo = undefined;
}
