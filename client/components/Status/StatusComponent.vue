<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="status"
  >
    <header>
        <button class="button"
            @click="openStatus">
      </button>                                                                                                                                                                                                                                                      
      <h3 class="author">
        @{{ status.author }}
      </h3>
      <section id='delete'
        v-if="$store.state.username == status.author"
      >
        <button @click="deleteStatus">
        🗑️
      </button>                  
      </section>
    </header>
  </article>
</template>

<script>

export default {
  name: 'StatusComponent',
  components: {},
  props: {
    // Data from the stored freet
    status: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    openStatus() {
      this.$store.commit('openStatus', this.status.author)
    },
    deleteStatus() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted status!', status: 'success'
          });
        }
      };
      this.request(params);
      this.$store.commit('clearOpenStatus')
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/statuses/${this.status._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshStatuses');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.status {
    padding: 20px;
    position: relative;
}
.button {
    color: white;
    padding: 35px;
    position: center;
    border-radius:50%;
}
#delete {
    text-align: center;
}
</style>
