// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
    hash: true,
    antd: {},
    dva: {
        hmr: true
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index'
    },
    targets: {
        ie: 11
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: 'login',
                    path: '/user/login',
                    component: './user/login'
                },
                {
                    name: 'directLogin',
                    path: '/user/login/directLogin',
                    component: './user/login/directLogin'
                }
            ]
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [
                        {
                            path: '/',
                            redirect: '/welcome'
                        },
                        {
                            path: '/welcome',
                            name: 'welcome',
                            icon: 'smile',
                            component: './Welcome'
                        },
                        {
                            component: './404'
                        }
                    ]
                },
                {
                    component: './404'
                }
            ]
        },
        {
            component: './404'
        }
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor
    },
    // @ts-ignore
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/'
    }
});
