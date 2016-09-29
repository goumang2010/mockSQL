import * as types from '../mutation-types';

const state = {
    alertConfig: {
        show: false,
        msg: 'alert message!', // support
        type: 'info', // info/warning/success/danger
        dismissible: false,
        delay: 2500
    },
    popoverConfig: {
        show: false,
        top: 0,
        left: 0,
        style: 'popover',
        msg: 'alert message!',
        title: 'info',
        delay: 2500,
        dismissible: false
    }
};

const mutations = {
    [types.ALERT](state, params) {
        state.alertConfig.show = params.show;
        state.alertConfig.msg = params.msg || 'alert msg';
        state.alertConfig.type = params.type || 'info'; // info/warning/success/danger
        state.alertConfig.delay = params.delay || 2500; // false will not auto hide
        state.alertConfig.dismissible = params.dismissible || false;
    },
    [types.HIDEALERT](state) {
        state.alertConfig.show = false;
    },
    [types.POPOVER](state, params) {
        Object.assign(state.popoverConfig, params);
    },
    [types.HIDEPOPOVER](state) {
        state.popoverConfig.show = false;
    }
};

export default {
    state,
    mutations
};
