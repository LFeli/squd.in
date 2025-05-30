/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * squd_in
 * Full-stack SaaS with multi-tenant & RBAC.
 * OpenAPI spec version: 0.0.1
 */
import type {
  CreateOrganization201,
  CreateOrganizationBody,
  GetMembership200,
  GetOrganizationDetails200,
  GetOrganizations200,
  ShutdownOrganization204,
  TransferOrganization204,
  TransferOrganizationBody,
  UpdateOrganization204,
  UpdateOrganizationBody,
} from '../api.schemas'

import { fetcher } from '../../lib/fetcher'

/**
 * @summary Get organization membership on organization
 */
export type getMembershipResponse200 = {
  data: GetMembership200
  status: 200
}

export type getMembershipResponseComposite = getMembershipResponse200

export type getMembershipResponse = getMembershipResponseComposite & {
  headers: Headers
}

export const getGetMembershipUrl = (slug: string) => {
  return `http://localhost:3333/organizations/${slug}/membership`
}

export const getMembership = async (
  slug: string,
  options?: RequestInit
): Promise<getMembershipResponse> => {
  return fetcher<getMembershipResponse>(getGetMembershipUrl(slug), {
    ...options,
    method: 'GET',
  })
}

/**
 * @summary Get details of an organization
 */
export type getOrganizationDetailsResponse200 = {
  data: GetOrganizationDetails200
  status: 200
}

export type getOrganizationDetailsResponseComposite =
  getOrganizationDetailsResponse200

export type getOrganizationDetailsResponse =
  getOrganizationDetailsResponseComposite & {
    headers: Headers
  }

export const getGetOrganizationDetailsUrl = (slug: string) => {
  return `http://localhost:3333/organizations/${slug}`
}

export const getOrganizationDetails = async (
  slug: string,
  options?: RequestInit
): Promise<getOrganizationDetailsResponse> => {
  return fetcher<getOrganizationDetailsResponse>(
    getGetOrganizationDetailsUrl(slug),
    {
      ...options,
      method: 'GET',
    }
  )
}

/**
 * @summary Update organization details
 */
export type updateOrganizationResponse204 = {
  data: UpdateOrganization204
  status: 204
}

export type updateOrganizationResponseComposite = updateOrganizationResponse204

export type updateOrganizationResponse = updateOrganizationResponseComposite & {
  headers: Headers
}

export const getUpdateOrganizationUrl = (slug: string) => {
  return `http://localhost:3333/organizations/${slug}`
}

export const updateOrganization = async (
  slug: string,
  updateOrganizationBody: UpdateOrganizationBody,
  options?: RequestInit
): Promise<updateOrganizationResponse> => {
  return fetcher<updateOrganizationResponse>(getUpdateOrganizationUrl(slug), {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateOrganizationBody),
  })
}

/**
 * @summary Shutdown organization
 */
export type shutdownOrganizationResponse204 = {
  data: ShutdownOrganization204
  status: 204
}

export type shutdownOrganizationResponseComposite =
  shutdownOrganizationResponse204

export type shutdownOrganizationResponse =
  shutdownOrganizationResponseComposite & {
    headers: Headers
  }

export const getShutdownOrganizationUrl = (slug: string) => {
  return `http://localhost:3333/organizations/${slug}`
}

export const shutdownOrganization = async (
  slug: string,
  options?: RequestInit
): Promise<shutdownOrganizationResponse> => {
  return fetcher<shutdownOrganizationResponse>(
    getShutdownOrganizationUrl(slug),
    {
      ...options,
      method: 'DELETE',
    }
  )
}

/**
 * @summary Get organizations where user is a member
 */
export type getOrganizationsResponse200 = {
  data: GetOrganizations200
  status: 200
}

export type getOrganizationsResponseComposite = getOrganizationsResponse200

export type getOrganizationsResponse = getOrganizationsResponseComposite & {
  headers: Headers
}

export const getGetOrganizationsUrl = () => {
  return `http://localhost:3333/organizations`
}

export const getOrganizations = async (
  options?: RequestInit
): Promise<getOrganizationsResponse> => {
  return fetcher<getOrganizationsResponse>(getGetOrganizationsUrl(), {
    ...options,
    method: 'GET',
  })
}

/**
 * @summary Create a new organization
 */
export type createOrganizationResponse201 = {
  data: CreateOrganization201
  status: 201
}

export type createOrganizationResponseComposite = createOrganizationResponse201

export type createOrganizationResponse = createOrganizationResponseComposite & {
  headers: Headers
}

export const getCreateOrganizationUrl = () => {
  return `http://localhost:3333/organizations`
}

export const createOrganization = async (
  createOrganizationBody: CreateOrganizationBody,
  options?: RequestInit
): Promise<createOrganizationResponse> => {
  return fetcher<createOrganizationResponse>(getCreateOrganizationUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createOrganizationBody),
  })
}

/**
 * @summary Transfer organization ownership
 */
export type transferOrganizationResponse204 = {
  data: TransferOrganization204
  status: 204
}

export type transferOrganizationResponseComposite =
  transferOrganizationResponse204

export type transferOrganizationResponse =
  transferOrganizationResponseComposite & {
    headers: Headers
  }

export const getTransferOrganizationUrl = (slug: string) => {
  return `http://localhost:3333/organizations/${slug}/owner`
}

export const transferOrganization = async (
  slug: string,
  transferOrganizationBody: TransferOrganizationBody,
  options?: RequestInit
): Promise<transferOrganizationResponse> => {
  return fetcher<transferOrganizationResponse>(
    getTransferOrganizationUrl(slug),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(transferOrganizationBody),
    }
  )
}
