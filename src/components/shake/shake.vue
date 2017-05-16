<template>
    <div ref="shakeWrapper">
        <slot></slot>
    </div>
</template>
<script>
  const _move = (dom, offsetX, offsetY, time) => {
    dom.style.position = 'relative'
    dom.style.animation = `left ${time}, top ${time}`
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
      [-amplitude / 2, 0, interval * 0.25],
      [-amplitude    , 0, interval * 0.75],
      [-amplitude / 2, 0, interval * 0.75],
      [0             , 0, interval * 0.25],
      [amplitude / 2 , 0, interval * 0.25],
      [amplitude     , 0, interval * 0.75],
      [amplitude / 2 , 0, interval * 0.75],
      [0             , 0, interval * 0.25]
    ]
  }
  const _verticalStepsConfig = (amplitude, interval) => {
    return [
      [0, -amplitude / 2, interval * 0.25],
      [0, -amplitude    , interval * 0.75],
      [0, -amplitude / 2, interval * 0.75],
      [0, 0             , interval * 0.25],
      [0, amplitude / 2 , interval * 0.25],
      [0, amplitude     , interval * 0.75],
      [0, amplitude / 2 , interval * 0.75],
      [0, 0             , interval * 0.25]
    ]
  }
  export default {
    name: 'Shake',
    props: {
      interval: {
        type: Number,
        default: 50
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
        if (this.type === 'h') return 'horizontal'
        if (this.type === 'v') return 'vertical'
        return this.type
      }
    },
    methods: {
      _shakeSteps(lastInterval=0) {
        if (this.stepsQueue.length > 0) {
          const currentStep = this.stepsQueue.shift()
          const self = this
          setTimeout(() => {
            _move(self.wrapper, currentStep.x, currentStep.y, (currentStep.interval/1000) + 's')
            self._shakeSteps(currentStep.interval)
          }, lastInterval)
        }
      },
      _shakeIt(config, times=this.times) {
        this.stopShake()
        this.stepsQueue = _constructSteps(config, times)
        this._shakeSteps()
      },
      shake() {
        if (this.customConfig.length !== 0) {
          this._shakeIt(this.customConfig)
        } else if (this.shakeType === 'horizontal') {
          this._shakeIt(_horizontalStepsConfig(this.amplitude, this.interval))
        } else if (this.shakeType === 'vertical') {
          return this._shakeIt(_verticalStepsConfig(this.amplitude, this.interval))
        } else {
          console.error('No shake type for' + type)
        }
      },
      stopShake() {
        this.stepsQueue.length = 0
      },
    },
    mounted() {
      this.wrapper = this.$refs.shakeWrapper
    }
  }
</script>
