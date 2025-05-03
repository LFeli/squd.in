/**
 * Represents the state of a form submission.
 *
 * @interface FormState
 * @property {boolean} success - Indicates whether the form submission was successful.
 * @property {string | null} message - A general message related to the form submission, such as a success or error notice.
 * @property {Record<string, string[]> | null} errors - An object containing validation errors keyed by field names, or null if no errors exist.
 */
export interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}
