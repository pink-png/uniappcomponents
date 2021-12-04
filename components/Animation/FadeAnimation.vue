<template>
  <transition>
    <slot></slot>
  </transition>
</template>
<script>
  export default{
    name: 'FadeAnimation'
  }
</script>
<style scoped lang="stylus">
  .v-enter, .v-leave-to
    opacity 0
 
  .v-enter-active, .v-leave-active
    transition opacity 2.8s
</style>