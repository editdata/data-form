# data-form

Generate a form from the row of a dataset and it's JSONSchema-style properties.

[![npm](https://img.shields.io/npm/v/data-form.svg)](http://npmjs.com/data-form)

## Install

```sh
npm i --save editdata/data-form
```

## Example

```js
var format = require('data-format')
var createForm = require('../index')

var form = createForm({
  closeForm: closeForm,
  destroyForm: destroyForm,
  updateField: updateField,
  clickField: clickField,
  focusField: focusField,
  blurField: blurField
})

var data = [{
  example: 'text',
  another: 'more text',
  cool: 'another'
}]

var formatted = format(data)
var tree = form(formatted)
document.body.appendChild(tree)

function closeForm (e, state) {
  console.log('closeForm: implement form closing logic here')
}

function destroyForm (e, state) {
  console.log('destroyForm: implement logic to delete the resource here')
}

function updateField (e, key, value, prop, row, props) {
  console.log('updateField: use to update field in state', key, value)
}

function clickField (e, key, value, prop, row, props) {
  console.log('clickField: a field was clicked', key, value)
}

function focusField (e, key, value, prop, row, props) {
  console.log('focusField: a field is in focus', key, value)
}

function blurField (e, key, value, prop, row, props) {
  console.log('blurField: a field is no longer in focus', key, value)
}
```

## License

[MIT](LICENSE.md)
