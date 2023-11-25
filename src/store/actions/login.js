import request from "@/utils/request";
import { setTokens } from "@/utils/storage";

export const sendCode = (mobile) => {
  return async (dispatch) => {
    return await request({
      url: `/sms/codes/${mobile}`,
      method: "get",
    });
  };
};
/**
 * 登录
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      method: "post",
      url: "/authorizations",
      data,
    });
    dispatch(saveToken(res.data.token));
    setTokens(res.data);
  };
};

export const saveToken = (payload) => {
  return {
    type: "login/token",
    payload,
  };
};
