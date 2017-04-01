var html = require('bel')

module.exports = function createDataForm (options) {
  options = options || {}

  // NOTE: available event handlers:
  // options.destroyForm
  // options.closeForm
  // options.updateField
  // options.focusField
  // options.blurField
  // options.clickField

  var toolbar
  if (typeof options.toolbar === 'function' || options.toolbar === false) {
    toolbar = options.toolbar
  } else {
    toolbar = createToolbar(options)
  }

  var fields = createFields(options)

  function render (state) {
    return html`<div class="data-form">
      ${toolbar ? toolbar(state) : ''}
      ${fields(state)}
    </div>`
  }

  return render
}

function createToolbar (options) {
  var closeText = options.closeButtonText || 'close'
  var destroyText = options.destroyButtonText || 'destroy'
  var closeForm = options.closeForm || noop
  var destroyForm = options.destroyForm || noop

  return function render (state) {
    function onClickClose (e) {
      closeForm(e, state)
    }

    function onClickDestroy (e) {
      destroyForm(e, state)
    }

    return html`<div class="data-form-toolbar">
      <div class="data-form-toolbar-actions">
        <button class="data-form-action data-form-action-close button" onclick=${onClickClose}>
          ${closeText}
        </button>
        <button class="data-form-action data-form-action-destroy button" onclick=${onClickDestroy}>
          ${destroyText}
        </button>
      </div>
    </div>`
  }
}

function createFields (options) {
  var updateField = options.updateField || noop
  var focusField = options.focusField || noop
  var blurField = options.blurField || noop
  var clickField = options.clickField || noop

  return function render (state) {
    var values = state.data[0].value
    var props = state.properties
    var keys = Object.keys(props)

    var fieldOptions = {
      updateField: function update (e, key, value, prop) {
        updateField(e, key, value, prop, state.data[0], props)
      },
      focusField: function focus (e, key, value, prop) {
        focusField(e, key, value, prop, state.data[0], props)
      },
      blurField: function blur (e, key, value, prop) {
        blurField(e, key, value, prop, state.data[0], props)
      },
      clickField: function click (e, key, value, prop) {
        clickField(e, key, value, prop, state.data[0], props)
      }
    }

    var fields = keys.map(function (key) {
      var prop = props[key]
      // TODO: reimplement different field types
      return textField(prop.name, values[key], prop, fieldOptions)
    })

    return html`<div class="data-form-fields">
      <div class="data-form-fields-wrapper">
        ${fields}
      </div>
    </div>`
  }
}

// TODO: reimplement different field types
function textField (key, value, prop, options) {
  function onfocus (e) {
    var val = e.target.value
    options.focusField(e, key, val, prop)
  }

  function onblur (e) {
    var val = e.target.value
    options.blurField(e, key, val, prop)
  }

  function oninput (e) {
    var val = e.target.value
    options.updateField(e, key, val, prop)
  }

  function onclick (e) {
    var val = e.target.value
    options.clickField(e, key, val, prop)
  }

  return html`<div class="data-form-field" onclick=${onclick}>
    <label class="data-form-label" for="data-form-field-input-${prop.key}">
      ${key}
    </label>
    <textarea id="data-form-field-input-${prop.key}" onfocus=${onfocus} onblur=${onblur} oninput=${oninput} value=${value}>${value}</textarea>
  </div>`
}

function noop () {}
