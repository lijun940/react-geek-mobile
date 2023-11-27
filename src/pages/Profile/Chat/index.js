import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { getTokens } from '@/utils/storage'
import { Toast } from 'antd-mobile'
import { getUser } from '@/store/actions/profile'
const Chat = () => {
  const history = useHistory()
  const [messageList, setMessageList] = useState([])
  const [msg, setMsg] = useState('')
  const photo = useSelector((state) => state.profile.user.photo)
  let clientRef = useRef(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    const client = io('http://geek.itheima.net', {
      query: {
        token: getTokens().token,
      },
      transports: ['websocket'],
    })
    clientRef.current = client
    client.on('connect', () => {
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: '我是小智，有什么想要问我的么' },
      ])
    })
    client.on('message', (e) => {
      setMessageList((messageList) => [
        ...messageList,
        {
          type: 'robot',
          text: e.msg,
        },
      ])
    })
    return () => {
      client.close()
    }
  }, [])
  useEffect(() => {
    chatListRef.current.scrollTop =
      chatListRef.current.scrollHeight - chatListRef.current.offsetHeight
  }, [messageList])
  const chatListRef = useRef(null)
  const onKeyUp = (e) => {
    if (e.keyCode !== 13) {
      return
    }
    if (!msg) {
      return
    }
    setMessageList([
      ...messageList,
      {
        type: 'user',
        text: msg,
      },
    ])
    clientRef.current.emit('message', {
      msg,
      timestamp: Date.now(),
    })
    setMsg('')
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="fixed-header"
        // style={{ position: 'fixed', top: 0 }}
      >
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div key={index} className="chat-item">
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div key={index} className="chat-item user">
                <img
                  src={
                    photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                  }
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
