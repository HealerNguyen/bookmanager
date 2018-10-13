const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'Mini Library',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' },
            { name: 'csrf-token', content: "{{csrfToken}}" }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
        ],
        css: [
            // Load a Node.js module directly (here it's a Sass file)
            'bulma',
            // CSS file in the project
            '@/assets/sass/main.css',
            // SCSS file in the project
            '@/assets/sass/main.scss'
        ],
        script: [
            { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js' }
        ]

    },
    /*load boostrap-vue*/
    modules: [
        //'bootstrap-vue/nuxt',

        // Or if you have custom bootstrap CSS...
        //['bootstrap-vue/nuxt', { css: false }],
    ],
   // plugins: ['~/plugins/vuetify'],
    plugins: [
        { src: '~/plugins/vue-particles', ssr: false },
        { src: '~/plugins/vuetify' },
        //{ src: '~/plugins/globalMixin' }
    ],
    /*
     ** Customize the progress bar color
     */
    loading: {
        color: '#1976d2',
        height: '4px'
    },
    /*
     ** Build configuration
     */
    // env: {
    //     baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    // },
    build: {
        /*
         ** Run ESLint on save
         */
        vendor: ['axios', 'clientjs'],
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    //loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    serverMiddleware: [
        // API middleware
        '~/api/index.js',
        bodyParser.json(),


        cookieSession({
            name: 'session',
            keys: ['key1'],
            maxAge: 60 * 60 * 1000
        })
    ]

}