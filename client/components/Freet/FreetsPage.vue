<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header id='welcome' >
        <h2>Welcome @{{ $store.state.username }} ! 🐣</h2>
      </header>
      <StatusPage />
      <section id='forms'>
      <CreateStatusForm />
      <CreateFreetForm />
      </section>
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all freets
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get freets"
          />
        </div>
      <FreetOrder/>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
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
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import FreetOrder from '@/components/Freet/FreetOrder.vue';
import CreateStatusForm from '@/components/Status/CreateStatusForm.vue';
import StatusPage from '@/components/Status/StatusPage.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm, FreetOrder, CreateStatusForm, StatusPage},
  mounted() {
    this.$refs.getFreetsForm.submit();
    this.$store.commit('refreshReactions');
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    font-family: "Lucida Console", "Courier New", monospace;
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

#welcome {
  font-size: 25px;
}
#chick {
  text-align: center;
  font-size: 50px;
}

main {
  background-color: #ffffe0;
}

#forms {
  background-color:#F1E591  ;
}
</style>
