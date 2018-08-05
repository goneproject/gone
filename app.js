
// TODO
// let engine = require('../lib/units/engine.unit.js');
//
// /*
// if (ENGINE) {
//     let foo = ENGINE.alloc(1e6);
//     console.log(foo.length);
// }
//  */
//
// let foo = engine.alloc(10);
// let nFactor = 4;
// (async () => {
//     for (let i = 0; i < 10; i++) foo.data[i] = i;
//     let answer = await engine.exec(foo, `
//     void main(void) {
//         commit(read() * ${nFactor}.);
//     }
//     `);
//
//     console.log(foo.data.subarray(0, 5));
//     console.log(await answer);
// })();