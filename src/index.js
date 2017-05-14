import './assets/css/init.min.css'
import './assets/css/font-awesome.min.css'

import Slider from './components/slider'
import Sync from './components/sync'

const vvue = {
  Slider,
  Sync
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
