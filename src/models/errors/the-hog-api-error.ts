/*
 * Runtime support for The Hog SDK.
 */

export class TheHogAPIError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly response: Response,
    readonly body: unknown,
    readonly requestId?: string,
  ) {
    super(message);
    this.name = "TheHogAPIError";
  }
}
