export default defineNuxtRouteMiddleware(async (to) => {
  const AuthStore = useAuthStore()
  if (to.fullPath !== '/auth/login') {
    if (useCookie('token').value) {
      if (useCookie('token').value !== 'oke') {
        await AuthStore.logout()
        return navigateTo('/auth/login')
      }
    } else {
      await AuthStore.logout()
      return navigateTo('/auth/login')
    }
  }
})
