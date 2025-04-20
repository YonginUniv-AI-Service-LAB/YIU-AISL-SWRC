// vue.config.js
module.exports = {
  // ✅ 배포 시 도메인 루트에 앱이 배포되도록 설정
  publicPath: '/',

  // ✅ 개발용 devServer 설정 (배포에는 영향 없음)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 개발 중 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true, // vue-router history 모드 새로고침 대응
  },
};
