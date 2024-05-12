import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Modal, Input, message } from 'antd'
import { useSnapshot } from 'valtio'

import { mUser, mCommon, mUserActions } from '../store'
import { generateUUID } from '../utils'
import _ from '../utils/lodash'

const { TextArea } = Input

export default function Index(props) {
  const snapCommon = useSnapshot(mCommon)
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    value: '',
  })

  useEffect(() => {
    if (mCommon.modalFolderType === 'edit') {
      setState({
        value: mCommon.modalFolderValue,
      })
    }
  }, [])

  return (
    <>
      <Modal
        animation={true}
        title={snapCommon.modalFolderType === 'add' ? '新建文件夹' : '编辑文件夹'}
        open={true}
        maskClosable={false}
        width={550}
        onCancel={props.onCancel}
        onOk={() => {
          const value = state.value.trim()
          if (!value) {
            message.error('请输入')
            return
          }
          if (mCommon.modalFolderType === 'add') {
            mUser.folderList.push({
              key: generateUUID(),
              value,
              childrenObj: {},
            })
          }
          if (mCommon.modalFolderType === 'edit') {
            const sole = _.find(mUser.folderList, { key: mCommon.modalFolderKey })
            if (sole) {
              sole.value = value
            }
          }
          props.onCancel()
        }}
      >
        <TextArea
          placeholder='请输入文件夹名'
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
