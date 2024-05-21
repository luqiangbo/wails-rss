import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Empty } from 'antd'
import classNames from 'classnames'
import { Parser } from 'htmlparser2'

import { mCommon, mUser } from '../store'

const App = () => {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  const modifyHTML = (htmlString) => {
    let modifiedHTML = ''
    const parser = new Parser({
      onopentag: (tagname, attribs) => {
        let context = `<${tagname}>`
        if (tagname === 'img') {
          const good = Object.entries(attribs).map(([key, value]) => ` ${key}=${value} `)
          context = `<${tagname} ${good}/>`
        }
        if (tagname === 'a') {
          console.log(attribs)
          context = `<${tagname} hreg='#' >`
        }
        modifiedHTML += context
      },
      ontext(text) {
        modifiedHTML += text
      },
      onclosetag(tagname) {
        modifiedHTML += `</${tagname}>`
      },
    })

    parser.write(htmlString)
    parser.end()
    console.log({ modifiedHTML, htmlString })

    return modifiedHTML
  }

  return (
    <>
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
    </>
  )
}
export default App
