let _webGLUnit = require('../../lib/units/:webgl.unit');

let exec = async (gl, ipt, code) => {

            if (!gl.isExtensionSupported('OES_texture_float')) {
                throw ('OES_texture_float is not supported.');
            } else {
              console.log(gl.isExtensionSupported('OES_texture_float').prototype.isExtensionSupported);
            }

            let newBuffer = (data, f, e) => {
                let buf = gl.createBuffer();
                gl.bindBuffer((e || gl.ARRAY_BUFFER), buf);
                gl.bufferData((e || gl.ARRAY_BUFFER), new (f || Float32Array)(data), gl.STATIC_DRAW);
                return buf;
            };

            let createTexture = (data, size) => {

                let texture = gl.createTexture();

                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.FLOAT, data);
                gl.bindTexture(gl.TEXTURE_2D, null);

                return texture;
            };

            let positionBuffer = newBuffer([-1, -1, 1, -1, 1, 1, -1, 1]);
            let textureBuffer = newBuffer([0, 0, 1, 0, 1, 1, 0, 1]);
            let indexBuffer = newBuffer([1, 2, 0, 3, 0, 2], Uint16Array, gl.ELEMENT_ARRAY_BUFFER);

            let vertexShaderCode =
                ("attribute vec2 position;\n" +
                    "varying vec2 pos;\n" +
                    "attribute vec2 texture;\n" +
                    "\n" +
                    "void main(void) {\n" +
                    "  pos = texture;\n" +
                    "  gl_Position = vec4(position.xy, 0.0, 1.0);\n" +
                    "}");

            let stdlib =
                ("\n" +
                    "precision mediump float;\n" +
                    "uniform sampler2D u_texture;\n" +
                    "varying vec2 pos;\n" +
                    "\n" +
                    "vec4 read(void) {\n" +
                    "  return texture2D(u_texture, pos);\n" +
                    "}\n" +
                    "\n" +
                    "void commit(vec4 val) {\n" +
                    "  gl_FragColor = val;\n" +
                    "}\n" +
                    "\n");

            let vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertexShaderCode);
            gl.compileShader(vertexShader);

            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
                throw new Error(
                    "\nENGINE: Could not build internal vertex shader (fatal).\n" + "\n" +
                    "INFO: >REPORT< THIS. That's our fault!\n" + "\n" +
                    "--- CODE DUMP ---\n" + vertexShaderCode + "\n\n" +
                    "--- ERROR LOG ---\n" + gl.getShaderInfoLog(vertexShader)
                );
            }

            // ------------------------------------------ MAGIC ------------------------------------------------

            let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

            gl.shaderSource(
                fragmentShader,
                stdlib + code
            );

            gl.compileShader(fragmentShader);

            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                let LOC = code.split('\n');
                let dbgMsg = ("ERROR: Could not build shader (fatal).\n\n------------------ KERNEL CODE DUMP ------------------\n");

                for (let nl = 0; nl < LOC.length; nl++)
                    dbgMsg += (stdlib.split('\n').length + nl) + "> " + LOC[nl] + "\n";

                dbgMsg += ("\n--------------------- ERROR  LOG ---------------------\n" + gl.getShaderInfoLog(fragmentShader));

                throw new Error(dbgMsg);
            }

            let program = gl.createProgram();

            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error('ENGINE: Failed to link GLSL program code.');
            }

            let uTexture = gl.getUniformLocation(program, 'u_texture');
            let aPosition = gl.getAttribLocation(program, 'position');
            let aTexture = gl.getAttribLocation(program, 'texture');

            gl.useProgram(program);

            let size = Math.sqrt(ipt.data.length) / 4;
            let texture = createTexture(ipt.data, size);

            gl.viewport(0, 0, size, size);
            gl.bindFramebuffer(gl.FRAMEBUFFER, gl.createFramebuffer());

            let nTexture = createTexture(new Float32Array(ipt.data.length), size);

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, nTexture, 0);

            let frameBufferStatus = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE);

            if (!frameBufferStatus) {
                throw new Error('ENGINE: Error attaching float texture to framebuffer. Your device is probably incompatible. Error info: ' + gl.FRAMEBUFFER);
            }


            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(uTexture, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
            gl.enableVertexAttribArray(aTexture);
            gl.vertexAttribPointer(aTexture, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(aPosition);
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            gl.readPixels(0, 0, size, size, gl.RGBA, gl.FLOAT, ipt.data);

            return ipt.data.subarray(0, ipt.length);
};

let alloc = (sz) => {
    // A sane limit for most GPUs out there.
    // JS falls apart before GLSL limits could ever be reached.
    if (sz > 16777216)
        throw new Error("ENGINE: Whoops, the maximum array size is exceeded!");

    let ns = Math.pow(Math.pow(2, Math.ceil(Math.log(sz) / 1.386) - 1), 2);
    return {
        data: new Float32Array(ns * 16),
        length: sz
    };
};

module.exports = {
    exec: exec,
    alloc: alloc
};
