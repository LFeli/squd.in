import { type Role, defineAbilityFor, userSchema } from '@squd-in/auth'

export function getUserPermissions(userID: string, role: Role) {
  const authUser = userSchema.parse({
    id: userID,
    role: role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}
