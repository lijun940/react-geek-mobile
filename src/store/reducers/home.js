import { SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST, SAVE_CHANNEL } from "../action_types/home";

const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {},
  moreAction: {
    visible: false,
    articleId: '',
    channelId: 0
  }
}

export default function reducer(state = initValue, action) {
  const {type, payload} = action
  switch (type) {
    case SAVE_CHANNEL:
      return {
        ...state,
        userChannels: payload
      }
      case SAVE_ALL_CHANNELS:
        return {
          ...state,
          allChannels: payload
        }
        case SAVE_ARTICLE_LIST:
          const {list,timestamp,loadMore,channelId} = payload
          const oldList = state.articles[channelId]?.list
        return {
          ...state,
          articles: {
            ...state.articles,
            [channelId]: {
              list:loadMore ? [...oldList,...list]: list,
              timestamp
            }
          }
        }
      case 'home/setMoreAction':
        return{
          ...state,
          moreAction: payload
        }
    default:
      return state
  }
}