/**
 * management shuffle kind, num, sendDeckList, resultDeckList and request state
 */
const state={
    kind:"",//シャッフルの種類
    num:"",//シャッフル回数
    deckList:null,//登録画面のデッキリスト
    sendDeckList:null,//送信用デッキリスト
    resultDeckList:null,//シャッフル結果
    request:false//シャッフル要求のフラグ
};

const getters={
    getKind(state){
        return state.kind;
    },
    getNum(state){
        return state.num;
    },
    getDeckList(state){
        return state.deckList;
    },
    getSendDeckList(state){
        return state.sendDeckList;
    },
    getResultDeckList(state){
        return state.resultDeckList;
    },
    getRequest(state){
        return state.request;
    },
};

const mutations={
    saveKind(state,kind){
        state.kind=kind;
    },
    removeKind(state){
        state.kind="";
    },
    saveNum(state,num){
        state.num=num;
    },
    removeNum(state){
        state.num="";
    },
    saveDeckList(state,deckList){
        state.deckList=deckList;
    },
    removeDeckList(state){
        state.deckList=null;
    },
    saveSendDeckList(state,sendDeckList){
        state.sendDeckList=sendDeckList;
    },
    removeSendDeckList(state){
        state.sendDeckList=null;
    },
    saveResultDeckList(state,resultDeckList){
        state.resultDeckList=resultDeckList;
    },
    removeResultDeckList(state){
        state.resultDeckList=null;
    },
    changeRequest(state){
        state.request=!state.request;
    },
};

const actions={
    saveKind({commit},kind){
        commit("saveKind",kind);
    },
    removeKind({commit}){
        commit("removeKind");
    },
    saveNum({commit},num){
        commit("saveNum",num);
    },
    removeNum({commit}){
        commit("removeNum");
    },
    saveDeckList({commit},deckList){
        commit("saveDeckList",deckList);
    },
    removeDeckList({commit}){
        commit("removeDeckList");
    },
    saveSendDeckList({commit},sendDeckList){
        commit("saveSendDeckList",sendDeckList);
    },
    removeSendDeckList({commit}){
        commit("removeSendDeckList");
    },
    saveResultDeckList({commit},resultDeckList){
        commit("saveResultDeckList",resultDeckList);
    },
    removeResultDeckList({commit}){
        commit("removeResultDeckList");
    },
    changeRequest({commit}){
        commit("changeRequest");
    },
};

const shuffleRequest={
    namespaced:true,//important
    state,
    getters,
    actions,
    mutations
};

export default shuffleRequest;