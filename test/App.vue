<template>
  <div id="app">
      <h2>spin</h2>
      <v-spin size="40">
          <v-spin-type-default></v-spin-type-default>
      </v-spin>

      <h2>slider</h2>
      <v-slider width="650px" height="400px" auto trigger="hover" :source="sliderSource">
          <v-slider-item>1</v-slider-item>
          <v-slider-item>2</v-slider-item>
          <v-slider-item>3</v-slider-item>
      </v-slider>

      <h2>sync</h2>
      <v-sync class="sync" ref="sync" :promise="promise">
          <div slot="loading">
              loading
          </div>
          <div slot="done">
              {{ response }}
          </div>
          <div slot="fail">
              {{ response }}
          </div>
      </v-sync>
      <button @click="sync">sync</button>

      <h2>pretty-scroll</h2>
      <v-pretty-scroll class="pretty-scroll" width="30px" height="100px">
          <ul>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
          </ul>
      </v-pretty-scroll>
  </div>
</template>

<script>
    import images from '@/assets'
    export default {
      data: () => ({
        sliderSource: images.map(item => ({src: item})),
        response: null,
        promise: null,
      }),
      methods: {
        getData(url) {
          this.promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(url)
            }, 200)
          })
          this.promise.then(res => this.response = res, res => this.response = res)
        },
        sync() {
          this.getData('next')
        },
      },
      created() {
        this.getData('first')
      }
    }
</script>

<style>
    .sync {
        width: 300px;
        min-height: 200px;
        background: red;
    }
    .pretty-scroll {
        background: royalblue;
    }
</style>
