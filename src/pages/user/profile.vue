<script setup lang="ts">
import { storeToRefs } from 'pinia'
definePageMeta({
  middleware: 'auth',
})
const AuthStore = useAuthStore()
const { user, isUserAuthenticated } = storeToRefs(AuthStore)
</script>

<template>
  <div>
    <v-btn v-if="isUserAuthenticated" @click="AuthStore.logout()">Logout</v-btn>
    <NuxtLink v-else to="/auth/login" style="text-decoration: none">
      <v-btn>Login</v-btn>
    </NuxtLink>
    <p>User profile</p>
    <p>isAuthenticated: {{ isUserAuthenticated }}</p>
    <p>Logged in with {{ user?.email }}</p>
  </div>
</template>
