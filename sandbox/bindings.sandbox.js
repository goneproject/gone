/*
:bindings.vanilla.test.js
 */

// Binates
let _shaderUnit = require('../../lib/units/:shader.unit')
let _webGLUnit = require('../../lib/units/:webgl.unit')
let gl = _webGLUnit.createContext(60, 60)

// let foo = _shaderUnit.alloc(10);
// let nFactor = 4;
// (async () => {
//     for (let i = 0; i < 10; i++) foo.data[i] = i;
//     let answer = await _shaderUnit.exec(gl ,foo, `
//     void main(void) {
//         commit(read() * ${nFactor}.);
//     }
//     `);
//
//     console.log(foo.data.subarray(0, 5));
//     console.log(await answer);
// })();

console.log(gl.isExtensionSupported('OES_texture_float'))