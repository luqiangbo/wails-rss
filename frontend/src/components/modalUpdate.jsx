import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, message } from 'antd'

const { TextArea } = Input

export default function Index(props) {
  const [state, setState] = useSetState({
    // value: 'https://www.ithome.com/rss/',
    // value: 'https://rsshub.app/36kr/newsflashes',
    // value: 'https://feeds.feedburner.com/ruanyifeng',
    // value: 'https://feeds.feedburner.com/zhihu-daily',
    value: 'https://www.zhihu.com/rss',
  })
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    var a = 123
  }, [])

  return (
    <>
      {contextHolder}
      <Modal
        animation={true}
        title='新建订阅源'
        open={true}
        maskClosable={false}
        width={550}
        onCancel={props.onCancel}
        onOk={() => {
          if (!state.value.trim()) {
            messageApi.open({
              type: 'warning',
              content: '空',
            })
            return
          }
          props.onOk(state.value)
        }}
      >
        <TextArea
          placeholder='请输入订阅源地址, 支持RSS/ATOM/JSON/RDF'
          rows={4}
          value={state.value}
          onChange={(e) => {
            setState({
              value: e.target.value,
            })
          }}
        />
      </Modal>
    </>
  )
}
