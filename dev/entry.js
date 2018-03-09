import index from '../src/index';

import BootStrap from 'nt-portal-framework';
import BootVue from './root.vue';

import 'nt-element/lib/theme-medium-green/index.css';

const booter = new BootStrap({
    mount: '#xbn-app',
    vueRoot: BootVue,
    modules: [index],
    servers: {
        default: {  //这是默认写法， 如果你的模块只会访问一个后台服务器地址，则不需要修改
            baseURL: '/api'
        },
        marketing: {
            baseURL: 'http://192.168.30.204:8080'
        },
        //财务系统
        pay: {
            baseURL: 'http://pay.xbniao.com'
        },
        userCenter: {  //用户中心
            baseURL: 'http://uc.xbniao.com'
        },
        dubbo: {
            baseURL: 'http://dubbo.xbniao.com'
        },
    },
    routePath: '/product-manage'
});

booter.startUp();

