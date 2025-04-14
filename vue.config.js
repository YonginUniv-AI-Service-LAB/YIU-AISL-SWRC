// vue.config.js
module.exports = {
  publicPath: '/', // 👉 배포 시 경로 문제 해결 (nginx index.html 매핑)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Spring Boot 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true, // 👉 vue-router history 모드에서 새로고침 이슈 해결
  },
};
