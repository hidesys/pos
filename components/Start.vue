<template>
  <div class="h-100">
    <button type="button" class="btn btn-primary btn-block h-100" @click="start">
      お会計を始める
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Start extends Vue {
  start(): void {
    const element = document.querySelector('body') as any
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }

    this.$emit('start')
  }
}

</script>

<style scoped>
button {
  border-radius: 1rem;
  font-size: 6vh;
  border-bottom: solid 8px #627295;
}
</style>
