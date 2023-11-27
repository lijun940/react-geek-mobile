import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import { List, DatePicker, Drawer, Toast, Modal } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updatePhoto, updateProfile } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { logoutAction } from '@/store/actions/login'
const { Item } = List
export default function ProfileEdit() {
  const fileRef = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const profile = useSelector((state) => state.profile.profile)
  const [open, setOpen] = useState({
    visible: false,
    type: '',
  })
  const [listOpen, setListOpen] = useState({
    visible: false,
    type: '',
  })
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {},
      },
      {
        title: '本地选择',
        onClick: () => {
          fileRef.current.click()
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          onCommit('gender', 0)
        },
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 1)
        },
      },
    ],
  }
  const onClose = () => {
    setOpen({
      visible: false,
      type: '',
    })
    setListOpen({
      visible: false,
      type: '',
    })
  }
  const logout = () => {
    Modal.alert('温馨提示', '你确定要退出么', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          dispatch(logoutAction())
          history.replace('/login')
        },
      },
    ])
  }

  const onBirthChange = (e) => {
    onCommit('birthday', dayjs(e).format('YYYY-MM-DD'))
  }

  const onCommit = (type, value) => {
    dispatch(
      updateProfile({
        [type]: value,
      })
    )
    Toast.success('修改成功', 1, null, false)
    onClose()
  }
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('photo', file)
    await dispatch(updatePhoto(fd))
    Toast.success('修改头像成功')
    onClose()
  }
  return (
    <div className={styles.root}>
      <div className="content">
        <NavBar>个人信息</NavBar>
        <div className="wrapper">
          <List className="profile-list">
            <Item
              arrow="horizontal"
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: 'photo',
                })
              }}
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
            >
              头像
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'name',
                })
              }}
              extra={profile.name}
            >
              昵称
            </Item>
            <Item
              arrow="horizontal"
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'intro',
                })
              }}
              extra={
                <span
                  className={classNames('intro', profile.intro ? 'normal' : '')}
                >
                  {profile.intro || '未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>
          <List className="profile-list">
            <Item
              extra={profile.gender === 1 ? '女' : '男'}
              arrow="horizontal"
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: 'gender',
                })
              }}
            >
              性别
            </Item>
            <DatePicker
              value={new Date(profile.birthday)}
              onChange={onBirthChange}
              mode="date"
              title="选择生日"
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
            >
              <Item extra={'2020-02-02'} arrow="horizontal">
                生日
              </Item>
            </DatePicker>
          </List>
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />
          <div className="logout" onClick={logout}>
            <button className="btn">退出登录</button>
          </div>
        </div>
      </div>
      <Drawer
        position="right"
        className="drawer"
        sidebar={
          open.visible && (
            <EditInput onClose={onClose} type={open.type} onCommit={onCommit} />
          )
        }
        open={open.visible}
        children={''}
      ></Drawer>
      <Drawer
        position="bottom"
        className="drawer-list"
        sidebar={
          listOpen.visible && (
            <EditList
              config={config}
              onClose={onClose}
              type={listOpen.type}
            ></EditList>
          )
        }
        open={listOpen.visible}
        onOpenChange={() => onClose()}
      ></Drawer>
    </div>
  )
}
