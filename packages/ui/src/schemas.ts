import { z } from 'zod'

export const ComboboxOptionSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string(),
  disabled: z.boolean().optional(),
})

export type ComboboxOption = z.infer<typeof ComboboxOptionSchema>

export const BreadcrumbItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  current: z.boolean().optional(),
})

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>
