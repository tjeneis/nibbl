const showDialog = ref(false)

export const useAddEntry = () => {
  const openDialog = () => {
    showDialog.value = true
  }
  
  const closeDialog = () => {
    showDialog.value = false
  }
  
  return {
    showDialog,
    openDialog,
    closeDialog
  }
}
