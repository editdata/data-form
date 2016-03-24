var vraf = require('virtual-raf')
var h = require('virtual-dom/h')
var formatter = require('data-format')()
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

function onupdate (e, row) {
  console.log('new row data', row)
  state.row = row
  tree.update(state)
}

state.activeRow = { data: state.data[0] }
state.oninput = oninput
state.onclose = onclose
state.ondestroy = ondestroy
state.onclick = onclick
state.onupdate = onupdate
state.row = state.data[0]

function render (state) {
  return form(h, state)
}

var tree = vraf(state, render, require('virtual-dom'))
document.getElementById('app').appendChild(tree.render())
