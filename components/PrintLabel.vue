<template>
  <div class="label">
    <div class="price-row text-right px-2">
      <span class="price">{{ commodity.price }}</span>
      円
    </div>
    <div class="px-2 py-1">
      <div class="barcode-wrapper">
        <svg
          class="barcode img-fluid"
          jsbarcode-format="EAN13"
          jsbarcode-height="70"
          :jsbarcode-value="commodity.barcode" />
      </div>
    </div>
    <div class="px-2 name-row">
      {{ commodity.name }}
    </div>
    <div class="row m-0 px-2 py-1 text-right">
      <div class="col p-0">
        <div class="detail-label">生産日</div>
        {{ date }}
      </div>
      <div class="col p-0">
        <div class="detail-label">100g当り（円）</div>
        {{ commodity.unit }}
        円
      </div>
      <div class="col p-0">
        <div class="detail-label">内容量（g）</div>
        {{ commodity.grams }}
        g
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import JsBarcode from 'jsbarcode'

@Component
export default class PrintLabel extends Vue {
  @Prop({ default: {} })
  commodity!: any

  mounted(): void {
    JsBarcode('.barcode').init()
  }

  get date(): string {
    const today = new Date()
    return `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`
  }
}

</script>

<style scoped>
.label {
  background-color: white;
  border: solid 1px;
  width: 70mm;
}

.price-row {
  background-color: yellow;
  border: solid 0.3rem red;
}
.price {
  font-size: 2.5rem;
  font-weight: bold;
}

.barcode-wrapper {
  width: 35mm;
}

.name-row {
  font-size: 1.2rem;
}

.detail-label {
  font-size: 0.7rem;
  color: deeppink;
  text-align: left;
}
</style>
