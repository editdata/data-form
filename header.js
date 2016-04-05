module.exports = function createFormHeader (h, options) {
  return h('div.data-form-header', [
    h('div.data-form-actions', [
      h('button.data-form-action.data-form-action-close.button', {
        onclick: options.onclick
      }, options.closeButtonText || 'close')
    ])
  ])
}
