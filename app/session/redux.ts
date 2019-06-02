import { User } from './../user/interfaces'

export const initialState = {
  token: undefined as (string | undefined),
  user: undefined as (User | undefined),
}

// Actions

export enum ActionTypes {
  SessionLogIn = '@session/sign-in',
  SessionSignOut = '@session/sign-out',
}

export interface SessionLogIn {
  type: typeof ActionTypes.SessionLogIn
  payload: {
    token: string
    user: User
  }
}

export interface SessionSignOut {
  type: typeof ActionTypes.SessionSignOut
}

export type Action = SessionLogIn | SessionSignOut

// REDUCER

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SessionLogIn:
      const payload = (action as SessionLogIn).payload
      return { ...state, token: payload.token, user: payload.user }
    case ActionTypes.SessionSignOut:
      return { ...state, token: undefined, user: undefined }
    default:
      return state
  }
}
