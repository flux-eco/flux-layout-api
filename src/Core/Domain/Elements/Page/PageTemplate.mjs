export const PageTemplate = {};
PageTemplate.default = document.createElement('template');
PageTemplate.default.innerHTML = `
  <slot name="top"></slot>
  <slot name="middle"></slot>
  <slot name="bottom"></slot>
  `