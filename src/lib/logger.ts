/*
 * Runtime support for The Hog SDK.
 */

export interface Logger {
  group(label?: string): void;
  groupEnd(): void;
  log(message: any, ...args: any[]): void;
}
