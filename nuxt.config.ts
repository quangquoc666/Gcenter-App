// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  components: {
    global: true,
    dirs: ['~/components'],
  },
  imports: {
    dirs: ['stores'],
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css',
  ],
  build: {
    transpile: [
      'vuetify',
      /*  'vee-validate', */
    ],
  },
})
