import * as types from '../mutation-types';

const state = {
    currentTask: {},
    freshCount: 0
};

const mutations = {
    [types.SET_TASK_INFO](state, taskInfo) {
        state.currentTask = taskInfo;
    },
    [types.RESET_TASK_INFO](state) {
        state.currentTask = {};
    },
    [types.FRESH_TASKS_LIST_TRIGGER](state) {
        state.freshCount++;
    },
    [types.RESET_FRESH_COUNT](state) {
        state.freshCount = 0;
    }
};

export default {
    state,
    mutations
};
