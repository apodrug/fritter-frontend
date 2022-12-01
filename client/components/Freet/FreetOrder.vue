<template>
    <div>
    <button class="button"
            v-if="$store.state.sortTimeline"
            @click="switchOrder">
        Sorted By Timeline
    </button>
    <button class="button"
            v-else
            @click="switchOrder">
        Sorted By Recommended
    </button>
    </div>
</template>



<script>
export default {
  name: 'FreetOrder',
  data() {
    return {
        alerts: {}
    };
  },
  methods: {
    switchOrder() {
        this.$store.commit('switchFreetOrder');
    }
  }
};
</script>