import NavBar from '@/components/NavBar'
import React, { memo } from 'react'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
export default memo(function Login(props) {
  const onExtraClick = () => {
    
  }
  const formik = useFormik({
    initialValues: {
      mobile: '13911111111',
      code: '123456'
    },
    onSubmit(values) {
      console.log(values)
    }
  })
  const {values:{mobile, code}, handleChange,handleSubmit} = formik
  return (
    <div className={styles.root}>
      {/* 顶部工具栏 */}
      <NavBar extra='右侧内容' >
        登录
      </NavBar>
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input autoComplete='off' name='mobile' placeholder='请输入手机号' value={mobile} onChange={handleChange}/>
            <div className="validate">手机号验证错误</div>
          </div>
          <div className="input-item">
            <Input autoComplete='off' name='code' placeholder='请输入验证码' extra='获取验证码' onExtraClick={onExtraClick}
              value={code} onChange={handleChange}
            />
            <div className="validate">验证码错误</div>
          </div>
          <button type='submit' className='login-btn'>
            登录
          </button>
        </form>
      </div>
    </div>
  )
})
