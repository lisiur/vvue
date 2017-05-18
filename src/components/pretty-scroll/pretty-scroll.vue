<template>
    <div :class="[prefixClz, `${prefixClz}-outer-wrapper`]" :style="{width: width, height: height}">
        <div ref="inner" :class="[`${prefixClz}-inner-wrapper`]" :style="{width: innerWidth, height: innerHeight}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  const prefixClz = 'vvue-pretty-scroll'
  export default {
    name: 'PrettyScroll',
    data: () => ({
      prefixClz: prefixClz,
    }),
    computed: {
      innerWidth() {
        return `calc(${this.width} + 20px)`
      },
      innerHeight() {
        return `calc(${this.height} + 20px)`
      }
    },
    methods: {
      innerDom() {
        return this.$refs.inner
      }
    },
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '100%',
      }
    }
  }
</script>
