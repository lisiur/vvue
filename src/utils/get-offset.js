import { getScroll } from './get-scroll'
export function getOffset(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = getScroll(window, true);
  const scrollLeft = getScroll(window);
  const docEl = window.document.body;
  const clientTop = docEl.clientTop || 0;
  const clientLeft = docEl.clientLeft || 0;
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}
