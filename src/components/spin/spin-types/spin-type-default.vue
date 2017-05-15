<template>
    <i :class="[`${prefixClz}-spin`]" :style="{'font-size': defaultSize, color: color}" class="fa fa-spinner"></i>
</template>
<script>
  const prefixClz = 'vvue-spin-type'
  export default {
    name: 'SpinTypeDefault',
    props: {
      size: {
        type: [String, Number],
        default: 14
      },
      color: {
        type: String,
        default: '#39f'
      }
    },
    data: () => ({
      prefixClz: prefixClz
    }),
    computed: {
      defaultSize() {
        if (typeof this.size === 'number') {
          return `${this.size}px`
        }
        if (typeof this.size === 'string') {
          if (isNaN(Number(this.size))) {
            return this.size
          } else { // 数字字符串
            return this.size + 'px'
          }
        }
      }
    },
  }
</script>
