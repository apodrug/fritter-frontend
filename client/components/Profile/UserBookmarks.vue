<!-- Form for getting freets (all, from user) (inline style) -->
<!-- Default page that also displays freets -->

<template>
  <main>
      <section
        v-if="$store.state.bookmarks.length"
      >
        <FreetComponent
          v-for="freet in $store.getters.getAllBookmarks"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>



<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'GetUserBookmarks',
  components: {
    FreetComponent
  },
  mounted() {
    this.$store.commit('refreshBookmarks');
  }
};
</script>
