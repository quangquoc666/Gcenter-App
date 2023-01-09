<script setup lang="ts">
import { storeToRefs } from 'pinia'

const AuthStore = useAuthStore()
const { authError } = storeToRefs(AuthStore)
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <GlobalAlertError
      :active="!!authError"
      icon="mdi-shield-lock-outline"
      :status="authError?.status"
      :text="authError?.message"
    />
  </div>
</template>
