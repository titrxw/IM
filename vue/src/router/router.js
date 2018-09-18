export default [{
        path: '*',
        component: function(resolve) {
            require(['../page/404'], resolve)
        }
    },
    {
        path: '/404',
        component: function(resolve) {
            require(['../page/404'], resolve)
        }
    },
    {
        path: '/',
        meta: {
            requireLogin: true,
            showTabBar: true,
            title: '首页'
        },
        component: function(resolve) {
            require(['../page/home'], resolve)
        }
    },
    {
        path: '/register',
        meta: {
            requireLogin: false,
            showTabBar: false,
            title: '注册'
        },
        component: function(resolve) {
            require(['../page/system/register'], resolve)
        }
    },
    {
        path: '/login',
        meta: {
            requireLogin: false,
            showTabBar: false,
            title: '登录'
        },
        component: function(resolve) {
            require(['../page/system/login'], resolve)
        }
    },
    {
        path: '/chat/input',
        meta: {
            requireLogin: false,
            showTabBar: false,
            title: '聊天'
        },
        component: function(resolve) {
            require(['../page/chat/input/chat'], resolve)
        }
    },
]