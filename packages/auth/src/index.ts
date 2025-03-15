import {
  AbilityBuilder,
  type CreateAbility,
  type MongoAbility,
  createMongoAbility,
} from '@casl/ability'

import type { User } from './models/user'
import { permissions } from './permissions'

import type { ProjectSubject } from './subjects/project'
import type { UserSubject } from './subjects/user'

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()

  return ability
}
