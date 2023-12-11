import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function NotFound() {
  const [time,setTime] = useState(3)
  const history = useHistory()
  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time => time - 1)
    }, 1000
    )
    return () => {
      clearTimeout(timer)
    }
  }
  )
  useEffect(() => {
    if(time === 0) {
      history.push('/home')
    }
  }, [time, history]
  )
  return (
    <div>
      <h1>对不起，你访问的内容不存在...</h1>
      <p>
        {time} 秒后，返回<Link to="/home">首页</Link>
      </p>
    </div>
  )
}
