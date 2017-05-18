import './assets/css/init.min.css'
import './assets/css/font-awesome.min.css'
import './styles/index.scss'

import vSlider from './components/slider'
import vSync from './components/sync'
import vPrettyScroll from './components/pretty-scroll'
import vSpin from './components/spin'
import vShake from './components/shake'
import vLayout from './components/layout'
import vStick from './components/stick'

const vvue = {
  vSlider,
  vSliderItem: vSlider.Item,
  vSync,
  vPrettyScroll,
  vSpin,
  vSpinTypeDefault: vSpin.Default,
  vSpinTypeCircle: vSpin.Circle,
  vShake,
  vLayout,
  vStick
}
const install = function (Vue, opts = {}) {
  Object.keys(vvue).forEach((key) => {
    Vue.component(key, vvue[key]);
  });
};

//auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(vvue, {install});
