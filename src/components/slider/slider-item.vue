<template>
    <li :class="[prefixClz]"><slot></slot></li>
</template>
<script>
    const prefixClz = 'vvue-slider-item'

    export default {
      data: () => ({
        prefixClz: prefixClz
      })
    }
</script>