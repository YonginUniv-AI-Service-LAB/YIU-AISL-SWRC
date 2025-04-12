import axios from 'axios';



const api = axios.create({

baseURL: process.env.VUE_APP_API_BASE_URL,

headers: {

'Content-Type': 'application/json',

},

});



// ✅ 특정 요청은 Authorization을 자동으로 붙이지 않게 설정

api.interceptors.request.use((config) => {

const token = localStorage.getItem('accessToken');



// 로그인, 회원가입, 인증 요청에는 토큰 필요 없음

const noAuthUrls = [

'/api/auth/login',

'/api/auth/signup',
'/api/auth/signup/admin',

'/api/auth/send-verification',

'/api/auth/email/verify',

'/api/auth/password-reset-request',

'/api/auth/password-reset',
];


const isNoAuthRequest = noAuthUrls.some(url => config.url.includes(url));



if (token && !isNoAuthRequest) {

config.headers.Authorization = `Bearer ${token}`;
}


return config;

}, (error) => {

return Promise.reject(error);

});



export default api;