import NavBar from "@/components/NavBar";
import React, { memo, useRef, useState } from "react";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { login, sendCode } from "@/store/actions/login";
import { Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
export default memo(function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const ref = useRef(null);
  let timer;
  const onExtraClick = async () => {
    if (time > 0) {
      return;
    }
    const res = await formik.setTouched({
      mobile: true,
    });
    if (res.mobile) {
      return;
    }
    await dispatch(sendCode(mobile));
    Toast.success("获取验证码成功", 1);
    // 开启倒计时
    setTime(60);
    timer = setInterval(() => {
      setTime((time) => {
        ref.current = time - 1;
        return time - 1;
      });
      if (ref.current === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      mobile: "15988127765",
      code: "246810",
    },
    async onSubmit(values) {
      await dispatch(login(values));
      Toast.success("登录成功");
      history.push("/home");
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("手机号不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机号格式错误"),
      code: Yup.string()
        .required("验证码不能为空")
        .matches(/^\d{6}$/, "验证码格式错误"),
    }),
  });
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    isValid,
  } = formik;
  return (
    <div className={styles.root}>
      {/* 顶部工具栏 */}
      <NavBar extra="右侧内容">登录</NavBar>
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              autoComplete="off"
              name="mobile"
              placeholder="请输入手机号"
              value={mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={11}
            />
            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              autoComplete="off"
              name="code"
              placeholder="请输入验证码"
              extra={time === 0 ? "获取验证码" : `${time}秒后`}
              onExtraClick={onExtraClick}
              value={code}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={6}
            />
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className={classNames("login-btn", { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
});
