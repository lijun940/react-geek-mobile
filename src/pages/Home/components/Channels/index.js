import Icon from '@/components/Icon'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import differenceBy from 'lodash/differenceBy'
import { delChannel,addChannel } from '@/store/actions/home'
import { Toast } from 'antd-mobile'
const Channels = ({
  userChannles = [],
  tabActiveIndex,
  onClose,
  onChange,
  onChannelClick
}) => {
  const dispatch = useDispatch()
  const userChannels = useSelector(state => state.home.userChannels)
  const recommendChannels = useSelector(state => {
    const {userChannels, allChannels} = state.home
    return differenceBy(allChannels, userChannels, 'id')
  })
  const [isEdit, setIsEdit] = useState(false)


  useEffect(() => {
  }, [dispatch, userChannles, userChannels.length])

  const onEdit = () => setIsEdit(!isEdit)

  const onDeleteChannel = async (data, i) => {
    if(userChannels.length <= 4) {
      Toast.info('至少保留4个频道了啦')
      return
    }
    if(i === tabActiveIndex) {
      onChange(0)
    }
    if(i < tabActiveIndex) {
      onChange(tabActiveIndex - 1)
    }
    // 删除频道
    dispatch(delChannel(data))
  }

  const onAddChannel = async data => {
    const newTabs = [...userChannles, data]
    onChange(newTabs)

    // 添加频道
    dispatch(addChannel(data))
  }

  // 点击切换频道
  const onChannelItemClick = index => {
    if(isEdit) return
    onChange(index)
    onClose()
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        <div className={classnames('channel-item', isEdit ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              点击{isEdit ? '删除' : '进入'}频道
            </span>
            <span className="channel-item-edit" onClick={onEdit}>
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {userChannels.map((item, index) => (
              <span
                key={item.id}
                className={classnames(
                  'channel-list-item',
                  index === tabActiveIndex ? 'selected' : ''
                )}
                onClick={() => onChannelItemClick(index)}
              >
                {item.name}
                {
                  item.id !== 0 && (
                    <Icon
                  type="iconbtn_tag_close"
                  onClick={e => {
                    e.stopPropagation()

                    onDeleteChannel(item, index)
                  }}
                />
                  )
                }
              </span>
            ))}

            {/* <span className="channel-list-item">开发者资讯</span> */}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
            {/* <span className="channel-item-edit">编辑</span> */}
          </div>
          <div className="channel-list">
            {recommendChannels.map(item => (
              <span
                key={item.id}
                className="channel-list-item"
                onClick={() => onAddChannel(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
