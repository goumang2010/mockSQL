export default [
    {
        path: '/insert',
        name: 'insert',
        component: require('components/insert')
    },
    {
        path: '/update',
        name: 'update',
        component: require('components/update')
    },
    {
        path: '/history',
        name: 'history',
        component: require('components/history')
    },
    {
        path: '/help',
        name: 'help',
        component: require('components/help')
    },
    {
        path: '*',
        redirect: '/insert'
    }
];
