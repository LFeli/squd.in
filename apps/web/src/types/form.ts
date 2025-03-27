export interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}
