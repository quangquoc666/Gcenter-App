import type { User } from '@supabase/gotrue-js/src/lib/types'

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const supabase = useSupabase()

  const authError = ref<any>(null)
  const user = ref<User | any>(null)

  const isAuthenticated = ref(!!useCookie('token').value)
  const isUserAuthenticated = computed(
    () => isAuthenticated.value && !!user.value
  )

  const setAuth = (u: User | any) => {
    isAuthenticated.value = true
    user.value = u
    authError.value = null
    useCookie('token').value = u.access_token
  }

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${config.public.BASE_URL}/user/profile` },
    })
    if (error) authError.value = error
  }

  const login = async (email: string, password: string) => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {},
    })
    if (error) authError.value = error
    else {
      const u: any = user
      u.access_token = session?.access_token
      setAuth(u)
    }
  }

  const purgeAuth = async () => {
    await supabase.auth.signOut()
    isAuthenticated.value = false
    user.value = null
    authError.value = null
    useCookie('token').value = null
  }

  const logout = () => {
    purgeAuth()
  }

  const verifyAuth = async (token: any) => {
    if (useCookie('token').value) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token)
      const u: any = user
      if (u) {
        u.access_token = token
        setAuth(u)
      } else if (error) {
        setTimeout(() => {
          authError.value = error
        }, 50)
        purgeAuth()
      }
    } else {
      setTimeout(() => {
        authError.value = {
          status: '401',
          message: 'Phiên đăng nhập đã hết, hãy đăng nhập lại!',
        }
      }, 50)
      purgeAuth()
    }
  }

  return {
    authError,
    user,
    isAuthenticated,
    isUserAuthenticated,
    register,
    login,
    logout,
    verifyAuth,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
