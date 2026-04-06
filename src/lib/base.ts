/**
 * Returns the base URL path without a trailing slash.
 * Use this for prefixing all internal links when deployed under a subpath.
 */
export function getBase(): string {
  const raw = import.meta.env.BASE_URL;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}
