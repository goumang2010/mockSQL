import * as types from '../mutation-types';

const state = {
    currentTask: {}
};

const mutations = {
    [types.SET_TASK_INFO](state, taskInfo) {
        state.currentTask = taskInfo;
    }
};

export default {
    state,
    mutations
};
