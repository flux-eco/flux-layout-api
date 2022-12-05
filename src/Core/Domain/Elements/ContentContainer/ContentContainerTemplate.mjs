export const ContentContainerTemplate = document.createElement('template');
ContentContainerTemplate.id = "content-container-template";
ContentContainerTemplate.innerHTML = `
 <div class="container-lg clearfix p-5">
    <div class="pb-5">  <h1><slot name='title' template-id='string-template' slot-value-type="key-value-item"></slot></h1>
        <p><slot name='description' template-id='string-template' slot-value-type="key-value-item"></slot></p>
    </div>
    <slot name="tabnav"></slot>
    <div class="Box">
        <div class="Box-header d-flex flex-items-center">
            <h3 class="Box-title overflow-hidden flex-auto" id="title">
            </h3>
            <slot name='menu'></slot>
        </div>     
        <slot name='content-item'></slot>
    </div>
</div>
`