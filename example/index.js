var h = require('virtual-dom/h')
var formatter = require('data-format')()
var createElement = require('virtual-dom/create-element')
var form = require('../index')

var data = require('./data.json')
var formatted = formatter.format(data.data)
var state = window.state = {
  properties: formatted.properties,
  data: formatted.data
}

function oninput (e, rowKey, propertyKey, value) {
  console.log('updated', rowKey, propertyKey, value)
}

function onclose (e) {
  console.log('close', e)
}

function ondestroy (e) {
  console.log('destroy', e)
}

function onclick (e) {
  console.log('clicking', e.target)
}

function render (state) {
  state.activeRow = { data: state.data[0] }
  state.oninput = oninput
  state.onclose = onclose
  state.ondestroy = ondestroy
  state.onclick = onclick
  state.row = state.data[0]

  var tree = form(h, state)
  document.getElementById('app').appendChild(createElement(tree))
}

render(state)
