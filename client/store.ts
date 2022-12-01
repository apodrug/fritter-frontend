import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    bookmarks: [], //all freets a user has bookmarked
    likes: [], //all freets a user liked
    happy: [], //all freets a user happy reacted
    sad: [], //all freets a user sad reacted
    username: null, // Username of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    sortTimeline: false
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      let url;
      if (state.sortTimeline) {
        url = state.filter ? `/api/users/${state.filter}` : '/api/freets';
      }
      else {
        url = state.filter ? `/api/users/${state.filter}` : '/api/reactions/freets';
      }
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    async refreshBookmarks(state) {
      /**
       * Request the server for the currently available bookmarked freets.
       */
      const url = `/api/bookmarks?author=${state.username}`
      const res = await fetch(url).then(async r => r.json());
      state.bookmarks = res;
    },
    async refreshReactions(state) {
      /**
       * Request the server for the currently available reacted freets.
       */
      const url = `/api/reactions?author=${state.username}`
      const res = await fetch(url).then(async r => r.json());
      const likes = [];
      const happy = [];
      const sad = [];
      for (var react of res) {  // add reacts to their label
        if (react.reaction === 'like'){
          likes.push(react);
        } 
        else if (react.reaction === 'happy'){
          happy.push(react);
        } 
        else {
          sad.push(react);
        }
      }
      state.likes = likes;
      state.happy = happy;
      state.sad = sad;
    },
    async switchFreetOrder(state) {
      if (state.sortTimeline) {
        state.sortTimeline = false
      }
      else {
        state.sortTimeline = true
      }
      this.commit('refreshFreets');
    }


  },
  getters: {
    getUserFreets: state => {
      return state.freets.filter(freet => freet.author === state.username);
    },
    getUserBookmarks: state => {
      return state.bookmarks.filter(bookmark => bookmark.author === state.username);
    },
    getAllBookmarks: state => {
      return state.bookmarks
    },
    // async getLikesOfFreet(state, freet) {
    //   /**
    //    * Update the stored freets to the provided freets.
    //    * @param freets - Freets to store
    //    */
    //   const url = `/api/reactions?freetId=${freet}`
    //   const res = await fetch(url).then(async r => r.json());
    //   return res[0]
    // }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
