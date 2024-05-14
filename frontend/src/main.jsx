import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useSnapshot } from 'valtio'

import './styles/tailwind.css'
import App from './App'
import { mUser, mCommon } from './store'

const container = document.getElementById('root')
const root = createRoot(container)

const Good = () => {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    algorithm: null,
    token: {},
  })

  useEffect(() => {
    if (snapUser.outlined === 'sun') {
      setState({
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#262626',
        },
      })
    } else {
      setState({
        algorithm: theme.darkAlgorithm,
      })
    }
  }, [snapUser.outlined])

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: state.algorithm,
        token: state.token,
      }}
    >
      <App />
    </ConfigProvider>
  )
}

root.render(<Good />)
