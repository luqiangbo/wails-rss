import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, message, Form, Select } from 'antd'

const { TextArea } = Input

export default function Index(props) {
  const [formBasic] = Form.useForm()
  const [state, setState] = useSetState({
    options: [
      {
        value: 'https://www.zhihu.com/rss',
        label: '知乎每日精选',
      },
      {
        value: 'https://www.ithome.com/rss/',
        label: 'ithome',
      },
      {
        value: 'https://www.ifanr.com/feed',
        label: '爱范',
      },
      {
        value: 'https://sspai.com/feed',
        label: '少数派',
      },
      {
        value: 'https://plink.anyfeeder.com/zaobao/realtime/china',
        label: '联合早报',
      },
      {
        value: 'http://feed.appinn.com/',
        label: '小众软件',
      },
      {
        value: 'http://www.geekpark.net/rss',
        label: '极客公园',
      },
      {
        value: 'https://36kr.com/feed',
        label: '36氪',
      },
    ],
  })
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {}, [])

  const onFinish = (values) => {
    console.log('Success:', values)
    props.onOk(values.name.join(','))
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
            <Select
              mode='tags'
              style={{
                width: '100%',
              }}
              tokenSeparators={[',']}
              options={state.options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
