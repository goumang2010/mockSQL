import * as types from '../mutation-types';

const state = {
    currentTask: {},
    freshListTrigger: false
};

const mutations = {
    [types.SET_TASK_INFO](state, taskInfo) {
        state.currentTask = taskInfo;
    },
    [types.RESET_TASK_INFO](state) {
        state.currentTask = {};
    },
    [types.FRESH_TASKS_LIST_TRIGGER](state) {
        state.freshListTrigger = !state.freshListTrigger;
    }
};

export default {
    state,
    mutations
};
