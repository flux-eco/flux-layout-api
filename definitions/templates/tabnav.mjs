export default `
    <template id='tabnav-template'>
        <div class='tabnav'>
            <nav class='tabnav-tabs'>
                <slot name='items' template-id='tabnav-item-template' slot-value-type="key-value-list" add-on-click-event='true'></slot>
            </nav>
        </div>

`;