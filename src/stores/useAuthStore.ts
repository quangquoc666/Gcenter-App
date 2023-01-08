import type { User } from '@supabase/gotrue-js/src/lib/types'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabase()

  const authError = ref<any>(null)
  const user = ref<User | null>(null)

  supabase.auth.onAuthStateChange((_e, session) => {
    user.value = session?.user || null
  })

  const register = async (email: string, password: string) => {
    email = '1123'
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      authError.value = error
    }
  }

  return { authError, user, register }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
