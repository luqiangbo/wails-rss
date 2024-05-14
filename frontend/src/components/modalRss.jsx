import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, Form, Radio, Select } from 'antd'

import { mUser, mCommon } from '../store'
import _ from '../utils/lodash'

export default function Index(props) {
  const [formBasic] = Form.useForm()
  const [state, setState] = useSetState({
    optionsFolder: [],
  })

  useEffect(() => {
    const { dropdownRssId, dropdownFolderId } = mCommon
    let optionsFolder = []
    mUser.folderList.forEach((u) => {
      optionsFolder.push({
        value: u.key,
        label: u.value,
      })
    })
    setState({
      optionsFolder,
    })
    const sole = _.find(mUser.folderList, { key: dropdownFolderId })
    console.log({ sole })
    if (sole) {
      const soleRss = sole.childrenObj[dropdownRssId]
      formBasic.setFieldValue('title', soleRss.title)
      formBasic.setFieldValue('link', soleRss.link)
      formBasic.setFieldValue('folder', dropdownFolderId)
    }
  }, [])

  const onFinish = (res) => {
    const { dropdownFolderId, dropdownRssId } = mCommon
    const sole = _.find(mUser.folderList, { key: dropdownFolderId })
    if (sole) {
      const soleRss = sole.childrenObj[dropdownRssId]
      soleRss.title = res.title
      console.log({ res })
      if (res.folder !== dropdownFolderId) {
        const soleNew = _.find(mUser.folderList, { key: res.folder })
        delete sole.childrenObj[dropdownRssId]
        soleNew.childrenObj[dropdownRssId] = soleRss
      }
      props.onOk()
    }
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
      <Modal
        animation={true}
        title='编辑订阅源'
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
            label='名称'
            name='title'
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
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item
            label='链接'
            name='link'
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
            <Input placeholder='请输入rss' disabled={true} />
          </Form.Item>
          <Form.Item
            label='文件夹'
            name='folder'
            rules={[
              {
                required: true,
                message: '请输入',
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
              options={state.optionsFolder}
            />
          </Form.Item>
          <Form.Item label='更新间隔' name='name'>
            <Radio.Group>
              <Radio.Button value='a'>30分钟</Radio.Button>
              <Radio.Button value='b'>1小时</Radio.Button>
              <Radio.Button value='c'>2小时</Radio.Button>
              <Radio.Button value='d'>6小时</Radio.Button>
              <Radio.Button value='d'>24小时</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
