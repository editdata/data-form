var DataEditor = require('data-editor')
var formatter = require('data-format')()
var form = require('../index')({
  header: false
})

var data = require('./data.json')
var editor = DataEditor(document.getElementById('app'), {})
var formatted = formatter.format(data.data)

var state = window.state = {
  properties: formatted.properties,
  data: formatted.data
}

form.on('update', function (e, row, value, key) {
  console.log('updated', row, value, key)
})

function render (state) {
  state.activeRow = { data: state.data[0] }
  var tree = form.render(state)
  editor.render([tree], state)
}

render(state)
