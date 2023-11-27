import { LOGOUT, SAVE_PROFILE, SAVE_USER } from '../action_types/profile'

const initValue = {
  user: {},
  profile: {},
}

export default function profile(state = initValue, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_USER:
      return {
        ...state,
        user: payload,
      }
    case SAVE_PROFILE:
      return {
        ...state,
        profile: payload,
      }

    default:
      break
  }
  return state
}
