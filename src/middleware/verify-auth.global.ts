export default defineNuxtRouteMiddleware((to) => {
  const AuthStore = useAuthStore()
  if (to.fullPath !== '/auth/login') {
    if (useCookie('token').value) {
      if (useCookie('token').value !== 'oke') {
        AuthStore.logout()
        return navigateTo('/auth/login')
      }
    } else {
      AuthStore.logout()
      return navigateTo('/auth/login')
    }
  }
})
