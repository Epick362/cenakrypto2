module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Aktuálna cena Bitcoin, Ethereum a iných kryptomien',
    titleTemplate: '%s | cenakrypto.sk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }, 
      { hid: 'description', name: 'description', content: 'Všetky informácie o Bitcoin, Ethereum, Ripple a iných kryptomenách, ktoré potrebujete. Zoznam kryptomien, aktuálne ceny a grafy.' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Filip Hájek' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:title', content: 'Aktuálne kurzy Bitcoin, Ethereum a ďalších' },
      { property: 'og:url', content: 'https://cenakrypto.sk/' },
      { property: 'og:image', content: 'https://cenakrypto.sk/apple-touch-icon.png' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5642c8' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/formatNumbers', 
    '~/plugins/buefy',
    {src: '~/plugins/highcharts', ssr: false}
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['highcharts'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
}
