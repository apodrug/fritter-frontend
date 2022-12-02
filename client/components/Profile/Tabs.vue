<!-- Tab nav bar for profile -->
<!-- This code was modified from https://medium.com/notonlycss/how-to-create-a-tab-component-in-vue-js-2812c75807f9 -->

<template>
  <div
    :class="{
      flex: variant === 'horizontal',
    }"
  >
    <ul
      :class="{
        flex: variant === 'vertical',
      }"
    >
      <li v-for="(tab, index) in tabList" :key="index">
        <label 
          :for="`${_uid}${index}`" v-text="tab" 
        />
        <input
          :id="`${_uid}${index}`"
          type="radio"
          :name="`${_uid}-tab`"
          :value="index + 1"
          v-model="activeTab"
        />
      </li>
    </ul>

    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index + 1 === activeTab">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: () => "vertical",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
};
</script>

<style>
.flex {
  display: flex;
  margin: 10px;
}
.flex input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.flex label {
    display: inline-block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
}

.flex label:hover {
  background-color: #D6BC00;
}

.flex :active {
  background-color: #D6BC00;
}

.flex input[type="radio"]:focus + label {
    border: 2px dashed #444;
}


</style>