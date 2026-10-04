/**
 * Ghép class name có điều kiện mà không cần thêm dependency (clsx/tailwind-merge).
 */
export type ClassValue = string | number | null | undefined | false | ClassValue[]

export function cn(...values: ClassValue[]): string {
  return values.flat().filter(Boolean).join(' ')
}
