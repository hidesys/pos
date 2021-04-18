<template>
  <div>
    <div class="main pb-4">
      <div class="content valign-middle-wrapper">
        <div class="valign-middle">
          <div class="count">
            購入点数： {{ commodities.length }} 点
          </div>
          <div class="count">
            合計金額：
            <span class="price">
              {{ sumPrice }}
            </span>
            円
          </div>
        </div>
      </div>
    </div>
    <div class="buttons row">
      <div class="col h-100">
        <button
          type="button"
          class="btn btn-outline-primary btn-block btn-lg-shadow bg-white h-100"
          @click="$emit('finish')">
          戻る
        </button>
      </div>
      <div class="col h-100">
        <button
          type="button"
          class="btn btn-primary btn-block btn-lg-shadow h-100"
          @click="$emit('finish')">
          お支払確定
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import commodityList from '../static/commodities.json'
import speak from './_speak'

@Component
export default class Payment extends Vue {
  @Prop({ default: [] })
  commodities!: any[]

  @Prop({ default: 0 })
  sumPrice!: number

  speak(): void {
    const text = `合計金額は ${this.sumPrice}円です。よろしければ、お支払い確定ボタンを押してください。`
    speak(text)
  }
}

</script>

<style scoped>
@import "./_common";

.main {
  height: 75vh;
}
.buttons {
  height: calc(25vh - 24px - 24px);
}

.content {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  font-size: 6vh;
}
.price {
  font-size: 12vh;
}
</style>
