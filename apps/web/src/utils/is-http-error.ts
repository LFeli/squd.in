export function isHttpError(code: number) {
  return code >= 400 && code < 500
}
