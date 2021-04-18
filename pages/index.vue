<template>
  <div class="p-4 all">
    <Start
      v-if="phase == 'start'"
      @start="phase = 'scanning'" />
    <Scanning
      v-if="phase == 'scanning'"
      :commodities="commodities"
      :sumPrice="sumPrice"
      @addCommodity="addCommodity"
      @collected="phase = 'payment'"/>
    <Payment
      v-if="phase == 'payment'"
      :commodities="commodities"
      :sumPrice="sumPrice"
      @finish="phase = 'start'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component
export default class PageIndex extends Vue {
  phase: 'start' | 'scanning' | 'payment' = 'start'
  commodities: any[] = []

  addCommodity(newCommodity: any): void {
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
  height: 100vh;
}
</style>
