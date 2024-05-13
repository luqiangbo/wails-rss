import { proxy } from 'valtio'

export const mCommon = proxy({
  spinning: false,
  htmlString: '',
  htmlId: '',
  modalFolderType: 'add',
  modalFolderKey: '',
  modalFolderValue: '',
  dropdownRssId: '',
  dropdownFolderId: '',
})
