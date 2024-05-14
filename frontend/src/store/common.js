import { proxy } from 'valtio'

export const mCommon = proxy({
  spinning: false,
  htmlString: '',
  htmlId: '',
  htmlLink: '',
  modalFolderType: 'add',
  modalFolderKey: '',
  modalFolderValue: '',
  dropdownRssId: '',
  dropdownFolderId: '',
  radioHtmlShow: '0', // 0: 原文  1: 网页
})
