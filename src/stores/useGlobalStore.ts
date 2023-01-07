export const useGlobalStore = defineStore('global', () => {
  const globalState = ref('Global state')
  return { globalState }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
