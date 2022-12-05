export const HeaderTemplate = document.createElement('template');
HeaderTemplate.id = "header-template";
HeaderTemplate.innerHTML = `
<div class='Header' style='height: 60px;'>
  <div class='Header-item position-absolute right-0'>
      <slot name='menu' template-id='menu-template'></slot>
  </div>
</div>
`