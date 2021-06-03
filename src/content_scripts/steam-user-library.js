import { injectStyleFile } from '../common/utility'
import { staticContentHandler } from '../libs/builders/steam-builder'
import { CONTENT_SCRIPT_MESSAGE, CONTENT_SCRIPT_MESSAGE_STYLE } from '../common/constants'

console.log(CONTENT_SCRIPT_MESSAGE, CONTENT_SCRIPT_MESSAGE_STYLE)
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver

const init = async () => {
  // inject style file
  injectStyleFile('./assets/styles/index.css')

  const observer = new MutationObserver(async () => {
    await staticContentHandler({
      contentSelector: '#games_list_rows',
      itemSelector: '.gameListRow:not(.cgl-applied)',
      dataAttributeKey: 'id'
    })
    const rows = document.querySelectorAll('#games_list_rows .gameListRow:not(.cgl-applied)')
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index]
      row.classList.add('cgl-applied')
    }
  })
  const rootElement = document.querySelector('#games_list_rows')

  observer.observe(rootElement, {
    childList: true
  })
}

init()
