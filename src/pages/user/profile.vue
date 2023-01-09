<script setup lang="ts">
import { storeToRefs } from 'pinia'

const AuthStore = useAuthStore()
const { user } = storeToRefs(AuthStore)
</script>

<template>
  <div>
    <v-btn v-if="AuthStore.isAuthenticated()" @click="AuthStore.logout()"
      >Logout</v-btn
    >
    <NuxtLink v-else to="/auth/login" style="text-decoration: none">
      <v-btn>Login</v-btn>
    </NuxtLink>
    <p>User profile</p>
    <p>isAuthenticated: {{ AuthStore.isAuthenticated() }}</p>
    <p>Logged in with {{ user?.email }}</p>
  </div>
</template>
