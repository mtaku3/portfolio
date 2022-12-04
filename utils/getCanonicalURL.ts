export function getCanonicalURL(route?: string) {
  return new URL(route || "/", process.env.NEXT_PUBLIC_URL).toString();
}
