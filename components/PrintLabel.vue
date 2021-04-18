<template>
  <div class="label">
    <div class="price-row">
      <span class="price">{{ commodity.price }}</span>
      円
    </div>
    <div>
      <div class="barcode-wrapper">
        <svg
          class="barcode img-fluid"
          jsbarcode-format="EAN13"
          :jsbarcode-value="commodity.barcode" />
      </div>
    </div>
    <div>
      {{ commodity.name }}
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
}

</script>

<style scoped>
.label {
  background-color: white;
  border: solid 1px;
}

.price-row {
  background-color: yellow;
  border: solid 1px red;
}
.price {
  font-size: 2rem;
}

.barcode-wrapper {
  width: 3cm;
}
</style>
