export default [
    {
        path: '/',
        name: 'insert',
        component: require('components/insert')
    },
    {
        path: '/update',
        name: 'update',
        component: require('components/update')
    },
    {
        path: '*',
        redirect: '/'
    }
];
