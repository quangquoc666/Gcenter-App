<script setup lang="ts">
const { globalState } = useGlobalStore()
</script>
<template>
  <div>
    {{ globalState }}
    <NuxtWelcome />
  </div>
</template>
