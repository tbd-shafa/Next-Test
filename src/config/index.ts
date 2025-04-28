export const config = {
  API_BASE_URL: 'https://api.mediarchivebd.com', 
  JWT_SECRET: 'v2t<u]eC8@R#?63-a>JLkB2z',
  API_ENDPOINTS: {
    LOGIN: '/v1/auth/login',
    CLIENT_PROFILE: '/v1/clients/me',
    REFRESH_TOKEN: '/v1/auth/token/refresh',
    VERIFY_USER: '/v1/auth/verify',
    ADD_PATIENT: '/v1/patients',
    SAVE_DEVICE_INFO: '/v1/common/save-device-info'
    
  },
  DEFAULT_REDIRECT: '/',
  TOKEN_STORAGE_KEY: 'mediarchive_auth',
  BLOOD_GROUPS: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  GOOGLE_PLAY_STORE_URL:'https://play.google.com/store',
  APP_STORE_URL:'https://apps.apple.com'
} as const;

export default config;
