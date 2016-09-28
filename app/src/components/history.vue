<template>
    <div>
        <list-item-page type="task" :map="map" :tasks="tasks" :tablink="tablink" route-name="history"></list-item-page>
    </div>

</template>
<script>
import listItemPage from './common/list-item-page.vue';
import { tasks } from '../api/task';

export default {
    data() {
        return {
            map: {
                id: 'tbname',
                name: 'type',
                desc: 'desc',
                userInfo: '',
                updatetime: 'date',
                sortname: 'tbname',
                sorttime: 'date',
                avatar: ''
            },
            tablink: {
                key: 'groupBy',
                currentType: 'all',
                list: [{
                    tab: 'all',
                    msg: '所有'

                }, {
                    tab: 'insert',
                    msg: '插入'
                }, {
                    tab: 'update',
                    msg: '更新'
                }],
                onChange: () => {}
            },
            tasks
        };
    },
    components: {
        listItemPage
    }
};
</script>