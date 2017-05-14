<template>
    <div class="slider-wrapper" :style="{width: width, height: height}">
        <div class="slider-main">
            <ul class="slider-list">
                <li class="slider-item" v-for="item in source">
                    <img :src="item.src" alt="image">
                </li>
            </ul>
        </div>
        <div class="indicator">
            <ul class="indicator-list">
                <li class="indicator-item" :class="{'indicator-active': index === id}" v-for="(item, id) in source"
                    @mouseover="filterTrigger('hover', id)"
                    @click="filterTrigger('click', id)"></li>
            </ul>
        </div>
        <div ref="leftArrow" class="arrow arrow-left" :class="arrowClz" @click="prev">
            <i class="fa fa-angle-left"></i>
        </div>
        <div ref="rightArrow" class="arrow arrow-right" :class="arrowClz" @click="next">
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Slider',
    data: () => ({
      timeout: null,
      arrowClz: {
        'arrow-always': false,
        'arrow-hover': false,
        'arrow-never': false,
      },
      items: [],
      index: 0,
    }),
    methods: {
      filterTrigger(trigger, index) {
        if (this.trigger === trigger) {
          this.jump(index)
        }
      },
      prev() {
        this.jump(this.index-1)
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
    created() {
      this.arrowClz[`arrow-${this.arrow}`] = true
    },
    mounted() {
      this.items = document.querySelectorAll('.slider-item')
      this.jump(0)
    },
    destroy() {
      clearInterval(this.timeout)
    },
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
    }
  }
</script>
<style lang="scss" scoped>
    .slider-wrapper {
        position: relative;
        .slider-main {
            width: 100%;
            height: 100%;
            .slider-list {
                width: 100%;
                height: 100%;
                .slider-item {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    z-index: 0;
                    transition: opacity .5s linear;
                    position: absolute;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .indicator {
            position: absolute;
            z-index: 2;
            bottom: 10px;
            opacity: .8;
            left: 0;
            right: 0;
            .indicator-list {
                display: flex;
                justify-content: center;
                .indicator-item {
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                    margin: 0 5px;
                    &.indicator-active {
                        background: #3399FF;
                    }
                }
            }
        }
        .arrow {
            position: absolute;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            z-index: 3;
            top: 50%;
            margin-top: -23px;
            font-size: 45px;
            text-align: center;
            transition: opacity .2s;
            background-color: rgba(31,45,61, 1);
            opacity: 0;
            i {
                display: block;
                position: relative;
                color: rgba(255,255,255,.8);
            }
            &:hover {
            }
            &.arrow-left {
                left: 5px;
                i {
                    margin-left: -4px;
                }
            }
            &.arrow-right {
                right: 5px;
                i {
                    margin-right: -4px;
                }
            }
        }
    }
    .slider-wrapper {
        .arrow-hover, .arrow-always {
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
        .arrow-always, &:hover .arrow-hover {
            opacity: 0.5;
        }
        .arrow-never {
            opacity: 0;
        }
    }
</style>