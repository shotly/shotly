import { initials } from '@dicebear/collection'
import { createAvatar as createAvatarDiceBear } from '@dicebear/core'

export function createAvatar(name: string = 'Anonymous'): string {
  const avatar = createAvatarDiceBear(initials, {
    seed: name,
    backgroundType: ['gradientLinear'],
  })

  return avatar.toDataUri()
}
