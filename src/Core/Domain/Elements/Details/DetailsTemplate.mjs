export const DetailsTemplate = document.createElement('template');
DetailsTemplate.id = "details-template";
DetailsTemplate.innerHTML = `
  <details class='details-reset mt-3 ml-3 mr-3'>
        <summary class='btn-link'><span id='title'></span> <span class="dropdown-caret"></summary>
        <div class="" id='details-content'>
             <slot name='content-item'></slot>
        </div>
      </details>
`