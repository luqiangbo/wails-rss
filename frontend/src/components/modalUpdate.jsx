import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, message } from 'antd'

export default function Index(props) {
  const [state, setState] = useSetState({
    value: '',
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
        title='添加订阅源'
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
        <Input
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
