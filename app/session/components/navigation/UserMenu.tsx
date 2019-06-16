import React from 'react'
import { User } from '../../interfaces'
import LogOutLink from './LogOut'
import Dropdown, { DropdownItem } from '../../../ui/components/Dropdown'
import { Button } from '../../../ui/components'
import Link from 'next/link'

interface Props {
  user: User
}

const UserProfile = ({ user }: Props) => (
  <Dropdown label={user.displayName}>
    <DropdownItem>
      <Link href={`/settings`}>
        <Button plain icon="cog">
          Settings
        </Button>
      </Link>
    </DropdownItem>
    <DropdownItem>
      <LogOutLink></LogOutLink>
    </DropdownItem>
  </Dropdown>
)

export default UserProfile
