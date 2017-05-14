<template>
    <div :class="[prefixClz]">
        <div :class="[`${prefixClz}-wrapper`]" :style="{width: width, height: height}">
            <ul ref="sourceList" :class="[`${prefixClz}-list`]">
                <li :class="[`${prefixClz}-item`]" v-for="item in source">
                    <img :src="item.src" alt="image">
                </li>
            </ul>
            <div :class="[`${prefixClz}-indicator-wrapper`]">
                <ul :class="[`${prefixClz}-indicator-list`]">
                    <template v-for="(item, id) in source">
                        <li :class="[`${prefixClz}-indicator-item`, index === id ? `${prefixClz}-indicator-active` : '']"
                            @mouseover="filterTrigger('hover', id)"
                            @click="filterTrigger('click', id)">
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
      timeout: null,
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
      filterTrigger(trigger, index) {
        if (this.trigger === trigger) {
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
        clearTimeout(this.timeout)

        let prevIndex = this.index
        let len = this.items.length
        this.index = (Math.abs(Math.floor(index / len)) * len + index) % len

        this.items[prevIndex].style.zIndex = 0
        this.items[prevIndex].style.opacity = 0
        this.items[this.index].style.zIndex = 1
        this.items[this.index].style.opacity= 1

        if (this.auto) {
          this.timeout = setTimeout(() => {
            this.jump(index+1)
          }, this.speed)
        }
      },
    },
    mounted() {
      this.items = this.$refs.sourceList.querySelectorAll('li')
      this.jump(0)
    },
    destroy() {
      clearInterval(this.timeout)
    }
  }
</script>
