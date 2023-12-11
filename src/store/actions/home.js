import instance from "@/utils/request"
import { SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST, SAVE_CHANNEL } from "../action_types/home"
import { getLocalChannels, isAuth, setLocalChannels } from "@/utils/storage"

/**
 * 获取用户频道
 * @returns 
 */
export const getUserChannels = () => {
  return async dispatch => {
    // 是否登录
    if(isAuth()) {
      const res = await instance.get('/user/channels')
      dispatch(saveUserChannels(res.data.channels))
    } else {
      const channels = getLocalChannels()
      if(channels) {
        dispatch(saveUserChannels(channels))
      } else {
        const res = await instance.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        setLocalChannels(res.data.channels)
      }
    }
    
  }
}
export const saveUserChannels = (payload) => {
  return {
    type: SAVE_CHANNEL,
    payload
  }
}
export const getAllChannels =  () => {
  return async dispatch => {
    const res = await instance.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
  
}
export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload
  }
}
export const delChannel = (channel) => {
  
  return async (dispatch,getState) => {
    const userChannels = getState().home.userChannels
    if(isAuth()) {
      await instance.delete('/user/channels/' + channel.id)
      dispatch(saveUserChannels(userChannels.filter(item => item.id !== channel.id)))
    }else {
      const result = userChannels.filter(item => item.id !== channel.id)
      dispatch(saveUserChannels(result))
      setLocalChannels(result)
    }
  }
}
export const addChannel = (channel) => {
  return async (dispatch,getState) => {
    const channels = [
      ...getState().home.userChannels,
      channel
    ]
    if(isAuth()) {
      await instance.patch('/user/channels', {
        channels: [channel]
      })
      dispatch(saveUserChannels(channels))
    } else {
      dispatch(saveUserChannels(channels))
      setLocalChannels(channels)
    }
  }
}

export const getArticleList = (channelId, timestamp,loadMore = false) => {
  return async dispatch => {
    const res = await instance({
      url: '/articles',
      method: 'get',
      params: {
        channel_id: channelId,
        timestamp
      }
    })
    
      dispatch(setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
        loadMore
      }))
    
  }
}
export const setArticleList = (payload) => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload
  }
}

export const setMoreAction = (payload) => {
  return {
    type: 'home/setMoreAction',
    payload
  }
}
export const unLikeArticle = (articleId) => {
  return async (dispatch, getState) => {
    await instance({
      method: 'post',
      url: '/article/dislikes',
      data: {
        target: articleId
      }
    })
    const channelId = getState().home.moreAction.channelId
    console.log(channelId)
    const articles = getState().home.articles[channelId]
    console.log(getState())
    dispatch(setArticleList({
      channelId,
      timestamp: articles.timestamp,
      list: articles.list.filter(item => item.art_id !== articleId)
    }))
  }
}

export const reportArticle = (articleId, reportId) => {
  return async (dispatch, getState) => {
    await instance({
      method: 'post',
      url: '/article/reports',
      data: {
        target: articleId,
        type: reportId
      }
    })
    const channelId = getState().home.moreAction.channelId
    const articles = getState().home.articles[channelId]
    dispatch(setArticleList({
      channelId,
      timestamp: articles.timestamp,
      list: articles.list.filter(item => item.art_id !== articleId)
    }))
  }
}


