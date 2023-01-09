import type { User } from '@supabase/gotrue-js/src/lib/types'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig().public
  const supabase = useSupabase()

  const authError = ref<any>(null)
  const user = ref<User | null>(null)

  const isAuthenticated = (): boolean => {
    return !!user.value
  }

  supabase.auth.onAuthStateChange((_e, session) => {
    user.value = session?.user || null
  })

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${config.BASE_URL}/user/profile` },
    })
    if (error) {
      authError.value = error
    }
  }

  const login = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {},
    })
    if (error) authError.value = error
    if (session?.user) user.value = session.user
  }

  const purgeAuth = async () => {
    await supabase.auth.signOut()
    user.value = null
    authError.value = null
  }

  const logout = () => {
    purgeAuth()
  }

  return {
    authError,
    user,
    isAuthenticated,
    register,
    login,
    logout,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
