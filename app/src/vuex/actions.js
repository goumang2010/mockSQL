import * as types from './mutation-types';

export const decrementMain = ({ commit }) => {
    commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
    commit(types.INCREMENT_MAIN_COUNTER);
};

export const setTaskInfo = ({ commit }, taskinfo) => {
    commit(types.SET_TASK_INFO, taskinfo);
};

export const resetTaskInfo = ({ commit }) => {
    commit(types.RESET_TASK_INFO);
};

export const freshTasksList = ({ commit }) => {
    commit(types.FRESH_TASKS_LIST_TRIGGER);
};
