<template>
    <div id="app">
        <v-layout ref="layout" type="holy-grail" fixed>
            <header class="app-header" slot="header">
                header
            </header>
            <nav class="app-side-nav" slot="left">
                <v-pretty-scroll>
                        <ul>
                            <li><a href="#layout">layout</a></li>
                            <li><a href="#shake">shake</a></li>
                            <li><a href="#spin">spin</a></li>
                            <li><a href="#slider">slider</a></li>
                            <li><a href="#sync">sync</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                            <li><a href="#pretty-scroll">pretty-scroll</a></li>
                        </ul>
                    </v-pretty-scroll>
            </nav>
            <footer class="app-footer" slot="footer">
                &copy; LisiurDay
            </footer>
            <div class="app-main">
                <div id="layout">
                    <v-layout type="add-on">
                        <button slot="pre" @click="hideNav">pre</button>
                        <input type="text">
                        <button slot="after" @click="showNav">after</button>
                    </v-layout>
                </div>
                <div id="shake">
                    <h1>shake</h1>
                    <v-shake ref="shake" @on-done="shakeDone">
                        <v-spin size="40"></v-spin>
                    </v-shake>
                    <button @click="shake">shake it</button>
                    <button @click="stopShake">stop it</button>
                </div>
                <div id="spin">
                    <h1>spin</h1>
                    <v-spin size="40"></v-spin>
                </div>
                <div id="slider">
                    <h1>slider</h1>
                    <v-slider width="650px" height="400px" auto trigger="hover" :source="[]">
                        <v-slider-item><img :src="sliderSource[0]" alt=""></v-slider-item>
                        <v-slider-item><img :src="sliderSource[1]" alt=""></v-slider-item>
                    </v-slider>
                </div>
                <div id="sync">
                    <h1>sync</h1>
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
                </div>
                <div id="pretty-scroll">
                    <h1>pretty-scroll</h1>
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
            </div>
        </v-layout>
    </div>
</template>

<script>
  import images from '@/assets'
  export default {
    data: () => ({
      sliderSource: images,
      response: null,
      promise: null,
      shakeConfig: [],
      navMaxHeight: 0
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
      shake() {
        this.$refs.shake.shake()
      },
      stopShake() {
        this.$refs.shake.stopShake()
      },
      shakeDone() {
      },
      hideNav() {
        this.$refs.layout.toggleLeft('hidden')
      },
      showNav() {
        this.$refs.layout.toggleLeft('shown')
      }
    },
    created() {
      this.getData('first')
      let shakeConfig = []
      let interval = 5
      for (let i = 1; i <= 20; ++i) {
        shakeConfig.push([i, Math.sqrt(100 - (i - 10) * (i - 10)), interval])
      }
      for (let i = 19; i >= 0; --i) {
        shakeConfig.push([i, -Math.sqrt(100 - (i - 10) * (i - 10)), interval])
      }
      this.shakeConfig = shakeConfig
    },
  }
</script>

<style lang="scss">
    #app {
        width: 100%;
        /*height: 100vh; // fixed;*/
        .app-header, .app-footer {
            background: red;
        }
        .app-side-nav {
            width: 200px;
            ul {
                background: yellow;
            }
        }
        .app-main {
            background: blue;
        }
    }
    .main {
        h1 {
            font-size: 1.6rem;
        }
    }

    .sync {
        width: 300px;
        min-height: 200px;
        background: red;
    }

    .pretty-scroll {
        background: royalblue;
    }
</style>
