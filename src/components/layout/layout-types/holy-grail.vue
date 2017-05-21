<template>
    <div :class="[prefixClz, fixed ? `${prefixClz}-fixed` : '']">
        <div :class="[`${prefixClz}-header`]" v-if="_hasSlot('header')">
            <slot name="header"></slot>
        </div>
        <div :class="[`${prefixClz}-body`, bodyClz]">
            <template v-if="fixed">
                <stick :offsetTop="offsetTop" :class="[`${prefixClz}-left`]" v-if="_hasSlot('left')">
                    <slot name="left"></slot>
                </stick>
                <div :class="[`${prefixClz}-main`]" v-if="_hasSlot('default')">
                    <slot></slot>
                </div>
                <div :class="[`${prefixClz}-right`]" v-if="_hasSlot('right')">
                    <slot name="right"></slot>
                </div>
            </template>
            <template v-else>
                <div :class="[`${prefixClz}-left`]" v-if="_hasSlot('left')">
                    <slot name="left"></slot>
                </div>
                <div :class="[`${prefixClz}-main`]" v-if="_hasSlot('default')">
                    <slot></slot>
                </div>
                <div :class="[`${prefixClz}-right`]" v-if="_hasSlot('right')">
                    <slot name="right"></slot>
                </div>
            </template>
        </div>
        <div :class="[`${prefixClz}-footer`]" v-if="_hasSlot('footer')">
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
      offsetTop: {
        type: Boolean,
        default: 0
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
      _hasSlot(name) {
        return this.$slots[name].length > 0
      },
      _handleScroll() {
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
      toggleLeft(type) {
        const leftStick = document.querySelector(`.${prefixClz}-left`)
        if (type === 'hidden') {
          leftStick.style.position = 'absolute'
          leftStick.style.left = -leftStick.offsetWidth + 'px'
        } else {
          leftStick.style.position = 'inherit'
          leftStick.style.left = 0
        }
      }
    },
    mounted() {
      if (this.fixed) {
        this._handleScroll()
        window.addEventListener('scroll', this._handleScroll, false)
      }
    }
  }
</script>
