let wasm;

function getFromExternrefTable0(idx) { return wasm.__wbindgen_export_0.get(idx); }

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
                if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
                    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
                }
                return cachedUint8ArrayMemory0;
            }

function getStringFromWasm0(ptr, len) {
                ptr = ptr >>> 0;
                return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
            }

function getCachedStringFromWasm0(ptr, len) {
                if (ptr === 0) {
                    return getFromExternrefTable0(len);
                } else {
                    return getStringFromWasm0(ptr, len);
                }
            }

function addToExternrefTable0(obj) {
                    const idx = wasm.__externref_table_alloc();
                    wasm.__wbindgen_export_0.set(idx, obj);
                    return idx;
                }

function handleError(f, args) {
                        try {
                            return f.apply(this, args);
                        } catch (e) {
                            const idx = addToExternrefTable0(e);
                            wasm.__wbindgen_exn_store(idx);
                        }
                    }

function isLikeNone(x) {
                return x === undefined || x === null;
            }

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
                        ? function (arg, view) {
            return cachedTextEncoder.encodeInto(arg, view);
        }
                        : function (arg, view) {
            const buf = cachedTextEncoder.encode(arg);
            view.set(buf);
            return {
                read: arg.length,
                written: buf.length
            };
        });

function passStringToWasm0(arg, malloc, realloc) {
                
                if (realloc === undefined) {
                    const buf = cachedTextEncoder.encode(arg);
                    const ptr = malloc(buf.length, 1) >>> 0;
                    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
                    WASM_VECTOR_LEN = buf.length;
                    return ptr;
                }

                let len = arg.length;
                let ptr = malloc(len, 1) >>> 0;

                const mem = getUint8ArrayMemory0();

                let offset = 0;

                for (; offset < len; offset++) {
                    const code = arg.charCodeAt(offset);
                    if (code > 0x7F) break;
                    mem[ptr + offset] = code;
                }
            
                if (offset !== len) {
                    if (offset !== 0) {
                        arg = arg.slice(offset);
                    }
                    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
                    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
                    const ret = encodeString(arg, view);
                    
                    offset += ret.written;
                    ptr = realloc(ptr, len, offset, 1) >>> 0;
                }

                WASM_VECTOR_LEN = offset;
                return ptr;
            }

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
                if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
                    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
                }
                return cachedDataViewMemory0;
            }

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry(state => {
                    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b)
                });

function makeMutClosure(arg0, arg1, dtor, f) {
                const state = { a: arg0, b: arg1, cnt: 1, dtor };
                const real = (...args) => {
                    // First up with a closure we increment the internal reference
                    // count. This ensures that the Rust closure environment won't
                    // be deallocated while we're invoking it.
                    state.cnt++;
                    const a = state.a;
                    state.a = 0;
                    try {
                        return f(a, state.b, ...args);
                    } finally {
                        if (--state.cnt === 0) {
                            wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
                            CLOSURE_DTORS.unregister(state);
                        } else {
                            state.a = a;
                        }
                    }
                };
                real.original = state;
                CLOSURE_DTORS.register(real, state, state);
                return real;
            }

function debugString(val) {
                // primitive types
                const type = typeof val;
                if (type == 'number' || type == 'boolean' || val == null) {
                    return  `${val}`;
                }
                if (type == 'string') {
                    return `"${val}"`;
                }
                if (type == 'symbol') {
                    const description = val.description;
                    if (description == null) {
                        return 'Symbol';
                    } else {
                        return `Symbol(${description})`;
                    }
                }
                if (type == 'function') {
                    const name = val.name;
                    if (typeof name == 'string' && name.length > 0) {
                        return `Function(${name})`;
                    } else {
                        return 'Function';
                    }
                }
                // objects
                if (Array.isArray(val)) {
                    const length = val.length;
                    let debug = '[';
                    if (length > 0) {
                        debug += debugString(val[0]);
                    }
                    for(let i = 1; i < length; i++) {
                        debug += ', ' + debugString(val[i]);
                    }
                    debug += ']';
                    return debug;
                }
                // Test for built-in
                const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
                let className;
                if (builtInMatches && builtInMatches.length > 1) {
                    className = builtInMatches[1];
                } else {
                    // Failed to match the standard '[object ClassName]'
                    return toString.call(val);
                }
                if (className == 'Object') {
                    // we're a user defined class or Object
                    // JSON.stringify avoids problems with cycles, and is generally much
                    // easier than looping through ownProperties of `val`.
                    try {
                        return 'Object(' + JSON.stringify(val) + ')';
                    } catch (_) {
                        return 'Object';
                    }
                }
                // errors
                if (val instanceof Error) {
                    return `${val.name}: ${val.message}\n${val.stack}`;
                }
                // TODO we could test for more things here, like `Set`s and `Map`s.
                return className;
            }

export function hydrate() {
wasm.hydrate();
}

function __wbg_adapter_44(arg0, arg1) {
wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4de226542b3bf314(arg0, arg1);
}

function __wbg_adapter_47(arg0, arg1, arg2) {
wasm.closure352_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_50(arg0, arg1) {
wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h91d18030ec7993a5(arg0, arg1);
}

function __wbg_adapter_53(arg0, arg1, arg2) {
wasm.closure456_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_277(arg0, arg1, arg2, arg3) {
wasm.closure481_externref_shim(arg0, arg1, arg2, arg3);
}

const __wbindgen_enum_ReadableStreamType = ["bytes"];

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));

export class IntoUnderlyingByteSource {

            __destroy_into_raw() {
                const ptr = this.__wbg_ptr;
                this.__wbg_ptr = 0;
                IntoUnderlyingByteSourceFinalization.unregister(this);
                return ptr;
            }

            free() {
                const ptr = this.__destroy_into_raw();
                wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
            }
            /**
 * @returns {ReadableStreamType}
 */
get type() {
const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
return __wbindgen_enum_ReadableStreamType[ret];
}
/**
 * @returns {number}
 */
get autoAllocateChunkSize() {
const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
return ret >>> 0;
}
/**
 * @param {ReadableByteStreamController} controller
 */
start(controller) {
wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
}
/**
 * @param {ReadableByteStreamController} controller
 * @returns {Promise<any>}
 */
pull(controller) {
const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
return ret;
}
cancel() {
const ptr = this.__destroy_into_raw();
wasm.intounderlyingbytesource_cancel(ptr);
}
}

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));

export class IntoUnderlyingSink {

            __destroy_into_raw() {
                const ptr = this.__wbg_ptr;
                this.__wbg_ptr = 0;
                IntoUnderlyingSinkFinalization.unregister(this);
                return ptr;
            }

            free() {
                const ptr = this.__destroy_into_raw();
                wasm.__wbg_intounderlyingsink_free(ptr, 0);
            }
            /**
 * @param {any} chunk
 * @returns {Promise<any>}
 */
write(chunk) {
const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
return ret;
}
/**
 * @returns {Promise<any>}
 */
close() {
const ptr = this.__destroy_into_raw();
const ret = wasm.intounderlyingsink_close(ptr);
return ret;
}
/**
 * @param {any} reason
 * @returns {Promise<any>}
 */
abort(reason) {
const ptr = this.__destroy_into_raw();
const ret = wasm.intounderlyingsink_abort(ptr, reason);
return ret;
}
}

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));

export class IntoUnderlyingSource {

            __destroy_into_raw() {
                const ptr = this.__wbg_ptr;
                this.__wbg_ptr = 0;
                IntoUnderlyingSourceFinalization.unregister(this);
                return ptr;
            }

            free() {
                const ptr = this.__destroy_into_raw();
                wasm.__wbg_intounderlyingsource_free(ptr, 0);
            }
            /**
 * @param {ReadableStreamDefaultController} controller
 * @returns {Promise<any>}
 */
pull(controller) {
const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
return ret;
}
cancel() {
const ptr = this.__destroy_into_raw();
wasm.intounderlyingsource_cancel(ptr);
}
}

async function __wbg_load(module, imports) {
                    if (typeof Response === 'function' && module instanceof Response) {
                        if (typeof WebAssembly.instantiateStreaming === 'function') {
                            try {
                                return await WebAssembly.instantiateStreaming(module, imports);

                            } catch (e) {
                                if (module.headers.get('Content-Type') != 'application/wasm') {
                                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                                } else {
                                    throw e;
                                }
                            }
                        }

                        const bytes = await module.arrayBuffer();
                        return await WebAssembly.instantiate(bytes, imports);

                    } else {
                        const instance = await WebAssembly.instantiate(module, imports);

                        if (instance instanceof WebAssembly.Instance) {
                            return { instance, module };

                        } else {
                            return instance;
                        }
                    }
                }

                function __wbg_get_imports() {
                    const imports = {};
                    imports.wbg = {};
imports.wbg.__wbg_addEventListener_ad9617755da8fbe8 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.addEventListener(v0, arg3);
}, arguments) };
imports.wbg.__wbg_altKey_d2ad93ef54deb903 = function(arg0) {
const ret = arg0.altKey;
return ret;
};
imports.wbg.__wbg_appendChild_daddabaedb4a1728 = function() { return handleError(function (arg0, arg1) {
const ret = arg0.appendChild(arg1);
return ret;
}, arguments) };
imports.wbg.__wbg_append_3f7f164bc7d0afd9 = function() { return handleError(function (arg0, arg1, arg2) {
arg0.append(arg1, arg2);
}, arguments) };
imports.wbg.__wbg_before_14893f35be58ad51 = function() { return handleError(function (arg0, arg1) {
arg0.before(arg1);
}, arguments) };
imports.wbg.__wbg_before_a5debbbcdc74ee52 = function() { return handleError(function (arg0, arg1) {
arg0.before(arg1);
}, arguments) };
imports.wbg.__wbg_body_39801f8e28a17e0d = function(arg0) {
const ret = arg0.body;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_buffer_4cc4466b579d16b4 = function(arg0) {
const ret = arg0.buffer;
return ret;
};
imports.wbg.__wbg_buffer_71667b1101df19da = function(arg0) {
const ret = arg0.buffer;
return ret;
};
imports.wbg.__wbg_button_e8c44aa42b50bef9 = function(arg0) {
const ret = arg0.button;
return ret;
};
imports.wbg.__wbg_byobRequest_9dd6d13eb365e223 = function(arg0) {
const ret = arg0.byobRequest;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_byteLength_e84fb9e4a2940d2c = function(arg0) {
const ret = arg0.byteLength;
return ret;
};
imports.wbg.__wbg_byteOffset_05ea0b08782f01bd = function(arg0) {
const ret = arg0.byteOffset;
return ret;
};
imports.wbg.__wbg_call_75b89300dd530ca6 = function() { return handleError(function (arg0, arg1, arg2) {
const ret = arg0.call(arg1, arg2);
return ret;
}, arguments) };
imports.wbg.__wbg_call_d68488931693e6ee = function() { return handleError(function (arg0, arg1) {
const ret = arg0.call(arg1);
return ret;
}, arguments) };
imports.wbg.__wbg_childNodes_db685c63dbcd5537 = function(arg0) {
const ret = arg0.childNodes;
return ret;
};
imports.wbg.__wbg_cloneNode_b3ad5fe78182a3e7 = function() { return handleError(function (arg0) {
const ret = arg0.cloneNode();
return ret;
}, arguments) };
imports.wbg.__wbg_close_2c98beee2b59af63 = function() { return handleError(function (arg0) {
arg0.close();
}, arguments) };
imports.wbg.__wbg_close_f825000f2241f096 = function() { return handleError(function (arg0) {
arg0.close();
}, arguments) };
imports.wbg.__wbg_composedPath_ee4f72591e0d0f75 = function(arg0) {
const ret = arg0.composedPath();
return ret;
};
imports.wbg.__wbg_createComment_e4c00ebde70478b2 = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.createComment(v0);
return ret;
};
imports.wbg.__wbg_createDocumentFragment_d041a9d2f85d2ed1 = function(arg0) {
const ret = arg0.createDocumentFragment();
return ret;
};
imports.wbg.__wbg_createElement_51ffea4765cb1cc5 = function() { return handleError(function (arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.createElement(v0);
return ret;
}, arguments) };
imports.wbg.__wbg_createTextNode_86708483bc3c5132 = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.createTextNode(v0);
return ret;
};
imports.wbg.__wbg_createTreeWalker_a48515596b8beef2 = function() { return handleError(function (arg0, arg1, arg2) {
const ret = arg0.createTreeWalker(arg1, arg2 >>> 0);
return ret;
}, arguments) };
imports.wbg.__wbg_ctrlKey_b18a47cac80f5ed7 = function(arg0) {
const ret = arg0.ctrlKey;
return ret;
};
imports.wbg.__wbg_dataset_d2cf01c763ceb005 = function(arg0) {
const ret = arg0.dataset;
return ret;
};
imports.wbg.__wbg_decodeURIComponent_b5e7c28797af50ab = function() { return handleError(function (arg0, arg1) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
const ret = decodeURIComponent(v0);
return ret;
}, arguments) };
imports.wbg.__wbg_decodeURI_708ceea9a5b1301e = function() { return handleError(function (arg0, arg1) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
const ret = decodeURI(v0);
return ret;
}, arguments) };
imports.wbg.__wbg_defaultPrevented_732aa296a00ba0f6 = function(arg0) {
const ret = arg0.defaultPrevented;
return ret;
};
imports.wbg.__wbg_document_7689f46a8f647c96 = function(arg0) {
const ret = arg0.document;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_done_3ca5b09e8598078d = function(arg0) {
const ret = arg0.done;
return ret;
};
imports.wbg.__wbg_enqueue_8a48484465436b3b = function() { return handleError(function (arg0, arg1) {
arg0.enqueue(arg1);
}, arguments) };
imports.wbg.__wbg_entries_d873dde863e50b8c = function(arg0) {
const ret = Object.entries(arg0);
return ret;
};
imports.wbg.__wbg_error_2ca63459aa969937 = function(arg0) {
console.error(arg0);
};
imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
if (arg0 !== 0) { wasm.__wbindgen_free(arg0, arg1, 1); }
console.error(v0);
};
imports.wbg.__wbg_exec_7230cd5c145b872e = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.exec(v0);
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_getAttribute_876366f2916a83fc = function(arg0, arg1, arg2, arg3) {
var v0 = getCachedStringFromWasm0(arg2, arg3);
const ret = arg1.getAttribute(v0);
var ptr2 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
var len2 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len2, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr2, true);
};
imports.wbg.__wbg_getElementById_ce95590ef98fe114 = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.getElementById(v0);
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_get_726e3873086e7183 = function(arg0, arg1, arg2, arg3) {
var v0 = getCachedStringFromWasm0(arg2, arg3);
const ret = arg1[v0];
var ptr2 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
var len2 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len2, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr2, true);
};
imports.wbg.__wbg_get_c122b1d576cf1fdb = function(arg0, arg1) {
const ret = arg0[arg1 >>> 0];
return ret;
};
imports.wbg.__wbg_get_ddd82e34e6366fb9 = function() { return handleError(function (arg0, arg1) {
const ret = Reflect.get(arg0, arg1);
return ret;
}, arguments) };
imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
const ret = arg0[arg1];
return ret;
};
imports.wbg.__wbg_globalThis_59c7794d9413986f = function() { return handleError(function () {
const ret = globalThis.globalThis;
return ret;
}, arguments) };
imports.wbg.__wbg_global_04c81bad83a72129 = function() { return handleError(function () {
const ret = global.global;
return ret;
}, arguments) };
imports.wbg.__wbg_hasAttribute_10d61da464139fd3 = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.hasAttribute(v0);
return ret;
};
imports.wbg.__wbg_hash_1b8b81a17fbce53f = function() { return handleError(function (arg0, arg1) {
const ret = arg1.hash;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };
imports.wbg.__wbg_hash_bca72f76a3178bc8 = function(arg0, arg1) {
const ret = arg1.hash;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_head_f593be76595faa59 = function(arg0) {
const ret = arg0.head;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_history_28c9f6bada41fa0e = function() { return handleError(function (arg0) {
const ret = arg0.history;
return ret;
}, arguments) };
imports.wbg.__wbg_href_02e76f823c19d30c = function(arg0, arg1) {
const ret = arg1.href;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_href_fe620cbb08310f18 = function(arg0, arg1) {
const ret = arg1.href;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_instanceof_ArrayBuffer_36214dbc6ea8dd3d = function(arg0) {
let result;
                    try {
                        result = arg0 instanceof ArrayBuffer;
                    } catch (_) {
                        result = false;
                    }
                    const ret = result;
return ret;
};
imports.wbg.__wbg_instanceof_HtmlAnchorElement_93ffbf43e94800f9 = function(arg0) {
let result;
                    try {
                        result = arg0 instanceof HTMLAnchorElement;
                    } catch (_) {
                        result = false;
                    }
                    const ret = result;
return ret;
};
imports.wbg.__wbg_instanceof_Uint8Array_0d898f7981fe0a2d = function(arg0) {
let result;
                    try {
                        result = arg0 instanceof Uint8Array;
                    } catch (_) {
                        result = false;
                    }
                    const ret = result;
return ret;
};
imports.wbg.__wbg_instanceof_Window_47f723ed0409d724 = function(arg0) {
let result;
                    try {
                        result = arg0 instanceof Window;
                    } catch (_) {
                        result = false;
                    }
                    const ret = result;
return ret;
};
imports.wbg.__wbg_isArray_435f9cb9abc7eccc = function(arg0) {
const ret = Array.isArray(arg0);
return ret;
};
imports.wbg.__wbg_isSafeInteger_2817b2c8ebdd29d2 = function(arg0) {
const ret = Number.isSafeInteger(arg0);
return ret;
};
imports.wbg.__wbg_is_c0f4e2085c8d91e1 = function(arg0, arg1) {
const ret = Object.is(arg0, arg1);
return ret;
};
imports.wbg.__wbg_item_e4865fb0fce356b0 = function(arg0, arg1) {
const ret = arg0.item(arg1 >>> 0);
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_iterator_2a6b115668862130 = function() {
const ret = Symbol.iterator;
return ret;
};
imports.wbg.__wbg_length_b52c3d528b88468e = function(arg0) {
const ret = arg0.length;
return ret;
};
imports.wbg.__wbg_length_cc2c33deb047a05b = function(arg0) {
const ret = arg0.length;
return ret;
};
imports.wbg.__wbg_length_e9123d1e4db12534 = function(arg0) {
const ret = arg0.length;
return ret;
};
imports.wbg.__wbg_location_d103e836c52d0920 = function(arg0) {
const ret = arg0.location;
return ret;
};
imports.wbg.__wbg_metaKey_139fd4bb4a7f3fdc = function(arg0) {
const ret = arg0.metaKey;
return ret;
};
imports.wbg.__wbg_namespaceURI_84ad0fdc486ae542 = function(arg0, arg1) {
const ret = arg1.namespaceURI;
var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
var len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_new_10003836f2677621 = function(arg0, arg1, arg2, arg3) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
var v1 = getCachedStringFromWasm0(arg2, arg3);
const ret = new RegExp(v0, v1);
return ret;
};
imports.wbg.__wbg_new_51fd3aeaa6d3d03f = function(arg0, arg1) {
try {
var state0 = {a: arg0, b: arg1};
var cb0 = (arg0, arg1) => {
const a = state0.a;
state0.a = 0;
try {
return __wbg_adapter_277(a, state0.b, arg0, arg1);
} finally {
state0.a = a;
}
};
const ret = new Promise(cb0);
return ret;
} finally {
state0.a = state0.b = 0;
}
};
imports.wbg.__wbg_new_5bd3cfec88bd010e = function(arg0, arg1) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
const ret = new Error(v0);
return ret;
};
imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
const ret = new Error();
return ret;
};
imports.wbg.__wbg_new_9ed4506807911440 = function(arg0) {
const ret = new Uint8Array(arg0);
return ret;
};
imports.wbg.__wbg_newnoargs_fe7e106c48aadd7e = function(arg0, arg1) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
const ret = new Function(v0);
return ret;
};
imports.wbg.__wbg_newwithbase_3e89facdc4b45c72 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
var v0 = getCachedStringFromWasm0(arg0, arg1);
var v1 = getCachedStringFromWasm0(arg2, arg3);
const ret = new URL(v0, v1);
return ret;
}, arguments) };
imports.wbg.__wbg_newwithbyteoffsetandlength_a51b517eb0e8fbf4 = function(arg0, arg1, arg2) {
const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
return ret;
};
imports.wbg.__wbg_nextNode_43077ba4421d37bb = function() { return handleError(function (arg0) {
const ret = arg0.nextNode();
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };
imports.wbg.__wbg_nextSibling_5dd0879ef893f708 = function(arg0) {
const ret = arg0.nextSibling;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_next_86c8f7dfb19a94eb = function() { return handleError(function (arg0) {
const ret = arg0.next();
return ret;
}, arguments) };
imports.wbg.__wbg_next_b39104aeda52ac60 = function(arg0) {
const ret = arg0.next;
return ret;
};
imports.wbg.__wbg_nodeName_31090a044fc93523 = function(arg0, arg1) {
const ret = arg1.nodeName;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_origin_33e525b3abd804cf = function() { return handleError(function (arg0, arg1) {
const ret = arg1.origin;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };
imports.wbg.__wbg_origin_81f4bd192488990e = function(arg0, arg1) {
const ret = arg1.origin;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_outerHTML_e0509691cfdacf56 = function(arg0, arg1) {
const ret = arg1.outerHTML;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_pathname_12a663b40d81039a = function(arg0, arg1) {
const ret = arg1.pathname;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_pathname_f4c73464379abf9e = function() { return handleError(function (arg0, arg1) {
const ret = arg1.pathname;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };
imports.wbg.__wbg_preventDefault_7cd87fa71683fc8f = function(arg0) {
arg0.preventDefault();
};
imports.wbg.__wbg_previousSibling_f05e5f738946758c = function(arg0) {
const ret = arg0.previousSibling;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_pushState_aa3f82bc57f19dd0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
var v0 = getCachedStringFromWasm0(arg2, arg3);
var v1 = getCachedStringFromWasm0(arg4, arg5);
arg0.pushState(arg1, v0, v1);
}, arguments) };
imports.wbg.__wbg_querySelectorAll_052eac35cdb76210 = function() { return handleError(function (arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.querySelectorAll(v0);
return ret;
}, arguments) };
imports.wbg.__wbg_querySelector_ab5b6a4f61d535d5 = function() { return handleError(function (arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
const ret = arg0.querySelector(v0);
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };
imports.wbg.__wbg_queueMicrotask_5a8a9131f3f0b37b = function(arg0) {
const ret = arg0.queueMicrotask;
return ret;
};
imports.wbg.__wbg_queueMicrotask_6d79674585219521 = function(arg0) {
queueMicrotask(arg0);
};
imports.wbg.__wbg_removeAttribute_2fd4894609c8ce06 = function() { return handleError(function (arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.removeAttribute(v0);
}, arguments) };
imports.wbg.__wbg_removeChild_28f5cd5ebb18ae8e = function() { return handleError(function (arg0, arg1) {
const ret = arg0.removeChild(arg1);
return ret;
}, arguments) };
imports.wbg.__wbg_removeEventListener_f420b4f37f515116 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.removeEventListener(v0, arg3);
}, arguments) };
imports.wbg.__wbg_remove_52bfcaff25d6cf50 = function(arg0) {
arg0.remove();
};
imports.wbg.__wbg_remove_844123e436d13065 = function(arg0) {
arg0.remove();
};
imports.wbg.__wbg_replaceState_0edd916282b64c6a = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
var v0 = getCachedStringFromWasm0(arg2, arg3);
var v1 = getCachedStringFromWasm0(arg4, arg5);
arg0.replaceState(arg1, v0, v1);
}, arguments) };
imports.wbg.__wbg_requestAnimationFrame_c63a6b8ad5f85d24 = function() { return handleError(function (arg0, arg1) {
const ret = arg0.requestAnimationFrame(arg1);
return ret;
}, arguments) };
imports.wbg.__wbg_resolve_33aaa312c39e688c = function(arg0) {
const ret = Promise.resolve(arg0);
return ret;
};
imports.wbg.__wbg_respond_442db8b929a98e76 = function() { return handleError(function (arg0, arg1) {
arg0.respond(arg1 >>> 0);
}, arguments) };
imports.wbg.__wbg_scrollIntoView_7b81853ddfc9f282 = function(arg0) {
arg0.scrollIntoView();
};
imports.wbg.__wbg_scrollTo_10dc674a440a3169 = function(arg0, arg1, arg2) {
arg0.scrollTo(arg1, arg2);
};
imports.wbg.__wbg_searchParams_b91890aed3e49590 = function(arg0) {
const ret = arg0.searchParams;
return ret;
};
imports.wbg.__wbg_search_89e7e03373553f0b = function(arg0, arg1) {
const ret = arg1.search;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_search_9766a64e4a830960 = function() { return handleError(function (arg0, arg1) {
const ret = arg1.search;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };
imports.wbg.__wbg_self_c9a63b952bd22cbd = function() { return handleError(function () {
const ret = self.self;
return ret;
}, arguments) };
imports.wbg.__wbg_setAttribute_3d1326b2d681f50e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
var v1 = getCachedStringFromWasm0(arg3, arg4);
arg0.setAttribute(v0, v1);
}, arguments) };
imports.wbg.__wbg_set_e8d9380e866a1e41 = function(arg0, arg1, arg2) {
arg0.set(arg1, arg2 >>> 0);
};
imports.wbg.__wbg_setdata_5ba64d5808cc682a = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.data = v0;
};
imports.wbg.__wbg_sethref_b50b9cb99365bb8d = function() { return handleError(function (arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.href = v0;
}, arguments) };
imports.wbg.__wbg_setinnerHTML_412032fa3570c106 = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.innerHTML = v0;
};
imports.wbg.__wbg_settextContent_8aa5fee2cdfef876 = function(arg0, arg1, arg2) {
var v0 = getCachedStringFromWasm0(arg1, arg2);
arg0.textContent = v0;
};
imports.wbg.__wbg_shiftKey_15a826ae86780b66 = function(arg0) {
const ret = arg0.shiftKey;
return ret;
};
imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
const ret = arg1.stack;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_state_700a50d8e8718898 = function() { return handleError(function (arg0) {
const ret = arg0.state;
return ret;
}, arguments) };
imports.wbg.__wbg_target_07ff857af641679a = function(arg0, arg1) {
const ret = arg1.target;
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_textContent_9d6d40582d0c5e46 = function(arg0, arg1) {
const ret = arg1.textContent;
var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
var len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_then_acd4f2d41ed1cf58 = function(arg0, arg1) {
const ret = arg0.then(arg1);
return ret;
};
imports.wbg.__wbg_value_f82ca5432417c8ff = function(arg0) {
const ret = arg0.value;
return ret;
};
imports.wbg.__wbg_view_f0ef1c95fdf68f4a = function(arg0) {
const ret = arg0.view;
return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};
imports.wbg.__wbg_warn_f70d9f1be6c62e43 = function(arg0) {
console.warn(arg0);
};
imports.wbg.__wbg_window_81304a10d2638125 = function() { return handleError(function () {
const ret = window.window;
return ret;
}, arguments) };
imports.wbg.__wbindgen_as_number = function(arg0) {
const ret = +arg0;
return ret;
};
imports.wbg.__wbindgen_boolean_get = function(arg0) {
const v = arg0;
const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
return ret;
};
imports.wbg.__wbindgen_cb_drop = function(arg0) {
const obj = arg0.original;
if (obj.cnt-- == 1) {
obj.a = 0;
return true;
}
const ret = false;
return ret;
};
imports.wbg.__wbindgen_closure_wrapper5748 = function(arg0, arg1, arg2) {
const ret = makeMutClosure(arg0, arg1, 351, __wbg_adapter_44);
return ret;
};
imports.wbg.__wbindgen_closure_wrapper5750 = function(arg0, arg1, arg2) {
const ret = makeMutClosure(arg0, arg1, 353, __wbg_adapter_47);
return ret;
};
imports.wbg.__wbindgen_closure_wrapper6504 = function(arg0, arg1, arg2) {
const ret = makeMutClosure(arg0, arg1, 418, __wbg_adapter_50);
return ret;
};
imports.wbg.__wbindgen_closure_wrapper7766 = function(arg0, arg1, arg2) {
const ret = makeMutClosure(arg0, arg1, 457, __wbg_adapter_53);
return ret;
};
imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
const ret = debugString(arg1);
const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
const len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
const ret = new Error(getStringFromWasm0(arg0, arg1));
return ret;
};
imports.wbg.__wbindgen_in = function(arg0, arg1) {
const ret = arg0 in arg1;
return ret;
};
imports.wbg.__wbindgen_init_externref_table = function() {
const table = wasm.__wbindgen_export_0;
const offset = table.grow(4);
table.set(0, undefined);
table.set(offset + 0, undefined);
table.set(offset + 1, null);
table.set(offset + 2, true);
table.set(offset + 3, false);
;
};
imports.wbg.__wbindgen_is_function = function(arg0) {
const ret = typeof(arg0) === 'function';
return ret;
};
imports.wbg.__wbindgen_is_null = function(arg0) {
const ret = arg0 === null;
return ret;
};
imports.wbg.__wbindgen_is_object = function(arg0) {
const val = arg0;
const ret = typeof(val) === 'object' && val !== null;
return ret;
};
imports.wbg.__wbindgen_is_string = function(arg0) {
const ret = typeof(arg0) === 'string';
return ret;
};
imports.wbg.__wbindgen_is_undefined = function(arg0) {
const ret = arg0 === undefined;
return ret;
};
imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
const ret = arg0 === arg1;
return ret;
};
imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
const ret = arg0 == arg1;
return ret;
};
imports.wbg.__wbindgen_memory = function() {
const ret = wasm.memory;
return ret;
};
imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
const obj = arg1;
const ret = typeof(obj) === 'number' ? obj : undefined;
getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};
imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
const obj = arg1;
const ret = typeof(obj) === 'string' ? obj : undefined;
var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
var len1 = WASM_VECTOR_LEN;
getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
const ret = getStringFromWasm0(arg0, arg1);
return ret;
};
imports.wbg.__wbindgen_throw = function(arg0, arg1) {
throw new Error(getStringFromWasm0(arg0, arg1));
};

                    return imports;
                }

                function __wbg_init_memory(imports, memory) {
                    
                }

                function __wbg_finalize_init(instance, module) {
                    wasm = instance.exports;
                    __wbg_init.__wbindgen_wasm_module = module;
                    cachedDataViewMemory0 = null;
cachedUint8ArrayMemory0 = null;

                    
                    wasm.__wbindgen_start();
                    return wasm;
                }

                function initSync(module) {
                    if (wasm !== undefined) return wasm;

                    
                    if (typeof module !== 'undefined') {
                        if (Object.getPrototypeOf(module) === Object.prototype) {
                            ({module} = module)
                        } else {
                            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
                        }
                    }

                    const imports = __wbg_get_imports();

                    __wbg_init_memory(imports);

                    if (!(module instanceof WebAssembly.Module)) {
                        module = new WebAssembly.Module(module);
                    }

                    const instance = new WebAssembly.Instance(module, imports);

                    return __wbg_finalize_init(instance, module);
                }

                async function __wbg_init(module_or_path) {
                    if (wasm !== undefined) return wasm;

                    
                    if (typeof module_or_path !== 'undefined') {
                        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
                            ({module_or_path} = module_or_path)
                        } else {
                            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
                        }
                    }

                    
                    const imports = __wbg_get_imports();

                    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
                        module_or_path = fetch(module_or_path);
                    }

                    __wbg_init_memory(imports);

                    const { instance, module } = await __wbg_load(await module_or_path, imports);

                    return __wbg_finalize_init(instance, module);
                }
            
export { initSync };
export default __wbg_init;
