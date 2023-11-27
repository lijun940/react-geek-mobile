import instance from '@/utils/request'
import { LOGOUT, SAVE_PROFILE, SAVE_USER } from '../action_types/profile'
import { removeTokens } from '@/utils/storage'
export const saveUser = (payload) => {
  return {
    type: SAVE_USER,
    payload,
  }
}

/**
 * 获取用户信息
 * @returns
 */
export const getUser = () => {
  return async (dispatch) => {
    const res = await instance.get('/user')
    dispatch(saveUser(res.data))
  }
}
export const saveProfile = (payload) => {
  return {
    type: SAVE_PROFILE,
    payload,
  }
}

export const getProfile = () => {
  return async (dispatch) => {
    const res = await instance.get('/user/profile')
    dispatch(saveProfile(res.data))
  }
}

export const updateProfile = (data) => {
  return async (dispatch) => {
    await instance.patch('/user/profile', data)
    dispatch(getProfile())
  }
}

export const updatePhoto = (fd) => {
  return async (dispatch) => {
    const res = await instance.patch('/user/photo', fd)
  }
}
