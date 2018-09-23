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
            title: '登录'
        },
        component: function(resolve) {
            require(['../page/chat/msgs'], resolve)
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
        path: '/chat/input',
        meta: {
            requireLogin: true,
            showTabBar: false,
            title: '聊天'
        },
        component: function(resolve) {
            require(['../page/chat/input/chat'], resolve)
        }
    },
    {
        path: '/friends',
        meta: {
            requireLogin: true,
            showTabBar: true,
            title: '聊天'
        },
        component: function(resolve) {
            require(['../page/chat/friendList'], resolve)
        }
    },
    {
        path: '/msgs',
        meta: {
            requireLogin: true,
            showTabBar: true,
            title: '聊天'
        },
        component: function(resolve) {
            require(['../page/chat/msgs'], resolve)
        }
    }
]