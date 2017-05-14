<template>
    <div class="classes">
        <div class="loading" v-if="loading">
            <slot name="loading"></slot>
        </div>
        <template v-if="!pending">
            <div class="done" v-if="done">
                <slot name="done"></slot>
            </div>
            <div class="fail" v-if="!done">
                <slot name="fail"></slot>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
      data: () => ({
        pending: true,
        loading: false,
        done: false,
      }),
      methods: {
        state(state) {
          if (state === 'loading') {
            this.loading = true
          }
          if (state === 'done') {
            this.pending = false
            this.loading = false
            this.done = true
          }
          if (state === 'fail') {
            this.pending = false
            this.loading = false
            this.done = false
          }
        },
        sync() {
          this.state('loading')
          if (this.promise === null) return
          this.promise.then(res => {
            this.state('done')
          }).catch(ex => {
            this.state('fail')
          })
        }
      },
      watch: {
        promise() {
          this.sync()
        }
      },
      mounted() {
        this.sync()
      },
      props: {
        promise: {
          type: Promise,
          default: null
        },

      }
    }
</script>
<style lang="scss" scoped>
    .classes {
        position: relative;
        .loading {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
</style>
