export const createFlashMessage = (dispatch, payload) => {
  dispatch({ type: 'CREATE_FLASH_MESSAGE', text: "", variant: "danger" })
  dispatch({ type: 'CREATE_FLASH_MESSAGE', ...payload })
}
