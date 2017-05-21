<template>
    <div ref="layout" :is="type" :body-clz="bodyClz" :offset-top="offsetTop" :fixed="fixed">
        <!-- public -->
        <slot></slot>

        <!-- holy-grail -->
        <template slot="header">
            <slot name="header"></slot>
        </template>
        <template slot="left">
            <slot name="left"></slot>
        </template>
        <template slot="right">
            <slot name="right"></slot>
        </template>
        <template slot="footer">
            <slot name="footer"></slot>
        </template>

        <!-- add-on -->
        <template slot="pre">
            <slot name="pre"></slot>
        </template>
        <template slot="after">
            <slot name="after"></slot>
        </template>
    </div>
</template>
<script>
  import layoutTypes from './layout-types'
  const prefixClz = 'vvue-layout'
  export default {
    name: 'Layout',
    components: {
      'holy-grail': layoutTypes.HolyGrail,
      'add-on': layoutTypes.AddOn
    },
    props: {
      type: {
        type: String,
        default: 'holy-grail'
      },
      fixed: {
        type: Boolean,
        default: false
      },
      offsetTop: {
        type: Number,
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
      toggleLeft(type) {
        this.$refs.layout.toggleLeft(type)
      }
    }
  }
</script>
