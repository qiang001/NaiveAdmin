import axios from 'axios'
export const useAxios = (store) => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL,
		timeout: 30 * 60 * 1000
	})
	
	instance.interceptors.request.use(function (config) {
		config.headers.authorization = store.state.token
		return config
	  }, function (error) {
		return Promise.reject(error);
	  });
	
	instance.interceptors.response.use(function(response) {
		return response.data
	}, function(error) {
		if(error.response.data.error == '登录状态已过期, 请重新登录'){
			store.dispatch('refreshLogin',store.state.token)
		}
		return Promise.reject(error.response.data.error)
	})
	return instance
}
