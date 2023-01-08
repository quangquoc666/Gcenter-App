<script setup lang="ts">
import { storeToRefs } from 'pinia'

const props = defineProps({
  active: Boolean,
  icon: String,
  code: Number,
  text: String,
})
const AuthStore = useAuthStore()
const { authError } = storeToRefs(AuthStore)

const deactive = () => {
  authError.value = null
}
</script>

<template>
  <div class="px-4">
    <v-row justify="center">
      <v-dialog v-model="props.active">
        <v-alert :icon="false" type="error">
          <v-row class="flex-column" align="center">
            <v-col align="center"
              ><v-icon size="66">{{ props.icon }}</v-icon></v-col
            >
            <v-col align="center">
              <strong>Mã lỗi:</strong> {{ props.code }}
            </v-col>
            <v-col align="center">
              <strong>Mô tả:</strong> {{ props.text }}
            </v-col>
            <v-col align="center">
              <v-btn @click="deactive">Đóng</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-dialog>
    </v-row>
  </div>
</template>
