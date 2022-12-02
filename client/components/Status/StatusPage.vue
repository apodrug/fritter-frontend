<template>
  <main>
      <h2>Status Updates</h2>
      <section id='all' >
      <h4>{{ $store.state.statusOpen }}</h4>
      <section id='some'
        v-if="$store.state.statuses.length"
      >
        <StatusComponent
          v-for="status in $store.state.statuses"
          :key="status.id"
          :status="status"
        />
      </section>
      <article
        v-else
      >
        <h3>No statuses found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import StatusComponent from '@/components/Status/StatusComponent.vue';

export default {
  name: 'StatusPage',
  components: {StatusComponent},
  mounted() {
    this.$store.commit('refreshStatuses');
  }
};
</script>

<style scoped>
#some {
  display: flex;
  flex-direction: row;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

h2 {
    text-align: left;
}
#all {
    border: 1px solid #111;
}

h4 {
    margin-left: 25px;
}
</style>
