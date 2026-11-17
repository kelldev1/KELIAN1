// Assemble des noms de classes en ignorant les valeurs vides (équivalent minimal de clsx).
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
