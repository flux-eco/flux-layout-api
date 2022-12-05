export const MenuTemplate = document.createElement('template');
MenuTemplate.id = "menu-template";
MenuTemplate.innerHTML = `
    <details class='details-reset details-overlay'>
    <summary class='btn' aria-haspopup='true'>
    <span id="title"></span>
    </summary><div class='SelectMenu'>
    <div class='SelectMenu-modal'>
    <div class='SelectMenu-list'>
    <slot name='menu-item-list'></slot>
    </div>
    </div>
    </div>
    </details>
`