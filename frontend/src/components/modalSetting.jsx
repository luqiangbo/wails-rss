import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, Popconfirm, Button } from 'antd'
import { useSnapshot } from 'valtio'

import { mUser, mCommon, mUserActions } from '../store'
import _ from '../utils/lodash'
import { dbClear } from '../utils/storage'

const { TextArea } = Input

export default function Index(props) {
  const snapCommon = useSnapshot(mCommon)
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    value: '',
  })

  useEffect(() => {}, [])

  return (
    <>
      <Modal
        footer={null}
        animation={true}
        title={'设置'}
        open={true}
        maskClosable={false}
        width={550}
        onCancel={props.onCancel}
        onOk={() => {
          props.onCancel()
        }}
      >
        <Popconfirm
          title='重置数据'
          description='这将导致软件恢复默认'
          onConfirm={() => {
            mUserActions.reset()
            dbClear()
          }}
          onCancel={() => {}}
          okText='确认'
          cancelText='取消'
        >
          <Button>重置数据</Button>
        </Popconfirm>
      </Modal>
    </>
  )
}
