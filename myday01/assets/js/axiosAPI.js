//添加请求拦截
axios.interceptors.request.use(
    function(config) {
        //在发送请求前 做些什么
        // console.log(config);
        config.url = 'http://www.liulongbin.top:3007' + config.url
        console.log(config);
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)