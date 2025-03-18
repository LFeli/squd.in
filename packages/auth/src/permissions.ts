import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (user, builder) => {
    builder.can('manage', 'all')

    builder.cannot(['transfer_ownership', 'update'], 'Organization')
    builder.can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER: (user, builder) => {
    builder.can('get', 'User')

    builder.can(['create', 'get'], 'Project')
    builder.can(['update', 'delete'], 'Project', { ownerId: user.id })
  },
  BILLING: (_, builder) => {
    builder.can('manage', 'Billing')
  },
}
