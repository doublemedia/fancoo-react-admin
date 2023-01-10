import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN, URL } from 'src/config/propertySetting';
import { REFRESH } from './end-point/auth';

const clearFunc = () => {

  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  if (typeof window !== 'undefined') {
    window.sessionStorage.clear();
    window.localStorage.removeItem('persist-menu-atom');
    window.localStorage.removeItem('persist-user-atom');
    window.localStorage.removeItem('persist-auth-menu-atom');
    window.location.href = '/login';
  }
};

const instance = axios.create({
	baseURL: URL,
	headers: {
		// 'Content-type': 'application/json; charset=UTF-8',
		// accept: 'application/json,',
	},
    withCredentials: true,
});

instance.interceptors.request.use((config)=> {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

instance.interceptors.response.use(
    (res) => {
        console.log(res)
        return {...res}},

    async (error) => {
        const {config, response} = error;
        console.log(response);
        if(response === undefined) {
            return Promise.reject(error);
        }

        const originalRequest = config;
        console.log('response',response.status);
        if(response.status === 401) {
            console.log('401');
            const refreshToken = Cookies.get(REFRESH_TOKEN);
            const res = await instance.post(REFRESH, {
                refresh_token: refreshToken,
                _checkToken: true
            });
            // TODO: 고민필요
            if(res){
                const { data } = res.data;
                Cookies.set(ACCESS_TOKEN, data.access_token);
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return axios.request(originalRequest);
            }
            clearFunc();
            return Promise.reject(error);
        }
        clearFunc();
        return Promise.reject(error);
       // console.log(error);
    }

)
export default instance;