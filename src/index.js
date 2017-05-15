import './assets/css/init.min.css'
import './assets/css/font-awesome.min.css'
import './styles/index.scss'

import vSlider from './components/slider'
import vSync from './components/sync'
import vPrettyScroll from './components/pretty-scroll'

const vvue = {
  vSlider,
  vSync,
  vPrettyScroll
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
