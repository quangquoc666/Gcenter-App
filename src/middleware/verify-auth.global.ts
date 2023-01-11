export default defineNuxtRouteMiddleware(async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const token = useCookie('token') || null
  const { verifyAuth } = useAuthStore()
  await verifyAuth(token.value)
})
