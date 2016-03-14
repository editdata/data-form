#data-form

Generate a form from the row of a dataset and it's JSONSchema-style properties.

## Install

    npm i --save editdata/data-form

## API

createDataForm(h, options)

### createDataForm

Create a form from the row of a dataset and its properties

**Parameters**
- `h` **Function** DOM hyperscript function
-   `options` **Object**
    -   `options.row` **Array** The row to be edited
    -   `options.properties` **Object** The row properties/column names
    -   `options.header` **Boolean**
    -   `options.header` **Object** virtual-dom vtree that should be used for the header
    -   `options.onclick` **Function** Event handler that fires when a field is clicked
    -   `options.oninput` **Function** Event handler that fires when a field is receiving input.  Receives the arguments `event`, `rowKey`, `propertyKey`, `inputValue`
    -   `options.oninput` **Function** Event handler that fires when a field is receiving input
    -   `options.ondestroy` **Function** Event handler that fires when user clicks the `destroy row` button.
    -   `options.onclose` **Function** Event handler that fires when user clicks the `close` button.

## License

[MIT](LICENSE.md)
