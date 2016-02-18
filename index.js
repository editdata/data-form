var h = require('virtual-dom/h')
var Emitter = require('component-emitter')
var fields = require('data-fields')
var formatter = require('data-format')()
var createHeader = require('./header')

/**
* Create a form from the row of a dataset and its properties
* @name createDataForm
* @param {Object} options
* @param {Boolean} options.header
* @param {Object} options.header virtual-dom vtree that should be used for the header
*/
module.exports = function createDataForm (options) {
  options = options || {}
  var form = {}
  Emitter(form)

  var header
  if (typeof options.header === 'object') {
    header = options.header
  } else if (options.header !== false) {
    header = createHeader({
      onclick: function () {
        form.emit('close')
      }
    })
  }

  /**
  * Create a form from the row of a dataset and its properties
  * @name form.render
  * @param {Object} state
  * @param {Object} state.activeRow
  */
  form.render = function form_render (state) {
    if (!state.activeRow) return
    var row = state.activeRow
    var elements = []
    var columns = row.value

    Object.keys(columns).forEach(function (key) {
      var property = formatter.findProperty(state.properties, key)
      var value = columns[key]
      var type = property.type[0]

      if (type === 'array') { type = 'list' }
      if (type === 'object') {
        if (value.type && value.type === 'Feature') {
          type = 'geojson'
        } else {
          type = 'list'
        }
      }

      var fieldOptions = {
        fieldType: 'input',
        id: 'data-field-' + key
      }

      if (type === 'geojson') {
        fieldOptions.zoom = 12
        fieldOptions.center = [47.621958, -122.33636]
      }

      var field = fields[type](fieldOptions)
      var vtree = field.render(h, { value: value })

      field.on('update', function (e, value) {
        row.data.value[key] = value
        form.emit('update', e, row, value, key)
      })

      var label = h('label.data-form-label', property.name)
      var wrapper = h('div.data-form-field-wrapper', [label, vtree])
      elements.push(wrapper)
    })

    var sections = []

    if (header) {
      sections.push(header(state))
    }

    sections.push(h('div.data-form-fields', elements))
    return h('div#data-form-wrapper', [
      h('div#data-form', sections)
    ])
  }

  return form
}
