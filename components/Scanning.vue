<template>
  <div>
    <div class="row pb-4 main">
      <div class="col-8 w-100">
        <div class="content new-commodity d-flex flex-column">
          <div class="flex-grow-1 valign-middle-wrapper">
            <div v-if="newCommodity" class="text-center valign-middle w-100">
              <div class="name w-100">
                {{ newCommodity.name }}
                {{ newCommodity.grams }}g
              </div>
              <div class="text-muted">
                {{ newCommodity.unit }}円 / 100g
              </div>
              <div class="price">
                {{ newCommodity.price }} 円
              </div>
              <div class="pt-4">
                商品をかごに入れてください
              </div>
            </div>
            <div v-else class="text-center valign-middle">
              商品をスキャンしてください
            </div>
          </div>
          <form @submit.prevent="addCommodity">
            <input v-model="newCode" class="w-100 border-0 text-right" />
          </form>
        </div>
      </div>
      <div class="col-4 w-100">
        <div class="content d-flex flex-column">
          <div class="flex-grow-1">
            <div v-for="commodity in commodities" class="row border-bottom p-2">
              <div class="col-8 pr-0" style="font-size: 2.5vh;">{{ commodity.name }}</div>
              <div class="col-4 pl-0 text-right">{{ commodity.price }} 円</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-7">合計</div>
            <div class="col-5 pl-0 text-right">{{ sumPrice }} 円</div>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary btn-block btn-lg-shadow order-button"
      @click="$emit('collected')">
      お支払
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import commodityList from '../static/commodities.json'
import speak from './_speak'

@Component
export default class Scanning extends Vue {
  @Prop({ default: [] })
  commodities!: any[]

  @Prop({ default: 0 })
  sumPrice!: number

  newCode: string = ''
  newCommodity: any = null

  addCommodity(): void {
    this.newCommodity = commodityList.find(com => this.newCode.includes(String(com.barcode)))
    if (this.newCommodity) {
      this.$emit('addCommodity', this.newCommodity)
      this.speak()
    }
    this.newCode = ''
  }

  speak(): void {
    const text = `${this.newCommodity.speak}、${this.newCommodity.price}円。`
    speak(text)
  }
}

</script>

<style scoped>
@import "./_common";

.all {
  background-color: lightgray;
  font-size: 3vh;
}
.main {
  height: 75vh;
}
.order-button {
  height: calc(25vh - 24px - 24px);
}
.content {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
}
input.border-0:focus {
  outline: 0;
}
.new-commodity .name {
  font-size: 6vh;
}
.new-commodity .price {
  font-size: 6vh;
}
</style>
