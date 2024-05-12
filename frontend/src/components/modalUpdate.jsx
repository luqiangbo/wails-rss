import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, message, Form } from 'antd'

const { TextArea } = Input

export default function Index(props) {
  const [formBasic] = Form.useForm()
  const [state, setState] = useSetState({})
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    formBasic.setFieldValue('name', 'https://www.zhihu.com/rss,https://www.ithome.com/rss/')
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values)
    props.onOk(values.name)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const validateNotAllSpaces = (rule, value, callback) => {
    if (value && /^\s+$/.test(value)) {
      callback('该字段不能全部为空格')
    } else {
      callback()
    }
  }

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
          formBasic.submit()
        }}
      >
        <Form name='basic' form={formBasic} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label=''
            name='name'
            rules={[
              {
                required: true,
                message: '请输入',
              },
              {
                validator: validateNotAllSpaces,
              },
            ]}
          >
            <TextArea placeholder='请输入订阅源地址, 支持RSS/ATOM/JSON/RDF' rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
