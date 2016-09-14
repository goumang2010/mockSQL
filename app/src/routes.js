export default [
    {
        path: '/',
        name: 'test',
        component: require('components/InsertData/new')
    },
    {
        path: '*',
        redirect: '/'
    }
];
