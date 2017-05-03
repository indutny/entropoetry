!function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,r){"use strict";(function(t){function n(){return o.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(t,e){if(n()<e)throw new RangeError("Invalid typed array length");return o.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=o.prototype):(null===t&&(t=new o(e)),t.length=e),t}function o(t,e,r){if(!(o.TYPED_ARRAY_SUPPORT||this instanceof o))return new o(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return a(this,t)}return s(this,t,e,r)}function s(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?l(t,e,r,n):"string"==typeof e?c(t,e,r):p(t,e)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function f(t,e,r,n){return u(e),e<=0?i(t,e):void 0!==r?"string"==typeof n?i(t,e).fill(r,n):i(t,e).fill(r):i(t,e)}function a(t,e){if(u(e),t=i(t,e<0?0:0|y(e)),!o.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function c(t,e,r){if("string"==typeof r&&""!==r||(r="utf8"),!o.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|d(e,r);t=i(t,n);var s=t.write(e,r);return s!==n&&(t=t.slice(0,s)),t}function h(t,e){var r=e.length<0?0:0|y(e.length);t=i(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function l(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");return e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n),o.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=o.prototype):t=h(t,e),t}function p(t,e){if(o.isBuffer(e)){var r=0|y(e.length);return t=i(t,r),0===t.length?t:(e.copy(t,0,0,r),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||V(e.length)?i(t,0):h(t,e);if("Buffer"===e.type&&K(e.data))return h(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function y(t){if(t>=n())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n().toString(16)+" bytes");return 0|t}function g(t){return+t!=t&&(t=0),o.alloc(+t)}function d(t,e){if(o.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return J(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return G(t).length;default:if(n)return J(t).length;e=(""+e).toLowerCase(),n=!0}}function v(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if(r>>>=0,e>>>=0,r<=e)return"";for(t||(t="utf8");;)switch(t){case"hex":return O(this,e,r);case"utf8":case"utf-8":return B(this,e,r);case"ascii":return x(this,e,r);case"latin1":case"binary":return L(this,e,r);case"base64":return P(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function m(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function w(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=o.from(e,n)),o.isBuffer(e))return 0===e.length?-1:b(t,e,r,n,i);if("number"==typeof e)return e&=255,o.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):b(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function b(t,e,r,n,i){function o(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}var s=1,u=t.length,f=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,u/=2,f/=2,r/=2}var a;if(i){var c=-1;for(a=r;a<u;a++)if(o(t,a)===o(e,-1===c?0:a-c)){if(-1===c&&(c=a),a-c+1===f)return c*s}else-1!==c&&(a-=a-c),c=-1}else for(r+f>u&&(r=u-f),a=r;a>=0;a--){for(var h=!0,l=0;l<f;l++)if(o(t,a+l)!==o(e,l)){h=!1;break}if(h)return a}return-1}function _(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var u=parseInt(e.substr(2*s,2),16);if(isNaN(u))return s;t[r+s]=u}return s}function E(t,e,r,n){return Z(J(e,t.length-r),t,r,n)}function A(t,e,r,n){return Z(H(e),t,r,n)}function S(t,e,r,n){return A(t,e,r,n)}function R(t,e,r,n){return Z(G(e),t,r,n)}function T(t,e,r,n){return Z($(e,t.length-r),t,r,n)}function P(t,e,r){return 0===e&&r===t.length?X.fromByteArray(t):X.fromByteArray(t.slice(e,r))}function B(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o=t[i],s=null,u=o>239?4:o>223?3:o>191?2:1;if(i+u<=r){var f,a,c,h;switch(u){case 1:o<128&&(s=o);break;case 2:f=t[i+1],128==(192&f)&&(h=(31&o)<<6|63&f)>127&&(s=h);break;case 3:f=t[i+1],a=t[i+2],128==(192&f)&&128==(192&a)&&(h=(15&o)<<12|(63&f)<<6|63&a)>2047&&(h<55296||h>57343)&&(s=h);break;case 4:f=t[i+1],a=t[i+2],c=t[i+3],128==(192&f)&&128==(192&a)&&128==(192&c)&&(h=(15&o)<<18|(63&f)<<12|(63&a)<<6|63&c)>65535&&h<1114112&&(s=h)}}null===s?(s=65533,u=1):s>65535&&(s-=65536,n.push(s>>>10&1023|55296),s=56320|1023&s),n.push(s),i+=u}return U(n)}function U(t){var e=t.length;if(e<=Q)return String.fromCharCode.apply(String,t);for(var r="",n=0;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=Q));return r}function x(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function L(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function O(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=q(t[o]);return i}function I(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function Y(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function M(t,e,r,n,i,s){if(!o.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<s)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function C(t,e,r,n){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-r,2);i<o;++i)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function D(t,e,r,n){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-r,4);i<o;++i)t[r+i]=e>>>8*(n?i:3-i)&255}function k(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function j(t,e,r,n,i){return i||k(t,e,r,4,3.4028234663852886e38,-3.4028234663852886e38),W.write(t,e,r,n,23,4),r+4}function z(t,e,r,n,i){return i||k(t,e,r,8,1.7976931348623157e308,-1.7976931348623157e308),W.write(t,e,r,n,52,8),r+8}function N(t){if(t=F(t).replace(tt,""),t.length<2)return"";for(;t.length%4!=0;)t+="=";return t}function F(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function q(t){return t<16?"0"+t.toString(16):t.toString(16)}function J(t,e){e=e||1/0;for(var r,n=t.length,i=null,o=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function H(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}function $(t,e){for(var r,n,i,o=[],s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}function G(t){return X.toByteArray(N(t))}function Z(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function V(t){return t!==t}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var X=r(4),W=r(6),K=r(7);e.Buffer=o,e.SlowBuffer=g,e.INSPECT_MAX_BYTES=50,o.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=n(),o.poolSize=8192,o._augment=function(t){return t.__proto__=o.prototype,t},o.from=function(t,e,r){return s(null,t,e,r)},o.TYPED_ARRAY_SUPPORT&&(o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&o[Symbol.species]===o&&Object.defineProperty(o,Symbol.species,{value:null,configurable:!0})),o.alloc=function(t,e,r){return f(null,t,e,r)},o.allocUnsafe=function(t){return a(null,t)},o.allocUnsafeSlow=function(t){return a(null,t)},o.isBuffer=function(t){return!(null==t||!t._isBuffer)},o.compare=function(t,e){if(!o.isBuffer(t)||!o.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,i=0,s=Math.min(r,n);i<s;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(t,e){if(!K(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return o.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=o.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var s=t[r];if(!o.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},o.byteLength=d,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)m(this,e,e+1);return this},o.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)m(this,e,e+3),m(this,e+1,e+2);return this},o.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)m(this,e,e+7),m(this,e+1,e+6),m(this,e+2,e+5),m(this,e+3,e+4);return this},o.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?B(this,0,t):v.apply(this,arguments)},o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===o.compare(this,t)},o.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},o.prototype.compare=function(t,e,r,n,i){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(e>>>=0,r>>>=0,n>>>=0,i>>>=0,this===t)return 0;for(var s=i-n,u=r-e,f=Math.min(s,u),a=this.slice(n,i),c=t.slice(e,r),h=0;h<f;++h)if(a[h]!==c[h]){s=a[h],u=c[h];break}return s<u?-1:u<s?1:0},o.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},o.prototype.indexOf=function(t,e,r){return w(this,t,e,r,!0)},o.prototype.lastIndexOf=function(t,e,r){return w(this,t,e,r,!1)},o.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return _(this,t,e,r);case"utf8":case"utf-8":return E(this,t,e,r);case"ascii":return A(this,t,e,r);case"latin1":case"binary":return S(this,t,e,r);case"base64":return R(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Q=4096;o.prototype.slice=function(t,e){var r=this.length;t=~~t,e=void 0===e?r:~~e,t<0?(t+=r)<0&&(t=0):t>r&&(t=r),e<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);var n;if(o.TYPED_ARRAY_SUPPORT)n=this.subarray(t,e),n.__proto__=o.prototype;else{var i=e-t;n=new o(i,void 0);for(var s=0;s<i;++s)n[s]=this[s+t]}return n},o.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||Y(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},o.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||Y(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},o.prototype.readUInt8=function(t,e){return e||Y(t,1,this.length),this[t]},o.prototype.readUInt16LE=function(t,e){return e||Y(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUInt16BE=function(t,e){return e||Y(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUInt32LE=function(t,e){return e||Y(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},o.prototype.readUInt32BE=function(t,e){return e||Y(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||Y(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},o.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||Y(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},o.prototype.readInt8=function(t,e){return e||Y(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},o.prototype.readInt16LE=function(t,e){e||Y(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt16BE=function(t,e){e||Y(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt32LE=function(t,e){return e||Y(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,e){return e||Y(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readFloatLE=function(t,e){return e||Y(t,4,this.length),W.read(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,e){return e||Y(t,4,this.length),W.read(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,e){return e||Y(t,8,this.length),W.read(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,e){return e||Y(t,8,this.length),W.read(this,t,!1,52,8)},o.prototype.writeUIntLE=function(t,e,r,n){if(t=+t,e|=0,r|=0,!n){M(this,t,e,r,Math.pow(2,8*r)-1,0)}var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},o.prototype.writeUIntBE=function(t,e,r,n){if(t=+t,e|=0,r|=0,!n){M(this,t,e,r,Math.pow(2,8*r)-1,0)}var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},o.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,1,255,0),o.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},o.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):C(this,t,e,!0),e+2},o.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,2,65535,0),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):C(this,t,e,!1),e+2},o.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):D(this,t,e,!0),e+4},o.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,4,4294967295,0),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):D(this,t,e,!1),e+4},o.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);M(this,t,e,r,i-1,-i)}var o=0,s=1,u=0;for(this[e]=255&t;++o<r&&(s*=256);)t<0&&0===u&&0!==this[e+o-1]&&(u=1),this[e+o]=(t/s>>0)-u&255;return e+r},o.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);M(this,t,e,r,i-1,-i)}var o=r-1,s=1,u=0;for(this[e+o]=255&t;--o>=0&&(s*=256);)t<0&&0===u&&0!==this[e+o+1]&&(u=1),this[e+o]=(t/s>>0)-u&255;return e+r},o.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,1,127,-128),o.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},o.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):C(this,t,e,!0),e+2},o.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,2,32767,-32768),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):C(this,t,e,!1),e+2},o.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,4,2147483647,-2147483648),o.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):D(this,t,e,!0),e+4},o.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||M(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),o.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):D(this,t,e,!1),e+4},o.prototype.writeFloatLE=function(t,e,r){return j(this,t,e,!0,r)},o.prototype.writeFloatBE=function(t,e,r){return j(this,t,e,!1,r)},o.prototype.writeDoubleLE=function(t,e,r){return z(this,t,e,!0,r)},o.prototype.writeDoubleBE=function(t,e,r){return z(this,t,e,!1,r)},o.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i,s=n-r;if(this===t&&r<e&&e<n)for(i=s-1;i>=0;--i)t[i+e]=this[i+r];else if(s<1e3||!o.TYPED_ARRAY_SUPPORT)for(i=0;i<s;++i)t[i+e]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+s),e);return s},o.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!o.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0);var s;if("number"==typeof t)for(s=e;s<r;++s)this[s]=t;else{var u=o.isBuffer(t)?t:J(new o(t,n).toString()),f=u.length;for(s=0;s<r-e;++s)this[s+e]=u[s%f]}return this};var tt=/[^+\/0-9A-Za-z-_]/g}).call(e,r(1))},function(t,e,r){"use strict";var n,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"===("undefined"==typeof window?"undefined":i(window))&&(n=window)}t.exports=n},function(t,e,r){"use strict";function n(){var t=this;s.call(this),this.worker=new Worker("dist/worker.js"),this.seq=0,this.pending=new Map,this.worker.onmessage=function(e){var r=e.data;if("ready"===r.type)return t.emit("ready");var n=t.pending.get(r.seq);n&&(t.pending.delete(r.seq),"error"===r.type?n(new Error(r.payload)):n(null,r.payload))}}var i=r(11),o=r(0).Buffer,s=r(5).EventEmitter;i.inherits(n,s),t.exports=n,n.prototype._request=function(t,e,r){this.worker.postMessage({type:t,payload:e,seq:this.seq}),this.pending.set(this.seq++,r)},n.prototype.stringify=function(t,e){this._request("stringify",t.toString("base64"),e)},n.prototype.parse=function(t,e){this._request("parse",t,function(t,r){if(t)return e(t);e(null,o.from(r,"base64"))})},n.prototype.autocomplete=function(t,e,r){this._request("autocomplete",{line:t,rhyme:e},r)}},function(t,e,r){"use strict";function n(t,e){var r=void 0,n=function(){e(t.value)},i=function(){clearTimeout(r),r=setTimeout(n,u)};t.onkeypress=i,t.onkeyup=i}var i=r(0).Buffer,o=r(2),s=new o,u=100,f={key:document.getElementById("key"),poem:document.getElementById("poem")};s.on("ready",function(){function t(){document.getElementById("loading").style.display="none",document.getElementById("content").style.display="inherit"}function e(){for(var r=i.alloc(32),n=0;n<32;n++)r[n]=256*Math.random()|0;s.stringify(r,function(n,i){if(n)return e();f.key.value=r.toString("hex"),f.poem.value=i,t()})}e()}),n(f.key,function(t){var e=void 0;try{e=i.from(t.replace(/[\r\n\s]+/g,""),"hex")}catch(t){return void(f.poem.value=t.message)}s.stringify(e,function(t,e){if(t)return void(f.poem.value=t.message);f.poem.value=e})}),n(f.poem,function(t){s.parse(t,function(t,e){if(t)return void(f.key.value=t.message);f.key.value=e.toString("hex")})})},function(t,e,r){"use strict";function n(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[e-2]?2:"="===t[e-1]?1:0}function i(t){return 3*t.length/4-n(t)}function o(t){var e,r,i,o,s,u,f=t.length;s=n(t),u=new h(3*f/4-s),i=s>0?f-4:f;var a=0;for(e=0,r=0;e<i;e+=4,r+=3)o=c[t.charCodeAt(e)]<<18|c[t.charCodeAt(e+1)]<<12|c[t.charCodeAt(e+2)]<<6|c[t.charCodeAt(e+3)],u[a++]=o>>16&255,u[a++]=o>>8&255,u[a++]=255&o;return 2===s?(o=c[t.charCodeAt(e)]<<2|c[t.charCodeAt(e+1)]>>4,u[a++]=255&o):1===s&&(o=c[t.charCodeAt(e)]<<10|c[t.charCodeAt(e+1)]<<4|c[t.charCodeAt(e+2)]>>2,u[a++]=o>>8&255,u[a++]=255&o),u}function s(t){return a[t>>18&63]+a[t>>12&63]+a[t>>6&63]+a[63&t]}function u(t,e,r){for(var n,i=[],o=e;o<r;o+=3)n=(t[o]<<16)+(t[o+1]<<8)+t[o+2],i.push(s(n));return i.join("")}function f(t){for(var e,r=t.length,n=r%3,i="",o=[],s=0,f=r-n;s<f;s+=16383)o.push(u(t,s,s+16383>f?f:s+16383));return 1===n?(e=t[r-1],i+=a[e>>2],i+=a[e<<4&63],i+="=="):2===n&&(e=(t[r-2]<<8)+t[r-1],i+=a[e>>10],i+=a[e>>4&63],i+=a[e<<2&63],i+="="),o.push(i),o.join("")}e.byteLength=i,e.toByteArray=o,e.fromByteArray=f;for(var a=[],c=[],h="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,y=l.length;p<y;++p)a[p]=l[p],c[l.charCodeAt(p)]=p;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},function(t,e,r){"use strict";function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(t){return"function"==typeof t}function o(t){return"number"==typeof t}function s(t){return"object"===(void 0===t?"undefined":f(t))&&null!==t}function u(t){return void 0===t}var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!o(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,r,n,o,f,a;if(this._events||(this._events={}),"error"===t&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var c=new Error('Uncaught, unspecified "error" event. ('+e+")");throw c.context=e,c}if(r=this._events[t],u(r))return!1;if(i(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),r.apply(this,o)}else if(s(r))for(o=Array.prototype.slice.call(arguments,1),a=r.slice(),n=a.length,f=0;f<n;f++)a[f].apply(this,o);return!0},n.prototype.addListener=function(t,e){var r;if(!i(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,i(e.listener)?e.listener:e),this._events[t]?s(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,s(this._events[t])&&!this._events[t].warned&&(r=u(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&r>0&&this._events[t].length>r&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function r(){this.removeListener(t,r),n||(n=!0,e.apply(this,arguments))}if(!i(e))throw TypeError("listener must be a function");var n=!1;return r.listener=e,this.on(t,r),this},n.prototype.removeListener=function(t,e){var r,n,o,u;if(!i(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(r=this._events[t],o=r.length,n=-1,r===e||i(r.listener)&&r.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(s(r)){for(u=o;u-- >0;)if(r[u]===e||r[u].listener&&r[u].listener===e){n=u;break}if(n<0)return this;1===r.length?(r.length=0,delete this._events[t]):r.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[t],i(r))this.removeListener(t,r);else if(r)for(;r.length;)this.removeListener(t,r[r.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){return this._events&&this._events[t]?i(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(i(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,r){"use strict";e.read=function(t,e,r,n,i){var o,s,u=8*i-n-1,f=(1<<u)-1,a=f>>1,c=-7,h=r?i-1:0,l=r?-1:1,p=t[e+h];for(h+=l,o=p&(1<<-c)-1,p>>=-c,c+=u;c>0;o=256*o+t[e+h],h+=l,c-=8);for(s=o&(1<<-c)-1,o>>=-c,c+=n;c>0;s=256*s+t[e+h],h+=l,c-=8);if(0===o)o=1-a;else{if(o===f)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,n),o-=a}return(p?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,u,f,a=8*o-i-1,c=(1<<a)-1,h=c>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,y=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,s=c):(s=Math.floor(Math.log(e)/Math.LN2),e*(f=Math.pow(2,-s))<1&&(s--,f*=2),e+=s+h>=1?l/f:l*Math.pow(2,1-h),e*f>=2&&(s++,f/=2),s+h>=c?(u=0,s=c):s+h>=1?(u=(e*f-1)*Math.pow(2,i),s+=h):(u=e*Math.pow(2,h-1)*Math.pow(2,i),s=0));i>=8;t[r+p]=255&u,p+=y,u/=256,i-=8);for(s=s<<i|u,a+=i;a>0;t[r+p]=255&s,p+=y,s/=256,a-=8);t[r+p-y]|=128*g}},function(t,e,r){"use strict";var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,r){"use strict";function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function o(t){if(h===setTimeout)return setTimeout(t,0);if((h===n||!h)&&setTimeout)return h=setTimeout,setTimeout(t,0);try{return h(t,0)}catch(e){try{return h.call(null,t,0)}catch(e){return h.call(this,t,0)}}}function s(t){if(l===clearTimeout)return clearTimeout(t);if((l===i||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch(e){try{return l.call(null,t)}catch(e){return l.call(this,t)}}}function u(){d&&y&&(d=!1,y.length?g=y.concat(g):v=-1,g.length&&f())}function f(){if(!d){var t=o(u);d=!0;for(var e=g.length;e;){for(y=g,g=[];++v<e;)y&&y[v].run();v=-1,e=g.length}y=null,d=!1,s(t)}}function a(t,e){this.fun=t,this.array=e}function c(){}var h,l,p=t.exports={};!function(){try{h="function"==typeof setTimeout?setTimeout:n}catch(t){h=n}try{l="function"==typeof clearTimeout?clearTimeout:i}catch(t){l=i}}();var y,g=[],d=!1,v=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];g.push(new a(t,e)),1!==g.length||d||o(f)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(t){return[]},p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(t,e,r){"use strict";"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){return t&&"object"===(void 0===t?"undefined":n(t))&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e,r){"use strict";(function(t,n){function i(t,r){var n={seen:[],stylize:s};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),g(r)?n.showHidden=r:r&&e._extend(n,r),_(n.showHidden)&&(n.showHidden=!1),_(n.depth)&&(n.depth=2),_(n.colors)&&(n.colors=!1),_(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=o),f(n,t,n.depth)}function o(t,e){var r=i.styles[e];return r?"["+i.colors[r][0]+"m"+t+"["+i.colors[r][1]+"m":t}function s(t,e){return t}function u(t){var e={};return t.forEach(function(t,r){e[t]=!0}),e}function f(t,r,n){if(t.customInspect&&r&&T(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,t);return w(i)||(i=f(t,i,n)),i}var o=a(t,r);if(o)return o;var s=Object.keys(r),g=u(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(r)),R(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return c(r);if(0===s.length){if(T(r)){var d=r.name?": "+r.name:"";return t.stylize("[Function"+d+"]","special")}if(E(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(S(r))return t.stylize(Date.prototype.toString.call(r),"date");if(R(r))return c(r)}var v="",m=!1,b=["{","}"];if(y(r)&&(m=!0,b=["[","]"]),T(r)){v=" [Function"+(r.name?": "+r.name:"")+"]"}if(E(r)&&(v=" "+RegExp.prototype.toString.call(r)),S(r)&&(v=" "+Date.prototype.toUTCString.call(r)),R(r)&&(v=" "+c(r)),0===s.length&&(!m||0==r.length))return b[0]+v+b[1];if(n<0)return E(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special");t.seen.push(r);var _;return _=m?h(t,r,n,g,s):s.map(function(e){return l(t,r,n,g,e,m)}),t.seen.pop(),p(_,v,b)}function a(t,e){if(_(e))return t.stylize("undefined","undefined");if(w(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return m(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):d(e)?t.stylize("null","null"):void 0}function c(t){return"["+Error.prototype.toString.call(t)+"]"}function h(t,e,r,n,i){for(var o=[],s=0,u=e.length;s<u;++s)L(e,String(s))?o.push(l(t,e,r,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(l(t,e,r,n,i,!0))}),o}function l(t,e,r,n,i,o){var s,u,a;if(a=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},a.get?u=a.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):a.set&&(u=t.stylize("[Setter]","special")),L(n,i)||(s="["+i+"]"),u||(t.seen.indexOf(a.value)<0?(u=d(r)?f(t,a.value,null):f(t,a.value,r-1),u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){return"   "+t}).join("\n"))):u=t.stylize("[Circular]","special")),_(s)){if(o&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+u}function p(t,e,r){var n=0;return t.reduce(function(t,e){return n++,e.indexOf("\n")>=0&&n++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}function y(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function d(t){return null===t}function v(t){return null==t}function m(t){return"number"==typeof t}function w(t){return"string"==typeof t}function b(t){return"symbol"===(void 0===t?"undefined":O(t))}function _(t){return void 0===t}function E(t){return A(t)&&"[object RegExp]"===B(t)}function A(t){return"object"===(void 0===t?"undefined":O(t))&&null!==t}function S(t){return A(t)&&"[object Date]"===B(t)}function R(t){return A(t)&&("[object Error]"===B(t)||t instanceof Error)}function T(t){return"function"==typeof t}function P(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"===(void 0===t?"undefined":O(t))||void 0===t}function B(t){return Object.prototype.toString.call(t)}function U(t){return t<10?"0"+t.toString(10):t.toString(10)}function x(){var t=new Date,e=[U(t.getHours()),U(t.getMinutes()),U(t.getSeconds())].join(":");return[t.getDate(),M[t.getMonth()],e].join(" ")}function L(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.format=function(t){if(!w(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(i(arguments[r]));return e.join(" ")}for(var r=1,n=arguments,o=n.length,s=String(t).replace(/%[sdj%]/g,function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return t}}),u=n[r];r<o;u=n[++r])d(u)||!A(u)?s+=" "+u:s+=" "+i(u);return s},e.deprecate=function(r,i){function o(){if(!s){if(n.throwDeprecation)throw new Error(i);n.traceDeprecation?console.trace(i):console.error(i),s=!0}return r.apply(this,arguments)}if(_(t.process))return function(){return e.deprecate(r,i).apply(this,arguments)};if(!0===n.noDeprecation)return r;var s=!1;return o};var I,Y={};e.debuglog=function(t){if(_(I)&&(I=n.env.NODE_DEBUG||""),t=t.toUpperCase(),!Y[t])if(new RegExp("\\b"+t+"\\b","i").test(I)){var r=n.pid;Y[t]=function(){var n=e.format.apply(e,arguments);console.error("%s %d: %s",t,r,n)}}else Y[t]=function(){};return Y[t]},e.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=y,e.isBoolean=g,e.isNull=d,e.isNullOrUndefined=v,e.isNumber=m,e.isString=w,e.isSymbol=b,e.isUndefined=_,e.isRegExp=E,e.isObject=A,e.isDate=S,e.isError=R,e.isFunction=T,e.isPrimitive=P,e.isBuffer=r(10);var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.log=function(){console.log("%s - %s",x(),e.format.apply(e,arguments))},e.inherits=r(9),e._extend=function(t,e){if(!e||!A(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t}}).call(e,r(1),r(8))}]);