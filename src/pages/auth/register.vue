<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Form, Field } from 'vee-validate'

definePageMeta({
  layout: 'auth',
})

const schema = {
  email: 'required|email',
  password: 'required|min:8|max:333',
  terms: 'required',
}

const AuthStore = useAuthStore()
const { authError } = storeToRefs(AuthStore)

const dialog = ref(false)
const showActiveEmail = ref(false)

const onSubmitRegister = async (values: any) => {
  dialog.value = true
  await AuthStore.logout()
  await AuthStore.register(values.email, values.password)
  if (!authError.value) {
    dialog.value = false
    showActiveEmail.value = true
  } else {
    dialog.value = false
  }
}
</script>

<template>
  <div id="auth-body" class="d-flex flex-column justify-center align-center">
    <v-card
      v-if="!showActiveEmail"
      variant="outlined"
      width="340"
      elevation="12"
    >
      <v-card-title class="mb-3 text-center">ĐĂNG KÝ TÀI KHOẢN</v-card-title>
      <v-card-text>
        <Form
          as="v-form"
          :validation-schema="schema"
          @submit="onSubmitRegister"
        >
          <Field v-slot="{ field, errors }" name="email" label="Địa chỉ Email">
            <v-text-field
              variant="outlined"
              v-bind="field"
              label="Địa chỉ Email*"
              :error-messages="errors"
              class="mb-3"
            />
          </Field>
          <Field v-slot="{ field, errors }" name="password" label="Mật khẩu">
            <v-text-field
              variant="outlined"
              v-bind="field"
              label="Mật khẩu*"
              type="password"
              :error-messages="errors"
              class="mb-3"
            />
          </Field>
          <Field
            v-slot="{ value, handleChange, errors }"
            name="terms"
            :value="true"
            type="checkbox"
          >
            <v-checkbox
              :model-value="value"
              label="Đồng ý tham gia Gcenter?"
              color="primary"
              :error-messages="errors"
              @update:modelValue="handleChange"
            />
          </Field>
          <v-row class="align-center">
            <v-col>
              <v-btn
                color="primary"
                type="submit"
                :disabled="dialog"
                :loading="dialog"
              >
                Đăng Ký
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-caption">
              <p id="have-account">Đã có tài khoản?</p>
              <NuxtLink to="login">Đăng nhập</NuxtLink>
            </v-col>
          </v-row>
        </Form>
      </v-card-text>
    </v-card>
    <v-card
      v-else
      class="bg-green-darken-2"
      variant="flat"
      width="340"
      elevation="12"
    >
      <v-card-title class="mb-3 text-center">ĐĂNG KÝ THÀNH CÔNG</v-card-title>
      <v-card-text class="text-center text-body-1">
        <p>Kiểm tra email để kích hoạt tài khoản !</p>
        <br />
        <p>
          Nếu không tìm thấy mail từ Gcenter, hãy thử tìm ở mục Spam, Thư rác
        </p>
      </v-card-text>
    </v-card>
    <GlobalDialogLoading :dialog="dialog" text="Tiến hành đăng ký ..." />
  </div>
</template>
