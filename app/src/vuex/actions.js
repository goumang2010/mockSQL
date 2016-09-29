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

export const resetFreshCount = ({ commit }) => {
    commit(types.RESET_FRESH_COUNT);
};

export const alert = ({commit}, params) => {
    commit(types.ALERT, params);
    if (params.delay === false) {
        return;
    } else {
        setTimeout(() => {
            commit(types.HIDEALERT);
        }, params.delay || 2500);
    }
};

export const hideAlert = ({commit}) => {
    commit(types.HIDEALERT);
};

export const popover = ({commit}, params) => {
    commit(types.POPOVER, params);
    if (params.delay === false) {
        return;
    } else {
        setTimeout(() => {
            commit(types.HIDEPOPOVER);
        }, params.delay || 2500);
    }
};

export const movePopover = ({commit}, params) => {
    commit(types.POPOVER, params);
};

export const hidePopover = ({commit}) => {
    commit(types.HIDEPOPOVER);
};
