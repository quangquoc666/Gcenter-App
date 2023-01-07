<script setup lang="ts">
const props = defineProps({
  active: Boolean,
  icon: String,
  type: String,
  text: String,
})
const active = ref(props.active)
</script>

<template>
  <div class="px-4">
    <v-row justify="center">
      <v-dialog v-model="active" persistent>
        <v-alert :icon="false" :type="(props.type as any)">
          <v-row class="flex-column" align="center">
            <v-col align="center"
              ><v-icon size="66">{{ props.icon }}</v-icon></v-col
            >
            <v-col align="center">
              {{ props.text }}
            </v-col>
            <v-col align="center">
              <v-btn @click="active = false">Đóng</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-dialog>
    </v-row>
  </div>
</template>
