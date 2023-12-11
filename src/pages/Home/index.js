import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels, setMoreAction } from '@/store/actions/home'
import Icon from '@/components/Icon'
import {Drawer} from 'antd-mobile'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'
import MoreAction from '@/components/MoreAction'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch]
  )
  const [open,setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const onClose = () => {
    setOpen(false)
  }
  
  const tabs = useSelector(state => state.home.userChannels)
  return <div className={styles.root}>
    <Tabs tabs={tabs} index={active} onChange={(e) => {
      setActive(e)
      dispatch(setMoreAction({
        visible: false,
        articleId: '',
        channelId: tabs[e].id
      }))
    }}>
      {
        tabs.map(item => {
          return <ArticleList key={item.id} channelId={item.id} activeId={tabs[active].id}></ArticleList>
        })
      }
    </Tabs>
    <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel"  onClick={() => setOpen(true)}/>
      </div>
      <Drawer className='my-drawer' position='left' children={''} sidebar={open && <Channels onClose={onClose} tabActiveIndex={active} onChange={(e) => {
        setActive(e)
      }
      } />} open={open}></Drawer>
      <MoreAction/>
  </div>
}
