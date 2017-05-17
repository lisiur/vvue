<template>
    <div :class="[prefixClz]">
        <div :class="[`${prefixClz}-pre`]"> <slot name="pre"></slot> </div>
        <slot :class="[`${prefixClz}-main`]"></slot>
        <div :class="[`${prefixClz}-after`]"> <slot name="after"></slot> </div>
    </div>
</template>
<script>
  const prefixClz = 'vvue-layout-type-add-on'
  export default {
    name: 'AddOn',
    data: () => ({
      prefixClz: prefixClz
    }),
  }
</script>
