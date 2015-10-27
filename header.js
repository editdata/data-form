var BaseElement = require('base-element')
var inherits = require('inherits')

module.exports = FormHeader
inherits(FormHeader, BaseElement)

function FormHeader () {
  if (!(this instanceof FormHeader)) return new FormHeader()
  BaseElement.call(this)
}

FormHeader.prototype.render = function (state) {
  var self = this
  var vtree = this.html('div.data-form-header', [
    this.html('div.data-form-actions', [
      this.html('button.data-form-action.data-form-action-close.button', {
        href: '#',
        onclick: function (e) {
          self.send('close', e)
        }
      }, 'close')
    ])
  ])
  return this.afterRender(vtree)
}
