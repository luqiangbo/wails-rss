import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'

import './tailwind.css'
import App from './App'

const container = document.getElementById('root')

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
