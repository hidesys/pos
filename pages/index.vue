<template>
  <div class="p-4 all">
    <Scanning :commodities="commodities" :sumPrice="sumPrice" @addCommodity="addCommodity" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component
export default class PageIndex extends Vue {
  commodities: any[] = []

  addCommodity(newCommodity): void {
    this.commodities.push(newCommodity)
  }

  get sumPrice(): number {
    return this.commodities.reduce((sum, com) => sum + com.price, 0)
  }
}

</script>

<style scoped>
.all {
  background-color: lightgray;
  font-size: 3vh;
}
</style>
