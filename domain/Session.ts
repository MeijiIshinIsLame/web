import { User } from './User'

const LOCAL_STORAGE_USER_KEY = 'user'

export const storeUserInLocalStorage = (user: {
  token: string
  user: User
}) => {
  window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
}

export const loadUserFromLocalStorage = (): {
  token: string
  user: User
} | null => {
  const user = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)

  if (!user) {
    return null
  }

  return JSON.parse(user)
}
