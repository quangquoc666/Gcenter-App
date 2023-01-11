export default defineNuxtRouteMiddleware(() => {
  const AuthStore = useAuthStore()
  const token = useCookie('token').value
  AuthStore.verifyAuth(token)
})
