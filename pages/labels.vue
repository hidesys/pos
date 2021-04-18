<template>
  <div class="all">
    <div class="labels">
      <PrintLabel
        v-for="commodity in commodities"
        :commodity="commodity"
        :key="commodity.barcode" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import commodityList from '../static/commodities.json'

@Component
export default class Labels extends Vue {
  get commodities(): any[] {
    return commodityList
  }
}

</script>

<style scoped>
.all {
  width: 210mm;
}
.labels {
  display: flex;
  width: 100%;
}
@media screen {
  .all {
      background: #eee;
  }
}
</style>
