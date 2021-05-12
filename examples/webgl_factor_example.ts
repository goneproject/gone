let webgl = require('../api/webgl.js');

let foo = engine.alloc(10);
let nFactor = 4;
 (async () => {
     for (let i = 0; i < 10; i++) foo.data[i] = i;
     let answer = await engine.exec(foo, `
     void main(void) {
         commit(read() * ${nFactor}.);
     }
     `);

     console.log(foo.data.subarray(0, 5));
     console.log(await answer);
 })();
