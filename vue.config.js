const path = require('path')

const svgFilePath = path.resolve(__dirname, 'src/icons/svg')

module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  devServer: {
    port: process.env.VUE_APP_PORT,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: process.env.VUE_APP_BASE_API,
        target: process.env.VUE_APP_SERVER_URL,
        changeOrigin: true,
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // after: require('./mock-server/mock-server.js')
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', process.env.VUE_APP_SYSTEM_NAME)

    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-eval-source-map')
      )

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config.plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [{
        format: 'compact'
      }])

    config.module
      .rule('vue-svgicon')
      .include.add(svgFilePath)
      .end()
      .test(/\.svg$/)
      .use('svgicon')
      .loader('@yzfe/svgicon-loader')
      .options({
        svgFilePath
      })

    config.module.rule('svg').exclude.add(svgFilePath).end()

    config.resolve.alias.set('@icon', svgFilePath)

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                vue: {
                  name: 'chunk-vue',
                  priority: 100,
                  test: /[\\/]node_modules[\\/]_?vue/
                },
                element3: {
                  name: 'chunk-element3',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element3(.*)/
                },
                echarts: {
                  name: 'chunk-echarts',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?echarts(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
