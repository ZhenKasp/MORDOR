export const createFlashMessage = (dispatch, payload) => {
  dispatch({ type: 'CREATE_FLASH_MESSAGE', ...payload });
  setTimeout(() =>{
    dispatch({ type: 'DESTROY_FLASH_MESSAGE' });
  }, 5000);
}
