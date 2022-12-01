<template>
    <div>
    <button class="button"
            v-if="$store.state.likes.map(like => like.freet).indexOf(freet._id) < 0"
            @click="likeFreet">
        like
    </button>
    <button class="button"
            v-else
            @click="deleteReaction">
        unlike
    </button>
    <button class="button"
            v-if="$store.state.happy.map(h => h.freet).indexOf(freet._id) < 0"
            @click="happyFreet">
        happy
    </button>
    <button class="button"
            v-else
            @click="deleteReaction">
        unhappy
    </button>
    <button class="button"
            v-if="$store.state.sad.map(s => s.freet).indexOf(freet._id) < 0"
            @click="sadFreet">
        sad
    </button>
    <button class="button"
            v-else
            @click="deleteReaction">
        unsad
    </button>
    </div>
</template>



<script>
export default {
  name: 'Reaction',
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
    likeFreet() {
        const params = {
            method: 'POST',
            message: "Successfully liked freet",
            body: JSON.stringify({freetId: this.freet._id, reactionType: 'like'}),
            callback: () => {
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            }
        };
        this.request(params);
    },
    happyFreet() {
        const params = {
            method: 'POST',
            message: "Successfully liked freet",
            body: JSON.stringify({freetId: this.freet._id, reactionType: 'happy'}),
            callback: () => {
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            }
        };
        this.request(params);
    },
    sadFreet() {
        const params = {
            method: 'POST',
            message: "Successfully liked freet",
            body: JSON.stringify({freetId: this.freet._id, reactionType: 'sad'}),
            callback: () => {
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            }
        };
        this.request(params);
    },
    deleteReaction() {
        const params = {
                method: 'DELETE',
                message: 'Successfully unreacted freet',
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
            * Submit a request to reactions
            */
        
        const options = {
            method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
            options.body = params.body;
        }
        try {
            const r = await fetch(`/api/reactions`, options);
            if (!r.ok) {
                const res = await r.json();
                throw new Error(res.error);
            }
            
            this.$store.commit('refreshReactions');
            params.callback();
        } catch (e) {
            this.$set(this.alerts, e, 'error');
            setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
    }
  }
};
</script>