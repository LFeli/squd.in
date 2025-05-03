import { redirect } from 'next/navigation'

/**
 * This route is used solely to support intercepted routing in Next.js.
 *
 * When accessed, it immediately redirects the user to the create organization page.
 * The intercepted route mechanism relies on having an actual route file,
 * even if it's just a redirect.
 *
 * Redirect target: /create-organization
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
 */
export default async function CreateOrganizationRoute() {
  redirect('/')
}
