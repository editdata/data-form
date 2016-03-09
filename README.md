#data-form

Generate a form from the row of a dataset and it's JSONSchema-style properties.

## Install

    npm i --save editdata/data-form

## API

### createDataForm

Create a form from the row of a dataset and its properties

**Parameters**

-   `options` **Object**
    -   `options.row` **Array** The row to be edited
    -   `options.properties` **Object** The row properties/column names
    -   `options.header` **Boolean**
    -   `options.header` **Object** virtual-dom vtree that should be used for the header

## License

[MIT](LICENSE.md)
