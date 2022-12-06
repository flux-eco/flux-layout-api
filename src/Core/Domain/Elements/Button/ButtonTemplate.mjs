export const ButtonTemplate = {};
ButtonTemplate.primary = document.createElement('template');
ButtonTemplate.primary.innerHTML = `<button class='btn btn-primary' type='button'>Primary</button>`

ButtonTemplate.outline = document.createElement('template');
ButtonTemplate.outline.innerHTML = `<button class='btn btn-outline' type='button'>Outline</button>`

ButtonTemplate.danger = document.createElement('template');
ButtonTemplate.danger.innerHTML = `<button class='btn btn-danger' type='button'>Danger</button>`

ButtonTemplate.link = document.createElement('template');
ButtonTemplate.link.innerHTML = `<button class="btn-link" type="button">Link button</button>`