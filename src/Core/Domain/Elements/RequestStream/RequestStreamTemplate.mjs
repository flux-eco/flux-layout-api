export const RequestStreamTemplate = document.createElement('template');
RequestStreamTemplate.innerHTML = `
    <div class="Subhead">
      <h2 class="Subhead-heading" id="title">Plain subhead</h2>
    </div>
    <slot name='progress'></slot>
    <div class="Box">
        <ul id="stream-messages-container"><ul>    
    </div>
`