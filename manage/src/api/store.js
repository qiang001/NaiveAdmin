import axios from 'axios'

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL,
	timeout: 30 * 60 * 1000
})

instance.interceptors.response.use(function(response) {
	return response.data
}, function(error) {
	if(!error.response){
		return Promise.reject('服务器连接失败，请检查网络状态')
	}
	return Promise.reject(error.response.data.error)
})

export default instance
