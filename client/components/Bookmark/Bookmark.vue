<template>
    <div>
    <button class="button"
            v-if="$store.state.bookmarks.map(bookmark => bookmark._id).indexOf(freet._id) < 0"
            @click="bookmarkFreet">
        bookmark
    </button>
    <button class="button"
            v-else
            @click="deleteBookmark">
        unbookmark
    </button>
    </div>
</template>



<script>
export default {
  name: 'Bookmark',
  props: {
    freet: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
        alerts: {}
    };
  },
  methods: {
    bookmarkFreet() {
        const params = {
            method: 'POST',
            message: "Successfully bookmarked freet",
            body: JSON.stringify({freetId: this.freet._id}),
            callback: () => {
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            }
        };
        this.request(params);
    },
    deleteBookmark() {
        const params = {
                method: 'DELETE',
                message: 'Successfully unbookmarked freet',
                body: JSON.stringify({freetId: this.freet._id}),
                callback: () => {
                    this.$set(this.alerts, params.message, 'success');
                    setTimeout(() => this.$delete(this.alerts, params.message), 3000);
                }
            };
            this.request(params);
    },
    async request(params) {
        /**
            * Submit a request to bookmark
            */
        
        const options = {
            method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
            options.body = params.body;
        }
        try {
            const r = await fetch(`/api/bookmarks`, options);
            if (!r.ok) {
                const res = await r.json();
                throw new Error(res.error);
            }
            
            this.$store.commit('refreshBookmarks');
            params.callback();
        } catch (e) {
            this.$set(this.alerts, e, 'error');
            setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
    }
  }
};
</script>