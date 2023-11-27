import { LOGOUT } from '../action_types/profile'

const initialValues = {
  token: '',
  refresh_token: '',
}
export default function reducer(state = initialValues, action) {
  const { type, payload } = action
  switch (type) {
    case 'login/token':
      return payload
    case LOGOUT:
      return {}
    default:
      return state
  }
}
