<template>
    <div ref="shakeWrapper">
        <slot></slot>
    </div>
</template>
<script>
  const _move = (dom, offsetX, offsetY, time) => {
    dom.style.position = 'relative'
    dom.style.animation = `left ${time / 1000}s, top ${time / 1000}s`
    dom.style.left = offsetX + 'px'
    dom.style.top = -offsetY + 'px'
  }
  const _constructSteps = (config, times) => {
    let oneSteps = config.map(step => ({ x: step[0], y: step[1], interval: step[2] }))
    let steps = []
    for (let i = 0; i < times; ++i) {
      steps = steps.concat(oneSteps)
    }
    return steps
  }
  const _horizontalStepsConfig = (amplitude, interval) => {
    return [
      [-amplitude / 2, 0, interval * 0.0625],
      [-amplitude    , 0, interval * 0.1875],
      [-amplitude / 2, 0, interval * 0.1875],
      [0             , 0, interval * 0.0625],
      [amplitude / 2 , 0, interval * 0.0625],
      [amplitude     , 0, interval * 0.1875],
      [amplitude / 2 , 0, interval * 0.1875],
      [0             , 0, interval * 0.0625]
    ]
  }
  const _verticalStepsConfig = (amplitude, interval) => {
    return [
      [0, -amplitude / 2, interval * 0.0625],
      [0, -amplitude    , interval * 0.1875],
      [0, -amplitude / 2, interval * 0.1875],
      [0, 0             , interval * 0.0625],
      [0, amplitude / 2 , interval * 0.0625],
      [0, amplitude     , interval * 0.1875],
      [0, amplitude / 2 , interval * 0.1875],
      [0, 0             , interval * 0.0625]
    ]
  }
  export default {
    name: 'Shake',
    props: {
      interval: {
        type: Number,
        default: 100
      },
      type: {
        type: String,
        default: 'h',
      },
      amplitude: {
        type: Number,
        default: 5,
      },
      times: {
        type: Number,
        default: 3
      },
      infinity: {
        type: Boolean,
        default: false
      },
      customConfig: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      wrapper: null,
      stepsQueue: [],
      oneSteps: []
    }),
    computed: {
      shakeType() {
        if (this.customConfig.length !==0) {
          return '__custom__'
        } else {
          return this.type
        }
      }
    },
    methods: {
      _recover(interval) {
        _move(this.wrapper, 0, 0, interval)
      },
      _shakeSteps(infinity, lastInterval=0) {
        if (this.stepsQueue.length > 0) {
          const currentStep = this.stepsQueue.shift()
          if(infinity) this.stepsQueue.push(currentStep)
          const self = this
          console.time('interval')
          setTimeout(() => {
            console.timeEnd('interval')
            _move(self.wrapper, currentStep.x, currentStep.y, currentStep.interval)
            self._shakeSteps(infinity, currentStep.interval)
          }, lastInterval)
        } else {
          this.$emit('on-done')
        }
      },
      _shakeIt(config, infinity, times) {
        this.stopShake()
        if (infinity) {
          this.stepsQueue = _constructSteps(config, 1)
          this._shakeSteps(true)
        } else {
          this.stepsQueue = _constructSteps(config, times)
          this._shakeSteps()
        }
      },
      shake(config) {
        const shakeType = config && config.type || this.shakeType
        const amplitude = config && config.amplitude || this.amplitude
        const interval = config && config.interval || this.interval
        const times = config && config.times || this.times
        const infinity = config && config.infinity || this.infinity
        const customConfig = config && config.customConfig || this.customConfig

        if (shakeType === '__custom__') {
          this._shakeIt(customConfig, infinity, times)
        } else if (shakeType === 'horizontal' || shakeType === 'h') {
          this._shakeIt(_horizontalStepsConfig(amplitude, interval), infinity, times)
        } else if (shakeType === 'vertical' || shakeType === 'v') {
          return this._shakeIt(_verticalStepsConfig(amplitude, interval), infinity, times)
        } else {
          console.error('No shake type for' + type)
        }
      },
      stopShake() {
        const self = this
        this.stepsQueue.length = 0
        setTimeout(() => { // put in next event loop to avoid pre _move
          self._recover(self.interval)
        })
      },
    },
    mounted() {
      this.wrapper = this.$refs.shakeWrapper
    }
  }
</script>
