<script setup lang="ts">
const props = defineProps({
  dialog: Boolean,
  text: String,
})
</script>
<template>
  <v-dialog v-model="props.dialog" :scrim="false" persistent>
    <v-card color="primary">
      <v-card-text>
        {{ props.text }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
