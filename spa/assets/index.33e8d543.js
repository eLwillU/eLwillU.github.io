var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var dist = {};
var bundle = {};
var commonjsBrowser = {};
var v1$1 = {};
var rng$1 = {};
Object.defineProperty(rng$1, "__esModule", {
  value: true
});
rng$1.default = rng;
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var stringify$1 = {};
var validate$1 = {};
var regex = {};
Object.defineProperty(regex, "__esModule", {
  value: true
});
regex.default = void 0;
var _default$c = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
regex.default = _default$c;
Object.defineProperty(validate$1, "__esModule", {
  value: true
});
validate$1.default = void 0;
var _regex = _interopRequireDefault$8(regex);
function _interopRequireDefault$8(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function validate(uuid) {
  return typeof uuid === "string" && _regex.default.test(uuid);
}
var _default$b = validate;
validate$1.default = _default$b;
Object.defineProperty(stringify$1, "__esModule", {
  value: true
});
stringify$1.default = void 0;
stringify$1.unsafeStringify = unsafeStringify;
var _validate$2 = _interopRequireDefault$7(validate$1);
function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset);
  if (!(0, _validate$2.default)(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var _default$a = stringify;
stringify$1.default = _default$a;
Object.defineProperty(v1$1, "__esModule", {
  value: true
});
v1$1.default = void 0;
var _rng$1 = _interopRequireDefault$6(rng$1);
var _stringify$2 = stringify$1;
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
let _nodeId;
let _clockseq;
let _lastMSecs = 0;
let _lastNSecs = 0;
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng$1.default)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || (0, _stringify$2.unsafeStringify)(b);
}
var _default$9 = v1;
v1$1.default = _default$9;
var v3$1 = {};
var v35$1 = {};
var parse$1 = {};
Object.defineProperty(parse$1, "__esModule", {
  value: true
});
parse$1.default = void 0;
var _validate$1 = _interopRequireDefault$5(validate$1);
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function parse(uuid) {
  if (!(0, _validate$1.default)(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var _default$8 = parse;
parse$1.default = _default$8;
Object.defineProperty(v35$1, "__esModule", {
  value: true
});
v35$1.URL = v35$1.DNS = void 0;
v35$1.default = v35;
var _stringify$1 = stringify$1;
var _parse = _interopRequireDefault$4(parse$1);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
v35$1.DNS = DNS;
const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
v35$1.URL = URL;
function v35(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = (0, _parse.default)(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return (0, _stringify$1.unsafeStringify)(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
var md5$1 = {};
Object.defineProperty(md5$1, "__esModule", {
  value: true
});
md5$1.default = void 0;
function md5(bytes) {
  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = "0123456789abcdef";
  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 255;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));
  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  const lsw = (x & 65535) + (y & 65535);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var _default$7 = md5;
md5$1.default = _default$7;
Object.defineProperty(v3$1, "__esModule", {
  value: true
});
v3$1.default = void 0;
var _v$1 = _interopRequireDefault$3(v35$1);
var _md = _interopRequireDefault$3(md5$1);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const v3 = (0, _v$1.default)("v3", 48, _md.default);
var _default$6 = v3;
v3$1.default = _default$6;
var v4$1 = {};
var native = {};
Object.defineProperty(native, "__esModule", {
  value: true
});
native.default = void 0;
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default$5 = {
  randomUUID
};
native.default = _default$5;
Object.defineProperty(v4$1, "__esModule", {
  value: true
});
v4$1.default = void 0;
var _native = _interopRequireDefault$2(native);
var _rng = _interopRequireDefault$2(rng$1);
var _stringify = stringify$1;
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || _rng.default)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0, _stringify.unsafeStringify)(rnds);
}
var _default$4 = v4;
v4$1.default = _default$4;
var v5$1 = {};
var sha1$1 = {};
Object.defineProperty(sha1$1, "__esModule", {
  value: true
});
sha1$1.default = void 0;
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  const K = [1518500249, 1859775393, 2400959708, 3395469782];
  const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);
  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);
    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);
    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }
    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var _default$3 = sha1;
sha1$1.default = _default$3;
Object.defineProperty(v5$1, "__esModule", {
  value: true
});
v5$1.default = void 0;
var _v = _interopRequireDefault$1(v35$1);
var _sha = _interopRequireDefault$1(sha1$1);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const v5 = (0, _v.default)("v5", 80, _sha.default);
var _default$2 = v5;
v5$1.default = _default$2;
var nil = {};
Object.defineProperty(nil, "__esModule", {
  value: true
});
nil.default = void 0;
var _default$1 = "00000000-0000-0000-0000-000000000000";
nil.default = _default$1;
var version$1 = {};
Object.defineProperty(version$1, "__esModule", {
  value: true
});
version$1.default = void 0;
var _validate = _interopRequireDefault(validate$1);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.slice(14, 15), 16);
}
var _default = version;
version$1.default = _default;
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function get() {
      return _nil.default;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function get() {
      return _parse2.default;
    }
  });
  Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function get() {
      return _stringify2.default;
    }
  });
  Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function get() {
      return _v2.default;
    }
  });
  Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function get() {
      return _v22.default;
    }
  });
  Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function get() {
      return _v3.default;
    }
  });
  Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function get() {
      return _v4.default;
    }
  });
  Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function get() {
      return _validate2.default;
    }
  });
  Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function get() {
      return _version.default;
    }
  });
  var _v2 = _interopRequireDefault2(v1$1);
  var _v22 = _interopRequireDefault2(v3$1);
  var _v3 = _interopRequireDefault2(v4$1);
  var _v4 = _interopRequireDefault2(v5$1);
  var _nil = _interopRequireDefault2(nil);
  var _version = _interopRequireDefault2(version$1);
  var _validate2 = _interopRequireDefault2(validate$1);
  var _stringify2 = _interopRequireDefault2(stringify$1);
  var _parse2 = _interopRequireDefault2(parse$1);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
})(commonjsBrowser);
Object.defineProperty(bundle, "__esModule", { value: true });
bundle.I4MIBundle = void 0;
const uuid_1 = commonjsBrowser;
class I4MIBundle {
  constructor(type) {
    this.resourceType = "Bundle";
    this.type = type;
  }
  addEntry(method, resource) {
    let id = this.generateId();
    if (typeof this.entry === "undefined") {
      this.entry = [];
    }
    if (typeof resource.id !== "undefined") {
      id = resource.id;
      if (this.idAlreadyExistsInBundle(id)) {
        throw Error(`An entry with the id ${resource.id} already exists in bundle`);
      }
    } else {
      resource.id = id;
    }
    let bundleEntry = {
      request: {
        method,
        url: resource.resourceType
      },
      resource
    };
    this.entry.push(bundleEntry);
    return bundleEntry;
  }
  removeEntry(id) {
    let removedItem = void 0;
    this.entry.forEach((e, index) => {
      let resource = e.resource;
      if (resource["id"] === id) {
        removedItem = e;
        this.entry.splice(index, 1);
      }
    });
    if (typeof removedItem === "undefined")
      console.warn(`No Entry to remove with id ${id} found`);
    return removedItem;
  }
  generateId() {
    return (0, uuid_1.v4)();
  }
  idAlreadyExistsInBundle(id) {
    for (let e of this.entry) {
      let resource = e.resource;
      if (resource["id"] === id)
        return true;
    }
    return false;
  }
}
bundle.I4MIBundle = I4MIBundle;
var apiMethods = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.apiCall = exports.ApiMethods = exports.HttpMethod = void 0;
  var HttpMethod;
  (function(HttpMethod2) {
    HttpMethod2["POST"] = "POST";
    HttpMethod2["PUT"] = "PUT";
    HttpMethod2["GET"] = "GET";
    HttpMethod2["DELETE"] = "DELETE";
  })(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
  class ApiMethods {
    constructor(config) {
      this._content_type = "application/fhir+json;fhirVersion=4.0";
      this._config = config ? config : { base_url: "" };
    }
    differentiateContentType(ct) {
      this._content_type = ct;
    }
    create(resource, config) {
      let args = this.init(HttpMethod.POST, config);
      if (resource.resourceType !== "Bundle") {
        args.url += "/" + resource.resourceType;
      }
      if (!args.headers) {
        args.headers = {
          "Prefer": "return=representation",
          "Content-Type": this._content_type
        };
      } else {
        if (!args.headers.Prefer)
          args.headers.Prefer = "return=representation";
        if (!args.headers["Content-Type"])
          args.headers["Content-Type"] = this._content_type;
      }
      args.payload = resource;
      return apiCall(args);
    }
    update(resource, config) {
      let args = this.init(HttpMethod.PUT, config);
      args.url += "/" + resource.resourceType + "/" + resource.id;
      if (!args.headers) {
        args.headers = {
          "Prefer": "return=representation",
          "Content-Type": this._content_type
        };
      } else {
        if (!args.headers.Prefer)
          args.headers.Prefer = "return=representation";
        if (!args.headers["Content-Type"])
          args.headers["Content-Type"] = this._content_type;
      }
      args.payload = resource;
      return apiCall(args);
    }
    read(resourceType, id, vid, config) {
      let args = this.init(HttpMethod.GET, config);
      args.url += "/" + resourceType + "/" + id + (vid ? "/_history/" + vid : "");
      if (!args.headers) {
        args.headers = {
          "Accept": this._content_type
        };
      } else {
        if (!args.headers["Accept"])
          args.headers["Accept"] = this._content_type;
      }
      return apiCall(args);
    }
    search(params, resourceType, config) {
      let args = this.init(HttpMethod.GET, config);
      if (resourceType) {
        args.url += "/" + resourceType;
      }
      if (!args.headers) {
        args.headers = {
          "Accept": this._content_type
        };
      } else {
        if (!args.headers["Accept"])
          args.headers["Accept"] = this._content_type;
      }
      if (params) {
        args.url += "?";
        if (typeof params === "string") {
          args.url += params;
        } else {
          let first_time_in_loop_params = true;
          Object.keys(params).forEach((key) => {
            if (first_time_in_loop_params)
              first_time_in_loop_params = false;
            else
              args.url += "&";
            args.url += key + "=" + encodeURI(params[key]);
          });
        }
      }
      return apiCall(args);
    }
    delete() {
      throw "NOT IMPLEMENTED";
    }
    init(method, config) {
      if (!config) {
        config = this._config;
      }
      let args = {
        method,
        url: config.base_url
      };
      if (config.authorization_type && config.access_token) {
        if (args.headers) {
          args.headers.Authorization = config.authorization_type + " " + config.access_token;
        } else {
          args.headers = {
            Authorization: config.authorization_type + " " + config.access_token
          };
        }
      }
      return args;
    }
  }
  exports.ApiMethods = ApiMethods;
  function apiCall(args) {
    let url = args.url;
    let method = args.method;
    let payload = args.payload;
    let headers = args.headers;
    let jsonBody = args.jsonBody || false;
    let jsonEncoded = args.jsonEncoded;
    const DEFAULT_TIMEOUT = 2e4;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.timeout = DEFAULT_TIMEOUT;
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      xhr.onload = function() {
        let status = xhr.status;
        if (status >= 200 && status < 300) {
          let body;
          if (jsonBody) {
            body = JSON.parse(xhr.responseText);
          } else {
            body = xhr.responseText;
          }
          resolve({
            message: "Request successful",
            body,
            status
          });
        } else {
          reject({
            message: xhr.statusText,
            body: xhr.responseText,
            status
          });
        }
      };
      xhr.ontimeout = function() {
        reject({
          message: "Request timed out. No answer from server received",
          body: "",
          status: -1
        });
      };
      xhr.onerror = function() {
        reject({
          message: "Error. transaction failed",
          body: "",
          status: 0
        });
      };
      if (payload !== void 0) {
        if (jsonEncoded || jsonEncoded == void 0) {
          xhr.send(JSON.stringify(payload));
        } else {
          xhr.send(payload);
        }
      } else {
        xhr.send();
      }
    });
  }
  exports.apiCall = apiCall;
})(apiMethods);
var definition = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CapabilityStatementConditionalDeleteStatus = exports.CapabilityStatementConditionalReadStatus = exports.CapabilityStatementResourceVersionPolicy = exports.CapabilityStatementTypeRestfulInteraction = exports.CapabilityStatementRestfulCapabilityMode = exports.CapabilityStatementKind = exports.CapabilityStatementPublicationStatus = exports.BundleHTTPVerb = exports.BundleSearchEntryMode = exports.BundleType = exports.BiologicallyDerivedProductStorageScale = exports.BiologicallyDerivedProductStatus = exports.BiologicallyDerivedProductCategory = exports.AppointmentResponseParticipantStatus = exports.AppointmentParticipationStatus = exports.AppointmentParticipantRequired = exports.AppointmentStatus = exports.AllergyIntoleranceSeverity = exports.AllergyIntoleranceCriticality = exports.AllergyIntoleranceCategory = exports.AllergyIntoleranceType = exports.AdverseEventActuality = exports.ActivityDefinitionActivityParticipantType = exports.ActivityDefinitionRequestPriority = exports.ActivityDefinitionRequestIntent = exports.ActivityDefinitionPublicationStatus = exports.AccountStatus = exports.TriggerDefinitionTriggerType = exports.TimingDayOfWeek = exports.TimingUnitsOfTime = exports.RelatedArtifactType = exports.QuantityComparator = exports.ParameterDefinitionParameterUse = exports.NarrativeStatus = exports.IdentifierUse = exports.HumanNameNameUse = exports.Expressionundefined = exports.ElementDefinitionBindingStrength = exports.ElementDefinitionConstraintSeverity = exports.ElementDefinitionReferenceVersionRules = exports.ElementDefinitionAggregationMode = exports.ElementDefinitionSlicingRules = exports.ElementDefinitionDiscriminatorType = exports.ElementDefinitionPropertyRepresentation = exports.DataRequirementSortDirection = exports.ContributorType = exports.ContactPointUse = exports.ContactPointSystem = exports.AddressType = exports.AddressUse = void 0;
  exports.CoverageEligibilityResponseEligibilityResponsePurpose = exports.CoverageEligibilityResponseEligibilityResponseStatus = exports.CoverageEligibilityRequestEligibilityRequestPurpose = exports.CoverageEligibilityRequestEligibilityRequestStatus = exports.CoverageStatus = exports.ContractPublicationStatus = exports.ContractStatus = exports.ConsentDataMeaning = exports.ConsentProvisionType = exports.ConsentState = exports.ConceptMapGroupUnmappedMode = exports.ConceptMapEquivalence = exports.ConceptMapPublicationStatus = exports.CompositionSectionMode = exports.CompositionDocumentRelationshipType = exports.CompositionAttestationMode = exports.CompositionStatus = exports.CompartmentDefinitionCompartmentType = exports.CompartmentDefinitionPublicationStatus = exports.CommunicationRequestCommunicationPriority = exports.CommunicationRequestStatus = exports.CommunicationPriority = exports.CommunicationStatus = exports.CodeSystemPropertyType = exports.CodeSystemFilterOperator = exports.CodeSystemContentMode = exports.CodeSystemHierarchyMeaning = exports.CodeSystemPublicationStatus = exports.ClinicalImpressionStatus = exports.ClaimResponseNoteType = exports.ClaimResponseRemittanceOutcome = exports.ClaimResponseUse = exports.ClaimResponseStatus = exports.ClaimUse = exports.ClaimStatus = exports.ChargeItemDefinitionPriceComponentType = exports.ChargeItemDefinitionPublicationStatus = exports.ChargeItemStatus = exports.CatalogEntryRelationType = exports.CatalogEntryPublicationStatus = exports.CareTeamStatus = exports.CarePlanActivityStatus = exports.CarePlanActivityKind = exports.CarePlanIntent = exports.CarePlanStatus = exports.CapabilityStatementDocumentMode = exports.CapabilityStatementEventCapabilityMode = exports.CapabilityStatementSystemRestfulInteraction = exports.CapabilityStatementSearchParamType = exports.CapabilityStatementReferenceHandlingPolicy = void 0;
  exports.ImplementationGuidePublicationStatus = exports.ImmunizationEvaluationStatus = exports.ImmunizationStatus = exports.ImagingStudyStatus = exports.HealthcareServiceDaysOfWeek = exports.GuidanceResponseStatus = exports.GroupType = exports.GraphDefinitionGraphCompartmentRule = exports.GraphDefinitionCompartmentCode = exports.GraphDefinitionGraphCompartmentUse = exports.GraphDefinitionPublicationStatus = exports.GoalLifecycleStatus = exports.FlagStatus = exports.FamilyMemberHistoryFamilyHistoryStatus = exports.ExplanationOfBenefitNoteType = exports.ExplanationOfBenefitRemittanceOutcome = exports.ExplanationOfBenefitUse = exports.ExplanationOfBenefitStatus = exports.ExampleScenarioActorType = exports.ExampleScenarioPublicationStatus = exports.EvidenceVariableGroupMeasure = exports.EvidenceVariableType = exports.EvidenceVariablePublicationStatus = exports.EvidencePublicationStatus = exports.EventDefinitionPublicationStatus = exports.EpisodeOfCareStatus = exports.EnrollmentResponseRemittanceOutcome = exports.EnrollmentResponseStatus = exports.EnrollmentRequestStatus = exports.EndpointStatus = exports.EncounterLocationStatus = exports.EffectEvidenceSynthesisExposureState = exports.EffectEvidenceSynthesisPublicationStatus = exports.DocumentReferenceDocumentRelationshipType = exports.DocumentReferenceReferredDocumentStatus = exports.DocumentReferenceStatus = exports.DocumentManifestDocumentReferenceStatus = exports.DeviceRequestRequestPriority = exports.DeviceRequestRequestIntent = exports.DeviceRequestStatus = exports.DeviceMetricCalibrationState = exports.DeviceMetricCalibrationType = exports.DeviceMetricCategory = exports.DeviceMetricColor = exports.DeviceMetricOperationalStatus = exports.DeviceDefinitionDeviceNameType = exports.DeviceNameType = exports.DeviceFHIRDeviceStatus = exports.DetectedIssueSeverity = exports.CoverageEligibilityResponseRemittanceOutcome = void 0;
  exports.PaymentNoticeStatus = exports.PatientLinkType = exports.PatientAdministrativeGender = exports.OperationOutcomeIssueSeverity = exports.OperationDefinitionBindingStrength = exports.OperationDefinitionSearchParamType = exports.OperationDefinitionOperationParameterUse = exports.OperationDefinitionOperationKind = exports.OperationDefinitionPublicationStatus = exports.ObservationDefinitionAdministrativeGender = exports.ObservationDefinitionObservationRangeCategory = exports.ObservationDefinitionObservationDataType = exports.NutritionOrderNutritiionOrderIntent = exports.NutritionOrderStatus = exports.NamingSystemIdentifierType = exports.NamingSystemType = exports.NamingSystemPublicationStatus = exports.MolecularSequencerepositoryType = exports.MolecularSequencequalityType = exports.MolecularSequencestrandType = exports.MolecularSequenceorientationType = exports.MolecularSequencesequenceType = exports.MessageHeaderResponseType = exports.MessageDefinitionmessageheader_response_request = exports.MessageDefinitionMessageSignificanceCategory = exports.MessageDefinitionPublicationStatus = exports.MedicationStatementStatus = exports.MedicationRequestPriority = exports.MedicationRequestIntent = exports.MedicationRequestStatus = exports.MedicationKnowledgeStatus = exports.MedicationDispenseStatus = exports.MedicationAdministrationStatus = exports.MedicationStatus = exports.MediaStatus = exports.MeasureReportType = exports.MeasureReportStatus = exports.MeasurePublicationStatus = exports.LocationDaysOfWeek = exports.LocationMode = exports.LocationStatus = exports.ListMode = exports.ListStatus = exports.LinkageType = exports.LibraryPublicationStatus = exports.InvoicePriceComponentType = exports.InvoiceStatus = exports.InsurancePlanPublicationStatus = exports.ImplementationGuideGuideParameterCode = exports.ImplementationGuideGuidePageGeneration = void 0;
  exports.ServiceRequestPriority = exports.ServiceRequestIntent = exports.ServiceRequestStatus = exports.SearchParameterSearchModifierCode = exports.SearchParameterSearchComparator = exports.SearchParameterXPathUsageType = exports.SearchParameterSearchParamType = exports.SearchParameterPublicationStatus = exports.RiskEvidenceSynthesisPublicationStatus = exports.ResearchSubjectStatus = exports.ResearchStudyStatus = exports.ResearchElementDefinitionGroupMeasure = exports.ResearchElementDefinitionVariableType = exports.ResearchElementDefinitionResearchElementType = exports.ResearchElementDefinitionPublicationStatus = exports.ResearchDefinitionPublicationStatus = exports.RequestGroupActionCardinalityBehavior = exports.RequestGroupActionPrecheckBehavior = exports.RequestGroupActionRequiredBehavior = exports.RequestGroupActionSelectionBehavior = exports.RequestGroupActionGroupingBehavior = exports.RequestGroupActionRelationshipType = exports.RequestGroupActionConditionKind = exports.RequestGroupRequestPriority = exports.RequestGroupRequestIntent = exports.RequestGroupRequestStatus = exports.RelatedPersonAdministrativeGender = exports.QuestionnaireResponseStatus = exports.QuestionnaireEnableWhenBehavior = exports.QuestionnaireItemOperator = exports.QuestionnairePublicationStatus = exports.ProvenanceEntityRole = exports.ProcedureStatus = exports.PractitionerRoleDaysOfWeek = exports.PractitionerAdministrativeGender = exports.PlanDefinitionActionCardinalityBehavior = exports.PlanDefinitionActionPrecheckBehavior = exports.PlanDefinitionActionRequiredBehavior = exports.PlanDefinitionActionSelectionBehavior = exports.PlanDefinitionActionGroupingBehavior = exports.PlanDefinitionActionParticipantType = exports.PlanDefinitionActionRelationshipType = exports.PlanDefinitionActionConditionKind = exports.PlanDefinitionRequestPriority = exports.PlanDefinitionPublicationStatus = exports.PersonIdentityAssuranceLevel = exports.PersonAdministrativeGender = exports.PaymentReconciliationNoteType = exports.PaymentReconciliationRemittanceOutcome = exports.PaymentReconciliationStatus = void 0;
  exports.StructureMapTransform = exports.TaskStatus = exports.DeviceUseStatementStatus = exports.SupplyRequestStatus = exports.RiskAssessmentStatus = exports.QuestionnaireItemType = exports.DeviceUDIEntryType = exports.EncounterStatus = exports.DiagnosticReportStatus = exports.ObservationStatus = exports.DetectedIssueStatus = exports.VisionPrescriptionVisionBase = exports.VisionPrescriptionVisionEyes = exports.VisionPrescriptionVisionStatus = exports.VerificationResultstatus = exports.ValueSetFilterOperator = exports.ValueSetPublicationStatus = exports.TestScriptAssertionResponseTypes = exports.TestScriptAssertionOperatorType = exports.TestScriptAssertionDirectionType = exports.TestScriptRequestMethodCode = exports.TestScriptPublicationStatus = exports.TestReportActionResult = exports.TestReportParticipantType = exports.TestReportResult = exports.TestReportStatus = exports.TerminologyCapabilitiesCodeSearchSupport = exports.TerminologyCapabilitiesCapabilityStatementKind = exports.TerminologyCapabilitiesPublicationStatus = exports.TaskPriority = exports.TaskIntent = exports.SupplyRequestRequestPriority = exports.SupplyDeliveryStatus = exports.SubstanceFHIRSubstanceStatus = exports.SubscriptionChannelType = exports.SubscriptionStatus = exports.StructureMapTargetListMode = exports.StructureMapContextType = exports.StructureMapSourceListMode = exports.StructureMapInputMode = exports.StructureMapGroupTypeMode = exports.StructureMapModelMode = exports.StructureMapPublicationStatus = exports.StructureDefinitionTypeDerivationRule = exports.StructureDefinitionExtensionContextType = exports.StructureDefinitionKind = exports.StructureDefinitionPublicationStatus = exports.SpecimenDefinitionSpecimenContainedPreference = exports.SpecimenStatus = exports.SlotStatus = void 0;
  (function(AddressUse) {
    AddressUse["HOME"] = "home";
    AddressUse["WORK"] = "work";
    AddressUse["TEMP"] = "temp";
    AddressUse["OLD"] = "old";
    AddressUse["BILLING"] = "billing";
  })(exports.AddressUse || (exports.AddressUse = {}));
  (function(AddressType) {
    AddressType["POSTAL"] = "postal";
    AddressType["PHYSICAL"] = "physical";
    AddressType["BOTH"] = "both";
  })(exports.AddressType || (exports.AddressType = {}));
  (function(ContactPointSystem) {
    ContactPointSystem["PHONE"] = "phone";
    ContactPointSystem["FAX"] = "fax";
    ContactPointSystem["EMAIL"] = "email";
    ContactPointSystem["PAGER"] = "pager";
    ContactPointSystem["URL"] = "url";
    ContactPointSystem["SMS"] = "sms";
    ContactPointSystem["OTHER"] = "other";
  })(exports.ContactPointSystem || (exports.ContactPointSystem = {}));
  (function(ContactPointUse) {
    ContactPointUse["HOME"] = "home";
    ContactPointUse["WORK"] = "work";
    ContactPointUse["TEMP"] = "temp";
    ContactPointUse["OLD"] = "old";
    ContactPointUse["MOBILE"] = "mobile";
  })(exports.ContactPointUse || (exports.ContactPointUse = {}));
  (function(ContributorType) {
    ContributorType["AUTHOR"] = "author";
    ContributorType["EDITOR"] = "editor";
    ContributorType["REVIEWER"] = "reviewer";
    ContributorType["ENDORSER"] = "endorser";
  })(exports.ContributorType || (exports.ContributorType = {}));
  (function(DataRequirementSortDirection) {
    DataRequirementSortDirection["ASCENDING"] = "ascending";
    DataRequirementSortDirection["DESCENDING"] = "descending";
  })(exports.DataRequirementSortDirection || (exports.DataRequirementSortDirection = {}));
  (function(ElementDefinitionPropertyRepresentation) {
    ElementDefinitionPropertyRepresentation["XMLATTR"] = "xmlAttr";
    ElementDefinitionPropertyRepresentation["XMLTEXT"] = "xmlText";
    ElementDefinitionPropertyRepresentation["TYPEATTR"] = "typeAttr";
    ElementDefinitionPropertyRepresentation["CDATEXT"] = "cdaText";
    ElementDefinitionPropertyRepresentation["XHTML"] = "xhtml";
  })(exports.ElementDefinitionPropertyRepresentation || (exports.ElementDefinitionPropertyRepresentation = {}));
  (function(ElementDefinitionDiscriminatorType) {
    ElementDefinitionDiscriminatorType["VALUE"] = "value";
    ElementDefinitionDiscriminatorType["EXISTS"] = "exists";
    ElementDefinitionDiscriminatorType["PATTERN"] = "pattern";
    ElementDefinitionDiscriminatorType["TYPE"] = "type";
    ElementDefinitionDiscriminatorType["PROFILE"] = "profile";
  })(exports.ElementDefinitionDiscriminatorType || (exports.ElementDefinitionDiscriminatorType = {}));
  (function(ElementDefinitionSlicingRules) {
    ElementDefinitionSlicingRules["CLOSED"] = "closed";
    ElementDefinitionSlicingRules["OPEN"] = "open";
    ElementDefinitionSlicingRules["OPENATEND"] = "openAtEnd";
  })(exports.ElementDefinitionSlicingRules || (exports.ElementDefinitionSlicingRules = {}));
  (function(ElementDefinitionAggregationMode) {
    ElementDefinitionAggregationMode["CONTAINED"] = "contained";
    ElementDefinitionAggregationMode["REFERENCED"] = "referenced";
    ElementDefinitionAggregationMode["BUNDLED"] = "bundled";
  })(exports.ElementDefinitionAggregationMode || (exports.ElementDefinitionAggregationMode = {}));
  (function(ElementDefinitionReferenceVersionRules) {
    ElementDefinitionReferenceVersionRules["EITHER"] = "either";
    ElementDefinitionReferenceVersionRules["INDEPENDENT"] = "independent";
    ElementDefinitionReferenceVersionRules["SPECIFIC"] = "specific";
  })(exports.ElementDefinitionReferenceVersionRules || (exports.ElementDefinitionReferenceVersionRules = {}));
  (function(ElementDefinitionConstraintSeverity) {
    ElementDefinitionConstraintSeverity["ERROR"] = "error";
    ElementDefinitionConstraintSeverity["WARNING"] = "warning";
  })(exports.ElementDefinitionConstraintSeverity || (exports.ElementDefinitionConstraintSeverity = {}));
  (function(ElementDefinitionBindingStrength) {
    ElementDefinitionBindingStrength["REQUIRED"] = "required";
    ElementDefinitionBindingStrength["EXTENSIBLE"] = "extensible";
    ElementDefinitionBindingStrength["PREFERRED"] = "preferred";
    ElementDefinitionBindingStrength["EXAMPLE"] = "example";
  })(exports.ElementDefinitionBindingStrength || (exports.ElementDefinitionBindingStrength = {}));
  (function(Expressionundefined) {
    Expressionundefined["TEXT_CQL"] = "text/cql";
    Expressionundefined["TEXT_FHIRPATH"] = "text/fhirpath";
    Expressionundefined["APPLICATION_X_FHIR_QUERY"] = "application/x-fhir-query";
    Expressionundefined["ETC_"] = "etc.";
  })(exports.Expressionundefined || (exports.Expressionundefined = {}));
  (function(HumanNameNameUse) {
    HumanNameNameUse["USUAL"] = "usual";
    HumanNameNameUse["OFFICIAL"] = "official";
    HumanNameNameUse["TEMP"] = "temp";
    HumanNameNameUse["NICKNAME"] = "nickname";
    HumanNameNameUse["ANONYMOUS"] = "anonymous";
    HumanNameNameUse["OLD"] = "old";
    HumanNameNameUse["MAIDEN"] = "maiden";
  })(exports.HumanNameNameUse || (exports.HumanNameNameUse = {}));
  (function(IdentifierUse) {
    IdentifierUse["USUAL"] = "usual";
    IdentifierUse["OFFICIAL"] = "official";
    IdentifierUse["TEMP"] = "temp";
    IdentifierUse["SECONDARY"] = "secondary";
    IdentifierUse["OLD"] = "old";
  })(exports.IdentifierUse || (exports.IdentifierUse = {}));
  (function(NarrativeStatus) {
    NarrativeStatus["GENERATED"] = "generated";
    NarrativeStatus["EXTENSIONS"] = "extensions";
    NarrativeStatus["ADDITIONAL"] = "additional";
    NarrativeStatus["EMPTY"] = "empty";
  })(exports.NarrativeStatus || (exports.NarrativeStatus = {}));
  (function(ParameterDefinitionParameterUse) {
    ParameterDefinitionParameterUse["IN"] = "in";
    ParameterDefinitionParameterUse["OUT"] = "out";
  })(exports.ParameterDefinitionParameterUse || (exports.ParameterDefinitionParameterUse = {}));
  (function(QuantityComparator) {
    QuantityComparator["LT"] = "<";
    QuantityComparator["LE"] = "<=";
    QuantityComparator["GE"] = ">=";
    QuantityComparator["GT"] = ">";
  })(exports.QuantityComparator || (exports.QuantityComparator = {}));
  (function(RelatedArtifactType) {
    RelatedArtifactType["DOCUMENTATION"] = "documentation";
    RelatedArtifactType["JUSTIFICATION"] = "justification";
    RelatedArtifactType["CITATION"] = "citation";
    RelatedArtifactType["PREDECESSOR"] = "predecessor";
    RelatedArtifactType["SUCCESSOR"] = "successor";
    RelatedArtifactType["DERIVED_FROM"] = "derived-from";
    RelatedArtifactType["DEPENDS_ON"] = "depends-on";
    RelatedArtifactType["COMPOSED_OF"] = "composed-of";
  })(exports.RelatedArtifactType || (exports.RelatedArtifactType = {}));
  (function(TimingUnitsOfTime) {
    TimingUnitsOfTime["S"] = "s";
    TimingUnitsOfTime["MIN"] = "min";
    TimingUnitsOfTime["H"] = "h";
    TimingUnitsOfTime["D"] = "d";
    TimingUnitsOfTime["WK"] = "wk";
    TimingUnitsOfTime["MO"] = "mo";
    TimingUnitsOfTime["A"] = "a";
  })(exports.TimingUnitsOfTime || (exports.TimingUnitsOfTime = {}));
  (function(TimingDayOfWeek) {
    TimingDayOfWeek["MON"] = "mon";
    TimingDayOfWeek["TUE"] = "tue";
    TimingDayOfWeek["WED"] = "wed";
    TimingDayOfWeek["THU"] = "thu";
    TimingDayOfWeek["FRI"] = "fri";
    TimingDayOfWeek["SAT"] = "sat";
    TimingDayOfWeek["SUN"] = "sun";
  })(exports.TimingDayOfWeek || (exports.TimingDayOfWeek = {}));
  (function(TriggerDefinitionTriggerType) {
    TriggerDefinitionTriggerType["NAMED_EVENT"] = "named-event";
    TriggerDefinitionTriggerType["PERIODIC"] = "periodic";
    TriggerDefinitionTriggerType["DATA_CHANGED"] = "data-changed";
    TriggerDefinitionTriggerType["DATA_ADDED"] = "data-added";
    TriggerDefinitionTriggerType["DATA_MODIFIED"] = "data-modified";
    TriggerDefinitionTriggerType["DATA_REMOVED"] = "data-removed";
    TriggerDefinitionTriggerType["DATA_ACCESSED"] = "data-accessed";
    TriggerDefinitionTriggerType["DATA_ACCESS_ENDED"] = "data-access-ended";
  })(exports.TriggerDefinitionTriggerType || (exports.TriggerDefinitionTriggerType = {}));
  (function(AccountStatus) {
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["INACTIVE"] = "inactive";
    AccountStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    AccountStatus["ON_HOLD"] = "on-hold";
    AccountStatus["UNKNOWN"] = "unknown";
  })(exports.AccountStatus || (exports.AccountStatus = {}));
  (function(ActivityDefinitionPublicationStatus) {
    ActivityDefinitionPublicationStatus["DRAFT"] = "draft";
    ActivityDefinitionPublicationStatus["ACTIVE"] = "active";
    ActivityDefinitionPublicationStatus["RETIRED"] = "retired";
    ActivityDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ActivityDefinitionPublicationStatus || (exports.ActivityDefinitionPublicationStatus = {}));
  (function(ActivityDefinitionRequestIntent) {
    ActivityDefinitionRequestIntent["PROPOSAL"] = "proposal";
    ActivityDefinitionRequestIntent["PLAN"] = "plan";
    ActivityDefinitionRequestIntent["DIRECTIVE"] = "directive";
    ActivityDefinitionRequestIntent["ORDER"] = "order";
    ActivityDefinitionRequestIntent["ORIGINAL_ORDER"] = "original-order";
    ActivityDefinitionRequestIntent["REFLEX_ORDER"] = "reflex-order";
    ActivityDefinitionRequestIntent["FILLER_ORDER"] = "filler-order";
    ActivityDefinitionRequestIntent["INSTANCE_ORDER"] = "instance-order";
    ActivityDefinitionRequestIntent["OPTION"] = "option";
  })(exports.ActivityDefinitionRequestIntent || (exports.ActivityDefinitionRequestIntent = {}));
  (function(ActivityDefinitionRequestPriority) {
    ActivityDefinitionRequestPriority["ROUTINE"] = "routine";
    ActivityDefinitionRequestPriority["URGENT"] = "urgent";
    ActivityDefinitionRequestPriority["ASAP"] = "asap";
    ActivityDefinitionRequestPriority["STAT"] = "stat";
  })(exports.ActivityDefinitionRequestPriority || (exports.ActivityDefinitionRequestPriority = {}));
  (function(ActivityDefinitionActivityParticipantType) {
    ActivityDefinitionActivityParticipantType["PATIENT"] = "patient";
    ActivityDefinitionActivityParticipantType["PRACTITIONER"] = "practitioner";
    ActivityDefinitionActivityParticipantType["RELATED_PERSON"] = "related-person";
    ActivityDefinitionActivityParticipantType["DEVICE"] = "device";
  })(exports.ActivityDefinitionActivityParticipantType || (exports.ActivityDefinitionActivityParticipantType = {}));
  (function(AdverseEventActuality) {
    AdverseEventActuality["ACTUAL"] = "actual";
    AdverseEventActuality["POTENTIAL"] = "potential";
  })(exports.AdverseEventActuality || (exports.AdverseEventActuality = {}));
  (function(AllergyIntoleranceType) {
    AllergyIntoleranceType["ALLERGY"] = "allergy";
    AllergyIntoleranceType["INTOLERANCE"] = "intolerance";
  })(exports.AllergyIntoleranceType || (exports.AllergyIntoleranceType = {}));
  (function(AllergyIntoleranceCategory) {
    AllergyIntoleranceCategory["FOOD"] = "food";
    AllergyIntoleranceCategory["MEDICATION"] = "medication";
    AllergyIntoleranceCategory["ENVIRONMENT"] = "environment";
    AllergyIntoleranceCategory["BIOLOGIC"] = "biologic";
  })(exports.AllergyIntoleranceCategory || (exports.AllergyIntoleranceCategory = {}));
  (function(AllergyIntoleranceCriticality) {
    AllergyIntoleranceCriticality["LOW"] = "low";
    AllergyIntoleranceCriticality["HIGH"] = "high";
    AllergyIntoleranceCriticality["UNABLE_TO_ASSESS"] = "unable-to-assess";
  })(exports.AllergyIntoleranceCriticality || (exports.AllergyIntoleranceCriticality = {}));
  (function(AllergyIntoleranceSeverity) {
    AllergyIntoleranceSeverity["MILD"] = "mild";
    AllergyIntoleranceSeverity["MODERATE"] = "moderate";
    AllergyIntoleranceSeverity["SEVERE"] = "severe";
  })(exports.AllergyIntoleranceSeverity || (exports.AllergyIntoleranceSeverity = {}));
  (function(AppointmentStatus) {
    AppointmentStatus["PROPOSED"] = "proposed";
    AppointmentStatus["PENDING"] = "pending";
    AppointmentStatus["BOOKED"] = "booked";
    AppointmentStatus["ARRIVED"] = "arrived";
    AppointmentStatus["FULFILLED"] = "fulfilled";
    AppointmentStatus["CANCELLED"] = "cancelled";
    AppointmentStatus["NOSHOW"] = "noshow";
    AppointmentStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    AppointmentStatus["CHECKED_IN"] = "checked-in";
    AppointmentStatus["WAITLIST"] = "waitlist";
  })(exports.AppointmentStatus || (exports.AppointmentStatus = {}));
  (function(AppointmentParticipantRequired) {
    AppointmentParticipantRequired["REQUIRED"] = "required";
    AppointmentParticipantRequired["OPTIONAL"] = "optional";
    AppointmentParticipantRequired["INFORMATION_ONLY"] = "information-only";
  })(exports.AppointmentParticipantRequired || (exports.AppointmentParticipantRequired = {}));
  (function(AppointmentParticipationStatus) {
    AppointmentParticipationStatus["ACCEPTED"] = "accepted";
    AppointmentParticipationStatus["DECLINED"] = "declined";
    AppointmentParticipationStatus["TENTATIVE"] = "tentative";
    AppointmentParticipationStatus["NEEDS_ACTION"] = "needs-action";
  })(exports.AppointmentParticipationStatus || (exports.AppointmentParticipationStatus = {}));
  (function(AppointmentResponseParticipantStatus) {
    AppointmentResponseParticipantStatus["ACCEPTED"] = "accepted";
    AppointmentResponseParticipantStatus["DECLINED"] = "declined";
    AppointmentResponseParticipantStatus["TENTATIVE"] = "tentative";
    AppointmentResponseParticipantStatus["NEEDS_ACTION"] = "needs-action";
  })(exports.AppointmentResponseParticipantStatus || (exports.AppointmentResponseParticipantStatus = {}));
  (function(BiologicallyDerivedProductCategory) {
    BiologicallyDerivedProductCategory["ORGAN"] = "organ";
    BiologicallyDerivedProductCategory["TISSUE"] = "tissue";
    BiologicallyDerivedProductCategory["FLUID"] = "fluid";
    BiologicallyDerivedProductCategory["CELLS"] = "cells";
    BiologicallyDerivedProductCategory["BIOLOGICALAGENT"] = "biologicalAgent";
  })(exports.BiologicallyDerivedProductCategory || (exports.BiologicallyDerivedProductCategory = {}));
  (function(BiologicallyDerivedProductStatus) {
    BiologicallyDerivedProductStatus["AVAILABLE"] = "available";
    BiologicallyDerivedProductStatus["UNAVAILABLE"] = "unavailable";
  })(exports.BiologicallyDerivedProductStatus || (exports.BiologicallyDerivedProductStatus = {}));
  (function(BiologicallyDerivedProductStorageScale) {
    BiologicallyDerivedProductStorageScale["FARENHEIT"] = "farenheit";
    BiologicallyDerivedProductStorageScale["CELSIUS"] = "celsius";
    BiologicallyDerivedProductStorageScale["KELVIN"] = "kelvin";
  })(exports.BiologicallyDerivedProductStorageScale || (exports.BiologicallyDerivedProductStorageScale = {}));
  (function(BundleType) {
    BundleType["DOCUMENT"] = "document";
    BundleType["MESSAGE"] = "message";
    BundleType["TRANSACTION"] = "transaction";
    BundleType["TRANSACTION_RESPONSE"] = "transaction-response";
    BundleType["BATCH"] = "batch";
    BundleType["BATCH_RESPONSE"] = "batch-response";
    BundleType["HISTORY"] = "history";
    BundleType["SEARCHSET"] = "searchset";
    BundleType["COLLECTION"] = "collection";
  })(exports.BundleType || (exports.BundleType = {}));
  (function(BundleSearchEntryMode) {
    BundleSearchEntryMode["MATCH"] = "match";
    BundleSearchEntryMode["INCLUDE"] = "include";
    BundleSearchEntryMode["OUTCOME"] = "outcome";
  })(exports.BundleSearchEntryMode || (exports.BundleSearchEntryMode = {}));
  (function(BundleHTTPVerb) {
    BundleHTTPVerb["GET"] = "GET";
    BundleHTTPVerb["HEAD"] = "HEAD";
    BundleHTTPVerb["POST"] = "POST";
    BundleHTTPVerb["PUT"] = "PUT";
    BundleHTTPVerb["DELETE"] = "DELETE";
    BundleHTTPVerb["PATCH"] = "PATCH";
  })(exports.BundleHTTPVerb || (exports.BundleHTTPVerb = {}));
  (function(CapabilityStatementPublicationStatus) {
    CapabilityStatementPublicationStatus["DRAFT"] = "draft";
    CapabilityStatementPublicationStatus["ACTIVE"] = "active";
    CapabilityStatementPublicationStatus["RETIRED"] = "retired";
    CapabilityStatementPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.CapabilityStatementPublicationStatus || (exports.CapabilityStatementPublicationStatus = {}));
  (function(CapabilityStatementKind) {
    CapabilityStatementKind["INSTANCE"] = "instance";
    CapabilityStatementKind["CAPABILITY"] = "capability";
    CapabilityStatementKind["REQUIREMENTS"] = "requirements";
  })(exports.CapabilityStatementKind || (exports.CapabilityStatementKind = {}));
  (function(CapabilityStatementRestfulCapabilityMode) {
    CapabilityStatementRestfulCapabilityMode["CLIENT"] = "client";
    CapabilityStatementRestfulCapabilityMode["SERVER"] = "server";
  })(exports.CapabilityStatementRestfulCapabilityMode || (exports.CapabilityStatementRestfulCapabilityMode = {}));
  (function(CapabilityStatementTypeRestfulInteraction) {
    CapabilityStatementTypeRestfulInteraction["READ"] = "read";
    CapabilityStatementTypeRestfulInteraction["VREAD"] = "vread";
    CapabilityStatementTypeRestfulInteraction["UPDATE"] = "update";
    CapabilityStatementTypeRestfulInteraction["PATCH"] = "patch";
    CapabilityStatementTypeRestfulInteraction["DELETE"] = "delete";
    CapabilityStatementTypeRestfulInteraction["HISTORY_INSTANCE"] = "history-instance";
    CapabilityStatementTypeRestfulInteraction["HISTORY_TYPE"] = "history-type";
    CapabilityStatementTypeRestfulInteraction["CREATE"] = "create";
    CapabilityStatementTypeRestfulInteraction["SEARCH_TYPE"] = "search-type";
  })(exports.CapabilityStatementTypeRestfulInteraction || (exports.CapabilityStatementTypeRestfulInteraction = {}));
  (function(CapabilityStatementResourceVersionPolicy) {
    CapabilityStatementResourceVersionPolicy["NO_VERSION"] = "no-version";
    CapabilityStatementResourceVersionPolicy["VERSIONED"] = "versioned";
    CapabilityStatementResourceVersionPolicy["VERSIONED_UPDATE"] = "versioned-update";
  })(exports.CapabilityStatementResourceVersionPolicy || (exports.CapabilityStatementResourceVersionPolicy = {}));
  (function(CapabilityStatementConditionalReadStatus) {
    CapabilityStatementConditionalReadStatus["NOT_SUPPORTED"] = "not-supported";
    CapabilityStatementConditionalReadStatus["MODIFIED_SINCE"] = "modified-since";
    CapabilityStatementConditionalReadStatus["NOT_MATCH"] = "not-match";
    CapabilityStatementConditionalReadStatus["FULL_SUPPORT"] = "full-support";
  })(exports.CapabilityStatementConditionalReadStatus || (exports.CapabilityStatementConditionalReadStatus = {}));
  (function(CapabilityStatementConditionalDeleteStatus) {
    CapabilityStatementConditionalDeleteStatus["NOT_SUPPORTED"] = "not-supported";
    CapabilityStatementConditionalDeleteStatus["SINGLE"] = "single";
    CapabilityStatementConditionalDeleteStatus["MULTIPLE"] = "multiple";
  })(exports.CapabilityStatementConditionalDeleteStatus || (exports.CapabilityStatementConditionalDeleteStatus = {}));
  (function(CapabilityStatementReferenceHandlingPolicy) {
    CapabilityStatementReferenceHandlingPolicy["LITERAL"] = "literal";
    CapabilityStatementReferenceHandlingPolicy["LOGICAL"] = "logical";
    CapabilityStatementReferenceHandlingPolicy["RESOLVES"] = "resolves";
    CapabilityStatementReferenceHandlingPolicy["ENFORCED"] = "enforced";
    CapabilityStatementReferenceHandlingPolicy["LOCAL"] = "local";
  })(exports.CapabilityStatementReferenceHandlingPolicy || (exports.CapabilityStatementReferenceHandlingPolicy = {}));
  (function(CapabilityStatementSearchParamType) {
    CapabilityStatementSearchParamType["NUMBER"] = "number";
    CapabilityStatementSearchParamType["DATE"] = "date";
    CapabilityStatementSearchParamType["STRING"] = "string";
    CapabilityStatementSearchParamType["TOKEN"] = "token";
    CapabilityStatementSearchParamType["REFERENCE"] = "reference";
    CapabilityStatementSearchParamType["COMPOSITE"] = "composite";
    CapabilityStatementSearchParamType["QUANTITY"] = "quantity";
    CapabilityStatementSearchParamType["URI"] = "uri";
    CapabilityStatementSearchParamType["SPECIAL"] = "special";
  })(exports.CapabilityStatementSearchParamType || (exports.CapabilityStatementSearchParamType = {}));
  (function(CapabilityStatementSystemRestfulInteraction) {
    CapabilityStatementSystemRestfulInteraction["TRANSACTION"] = "transaction";
    CapabilityStatementSystemRestfulInteraction["BATCH"] = "batch";
    CapabilityStatementSystemRestfulInteraction["SEARCH_SYSTEM"] = "search-system";
    CapabilityStatementSystemRestfulInteraction["HISTORY_SYSTEM"] = "history-system";
  })(exports.CapabilityStatementSystemRestfulInteraction || (exports.CapabilityStatementSystemRestfulInteraction = {}));
  (function(CapabilityStatementEventCapabilityMode) {
    CapabilityStatementEventCapabilityMode["SENDER"] = "sender";
    CapabilityStatementEventCapabilityMode["RECEIVER"] = "receiver";
  })(exports.CapabilityStatementEventCapabilityMode || (exports.CapabilityStatementEventCapabilityMode = {}));
  (function(CapabilityStatementDocumentMode) {
    CapabilityStatementDocumentMode["PRODUCER"] = "producer";
    CapabilityStatementDocumentMode["CONSUMER"] = "consumer";
  })(exports.CapabilityStatementDocumentMode || (exports.CapabilityStatementDocumentMode = {}));
  (function(CarePlanStatus) {
    CarePlanStatus["DRAFT"] = "draft";
    CarePlanStatus["ACTIVE"] = "active";
    CarePlanStatus["ON_HOLD"] = "on-hold";
    CarePlanStatus["REVOKED"] = "revoked";
    CarePlanStatus["COMPLETED"] = "completed";
    CarePlanStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    CarePlanStatus["UNKNOWN"] = "unknown";
  })(exports.CarePlanStatus || (exports.CarePlanStatus = {}));
  (function(CarePlanIntent) {
    CarePlanIntent["PROPOSAL"] = "proposal";
    CarePlanIntent["PLAN"] = "plan";
    CarePlanIntent["ORDER"] = "order";
    CarePlanIntent["OPTION"] = "option";
  })(exports.CarePlanIntent || (exports.CarePlanIntent = {}));
  (function(CarePlanActivityKind) {
    CarePlanActivityKind["APPOINTMENT"] = "Appointment";
    CarePlanActivityKind["COMMUNICATIONREQUEST"] = "CommunicationRequest";
    CarePlanActivityKind["DEVICEREQUEST"] = "DeviceRequest";
    CarePlanActivityKind["MEDICATIONREQUEST"] = "MedicationRequest";
    CarePlanActivityKind["NUTRITIONORDER"] = "NutritionOrder";
    CarePlanActivityKind["TASK"] = "Task";
    CarePlanActivityKind["SERVICEREQUEST"] = "ServiceRequest";
    CarePlanActivityKind["VISIONPRESCRIPTION"] = "VisionPrescription";
  })(exports.CarePlanActivityKind || (exports.CarePlanActivityKind = {}));
  (function(CarePlanActivityStatus) {
    CarePlanActivityStatus["NOT_STARTED"] = "not-started";
    CarePlanActivityStatus["SCHEDULED"] = "scheduled";
    CarePlanActivityStatus["IN_PROGRESS"] = "in-progress";
    CarePlanActivityStatus["ON_HOLD"] = "on-hold";
    CarePlanActivityStatus["COMPLETED"] = "completed";
    CarePlanActivityStatus["CANCELLED"] = "cancelled";
    CarePlanActivityStatus["STOPPED"] = "stopped";
    CarePlanActivityStatus["UNKNOWN"] = "unknown";
    CarePlanActivityStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.CarePlanActivityStatus || (exports.CarePlanActivityStatus = {}));
  (function(CareTeamStatus) {
    CareTeamStatus["PROPOSED"] = "proposed";
    CareTeamStatus["ACTIVE"] = "active";
    CareTeamStatus["SUSPENDED"] = "suspended";
    CareTeamStatus["INACTIVE"] = "inactive";
    CareTeamStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.CareTeamStatus || (exports.CareTeamStatus = {}));
  (function(CatalogEntryPublicationStatus) {
    CatalogEntryPublicationStatus["DRAFT"] = "draft";
    CatalogEntryPublicationStatus["ACTIVE"] = "active";
    CatalogEntryPublicationStatus["RETIRED"] = "retired";
    CatalogEntryPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.CatalogEntryPublicationStatus || (exports.CatalogEntryPublicationStatus = {}));
  (function(CatalogEntryRelationType) {
    CatalogEntryRelationType["TRIGGERS"] = "triggers";
    CatalogEntryRelationType["IS_REPLACED_BY"] = "is-replaced-by";
  })(exports.CatalogEntryRelationType || (exports.CatalogEntryRelationType = {}));
  (function(ChargeItemStatus) {
    ChargeItemStatus["PLANNED"] = "planned";
    ChargeItemStatus["BILLABLE"] = "billable";
    ChargeItemStatus["NOT_BILLABLE"] = "not-billable";
    ChargeItemStatus["ABORTED"] = "aborted";
    ChargeItemStatus["BILLED"] = "billed";
    ChargeItemStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ChargeItemStatus["UNKNOWN"] = "unknown";
  })(exports.ChargeItemStatus || (exports.ChargeItemStatus = {}));
  (function(ChargeItemDefinitionPublicationStatus) {
    ChargeItemDefinitionPublicationStatus["DRAFT"] = "draft";
    ChargeItemDefinitionPublicationStatus["ACTIVE"] = "active";
    ChargeItemDefinitionPublicationStatus["RETIRED"] = "retired";
    ChargeItemDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ChargeItemDefinitionPublicationStatus || (exports.ChargeItemDefinitionPublicationStatus = {}));
  (function(ChargeItemDefinitionPriceComponentType) {
    ChargeItemDefinitionPriceComponentType["BASE"] = "base";
    ChargeItemDefinitionPriceComponentType["SURCHARGE"] = "surcharge";
    ChargeItemDefinitionPriceComponentType["DEDUCTION"] = "deduction";
    ChargeItemDefinitionPriceComponentType["DISCOUNT"] = "discount";
    ChargeItemDefinitionPriceComponentType["TAX"] = "tax";
    ChargeItemDefinitionPriceComponentType["INFORMATIONAL"] = "informational";
  })(exports.ChargeItemDefinitionPriceComponentType || (exports.ChargeItemDefinitionPriceComponentType = {}));
  (function(ClaimStatus) {
    ClaimStatus["ACTIVE"] = "active";
    ClaimStatus["CANCELLED"] = "cancelled";
    ClaimStatus["DRAFT"] = "draft";
    ClaimStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ClaimStatus || (exports.ClaimStatus = {}));
  (function(ClaimUse) {
    ClaimUse["CLAIM"] = "claim";
    ClaimUse["PREAUTHORIZATION"] = "preauthorization";
    ClaimUse["PREDETERMINATION"] = "predetermination";
  })(exports.ClaimUse || (exports.ClaimUse = {}));
  (function(ClaimResponseStatus) {
    ClaimResponseStatus["ACTIVE"] = "active";
    ClaimResponseStatus["CANCELLED"] = "cancelled";
    ClaimResponseStatus["DRAFT"] = "draft";
    ClaimResponseStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ClaimResponseStatus || (exports.ClaimResponseStatus = {}));
  (function(ClaimResponseUse) {
    ClaimResponseUse["CLAIM"] = "claim";
    ClaimResponseUse["PREAUTHORIZATION"] = "preauthorization";
    ClaimResponseUse["PREDETERMINATION"] = "predetermination";
  })(exports.ClaimResponseUse || (exports.ClaimResponseUse = {}));
  (function(ClaimResponseRemittanceOutcome) {
    ClaimResponseRemittanceOutcome["QUEUED"] = "queued";
    ClaimResponseRemittanceOutcome["COMPLETE"] = "complete";
    ClaimResponseRemittanceOutcome["ERROR"] = "error";
    ClaimResponseRemittanceOutcome["PARTIAL"] = "partial";
  })(exports.ClaimResponseRemittanceOutcome || (exports.ClaimResponseRemittanceOutcome = {}));
  (function(ClaimResponseNoteType) {
    ClaimResponseNoteType["DISPLAY"] = "display";
    ClaimResponseNoteType["PRINT"] = "print";
    ClaimResponseNoteType["PRINTOPER"] = "printoper";
  })(exports.ClaimResponseNoteType || (exports.ClaimResponseNoteType = {}));
  (function(ClinicalImpressionStatus) {
    ClinicalImpressionStatus["IN_PROGRESS"] = "in-progress";
    ClinicalImpressionStatus["COMPLETED"] = "completed";
    ClinicalImpressionStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ClinicalImpressionStatus || (exports.ClinicalImpressionStatus = {}));
  (function(CodeSystemPublicationStatus) {
    CodeSystemPublicationStatus["DRAFT"] = "draft";
    CodeSystemPublicationStatus["ACTIVE"] = "active";
    CodeSystemPublicationStatus["RETIRED"] = "retired";
    CodeSystemPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.CodeSystemPublicationStatus || (exports.CodeSystemPublicationStatus = {}));
  (function(CodeSystemHierarchyMeaning) {
    CodeSystemHierarchyMeaning["GROUPED_BY"] = "grouped-by";
    CodeSystemHierarchyMeaning["IS_A"] = "is-a";
    CodeSystemHierarchyMeaning["PART_OF"] = "part-of";
    CodeSystemHierarchyMeaning["CLASSIFIED_WITH"] = "classified-with";
  })(exports.CodeSystemHierarchyMeaning || (exports.CodeSystemHierarchyMeaning = {}));
  (function(CodeSystemContentMode) {
    CodeSystemContentMode["NOT_PRESENT"] = "not-present";
    CodeSystemContentMode["EXAMPLE"] = "example";
    CodeSystemContentMode["FRAGMENT"] = "fragment";
    CodeSystemContentMode["COMPLETE"] = "complete";
    CodeSystemContentMode["SUPPLEMENT"] = "supplement";
  })(exports.CodeSystemContentMode || (exports.CodeSystemContentMode = {}));
  (function(CodeSystemFilterOperator) {
    CodeSystemFilterOperator["E"] = "=";
    CodeSystemFilterOperator["IS_A"] = "is-a";
    CodeSystemFilterOperator["DESCENDENT_OF"] = "descendent-of";
    CodeSystemFilterOperator["IS_NOT_A"] = "is-not-a";
    CodeSystemFilterOperator["REGEX"] = "regex";
    CodeSystemFilterOperator["IN"] = "in";
    CodeSystemFilterOperator["NOT_IN"] = "not-in";
    CodeSystemFilterOperator["GENERALIZES"] = "generalizes";
    CodeSystemFilterOperator["EXISTS"] = "exists";
  })(exports.CodeSystemFilterOperator || (exports.CodeSystemFilterOperator = {}));
  (function(CodeSystemPropertyType) {
    CodeSystemPropertyType["CODE"] = "code";
    CodeSystemPropertyType["CODING"] = "Coding";
    CodeSystemPropertyType["STRING"] = "string";
    CodeSystemPropertyType["INTEGER"] = "integer";
    CodeSystemPropertyType["BOOLEAN"] = "boolean";
    CodeSystemPropertyType["DATETIME"] = "dateTime";
    CodeSystemPropertyType["DECIMAL"] = "decimal";
  })(exports.CodeSystemPropertyType || (exports.CodeSystemPropertyType = {}));
  (function(CommunicationStatus) {
    CommunicationStatus["PREPARATION"] = "preparation";
    CommunicationStatus["IN_PROGRESS"] = "in-progress";
    CommunicationStatus["NOT_DONE"] = "not-done";
    CommunicationStatus["ON_HOLD"] = "on-hold";
    CommunicationStatus["STOPPED"] = "stopped";
    CommunicationStatus["COMPLETED"] = "completed";
    CommunicationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    CommunicationStatus["UNKNOWN"] = "unknown";
  })(exports.CommunicationStatus || (exports.CommunicationStatus = {}));
  (function(CommunicationPriority) {
    CommunicationPriority["ROUTINE"] = "routine";
    CommunicationPriority["URGENT"] = "urgent";
    CommunicationPriority["ASAP"] = "asap";
    CommunicationPriority["STAT"] = "stat";
  })(exports.CommunicationPriority || (exports.CommunicationPriority = {}));
  (function(CommunicationRequestStatus) {
    CommunicationRequestStatus["DRAFT"] = "draft";
    CommunicationRequestStatus["ACTIVE"] = "active";
    CommunicationRequestStatus["ON_HOLD"] = "on-hold";
    CommunicationRequestStatus["REVOKED"] = "revoked";
    CommunicationRequestStatus["COMPLETED"] = "completed";
    CommunicationRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    CommunicationRequestStatus["UNKNOWN"] = "unknown";
  })(exports.CommunicationRequestStatus || (exports.CommunicationRequestStatus = {}));
  (function(CommunicationRequestCommunicationPriority) {
    CommunicationRequestCommunicationPriority["ROUTINE"] = "routine";
    CommunicationRequestCommunicationPriority["URGENT"] = "urgent";
    CommunicationRequestCommunicationPriority["ASAP"] = "asap";
    CommunicationRequestCommunicationPriority["STAT"] = "stat";
  })(exports.CommunicationRequestCommunicationPriority || (exports.CommunicationRequestCommunicationPriority = {}));
  (function(CompartmentDefinitionPublicationStatus) {
    CompartmentDefinitionPublicationStatus["DRAFT"] = "draft";
    CompartmentDefinitionPublicationStatus["ACTIVE"] = "active";
    CompartmentDefinitionPublicationStatus["RETIRED"] = "retired";
    CompartmentDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.CompartmentDefinitionPublicationStatus || (exports.CompartmentDefinitionPublicationStatus = {}));
  (function(CompartmentDefinitionCompartmentType) {
    CompartmentDefinitionCompartmentType["PATIENT"] = "Patient";
    CompartmentDefinitionCompartmentType["ENCOUNTER"] = "Encounter";
    CompartmentDefinitionCompartmentType["RELATEDPERSON"] = "RelatedPerson";
    CompartmentDefinitionCompartmentType["PRACTITIONER"] = "Practitioner";
    CompartmentDefinitionCompartmentType["DEVICE"] = "Device";
  })(exports.CompartmentDefinitionCompartmentType || (exports.CompartmentDefinitionCompartmentType = {}));
  (function(CompositionStatus) {
    CompositionStatus["PRELIMINARY"] = "preliminary";
    CompositionStatus["FINAL"] = "final";
    CompositionStatus["AMENDED"] = "amended";
    CompositionStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.CompositionStatus || (exports.CompositionStatus = {}));
  (function(CompositionAttestationMode) {
    CompositionAttestationMode["PERSONAL"] = "personal";
    CompositionAttestationMode["PROFESSIONAL"] = "professional";
    CompositionAttestationMode["LEGAL"] = "legal";
    CompositionAttestationMode["OFFICIAL"] = "official";
  })(exports.CompositionAttestationMode || (exports.CompositionAttestationMode = {}));
  (function(CompositionDocumentRelationshipType) {
    CompositionDocumentRelationshipType["REPLACES"] = "replaces";
    CompositionDocumentRelationshipType["TRANSFORMS"] = "transforms";
    CompositionDocumentRelationshipType["SIGNS"] = "signs";
    CompositionDocumentRelationshipType["APPENDS"] = "appends";
  })(exports.CompositionDocumentRelationshipType || (exports.CompositionDocumentRelationshipType = {}));
  (function(CompositionSectionMode) {
    CompositionSectionMode["WORKING"] = "working";
    CompositionSectionMode["SNAPSHOT"] = "snapshot";
    CompositionSectionMode["CHANGES"] = "changes";
  })(exports.CompositionSectionMode || (exports.CompositionSectionMode = {}));
  (function(ConceptMapPublicationStatus) {
    ConceptMapPublicationStatus["DRAFT"] = "draft";
    ConceptMapPublicationStatus["ACTIVE"] = "active";
    ConceptMapPublicationStatus["RETIRED"] = "retired";
    ConceptMapPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ConceptMapPublicationStatus || (exports.ConceptMapPublicationStatus = {}));
  (function(ConceptMapEquivalence) {
    ConceptMapEquivalence["RELATEDTO"] = "relatedto";
    ConceptMapEquivalence["EQUIVALENT"] = "equivalent";
    ConceptMapEquivalence["EQUAL"] = "equal";
    ConceptMapEquivalence["WIDER"] = "wider";
    ConceptMapEquivalence["SUBSUMES"] = "subsumes";
    ConceptMapEquivalence["NARROWER"] = "narrower";
    ConceptMapEquivalence["SPECIALIZES"] = "specializes";
    ConceptMapEquivalence["INEXACT"] = "inexact";
    ConceptMapEquivalence["UNMATCHED"] = "unmatched";
    ConceptMapEquivalence["DISJOINT"] = "disjoint";
  })(exports.ConceptMapEquivalence || (exports.ConceptMapEquivalence = {}));
  (function(ConceptMapGroupUnmappedMode) {
    ConceptMapGroupUnmappedMode["PROVIDED"] = "provided";
    ConceptMapGroupUnmappedMode["FIXED"] = "fixed";
    ConceptMapGroupUnmappedMode["OTHER_MAP"] = "other-map";
  })(exports.ConceptMapGroupUnmappedMode || (exports.ConceptMapGroupUnmappedMode = {}));
  (function(ConsentState) {
    ConsentState["DRAFT"] = "draft";
    ConsentState["PROPOSED"] = "proposed";
    ConsentState["ACTIVE"] = "active";
    ConsentState["REJECTED"] = "rejected";
    ConsentState["INACTIVE"] = "inactive";
    ConsentState["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ConsentState || (exports.ConsentState = {}));
  (function(ConsentProvisionType) {
    ConsentProvisionType["DENY"] = "deny";
    ConsentProvisionType["PERMIT"] = "permit";
  })(exports.ConsentProvisionType || (exports.ConsentProvisionType = {}));
  (function(ConsentDataMeaning) {
    ConsentDataMeaning["INSTANCE"] = "instance";
    ConsentDataMeaning["RELATED"] = "related";
    ConsentDataMeaning["DEPENDENTS"] = "dependents";
    ConsentDataMeaning["AUTHOREDBY"] = "authoredby";
  })(exports.ConsentDataMeaning || (exports.ConsentDataMeaning = {}));
  (function(ContractStatus) {
    ContractStatus["AMENDED"] = "amended";
    ContractStatus["APPENDED"] = "appended";
    ContractStatus["CANCELLED"] = "cancelled";
    ContractStatus["DISPUTED"] = "disputed";
    ContractStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ContractStatus["EXECUTABLE"] = "executable";
    ContractStatus["EXECUTED"] = "executed";
    ContractStatus["NEGOTIABLE"] = "negotiable";
    ContractStatus["OFFERED"] = "offered";
    ContractStatus["POLICY"] = "policy";
    ContractStatus["REJECTED"] = "rejected";
    ContractStatus["RENEWED"] = "renewed";
    ContractStatus["REVOKED"] = "revoked";
    ContractStatus["RESOLVED"] = "resolved";
    ContractStatus["TERMINATED"] = "terminated";
  })(exports.ContractStatus || (exports.ContractStatus = {}));
  (function(ContractPublicationStatus) {
    ContractPublicationStatus["AMENDED"] = "amended";
    ContractPublicationStatus["APPENDED"] = "appended";
    ContractPublicationStatus["CANCELLED"] = "cancelled";
    ContractPublicationStatus["DISPUTED"] = "disputed";
    ContractPublicationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ContractPublicationStatus["EXECUTABLE"] = "executable";
    ContractPublicationStatus["EXECUTED"] = "executed";
    ContractPublicationStatus["NEGOTIABLE"] = "negotiable";
    ContractPublicationStatus["OFFERED"] = "offered";
    ContractPublicationStatus["POLICY"] = "policy";
    ContractPublicationStatus["REJECTED"] = "rejected";
    ContractPublicationStatus["RENEWED"] = "renewed";
    ContractPublicationStatus["REVOKED"] = "revoked";
    ContractPublicationStatus["RESOLVED"] = "resolved";
    ContractPublicationStatus["TERMINATED"] = "terminated";
  })(exports.ContractPublicationStatus || (exports.ContractPublicationStatus = {}));
  (function(CoverageStatus) {
    CoverageStatus["ACTIVE"] = "active";
    CoverageStatus["CANCELLED"] = "cancelled";
    CoverageStatus["DRAFT"] = "draft";
    CoverageStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.CoverageStatus || (exports.CoverageStatus = {}));
  (function(CoverageEligibilityRequestEligibilityRequestStatus) {
    CoverageEligibilityRequestEligibilityRequestStatus["ACTIVE"] = "active";
    CoverageEligibilityRequestEligibilityRequestStatus["CANCELLED"] = "cancelled";
    CoverageEligibilityRequestEligibilityRequestStatus["DRAFT"] = "draft";
    CoverageEligibilityRequestEligibilityRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.CoverageEligibilityRequestEligibilityRequestStatus || (exports.CoverageEligibilityRequestEligibilityRequestStatus = {}));
  (function(CoverageEligibilityRequestEligibilityRequestPurpose) {
    CoverageEligibilityRequestEligibilityRequestPurpose["AUTH_REQUIREMENTS"] = "auth-requirements";
    CoverageEligibilityRequestEligibilityRequestPurpose["BENEFITS"] = "benefits";
    CoverageEligibilityRequestEligibilityRequestPurpose["DISCOVERY"] = "discovery";
    CoverageEligibilityRequestEligibilityRequestPurpose["VALIDATION"] = "validation";
  })(exports.CoverageEligibilityRequestEligibilityRequestPurpose || (exports.CoverageEligibilityRequestEligibilityRequestPurpose = {}));
  (function(CoverageEligibilityResponseEligibilityResponseStatus) {
    CoverageEligibilityResponseEligibilityResponseStatus["ACTIVE"] = "active";
    CoverageEligibilityResponseEligibilityResponseStatus["CANCELLED"] = "cancelled";
    CoverageEligibilityResponseEligibilityResponseStatus["DRAFT"] = "draft";
    CoverageEligibilityResponseEligibilityResponseStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.CoverageEligibilityResponseEligibilityResponseStatus || (exports.CoverageEligibilityResponseEligibilityResponseStatus = {}));
  (function(CoverageEligibilityResponseEligibilityResponsePurpose) {
    CoverageEligibilityResponseEligibilityResponsePurpose["AUTH_REQUIREMENTS"] = "auth-requirements";
    CoverageEligibilityResponseEligibilityResponsePurpose["BENEFITS"] = "benefits";
    CoverageEligibilityResponseEligibilityResponsePurpose["DISCOVERY"] = "discovery";
    CoverageEligibilityResponseEligibilityResponsePurpose["VALIDATION"] = "validation";
  })(exports.CoverageEligibilityResponseEligibilityResponsePurpose || (exports.CoverageEligibilityResponseEligibilityResponsePurpose = {}));
  (function(CoverageEligibilityResponseRemittanceOutcome) {
    CoverageEligibilityResponseRemittanceOutcome["QUEUED"] = "queued";
    CoverageEligibilityResponseRemittanceOutcome["COMPLETE"] = "complete";
    CoverageEligibilityResponseRemittanceOutcome["ERROR"] = "error";
    CoverageEligibilityResponseRemittanceOutcome["PARTIAL"] = "partial";
  })(exports.CoverageEligibilityResponseRemittanceOutcome || (exports.CoverageEligibilityResponseRemittanceOutcome = {}));
  (function(DetectedIssueSeverity) {
    DetectedIssueSeverity["HIGH"] = "high";
    DetectedIssueSeverity["MODERATE"] = "moderate";
    DetectedIssueSeverity["LOW"] = "low";
  })(exports.DetectedIssueSeverity || (exports.DetectedIssueSeverity = {}));
  (function(DeviceFHIRDeviceStatus) {
    DeviceFHIRDeviceStatus["ACTIVE"] = "active";
    DeviceFHIRDeviceStatus["INACTIVE"] = "inactive";
    DeviceFHIRDeviceStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    DeviceFHIRDeviceStatus["UNKNOWN"] = "unknown";
  })(exports.DeviceFHIRDeviceStatus || (exports.DeviceFHIRDeviceStatus = {}));
  (function(DeviceNameType) {
    DeviceNameType["UDI_LABEL_NAME"] = "udi-label-name";
    DeviceNameType["USER_FRIENDLY_NAME"] = "user-friendly-name";
    DeviceNameType["PATIENT_REPORTED_NAME"] = "patient-reported-name";
    DeviceNameType["MANUFACTURER_NAME"] = "manufacturer-name";
    DeviceNameType["MODEL_NAME"] = "model-name";
    DeviceNameType["OTHER"] = "other";
  })(exports.DeviceNameType || (exports.DeviceNameType = {}));
  (function(DeviceDefinitionDeviceNameType) {
    DeviceDefinitionDeviceNameType["UDI_LABEL_NAME"] = "udi-label-name";
    DeviceDefinitionDeviceNameType["USER_FRIENDLY_NAME"] = "user-friendly-name";
    DeviceDefinitionDeviceNameType["PATIENT_REPORTED_NAME"] = "patient-reported-name";
    DeviceDefinitionDeviceNameType["MANUFACTURER_NAME"] = "manufacturer-name";
    DeviceDefinitionDeviceNameType["MODEL_NAME"] = "model-name";
    DeviceDefinitionDeviceNameType["OTHER"] = "other";
  })(exports.DeviceDefinitionDeviceNameType || (exports.DeviceDefinitionDeviceNameType = {}));
  (function(DeviceMetricOperationalStatus) {
    DeviceMetricOperationalStatus["ON"] = "on";
    DeviceMetricOperationalStatus["OFF"] = "off";
    DeviceMetricOperationalStatus["STANDBY"] = "standby";
    DeviceMetricOperationalStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.DeviceMetricOperationalStatus || (exports.DeviceMetricOperationalStatus = {}));
  (function(DeviceMetricColor) {
    DeviceMetricColor["BLACK"] = "black";
    DeviceMetricColor["RED"] = "red";
    DeviceMetricColor["GREEN"] = "green";
    DeviceMetricColor["YELLOW"] = "yellow";
    DeviceMetricColor["BLUE"] = "blue";
    DeviceMetricColor["MAGENTA"] = "magenta";
    DeviceMetricColor["CYAN"] = "cyan";
    DeviceMetricColor["WHITE"] = "white";
  })(exports.DeviceMetricColor || (exports.DeviceMetricColor = {}));
  (function(DeviceMetricCategory) {
    DeviceMetricCategory["MEASUREMENT"] = "measurement";
    DeviceMetricCategory["SETTING"] = "setting";
    DeviceMetricCategory["CALCULATION"] = "calculation";
    DeviceMetricCategory["UNSPECIFIED"] = "unspecified";
  })(exports.DeviceMetricCategory || (exports.DeviceMetricCategory = {}));
  (function(DeviceMetricCalibrationType) {
    DeviceMetricCalibrationType["UNSPECIFIED"] = "unspecified";
    DeviceMetricCalibrationType["OFFSET"] = "offset";
    DeviceMetricCalibrationType["GAIN"] = "gain";
    DeviceMetricCalibrationType["TWO_POINT"] = "two-point";
  })(exports.DeviceMetricCalibrationType || (exports.DeviceMetricCalibrationType = {}));
  (function(DeviceMetricCalibrationState) {
    DeviceMetricCalibrationState["NOT_CALIBRATED"] = "not-calibrated";
    DeviceMetricCalibrationState["CALIBRATION_REQUIRED"] = "calibration-required";
    DeviceMetricCalibrationState["CALIBRATED"] = "calibrated";
    DeviceMetricCalibrationState["UNSPECIFIED"] = "unspecified";
  })(exports.DeviceMetricCalibrationState || (exports.DeviceMetricCalibrationState = {}));
  (function(DeviceRequestStatus) {
    DeviceRequestStatus["DRAFT"] = "draft";
    DeviceRequestStatus["ACTIVE"] = "active";
    DeviceRequestStatus["ON_HOLD"] = "on-hold";
    DeviceRequestStatus["REVOKED"] = "revoked";
    DeviceRequestStatus["COMPLETED"] = "completed";
    DeviceRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    DeviceRequestStatus["UNKNOWN"] = "unknown";
  })(exports.DeviceRequestStatus || (exports.DeviceRequestStatus = {}));
  (function(DeviceRequestRequestIntent) {
    DeviceRequestRequestIntent["PROPOSAL"] = "proposal";
    DeviceRequestRequestIntent["PLAN"] = "plan";
    DeviceRequestRequestIntent["DIRECTIVE"] = "directive";
    DeviceRequestRequestIntent["ORDER"] = "order";
    DeviceRequestRequestIntent["ORIGINAL_ORDER"] = "original-order";
    DeviceRequestRequestIntent["REFLEX_ORDER"] = "reflex-order";
    DeviceRequestRequestIntent["FILLER_ORDER"] = "filler-order";
    DeviceRequestRequestIntent["INSTANCE_ORDER"] = "instance-order";
    DeviceRequestRequestIntent["OPTION"] = "option";
  })(exports.DeviceRequestRequestIntent || (exports.DeviceRequestRequestIntent = {}));
  (function(DeviceRequestRequestPriority) {
    DeviceRequestRequestPriority["ROUTINE"] = "routine";
    DeviceRequestRequestPriority["URGENT"] = "urgent";
    DeviceRequestRequestPriority["ASAP"] = "asap";
    DeviceRequestRequestPriority["STAT"] = "stat";
  })(exports.DeviceRequestRequestPriority || (exports.DeviceRequestRequestPriority = {}));
  (function(DocumentManifestDocumentReferenceStatus) {
    DocumentManifestDocumentReferenceStatus["CURRENT"] = "current";
    DocumentManifestDocumentReferenceStatus["SUPERSEDED"] = "superseded";
    DocumentManifestDocumentReferenceStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.DocumentManifestDocumentReferenceStatus || (exports.DocumentManifestDocumentReferenceStatus = {}));
  (function(DocumentReferenceStatus) {
    DocumentReferenceStatus["CURRENT"] = "current";
    DocumentReferenceStatus["SUPERSEDED"] = "superseded";
    DocumentReferenceStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.DocumentReferenceStatus || (exports.DocumentReferenceStatus = {}));
  (function(DocumentReferenceReferredDocumentStatus) {
    DocumentReferenceReferredDocumentStatus["PRELIMINARY"] = "preliminary";
    DocumentReferenceReferredDocumentStatus["FINAL"] = "final";
    DocumentReferenceReferredDocumentStatus["AMENDED"] = "amended";
    DocumentReferenceReferredDocumentStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.DocumentReferenceReferredDocumentStatus || (exports.DocumentReferenceReferredDocumentStatus = {}));
  (function(DocumentReferenceDocumentRelationshipType) {
    DocumentReferenceDocumentRelationshipType["REPLACES"] = "replaces";
    DocumentReferenceDocumentRelationshipType["TRANSFORMS"] = "transforms";
    DocumentReferenceDocumentRelationshipType["SIGNS"] = "signs";
    DocumentReferenceDocumentRelationshipType["APPENDS"] = "appends";
  })(exports.DocumentReferenceDocumentRelationshipType || (exports.DocumentReferenceDocumentRelationshipType = {}));
  (function(EffectEvidenceSynthesisPublicationStatus) {
    EffectEvidenceSynthesisPublicationStatus["DRAFT"] = "draft";
    EffectEvidenceSynthesisPublicationStatus["ACTIVE"] = "active";
    EffectEvidenceSynthesisPublicationStatus["RETIRED"] = "retired";
    EffectEvidenceSynthesisPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.EffectEvidenceSynthesisPublicationStatus || (exports.EffectEvidenceSynthesisPublicationStatus = {}));
  (function(EffectEvidenceSynthesisExposureState) {
    EffectEvidenceSynthesisExposureState["EXPOSURE"] = "exposure";
    EffectEvidenceSynthesisExposureState["EXPOSURE_ALTERNATIVE"] = "exposure-alternative";
  })(exports.EffectEvidenceSynthesisExposureState || (exports.EffectEvidenceSynthesisExposureState = {}));
  (function(EncounterLocationStatus) {
    EncounterLocationStatus["PLANNED"] = "planned";
    EncounterLocationStatus["ACTIVE"] = "active";
    EncounterLocationStatus["RESERVED"] = "reserved";
    EncounterLocationStatus["COMPLETED"] = "completed";
  })(exports.EncounterLocationStatus || (exports.EncounterLocationStatus = {}));
  (function(EndpointStatus) {
    EndpointStatus["ACTIVE"] = "active";
    EndpointStatus["SUSPENDED"] = "suspended";
    EndpointStatus["ERROR"] = "error";
    EndpointStatus["OFF"] = "off";
    EndpointStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    EndpointStatus["TEST"] = "test";
  })(exports.EndpointStatus || (exports.EndpointStatus = {}));
  (function(EnrollmentRequestStatus) {
    EnrollmentRequestStatus["ACTIVE"] = "active";
    EnrollmentRequestStatus["CANCELLED"] = "cancelled";
    EnrollmentRequestStatus["DRAFT"] = "draft";
    EnrollmentRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.EnrollmentRequestStatus || (exports.EnrollmentRequestStatus = {}));
  (function(EnrollmentResponseStatus) {
    EnrollmentResponseStatus["ACTIVE"] = "active";
    EnrollmentResponseStatus["CANCELLED"] = "cancelled";
    EnrollmentResponseStatus["DRAFT"] = "draft";
    EnrollmentResponseStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.EnrollmentResponseStatus || (exports.EnrollmentResponseStatus = {}));
  (function(EnrollmentResponseRemittanceOutcome) {
    EnrollmentResponseRemittanceOutcome["QUEUED"] = "queued";
    EnrollmentResponseRemittanceOutcome["COMPLETE"] = "complete";
    EnrollmentResponseRemittanceOutcome["ERROR"] = "error";
    EnrollmentResponseRemittanceOutcome["PARTIAL"] = "partial";
  })(exports.EnrollmentResponseRemittanceOutcome || (exports.EnrollmentResponseRemittanceOutcome = {}));
  (function(EpisodeOfCareStatus) {
    EpisodeOfCareStatus["PLANNED"] = "planned";
    EpisodeOfCareStatus["WAITLIST"] = "waitlist";
    EpisodeOfCareStatus["ACTIVE"] = "active";
    EpisodeOfCareStatus["ONHOLD"] = "onhold";
    EpisodeOfCareStatus["FINISHED"] = "finished";
    EpisodeOfCareStatus["CANCELLED"] = "cancelled";
    EpisodeOfCareStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.EpisodeOfCareStatus || (exports.EpisodeOfCareStatus = {}));
  (function(EventDefinitionPublicationStatus) {
    EventDefinitionPublicationStatus["DRAFT"] = "draft";
    EventDefinitionPublicationStatus["ACTIVE"] = "active";
    EventDefinitionPublicationStatus["RETIRED"] = "retired";
    EventDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.EventDefinitionPublicationStatus || (exports.EventDefinitionPublicationStatus = {}));
  (function(EvidencePublicationStatus) {
    EvidencePublicationStatus["DRAFT"] = "draft";
    EvidencePublicationStatus["ACTIVE"] = "active";
    EvidencePublicationStatus["RETIRED"] = "retired";
    EvidencePublicationStatus["UNKNOWN"] = "unknown";
  })(exports.EvidencePublicationStatus || (exports.EvidencePublicationStatus = {}));
  (function(EvidenceVariablePublicationStatus) {
    EvidenceVariablePublicationStatus["DRAFT"] = "draft";
    EvidenceVariablePublicationStatus["ACTIVE"] = "active";
    EvidenceVariablePublicationStatus["RETIRED"] = "retired";
    EvidenceVariablePublicationStatus["UNKNOWN"] = "unknown";
  })(exports.EvidenceVariablePublicationStatus || (exports.EvidenceVariablePublicationStatus = {}));
  (function(EvidenceVariableType) {
    EvidenceVariableType["DICHOTOMOUS"] = "dichotomous";
    EvidenceVariableType["CONTINUOUS"] = "continuous";
    EvidenceVariableType["DESCRIPTIVE"] = "descriptive";
  })(exports.EvidenceVariableType || (exports.EvidenceVariableType = {}));
  (function(EvidenceVariableGroupMeasure) {
    EvidenceVariableGroupMeasure["MEAN"] = "mean";
    EvidenceVariableGroupMeasure["MEDIAN"] = "median";
    EvidenceVariableGroupMeasure["MEAN_OF_MEAN"] = "mean-of-mean";
    EvidenceVariableGroupMeasure["MEAN_OF_MEDIAN"] = "mean-of-median";
    EvidenceVariableGroupMeasure["MEDIAN_OF_MEAN"] = "median-of-mean";
    EvidenceVariableGroupMeasure["MEDIAN_OF_MEDIAN"] = "median-of-median";
  })(exports.EvidenceVariableGroupMeasure || (exports.EvidenceVariableGroupMeasure = {}));
  (function(ExampleScenarioPublicationStatus) {
    ExampleScenarioPublicationStatus["DRAFT"] = "draft";
    ExampleScenarioPublicationStatus["ACTIVE"] = "active";
    ExampleScenarioPublicationStatus["RETIRED"] = "retired";
    ExampleScenarioPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ExampleScenarioPublicationStatus || (exports.ExampleScenarioPublicationStatus = {}));
  (function(ExampleScenarioActorType) {
    ExampleScenarioActorType["PERSON"] = "person";
    ExampleScenarioActorType["ENTITY"] = "entity";
  })(exports.ExampleScenarioActorType || (exports.ExampleScenarioActorType = {}));
  (function(ExplanationOfBenefitStatus) {
    ExplanationOfBenefitStatus["ACTIVE"] = "active";
    ExplanationOfBenefitStatus["CANCELLED"] = "cancelled";
    ExplanationOfBenefitStatus["DRAFT"] = "draft";
    ExplanationOfBenefitStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ExplanationOfBenefitStatus || (exports.ExplanationOfBenefitStatus = {}));
  (function(ExplanationOfBenefitUse) {
    ExplanationOfBenefitUse["CLAIM"] = "claim";
    ExplanationOfBenefitUse["PREAUTHORIZATION"] = "preauthorization";
    ExplanationOfBenefitUse["PREDETERMINATION"] = "predetermination";
  })(exports.ExplanationOfBenefitUse || (exports.ExplanationOfBenefitUse = {}));
  (function(ExplanationOfBenefitRemittanceOutcome) {
    ExplanationOfBenefitRemittanceOutcome["QUEUED"] = "queued";
    ExplanationOfBenefitRemittanceOutcome["COMPLETE"] = "complete";
    ExplanationOfBenefitRemittanceOutcome["ERROR"] = "error";
    ExplanationOfBenefitRemittanceOutcome["PARTIAL"] = "partial";
  })(exports.ExplanationOfBenefitRemittanceOutcome || (exports.ExplanationOfBenefitRemittanceOutcome = {}));
  (function(ExplanationOfBenefitNoteType) {
    ExplanationOfBenefitNoteType["DISPLAY"] = "display";
    ExplanationOfBenefitNoteType["PRINT"] = "print";
    ExplanationOfBenefitNoteType["PRINTOPER"] = "printoper";
  })(exports.ExplanationOfBenefitNoteType || (exports.ExplanationOfBenefitNoteType = {}));
  (function(FamilyMemberHistoryFamilyHistoryStatus) {
    FamilyMemberHistoryFamilyHistoryStatus["PARTIAL"] = "partial";
    FamilyMemberHistoryFamilyHistoryStatus["COMPLETED"] = "completed";
    FamilyMemberHistoryFamilyHistoryStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    FamilyMemberHistoryFamilyHistoryStatus["HEALTH_UNKNOWN"] = "health-unknown";
  })(exports.FamilyMemberHistoryFamilyHistoryStatus || (exports.FamilyMemberHistoryFamilyHistoryStatus = {}));
  (function(FlagStatus) {
    FlagStatus["ACTIVE"] = "active";
    FlagStatus["INACTIVE"] = "inactive";
    FlagStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.FlagStatus || (exports.FlagStatus = {}));
  (function(GoalLifecycleStatus) {
    GoalLifecycleStatus["PROPOSED"] = "proposed";
    GoalLifecycleStatus["PLANNED"] = "planned";
    GoalLifecycleStatus["ACCEPTED"] = "accepted";
    GoalLifecycleStatus["ACTIVE"] = "active";
    GoalLifecycleStatus["ON_HOLD"] = "on-hold";
    GoalLifecycleStatus["COMPLETED"] = "completed";
    GoalLifecycleStatus["CANCELLED"] = "cancelled";
    GoalLifecycleStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    GoalLifecycleStatus["REJECTED"] = "rejected";
  })(exports.GoalLifecycleStatus || (exports.GoalLifecycleStatus = {}));
  (function(GraphDefinitionPublicationStatus) {
    GraphDefinitionPublicationStatus["DRAFT"] = "draft";
    GraphDefinitionPublicationStatus["ACTIVE"] = "active";
    GraphDefinitionPublicationStatus["RETIRED"] = "retired";
    GraphDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.GraphDefinitionPublicationStatus || (exports.GraphDefinitionPublicationStatus = {}));
  (function(GraphDefinitionGraphCompartmentUse) {
    GraphDefinitionGraphCompartmentUse["CONDITION"] = "condition";
    GraphDefinitionGraphCompartmentUse["REQUIREMENT"] = "requirement";
  })(exports.GraphDefinitionGraphCompartmentUse || (exports.GraphDefinitionGraphCompartmentUse = {}));
  (function(GraphDefinitionCompartmentCode) {
    GraphDefinitionCompartmentCode["PATIENT"] = "Patient";
    GraphDefinitionCompartmentCode["ENCOUNTER"] = "Encounter";
    GraphDefinitionCompartmentCode["RELATEDPERSON"] = "RelatedPerson";
    GraphDefinitionCompartmentCode["PRACTITIONER"] = "Practitioner";
    GraphDefinitionCompartmentCode["DEVICE"] = "Device";
  })(exports.GraphDefinitionCompartmentCode || (exports.GraphDefinitionCompartmentCode = {}));
  (function(GraphDefinitionGraphCompartmentRule) {
    GraphDefinitionGraphCompartmentRule["IDENTICAL"] = "identical";
    GraphDefinitionGraphCompartmentRule["MATCHING"] = "matching";
    GraphDefinitionGraphCompartmentRule["DIFFERENT"] = "different";
    GraphDefinitionGraphCompartmentRule["CUSTOM"] = "custom";
  })(exports.GraphDefinitionGraphCompartmentRule || (exports.GraphDefinitionGraphCompartmentRule = {}));
  (function(GroupType) {
    GroupType["PERSON"] = "person";
    GroupType["ANIMAL"] = "animal";
    GroupType["PRACTITIONER"] = "practitioner";
    GroupType["DEVICE"] = "device";
    GroupType["MEDICATION"] = "medication";
    GroupType["SUBSTANCE"] = "substance";
  })(exports.GroupType || (exports.GroupType = {}));
  (function(GuidanceResponseStatus) {
    GuidanceResponseStatus["SUCCESS"] = "success";
    GuidanceResponseStatus["DATA_REQUESTED"] = "data-requested";
    GuidanceResponseStatus["DATA_REQUIRED"] = "data-required";
    GuidanceResponseStatus["IN_PROGRESS"] = "in-progress";
    GuidanceResponseStatus["FAILURE"] = "failure";
    GuidanceResponseStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.GuidanceResponseStatus || (exports.GuidanceResponseStatus = {}));
  (function(HealthcareServiceDaysOfWeek) {
    HealthcareServiceDaysOfWeek["MON"] = "mon";
    HealthcareServiceDaysOfWeek["TUE"] = "tue";
    HealthcareServiceDaysOfWeek["WED"] = "wed";
    HealthcareServiceDaysOfWeek["THU"] = "thu";
    HealthcareServiceDaysOfWeek["FRI"] = "fri";
    HealthcareServiceDaysOfWeek["SAT"] = "sat";
    HealthcareServiceDaysOfWeek["SUN"] = "sun";
  })(exports.HealthcareServiceDaysOfWeek || (exports.HealthcareServiceDaysOfWeek = {}));
  (function(ImagingStudyStatus) {
    ImagingStudyStatus["REGISTERED"] = "registered";
    ImagingStudyStatus["AVAILABLE"] = "available";
    ImagingStudyStatus["CANCELLED"] = "cancelled";
    ImagingStudyStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ImagingStudyStatus["UNKNOWN"] = "unknown";
  })(exports.ImagingStudyStatus || (exports.ImagingStudyStatus = {}));
  (function(ImmunizationStatus) {
    ImmunizationStatus["COMPLETED"] = "completed";
    ImmunizationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ImmunizationStatus["NOT_DONE"] = "not-done";
  })(exports.ImmunizationStatus || (exports.ImmunizationStatus = {}));
  (function(ImmunizationEvaluationStatus) {
    ImmunizationEvaluationStatus["COMPLETED"] = "completed";
    ImmunizationEvaluationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ImmunizationEvaluationStatus || (exports.ImmunizationEvaluationStatus = {}));
  (function(ImplementationGuidePublicationStatus) {
    ImplementationGuidePublicationStatus["DRAFT"] = "draft";
    ImplementationGuidePublicationStatus["ACTIVE"] = "active";
    ImplementationGuidePublicationStatus["RETIRED"] = "retired";
    ImplementationGuidePublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ImplementationGuidePublicationStatus || (exports.ImplementationGuidePublicationStatus = {}));
  (function(ImplementationGuideGuidePageGeneration) {
    ImplementationGuideGuidePageGeneration["HTML"] = "html";
    ImplementationGuideGuidePageGeneration["MARKDOWN"] = "markdown";
    ImplementationGuideGuidePageGeneration["XML"] = "xml";
    ImplementationGuideGuidePageGeneration["GENERATED"] = "generated";
  })(exports.ImplementationGuideGuidePageGeneration || (exports.ImplementationGuideGuidePageGeneration = {}));
  (function(ImplementationGuideGuideParameterCode) {
    ImplementationGuideGuideParameterCode["APPLY"] = "apply";
    ImplementationGuideGuideParameterCode["PATH_RESOURCE"] = "path-resource";
    ImplementationGuideGuideParameterCode["PATH_PAGES"] = "path-pages";
    ImplementationGuideGuideParameterCode["PATH_TX_CACHE"] = "path-tx-cache";
    ImplementationGuideGuideParameterCode["EXPANSION_PARAMETER"] = "expansion-parameter";
    ImplementationGuideGuideParameterCode["RULE_BROKEN_LINKS"] = "rule-broken-links";
    ImplementationGuideGuideParameterCode["GENERATE_XML"] = "generate-xml";
    ImplementationGuideGuideParameterCode["GENERATE_JSON"] = "generate-json";
    ImplementationGuideGuideParameterCode["GENERATE_TURTLE"] = "generate-turtle";
    ImplementationGuideGuideParameterCode["HTML_TEMPLATE"] = "html-template";
  })(exports.ImplementationGuideGuideParameterCode || (exports.ImplementationGuideGuideParameterCode = {}));
  (function(InsurancePlanPublicationStatus) {
    InsurancePlanPublicationStatus["DRAFT"] = "draft";
    InsurancePlanPublicationStatus["ACTIVE"] = "active";
    InsurancePlanPublicationStatus["RETIRED"] = "retired";
    InsurancePlanPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.InsurancePlanPublicationStatus || (exports.InsurancePlanPublicationStatus = {}));
  (function(InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["ISSUED"] = "issued";
    InvoiceStatus["BALANCED"] = "balanced";
    InvoiceStatus["CANCELLED"] = "cancelled";
    InvoiceStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.InvoiceStatus || (exports.InvoiceStatus = {}));
  (function(InvoicePriceComponentType) {
    InvoicePriceComponentType["BASE"] = "base";
    InvoicePriceComponentType["SURCHARGE"] = "surcharge";
    InvoicePriceComponentType["DEDUCTION"] = "deduction";
    InvoicePriceComponentType["DISCOUNT"] = "discount";
    InvoicePriceComponentType["TAX"] = "tax";
    InvoicePriceComponentType["INFORMATIONAL"] = "informational";
  })(exports.InvoicePriceComponentType || (exports.InvoicePriceComponentType = {}));
  (function(LibraryPublicationStatus) {
    LibraryPublicationStatus["DRAFT"] = "draft";
    LibraryPublicationStatus["ACTIVE"] = "active";
    LibraryPublicationStatus["RETIRED"] = "retired";
    LibraryPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.LibraryPublicationStatus || (exports.LibraryPublicationStatus = {}));
  (function(LinkageType) {
    LinkageType["SOURCE"] = "source";
    LinkageType["ALTERNATE"] = "alternate";
    LinkageType["HISTORICAL"] = "historical";
  })(exports.LinkageType || (exports.LinkageType = {}));
  (function(ListStatus) {
    ListStatus["CURRENT"] = "current";
    ListStatus["RETIRED"] = "retired";
    ListStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.ListStatus || (exports.ListStatus = {}));
  (function(ListMode) {
    ListMode["WORKING"] = "working";
    ListMode["SNAPSHOT"] = "snapshot";
    ListMode["CHANGES"] = "changes";
  })(exports.ListMode || (exports.ListMode = {}));
  (function(LocationStatus) {
    LocationStatus["ACTIVE"] = "active";
    LocationStatus["SUSPENDED"] = "suspended";
    LocationStatus["INACTIVE"] = "inactive";
  })(exports.LocationStatus || (exports.LocationStatus = {}));
  (function(LocationMode) {
    LocationMode["INSTANCE"] = "instance";
    LocationMode["KIND"] = "kind";
  })(exports.LocationMode || (exports.LocationMode = {}));
  (function(LocationDaysOfWeek) {
    LocationDaysOfWeek["MON"] = "mon";
    LocationDaysOfWeek["TUE"] = "tue";
    LocationDaysOfWeek["WED"] = "wed";
    LocationDaysOfWeek["THU"] = "thu";
    LocationDaysOfWeek["FRI"] = "fri";
    LocationDaysOfWeek["SAT"] = "sat";
    LocationDaysOfWeek["SUN"] = "sun";
  })(exports.LocationDaysOfWeek || (exports.LocationDaysOfWeek = {}));
  (function(MeasurePublicationStatus) {
    MeasurePublicationStatus["DRAFT"] = "draft";
    MeasurePublicationStatus["ACTIVE"] = "active";
    MeasurePublicationStatus["RETIRED"] = "retired";
    MeasurePublicationStatus["UNKNOWN"] = "unknown";
  })(exports.MeasurePublicationStatus || (exports.MeasurePublicationStatus = {}));
  (function(MeasureReportStatus) {
    MeasureReportStatus["COMPLETE"] = "complete";
    MeasureReportStatus["PENDING"] = "pending";
    MeasureReportStatus["ERROR"] = "error";
  })(exports.MeasureReportStatus || (exports.MeasureReportStatus = {}));
  (function(MeasureReportType) {
    MeasureReportType["INDIVIDUAL"] = "individual";
    MeasureReportType["SUBJECT_LIST"] = "subject-list";
    MeasureReportType["SUMMARY"] = "summary";
    MeasureReportType["DATA_COLLECTION"] = "data-collection";
  })(exports.MeasureReportType || (exports.MeasureReportType = {}));
  (function(MediaStatus) {
    MediaStatus["PREPARATION"] = "preparation";
    MediaStatus["IN_PROGRESS"] = "in-progress";
    MediaStatus["NOT_DONE"] = "not-done";
    MediaStatus["ON_HOLD"] = "on-hold";
    MediaStatus["STOPPED"] = "stopped";
    MediaStatus["COMPLETED"] = "completed";
    MediaStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    MediaStatus["UNKNOWN"] = "unknown";
  })(exports.MediaStatus || (exports.MediaStatus = {}));
  (function(MedicationStatus) {
    MedicationStatus["ACTIVE"] = "active";
    MedicationStatus["INACTIVE"] = "inactive";
    MedicationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.MedicationStatus || (exports.MedicationStatus = {}));
  (function(MedicationAdministrationStatus) {
    MedicationAdministrationStatus["IN_PROGRESS"] = "in-progress";
    MedicationAdministrationStatus["NOT_DONE"] = "not-done";
    MedicationAdministrationStatus["ON_HOLD"] = "on-hold";
    MedicationAdministrationStatus["COMPLETED"] = "completed";
    MedicationAdministrationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    MedicationAdministrationStatus["STOPPED"] = "stopped";
    MedicationAdministrationStatus["UNKNOWN"] = "unknown";
  })(exports.MedicationAdministrationStatus || (exports.MedicationAdministrationStatus = {}));
  (function(MedicationDispenseStatus) {
    MedicationDispenseStatus["PREPARATION"] = "preparation";
    MedicationDispenseStatus["IN_PROGRESS"] = "in-progress";
    MedicationDispenseStatus["CANCELLED"] = "cancelled";
    MedicationDispenseStatus["ON_HOLD"] = "on-hold";
    MedicationDispenseStatus["COMPLETED"] = "completed";
    MedicationDispenseStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    MedicationDispenseStatus["STOPPED"] = "stopped";
    MedicationDispenseStatus["DECLINED"] = "declined";
    MedicationDispenseStatus["UNKNOWN"] = "unknown";
  })(exports.MedicationDispenseStatus || (exports.MedicationDispenseStatus = {}));
  (function(MedicationKnowledgeStatus) {
    MedicationKnowledgeStatus["ACTIVE"] = "active";
    MedicationKnowledgeStatus["INACTIVE"] = "inactive";
    MedicationKnowledgeStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.MedicationKnowledgeStatus || (exports.MedicationKnowledgeStatus = {}));
  (function(MedicationRequestStatus) {
    MedicationRequestStatus["ACTIVE"] = "active";
    MedicationRequestStatus["ON_HOLD"] = "on-hold";
    MedicationRequestStatus["CANCELLED"] = "cancelled";
    MedicationRequestStatus["COMPLETED"] = "completed";
    MedicationRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    MedicationRequestStatus["STOPPED"] = "stopped";
    MedicationRequestStatus["DRAFT"] = "draft";
    MedicationRequestStatus["UNKNOWN"] = "unknown";
  })(exports.MedicationRequestStatus || (exports.MedicationRequestStatus = {}));
  (function(MedicationRequestIntent) {
    MedicationRequestIntent["PROPOSAL"] = "proposal";
    MedicationRequestIntent["PLAN"] = "plan";
    MedicationRequestIntent["ORDER"] = "order";
    MedicationRequestIntent["ORIGINAL_ORDER"] = "original-order";
    MedicationRequestIntent["REFLEX_ORDER"] = "reflex-order";
    MedicationRequestIntent["FILLER_ORDER"] = "filler-order";
    MedicationRequestIntent["INSTANCE_ORDER"] = "instance-order";
    MedicationRequestIntent["OPTION"] = "option";
  })(exports.MedicationRequestIntent || (exports.MedicationRequestIntent = {}));
  (function(MedicationRequestPriority) {
    MedicationRequestPriority["ROUTINE"] = "routine";
    MedicationRequestPriority["URGENT"] = "urgent";
    MedicationRequestPriority["ASAP"] = "asap";
    MedicationRequestPriority["STAT"] = "stat";
  })(exports.MedicationRequestPriority || (exports.MedicationRequestPriority = {}));
  (function(MedicationStatementStatus) {
    MedicationStatementStatus["ACTIVE"] = "active";
    MedicationStatementStatus["COMPLETED"] = "completed";
    MedicationStatementStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    MedicationStatementStatus["INTENDED"] = "intended";
    MedicationStatementStatus["STOPPED"] = "stopped";
    MedicationStatementStatus["ON_HOLD"] = "on-hold";
    MedicationStatementStatus["UNKNOWN"] = "unknown";
    MedicationStatementStatus["NOT_TAKEN"] = "not-taken";
  })(exports.MedicationStatementStatus || (exports.MedicationStatementStatus = {}));
  (function(MessageDefinitionPublicationStatus) {
    MessageDefinitionPublicationStatus["DRAFT"] = "draft";
    MessageDefinitionPublicationStatus["ACTIVE"] = "active";
    MessageDefinitionPublicationStatus["RETIRED"] = "retired";
    MessageDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.MessageDefinitionPublicationStatus || (exports.MessageDefinitionPublicationStatus = {}));
  (function(MessageDefinitionMessageSignificanceCategory) {
    MessageDefinitionMessageSignificanceCategory["CONSEQUENCE"] = "consequence";
    MessageDefinitionMessageSignificanceCategory["CURRENCY"] = "currency";
    MessageDefinitionMessageSignificanceCategory["NOTIFICATION"] = "notification";
  })(exports.MessageDefinitionMessageSignificanceCategory || (exports.MessageDefinitionMessageSignificanceCategory = {}));
  (function(MessageDefinitionmessageheader_response_request) {
    MessageDefinitionmessageheader_response_request["ALWAYS"] = "always";
    MessageDefinitionmessageheader_response_request["ON_ERROR"] = "on-error";
    MessageDefinitionmessageheader_response_request["NEVER"] = "never";
    MessageDefinitionmessageheader_response_request["ON_SUCCESS"] = "on-success";
  })(exports.MessageDefinitionmessageheader_response_request || (exports.MessageDefinitionmessageheader_response_request = {}));
  (function(MessageHeaderResponseType) {
    MessageHeaderResponseType["OK"] = "ok";
    MessageHeaderResponseType["TRANSIENT_ERROR"] = "transient-error";
    MessageHeaderResponseType["FATAL_ERROR"] = "fatal-error";
  })(exports.MessageHeaderResponseType || (exports.MessageHeaderResponseType = {}));
  (function(MolecularSequencesequenceType) {
    MolecularSequencesequenceType["AA"] = "aa";
    MolecularSequencesequenceType["DNA"] = "dna";
    MolecularSequencesequenceType["RNA"] = "rna";
  })(exports.MolecularSequencesequenceType || (exports.MolecularSequencesequenceType = {}));
  (function(MolecularSequenceorientationType) {
    MolecularSequenceorientationType["SENSE"] = "sense";
    MolecularSequenceorientationType["ANTISENSE"] = "antisense";
  })(exports.MolecularSequenceorientationType || (exports.MolecularSequenceorientationType = {}));
  (function(MolecularSequencestrandType) {
    MolecularSequencestrandType["WATSON"] = "watson";
    MolecularSequencestrandType["CRICK"] = "crick";
  })(exports.MolecularSequencestrandType || (exports.MolecularSequencestrandType = {}));
  (function(MolecularSequencequalityType) {
    MolecularSequencequalityType["INDEL"] = "indel";
    MolecularSequencequalityType["SNP"] = "snp";
    MolecularSequencequalityType["UNKNOWN"] = "unknown";
  })(exports.MolecularSequencequalityType || (exports.MolecularSequencequalityType = {}));
  (function(MolecularSequencerepositoryType) {
    MolecularSequencerepositoryType["DIRECTLINK"] = "directlink";
    MolecularSequencerepositoryType["OPENAPI"] = "openapi";
    MolecularSequencerepositoryType["LOGIN"] = "login";
    MolecularSequencerepositoryType["OAUTH"] = "oauth";
    MolecularSequencerepositoryType["OTHER"] = "other";
  })(exports.MolecularSequencerepositoryType || (exports.MolecularSequencerepositoryType = {}));
  (function(NamingSystemPublicationStatus) {
    NamingSystemPublicationStatus["DRAFT"] = "draft";
    NamingSystemPublicationStatus["ACTIVE"] = "active";
    NamingSystemPublicationStatus["RETIRED"] = "retired";
    NamingSystemPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.NamingSystemPublicationStatus || (exports.NamingSystemPublicationStatus = {}));
  (function(NamingSystemType) {
    NamingSystemType["CODESYSTEM"] = "codesystem";
    NamingSystemType["IDENTIFIER"] = "identifier";
    NamingSystemType["ROOT"] = "root";
  })(exports.NamingSystemType || (exports.NamingSystemType = {}));
  (function(NamingSystemIdentifierType) {
    NamingSystemIdentifierType["OID"] = "oid";
    NamingSystemIdentifierType["UUID"] = "uuid";
    NamingSystemIdentifierType["URI"] = "uri";
    NamingSystemIdentifierType["OTHER"] = "other";
  })(exports.NamingSystemIdentifierType || (exports.NamingSystemIdentifierType = {}));
  (function(NutritionOrderStatus) {
    NutritionOrderStatus["DRAFT"] = "draft";
    NutritionOrderStatus["ACTIVE"] = "active";
    NutritionOrderStatus["ON_HOLD"] = "on-hold";
    NutritionOrderStatus["REVOKED"] = "revoked";
    NutritionOrderStatus["COMPLETED"] = "completed";
    NutritionOrderStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    NutritionOrderStatus["UNKNOWN"] = "unknown";
  })(exports.NutritionOrderStatus || (exports.NutritionOrderStatus = {}));
  (function(NutritionOrderNutritiionOrderIntent) {
    NutritionOrderNutritiionOrderIntent["PROPOSAL"] = "proposal";
    NutritionOrderNutritiionOrderIntent["PLAN"] = "plan";
    NutritionOrderNutritiionOrderIntent["DIRECTIVE"] = "directive";
    NutritionOrderNutritiionOrderIntent["ORDER"] = "order";
    NutritionOrderNutritiionOrderIntent["ORIGINAL_ORDER"] = "original-order";
    NutritionOrderNutritiionOrderIntent["REFLEX_ORDER"] = "reflex-order";
    NutritionOrderNutritiionOrderIntent["FILLER_ORDER"] = "filler-order";
    NutritionOrderNutritiionOrderIntent["INSTANCE_ORDER"] = "instance-order";
    NutritionOrderNutritiionOrderIntent["OPTION"] = "option";
  })(exports.NutritionOrderNutritiionOrderIntent || (exports.NutritionOrderNutritiionOrderIntent = {}));
  (function(ObservationDefinitionObservationDataType) {
    ObservationDefinitionObservationDataType["QUANTITY"] = "Quantity";
    ObservationDefinitionObservationDataType["CODEABLECONCEPT"] = "CodeableConcept";
    ObservationDefinitionObservationDataType["STRING"] = "string";
    ObservationDefinitionObservationDataType["BOOLEAN"] = "boolean";
    ObservationDefinitionObservationDataType["INTEGER"] = "integer";
    ObservationDefinitionObservationDataType["RANGE"] = "Range";
    ObservationDefinitionObservationDataType["RATIO"] = "Ratio";
    ObservationDefinitionObservationDataType["SAMPLEDDATA"] = "SampledData";
    ObservationDefinitionObservationDataType["TIME"] = "time";
    ObservationDefinitionObservationDataType["DATETIME"] = "dateTime";
    ObservationDefinitionObservationDataType["PERIOD"] = "Period";
  })(exports.ObservationDefinitionObservationDataType || (exports.ObservationDefinitionObservationDataType = {}));
  (function(ObservationDefinitionObservationRangeCategory) {
    ObservationDefinitionObservationRangeCategory["REFERENCE"] = "reference";
    ObservationDefinitionObservationRangeCategory["CRITICAL"] = "critical";
    ObservationDefinitionObservationRangeCategory["ABSOLUTE"] = "absolute";
  })(exports.ObservationDefinitionObservationRangeCategory || (exports.ObservationDefinitionObservationRangeCategory = {}));
  (function(ObservationDefinitionAdministrativeGender) {
    ObservationDefinitionAdministrativeGender["MALE"] = "male";
    ObservationDefinitionAdministrativeGender["FEMALE"] = "female";
    ObservationDefinitionAdministrativeGender["OTHER"] = "other";
    ObservationDefinitionAdministrativeGender["UNKNOWN"] = "unknown";
  })(exports.ObservationDefinitionAdministrativeGender || (exports.ObservationDefinitionAdministrativeGender = {}));
  (function(OperationDefinitionPublicationStatus) {
    OperationDefinitionPublicationStatus["DRAFT"] = "draft";
    OperationDefinitionPublicationStatus["ACTIVE"] = "active";
    OperationDefinitionPublicationStatus["RETIRED"] = "retired";
    OperationDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.OperationDefinitionPublicationStatus || (exports.OperationDefinitionPublicationStatus = {}));
  (function(OperationDefinitionOperationKind) {
    OperationDefinitionOperationKind["OPERATION"] = "operation";
    OperationDefinitionOperationKind["QUERY"] = "query";
  })(exports.OperationDefinitionOperationKind || (exports.OperationDefinitionOperationKind = {}));
  (function(OperationDefinitionOperationParameterUse) {
    OperationDefinitionOperationParameterUse["IN"] = "in";
    OperationDefinitionOperationParameterUse["OUT"] = "out";
  })(exports.OperationDefinitionOperationParameterUse || (exports.OperationDefinitionOperationParameterUse = {}));
  (function(OperationDefinitionSearchParamType) {
    OperationDefinitionSearchParamType["NUMBER"] = "number";
    OperationDefinitionSearchParamType["DATE"] = "date";
    OperationDefinitionSearchParamType["STRING"] = "string";
    OperationDefinitionSearchParamType["TOKEN"] = "token";
    OperationDefinitionSearchParamType["REFERENCE"] = "reference";
    OperationDefinitionSearchParamType["COMPOSITE"] = "composite";
    OperationDefinitionSearchParamType["QUANTITY"] = "quantity";
    OperationDefinitionSearchParamType["URI"] = "uri";
    OperationDefinitionSearchParamType["SPECIAL"] = "special";
  })(exports.OperationDefinitionSearchParamType || (exports.OperationDefinitionSearchParamType = {}));
  (function(OperationDefinitionBindingStrength) {
    OperationDefinitionBindingStrength["REQUIRED"] = "required";
    OperationDefinitionBindingStrength["EXTENSIBLE"] = "extensible";
    OperationDefinitionBindingStrength["PREFERRED"] = "preferred";
    OperationDefinitionBindingStrength["EXAMPLE"] = "example";
  })(exports.OperationDefinitionBindingStrength || (exports.OperationDefinitionBindingStrength = {}));
  (function(OperationOutcomeIssueSeverity) {
    OperationOutcomeIssueSeverity["FATAL"] = "fatal";
    OperationOutcomeIssueSeverity["ERROR"] = "error";
    OperationOutcomeIssueSeverity["WARNING"] = "warning";
    OperationOutcomeIssueSeverity["INFORMATION"] = "information";
  })(exports.OperationOutcomeIssueSeverity || (exports.OperationOutcomeIssueSeverity = {}));
  (function(PatientAdministrativeGender) {
    PatientAdministrativeGender["MALE"] = "male";
    PatientAdministrativeGender["FEMALE"] = "female";
    PatientAdministrativeGender["OTHER"] = "other";
    PatientAdministrativeGender["UNKNOWN"] = "unknown";
  })(exports.PatientAdministrativeGender || (exports.PatientAdministrativeGender = {}));
  (function(PatientLinkType) {
    PatientLinkType["REPLACED_BY"] = "replaced-by";
    PatientLinkType["REPLACES"] = "replaces";
    PatientLinkType["REFER"] = "refer";
    PatientLinkType["SEEALSO"] = "seealso";
  })(exports.PatientLinkType || (exports.PatientLinkType = {}));
  (function(PaymentNoticeStatus) {
    PaymentNoticeStatus["ACTIVE"] = "active";
    PaymentNoticeStatus["CANCELLED"] = "cancelled";
    PaymentNoticeStatus["DRAFT"] = "draft";
    PaymentNoticeStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.PaymentNoticeStatus || (exports.PaymentNoticeStatus = {}));
  (function(PaymentReconciliationStatus) {
    PaymentReconciliationStatus["ACTIVE"] = "active";
    PaymentReconciliationStatus["CANCELLED"] = "cancelled";
    PaymentReconciliationStatus["DRAFT"] = "draft";
    PaymentReconciliationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.PaymentReconciliationStatus || (exports.PaymentReconciliationStatus = {}));
  (function(PaymentReconciliationRemittanceOutcome) {
    PaymentReconciliationRemittanceOutcome["QUEUED"] = "queued";
    PaymentReconciliationRemittanceOutcome["COMPLETE"] = "complete";
    PaymentReconciliationRemittanceOutcome["ERROR"] = "error";
    PaymentReconciliationRemittanceOutcome["PARTIAL"] = "partial";
  })(exports.PaymentReconciliationRemittanceOutcome || (exports.PaymentReconciliationRemittanceOutcome = {}));
  (function(PaymentReconciliationNoteType) {
    PaymentReconciliationNoteType["DISPLAY"] = "display";
    PaymentReconciliationNoteType["PRINT"] = "print";
    PaymentReconciliationNoteType["PRINTOPER"] = "printoper";
  })(exports.PaymentReconciliationNoteType || (exports.PaymentReconciliationNoteType = {}));
  (function(PersonAdministrativeGender) {
    PersonAdministrativeGender["MALE"] = "male";
    PersonAdministrativeGender["FEMALE"] = "female";
    PersonAdministrativeGender["OTHER"] = "other";
    PersonAdministrativeGender["UNKNOWN"] = "unknown";
  })(exports.PersonAdministrativeGender || (exports.PersonAdministrativeGender = {}));
  (function(PersonIdentityAssuranceLevel) {
    PersonIdentityAssuranceLevel["LEVEL1"] = "level1";
    PersonIdentityAssuranceLevel["LEVEL2"] = "level2";
    PersonIdentityAssuranceLevel["LEVEL3"] = "level3";
    PersonIdentityAssuranceLevel["LEVEL4"] = "level4";
  })(exports.PersonIdentityAssuranceLevel || (exports.PersonIdentityAssuranceLevel = {}));
  (function(PlanDefinitionPublicationStatus) {
    PlanDefinitionPublicationStatus["DRAFT"] = "draft";
    PlanDefinitionPublicationStatus["ACTIVE"] = "active";
    PlanDefinitionPublicationStatus["RETIRED"] = "retired";
    PlanDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.PlanDefinitionPublicationStatus || (exports.PlanDefinitionPublicationStatus = {}));
  (function(PlanDefinitionRequestPriority) {
    PlanDefinitionRequestPriority["ROUTINE"] = "routine";
    PlanDefinitionRequestPriority["URGENT"] = "urgent";
    PlanDefinitionRequestPriority["ASAP"] = "asap";
    PlanDefinitionRequestPriority["STAT"] = "stat";
  })(exports.PlanDefinitionRequestPriority || (exports.PlanDefinitionRequestPriority = {}));
  (function(PlanDefinitionActionConditionKind) {
    PlanDefinitionActionConditionKind["APPLICABILITY"] = "applicability";
    PlanDefinitionActionConditionKind["START"] = "start";
    PlanDefinitionActionConditionKind["STOP"] = "stop";
  })(exports.PlanDefinitionActionConditionKind || (exports.PlanDefinitionActionConditionKind = {}));
  (function(PlanDefinitionActionRelationshipType) {
    PlanDefinitionActionRelationshipType["BEFORE_START"] = "before-start";
    PlanDefinitionActionRelationshipType["BEFORE"] = "before";
    PlanDefinitionActionRelationshipType["BEFORE_END"] = "before-end";
    PlanDefinitionActionRelationshipType["CONCURRENT_WITH_START"] = "concurrent-with-start";
    PlanDefinitionActionRelationshipType["CONCURRENT"] = "concurrent";
    PlanDefinitionActionRelationshipType["CONCURRENT_WITH_END"] = "concurrent-with-end";
    PlanDefinitionActionRelationshipType["AFTER_START"] = "after-start";
    PlanDefinitionActionRelationshipType["AFTER"] = "after";
    PlanDefinitionActionRelationshipType["AFTER_END"] = "after-end";
  })(exports.PlanDefinitionActionRelationshipType || (exports.PlanDefinitionActionRelationshipType = {}));
  (function(PlanDefinitionActionParticipantType) {
    PlanDefinitionActionParticipantType["PATIENT"] = "patient";
    PlanDefinitionActionParticipantType["PRACTITIONER"] = "practitioner";
    PlanDefinitionActionParticipantType["RELATED_PERSON"] = "related-person";
    PlanDefinitionActionParticipantType["DEVICE"] = "device";
  })(exports.PlanDefinitionActionParticipantType || (exports.PlanDefinitionActionParticipantType = {}));
  (function(PlanDefinitionActionGroupingBehavior) {
    PlanDefinitionActionGroupingBehavior["VISUAL_GROUP"] = "visual-group";
    PlanDefinitionActionGroupingBehavior["LOGICAL_GROUP"] = "logical-group";
    PlanDefinitionActionGroupingBehavior["SENTENCE_GROUP"] = "sentence-group";
  })(exports.PlanDefinitionActionGroupingBehavior || (exports.PlanDefinitionActionGroupingBehavior = {}));
  (function(PlanDefinitionActionSelectionBehavior) {
    PlanDefinitionActionSelectionBehavior["ANY"] = "any";
    PlanDefinitionActionSelectionBehavior["ALL"] = "all";
    PlanDefinitionActionSelectionBehavior["ALL_OR_NONE"] = "all-or-none";
    PlanDefinitionActionSelectionBehavior["EXACTLY_ONE"] = "exactly-one";
    PlanDefinitionActionSelectionBehavior["AT_MOST_ONE"] = "at-most-one";
    PlanDefinitionActionSelectionBehavior["ONE_OR_MORE"] = "one-or-more";
  })(exports.PlanDefinitionActionSelectionBehavior || (exports.PlanDefinitionActionSelectionBehavior = {}));
  (function(PlanDefinitionActionRequiredBehavior) {
    PlanDefinitionActionRequiredBehavior["MUST"] = "must";
    PlanDefinitionActionRequiredBehavior["COULD"] = "could";
    PlanDefinitionActionRequiredBehavior["MUST_UNLESS_DOCUMENTED"] = "must-unless-documented";
  })(exports.PlanDefinitionActionRequiredBehavior || (exports.PlanDefinitionActionRequiredBehavior = {}));
  (function(PlanDefinitionActionPrecheckBehavior) {
    PlanDefinitionActionPrecheckBehavior["YES"] = "yes";
    PlanDefinitionActionPrecheckBehavior["NO"] = "no";
  })(exports.PlanDefinitionActionPrecheckBehavior || (exports.PlanDefinitionActionPrecheckBehavior = {}));
  (function(PlanDefinitionActionCardinalityBehavior) {
    PlanDefinitionActionCardinalityBehavior["SINGLE"] = "single";
    PlanDefinitionActionCardinalityBehavior["MULTIPLE"] = "multiple";
  })(exports.PlanDefinitionActionCardinalityBehavior || (exports.PlanDefinitionActionCardinalityBehavior = {}));
  (function(PractitionerAdministrativeGender) {
    PractitionerAdministrativeGender["MALE"] = "male";
    PractitionerAdministrativeGender["FEMALE"] = "female";
    PractitionerAdministrativeGender["OTHER"] = "other";
    PractitionerAdministrativeGender["UNKNOWN"] = "unknown";
  })(exports.PractitionerAdministrativeGender || (exports.PractitionerAdministrativeGender = {}));
  (function(PractitionerRoleDaysOfWeek) {
    PractitionerRoleDaysOfWeek["MON"] = "mon";
    PractitionerRoleDaysOfWeek["TUE"] = "tue";
    PractitionerRoleDaysOfWeek["WED"] = "wed";
    PractitionerRoleDaysOfWeek["THU"] = "thu";
    PractitionerRoleDaysOfWeek["FRI"] = "fri";
    PractitionerRoleDaysOfWeek["SAT"] = "sat";
    PractitionerRoleDaysOfWeek["SUN"] = "sun";
  })(exports.PractitionerRoleDaysOfWeek || (exports.PractitionerRoleDaysOfWeek = {}));
  (function(ProcedureStatus) {
    ProcedureStatus["PREPARATION"] = "preparation";
    ProcedureStatus["IN_PROGRESS"] = "in-progress";
    ProcedureStatus["NOT_DONE"] = "not-done";
    ProcedureStatus["ON_HOLD"] = "on-hold";
    ProcedureStatus["STOPPED"] = "stopped";
    ProcedureStatus["COMPLETED"] = "completed";
    ProcedureStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ProcedureStatus["UNKNOWN"] = "unknown";
  })(exports.ProcedureStatus || (exports.ProcedureStatus = {}));
  (function(ProvenanceEntityRole) {
    ProvenanceEntityRole["DERIVATION"] = "derivation";
    ProvenanceEntityRole["REVISION"] = "revision";
    ProvenanceEntityRole["QUOTATION"] = "quotation";
    ProvenanceEntityRole["SOURCE"] = "source";
    ProvenanceEntityRole["REMOVAL"] = "removal";
  })(exports.ProvenanceEntityRole || (exports.ProvenanceEntityRole = {}));
  (function(QuestionnairePublicationStatus) {
    QuestionnairePublicationStatus["DRAFT"] = "draft";
    QuestionnairePublicationStatus["ACTIVE"] = "active";
    QuestionnairePublicationStatus["RETIRED"] = "retired";
    QuestionnairePublicationStatus["UNKNOWN"] = "unknown";
  })(exports.QuestionnairePublicationStatus || (exports.QuestionnairePublicationStatus = {}));
  (function(QuestionnaireItemOperator) {
    QuestionnaireItemOperator["EXISTS"] = "exists";
    QuestionnaireItemOperator["E"] = "=";
    QuestionnaireItemOperator["NE"] = "!=";
    QuestionnaireItemOperator["GT"] = ">";
    QuestionnaireItemOperator["LT"] = "<";
    QuestionnaireItemOperator["GE"] = ">=";
    QuestionnaireItemOperator["LE"] = "<=";
  })(exports.QuestionnaireItemOperator || (exports.QuestionnaireItemOperator = {}));
  (function(QuestionnaireEnableWhenBehavior) {
    QuestionnaireEnableWhenBehavior["ALL"] = "all";
    QuestionnaireEnableWhenBehavior["ANY"] = "any";
  })(exports.QuestionnaireEnableWhenBehavior || (exports.QuestionnaireEnableWhenBehavior = {}));
  (function(QuestionnaireResponseStatus) {
    QuestionnaireResponseStatus["IN_PROGRESS"] = "in-progress";
    QuestionnaireResponseStatus["COMPLETED"] = "completed";
    QuestionnaireResponseStatus["AMENDED"] = "amended";
    QuestionnaireResponseStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    QuestionnaireResponseStatus["STOPPED"] = "stopped";
  })(exports.QuestionnaireResponseStatus || (exports.QuestionnaireResponseStatus = {}));
  (function(RelatedPersonAdministrativeGender) {
    RelatedPersonAdministrativeGender["MALE"] = "male";
    RelatedPersonAdministrativeGender["FEMALE"] = "female";
    RelatedPersonAdministrativeGender["OTHER"] = "other";
    RelatedPersonAdministrativeGender["UNKNOWN"] = "unknown";
  })(exports.RelatedPersonAdministrativeGender || (exports.RelatedPersonAdministrativeGender = {}));
  (function(RequestGroupRequestStatus) {
    RequestGroupRequestStatus["DRAFT"] = "draft";
    RequestGroupRequestStatus["ACTIVE"] = "active";
    RequestGroupRequestStatus["ON_HOLD"] = "on-hold";
    RequestGroupRequestStatus["REVOKED"] = "revoked";
    RequestGroupRequestStatus["COMPLETED"] = "completed";
    RequestGroupRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    RequestGroupRequestStatus["UNKNOWN"] = "unknown";
  })(exports.RequestGroupRequestStatus || (exports.RequestGroupRequestStatus = {}));
  (function(RequestGroupRequestIntent) {
    RequestGroupRequestIntent["PROPOSAL"] = "proposal";
    RequestGroupRequestIntent["PLAN"] = "plan";
    RequestGroupRequestIntent["DIRECTIVE"] = "directive";
    RequestGroupRequestIntent["ORDER"] = "order";
    RequestGroupRequestIntent["ORIGINAL_ORDER"] = "original-order";
    RequestGroupRequestIntent["REFLEX_ORDER"] = "reflex-order";
    RequestGroupRequestIntent["FILLER_ORDER"] = "filler-order";
    RequestGroupRequestIntent["INSTANCE_ORDER"] = "instance-order";
    RequestGroupRequestIntent["OPTION"] = "option";
  })(exports.RequestGroupRequestIntent || (exports.RequestGroupRequestIntent = {}));
  (function(RequestGroupRequestPriority) {
    RequestGroupRequestPriority["ROUTINE"] = "routine";
    RequestGroupRequestPriority["URGENT"] = "urgent";
    RequestGroupRequestPriority["ASAP"] = "asap";
    RequestGroupRequestPriority["STAT"] = "stat";
  })(exports.RequestGroupRequestPriority || (exports.RequestGroupRequestPriority = {}));
  (function(RequestGroupActionConditionKind) {
    RequestGroupActionConditionKind["APPLICABILITY"] = "applicability";
    RequestGroupActionConditionKind["START"] = "start";
    RequestGroupActionConditionKind["STOP"] = "stop";
  })(exports.RequestGroupActionConditionKind || (exports.RequestGroupActionConditionKind = {}));
  (function(RequestGroupActionRelationshipType) {
    RequestGroupActionRelationshipType["BEFORE_START"] = "before-start";
    RequestGroupActionRelationshipType["BEFORE"] = "before";
    RequestGroupActionRelationshipType["BEFORE_END"] = "before-end";
    RequestGroupActionRelationshipType["CONCURRENT_WITH_START"] = "concurrent-with-start";
    RequestGroupActionRelationshipType["CONCURRENT"] = "concurrent";
    RequestGroupActionRelationshipType["CONCURRENT_WITH_END"] = "concurrent-with-end";
    RequestGroupActionRelationshipType["AFTER_START"] = "after-start";
    RequestGroupActionRelationshipType["AFTER"] = "after";
    RequestGroupActionRelationshipType["AFTER_END"] = "after-end";
  })(exports.RequestGroupActionRelationshipType || (exports.RequestGroupActionRelationshipType = {}));
  (function(RequestGroupActionGroupingBehavior) {
    RequestGroupActionGroupingBehavior["VISUAL_GROUP"] = "visual-group";
    RequestGroupActionGroupingBehavior["LOGICAL_GROUP"] = "logical-group";
    RequestGroupActionGroupingBehavior["SENTENCE_GROUP"] = "sentence-group";
  })(exports.RequestGroupActionGroupingBehavior || (exports.RequestGroupActionGroupingBehavior = {}));
  (function(RequestGroupActionSelectionBehavior) {
    RequestGroupActionSelectionBehavior["ANY"] = "any";
    RequestGroupActionSelectionBehavior["ALL"] = "all";
    RequestGroupActionSelectionBehavior["ALL_OR_NONE"] = "all-or-none";
    RequestGroupActionSelectionBehavior["EXACTLY_ONE"] = "exactly-one";
    RequestGroupActionSelectionBehavior["AT_MOST_ONE"] = "at-most-one";
    RequestGroupActionSelectionBehavior["ONE_OR_MORE"] = "one-or-more";
  })(exports.RequestGroupActionSelectionBehavior || (exports.RequestGroupActionSelectionBehavior = {}));
  (function(RequestGroupActionRequiredBehavior) {
    RequestGroupActionRequiredBehavior["MUST"] = "must";
    RequestGroupActionRequiredBehavior["COULD"] = "could";
    RequestGroupActionRequiredBehavior["MUST_UNLESS_DOCUMENTED"] = "must-unless-documented";
  })(exports.RequestGroupActionRequiredBehavior || (exports.RequestGroupActionRequiredBehavior = {}));
  (function(RequestGroupActionPrecheckBehavior) {
    RequestGroupActionPrecheckBehavior["YES"] = "yes";
    RequestGroupActionPrecheckBehavior["NO"] = "no";
  })(exports.RequestGroupActionPrecheckBehavior || (exports.RequestGroupActionPrecheckBehavior = {}));
  (function(RequestGroupActionCardinalityBehavior) {
    RequestGroupActionCardinalityBehavior["SINGLE"] = "single";
    RequestGroupActionCardinalityBehavior["MULTIPLE"] = "multiple";
  })(exports.RequestGroupActionCardinalityBehavior || (exports.RequestGroupActionCardinalityBehavior = {}));
  (function(ResearchDefinitionPublicationStatus) {
    ResearchDefinitionPublicationStatus["DRAFT"] = "draft";
    ResearchDefinitionPublicationStatus["ACTIVE"] = "active";
    ResearchDefinitionPublicationStatus["RETIRED"] = "retired";
    ResearchDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ResearchDefinitionPublicationStatus || (exports.ResearchDefinitionPublicationStatus = {}));
  (function(ResearchElementDefinitionPublicationStatus) {
    ResearchElementDefinitionPublicationStatus["DRAFT"] = "draft";
    ResearchElementDefinitionPublicationStatus["ACTIVE"] = "active";
    ResearchElementDefinitionPublicationStatus["RETIRED"] = "retired";
    ResearchElementDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ResearchElementDefinitionPublicationStatus || (exports.ResearchElementDefinitionPublicationStatus = {}));
  (function(ResearchElementDefinitionResearchElementType) {
    ResearchElementDefinitionResearchElementType["POPULATION"] = "population";
    ResearchElementDefinitionResearchElementType["EXPOSURE"] = "exposure";
    ResearchElementDefinitionResearchElementType["OUTCOME"] = "outcome";
  })(exports.ResearchElementDefinitionResearchElementType || (exports.ResearchElementDefinitionResearchElementType = {}));
  (function(ResearchElementDefinitionVariableType) {
    ResearchElementDefinitionVariableType["DICHOTOMOUS"] = "dichotomous";
    ResearchElementDefinitionVariableType["CONTINUOUS"] = "continuous";
    ResearchElementDefinitionVariableType["DESCRIPTIVE"] = "descriptive";
  })(exports.ResearchElementDefinitionVariableType || (exports.ResearchElementDefinitionVariableType = {}));
  (function(ResearchElementDefinitionGroupMeasure) {
    ResearchElementDefinitionGroupMeasure["MEAN"] = "mean";
    ResearchElementDefinitionGroupMeasure["MEDIAN"] = "median";
    ResearchElementDefinitionGroupMeasure["MEAN_OF_MEAN"] = "mean-of-mean";
    ResearchElementDefinitionGroupMeasure["MEAN_OF_MEDIAN"] = "mean-of-median";
    ResearchElementDefinitionGroupMeasure["MEDIAN_OF_MEAN"] = "median-of-mean";
    ResearchElementDefinitionGroupMeasure["MEDIAN_OF_MEDIAN"] = "median-of-median";
  })(exports.ResearchElementDefinitionGroupMeasure || (exports.ResearchElementDefinitionGroupMeasure = {}));
  (function(ResearchStudyStatus) {
    ResearchStudyStatus["ACTIVE"] = "active";
    ResearchStudyStatus["ADMINISTRATIVELY_COMPLETED"] = "administratively-completed";
    ResearchStudyStatus["APPROVED"] = "approved";
    ResearchStudyStatus["CLOSED_TO_ACCRUAL"] = "closed-to-accrual";
    ResearchStudyStatus["CLOSED_TO_ACCRUAL_AND_INTERVENTION"] = "closed-to-accrual-and-intervention";
    ResearchStudyStatus["COMPLETED"] = "completed";
    ResearchStudyStatus["DISAPPROVED"] = "disapproved";
    ResearchStudyStatus["IN_REVIEW"] = "in-review";
    ResearchStudyStatus["TEMPORARILY_CLOSED_TO_ACCRUAL"] = "temporarily-closed-to-accrual";
    ResearchStudyStatus["TEMPORARILY_CLOSED_TO_ACCRUAL_AND_INTERVENTION"] = "temporarily-closed-to-accrual-and-intervention";
    ResearchStudyStatus["WITHDRAWN"] = "withdrawn";
  })(exports.ResearchStudyStatus || (exports.ResearchStudyStatus = {}));
  (function(ResearchSubjectStatus) {
    ResearchSubjectStatus["CANDIDATE"] = "candidate";
    ResearchSubjectStatus["ELIGIBLE"] = "eligible";
    ResearchSubjectStatus["FOLLOW_UP"] = "follow-up";
    ResearchSubjectStatus["INELIGIBLE"] = "ineligible";
    ResearchSubjectStatus["NOT_REGISTERED"] = "not-registered";
    ResearchSubjectStatus["OFF_STUDY"] = "off-study";
    ResearchSubjectStatus["ON_STUDY"] = "on-study";
    ResearchSubjectStatus["ON_STUDY_INTERVENTION"] = "on-study-intervention";
    ResearchSubjectStatus["ON_STUDY_OBSERVATION"] = "on-study-observation";
    ResearchSubjectStatus["PENDING_ON_STUDY"] = "pending-on-study";
    ResearchSubjectStatus["POTENTIAL_CANDIDATE"] = "potential-candidate";
    ResearchSubjectStatus["SCREENING"] = "screening";
    ResearchSubjectStatus["WITHDRAWN"] = "withdrawn";
  })(exports.ResearchSubjectStatus || (exports.ResearchSubjectStatus = {}));
  (function(RiskEvidenceSynthesisPublicationStatus) {
    RiskEvidenceSynthesisPublicationStatus["DRAFT"] = "draft";
    RiskEvidenceSynthesisPublicationStatus["ACTIVE"] = "active";
    RiskEvidenceSynthesisPublicationStatus["RETIRED"] = "retired";
    RiskEvidenceSynthesisPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.RiskEvidenceSynthesisPublicationStatus || (exports.RiskEvidenceSynthesisPublicationStatus = {}));
  (function(SearchParameterPublicationStatus) {
    SearchParameterPublicationStatus["DRAFT"] = "draft";
    SearchParameterPublicationStatus["ACTIVE"] = "active";
    SearchParameterPublicationStatus["RETIRED"] = "retired";
    SearchParameterPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.SearchParameterPublicationStatus || (exports.SearchParameterPublicationStatus = {}));
  (function(SearchParameterSearchParamType) {
    SearchParameterSearchParamType["NUMBER"] = "number";
    SearchParameterSearchParamType["DATE"] = "date";
    SearchParameterSearchParamType["STRING"] = "string";
    SearchParameterSearchParamType["TOKEN"] = "token";
    SearchParameterSearchParamType["REFERENCE"] = "reference";
    SearchParameterSearchParamType["COMPOSITE"] = "composite";
    SearchParameterSearchParamType["QUANTITY"] = "quantity";
    SearchParameterSearchParamType["URI"] = "uri";
    SearchParameterSearchParamType["SPECIAL"] = "special";
  })(exports.SearchParameterSearchParamType || (exports.SearchParameterSearchParamType = {}));
  (function(SearchParameterXPathUsageType) {
    SearchParameterXPathUsageType["NORMAL"] = "normal";
    SearchParameterXPathUsageType["PHONETIC"] = "phonetic";
    SearchParameterXPathUsageType["NEARBY"] = "nearby";
    SearchParameterXPathUsageType["DISTANCE"] = "distance";
    SearchParameterXPathUsageType["OTHER"] = "other";
  })(exports.SearchParameterXPathUsageType || (exports.SearchParameterXPathUsageType = {}));
  (function(SearchParameterSearchComparator) {
    SearchParameterSearchComparator["EQ"] = "eq";
    SearchParameterSearchComparator["NE"] = "ne";
    SearchParameterSearchComparator["GT"] = "gt";
    SearchParameterSearchComparator["LT"] = "lt";
    SearchParameterSearchComparator["GE"] = "ge";
    SearchParameterSearchComparator["LE"] = "le";
    SearchParameterSearchComparator["SA"] = "sa";
    SearchParameterSearchComparator["EB"] = "eb";
    SearchParameterSearchComparator["AP"] = "ap";
  })(exports.SearchParameterSearchComparator || (exports.SearchParameterSearchComparator = {}));
  (function(SearchParameterSearchModifierCode) {
    SearchParameterSearchModifierCode["MISSING"] = "missing";
    SearchParameterSearchModifierCode["EXACT"] = "exact";
    SearchParameterSearchModifierCode["CONTAINS"] = "contains";
    SearchParameterSearchModifierCode["NOT"] = "not";
    SearchParameterSearchModifierCode["TEXT"] = "text";
    SearchParameterSearchModifierCode["IN"] = "in";
    SearchParameterSearchModifierCode["NOT_IN"] = "not-in";
    SearchParameterSearchModifierCode["BELOW"] = "below";
    SearchParameterSearchModifierCode["ABOVE"] = "above";
    SearchParameterSearchModifierCode["TYPE"] = "type";
    SearchParameterSearchModifierCode["IDENTIFIER"] = "identifier";
    SearchParameterSearchModifierCode["OFTYPE"] = "ofType";
  })(exports.SearchParameterSearchModifierCode || (exports.SearchParameterSearchModifierCode = {}));
  (function(ServiceRequestStatus) {
    ServiceRequestStatus["DRAFT"] = "draft";
    ServiceRequestStatus["ACTIVE"] = "active";
    ServiceRequestStatus["ON_HOLD"] = "on-hold";
    ServiceRequestStatus["REVOKED"] = "revoked";
    ServiceRequestStatus["COMPLETED"] = "completed";
    ServiceRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ServiceRequestStatus["UNKNOWN"] = "unknown";
  })(exports.ServiceRequestStatus || (exports.ServiceRequestStatus = {}));
  (function(ServiceRequestIntent) {
    ServiceRequestIntent["PROPOSAL"] = "proposal";
    ServiceRequestIntent["PLAN"] = "plan";
    ServiceRequestIntent["DIRECTIVE"] = "directive";
    ServiceRequestIntent["ORDER"] = "order";
    ServiceRequestIntent["ORIGINAL_ORDER"] = "original-order";
    ServiceRequestIntent["REFLEX_ORDER"] = "reflex-order";
    ServiceRequestIntent["FILLER_ORDER"] = "filler-order";
    ServiceRequestIntent["INSTANCE_ORDER"] = "instance-order";
    ServiceRequestIntent["OPTION"] = "option";
  })(exports.ServiceRequestIntent || (exports.ServiceRequestIntent = {}));
  (function(ServiceRequestPriority) {
    ServiceRequestPriority["ROUTINE"] = "routine";
    ServiceRequestPriority["URGENT"] = "urgent";
    ServiceRequestPriority["ASAP"] = "asap";
    ServiceRequestPriority["STAT"] = "stat";
  })(exports.ServiceRequestPriority || (exports.ServiceRequestPriority = {}));
  (function(SlotStatus) {
    SlotStatus["BUSY"] = "busy";
    SlotStatus["FREE"] = "free";
    SlotStatus["BUSY_UNAVAILABLE"] = "busy-unavailable";
    SlotStatus["BUSY_TENTATIVE"] = "busy-tentative";
    SlotStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.SlotStatus || (exports.SlotStatus = {}));
  (function(SpecimenStatus) {
    SpecimenStatus["AVAILABLE"] = "available";
    SpecimenStatus["UNAVAILABLE"] = "unavailable";
    SpecimenStatus["UNSATISFACTORY"] = "unsatisfactory";
    SpecimenStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.SpecimenStatus || (exports.SpecimenStatus = {}));
  (function(SpecimenDefinitionSpecimenContainedPreference) {
    SpecimenDefinitionSpecimenContainedPreference["PREFERRED"] = "preferred";
    SpecimenDefinitionSpecimenContainedPreference["ALTERNATE"] = "alternate";
  })(exports.SpecimenDefinitionSpecimenContainedPreference || (exports.SpecimenDefinitionSpecimenContainedPreference = {}));
  (function(StructureDefinitionPublicationStatus) {
    StructureDefinitionPublicationStatus["DRAFT"] = "draft";
    StructureDefinitionPublicationStatus["ACTIVE"] = "active";
    StructureDefinitionPublicationStatus["RETIRED"] = "retired";
    StructureDefinitionPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.StructureDefinitionPublicationStatus || (exports.StructureDefinitionPublicationStatus = {}));
  (function(StructureDefinitionKind) {
    StructureDefinitionKind["PRIMITIVE_TYPE"] = "primitive-type";
    StructureDefinitionKind["COMPLEX_TYPE"] = "complex-type";
    StructureDefinitionKind["RESOURCE"] = "resource";
    StructureDefinitionKind["LOGICAL"] = "logical";
  })(exports.StructureDefinitionKind || (exports.StructureDefinitionKind = {}));
  (function(StructureDefinitionExtensionContextType) {
    StructureDefinitionExtensionContextType["FHIRPATH"] = "fhirpath";
    StructureDefinitionExtensionContextType["ELEMENT"] = "element";
    StructureDefinitionExtensionContextType["EXTENSION"] = "extension";
  })(exports.StructureDefinitionExtensionContextType || (exports.StructureDefinitionExtensionContextType = {}));
  (function(StructureDefinitionTypeDerivationRule) {
    StructureDefinitionTypeDerivationRule["SPECIALIZATION"] = "specialization";
    StructureDefinitionTypeDerivationRule["CONSTRAINT"] = "constraint";
  })(exports.StructureDefinitionTypeDerivationRule || (exports.StructureDefinitionTypeDerivationRule = {}));
  (function(StructureMapPublicationStatus) {
    StructureMapPublicationStatus["DRAFT"] = "draft";
    StructureMapPublicationStatus["ACTIVE"] = "active";
    StructureMapPublicationStatus["RETIRED"] = "retired";
    StructureMapPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.StructureMapPublicationStatus || (exports.StructureMapPublicationStatus = {}));
  (function(StructureMapModelMode) {
    StructureMapModelMode["SOURCE"] = "source";
    StructureMapModelMode["QUERIED"] = "queried";
    StructureMapModelMode["TARGET"] = "target";
    StructureMapModelMode["PRODUCED"] = "produced";
  })(exports.StructureMapModelMode || (exports.StructureMapModelMode = {}));
  (function(StructureMapGroupTypeMode) {
    StructureMapGroupTypeMode["NONE"] = "none";
    StructureMapGroupTypeMode["TYPES"] = "types";
    StructureMapGroupTypeMode["TYPE_AND_TYPES"] = "type-and-types";
  })(exports.StructureMapGroupTypeMode || (exports.StructureMapGroupTypeMode = {}));
  (function(StructureMapInputMode) {
    StructureMapInputMode["SOURCE"] = "source";
    StructureMapInputMode["TARGET"] = "target";
  })(exports.StructureMapInputMode || (exports.StructureMapInputMode = {}));
  (function(StructureMapSourceListMode) {
    StructureMapSourceListMode["FIRST"] = "first";
    StructureMapSourceListMode["NOT_FIRST"] = "not_first";
    StructureMapSourceListMode["LAST"] = "last";
    StructureMapSourceListMode["NOT_LAST"] = "not_last";
    StructureMapSourceListMode["ONLY_ONE"] = "only_one";
  })(exports.StructureMapSourceListMode || (exports.StructureMapSourceListMode = {}));
  (function(StructureMapContextType) {
    StructureMapContextType["TYPE"] = "type";
    StructureMapContextType["VARIABLE"] = "variable";
  })(exports.StructureMapContextType || (exports.StructureMapContextType = {}));
  (function(StructureMapTargetListMode) {
    StructureMapTargetListMode["FIRST"] = "first";
    StructureMapTargetListMode["SHARE"] = "share";
    StructureMapTargetListMode["LAST"] = "last";
    StructureMapTargetListMode["COLLATE"] = "collate";
  })(exports.StructureMapTargetListMode || (exports.StructureMapTargetListMode = {}));
  (function(SubscriptionStatus) {
    SubscriptionStatus["REQUESTED"] = "requested";
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["ERROR"] = "error";
    SubscriptionStatus["OFF"] = "off";
  })(exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
  (function(SubscriptionChannelType) {
    SubscriptionChannelType["REST_HOOK"] = "rest-hook";
    SubscriptionChannelType["WEBSOCKET"] = "websocket";
    SubscriptionChannelType["EMAIL"] = "email";
    SubscriptionChannelType["SMS"] = "sms";
    SubscriptionChannelType["MESSAGE"] = "message";
  })(exports.SubscriptionChannelType || (exports.SubscriptionChannelType = {}));
  (function(SubstanceFHIRSubstanceStatus) {
    SubstanceFHIRSubstanceStatus["ACTIVE"] = "active";
    SubstanceFHIRSubstanceStatus["INACTIVE"] = "inactive";
    SubstanceFHIRSubstanceStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.SubstanceFHIRSubstanceStatus || (exports.SubstanceFHIRSubstanceStatus = {}));
  (function(SupplyDeliveryStatus) {
    SupplyDeliveryStatus["IN_PROGRESS"] = "in-progress";
    SupplyDeliveryStatus["COMPLETED"] = "completed";
    SupplyDeliveryStatus["ABANDONED"] = "abandoned";
    SupplyDeliveryStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.SupplyDeliveryStatus || (exports.SupplyDeliveryStatus = {}));
  (function(SupplyRequestRequestPriority) {
    SupplyRequestRequestPriority["ROUTINE"] = "routine";
    SupplyRequestRequestPriority["URGENT"] = "urgent";
    SupplyRequestRequestPriority["ASAP"] = "asap";
    SupplyRequestRequestPriority["STAT"] = "stat";
  })(exports.SupplyRequestRequestPriority || (exports.SupplyRequestRequestPriority = {}));
  (function(TaskIntent) {
    TaskIntent["UNKNOWN"] = "unknown";
    TaskIntent["PROPOSAL"] = "proposal";
    TaskIntent["PLAN"] = "plan";
    TaskIntent["ORDER"] = "order";
    TaskIntent["ORIGINAL_ORDER"] = "original-order";
    TaskIntent["REFLEX_ORDER"] = "reflex-order";
    TaskIntent["FILLER_ORDER"] = "filler-order";
    TaskIntent["INSTANCE_ORDER"] = "instance-order";
    TaskIntent["OPTION"] = "option";
  })(exports.TaskIntent || (exports.TaskIntent = {}));
  (function(TaskPriority) {
    TaskPriority["ROUTINE"] = "routine";
    TaskPriority["URGENT"] = "urgent";
    TaskPriority["ASAP"] = "asap";
    TaskPriority["STAT"] = "stat";
  })(exports.TaskPriority || (exports.TaskPriority = {}));
  (function(TerminologyCapabilitiesPublicationStatus) {
    TerminologyCapabilitiesPublicationStatus["DRAFT"] = "draft";
    TerminologyCapabilitiesPublicationStatus["ACTIVE"] = "active";
    TerminologyCapabilitiesPublicationStatus["RETIRED"] = "retired";
    TerminologyCapabilitiesPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.TerminologyCapabilitiesPublicationStatus || (exports.TerminologyCapabilitiesPublicationStatus = {}));
  (function(TerminologyCapabilitiesCapabilityStatementKind) {
    TerminologyCapabilitiesCapabilityStatementKind["INSTANCE"] = "instance";
    TerminologyCapabilitiesCapabilityStatementKind["CAPABILITY"] = "capability";
    TerminologyCapabilitiesCapabilityStatementKind["REQUIREMENTS"] = "requirements";
  })(exports.TerminologyCapabilitiesCapabilityStatementKind || (exports.TerminologyCapabilitiesCapabilityStatementKind = {}));
  (function(TerminologyCapabilitiesCodeSearchSupport) {
    TerminologyCapabilitiesCodeSearchSupport["EXPLICIT"] = "explicit";
    TerminologyCapabilitiesCodeSearchSupport["ALL"] = "all";
  })(exports.TerminologyCapabilitiesCodeSearchSupport || (exports.TerminologyCapabilitiesCodeSearchSupport = {}));
  (function(TestReportStatus) {
    TestReportStatus["COMPLETED"] = "completed";
    TestReportStatus["IN_PROGRESS"] = "in-progress";
    TestReportStatus["WAITING"] = "waiting";
    TestReportStatus["STOPPED"] = "stopped";
    TestReportStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.TestReportStatus || (exports.TestReportStatus = {}));
  (function(TestReportResult) {
    TestReportResult["PASS"] = "pass";
    TestReportResult["FAIL"] = "fail";
    TestReportResult["PENDING"] = "pending";
  })(exports.TestReportResult || (exports.TestReportResult = {}));
  (function(TestReportParticipantType) {
    TestReportParticipantType["TEST_ENGINE"] = "test-engine";
    TestReportParticipantType["CLIENT"] = "client";
    TestReportParticipantType["SERVER"] = "server";
  })(exports.TestReportParticipantType || (exports.TestReportParticipantType = {}));
  (function(TestReportActionResult) {
    TestReportActionResult["PASS"] = "pass";
    TestReportActionResult["SKIP"] = "skip";
    TestReportActionResult["FAIL"] = "fail";
    TestReportActionResult["WARNING"] = "warning";
    TestReportActionResult["ERROR"] = "error";
  })(exports.TestReportActionResult || (exports.TestReportActionResult = {}));
  (function(TestScriptPublicationStatus) {
    TestScriptPublicationStatus["DRAFT"] = "draft";
    TestScriptPublicationStatus["ACTIVE"] = "active";
    TestScriptPublicationStatus["RETIRED"] = "retired";
    TestScriptPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.TestScriptPublicationStatus || (exports.TestScriptPublicationStatus = {}));
  (function(TestScriptRequestMethodCode) {
    TestScriptRequestMethodCode["DELETE"] = "delete";
    TestScriptRequestMethodCode["GET"] = "get";
    TestScriptRequestMethodCode["OPTIONS"] = "options";
    TestScriptRequestMethodCode["PATCH"] = "patch";
    TestScriptRequestMethodCode["POST"] = "post";
    TestScriptRequestMethodCode["PUT"] = "put";
    TestScriptRequestMethodCode["HEAD"] = "head";
  })(exports.TestScriptRequestMethodCode || (exports.TestScriptRequestMethodCode = {}));
  (function(TestScriptAssertionDirectionType) {
    TestScriptAssertionDirectionType["RESPONSE"] = "response";
    TestScriptAssertionDirectionType["REQUEST"] = "request";
  })(exports.TestScriptAssertionDirectionType || (exports.TestScriptAssertionDirectionType = {}));
  (function(TestScriptAssertionOperatorType) {
    TestScriptAssertionOperatorType["EQUALS"] = "equals";
    TestScriptAssertionOperatorType["NOTEQUALS"] = "notEquals";
    TestScriptAssertionOperatorType["IN"] = "in";
    TestScriptAssertionOperatorType["NOTIN"] = "notIn";
    TestScriptAssertionOperatorType["GREATERTHAN"] = "greaterThan";
    TestScriptAssertionOperatorType["LESSTHAN"] = "lessThan";
    TestScriptAssertionOperatorType["EMPTY"] = "empty";
    TestScriptAssertionOperatorType["NOTEMPTY"] = "notEmpty";
    TestScriptAssertionOperatorType["CONTAINS"] = "contains";
    TestScriptAssertionOperatorType["NOTCONTAINS"] = "notContains";
    TestScriptAssertionOperatorType["EVAL"] = "eval";
  })(exports.TestScriptAssertionOperatorType || (exports.TestScriptAssertionOperatorType = {}));
  (function(TestScriptAssertionResponseTypes) {
    TestScriptAssertionResponseTypes["OKAY"] = "okay";
    TestScriptAssertionResponseTypes["CREATED"] = "created";
    TestScriptAssertionResponseTypes["NOCONTENT"] = "noContent";
    TestScriptAssertionResponseTypes["NOTMODIFIED"] = "notModified";
    TestScriptAssertionResponseTypes["BAD"] = "bad";
    TestScriptAssertionResponseTypes["FORBIDDEN"] = "forbidden";
    TestScriptAssertionResponseTypes["NOTFOUND"] = "notFound";
    TestScriptAssertionResponseTypes["METHODNOTALLOWED"] = "methodNotAllowed";
    TestScriptAssertionResponseTypes["CONFLICT"] = "conflict";
    TestScriptAssertionResponseTypes["GONE"] = "gone";
    TestScriptAssertionResponseTypes["PRECONDITIONFAILED"] = "preconditionFailed";
    TestScriptAssertionResponseTypes["UNPROCESSABLE"] = "unprocessable";
  })(exports.TestScriptAssertionResponseTypes || (exports.TestScriptAssertionResponseTypes = {}));
  (function(ValueSetPublicationStatus) {
    ValueSetPublicationStatus["DRAFT"] = "draft";
    ValueSetPublicationStatus["ACTIVE"] = "active";
    ValueSetPublicationStatus["RETIRED"] = "retired";
    ValueSetPublicationStatus["UNKNOWN"] = "unknown";
  })(exports.ValueSetPublicationStatus || (exports.ValueSetPublicationStatus = {}));
  (function(ValueSetFilterOperator) {
    ValueSetFilterOperator["E"] = "=";
    ValueSetFilterOperator["IS_A"] = "is-a";
    ValueSetFilterOperator["DESCENDENT_OF"] = "descendent-of";
    ValueSetFilterOperator["IS_NOT_A"] = "is-not-a";
    ValueSetFilterOperator["REGEX"] = "regex";
    ValueSetFilterOperator["IN"] = "in";
    ValueSetFilterOperator["NOT_IN"] = "not-in";
    ValueSetFilterOperator["GENERALIZES"] = "generalizes";
    ValueSetFilterOperator["EXISTS"] = "exists";
  })(exports.ValueSetFilterOperator || (exports.ValueSetFilterOperator = {}));
  (function(VerificationResultstatus) {
    VerificationResultstatus["ATTESTED"] = "attested";
    VerificationResultstatus["VALIDATED"] = "validated";
    VerificationResultstatus["IN_PROCESS"] = "in-process";
    VerificationResultstatus["REQ_REVALID"] = "req-revalid";
    VerificationResultstatus["VAL_FAIL"] = "val-fail";
    VerificationResultstatus["REVAL_FAIL"] = "reval-fail";
  })(exports.VerificationResultstatus || (exports.VerificationResultstatus = {}));
  (function(VisionPrescriptionVisionStatus) {
    VisionPrescriptionVisionStatus["ACTIVE"] = "active";
    VisionPrescriptionVisionStatus["CANCELLED"] = "cancelled";
    VisionPrescriptionVisionStatus["DRAFT"] = "draft";
    VisionPrescriptionVisionStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.VisionPrescriptionVisionStatus || (exports.VisionPrescriptionVisionStatus = {}));
  (function(VisionPrescriptionVisionEyes) {
    VisionPrescriptionVisionEyes["RIGHT"] = "right";
    VisionPrescriptionVisionEyes["LEFT"] = "left";
  })(exports.VisionPrescriptionVisionEyes || (exports.VisionPrescriptionVisionEyes = {}));
  (function(VisionPrescriptionVisionBase) {
    VisionPrescriptionVisionBase["UP"] = "up";
    VisionPrescriptionVisionBase["DOWN"] = "down";
    VisionPrescriptionVisionBase["IN"] = "in";
    VisionPrescriptionVisionBase["OUT"] = "out";
  })(exports.VisionPrescriptionVisionBase || (exports.VisionPrescriptionVisionBase = {}));
  (function(DetectedIssueStatus) {
    DetectedIssueStatus["REGISTERED"] = "registered";
    DetectedIssueStatus["PRELIMINARY"] = "preliminary";
    DetectedIssueStatus["FINAL"] = "final";
    DetectedIssueStatus["AMENDED"] = "amended";
    DetectedIssueStatus["CORRECTED"] = "corrected";
    DetectedIssueStatus["CANCELLED"] = "cancelled";
    DetectedIssueStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    DetectedIssueStatus["UNKNOWN"] = "unknown";
  })(exports.DetectedIssueStatus || (exports.DetectedIssueStatus = {}));
  (function(ObservationStatus) {
    ObservationStatus["REGISTERED"] = "registered";
    ObservationStatus["PRELIMINARY"] = "preliminary";
    ObservationStatus["FINAL"] = "final";
    ObservationStatus["AMENDED"] = "amended";
    ObservationStatus["CORRECTED"] = "corrected";
    ObservationStatus["CANCELLED"] = "cancelled";
    ObservationStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    ObservationStatus["UNKNOWN"] = "unknown";
  })(exports.ObservationStatus || (exports.ObservationStatus = {}));
  (function(DiagnosticReportStatus) {
    DiagnosticReportStatus["REGISTERED"] = "registered";
    DiagnosticReportStatus["PARTIAL"] = "partial";
    DiagnosticReportStatus["PRELIMINARY"] = "preliminary";
    DiagnosticReportStatus["FINAL"] = "final";
    DiagnosticReportStatus["AMENDED"] = "amended";
    DiagnosticReportStatus["CORRECTED"] = "corrected";
    DiagnosticReportStatus["APPENDED"] = "appended";
    DiagnosticReportStatus["CANCELLED"] = "cancelled";
    DiagnosticReportStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    DiagnosticReportStatus["UNKNOWN"] = "unknown";
  })(exports.DiagnosticReportStatus || (exports.DiagnosticReportStatus = {}));
  (function(EncounterStatus) {
    EncounterStatus["PLANNED"] = "planned";
    EncounterStatus["ARRIVED"] = "arrived";
    EncounterStatus["TRIAGED"] = "triaged";
    EncounterStatus["IN_PROGRESS"] = "in-progress";
    EncounterStatus["ONLEAVE"] = "onleave";
    EncounterStatus["FINISHED"] = "finished";
    EncounterStatus["CANCELLED"] = "cancelled";
    EncounterStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    EncounterStatus["UNKNOWN"] = "unknown";
  })(exports.EncounterStatus || (exports.EncounterStatus = {}));
  (function(DeviceUDIEntryType) {
    DeviceUDIEntryType["BARCODE"] = "barcode";
    DeviceUDIEntryType["RFID"] = "rfid";
    DeviceUDIEntryType["MANUAL"] = "manual";
    DeviceUDIEntryType["CARD"] = "card";
    DeviceUDIEntryType["SELF_REPORTED"] = "self-reported";
    DeviceUDIEntryType["UNKNOWN"] = "unknown";
  })(exports.DeviceUDIEntryType || (exports.DeviceUDIEntryType = {}));
  (function(QuestionnaireItemType) {
    QuestionnaireItemType["GROUP"] = "group";
    QuestionnaireItemType["DISPLAY"] = "display";
    QuestionnaireItemType["QUESTION"] = "question";
    QuestionnaireItemType["BOOLEAN"] = "boolean";
    QuestionnaireItemType["DECIMAL"] = "decimal";
    QuestionnaireItemType["INTEGER"] = "integer";
    QuestionnaireItemType["DATE"] = "date";
    QuestionnaireItemType["DATETIME"] = "dateTime";
    QuestionnaireItemType["TIME"] = "time";
    QuestionnaireItemType["STRING"] = "string";
    QuestionnaireItemType["TEXT"] = "text";
    QuestionnaireItemType["URL"] = "url";
    QuestionnaireItemType["CHOICE"] = "choice";
    QuestionnaireItemType["OPEN_CHOICE"] = "open-choice";
    QuestionnaireItemType["ATTACHMENT"] = "attachment";
    QuestionnaireItemType["REFERENCE"] = "reference";
    QuestionnaireItemType["QUANTITY"] = "quantity";
  })(exports.QuestionnaireItemType || (exports.QuestionnaireItemType = {}));
  (function(RiskAssessmentStatus) {
    RiskAssessmentStatus["REGISTERED"] = "registered";
    RiskAssessmentStatus["PRELIMINARY"] = "preliminary";
    RiskAssessmentStatus["FINAL"] = "final";
    RiskAssessmentStatus["AMENDED"] = "amended";
    RiskAssessmentStatus["CORRECTED"] = "corrected";
    RiskAssessmentStatus["CANCELLED"] = "cancelled";
    RiskAssessmentStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    RiskAssessmentStatus["UNKNOWN"] = "unknown";
  })(exports.RiskAssessmentStatus || (exports.RiskAssessmentStatus = {}));
  (function(SupplyRequestStatus) {
    SupplyRequestStatus["DRAFT"] = "draft";
    SupplyRequestStatus["ACTIVE"] = "active";
    SupplyRequestStatus["SUSPENDED"] = "suspended";
    SupplyRequestStatus["CANCELLED"] = "cancelled";
    SupplyRequestStatus["COMPLETED"] = "completed";
    SupplyRequestStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    SupplyRequestStatus["UNKNOWN"] = "unknown";
  })(exports.SupplyRequestStatus || (exports.SupplyRequestStatus = {}));
  (function(DeviceUseStatementStatus) {
    DeviceUseStatementStatus["ACTIVE"] = "active";
    DeviceUseStatementStatus["COMPLETED"] = "completed";
    DeviceUseStatementStatus["ENTERED_IN_ERROR"] = "entered-in-error";
    DeviceUseStatementStatus["INTENDED"] = "intended";
    DeviceUseStatementStatus["STOPPED"] = "stopped";
    DeviceUseStatementStatus["ON_HOLD"] = "on-hold";
  })(exports.DeviceUseStatementStatus || (exports.DeviceUseStatementStatus = {}));
  (function(TaskStatus) {
    TaskStatus["DRAFT"] = "draft";
    TaskStatus["REQUESTED"] = "requested";
    TaskStatus["RECEIVED"] = "received";
    TaskStatus["ACCEPTED"] = "accepted";
    TaskStatus["REJECTED"] = "rejected";
    TaskStatus["READY"] = "ready";
    TaskStatus["CANCELLED"] = "cancelled";
    TaskStatus["IN_PROGRESS"] = "in-progress";
    TaskStatus["ON_HOLD"] = "on-hold";
    TaskStatus["FAILED"] = "failed";
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["ENTERED_IN_ERROR"] = "entered-in-error";
  })(exports.TaskStatus || (exports.TaskStatus = {}));
  (function(StructureMapTransform) {
    StructureMapTransform["CREATE"] = "create";
    StructureMapTransform["COPY"] = "copy";
    StructureMapTransform["TRUNCATE"] = "truncate";
    StructureMapTransform["ESCAPE"] = "escape";
    StructureMapTransform["CAST"] = "cast";
    StructureMapTransform["APPEND"] = "append";
    StructureMapTransform["TRANSLATE"] = "translate";
    StructureMapTransform["REFERENCE"] = "reference";
    StructureMapTransform["DATEOP"] = "dateOp";
    StructureMapTransform["UUID"] = "uuid";
    StructureMapTransform["POINTER"] = "pointer";
    StructureMapTransform["EVALUATE"] = "evaluate";
    StructureMapTransform["CC"] = "cc";
    StructureMapTransform["C"] = "c";
    StructureMapTransform["QTY"] = "qty";
    StructureMapTransform["ID"] = "id";
    StructureMapTransform["CP"] = "cp";
  })(exports.StructureMapTransform || (exports.StructureMapTransform = {}));
})(definition);
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.getIdentifierString = utils.isInPeriod = utils.selectName = utils.getFullName = utils.isUUID = utils.getCode = utils.hasCoding = utils.getAllI18N = utils.readI18N = utils.writeI18N = void 0;
const definition_1 = definition;
const TRANSLATION_URL = "http://hl7.org/fhir/StructureDefinition/translation";
const LANG_URL = "lang";
const CONTENT_URL = "content";
const REG_EXP_UUID = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
function writeI18N(strings) {
  const i18nExtensions = new Array();
  Object.keys(strings).forEach((language) => {
    i18nExtensions.push({
      url: TRANSLATION_URL,
      extension: [
        {
          url: LANG_URL,
          valueCode: language
        },
        {
          url: CONTENT_URL,
          valueString: strings[language]
        }
      ]
    });
  });
  return {
    extension: i18nExtensions
  };
}
utils.writeI18N = writeI18N;
function readI18N(element, lang) {
  var _a, _b;
  if (!element.extension)
    return void 0;
  const translationExtension = element.extension.find((extension) => {
    var _a2;
    if (extension.url === TRANSLATION_URL) {
      return extension.extension && ((_a2 = extension.extension) === null || _a2 === void 0 ? void 0 : _a2.findIndex((extension2) => {
        return extension2.url === LANG_URL && extension2.valueCode === lang;
      })) > -1;
    } else {
      return false;
    }
  });
  return (_b = (_a = translationExtension === null || translationExtension === void 0 ? void 0 : translationExtension.extension) === null || _a === void 0 ? void 0 : _a.find((extension) => {
    return extension.url === CONTENT_URL;
  })) === null || _b === void 0 ? void 0 : _b.valueString;
}
utils.readI18N = readI18N;
function getAllI18N(element) {
  var _a;
  const i18n = {};
  const translationExtensions = (_a = element.extension) === null || _a === void 0 ? void 0 : _a.filter((ext) => ext.url === TRANSLATION_URL);
  translationExtensions === null || translationExtensions === void 0 ? void 0 : translationExtensions.map((te) => {
    var _a2, _b, _c, _d;
    const lang = (_b = (_a2 = te.extension) === null || _a2 === void 0 ? void 0 : _a2.find((ext) => ext.url === LANG_URL)) === null || _b === void 0 ? void 0 : _b.valueCode;
    const str = (_d = (_c = te.extension) === null || _c === void 0 ? void 0 : _c.find((ext) => ext.url === CONTENT_URL)) === null || _d === void 0 ? void 0 : _d.valueString;
    if (lang && str) {
      i18n[lang] = str;
    }
  });
  return i18n;
}
utils.getAllI18N = getAllI18N;
function hasCoding(codeableConcept, coding) {
  if (!codeableConcept)
    return false;
  const system = coding.system;
  const code = coding.code;
  if (!codeableConcept.coding)
    return false;
  return codeableConcept.coding.findIndex((c) => (system === void 0 || c.system === system) && c.code === code) > -1;
}
utils.hasCoding = hasCoding;
function getCode(codeableConcept, system) {
  var _a;
  if (!codeableConcept)
    return void 0;
  const coding = (_a = codeableConcept.coding) === null || _a === void 0 ? void 0 : _a.find((coding2) => coding2.system === system);
  return coding ? coding.code : void 0;
}
utils.getCode = getCode;
function isUUID(id) {
  if (typeof id !== "string")
    return false;
  return REG_EXP_UUID.test(id);
}
utils.isUUID = isUUID;
function getFullName(name) {
  var _a;
  let text = "";
  if (name && (name.given || name.family)) {
    (_a = name.given) === null || _a === void 0 ? void 0 : _a.forEach((x) => text += `${x} `);
    text += name.family;
    text.trimEnd();
  }
  return text;
}
utils.getFullName = getFullName;
function selectName(names, priorisation, alsoReturnOldNames) {
  let name = void 0;
  if (names.length === 0)
    return void 0;
  priorisation === null || priorisation === void 0 ? void 0 : priorisation.forEach((nameType) => {
    if (!name)
      name = names.find((x) => x.use === nameType);
  });
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.USUAL);
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.OFFICIAL);
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.TEMP && x.period && isInPeriod(x.period));
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.NICKNAME);
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.ANONYMOUS);
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.TEMP);
  if (name)
    return name;
  name = names.find((x) => x.use === definition_1.HumanNameNameUse.MAIDEN);
  if (name)
    return name;
  name = names.find((x) => x.use !== definition_1.HumanNameNameUse.OLD || alsoReturnOldNames);
  return name;
}
utils.selectName = selectName;
function isInPeriod(period, time = new Date()) {
  let now;
  switch (typeof time) {
    case "string":
    case "number":
      now = new Date(time);
      break;
    default:
      now = time;
  }
  let hasStarted = period.start ? new Date(period.start).getTime() <= now.getTime() : true;
  let hasEnded = false;
  if (period.end) {
    const parts = period.end.split("-");
    if (period.end.length === 4) {
      const endYear = Number(period.end);
      hasEnded = endYear < now.getFullYear();
    } else if (parts.length === 2 && period.end.length < 8) {
      const endYear = Number(parts[0]);
      const endMonth = Number(parts[1]);
      hasEnded = endYear < now.getFullYear() || endYear === now.getFullYear() && endMonth < now.getMonth() - 1;
    } else if (parts.length === 3 && period.end.length < 11) {
      const endYear = Number(parts[0]);
      const endMonth = Number(parts[1]);
      const endDay = Number(parts[2]);
      hasEnded = endYear < now.getFullYear() || endYear === now.getFullYear() && endMonth < now.getMonth() + 1 || endYear === now.getFullYear() && endMonth === now.getMonth() + 1 && endDay < now.getDate();
    } else {
      hasEnded = new Date(period.end).getTime() < now.getTime();
    }
  }
  return hasStarted && !hasEnded;
}
utils.isInPeriod = isInPeriod;
function getIdentifierString(patient, system) {
  var _a;
  const identifier = (_a = patient.identifier) === null || _a === void 0 ? void 0 : _a.find((id) => {
    var _a2;
    return (_a2 = id.system) === null || _a2 === void 0 ? void 0 : _a2.includes(system);
  });
  if (!identifier || !identifier.value) {
    throw new Error("Patient has no identifier that matches the oid " + system);
  }
  return system + "|" + identifier.value;
}
utils.getIdentifierString = getIdentifierString;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.I4MIBundle = void 0;
  var bundle_1 = bundle;
  Object.defineProperty(exports, "I4MIBundle", { enumerable: true, get: function() {
    return bundle_1.I4MIBundle;
  } });
  __exportStar(apiMethods, exports);
  __exportStar(definition, exports);
  __exportStar(utils, exports);
})(dist);
export { commonjsGlobal as c, dist as d, getAugmentedNamespace as g };
