<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Form, Field } from 'vee-validate'

definePageMeta({
  layout: 'auth',
})

const schema = {
  email: 'required',
  password: 'required',
}

const AuthStore = useAuthStore()
const { authError } = storeToRefs(AuthStore)

const dialog = ref(false)

const onSubmitLogin = async (values: any) => {
  dialog.value = true
  await AuthStore.logout()
  await AuthStore.login(values.email, values.password)
  if (!authError.value) {
    dialog.value = false
    return navigateTo('/user/profile')
  } else {
    dialog.value = false
  }
}
</script>

<template>
  <div id="auth-body" class="d-flex flex-column justify-center align-center">
    <v-card variant="outlined" width="340" elevation="12">
      <v-card-title class="mb-3 text-center">ĐĂNG NHẬP</v-card-title>
      <v-card-text>
        <Form as="v-form" :validation-schema="schema" @submit="onSubmitLogin">
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
          <v-row class="align-center">
            <v-col>
              <v-btn
                color="primary"
                type="submit"
                :disabled="dialog"
                :loading="dialog"
              >
                Đăng Nhập
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-caption">
              <p id="have-account">Chưa có tài khoản?</p>
              <NuxtLink to="register">Đăng ký</NuxtLink>
            </v-col>
          </v-row>
        </Form>
      </v-card-text>
    </v-card>
    <GlobalDialogLoading :dialog="dialog" text="Tiến hành đăng nhập ..." />
  </div>
</template>
