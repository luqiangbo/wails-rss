import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import './styles/tailwind.css'
import App from './App'

const container = document.getElementById('root')

const root = createRoot(container)

root.render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      // 1. 单独使用暗色算法
      // algorithm: theme.darkAlgorithm,
      algorithm: theme.defaultAlgorithm,
    }}
  >
    <App />
  </ConfigProvider>,
)
