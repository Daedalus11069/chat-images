
import {before, create, find, on} from '../utils/JqueryWrappers'
import {isVeriosnAfter13} from '../utils/Utils'
import {removeAllFromQueue} from '../processors/FileProcessor'

const createUploadArea = (): JQuery =>
  create(`
    <div id="ci-chat-upload-area" class="hidden">
      <div class="ci-upload-area-images"></div>
      <i class="ci-clear-all fa-solid fa-trash"></i>
    </div>`)


export const initUploadArea = (sidebar: JQuery) => {
  const uploadArea = createUploadArea()

  // 1. Пытаемся вставить перед полем ввода сообщений (#chat-message)
  const chatMessage: JQuery = find('#chat-message', sidebar)
  if (chatMessage && chatMessage[0]) {
    before(chatMessage, uploadArea)
  } else {
    // 2. Затем пытаемся найти блок chat‑controls внутри сайдбара
    const selector = isVeriosnAfter13() ? '.chat-controls' : '#chat-controls'
    let chatControls = find(selector, sidebar)

    // 3. Если и в сайдбаре не нашли, ищем глобально
    if (!chatControls || !chatControls[0]) {
      chatControls = find(selector)
    }
    if (chatControls && chatControls[0]) {
      before(chatControls, uploadArea)
    }
  }

  // 4. Навешиваем обработчик на кнопку «очистить»
  const clearBtn = find('.ci-clear-all', uploadArea)
  on(clearBtn, 'click', () => removeAllFromQueue(sidebar))
}
