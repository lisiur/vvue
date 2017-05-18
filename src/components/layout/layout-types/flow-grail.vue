<template>
    <div :class="[prefixClz]"></div>
</template>
<script>
  const prefixClz = 'vvue-layout-type-flow-grail'
  export default {
    name: 'FlowGrail',
    data: () => ({
      prefixClz: prefixClz
    }),
  }
</script>
<style lang="scss">
    $prefix: 'vvue-layout-type-flow-grail';
    .#{$prefix} {
        display: flex;
        flex-flow: row wrap;
    }
</style>
