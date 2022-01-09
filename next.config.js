module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true
    }

    return config
  }
}
