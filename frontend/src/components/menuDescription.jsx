import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Empty, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'
import { Parser } from 'htmlparser2'

import { mCommon, mUser } from '../store'
import { Img2base } from '../../wailsjs/go/main/App'
import { BrowserOpenURL } from '../../wailsjs/runtime/runtime'

const { confirm } = Modal

const App = () => {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({})

  useEffect(() => {
    binding()
  }, [snapCommon.htmlString])

  const binding = () => {
    const container = document.querySelectorAll('.descrition-good')[0]
    const clickableElements = container.querySelectorAll('a')

    const handleClick = (event) => {
      event.preventDefault() // 阻止默认行为(如果是链接)
      const href = event.target.dataset.href
      // 在此处添加您的自定义逻辑
      showConfirm(href)
    }

    clickableElements.forEach((element) => {
      // 检查是否已经绑定了相同的事件处理程序
      if (!element.hasOwnProperty('__clickHandlerBound')) {
        element.addEventListener('click', handleClick)
        // 标记该元素已经绑定了事件处理程序
        element.__clickHandlerBound = true
      }
    })
  }

  const showConfirm = (href) => {
    confirm({
      title: '即将离开wails-rss，请注意账号财产安全',
      icon: <ExclamationCircleFilled />,
      content: href,
      onOk() {
        BrowserOpenURL(href)
      },
      onCancel() {},
    })
  }

  const modifyHTML = (htmlString) => {
    let modifiedHTML = ''
    const parser = new Parser(
      {
        onopentag: async (tagname, attribs) => {
          let context = `<${tagname}>`
          if (tagname === 'img') {
            const good = Object.entries(attribs).map(([key, value]) => ` ${key}=${value} `)
            let soleSrc = attribs.src
            if (soleSrc.endsWith('/')) {
              soleSrc = soleSrc.substring(0, str.length - 1)
            }
            const img2base = await Img2base(soleSrc)
            if (img2base.code === 0) {
              soleSrc = 'data:image/jpeg;base64,' + img2base.data
            }
            console.log({ soleSrc })
            context = `<${tagname} src=${soleSrc} />`
          }
          if (tagname === 'a') {
            context = `<${tagname} data-href=${attribs.href}>`
          }
          modifiedHTML += context
        },
        ontext(text) {
          modifiedHTML += text
        },
        onclosetag(tagname) {
          modifiedHTML += `</${tagname}>`
        },
      },
      { decodeEntities: true },
    )

    parser.write(htmlString)
    parser.end()
    console.log({ modifiedHTML, htmlString })

    return modifiedHTML
  }

  return (
    <div className='descrition-good'>
      {snapCommon.htmlString ? (
        <div className='descrition-main'>
          {snapCommon.radioHtmlShow === '2' ? (
            <iframe
              src={snapCommon.htmlLink}
              width='100%'
              height='calc(100vh - 50px)'
              frameborder='0'
              allow='autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;'
              sandbox='allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups'
              loading='eager'
              data-hj-allow-iframe='true'
            />
          ) : (
            <div
              className={classNames('intter', {
                'intter-0': snapCommon.radioHtmlShow === '0',
                'intter-1': snapCommon.radioHtmlShow === '1',
              })}
              dangerouslySetInnerHTML={{ __html: modifyHTML(snapCommon.htmlString) }}
            />
          )}
        </div>
      ) : (
        <div className='p-10 pt-40 min-h-lvh'>
          <Empty />
        </div>
      )}
    </div>
  )
}
export default App
