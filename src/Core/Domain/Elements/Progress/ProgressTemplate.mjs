export const ProgressTemplate = document.createElement('template');
ProgressTemplate.innerHTML = `<span class='text-small color-fg-muted mr-2'><span id='totalHandled'>0<span> of <span id='totalToHandle'>0<span></span>
<span class='Progress d-inline-flex' >
<span class='Progress-item color-bg-success-emphasis' id='totalHandledInPercent' style='width:0' ></span>
`