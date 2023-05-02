/**
 * management permit state of use Local Storage
 */
const state={
    permit:false
};

const getters={
    getPermit(state){
        return state.permit;
    }
};

const mutations={
    changePermit(state){
        state.permit=!state.permit;
    }
};

const actions={
    changePermit({commit}){
        commit("changePermit");
    }
};

const permitStorage={
    namespaced:true,//important
    state,
    getters,
    actions,
    mutations
};

export default permitStorage;