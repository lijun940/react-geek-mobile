import Icon from '@/components/Icon'
import { Modal, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { setMoreAction, unLikeArticle,reportArticle } from '@/store/actions/home'
const list = [
  {
    id: 0, title: '其他问题'
  },
  {
    id: 1, title: '标题夸张'
  },
  {
    id: 2, title: '低俗色情'
  },
  {
    id: 3, title: '错别字多'
  },
  {
    id: 4, title: '旧闻重复'
  },
  {
    id: 5, title: '广告软文'
  },
  {
    id: 6, title: '内容不适'
  },
  {
    id: 7, title: '涉嫌违法犯罪'
  },
  {
    id: 8, title: '侵权'
  },
]
// feedbackType: normal / junk
const MoreAction = () => {
  const dispatch = useDispatch()
  const { visible,articleId } = useSelector(state => state.home.moreAction)
  // junk / normal
  const [feedbackType, setFeedbackType] = useState('normal')
  const unLike = async () => {
    await dispatch(unLikeArticle(articleId))
    onClose()
    Toast.info('拉黑成功')
  }
  const report = async (id) => {
    await dispatch(reportArticle(articleId, id))
    onClose()
    Toast.info('举报成功')
  }
  
  const onClose = () => {
    dispatch(
      setMoreAction({
        articleId: 0,
        visible: false
      })
    )
    setFeedbackType('normal')
  }

  return (
    <div className={styles.root}>
      <Modal
        title=""
        footer={[]}
        transparent
        maskClosable
        visible={visible}
        onClose={onClose}
        className="more-action-modal"
      >
        <div className="more-action">
          {feedbackType === 'normal' ? (
            <>
              <div className="action-item" onClick={unLike}>
                <Icon type="iconicon_unenjoy1" />
                不感兴趣
              </div>
              <div
                className="action-item"
                onClick={() => setFeedbackType('junk')}
              >
                <Icon type="iconicon_feedback1" />
                <span className="text">反馈垃圾内容</span>
                <Icon type="iconbtn_right" />
              </div>
              <div className="action-item">
                <Icon type="iconicon_blacklist" />
                拉黑作者
              </div>
            </>
          ) : (
            <>
              <div
                className="action-item"
                onClick={() => setFeedbackType('normal')}
              >
                <Icon type="iconfanhui" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              {
                list.map(item => <div className="action-item" onClick={() => {
                  report(item.id)
                }
                } key={item.id}>{item.title}</div>)
              }
              
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default MoreAction
