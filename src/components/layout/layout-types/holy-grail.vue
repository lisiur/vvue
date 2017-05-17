<template>
    <div :class="[prefixClz]">
        <header :class="[`${prefixClz}-header`]">
            <slot name="header"></slot>
        </header>
        <div :class="[`${prefixClz}-body`]">
            <template v-if="hideScroll">
                <pretty-scroll>
                    <nav :class="[`${prefixClz}-left`]">
                        <slot name="left"></slot>
                    </nav>
                </pretty-scroll>
                <pretty-scroll>
                    <main :class="[`${prefixClz}-main`]">
                        <slot name="main"></slot>
                    </main>
                </pretty-scroll>
                <pretty-scroll>
                    <aside :class="[`${prefixClz}-right`]">
                        <slot name="right"></slot>
                    </aside>
                </pretty-scroll>
            </template>
            <template v-else>
                <nav :class="[`${prefixClz}-left`]">
                    <slot name="left"></slot>
                </nav>
                <main :class="[`${prefixClz}-main`]">
                    <slot name="main"></slot>
                </main>
                <aside :class="[`${prefixClz}-right`]">
                    <slot name="right"></slot>
                </aside>
            </template>
        </div>
        <footer :class="[`${prefixClz}-footer`]">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
<script>
  import PrettyScroll from '../../pretty-scroll'
  const prefixClz = 'vvue-layout-type-holy-grail'
  export default {
    name: 'HolyGrail',
    components: [PrettyScroll],
    props: {
      hideScroll: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      prefixClz: prefixClz
    }),
  }
</script>
