<template>
    <div :class="[prefixClz, fixed ? `${prefixClz}-fixed` : '']">
        <div :class="[`${prefixClz}-header`]" v-if="$slots.header.length > 0">
            <slot name="header"></slot>
        </div>
        <div :class="[`${prefixClz}-body`, bodyClz]">
            <div ref="leftWrapper" :class="[`${prefixClz}-left`]" v-if="$slots.left.length > 0">
                <slot name="left"></slot>
            </div>
            <div :class="[`${prefixClz}-main`]" v-if="$slots.default.length > 0">
                <slot></slot>
            </div>
            <div :class="[`${prefixClz}-right`]" v-if="$slots.right.length > 0">
                <slot name="right"></slot>
            </div>
        </div>
        <div :class="[`${prefixClz}-footer`]" v-if="$slots.footer.length > 0">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
  const prefixClz = 'vvue-layout-type-holy-grail'
  export default {
    name: 'HolyGrail',
    props: {
      fixed: {
        type: Boolean,
        default: false
      },
      bodyClz: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      prefixClz: prefixClz,
    })
  }
</script>
