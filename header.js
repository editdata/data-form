var h = require('virtual-dom/h')

module.exports = function createFormHeader (options) {
  return function (state) {
    return h('div.data-form-header', [
      h('div.data-form-actions', [
        h('button.data-form-action.data-form-action-close.button', {
          onclick: options.onclick
        }, options.closeButton || 'close')
      ])
    ])
  }
}
