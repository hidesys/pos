<template>
  <div class="p-4 all">
    <div class="row pb-4 main">
      <div class="col-8 w-100">
        <div class="content new-commodity d-flex flex-column">
          <div class="flex-grow-1 valign-middle-wrapper">
            <div v-if="newCommodity" class="text-center valign-middle">
              <div class="name">
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
              <div class="col-7">{{ commodity.name }}</div>
              <div class="col-5 text-right">{{ commodity.price }} 円</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-7">合計</div>
            <div class="col-5 text-right">{{ sumPrice }} 円</div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary btn-block order-button">
      お会計
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import commodityList from '../static/commodities.json'

const speak = function(text: string): void {
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = 1.0
  utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.lang == 'ja-JP') || null
  window.speechSynthesis.speak(utterance)
}

@Component
export default class Human extends Vue {
  newCode: string = ''
  newCommodity: any = null
  commodities: any[] = []

  addCommodity(): void {
    this.newCommodity = commodityList.find(com => String(com.barcode) == this.newCode)
    if (this.newCommodity) {
      this.commodities.push(this.newCommodity)
      this.speak()
    }
    this.newCode = ''
  }

  speak(): void {
    let text = `${this.newCommodity.name} ${this.newCommodity.grams} グラム、${this.newCommodity.price}円。`
    text += '商品をかごに入れてください。'
    speak(text)
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
.order-button {
  border-radius: 1rem;
  font-size: 6vh;
  border-bottom: solid 8px #627295;
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
.valign-middle-wrapper {
  position: relative;
}
.valign-middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>
