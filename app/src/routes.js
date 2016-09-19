export default [
    {
        path: '/',
        name: 'newTask',
        component: require('components/InsertData/new')
    },
    {
        path: '*',
        redirect: '/'
    }
];
