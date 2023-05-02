import { createStore } from 'vuex';

/* modules */
import permitStorage from './permitStorage';
import shuffleRequest from './shuffleRequest';

const store=new createStore({
  modules:{
    permitStorage,
    shuffleRequest
  }
});

export default store;