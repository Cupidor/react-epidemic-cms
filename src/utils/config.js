const config = {};
const version = 'prod';
if (version === 'prod') {
  config.host = 'http://127.0.0.1:5000';
} else if (version === 'test') {
  config.host = 'http://192.168.2.135:30011';
}
// 保存当前登录用户
config.currentUser = null;
export default config;
