// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Spring Boot 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
};