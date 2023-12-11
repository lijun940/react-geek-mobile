import { useEffect, useState } from 'react'
import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/actions/home'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile-v5'
const ArticleList = ({channelId, activeId}) => {
  const current = useSelector(state => state.home.articles[channelId])
  const [hasMore,setHasMore] = useState(true)
  // 是否正在加载数据
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if(current) return
    if(activeId === channelId) {
      dispatch(getArticleList(channelId, Date.now()))
    }
    
  }, [channelId,activeId,dispatch,current]
  )
  if(!current) {
    return null
  }
  const onRefresh = async () => {
    setHasMore(true)
    await dispatch(getArticleList(channelId, Date.now()))
  }
  const loadMore = async () => {
    if(loading) {
      return
    }
    if(channelId !== activeId) {
      return
    }
    if(!current.timestamp) {
      setHasMore(false)
      return
    }
    setLoading(true)
    
    try {
      await dispatch(getArticleList(channelId, current.timestamp,true))
    } finally {
      setLoading(false)
    }
    
  }
  
  const list = current.list
  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
      <div className="articles">
          {
            list.map(item => (
              <div className="article-item" key={item.id}>
                <ArticleItem article={item} channelId={channelId}></ArticleItem>
              </div>
            ))
          }
      </div>
      </PullToRefresh>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}
export default ArticleList
