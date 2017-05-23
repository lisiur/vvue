<template>
    <div :class="[prefixClz]">
        <div :class="[`${prefixClz}-wrapper`]" :style="{width: width, height: height}">
            <ul ref="sourceList" :class="[`${prefixClz}-list`]" @mouseenter.stop="pause=true" @mouseout.stop="pause=false">
                <template v-if="source && source.length !== 0">
                    <li :class="[`${prefixClz}-item`]" v-for="src in source">
                        <img :src="src" alt="image">
                    </li>
                </template>
                <template v-else>
                    <slot></slot>
                </template>
            </ul>
            <div :class="[`${prefixClz}-indicator-wrapper`]">
                <ul :class="[`${prefixClz}-indicator-list`]">
                    <template v-for="id in items.length">
                        <li :class="[`${prefixClz}-indicator-item`, index === (id - 1) ? `${prefixClz}-indicator-active` : '']"
                            @mouseover.stop="_filterTrigger('hover', id - 1)"
                            @click="_filterTrigger('click', id - 1)">
                        </li>
                    </template>
                </ul>
            </div>
            <div ref="leftArrow" :class="leftArrowClz" @click="prev">
                <i class="fa fa-angle-left"></i>
            </div>
            <div ref="rightArrow" :class="rightArrowClz" @click="next">
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
    </div>
</template>
<script>
  const prefixClz = 'vvue-slider'

  export default {
    name: 'Slider',
    props: {
      width: {
        type: String,
        default: 'auto'
      },
      height: {
        type: String,
        default: 'auto'
      },
      source: {
        type: Array,
        default: () => []
      },
      auto: {
        type: Boolean,
        default: false
      },
      trigger: {
        type: String,
        default: 'click' // ['click', 'hover']
      },
      arrow: {
        type: String,
        default: 'hover' // ['always', 'hover', 'never']
      },
      speed: {
        type: Number,
        default: 2000
      }
    },
    data: () => ({
      prefixClz: prefixClz,
      timer: null,
      pause: false,
      items: [],
      index: 0,
    }),
    computed: {
      leftArrowClz() {
        return [
          `${prefixClz}-arrow`,
          `${prefixClz}-arrow-left`,
          `${prefixClz}-arrow-${this.arrow}`
        ]
      },
      rightArrowClz() {
        return [
          `${prefixClz}-arrow`,
          `${prefixClz}-arrow-right`,
          `${prefixClz}-arrow-${this.arrow}`
        ]
      },
    },
    methods: {
      _filterTrigger(trigger, index) {
        if (this.trigger === trigger) {
          if (this.trigger === 'hover') {
            this.pause = true
          }
          this.jump(index)
        }
      },
      prev() {
        this.jump(this.index - 1)
      },
      next() {
        this.jump(this.index + 1)
      },
      jump(index) {
        clearTimeout(this.timer)

        let prevIndex = this.index
        let len = this.items.length
        this.index = (Math.abs(Math.floor(index / len)) * len + index) % len

        this.items[prevIndex].style.zIndex = 0
        this.items[prevIndex].style.opacity = 0
        this.items[this.index].style.zIndex = 1
        this.items[this.index].style.opacity= 1

        if (this.auto && !this.pause) {
          this.timer = setTimeout(() => {
            this.jump(index+1)
          }, this.speed)
        }
      },
    },
    watch: {
      pause() {
        clearTimeout(this.timer)
        if (this.auto && !this.pause) {
          this.jump(this.index)
        }
      }
    },
    mounted() {
      this.items = this.$refs.sourceList.querySelectorAll('li')
      this.jump(0)
    },
    destroy() {
      clearTimeout(this.timer)
    }
  }
</script>
