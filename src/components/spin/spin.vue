<template>
    <div :class="[prefixClz]">
        <div :class="[`${prefixClz}-default`]" :style="{'font-size': defaultSize, color: color}" v-if="!customize">
            <div :class="[`${prefixClz}-icon`]">
                <i :class="[`${prefixClz}-type-spin`]" class="fa fa-spinner" v-if="type === 'spin'"></i>
                <i :class="[`${prefixClz}-type-circle`]" class="fa fa-circle-o-notch" v-if="type === 'circle'"></i>
            </div>
            <div :class="[`${prefixClz}-text`]" v-if="text"> {{ text }} </div>
        </div>
        <template v-else> <slot></slot> </template>
    </div>
</template>
<script>
  const prefixClz = 'vvue-spin'
  export default {
    name: 'Spin',
    props: {
      type: {
        type: String,
        default: 'spin'
      },
      size: {
        type: [String, Number],
        default: 14
      },
      text: {
        type: String,
        default: 'loading'
      },
      color: {
        type: String,
        default: '#39f'
      }
    },
    data: () => ({
      prefixClz: prefixClz,
      customize: false
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
    mounted () {
      this.customize = this.$slots.default !== undefined;
    }
  }
</script>
