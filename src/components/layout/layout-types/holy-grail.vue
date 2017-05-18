<template>
    <div :class="[prefixClz, fixed ? `${prefixClz}-fixed` : '']">
        <div :class="[`${prefixClz}-header`]" v-if="$slots.header.length > 0">
            <slot name="header"></slot>
        </div>
        <div :class="[`${prefixClz}-body`, bodyClz]">
            <div ref="leftWrapper" :class="[`${prefixClz}-left`]" :style="{'flex-basis': leftWidth + 'px'}" v-if="$slots.left.length > 0">
                <template v-if="fixedLeft">
                    <stick :spec-selector="fixedFireSelector">
                        <slot name="left"></slot>
                    </stick>
                </template>
                <template v-else>
                    <slot name="left"></slot>
                </template>
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
  import Stick from '../../stick'
  const prefixClz = 'vvue-layout-type-holy-grail'
  export default {
    name: 'HolyGrail',
    components: { Stick },
    props: {
      fixed: {
        type: Boolean,
        default: false
      },
      fixedLeft: {
        type: Boolean,
        default: false
      },
      fixedFireSelector: {
        type: String
      },
      bodyClz: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      prefixClz: prefixClz,
      leftWidth: 0
    }),
    mounted() {
      this.leftWidth = this.$refs.leftWrapper.firstChild.offsetWidth
    },
  }
</script>
