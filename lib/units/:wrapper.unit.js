/*
:wrapper.unit.js
 */

// Binates
let _webGLBinding = require('../bindings/:webgl.binding');

/***
 * Wrap WebGL context
 * @param gl
 * @returns {WebGLRenderingContext}
 */

let privateMethods = ['resize', 'destroy'];

let wrapContext = gl => {
  let props = Object.keys(gl).concat(Object.keys(gl.constructor.prototype));

  let wrapper = new _webGLBinding.WebGLRenderingContext();

  props.forEach(function (prop) {
    if (prop[0] === '_' || prop[0] === '0' || prop[0] === '1') {
      return;
    }
    let value = gl[prop];
    if (typeof value === 'function') {
      if (privateMethods.indexOf(value) < 0) {
        wrapper[prop] = value.bind(gl);
      }
    } else {
      wrapper[prop] = value;
    }
  });

  Object.defineProperties(wrapper, {
    drawingBufferWidth: {
      get: function () {
        return gl.drawingBufferWidth;
      }
    },
    drawingBufferHeight: {
      get: function () {
        return gl.drawingBufferHeight;
      }
    }
  });

  return wrapper;
};

module.exports = {
  wrapContext: wrapContext
};