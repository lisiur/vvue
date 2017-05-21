<template>
    <div :class="[prefixClz, fixed ? `${prefixClz}-fixed` : '']">
        <div :class="[`${prefixClz}-header`]" v-if="hasSlot('header')">
            <slot name="header"></slot>
        </div>
        <div :class="[`${prefixClz}-body`, bodyClz]">
            <template v-if="fixed">
                <stick :class="[`${prefixClz}-left`]" v-if="hasSlot('left')">
                    <slot name="left"></slot>
                </stick>
                <div :class="[`${prefixClz}-main`]" v-if="hasSlot('default')">
                    <slot></slot>
                </div>
                <div :class="[`${prefixClz}-right`]" v-if="hasSlot('right')">
                    <slot name="right"></slot>
                </div>
            </template>
            <template v-else>
                <div :class="[`${prefixClz}-left`]" v-if="hasSlot('left')">
                    <slot name="left"></slot>
                </div>
                <div :class="[`${prefixClz}-main`]" v-if="hasSlot('default')">
                    <slot></slot>
                </div>
                <div :class="[`${prefixClz}-right`]" v-if="hasSlot('right')">
                    <slot name="right"></slot>
                </div>
            </template>
        </div>
        <div :class="[`${prefixClz}-footer`]" v-if="hasSlot('footer')">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
  import { getScroll, getOffset } from '../../../utils'
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
      bodyClz: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      prefixClz: prefixClz,
    }),
    methods: {
      hasSlot(name) {
        return this.$slots[name].length > 0
      },
      handleScroll() {
        const header = document.querySelector(`.${prefixClz}-header`)
        const footer = document.querySelector(`.${prefixClz}-footer`)
        const leftStick = document.querySelector(`.${prefixClz}-left`)
        const absEle = document.querySelector(`.${prefixClz}-left > div`)
        const leftSlot = document.querySelector(`.${prefixClz}-left > div`).firstChild
        const scrollTop = getScroll(window, true);
        const windowHeight = window.innerHeight

        const headerBelowTop = header.offsetHeight - scrollTop
        const footerBelowBottom = getOffset(footer).top - (windowHeight + scrollTop)

        if (headerBelowTop > 0 && footerBelowBottom > 0) { // only header
          leftStick.style.height = `calc(100vh - ${headerBelowTop}px)`
        }
        if (headerBelowTop < 0 && footerBelowBottom > 0) { // neither header nor footer
          leftStick.style.height = '100vh'
        }
        if (headerBelowTop < 0 && footerBelowBottom < 0) { // only footer
          leftStick.style.height = `calc(100vh + ${footerBelowBottom}px)`
        }
        if (headerBelowTop > 0 && footerBelowBottom < 0) { // both header and footer
          leftStick.style.height = `calc(100vh + ${footerBelowBottom}px) - ${headerBelowTop}px`
        }
        absEle.style.height = leftStick.style.height // absEle 会脱离文档流 所以不能使用100%设置高度
        leftSlot.style.height = '100%'
        leftStick.style.width = leftSlot.offsetWidth + 'px'
      },
      fixLeft() {
        const leftStick = document.querySelector(`.${prefixClz}-left`)
        const leftSlot = document.querySelector(`.${prefixClz}-left > div`).firstChild
        leftSlot.style.height = '100%'
        leftStick.style.width = leftSlot.offsetWidth + 'px'
      }
    },
    mounted() {
      if (this.fixed) {
        this.handleScroll()
        window.addEventListener('scroll', this.handleScroll, false)
      }
    }
  }
</script>
