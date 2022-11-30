<!-- Profile page for account -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Profile</h2>
      </header>
    </section>
    <section>
      <header>
        <h2> @{{ $store.state.username }}</h2>
      </header>
    </section>
    <section>
    <div>
        <app-tabs :tabList="tabList">
            <template v-slot:tabPanel-1> <GetUserFreets/> </template>
            <template v-slot:tabPanel-2> <GetUserBookmarks/> </template>
        </app-tabs>
    </div>
    </section>
  </main>
</template>

<script>

import AppTabs from '@/components/Profile/Tabs.vue';
import GetUserFreets from '@/components/Profile/UserFreets.vue';
import GetUserBookmarks from '@/components/Profile/UserBookmarks.vue';

export default {
  name: 'ProfilePage',
  components: {
    AppTabs,
    GetUserFreets,
    GetUserBookmarks
  },
  data() {
    return {
      tabList: ["Freets", "Saved"],
    };
  },
};

</script>