import { createContext as e, useCallback as t, useContext as n, useEffect as r, useState as i } from "react";
//#region \0rolldown/runtime.js
var a = Object.defineProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, t) => {
	let n = {};
	for (var r in e) a(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || a(n, Symbol.toStringTag, { value: "Module" }), n;
}, c = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), l = [
	"Novela",
	"Ficción",
	"Infantil",
	"Autoayuda",
	"Negocios",
	"Historia",
	"Ciencia",
	"Poesía",
	"Cómics",
	"Académico"
], u = [
	{
		id: 1,
		titulo: "Clean Code",
		autor: "Robert C. Martin",
		categoria: "Negocios",
		precio: 95,
		imagen: "📘",
		descripcion: "Manual de desarrollo de software limpio",
		stock: 15
	},
	{
		id: 2,
		titulo: "El Principito",
		autor: "Antoine de Saint-Exupéry",
		categoria: "Infantil",
		precio: 45,
		imagen: "📕",
		descripcion: "Clásico de la literatura infantil",
		stock: 20
	},
	{
		id: 3,
		titulo: "Cien años de soledad",
		autor: "Gabriel García Márquez",
		categoria: "Novela",
		precio: 65,
		imagen: "📗",
		descripcion: "Obra maestra del realismo mágico",
		stock: 12
	},
	{
		id: 4,
		titulo: "Sapiens",
		autor: "Yuval Noah Harari",
		categoria: "Historia",
		precio: 78,
		imagen: "📙",
		descripcion: "Breve historia de la humanidad",
		stock: 10
	},
	{
		id: 5,
		titulo: "El poder del ahora",
		autor: "Eckhart Tolle",
		categoria: "Autoayuda",
		precio: 55,
		imagen: "📔",
		descripcion: "Guía para la iluminación espiritual",
		stock: 18
	},
	{
		id: 6,
		titulo: "Breve historia del tiempo",
		autor: "Stephen Hawking",
		categoria: "Ciencia",
		precio: 85,
		imagen: "📓",
		descripcion: "Del Big Bang a los agujeros negros",
		stock: 8
	},
	{
		id: 7,
		titulo: "Padre rico, padre pobre",
		autor: "Robert Kiyosaki",
		categoria: "Negocios",
		precio: 60,
		imagen: "📒",
		descripcion: "Educación financiera básica",
		stock: 25
	},
	{
		id: 8,
		titulo: "Don Quijote de la Mancha",
		autor: "Miguel de Cervantes",
		categoria: "Novela",
		precio: 70,
		imagen: "📖",
		descripcion: "Clásico de la literatura universal",
		stock: 5
	}
];
function d(e) {
	return e ? new Date(e).toLocaleDateString("es-PE", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}) : "";
}
var f = "http://localhost:8087/api";
//#endregion
//#region node_modules/axios/lib/helpers/bind.js
function p(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
//#endregion
//#region node_modules/axios/lib/utils.js
var { toString: m } = Object.prototype, { getPrototypeOf: h } = Object, { iterator: g, toStringTag: _ } = Symbol, v = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), y = (e, t) => {
	let n = e, r = [];
	for (; n != null && n !== Object.prototype;) {
		if (r.indexOf(n) !== -1) return !1;
		if (r.push(n), v(n, t)) return !0;
		n = h(n);
	}
	return !1;
}, b = (e, t) => e != null && y(e, t) ? e[t] : void 0, x = ((e) => (t) => {
	let n = m.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), S = (e) => (e = e.toLowerCase(), (t) => x(t) === e), C = (e) => (t) => typeof t === e, { isArray: w } = Array, T = C("undefined");
function E(e) {
	return e !== null && !T(e) && e.constructor !== null && !T(e.constructor) && O(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var D = S("ArrayBuffer");
function ee(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && D(e.buffer), t;
}
var te = C("string"), O = C("function"), k = C("number"), A = (e) => typeof e == "object" && !!e, j = (e) => e === !0 || e === !1, M = (e) => {
	if (!A(e)) return !1;
	let t = h(e);
	return (t === null || t === Object.prototype || h(t) === null) && !y(e, _) && !y(e, g);
}, N = (e) => {
	if (!A(e) || E(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, ne = S("Date"), P = S("File"), F = (e) => !!(e && e.uri !== void 0), re = (e) => e && e.getParts !== void 0, ie = S("Blob"), I = S("FileList"), ae = (e) => A(e) && O(e.pipe);
function oe() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var se = oe(), ce = se.FormData === void 0 ? void 0 : se.FormData, le = (e) => {
	if (!e) return !1;
	if (ce && e instanceof ce) return !0;
	let t = h(e);
	if (!t || t === Object.prototype || !O(e.append)) return !1;
	let n = x(e);
	return n === "formdata" || n === "object" && O(e.toString) && e.toString() === "[object FormData]";
}, ue = S("URLSearchParams"), [de, fe, pe, me] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(S), he = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function L(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), w(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (E(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function ge(e, t) {
	if (E(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var R = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, _e = (e) => !T(e) && e !== R;
function ve(...e) {
	let { caseless: t, skipUndefined: n } = _e(this) && this || {}, r = {}, i = (e, i) => {
		if (i === "__proto__" || i === "constructor" || i === "prototype") return;
		let a = t && typeof i == "string" && ge(r, i) || i, o = v(r, a) ? r[a] : void 0;
		M(o) && M(e) ? r[a] = ve(o, e) : M(e) ? r[a] = ve({}, e) : w(e) ? r[a] = e.slice() : (!n || !T(e)) && (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || E(n) || (L(n, i), typeof n != "object" || w(n))) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			Ae.call(n, t) && i(n[t], t);
		}
	}
	return r;
}
var ye = (e, t, n, { allOwnKeys: r } = {}) => (L(t, (t, r) => {
	n && O(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: p(t, n),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : Object.defineProperty(e, r, {
		__proto__: null,
		value: t,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}, { allOwnKeys: r }), e), be = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), xe = (e, t, n, r) => {
	e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
		__proto__: null,
		value: e,
		writable: !0,
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "super", {
		__proto__: null,
		value: t.prototype
	}), n && Object.assign(e.prototype, n);
}, Se = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], (!r || r(o, e, t)) && !s[o] && (t[o] = e[o], s[o] = !0);
		e = n !== !1 && h(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, Ce = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, we = (e) => {
	if (!e) return null;
	if (w(e)) return e;
	let t = e.length;
	if (!k(t)) return null;
	let n = Array(t);
	for (; t-- > 0;) n[t] = e[t];
	return n;
}, Te = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && h(Uint8Array)), Ee = (e, t) => {
	let n = (e && e[g]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, De = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, Oe = S("HTMLFormElement"), ke = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: Ae } = Object.prototype, je = S("RegExp"), Me = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	L(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, Ne = (e) => {
	Me(e, (t, n) => {
		if (O(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		if (O(r)) {
			if (t.enumerable = !1, "writable" in t) {
				t.writable = !1;
				return;
			}
			t.set ||= () => {
				throw Error("Can not rewrite read-only method '" + n + "'");
			};
		}
	});
}, Pe = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return w(e) ? r(e) : r(String(e).split(t)), n;
}, Fe = () => {}, Ie = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Le(e) {
	return !!(e && O(e.append) && e[_] === "FormData" && e[g]);
}
var Re = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (A(e)) {
			if (t.has(e)) return;
			if (E(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r = w(e) ? [] : {};
				return L(e, (e, t) => {
					let i = n(e);
					!T(i) && (r[t] = i);
				}), t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, ze = S("AsyncFunction"), Be = (e) => e && (A(e) || O(e)) && O(e.then) && O(e.catch), Ve = ((e, t) => e ? setImmediate : t ? ((e, t) => (R.addEventListener("message", ({ source: n, data: r }) => {
	n === R && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), R.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", O(R.postMessage)), He = typeof queueMicrotask < "u" ? queueMicrotask.bind(R) : typeof process < "u" && process.nextTick || Ve, Ue = (e) => e != null && O(e[g]), z = {
	isArray: w,
	isArrayBuffer: D,
	isBuffer: E,
	isFormData: le,
	isArrayBufferView: ee,
	isString: te,
	isNumber: k,
	isBoolean: j,
	isObject: A,
	isPlainObject: M,
	isEmptyObject: N,
	isReadableStream: de,
	isRequest: fe,
	isResponse: pe,
	isHeaders: me,
	isUndefined: T,
	isDate: ne,
	isFile: P,
	isReactNativeBlob: F,
	isReactNative: re,
	isBlob: ie,
	isRegExp: je,
	isFunction: O,
	isStream: ae,
	isURLSearchParams: ue,
	isTypedArray: Te,
	isFileList: I,
	forEach: L,
	merge: ve,
	extend: ye,
	trim: he,
	stripBOM: be,
	inherits: xe,
	toFlatObject: Se,
	kindOf: x,
	kindOfTest: S,
	endsWith: Ce,
	toArray: we,
	forEachEntry: Ee,
	matchAll: De,
	isHTMLForm: Oe,
	hasOwnProperty: v,
	hasOwnProp: v,
	hasOwnInPrototypeChain: y,
	getSafeProp: b,
	reduceDescriptors: Me,
	freezeMethods: Ne,
	toObjectSet: Pe,
	toCamelCase: ke,
	noop: Fe,
	toFiniteNumber: Ie,
	findKey: ge,
	global: R,
	isContextDefined: _e,
	isSpecCompliantForm: Le,
	toJSONObject: Re,
	isAsyncFn: ze,
	isThenable: Be,
	setImmediate: Ve,
	asap: He,
	isIterable: Ue,
	isSafeIterable: (e) => e != null && y(e, g) && Ue(e)
}, We = z.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]), Ge = (e) => {
	let t = {}, n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim(), !(!n || t[n] && We[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
	}), t;
};
//#endregion
//#region node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function Ke(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
var qe = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Je = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function Ye(e, t) {
	return z.isArray(e) ? e.map((e) => Ye(e, t)) : Ke(String(e).replace(t, ""));
}
var Xe = (e) => Ye(e, qe), Ze = (e) => Ye(e, Je);
function Qe(e) {
	let t = Object.create(null);
	return z.forEach(e.toJSON(), (e, n) => {
		t[n] = Ze(e);
	}), t;
}
//#endregion
//#region node_modules/axios/lib/core/AxiosHeaders.js
var $e = Symbol("internals");
function B(e) {
	return e && String(e).trim().toLowerCase();
}
function et(e) {
	return e === !1 || e == null ? e : z.isArray(e) ? e.map(et) : Xe(String(e));
}
function tt(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var nt = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function rt(e, t, n, r, i) {
	if (z.isFunction(r)) return r.call(this, t, n);
	if (i && (t = n), z.isString(t)) {
		if (z.isString(r)) return t.indexOf(r) !== -1;
		if (z.isRegExp(r)) return r.test(t);
	}
}
function it(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function at(e, t) {
	let n = z.toCamelCase(" " + t);
	[
		"get",
		"set",
		"has"
	].forEach((r) => {
		Object.defineProperty(e, r + n, {
			__proto__: null,
			value: function(e, n, i) {
				return this[r].call(this, t, e, n, i);
			},
			configurable: !0
		});
	});
}
var V = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = B(t);
			if (!i) return;
			let a = z.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[a || t] = et(e));
		}
		let a = (e, t) => z.forEach(e, (e, n) => i(e, n, t));
		if (z.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (z.isString(e) && (e = e.trim()) && !nt(e)) a(Ge(e), t);
		else if (z.isObject(e) && z.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!z.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], z.hasOwnProp(n, i) ? (r = n[i], n[i] = z.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = B(e), e) {
			let n = z.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return tt(e);
				if (z.isFunction(t)) return t.call(this, e, n);
				if (z.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = B(e), e) {
			let n = z.findKey(this, e);
			return !!(n && this[n] !== void 0 && (!t || rt(this, this[n], n, t)));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = B(e), e) {
				let i = z.findKey(n, e);
				i && (!t || rt(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return z.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || rt(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = {};
		return z.forEach(this, (r, i) => {
			let a = z.findKey(n, i);
			if (a) {
				t[a] = et(r), delete t[i];
				return;
			}
			let o = e ? it(i) : String(i).trim();
			o !== i && delete t[i], t[o] = et(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return z.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && z.isArray(n) ? n.join(", ") : n);
		}), t;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join("\n");
	}
	getSetCookie() {
		return this.get("set-cookie") || [];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(e) {
		return e instanceof this ? e : new this(e);
	}
	static concat(e, ...t) {
		let n = new this(e);
		return t.forEach((e) => n.set(e)), n;
	}
	static accessor(e) {
		let t = (this[$e] = this[$e] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = B(e);
			t[r] || (at(n, e), t[r] = !0);
		}
		return z.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
V.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), z.reduceDescriptors(V.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), z.freezeMethods(V);
//#endregion
//#region node_modules/axios/lib/core/AxiosError.js
var ot = "[REDACTED ****]";
function st(e) {
	if (z.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (z.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function ct(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || z.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof V && (e = e.toJSON()), r.push(e);
		let t;
		if (z.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			z.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!z.isPlainObject(e) && st(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? ot : i(a);
				z.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
var H = class e extends Error {
	static from(t, n, r, i, a, o) {
		let s = new e(t.message, n || t.code, r, i, a);
		return Object.defineProperty(s, "cause", {
			__proto__: null,
			value: t,
			writable: !0,
			enumerable: !1,
			configurable: !0
		}), s.name = t.name, t.status != null && s.status == null && (s.status = t.status), o && Object.assign(s, o), s;
	}
	constructor(e, t, n, r, i) {
		super(e), Object.defineProperty(this, "message", {
			__proto__: null,
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		}), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status);
	}
	toJSON() {
		let e = this.config, t = e && z.hasOwnProp(e, "redact") ? e.redact : void 0, n = z.isArray(t) && t.length > 0 ? ct(e, t) : z.toJSONObject(e);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: n,
			code: this.code,
			status: this.status
		};
	}
};
H.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", H.ERR_BAD_OPTION = "ERR_BAD_OPTION", H.ECONNABORTED = "ECONNABORTED", H.ETIMEDOUT = "ETIMEDOUT", H.ECONNREFUSED = "ECONNREFUSED", H.ERR_NETWORK = "ERR_NETWORK", H.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", H.ERR_DEPRECATED = "ERR_DEPRECATED", H.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", H.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", H.ERR_CANCELED = "ERR_CANCELED", H.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", H.ERR_INVALID_URL = "ERR_INVALID_URL", H.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
function lt(e) {
	return z.isPlainObject(e) || z.isArray(e);
}
function ut(e) {
	return z.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function dt(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = ut(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function ft(e) {
	return z.isArray(e) && !e.some(lt);
}
var pt = z.toFlatObject(z, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function mt(e, t, n) {
	if (!z.isObject(e)) throw TypeError("target must be an object");
	t ||= new FormData(), n = z.toFlatObject(n, {
		metaTokens: !0,
		dots: !1,
		indexes: !1
	}, !1, function(e, t) {
		return !z.isUndefined(t[e]);
	});
	let r = n.metaTokens, i = n.visitor || m, a = n.dots, o = n.indexes, s = n.Blob || typeof Blob < "u" && Blob, c = n.maxDepth === void 0 ? 100 : n.maxDepth, l = s && z.isSpecCompliantForm(t), u = [];
	if (!z.isFunction(i)) throw TypeError("visitor must be a function");
	function d(e) {
		if (e === null) return "";
		if (z.isDate(e)) return e.toISOString();
		if (z.isBoolean(e)) return e.toString();
		if (!l && z.isBlob(e)) throw new H("Blob is not supported. Use a Buffer instead.");
		if (z.isArrayBuffer(e) || z.isTypedArray(e)) {
			if (l && typeof s == "function") return new s([e]);
			if (typeof Buffer < "u") return Buffer.from(e);
			throw new H("Blob is not supported. Use a Buffer instead.", H.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function f(e) {
		if (e > c) throw new H("Object is too deeply nested (" + e + " levels). Max depth: " + c, H.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function p(e, t) {
		if (c === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!z.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), f(t + n.length - 1), r;
		});
	}
	function m(e, n, i) {
		let s = e;
		if (z.isReactNative(t) && z.isReactNativeBlob(e)) return t.append(dt(i, n, a), d(e)), !1;
		if (e && !i && typeof e == "object") {
			if (z.endsWith(n, "{}")) n = r ? n : n.slice(0, -2), e = p(e, 1);
			else if (z.isArray(e) && ft(e) || (z.isFileList(e) || z.endsWith(n, "[]")) && (s = z.toArray(e))) return n = ut(n), s.forEach(function(e, r) {
				!(z.isUndefined(e) || e === null) && t.append(o === !0 ? dt([n], r, a) : o === null ? n : n + "[]", d(e));
			}), !1;
		}
		return lt(e) ? !0 : (t.append(dt(i, n, a), d(e)), !1);
	}
	let h = Object.assign(pt, {
		defaultVisitor: m,
		convertValue: d,
		isVisitable: lt
	});
	function g(e, n, r = 0) {
		if (!z.isUndefined(e)) {
			if (f(r), u.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			u.push(e), z.forEach(e, function(e, a) {
				(!(z.isUndefined(e) || e === null) && i.call(t, e, z.isString(a) ? a.trim() : a, n, h)) === !0 && g(e, n ? n.concat(a) : [a], r + 1);
			}), u.pop();
		}
	}
	if (!z.isObject(e)) throw TypeError("data must be an object");
	return g(e), t;
}
//#endregion
//#region node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function ht(e) {
	let t = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(e) {
		return t[e];
	});
}
function gt(e, t) {
	this._pairs = [], e && mt(e, this, t);
}
var _t = gt.prototype;
_t.append = function(e, t) {
	this._pairs.push([e, t]);
}, _t.toString = function(e) {
	let t = e ? (t) => e.call(this, t, ht) : ht;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
//#endregion
//#region node_modules/axios/lib/helpers/buildURL.js
function vt(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function yt(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = z.isFunction(n) ? { serialize: n } : n, i = z.getSafeProp(r, "encode") || vt, a = z.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : z.isURLSearchParams(t) ? t.toString() : new gt(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
//#endregion
//#region node_modules/axios/lib/core/InterceptorManager.js
var bt = class {
	constructor() {
		this.handlers = [];
	}
	use(e, t, n) {
		return this.handlers.push({
			fulfilled: e,
			rejected: t,
			synchronous: n ? n.synchronous : !1,
			runWhen: n ? n.runWhen : null
		}), this.handlers.length - 1;
	}
	eject(e) {
		this.handlers[e] && (this.handlers[e] = null);
	}
	clear() {
		this.handlers &&= [];
	}
	forEach(e) {
		z.forEach(this.handlers, function(t) {
			t !== null && e(t);
		});
	}
}, xt = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0
}, St = {
	isBrowser: !0,
	classes: {
		URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : gt,
		FormData: typeof FormData < "u" ? FormData : null,
		Blob: typeof Blob < "u" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
}, Ct = /* @__PURE__ */ s({
	hasBrowserEnv: () => wt,
	hasStandardBrowserEnv: () => Et,
	hasStandardBrowserWebWorkerEnv: () => Dt,
	navigator: () => Tt,
	origin: () => Ot
}), wt = typeof window < "u" && typeof document < "u", Tt = typeof navigator == "object" && navigator || void 0, Et = wt && (!Tt || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(Tt.product) < 0), Dt = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ot = wt && window.location.href || "http://localhost", U = {
	...Ct,
	...St
};
//#endregion
//#region node_modules/axios/lib/helpers/toURLEncodedForm.js
function kt(e, t) {
	return mt(e, new U.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return U.isNode && z.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/formDataToJSON.js
var At = 100;
function jt(e) {
	if (e > At) throw new H("FormData field is too deeply nested (" + e + " levels). Max depth: " + At, H.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function Mt(e) {
	let t = [], n = /\w+|\[(\w*)]/g, r;
	for (; (r = n.exec(e)) !== null;) jt(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function Nt(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function Pt(e) {
	function t(e, n, r, i) {
		jt(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && z.isArray(r) ? r.length : a, s ? (z.hasOwnProp(r, a) ? r[a] = z.isArray(r[a]) ? r[a].concat(n) : [r[a], n] : r[a] = n, !o) : ((!z.hasOwnProp(r, a) || !z.isObject(r[a])) && (r[a] = []), t(e, n, r[a], i) && z.isArray(r[a]) && (r[a] = Nt(r[a])), !o);
	}
	if (z.isFormData(e) && z.isFunction(e.entries)) {
		let n = {};
		return z.forEachEntry(e, (e, r) => {
			t(Mt(e), r, n, 0);
		}), n;
	}
	return null;
}
//#endregion
//#region node_modules/axios/lib/defaults/index.js
var W = (e, t) => e != null && z.hasOwnProp(e, t) ? e[t] : void 0;
function Ft(e, t, n) {
	if (z.isString(e)) try {
		return (t || JSON.parse)(e), z.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var It = {
	transitional: xt,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = z.isObject(e);
		if (i && z.isHTMLForm(e) && (e = new FormData(e)), z.isFormData(e)) return r ? JSON.stringify(Pt(e)) : e;
		if (z.isArrayBuffer(e) || z.isBuffer(e) || z.isStream(e) || z.isFile(e) || z.isBlob(e) || z.isReadableStream(e)) return e;
		if (z.isArrayBufferView(e)) return e.buffer;
		if (z.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = W(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return kt(e, t).toString();
			if ((a = z.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = W(this, "env"), r = n && n.FormData;
				return mt(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), Ft(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = W(this, "transitional") || It.transitional, n = t && t.forcedJSONParsing, r = W(this, "responseType"), i = r === "json";
		if (z.isResponse(e) || z.isReadableStream(e)) return e;
		if (e && z.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, W(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? H.from(e, H.ERR_BAD_RESPONSE, this, null, W(this, "response")) : e;
			}
		}
		return e;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: U.classes.FormData,
		Blob: U.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
z.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch",
	"query"
], (e) => {
	It.headers[e] = {};
});
//#endregion
//#region node_modules/axios/lib/core/transformData.js
function Lt(e, t) {
	let n = this || It, r = t || n, i = V.from(r.headers), a = r.data;
	return z.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
//#endregion
//#region node_modules/axios/lib/cancel/isCancel.js
function Rt(e) {
	return !!(e && e.__CANCEL__);
}
//#endregion
//#region node_modules/axios/lib/cancel/CanceledError.js
var zt = class extends H {
	constructor(e, t, n) {
		super(e ?? "canceled", H.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
//#endregion
//#region node_modules/axios/lib/core/settle.js
function Bt(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new H("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? H.ERR_BAD_REQUEST : H.ERR_BAD_RESPONSE, n.config, n.request, n));
}
//#endregion
//#region node_modules/axios/lib/helpers/parseProtocol.js
function Vt(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1] || "";
}
//#endregion
//#region node_modules/axios/lib/helpers/speedometer.js
function Ht(e, t) {
	e ||= 10;
	let n = Array(e), r = Array(e), i = 0, a = 0, o;
	return t = t === void 0 ? 1e3 : t, function(s) {
		let c = Date.now(), l = r[a];
		o ||= c, n[i] = s, r[i] = c;
		let u = a, d = 0;
		for (; u !== i;) d += n[u++], u %= e;
		if (i = (i + 1) % e, i === a && (a = (a + 1) % e), c - o < t) return;
		let f = l && c - l;
		return f ? Math.round(d * 1e3 / f) : void 0;
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/throttle.js
function Ut(e, t) {
	let n = 0, r = 1e3 / t, i, a, o = (t, r = Date.now()) => {
		n = r, i = null, a &&= (clearTimeout(a), null), e(...t);
	};
	return [(...e) => {
		let t = Date.now(), s = t - n;
		s >= r ? o(e, t) : (i = e, a ||= setTimeout(() => {
			a = null, o(i);
		}, r - s));
	}, () => i && o(i)];
}
//#endregion
//#region node_modules/axios/lib/helpers/progressEventReducer.js
var Wt = (e, t, n = 3) => {
	let r = 0, i = Ht(50, 250);
	return Ut((n) => {
		if (!n || typeof n.loaded != "number") return;
		let a = n.loaded, o = n.lengthComputable ? n.total : void 0, s = o == null ? a : Math.min(a, o), c = Math.max(0, s - r), l = i(c);
		r = Math.max(r, s), e({
			loaded: s,
			total: o,
			progress: o ? s / o : void 0,
			bytes: c,
			rate: l || void 0,
			estimated: l && o ? (o - s) / l : void 0,
			event: n,
			lengthComputable: o != null,
			[t ? "download" : "upload"]: !0
		});
	}, n);
}, Gt = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, Kt = (e) => (...t) => z.asap(() => e(...t)), qt = U.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, U.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(U.origin), U.navigator && /(msie|trident)/i.test(U.navigator.userAgent)) : () => !0, Jt = U.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		z.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), z.isString(r) && s.push(`path=${r}`), z.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), z.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
	},
	read(e) {
		if (typeof document > "u") return null;
		let t = document.cookie.split(";");
		for (let n = 0; n < t.length; n++) {
			let r = t[n].replace(/^\s+/, ""), i = r.indexOf("=");
			if (i !== -1 && r.slice(0, i) === e) try {
				return decodeURIComponent(r.slice(i + 1));
			} catch {
				return r.slice(i + 1);
			}
		}
		return null;
	},
	remove(e) {
		this.write(e, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
//#endregion
//#region node_modules/axios/lib/helpers/isAbsoluteURL.js
function Yt(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
//#endregion
//#region node_modules/axios/lib/helpers/combineURLs.js
function Xt(e, t) {
	return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
//#endregion
//#region node_modules/axios/lib/core/buildFullPath.js
var Zt = /^https?:(?!\/\/)/i, Qt = /[\t\n\r]/g;
function $t(e) {
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t);
}
function en(e) {
	return $t(e).replace(Qt, "");
}
function tn(e, t) {
	if (typeof e == "string" && Zt.test(en(e))) throw new H("Invalid URL: missing \"//\" after protocol", H.ERR_INVALID_URL, t);
}
function nn(e, t, n, r) {
	tn(t, r);
	let i = !Yt(t);
	return e && (i || n === !1) ? (tn(e, r), Xt(e, t)) : t;
}
//#endregion
//#region node_modules/axios/lib/core/mergeConfig.js
var rn = (e) => e instanceof V ? { ...e } : e;
function G(e, t) {
	e ||= {}, t ||= {};
	let n = Object.create(null);
	Object.defineProperty(n, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: !1,
		writable: !0,
		configurable: !0
	});
	function r(e, t, n, r) {
		return z.isPlainObject(e) && z.isPlainObject(t) ? z.merge.call({ caseless: r }, e, t) : z.isPlainObject(t) ? z.merge({}, t) : z.isArray(t) ? t.slice() : t;
	}
	function i(e, t, n, i) {
		if (!z.isUndefined(t)) return r(e, t, n, i);
		if (!z.isUndefined(e)) return r(void 0, e, n, i);
	}
	function a(e, t) {
		if (!z.isUndefined(t)) return r(void 0, t);
	}
	function o(e, t) {
		if (!z.isUndefined(t)) return r(void 0, t);
		if (!z.isUndefined(e)) return r(void 0, e);
	}
	function s(n) {
		let r = z.hasOwnProp(t, "transitional") ? t.transitional : void 0;
		if (!z.isUndefined(r)) if (z.isPlainObject(r)) {
			if (z.hasOwnProp(r, n)) return r[n];
		} else return;
		let i = z.hasOwnProp(e, "transitional") ? e.transitional : void 0;
		if (z.isPlainObject(i) && z.hasOwnProp(i, n)) return i[n];
	}
	function c(n, i, a) {
		if (z.hasOwnProp(t, a)) return r(n, i);
		if (z.hasOwnProp(e, a)) return r(void 0, n);
	}
	let l = {
		url: a,
		method: a,
		data: a,
		baseURL: o,
		transformRequest: o,
		transformResponse: o,
		paramsSerializer: o,
		timeout: o,
		timeoutMessage: o,
		withCredentials: o,
		withXSRFToken: o,
		adapter: o,
		responseType: o,
		xsrfCookieName: o,
		xsrfHeaderName: o,
		onUploadProgress: o,
		onDownloadProgress: o,
		decompress: o,
		maxContentLength: o,
		maxBodyLength: o,
		beforeRedirect: o,
		transport: o,
		httpAgent: o,
		httpsAgent: o,
		cancelToken: o,
		socketPath: o,
		allowedSocketPaths: o,
		responseEncoding: o,
		validateStatus: c,
		headers: (e, t, n) => i(rn(e), rn(t), n, !0)
	};
	return z.forEach(Object.keys({
		...e,
		...t
	}), function(r) {
		if (r === "__proto__" || r === "constructor" || r === "prototype") return;
		let a = z.hasOwnProp(l, r) ? l[r] : i, o = a(z.hasOwnProp(e, r) ? e[r] : void 0, z.hasOwnProp(t, r) ? t[r] : void 0, r);
		z.isUndefined(o) && a !== c || (n[r] = o);
	}), z.hasOwnProp(t, "validateStatus") && z.isUndefined(t.validateStatus) && s("validateStatusUndefinedResolves") === !1 && (z.hasOwnProp(e, "validateStatus") ? n.validateStatus = r(void 0, e.validateStatus) : delete n.validateStatus), n;
}
//#endregion
//#region node_modules/axios/lib/helpers/resolveConfig.js
var an = ["content-type", "content-length"];
function on(e, t, n) {
	if (n !== "content-only") {
		e.set(t);
		return;
	}
	Object.entries(t || {}).forEach(([t, n]) => {
		an.includes(t.toLowerCase()) && e.set(t, n);
	});
}
var sn = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
function cn(e) {
	let t = G({}, e), n = (e) => z.hasOwnProp(t, e) ? t[e] : void 0, r = n("data"), i = n("withXSRFToken"), a = n("xsrfHeaderName"), o = n("xsrfCookieName"), s = n("headers"), c = n("auth"), l = n("baseURL"), u = n("allowAbsoluteUrls"), d = n("url");
	if (t.headers = s = V.from(s), t.url = yt(nn(l, d, u, t), n("params"), n("paramsSerializer")), c) {
		let t = z.getSafeProp(c, "username") || "", n = z.getSafeProp(c, "password") || "";
		try {
			s.set("Authorization", "Basic " + btoa(t + ":" + (n ? sn(n) : "")));
		} catch (t) {
			throw H.from(t, H.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (z.isFormData(r) && (U.hasStandardBrowserEnv || U.hasStandardBrowserWebWorkerEnv || z.isReactNative(r) ? s.setContentType(void 0) : z.isFunction(r.getHeaders) && on(s, r.getHeaders(), n("formDataHeaderPolicy"))), U.hasStandardBrowserEnv && (z.isFunction(i) && (i = i(t)), i === !0 || i == null && qt(t.url))) {
		let e = a && o && Jt.read(o);
		e && s.set(a, e);
	}
	return t;
}
var ln = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r = cn(e), i = r.data, a = V.from(r.headers).normalize(), { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r, l, u, d, f, p;
		function m() {
			f && f(), p && p(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
		}
		let h = new XMLHttpRequest();
		h.open(r.method.toUpperCase(), r.url, !0), h.timeout = r.timeout;
		function g() {
			if (!h) return;
			let r = V.from("getAllResponseHeaders" in h && h.getAllResponseHeaders());
			Bt(function(e) {
				t(e), m();
			}, function(e) {
				n(e), m();
			}, {
				data: !o || o === "text" || o === "json" ? h.responseText : h.response,
				status: h.status,
				statusText: h.statusText,
				headers: r,
				config: e,
				request: h
			}), h = null;
		}
		"onloadend" in h ? h.onloadend = g : h.onreadystatechange = function() {
			!h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.startsWith("file:")) || setTimeout(g);
		}, h.onabort = function() {
			h &&= (n(new H("Request aborted", H.ECONNABORTED, e, h)), m(), null);
		}, h.onerror = function(t) {
			let r = new H(t && t.message ? t.message : "Network Error", H.ERR_NETWORK, e, h);
			r.event = t || null, n(r), m(), h = null;
		}, h.ontimeout = function() {
			let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded", i = r.transitional || xt;
			r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new H(t, i.clarifyTimeoutError ? H.ETIMEDOUT : H.ECONNABORTED, e, h)), m(), h = null;
		}, i === void 0 && a.setContentType(null), "setRequestHeader" in h && z.forEach(Qe(a), function(e, t) {
			h.setRequestHeader(t, e);
		}), z.isUndefined(r.withCredentials) || (h.withCredentials = !!r.withCredentials), o && o !== "json" && (h.responseType = r.responseType), c && ([d, p] = Wt(c, !0), h.addEventListener("progress", d)), s && h.upload && ([u, f] = Wt(s), h.upload.addEventListener("progress", u), h.upload.addEventListener("loadend", f)), (r.cancelToken || r.signal) && (l = (t) => {
			h &&= (n(!t || t.type ? new zt(null, e, h) : t), h.abort(), m(), null);
		}, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
		let _ = Vt(r.url);
		if (_ && !U.protocols.includes(_)) {
			n(new H("Unsupported protocol " + _ + ":", H.ERR_BAD_REQUEST, e)), m();
			return;
		}
		h.send(i || null);
	});
}, un = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof H ? t : new zt(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new H(`timeout of ${t}ms exceeded`, H.ETIMEDOUT));
	}, t), o = () => {
		e &&= (a && clearTimeout(a), a = null, e.forEach((e) => {
			e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener("abort", i);
		}), null);
	};
	e.forEach((e) => e.addEventListener("abort", i, { once: !0 }));
	let { signal: s } = n;
	return s.unsubscribe = () => z.asap(o), s;
}, dn = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, fn = async function* (e, t) {
	for await (let n of pn(e)) yield* dn(n, t);
}, pn = async function* (e) {
	if (e[Symbol.asyncIterator]) {
		yield* e;
		return;
	}
	let t = e.getReader();
	try {
		for (;;) {
			let { done: e, value: n } = await t.read();
			if (e) break;
			yield n;
		}
	} finally {
		await t.cancel();
	}
}, mn = (e, t, n, r) => {
	let i = fn(e, t), a = 0, o, s = (e) => {
		o || (o = !0, r && r(e));
	};
	return new ReadableStream({
		async pull(e) {
			try {
				let { done: t, value: r } = await i.next();
				if (t) {
					s(), e.close();
					return;
				}
				let o = r.byteLength;
				n && n(a += o), e.enqueue(new Uint8Array(r));
			} catch (e) {
				throw s(e), e;
			}
		},
		cancel(e) {
			return s(e), i.return();
		}
	}, { highWaterMark: 2 });
}, hn = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, gn = (e, t, n) => t + 2 < n && hn(e.charCodeAt(t + 1)) && hn(e.charCodeAt(t + 2));
function _n(e) {
	if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
	let t = e.indexOf(",");
	if (t < 0) return 0;
	let n = e.slice(5, t), r = e.slice(t + 1);
	if (/;base64/i.test(n)) {
		let e = r.length, t = r.length;
		for (let n = 0; n < t; n++) if (r.charCodeAt(n) === 37 && n + 2 < t) {
			let t = r.charCodeAt(n + 1), i = r.charCodeAt(n + 2);
			hn(t) && hn(i) && (e -= 2, n += 2);
		}
		let n = 0, i = t - 1, a = (e) => e >= 2 && r.charCodeAt(e - 2) === 37 && r.charCodeAt(e - 1) === 51 && (r.charCodeAt(e) === 68 || r.charCodeAt(e) === 100);
		i >= 0 && (r.charCodeAt(i) === 61 ? (n++, i--) : a(i) && (n++, i -= 3)), n === 1 && i >= 0 && (r.charCodeAt(i) === 61 || a(i)) && n++;
		let o = Math.floor(e / 4) * 3 - (n || 0);
		return o > 0 ? o : 0;
	}
	let i = 0;
	for (let e = 0, t = r.length; e < t; e++) {
		let n = r.charCodeAt(e);
		if (n === 37 && gn(r, e, t)) i += 1, e += 2;
		else if (n < 128) i += 1;
		else if (n < 2048) i += 2;
		else if (n >= 55296 && n <= 56319 && e + 1 < t) {
			let t = r.charCodeAt(e + 1);
			t >= 56320 && t <= 57343 ? (i += 4, e++) : i += 3;
		} else i += 3;
	}
	return i;
}
//#endregion
//#region node_modules/axios/lib/env/data.js
var vn = "1.18.1", yn = 64 * 1024, { isFunction: bn } = z, xn = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), Sn = (e) => {
	if (!z.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, Cn = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, wn = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, Tn = (e) => {
	let t = z.global !== void 0 && z.global !== null ? z.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = z.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response
	}, e);
	let { fetch: i, Request: a, Response: o } = e, s = i ? bn(i) : typeof fetch == "function", c = bn(a), l = bn(o);
	if (!s) return !1;
	let u = s && bn(n), d = s && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), f = c && u && Cn(() => {
		let e = !1, t = new a(U.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), p = l && u && Cn(() => z.isReadableStream(new o("").body)), m = { stream: p && ((e) => e.body) };
	s && [
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((e) => {
		!m[e] && (m[e] = (t, n) => {
			let r = t && t[e];
			if (r) return r.call(t);
			throw new H(`Response type '${e}' is not supported`, H.ERR_NOT_SUPPORT, n);
		});
	});
	let h = async (e) => {
		if (e == null) return 0;
		if (z.isBlob(e)) return e.size;
		if (z.isSpecCompliantForm(e)) return (await new a(U.origin, {
			method: "POST",
			body: e
		}).arrayBuffer()).byteLength;
		if (z.isArrayBufferView(e) || z.isArrayBuffer(e)) return e.byteLength;
		if (z.isURLSearchParams(e) && (e += ""), z.isString(e)) return (await d(e)).byteLength;
	}, g = async (e, t) => z.toFiniteNumber(e.getContentLength()) ?? h(t);
	return async (e) => {
		let { url: t, method: n, data: s, signal: l, cancelToken: d, timeout: _, onDownloadProgress: v, onUploadProgress: y, responseType: b, headers: x, withCredentials: S = "same-origin", fetchOptions: C, maxContentLength: w, maxBodyLength: T } = cn(e), E = z.isNumber(w) && w > -1, D = z.isNumber(T) && T > -1, ee = (t) => z.hasOwnProp(e, t) ? e[t] : void 0, te = i || fetch;
		b = b ? (b + "").toLowerCase() : "text";
		let O = un([l, d && d.toAbortSignal()], _), k = null, A = O && O.unsubscribe && (() => {
			O.unsubscribe();
		}), j, M = null, N = () => new H("Request body larger than maxBodyLength limit", H.ERR_BAD_REQUEST, e, k);
		try {
			let i, l = ee("auth");
			if (l && (i = {
				username: z.getSafeProp(l, "username") || "",
				password: z.getSafeProp(l, "password") || ""
			}), wn(t)) {
				let e = new URL(t, U.origin);
				!i && (e.username || e.password) && (i = {
					username: Sn(e.username),
					password: Sn(e.password)
				}), (e.username || e.password) && (e.username = "", e.password = "", t = e.href);
			}
			if (i && (x.delete("authorization"), x.set("Authorization", "Basic " + btoa(xn((i.username || "") + ":" + (i.password || ""))))), E && typeof t == "string" && t.startsWith("data:") && _n(t) > w) throw new H("maxContentLength size of " + w + " exceeded", H.ERR_BAD_RESPONSE, e, k);
			if (D && n !== "get" && n !== "head") {
				let e = await h(s);
				if (typeof e == "number" && isFinite(e) && (j = e, e > T)) throw N();
			}
			let d = D && (z.isReadableStream(s) || z.isStream(s)), _ = (e, t, n) => mn(e, yn, (e) => {
				if (D && e > T) throw M = N();
				t && t(e);
			}, n);
			if (f && n !== "get" && n !== "head" && (y || d)) {
				if (j ??= await g(x, s), j !== 0 || d) {
					let e = new a(t, {
						method: "POST",
						body: s,
						duplex: "half"
					}), n;
					if (z.isFormData(s) && (n = e.headers.get("content-type")) && x.setContentType(n), e.body) {
						let [t, n] = y && Gt(j, Wt(Kt(y))) || [];
						s = _(e.body, t, n);
					}
				}
			} else if (d && !c && u && n !== "get" && n !== "head") s = _(s);
			else if (d && c && !f && n !== "get" && n !== "head") throw new H("Stream request bodies are not supported by the current fetch implementation", H.ERR_NOT_SUPPORT, e, k);
			z.isString(S) || (S = S ? "include" : "omit");
			let ne = c && "credentials" in a.prototype;
			if (z.isFormData(s)) {
				let e = x.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && x.delete("content-type");
			}
			x.set("User-Agent", "axios/" + vn, !1);
			let P = {
				...C,
				signal: O,
				method: n.toUpperCase(),
				headers: Qe(x.normalize()),
				body: s,
				duplex: "half",
				credentials: ne ? S : void 0
			};
			k = c && new a(t, P);
			let F = await (c ? te(k, C) : te(t, P)), re = V.from(F.headers);
			if (E) {
				let t = z.toFiniteNumber(re.getContentLength());
				if (t != null && t > w) throw new H("maxContentLength size of " + w + " exceeded", H.ERR_BAD_RESPONSE, e, k);
			}
			let ie = p && (b === "stream" || b === "response");
			if (p && F.body && (v || E || ie && A)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = F[e];
				});
				let n = z.toFiniteNumber(re.getContentLength()), [r, i] = v && Gt(n, Wt(Kt(v), !0)) || [], a = 0;
				F = new o(mn(F.body, yn, (t) => {
					if (E && (a = t, a > w)) throw new H("maxContentLength size of " + w + " exceeded", H.ERR_BAD_RESPONSE, e, k);
					r && r(t);
				}, () => {
					i && i(), A && A();
				}), t);
			}
			b ||= "text";
			let I = await m[z.findKey(m, b) || "text"](F, e);
			if (E && !p && !ie) {
				let t;
				if (I != null && (typeof I.byteLength == "number" ? t = I.byteLength : typeof I.size == "number" ? t = I.size : typeof I == "string" && (t = typeof r == "function" ? new r().encode(I).byteLength : I.length)), typeof t == "number" && t > w) throw new H("maxContentLength size of " + w + " exceeded", H.ERR_BAD_RESPONSE, e, k);
			}
			return !ie && A && A(), await new Promise((t, n) => {
				Bt(t, n, {
					data: I,
					headers: V.from(F.headers),
					status: F.status,
					statusText: F.statusText,
					config: e,
					request: k
				});
			});
		} catch (t) {
			if (A && A(), O && O.aborted && O.reason instanceof H) {
				let n = O.reason;
				throw n.config = e, k && (n.request = k), t !== n && Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			if (M) throw k && !M.request && (M.request = k), M;
			if (t instanceof H) throw k && !t.request && (t.request = k), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new H("Network Error", H.ERR_NETWORK, e, k, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw H.from(t, t && t.code, e, k, t && t.response);
		}
	};
}, En = /* @__PURE__ */ new Map(), Dn = (e) => {
	let t = e && e.env || {}, { fetch: n, Request: r, Response: i } = t, a = [
		r,
		i,
		n
	], o = a.length, s, c, l = En;
	for (; o--;) s = a[o], c = l.get(s), c === void 0 && l.set(s, c = o ? /* @__PURE__ */ new Map() : Tn(t)), l = c;
	return c;
};
Dn();
//#endregion
//#region node_modules/axios/lib/adapters/adapters.js
var On = {
	http: null,
	xhr: ln,
	fetch: { get: Dn }
};
z.forEach(On, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", {
				__proto__: null,
				value: t
			});
		} catch {}
		Object.defineProperty(e, "adapterName", {
			__proto__: null,
			value: t
		});
	}
});
var kn = (e) => `- ${e}`, An = (e) => z.isFunction(e) || e === null || e === !1;
function jn(e, t) {
	e = z.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !An(r) && (i = On[(n = String(r)).toLowerCase()], i === void 0)) throw new H(`Unknown adapter '${n}'`);
		if (i && (z.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new H("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(kn).join("\n") : " " + kn(e[0]) : "as no adapter specified"), H.ERR_NOT_SUPPORT);
	}
	return i;
}
var Mn = {
	getAdapter: jn,
	adapters: On
};
//#endregion
//#region node_modules/axios/lib/core/dispatchRequest.js
function Nn(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new zt(null, e);
}
function Pn(e) {
	return Nn(e), e.headers = V.from(e.headers), e.data = Lt.call(e, e.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Mn.getAdapter(e.adapter || It.adapter, e)(e).then(function(t) {
		Nn(e), e.response = t;
		try {
			t.data = Lt.call(e, e.transformResponse, t);
		} finally {
			delete e.response;
		}
		return t.headers = V.from(t.headers), t;
	}, function(t) {
		if (!Rt(t) && (Nn(e), t && t.response)) {
			e.response = t.response;
			try {
				t.response.data = Lt.call(e, e.transformResponse, t.response);
			} finally {
				delete e.response;
			}
			t.response.headers = V.from(t.response.headers);
		}
		return Promise.reject(t);
	});
}
//#endregion
//#region node_modules/axios/lib/helpers/validator.js
var Fn = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	Fn[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var In = {};
Fn.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + vn + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new H(r(i, " has been removed" + (t ? " in " + t : "")), H.ERR_DEPRECATED);
		return t && !In[i] && (In[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, Fn.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function Ln(e, t, n) {
	if (typeof e != "object" || !e) throw new H("options must be an object", H.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new H("option " + a + " must be " + n, H.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (n !== !0) throw new H("Unknown option " + a, H.ERR_BAD_OPTION);
	}
}
var Rn = {
	assertOptions: Ln,
	validators: Fn
}, K = Rn.validators, q = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new bt(),
			response: new bt()
		};
	}
	async request(e, t) {
		try {
			return await this._request(e, t);
		} catch (e) {
			if (e instanceof Error) {
				let t = {};
				Error.captureStackTrace ? Error.captureStackTrace(t) : t = /* @__PURE__ */ Error();
				let n = (() => {
					if (!t.stack) return "";
					let e = t.stack.indexOf("\n");
					return e === -1 ? "" : t.stack.slice(e + 1);
				})();
				try {
					if (!e.stack) e.stack = n;
					else if (n) {
						let t = n.indexOf("\n"), r = t === -1 ? -1 : n.indexOf("\n", t + 1), i = r === -1 ? "" : n.slice(r + 1);
						String(e.stack).endsWith(i) || (e.stack += "\n" + n);
					}
				} catch {}
			}
			throw e;
		}
	}
	_request(e, t) {
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = G(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && Rn.assertOptions(n, {
			silentJSONParsing: K.transitional(K.boolean),
			forcedJSONParsing: K.transitional(K.boolean),
			clarifyTimeoutError: K.transitional(K.boolean),
			legacyInterceptorReqResOrdering: K.transitional(K.boolean),
			advertiseZstdAcceptEncoding: K.transitional(K.boolean),
			validateStatusUndefinedResolves: K.transitional(K.boolean)
		}, !1), r != null && (z.isFunction(r) ? t.paramsSerializer = { serialize: r } : Rn.assertOptions(r, {
			encode: K.function,
			serialize: K.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls === void 0 ? t.allowAbsoluteUrls = !0 : t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls), Rn.assertOptions(t, {
			baseUrl: K.spelling("baseURL"),
			withXsrfToken: K.spelling("withXSRFToken")
		}, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
		let a = i && z.merge(i.common, i[t.method]);
		i && z.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"query",
			"common"
		], (e) => {
			delete i[e];
		}), t.headers = V.concat(a, i);
		let o = [], s = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			s &&= e.synchronous;
			let n = t.transitional || xt;
			n && n.legacyInterceptorReqResOrdering ? o.unshift(e.fulfilled, e.rejected) : o.push(e.fulfilled, e.rejected);
		});
		let c = [];
		this.interceptors.response.forEach(function(e) {
			c.push(e.fulfilled, e.rejected);
		});
		let l, u = 0, d;
		if (!s) {
			let e = [Pn.bind(this), void 0];
			for (e.unshift(...o), e.push(...c), d = e.length, l = Promise.resolve(t); u < d;) l = l.then(e[u++], e[u++]);
			return l;
		}
		d = o.length;
		let f = t;
		for (; u < d;) {
			let e = o[u++], t = o[u++];
			try {
				f = e(f);
			} catch (e) {
				t.call(this, e);
				break;
			}
		}
		try {
			l = Pn.call(this, f);
		} catch (e) {
			return Promise.reject(e);
		}
		for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
		return l;
	}
	getUri(e) {
		return e = G(this.defaults, e), yt(nn(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
z.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	q.prototype[e] = function(t, n) {
		return this.request(G(n || {}, {
			method: e,
			url: t,
			data: n && z.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), z.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return function(n, r, i) {
			return this.request(G(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	q.prototype[e] = t(), e !== "query" && (q.prototype[e + "Form"] = t(!0));
});
//#endregion
//#region node_modules/axios/lib/cancel/CancelToken.js
var zn = class e {
	constructor(e) {
		if (typeof e != "function") throw TypeError("executor must be a function.");
		let t;
		this.promise = new Promise(function(e) {
			t = e;
		});
		let n = this;
		this.promise.then((e) => {
			if (!n._listeners) return;
			let t = n._listeners.length;
			for (; t-- > 0;) n._listeners[t](e);
			n._listeners = null;
		}), this.promise.then = (e) => {
			let t, r = new Promise((e) => {
				n.subscribe(e), t = e;
			}).then(e);
			return r.cancel = function() {
				n.unsubscribe(t);
			}, r;
		}, e(function(e, r, i) {
			n.reason || (n.reason = new zt(e, r, i), t(n.reason));
		});
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(e) {
		if (this.reason) {
			e(this.reason);
			return;
		}
		this._listeners ? this._listeners.push(e) : this._listeners = [e];
	}
	unsubscribe(e) {
		if (!this._listeners) return;
		let t = this._listeners.indexOf(e);
		t !== -1 && this._listeners.splice(t, 1);
	}
	toAbortSignal() {
		let e = new AbortController(), t = (t) => {
			e.abort(t);
		};
		return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
	}
	static source() {
		let t;
		return {
			token: new e(function(e) {
				t = e;
			}),
			cancel: t
		};
	}
};
//#endregion
//#region node_modules/axios/lib/helpers/spread.js
function Bn(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
//#endregion
//#region node_modules/axios/lib/helpers/isAxiosError.js
function Vn(e) {
	return z.isObject(e) && e.isAxiosError === !0;
}
//#endregion
//#region node_modules/axios/lib/helpers/HttpStatusCode.js
var Hn = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(Hn).forEach(([e, t]) => {
	Hn[t] = e;
});
//#endregion
//#region node_modules/axios/lib/axios.js
function Un(e) {
	let t = new q(e), n = p(q.prototype.request, t);
	return z.extend(n, q.prototype, t, { allOwnKeys: !0 }), z.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return Un(G(e, t));
	}, n;
}
var J = Un(It);
J.Axios = q, J.CanceledError = zt, J.CancelToken = zn, J.isCancel = Rt, J.VERSION = vn, J.toFormData = mt, J.AxiosError = H, J.Cancel = J.CanceledError, J.all = function(e) {
	return Promise.all(e);
}, J.spread = Bn, J.isAxiosError = Vn, J.mergeConfig = G, J.AxiosHeaders = V, J.formToJSON = (e) => Pt(z.isHTMLForm(e) ? new FormData(e) : e), J.getAdapter = Mn.getAdapter, J.HttpStatusCode = Hn, J.default = J;
//#endregion
//#region src/services/api.ts
var Wn = "http://localhost:8087/api", Y = J.create({
	baseURL: Wn,
	headers: { "Content-Type": "application/json" }
});
Y.interceptors.request.use((e) => {
	let t = localStorage.getItem("deporvida-token");
	return t && (e.headers.Authorization = `Bearer ${t}`), e;
}), Y.interceptors.response.use((e) => e, (e) => (e.response?.status === 401 && (localStorage.removeItem("deporvida-token"), window.dispatchEvent(new CustomEvent("auth:unauthorized"))), Promise.reject(e)));
//#endregion
//#region src/services/authService.ts
var Gn = {
	login: (e) => Y.post("/auth/login", e),
	register: (e) => Y.post("/auth/register", e),
	me: () => Y.get("/auth/me")
}, Kn = {
	getAll: (e) => Y.get("/libros", { params: e }),
	getById: (e) => Y.get(`/libros/${e}`),
	search: (e, t) => Y.get("/libros/search", { params: {
		keyword: e,
		...t
	} }),
	getByCategoria: (e, t) => Y.get(`/libros/categoria/${e}`, { params: t }),
	getByAutor: (e, t) => Y.get(`/libros/autor/${e}`, { params: t }),
	getDestacados: () => Y.get("/libros/destacado"),
	getMasVendidos: () => Y.get("/libros/masVendidos"),
	getTopRated: () => Y.get("/libros/top-rated"),
	toggleActivo: (e) => Y.put(`/libros/${e}/toggle-activo`),
	toggleDestacado: (e) => Y.put(`/libros/${e}/toggle-destacado`),
	toggleMasVendido: (e) => Y.put(`/libros/${e}/toggle-masVendido`)
}, X = {
	getCarrito: () => Y.get("/carrito"),
	addItem: (e) => Y.post("/carrito/items", e),
	updateItem: (e, t) => Y.put(`/carrito/items/${e}`, null, { params: { cantidad: t } }),
	removeItem: (e) => Y.delete(`/carrito/items/${e}`),
	clearCarrito: () => Y.delete("/carrito")
}, qn = (/* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.StompJs = {}));
	})(e, (function(e) {
		function t(e, t) {
			e.terminate = function() {
				let n = () => {};
				this.onerror = n, this.onmessage = n, this.onopen = n;
				let r = /* @__PURE__ */ new Date(), i = Math.random().toString().substring(2, 8), a = this.onclose;
				this.onclose = (e) => {
					let n = (/* @__PURE__ */ new Date()).getTime() - r.getTime();
					t(`Discarded socket (#${i})  closed after ${n}ms, with code/reason: ${e.code}/${e.reason}`);
				}, this.close(), a?.call(e, {
					code: 4001,
					reason: `Quick discarding socket (#${i}) without waiting for the shutdown sequence.`,
					wasClean: !1
				});
			};
		}
		let n = {
			LF: "\n",
			NULL: "\0"
		};
		class r {
			get body() {
				return !this._body && this.isBinaryBody && (this._body = new TextDecoder().decode(this._binaryBody)), this._body || "";
			}
			get binaryBody() {
				return !this._binaryBody && !this.isBinaryBody && (this._binaryBody = new TextEncoder().encode(this._body)), this._binaryBody;
			}
			constructor(e) {
				let { command: t, headers: n, body: r, binaryBody: i, escapeHeaderValues: a, skipContentLengthHeader: o } = e;
				this.command = t, this.headers = Object.assign({}, n || {}), i ? (this._binaryBody = i, this.isBinaryBody = !0) : (this._body = r || "", this.isBinaryBody = !1), this.escapeHeaderValues = a || !1, this.skipContentLengthHeader = o || !1;
			}
			static fromRawFrame(e, t) {
				let n = {}, i = (e) => e.replace(/^\s+|\s+$/g, "");
				for (let a of e.headers.reverse()) {
					a.indexOf(":");
					let o = i(a[0]), s = i(a[1]);
					t && e.command !== "CONNECT" && e.command !== "CONNECTED" && (s = r.hdrValueUnEscape(s)), n[o] = s;
				}
				return new r({
					command: e.command,
					headers: n,
					binaryBody: e.binaryBody,
					escapeHeaderValues: t
				});
			}
			toString() {
				return this.serializeCmdAndHeaders();
			}
			serialize() {
				let e = this.serializeCmdAndHeaders();
				return this.isBinaryBody ? r.toUnit8Array(e, this._binaryBody).buffer : e + this._body + n.NULL;
			}
			serializeCmdAndHeaders() {
				let e = [this.command];
				this.skipContentLengthHeader && delete this.headers["content-length"];
				for (let t of Object.keys(this.headers || {})) {
					let n = this.headers[t];
					this.escapeHeaderValues && this.command !== "CONNECT" && this.command !== "CONNECTED" ? e.push(`${t}:${r.hdrValueEscape(`${n}`)}`) : e.push(`${t}:${n}`);
				}
				return (this.isBinaryBody || !this.isBodyEmpty() && !this.skipContentLengthHeader) && e.push(`content-length:${this.bodyLength()}`), e.join(n.LF) + n.LF + n.LF;
			}
			isBodyEmpty() {
				return this.bodyLength() === 0;
			}
			bodyLength() {
				let e = this.binaryBody;
				return e ? e.length : 0;
			}
			static sizeOfUTF8(e) {
				return e ? new TextEncoder().encode(e).length : 0;
			}
			static toUnit8Array(e, t) {
				let n = new TextEncoder().encode(e), r = new Uint8Array([0]), i = new Uint8Array(n.length + t.length + r.length);
				return i.set(n), i.set(t, n.length), i.set(r, n.length + t.length), i;
			}
			static marshall(e) {
				return new r(e).serialize();
			}
			static hdrValueEscape(e) {
				return e.replace(/\\/g, "\\\\").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/:/g, "\\c");
			}
			static hdrValueUnEscape(e) {
				return e.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\c/g, ":").replace(/\\\\/g, "\\");
			}
		}
		class i {
			constructor(e, t) {
				this.onFrame = e, this.onIncomingPing = t, this._encoder = new TextEncoder(), this._decoder = new TextDecoder(), this._token = [], this._initState();
			}
			parseChunk(e, t = !1) {
				let n;
				if (n = typeof e == "string" ? this._encoder.encode(e) : new Uint8Array(e), t && n[n.length - 1] !== 0) {
					let e = new Uint8Array(n.length + 1);
					e.set(n, 0), e[n.length] = 0, n = e;
				}
				for (let e = 0; e < n.length; e++) {
					let t = n[e];
					this._onByte(t);
				}
			}
			_collectFrame(e) {
				if (e !== 0 && e !== 13) {
					if (e === 10) {
						this.onIncomingPing();
						return;
					}
					this._onByte = this._collectCommand, this._reinjectByte(e);
				}
			}
			_collectCommand(e) {
				if (e !== 13) {
					if (e === 10) {
						this._results.command = this._consumeTokenAsUTF8(), this._onByte = this._collectHeaders;
						return;
					}
					this._consumeByte(e);
				}
			}
			_collectHeaders(e) {
				if (e !== 13) {
					if (e === 10) {
						this._setupCollectBody();
						return;
					}
					this._onByte = this._collectHeaderKey, this._reinjectByte(e);
				}
			}
			_reinjectByte(e) {
				this._onByte(e);
			}
			_collectHeaderKey(e) {
				if (e === 58) {
					this._headerKey = this._consumeTokenAsUTF8(), this._onByte = this._collectHeaderValue;
					return;
				}
				this._consumeByte(e);
			}
			_collectHeaderValue(e) {
				if (e !== 13) {
					if (e === 10) {
						this._results.headers.push([this._headerKey, this._consumeTokenAsUTF8()]), this._headerKey = void 0, this._onByte = this._collectHeaders;
						return;
					}
					this._consumeByte(e);
				}
			}
			_setupCollectBody() {
				let e = this._results.headers.filter((e) => e[0] === "content-length")[0];
				e ? (this._bodyBytesRemaining = parseInt(e[1], 10), this._onByte = this._collectBodyFixedSize) : this._onByte = this._collectBodyNullTerminated;
			}
			_collectBodyNullTerminated(e) {
				if (e === 0) {
					this._retrievedBody();
					return;
				}
				this._consumeByte(e);
			}
			_collectBodyFixedSize(e) {
				if (this._bodyBytesRemaining-- === 0) {
					this._retrievedBody();
					return;
				}
				this._consumeByte(e);
			}
			_retrievedBody() {
				this._results.binaryBody = this._consumeTokenAsRaw();
				try {
					this.onFrame(this._results);
				} catch (e) {
					console.log("Ignoring an exception thrown by a frame handler. Original exception: ", e);
				}
				this._initState();
			}
			_consumeByte(e) {
				this._token.push(e);
			}
			_consumeTokenAsUTF8() {
				return this._decoder.decode(this._consumeTokenAsRaw());
			}
			_consumeTokenAsRaw() {
				let e = new Uint8Array(this._token);
				return this._token = [], e;
			}
			_initState() {
				this._results = {
					command: void 0,
					headers: [],
					binaryBody: void 0
				}, this._token = [], this._headerKey = void 0, this._onByte = this._collectFrame;
			}
		}
		e.StompSocketState = void 0, (function(e) {
			e[e.CONNECTING = 0] = "CONNECTING", e[e.OPEN = 1] = "OPEN", e[e.CLOSING = 2] = "CLOSING", e[e.CLOSED = 3] = "CLOSED";
		})(e.StompSocketState ||= {}), e.ActivationState = void 0, (function(e) {
			e[e.ACTIVE = 0] = "ACTIVE", e[e.DEACTIVATING = 1] = "DEACTIVATING", e[e.INACTIVE = 2] = "INACTIVE";
		})(e.ActivationState ||= {}), e.ReconnectionTimeMode = void 0, (function(e) {
			e[e.LINEAR = 0] = "LINEAR", e[e.EXPONENTIAL = 1] = "EXPONENTIAL";
		})(e.ReconnectionTimeMode ||= {}), e.TickerStrategy = void 0, (function(e) {
			e.Interval = "interval", e.Worker = "worker";
		})(e.TickerStrategy ||= {});
		class a {
			constructor(t, n = e.TickerStrategy.Interval, r) {
				this._interval = t, this._strategy = n, this._debug = r, this._workerScript = `
    var startTime = Date.now();
    setInterval(function() {
        self.postMessage(Date.now() - startTime);
    }, ${this._interval});
  `;
			}
			start(e) {
				this.stop(), this.shouldUseWorker() ? this.runWorker(e) : this.runInterval(e);
			}
			stop() {
				this.disposeWorker(), this.disposeInterval();
			}
			shouldUseWorker() {
				return typeof Worker < "u" && this._strategy === e.TickerStrategy.Worker;
			}
			runWorker(e) {
				this._debug("Using runWorker for outgoing pings"), this._worker || (this._worker = new Worker(URL.createObjectURL(new Blob([this._workerScript], { type: "text/javascript" }))), this._worker.onmessage = (t) => e(t.data));
			}
			runInterval(e) {
				if (this._debug("Using runInterval for outgoing pings"), !this._timer) {
					let t = Date.now();
					this._timer = setInterval(() => {
						e(Date.now() - t);
					}, this._interval);
				}
			}
			disposeWorker() {
				this._worker && (this._worker.terminate(), delete this._worker, this._debug("Outgoing ping disposeWorker"));
			}
			disposeInterval() {
				this._timer && (clearInterval(this._timer), delete this._timer, this._debug("Outgoing ping disposeInterval"));
			}
		}
		class o {
			constructor(e) {
				this.versions = e;
			}
			supportedVersions() {
				return this.versions.join(",");
			}
			protocolVersions() {
				return this.versions.map((e) => `v${e.replace(".", "")}.stomp`);
			}
		}
		o.V1_0 = "1.0", o.V1_1 = "1.1", o.V1_2 = "1.2", o.default = new o([
			o.V1_2,
			o.V1_1,
			o.V1_0
		]);
		class s {
			get connectedVersion() {
				return this._connectedVersion;
			}
			get connected() {
				return this._connected;
			}
			constructor(e, t, n) {
				this._client = e, this._webSocket = t, this._connected = !1, this._serverFrameHandlers = {
					CONNECTED: (e) => {
						this.debug(`connected to server ${e.headers.server}`), this._connected = !0, this._connectedVersion = e.headers.version, this._connectedVersion === o.V1_2 && (this._escapeHeaderValues = !0), this._setupHeartbeat(e.headers), this.onConnect(e);
					},
					MESSAGE: (e) => {
						let t = e.headers.subscription, n = this._subscriptions[t] || this.onUnhandledMessage, r = e, i = this, a = this._connectedVersion === o.V1_2 ? r.headers.ack : r.headers["message-id"];
						r.ack = (e = {}) => i.ack(a, t, e), r.nack = (e = {}) => i.nack(a, t, e), n(r);
					},
					RECEIPT: (e) => {
						let t = this._receiptWatchers[e.headers["receipt-id"]];
						t ? (t(e), delete this._receiptWatchers[e.headers["receipt-id"]]) : this.onUnhandledReceipt(e);
					},
					ERROR: (e) => {
						this.onStompError(e);
					}
				}, this._counter = 0, this._subscriptions = {}, this._receiptWatchers = {}, this._partialData = "", this._escapeHeaderValues = !1, this._lastServerActivityTS = Date.now(), this.debug = n.debug, this.stompVersions = n.stompVersions, this.connectHeaders = n.connectHeaders, this.disconnectHeaders = n.disconnectHeaders, this.heartbeatIncoming = n.heartbeatIncoming, this.heartbeatToleranceMultiplier = n.heartbeatGracePeriods, this.heartbeatOutgoing = n.heartbeatOutgoing, this.splitLargeFrames = n.splitLargeFrames, this.maxWebSocketChunkSize = n.maxWebSocketChunkSize, this.forceBinaryWSFrames = n.forceBinaryWSFrames, this.logRawCommunication = n.logRawCommunication, this.appendMissingNULLonIncoming = n.appendMissingNULLonIncoming, this.discardWebsocketOnCommFailure = n.discardWebsocketOnCommFailure, this.onConnect = n.onConnect, this.onDisconnect = n.onDisconnect, this.onStompError = n.onStompError, this.onWebSocketClose = n.onWebSocketClose, this.onWebSocketError = n.onWebSocketError, this.onUnhandledMessage = n.onUnhandledMessage, this.onUnhandledReceipt = n.onUnhandledReceipt, this.onUnhandledFrame = n.onUnhandledFrame, this.onHeartbeatReceived = n.onHeartbeatReceived, this.onHeartbeatLost = n.onHeartbeatLost;
			}
			start() {
				let t = new i((e) => {
					let t = r.fromRawFrame(e, this._escapeHeaderValues);
					this.logRawCommunication || this.debug(`<<< ${t}`), (this._serverFrameHandlers[t.command] || this.onUnhandledFrame)(t);
				}, () => {
					this.debug("<<< PONG"), this.onHeartbeatReceived();
				});
				this._webSocket.onmessage = (e) => {
					if (this.debug("Received data"), this._lastServerActivityTS = Date.now(), this.logRawCommunication) {
						let t = e.data instanceof ArrayBuffer ? new TextDecoder().decode(e.data) : e.data;
						this.debug(`<<< ${t}`);
					}
					t.parseChunk(e.data, this.appendMissingNULLonIncoming);
				}, this._webSocket.onclose = (e) => {
					this.debug(`Connection closed to ${this._webSocket.url}`), this._cleanUp(), this.onWebSocketClose(e);
				}, this._webSocket.onerror = (e) => {
					this.onWebSocketError(e);
				};
				let n = () => {
					let e = Object.assign({}, this.connectHeaders);
					this.debug("Web Socket Opened..."), e["accept-version"] = this.stompVersions.supportedVersions(), e["heart-beat"] = [this.heartbeatOutgoing, this.heartbeatIncoming].join(","), this._transmit({
						command: "CONNECT",
						headers: e
					});
				};
				this._webSocket.readyState === e.StompSocketState.OPEN ? n() : this._webSocket.onopen = n;
			}
			_setupHeartbeat(t) {
				if (t.version !== o.V1_1 && t.version !== o.V1_2 || !t["heart-beat"]) return;
				let [r, i] = t["heart-beat"].split(",").map((e) => parseInt(e, 10));
				if (this.heartbeatOutgoing !== 0 && i !== 0) {
					let t = Math.max(this.heartbeatOutgoing, i);
					this.debug(`send PING every ${t}ms`), this._pinger = new a(t, this._client.heartbeatStrategy, this.debug), this._pinger.start(() => {
						this._webSocket.readyState === e.StompSocketState.OPEN && (this._webSocket.send(n.LF), this.debug(">>> PING"));
					});
				}
				if (this.heartbeatIncoming !== 0 && r !== 0) {
					let e = Math.max(this.heartbeatIncoming, r);
					this.debug(`check PONG every ${e}ms`), this._ponger = setInterval(() => {
						let t = Date.now() - this._lastServerActivityTS;
						t > e * this.heartbeatToleranceMultiplier && (this.debug(`did not receive server activity for the last ${t}ms`), this.onHeartbeatLost(), this._closeOrDiscardWebsocket());
					}, e);
				}
			}
			_closeOrDiscardWebsocket() {
				this.discardWebsocketOnCommFailure ? (this.debug("Discarding websocket, the underlying socket may linger for a while"), this.discardWebsocket()) : (this.debug("Issuing close on the websocket"), this._closeWebsocket());
			}
			forceDisconnect() {
				this._webSocket && (this._webSocket.readyState === e.StompSocketState.CONNECTING || this._webSocket.readyState === e.StompSocketState.OPEN) && this._closeOrDiscardWebsocket();
			}
			_closeWebsocket() {
				this._webSocket.onmessage = () => {}, this._webSocket.close();
			}
			discardWebsocket() {
				typeof this._webSocket.terminate != "function" && t(this._webSocket, (e) => this.debug(e)), this._webSocket.terminate();
			}
			_transmit(e) {
				let { command: t, headers: n, body: i, binaryBody: a, skipContentLengthHeader: o } = e, s = new r({
					command: t,
					headers: n,
					body: i,
					binaryBody: a,
					escapeHeaderValues: this._escapeHeaderValues,
					skipContentLengthHeader: o
				}), c = s.serialize();
				if (this.logRawCommunication ? this.debug(`>>> ${c}`) : this.debug(`>>> ${s}`), this.forceBinaryWSFrames && typeof c == "string" && (c = new TextEncoder().encode(c)), typeof c != "string" || !this.splitLargeFrames) this._webSocket.send(c);
				else {
					let e = c;
					for (; e.length > 0;) {
						let t = e.substring(0, this.maxWebSocketChunkSize);
						e = e.substring(this.maxWebSocketChunkSize), this._webSocket.send(t), this.debug(`chunk sent = ${t.length}, remaining = ${e.length}`);
					}
				}
			}
			dispose() {
				if (this.connected) try {
					let e = Object.assign({}, this.disconnectHeaders);
					e.receipt ||= `close-${this._counter++}`, this.watchForReceipt(e.receipt, (e) => {
						this._closeWebsocket(), this._cleanUp(), this.onDisconnect(e);
					}), this._transmit({
						command: "DISCONNECT",
						headers: e
					});
				} catch (e) {
					this.debug(`Ignoring error during disconnect ${e}`);
				}
				else (this._webSocket.readyState === e.StompSocketState.CONNECTING || this._webSocket.readyState === e.StompSocketState.OPEN) && this._closeWebsocket();
			}
			_cleanUp() {
				this._connected = !1, this._pinger &&= (this._pinger.stop(), void 0), this._ponger &&= (clearInterval(this._ponger), void 0);
			}
			publish(e) {
				let { destination: t, headers: n, body: r, binaryBody: i, skipContentLengthHeader: a } = e, o = Object.assign({ destination: t }, n);
				this._transmit({
					command: "SEND",
					headers: o,
					body: r,
					binaryBody: i,
					skipContentLengthHeader: a
				});
			}
			watchForReceipt(e, t) {
				this._receiptWatchers[e] = t;
			}
			subscribe(e, t, n = {}) {
				n = Object.assign({}, n), n.id ||= `sub-${this._counter++}`, n.destination = e, this._subscriptions[n.id] = t, this._transmit({
					command: "SUBSCRIBE",
					headers: n
				});
				let r = this;
				return {
					id: n.id,
					unsubscribe(e) {
						return r.unsubscribe(n.id, e);
					}
				};
			}
			unsubscribe(e, t = {}) {
				t = Object.assign({}, t), delete this._subscriptions[e], t.id = e, this._transmit({
					command: "UNSUBSCRIBE",
					headers: t
				});
			}
			begin(e) {
				let t = e || `tx-${this._counter++}`;
				this._transmit({
					command: "BEGIN",
					headers: { transaction: t }
				});
				let n = this;
				return {
					id: t,
					commit() {
						n.commit(t);
					},
					abort() {
						n.abort(t);
					}
				};
			}
			commit(e) {
				this._transmit({
					command: "COMMIT",
					headers: { transaction: e }
				});
			}
			abort(e) {
				this._transmit({
					command: "ABORT",
					headers: { transaction: e }
				});
			}
			ack(e, t, n = {}) {
				n = Object.assign({}, n), this._connectedVersion === o.V1_2 ? n.id = e : n["message-id"] = e, n.subscription = t, this._transmit({
					command: "ACK",
					headers: n
				});
			}
			nack(e, t, n = {}) {
				return n = Object.assign({}, n), this._connectedVersion === o.V1_2 ? n.id = e : n["message-id"] = e, n.subscription = t, this._transmit({
					command: "NACK",
					headers: n
				});
			}
		}
		class c {
			get webSocket() {
				return this._stompHandler?._webSocket;
			}
			get disconnectHeaders() {
				return this._disconnectHeaders;
			}
			set disconnectHeaders(e) {
				this._disconnectHeaders = e, this._stompHandler && (this._stompHandler.disconnectHeaders = this._disconnectHeaders);
			}
			get connected() {
				return !!this._stompHandler && this._stompHandler.connected;
			}
			get connectedVersion() {
				return this._stompHandler ? this._stompHandler.connectedVersion : void 0;
			}
			get active() {
				return this.state === e.ActivationState.ACTIVE;
			}
			_changeState(e) {
				this.state = e, this.onChangeState(e);
			}
			constructor(t = {}) {
				this.stompVersions = o.default, this.connectionTimeout = 0, this.reconnectDelay = 5e3, this._nextReconnectDelay = 0, this.maxReconnectDelay = 900 * 1e3, this.reconnectTimeMode = e.ReconnectionTimeMode.LINEAR, this.heartbeatIncoming = 1e4, this.heartbeatToleranceMultiplier = 2, this.heartbeatOutgoing = 1e4, this.heartbeatStrategy = e.TickerStrategy.Interval, this.splitLargeFrames = !1, this.maxWebSocketChunkSize = 8 * 1024, this.forceBinaryWSFrames = !1, this.appendMissingNULLonIncoming = !1, this.discardWebsocketOnCommFailure = !1, this.state = e.ActivationState.INACTIVE;
				let n = () => {};
				this.debug = n, this.beforeConnect = n, this.onConnect = n, this.onDisconnect = n, this.onUnhandledMessage = n, this.onUnhandledReceipt = n, this.onUnhandledFrame = n, this.onHeartbeatReceived = n, this.onHeartbeatLost = n, this.onStompError = n, this.onWebSocketClose = n, this.onWebSocketError = n, this.logRawCommunication = !1, this.onChangeState = n, this.connectHeaders = {}, this._disconnectHeaders = {}, this.configure(t);
			}
			configure(e) {
				Object.assign(this, e), this.maxReconnectDelay > 0 && this.maxReconnectDelay < this.reconnectDelay && (this.debug(`Warning: maxReconnectDelay (${this.maxReconnectDelay}ms) is less than reconnectDelay (${this.reconnectDelay}ms). Using reconnectDelay as the maxReconnectDelay delay.`), this.maxReconnectDelay = this.reconnectDelay);
			}
			activate() {
				let t = () => {
					if (this.active) {
						this.debug("Already ACTIVE, ignoring request to activate");
						return;
					}
					this._changeState(e.ActivationState.ACTIVE), this._nextReconnectDelay = this.reconnectDelay, this._connect();
				};
				this.state === e.ActivationState.DEACTIVATING ? (this.debug("Waiting for deactivation to finish before activating"), this.deactivate().then(() => {
					t();
				})) : t();
			}
			async _connect() {
				if (await this.beforeConnect(this), this._stompHandler) {
					this.debug("There is already a stompHandler, skipping the call to connect");
					return;
				}
				if (!this.active) {
					this.debug("Client has been marked inactive, will not attempt to connect");
					return;
				}
				this.connectionTimeout > 0 && (this._connectionWatcher && clearTimeout(this._connectionWatcher), this._connectionWatcher = setTimeout(() => {
					this.connected || (this.debug(`Connection not established in ${this.connectionTimeout}ms, closing socket`), this.forceDisconnect());
				}, this.connectionTimeout)), this.debug("Opening Web Socket...");
				let t = this._createWebSocket();
				this._stompHandler = new s(this, t, {
					debug: this.debug,
					stompVersions: this.stompVersions,
					connectHeaders: this.connectHeaders,
					disconnectHeaders: this._disconnectHeaders,
					heartbeatIncoming: this.heartbeatIncoming,
					heartbeatGracePeriods: this.heartbeatToleranceMultiplier,
					heartbeatOutgoing: this.heartbeatOutgoing,
					heartbeatStrategy: this.heartbeatStrategy,
					splitLargeFrames: this.splitLargeFrames,
					maxWebSocketChunkSize: this.maxWebSocketChunkSize,
					forceBinaryWSFrames: this.forceBinaryWSFrames,
					logRawCommunication: this.logRawCommunication,
					appendMissingNULLonIncoming: this.appendMissingNULLonIncoming,
					discardWebsocketOnCommFailure: this.discardWebsocketOnCommFailure,
					onConnect: (e) => {
						if (this._connectionWatcher &&= (clearTimeout(this._connectionWatcher), void 0), this._nextReconnectDelay = this.reconnectDelay, !this.active) {
							this.debug("STOMP got connected while deactivate was issued, will disconnect now"), this._disposeStompHandler();
							return;
						}
						this.onConnect(e);
					},
					onDisconnect: (e) => {
						this.onDisconnect(e);
					},
					onStompError: (e) => {
						this.onStompError(e);
					},
					onWebSocketClose: (t) => {
						this._stompHandler = void 0, this.state === e.ActivationState.DEACTIVATING && this._changeState(e.ActivationState.INACTIVE), this.onWebSocketClose(t), this.active && this._schedule_reconnect();
					},
					onWebSocketError: (e) => {
						this.onWebSocketError(e);
					},
					onUnhandledMessage: (e) => {
						this.onUnhandledMessage(e);
					},
					onUnhandledReceipt: (e) => {
						this.onUnhandledReceipt(e);
					},
					onUnhandledFrame: (e) => {
						this.onUnhandledFrame(e);
					},
					onHeartbeatReceived: () => {
						this.onHeartbeatReceived();
					},
					onHeartbeatLost: () => {
						this.onHeartbeatLost();
					}
				}), this._stompHandler.start();
			}
			_createWebSocket() {
				let e;
				if (this.webSocketFactory) e = this.webSocketFactory();
				else if (this.brokerURL) e = new WebSocket(this.brokerURL, this.stompVersions.protocolVersions());
				else throw Error("Either brokerURL or webSocketFactory must be provided");
				return e.binaryType = "arraybuffer", e;
			}
			_schedule_reconnect() {
				this._nextReconnectDelay > 0 && (this.debug(`STOMP: scheduling reconnection in ${this._nextReconnectDelay}ms`), this._reconnector = setTimeout(() => {
					this.reconnectTimeMode === e.ReconnectionTimeMode.EXPONENTIAL && (this._nextReconnectDelay *= 2, this.maxReconnectDelay !== 0 && (this._nextReconnectDelay = Math.min(this._nextReconnectDelay, this.maxReconnectDelay))), this._connect();
				}, this._nextReconnectDelay));
			}
			async deactivate(t = {}) {
				let n = t.force || !1, r = this.active, i;
				if (this.state === e.ActivationState.INACTIVE) return this.debug("Already INACTIVE, nothing more to do"), Promise.resolve();
				if (this._changeState(e.ActivationState.DEACTIVATING), this._nextReconnectDelay = 0, this._reconnector &&= (clearTimeout(this._reconnector), void 0), this._stompHandler && this.webSocket.readyState !== e.StompSocketState.CLOSED) {
					let e = this._stompHandler.onWebSocketClose;
					i = new Promise((t, n) => {
						this._stompHandler.onWebSocketClose = (n) => {
							e(n), t();
						};
					});
				} else return this._changeState(e.ActivationState.INACTIVE), Promise.resolve();
				return n ? this._stompHandler?.discardWebsocket() : r && this._disposeStompHandler(), i;
			}
			forceDisconnect() {
				this._stompHandler && this._stompHandler.forceDisconnect();
			}
			_disposeStompHandler() {
				this._stompHandler && this._stompHandler.dispose();
			}
			publish(e) {
				this._checkConnection(), this._stompHandler.publish(e);
			}
			_checkConnection() {
				if (!this.connected) throw TypeError("There is no underlying STOMP connection");
			}
			watchForReceipt(e, t) {
				this._checkConnection(), this._stompHandler.watchForReceipt(e, t);
			}
			subscribe(e, t, n = {}) {
				return this._checkConnection(), this._stompHandler.subscribe(e, t, n);
			}
			unsubscribe(e, t = {}) {
				this._checkConnection(), this._stompHandler.unsubscribe(e, t);
			}
			begin(e) {
				return this._checkConnection(), this._stompHandler.begin(e);
			}
			commit(e) {
				this._checkConnection(), this._stompHandler.commit(e);
			}
			abort(e) {
				this._checkConnection(), this._stompHandler.abort(e);
			}
			ack(e, t, n = {}) {
				this._checkConnection(), this._stompHandler.ack(e, t, n);
			}
			nack(e, t, n = {}) {
				this._checkConnection(), this._stompHandler.nack(e, t, n);
			}
		}
		class l {}
		class u {}
		class d {
			constructor(e) {
				this.client = e;
			}
			get outgoing() {
				return this.client.heartbeatOutgoing;
			}
			set outgoing(e) {
				this.client.heartbeatOutgoing = e;
			}
			get incoming() {
				return this.client.heartbeatIncoming;
			}
			set incoming(e) {
				this.client.heartbeatIncoming = e;
			}
		}
		class f extends c {
			constructor(e) {
				super(), this.maxWebSocketFrameSize = 16 * 1024, this._heartbeatInfo = new d(this), this.reconnect_delay = 0, this.webSocketFactory = e, this.debug = (...e) => {
					console.log(...e);
				};
			}
			_parseConnect(...e) {
				let t, n, r, i = {};
				if (e.length < 2) throw Error("Connect requires at least 2 arguments");
				if (typeof e[1] == "function") [i, n, r, t] = e;
				else switch (e.length) {
					case 6:
						[i.login, i.passcode, n, r, t, i.host] = e;
						break;
					default: [i.login, i.passcode, n, r, t] = e;
				}
				return [
					i,
					n,
					r,
					t
				];
			}
			connect(...e) {
				let t = this._parseConnect(...e);
				t[0] && (this.connectHeaders = t[0]), t[1] && (this.onConnect = t[1]), t[2] && (this.onStompError = t[2]), t[3] && (this.onWebSocketClose = t[3]), super.activate();
			}
			disconnect(e, t = {}) {
				e && (this.onDisconnect = e), this.disconnectHeaders = t, super.deactivate();
			}
			send(e, t = {}, n = "") {
				t = Object.assign({}, t);
				let r = t["content-length"] === !1;
				r && delete t["content-length"], this.publish({
					destination: e,
					headers: t,
					body: n,
					skipContentLengthHeader: r
				});
			}
			set reconnect_delay(e) {
				this.reconnectDelay = e;
			}
			get ws() {
				return this.webSocket;
			}
			get version() {
				return this.connectedVersion;
			}
			get onreceive() {
				return this.onUnhandledMessage;
			}
			set onreceive(e) {
				this.onUnhandledMessage = e;
			}
			get onreceipt() {
				return this.onUnhandledReceipt;
			}
			set onreceipt(e) {
				this.onUnhandledReceipt = e;
			}
			get heartbeat() {
				return this._heartbeatInfo;
			}
			set heartbeat(e) {
				this.heartbeatIncoming = e.incoming, this.heartbeatOutgoing = e.outgoing;
			}
		}
		class p {
			static client(e, t) {
				return t ??= o.default.protocolVersions(), new f(() => new (p.WebSocketClass || WebSocket)(e, t));
			}
			static over(e) {
				let t;
				return typeof e == "function" ? t = e : (console.warn("Stomp.over did not receive a factory, auto reconnect will not work. Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over"), t = () => e), new f(t);
			}
		}
		p.WebSocketClass = null, e.Client = c, e.CompatClient = f, e.FrameImpl = r, e.Parser = i, e.Stomp = p, e.StompConfig = l, e.StompHeaders = u, e.Versions = o;
	}));
})))(), Z = null, Jn = 5e3;
function Yn() {
	return `${Wn.replace(/^http/, "ws").replace(/\/api$/, "")}/ws`;
}
function Xn(e, t) {
	return Z?.active ? () => {} : (Z = new qn.Client({
		brokerURL: Yn(),
		connectHeaders: { Authorization: `Bearer ${e}` },
		reconnectDelay: Jn,
		onConnect: () => {
			Z?.subscribe("/topic/pedidos", (e) => {
				try {
					t(JSON.parse(e.body));
				} catch {}
			});
		},
		onWebSocketClose: () => {
			Z?.deactivate();
		}
	}), Z.activate(), () => {
		Z?.deactivate(), Z = null;
	});
}
function Zn() {
	Z?.deactivate(), Z = null;
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var Qn = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), $n = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === te ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case ee: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = O.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (k.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				M || (M = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return N[e] || (N[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, c, u) {
			var f = n.children;
			if (f !== void 0) if (o) if (A(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (k.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", F[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), F[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && l(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, a(), c, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = c("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), te = Symbol.for("react.client.reference"), O = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = Object.prototype.hasOwnProperty, A = Array.isArray, j = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var M, N = {}, ne = h.react_stack_bottom_frame.bind(h, o)(), P = j(i(o)), F = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : ne, r ? j(i(e)) : P);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > O.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : ne, r ? j(i(e)) : P);
		};
	})();
})), Q = (/* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Qn() : t.exports = $n();
})))(), er = e(void 0);
function tr() {
	return {
		users: [
			{
				id: 1,
				firstName: "Admin",
				lastName: "Deporvida",
				username: "admin",
				password: "admin",
				role: "admin"
			},
			{
				id: 2,
				firstName: "Carlos",
				lastName: "Garcia",
				username: "carlos",
				password: "123",
				role: "colaborador"
			},
			{
				id: 3,
				firstName: "Maria",
				lastName: "Lopez",
				username: "maria",
				password: "123",
				role: "colaborador"
			},
			{
				id: 4,
				firstName: "Juan",
				lastName: "Perez",
				username: "juan",
				password: "123",
				role: "cliente"
			},
			{
				id: 5,
				firstName: "Ana",
				lastName: "Torres",
				username: "ana",
				password: "123",
				role: "cliente"
			},
			{
				id: 6,
				firstName: "Luis",
				lastName: "Ramirez",
				username: "luis",
				password: "123",
				role: "cliente"
			}
		],
		colaboradores: [{
			id: 1,
			userId: 2,
			salary: 2500,
			mobile: "555-0101",
			joinDate: "2024-01-15",
			status: !0
		}, {
			id: 2,
			userId: 3,
			salary: 3e3,
			mobile: "555-0102",
			joinDate: "2024-02-20",
			status: !0
		}],
		clientes: [
			{
				id: 1,
				userId: 4,
				codigo: "CL-101",
				mobile: "555-0201",
				compras: 180,
				categoria: "Novela",
				status: !0
			},
			{
				id: 2,
				userId: 5,
				codigo: "CL-102",
				mobile: "555-0202",
				compras: 95,
				categoria: "Infantil",
				status: !0
			},
			{
				id: 3,
				userId: 6,
				codigo: "CL-201",
				mobile: "555-0203",
				compras: 340,
				categoria: "Negocios",
				status: !0
			}
		],
		pedidos: [],
		avisos: [{
			id: 1,
			date: "2024-03-01",
			by: "Admin",
			message: "2x1 en novelas seleccionadas este viernes"
		}, {
			id: 2,
			date: "2024-03-05",
			by: "Admin",
			message: "Llegada de nuevos títulos de la categoría Ciencia antes del 10 de marzo"
		}],
		libros: u,
		nextId: {
			users: 7,
			colaboradores: 3,
			clientes: 4,
			avisos: 3,
			pedidos: 1,
			libros: u.length + 1
		}
	};
}
function nr() {
	if (typeof window > "u") return tr();
	let e = localStorage.getItem("deporvida-libreriaData");
	if (e) try {
		let t = JSON.parse(e);
		if (Array.isArray(t.libros)) return t;
	} catch {}
	let t = tr();
	return sr(t), t;
}
function rr() {
	if (typeof window > "u") return [];
	let e = localStorage.getItem("deporvida-carrito");
	return e ? JSON.parse(e) : [];
}
function ir(e) {
	typeof window < "u" && localStorage.setItem("deporvida-carrito", JSON.stringify(e));
}
function ar() {
	if (typeof window > "u") return [];
	let e = localStorage.getItem("deporvida-favoritos");
	return e ? JSON.parse(e) : [];
}
function or(e) {
	typeof window < "u" && localStorage.setItem("deporvida-favoritos", JSON.stringify(e));
}
function sr(e) {
	typeof window < "u" && localStorage.setItem("deporvida-libreriaData", JSON.stringify(e));
}
function cr() {
	return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function lr(e) {
	return {
		id: e.id,
		titulo: e.titulo,
		autor: e.autors?.map((e) => e.nombre).join(", ") || "Desconocido",
		categoria: e.categoria?.nombre || "General",
		precio: e.precioEfectivo || e.precio,
		imagen: e.urlPortada || "http://localhost:8087/api/imagenes/default.png",
		descripcion: e.descripcion,
		stock: e.inventario?.cantidad ?? 0,
		urlPortada: e.urlPortada,
		urlMiniatura: e.urlMiniatura,
		precioEfectivo: e.precioEfectivo,
		enOferta: e.enOferta,
		autors: e.autors,
		inventario: e.inventario
	};
}
function ur(e) {
	return {
		libro: lr(e.libro),
		cantidad: e.cantidad,
		itemId: e.id
	};
}
function dr({ children: e }) {
	let [n, a] = i(null), [o, s] = i("home"), [c, l] = i({}), [u, d] = i(() => nr()), [f, p] = i(() => rr()), [m, h] = i(() => ar()), [g, _] = i([]), [v, y] = i(!1), [b, x] = i(null), [S, C] = i(() => localStorage.getItem("deporvida-token"));
	r(() => {
		S ? localStorage.setItem("deporvida-token", S) : localStorage.removeItem("deporvida-token");
	}, [S]), r(() => {
		sr(u);
	}, [u]), r(() => {
		ir(f);
	}, [f]);
	let w = t(async () => {
		if (S) try {
			let e = (await X.getCarrito()).data.items.map(ur);
			p(e);
		} catch (e) {
			let t = e.response?.data?.message || e.message || "Error desconocido";
			x(`Error al obtener el carrito: ${t}`);
		}
	}, [S]);
	r(() => {
		S ? w() : p(rr());
	}, [S, w]), r(() => {
		or(m);
	}, [m]), r(() => {
		let e = () => {
			a(null), C(null), x("Tu sesión expiró, inicia sesión de nuevo"), s("login");
		};
		return window.addEventListener("auth:unauthorized", e), () => window.removeEventListener("auth:unauthorized", e);
	}, []), r(() => {
		if (S) {
			let e = Xn(S, (e) => {
				e.estado && x(`Pedido ${e.numeroPedido || ""} actualizado a: ${e.estado}`);
			});
			return () => {
				e();
			};
		} else Zn();
	}, [S]);
	let T = t((e, t = {}) => {
		s(e), l(t);
	}, []), E = t(async (e, t, n) => {
		try {
			let r = (await Gn.login({
				nombreUsuario: e,
				contrasena: t
			})).data;
			C(r.token);
			let i = {
				id: r.id,
				firstName: r.nombres || "",
				lastName: r.apellidos || "",
				username: r.nombreUsuario,
				password: "",
				role: r.roles.includes("ROL_ADMIN") ? "admin" : r.roles.includes("ROL_VENDEDOR") ? "colaborador" : "cliente"
			};
			a(i);
			let o = rr();
			if (o.length > 0) {
				for (let e of o) try {
					await X.addItem({
						libroId: e.libro.id,
						cantidad: e.cantidad
					});
				} catch (t) {
					console.error(`Error syncing cart item ${e.libro.id}:`, t);
				}
				localStorage.removeItem("deporvida-carrito");
			}
			try {
				let e = await X.getCarrito();
				p(e.data.items.map(ur));
			} catch (e) {
				console.error("Error fetching cart after login:", e);
			}
			return n ? T(n) : r.roles.includes("ROL_ADMIN") ? T("admin-dashboard") : r.roles.includes("ROL_VENDEDOR") ? T("colaborador-dashboard") : T("cliente-dashboard"), { success: !0 };
		} catch (e) {
			return {
				success: !1,
				message: e.response?.data?.message || e.message || "Error al iniciar sesión"
			};
		}
	}, [T]), D = t(async (e, t, n) => {
		if (!t.firstName || !t.lastName || !t.username || !t.password) return {
			success: !1,
			message: "Todos los campos obligatorios deben ser completados"
		};
		try {
			let e = await Gn.register({
				nombreUsuario: t.username,
				correo: t.email || `${t.username}@deporvida.com`,
				contrasena: t.password,
				nombres: t.firstName,
				apellidos: t.lastName,
				telefono: t.mobile || ""
			});
			C(e.data.token);
			let r = {
				id: e.data.id,
				firstName: e.data.nombres || t.firstName,
				lastName: e.data.apellidos || t.lastName,
				username: e.data.nombreUsuario,
				password: "",
				role: "cliente"
			};
			a(r);
			try {
				let e = await X.getCarrito();
				p(e.data.items.map(ur));
			} catch (e) {
				console.error("Error fetching cart after signup:", e);
			}
			return T(n || "cliente-dashboard"), { success: !0 };
		} catch (e) {
			return {
				success: !1,
				message: e.response?.data?.message || e.message || "Error al registrarse"
			};
		}
	}, [T]), ee = t(() => {
		a(null), C(null), T("home");
	}, [T]), te = t((e) => {
		d(e);
	}, []), O = t(async (e) => !e.firstName || !e.lastName || !e.username || !e.password || u.users.find((t) => t.username === e.username) ? !1 : (d((t) => {
		let n = { ...t }, r = {
			id: n.nextId.users++,
			firstName: e.firstName,
			lastName: e.lastName,
			username: e.username,
			password: e.password,
			role: "colaborador"
		};
		return n.users = [...n.users, r], n.colaboradores = [...n.colaboradores, {
			id: n.nextId.colaboradores++,
			userId: r.id,
			salary: parseInt(e.salary || "0") || 0,
			mobile: e.mobile || "",
			joinDate: cr(),
			status: !0
		}], n;
	}), !0), [u.users]), k = t(async (e) => !e.firstName || !e.lastName || !e.username || !e.password || u.users.find((t) => t.username === e.username) ? !1 : (d((t) => {
		let n = { ...t }, r = {
			id: n.nextId.users++,
			firstName: e.firstName,
			lastName: e.lastName,
			username: e.username,
			password: e.password,
			role: "cliente"
		};
		return n.users = [...n.users, r], n.clientes = [...n.clientes, {
			id: n.nextId.clientes++,
			userId: r.id,
			codigo: e.codigo || "",
			mobile: e.mobile || "",
			compras: parseInt(e.compras || "0") || 0,
			categoria: e.categoria || "Novela",
			status: !0
		}], n;
	}), !0), [u.users]), A = t(async (e, t) => {
		d((n) => {
			let r = { ...n }, i = r.colaboradores.find((t) => t.id === e);
			if (!i) return r;
			let a = r.users.find((e) => e.id === i.userId);
			return a && (a.firstName = t.firstName, a.lastName = t.lastName, a.username = t.username, t.password && (a.password = t.password)), i.mobile = t.mobile, i.salary = parseInt(t.salary || "0") || 0, r;
		});
	}, []), j = t(async (e, t) => {
		d((n) => {
			let r = { ...n }, i = r.clientes.find((t) => t.id === e);
			if (!i) return r;
			let a = r.users.find((e) => e.id === i.userId);
			return a && (a.firstName = t.firstName, a.lastName = t.lastName, a.username = t.username, t.password && (a.password = t.password)), i.codigo = t.codigo, i.categoria = t.categoria, i.mobile = t.mobile, i.compras = parseInt(t.compras || "0") || 0, r;
		});
	}, []), M = t(async (e) => {
		d((t) => {
			let n = { ...t }, r = n.colaboradores.find((t) => t.id === e);
			return r ? (n.users = n.users.filter((e) => e.id !== r.userId), n.colaboradores = n.colaboradores.filter((t) => t.id !== e), n) : n;
		});
	}, []), N = t(async (e) => {
		d((t) => {
			let n = { ...t }, r = n.clientes.find((t) => t.id === e);
			return r ? (n.users = n.users.filter((e) => e.id !== r.userId), n.clientes = n.clientes.filter((t) => t.id !== e), n) : n;
		});
	}, []), ne = t(async (e) => {
		d((t) => {
			let n = { ...t }, r = n.colaboradores.find((t) => t.id === e);
			return r && (r.status = !0), n;
		});
	}, []), P = t(async (e) => {
		d((t) => {
			let n = { ...t }, r = n.clientes.find((t) => t.id === e);
			return r && (r.status = !0), n;
		});
	}, []), F = t(async (e, t, n) => {
		t && d((r) => {
			let i = { ...r };
			for (let r of n) i.pedidos.push({
				id: i.nextId.pedidos++,
				codigo: r.codigo,
				date: t,
				categoria: e,
				estado: r.estado
			});
			return i;
		});
	}, []), re = t(async (e) => {
		!e || !n || d((t) => {
			let r = { ...t };
			return r.avisos.push({
				id: r.nextId.avisos++,
				date: cr(),
				by: n.firstName,
				message: e
			}), r;
		});
	}, [n]), ie = t(async () => {
		y(!0);
		try {
			let e = (await Kn.getAll({ size: 100 })).data.content.map(lr);
			_(e);
		} catch (e) {
			let t = e.response?.data?.message || e.message || "Error desconocido";
			x(`No se pudo cargar el catálogo: ${t}`), _([]);
		} finally {
			y(!1);
		}
	}, []), I = t((e, t = 1) => {
		S ? (x(null), X.addItem({
			libroId: e.id,
			cantidad: t
		}).then(() => w()).catch((e) => {
			let t = e.response?.data?.message || e.message || "Error desconocido";
			x(`Error al agregar al carrito: ${t}`);
		})) : p((n) => n.find((t) => t.libro.id === e.id) ? n.map((n) => n.libro.id === e.id ? {
			...n,
			cantidad: Math.min(n.cantidad + t, 1e3)
		} : n) : [...n, {
			libro: e,
			cantidad: Math.min(t, 1e3)
		}]);
	}, [S, w]), ae = t((e) => {
		S ? (x(null), p((t) => {
			let n = t.find((t) => t.libro.id === e);
			return n?.itemId && X.removeItem(n.itemId).then(() => w()).catch((e) => {
				let t = e.response?.data?.message || e.message || "Error desconocido";
				x(`Error al eliminar del carrito: ${t}`), w();
			}), t.filter((t) => t.libro.id !== e);
		})) : p((t) => t.filter((t) => t.libro.id !== e));
	}, [S, w]), oe = t((e, t) => {
		S ? (x(null), p((n) => {
			let r = n.find((t) => t.libro.id === e);
			return r?.itemId && (t <= 0 ? X.removeItem(r.itemId).then(() => w()).catch((e) => {
				let t = e.response?.data?.message || e.message || "Error desconocido";
				x(`Error al actualizar cantidad: ${t}`), w();
			}) : X.updateItem(r.itemId, t).then(() => w()).catch((e) => {
				let t = e.response?.data?.message || e.message || "Error desconocido";
				x(`Error al actualizar cantidad: ${t}`), w();
			})), t <= 0 ? n.filter((t) => t.libro.id !== e) : n.map((n) => n.libro.id === e ? {
				...n,
				cantidad: Math.min(t, 1e3)
			} : n);
		})) : p((n) => t <= 0 ? n.filter((t) => t.libro.id !== e) : n.map((n) => n.libro.id === e ? {
			...n,
			cantidad: Math.min(t, 1e3)
		} : n));
	}, [S, w]), se = t(() => {
		S ? (x(null), X.clearCarrito().then(() => p([])).catch((e) => {
			let t = e.response?.data?.message || e.message || "Error desconocido";
			x(`Error al vaciar el carrito: ${t}`), w();
		})) : p([]);
	}, [S, w]), ce = t(() => f.reduce((e, t) => e + t.libro.precio * t.cantidad, 0), [f]), le = t(() => f.reduce((e, t) => e + t.cantidad, 0), [f]), ue = t((e) => {
		h((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), de = t((e) => m.includes(e), [m]), fe = t(() => g.filter((e) => m.includes(e.id)), [g, m]);
	return /* @__PURE__ */ (0, Q.jsx)(er.Provider, {
		value: {
			currentUser: n,
			currentView: o,
			navParams: c,
			data: u,
			carrito: f,
			apiLibros: g,
			apiLoading: v,
			apiError: b,
			token: S,
			navigate: T,
			doLogin: E,
			doSignup: D,
			doLogout: ee,
			saveData: te,
			addColaborador: O,
			addCliente: k,
			updateColaborador: A,
			updateCliente: j,
			deleteColaborador: M,
			deleteCliente: N,
			approveColaborador: ne,
			approveCliente: P,
			guardarPedidos: F,
			postAviso: re,
			getInitialData: tr,
			fetchApiLibros: ie,
			addToCart: I,
			removeFromCart: ae,
			updateCartQuantity: oe,
			clearCart: se,
			getCartTotal: ce,
			getCartCount: le,
			favoritos: m,
			toggleFavorite: ue,
			isFavorito: de,
			getFavoritos: fe
		},
		children: e
	});
}
function $() {
	let e = n(er);
	if (!e) throw Error("useDeporvida must be used within a DeporvidaProvider");
	return e;
}
//#endregion
//#region src/layouts/PublicLayout.tsx
function fr({ children: e }) {
	let { navigate: n, getCartCount: r, data: a, currentUser: o, doLogout: s } = $(), c = r(), [l, u] = i(""), d = t((e) => {
		e.preventDefault(), l.trim() && n("catalogo", { searchTerm: l.trim() });
	}, [l, n]);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		id: "public-layout",
		className: "deporvida-root",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("header", {
				className: "crisol-header",
				children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "crisol-header-top",
					children: [
						/* @__PURE__ */ (0, Q.jsxs)("a", {
							href: "#",
							className: "crisol-logo",
							onClick: (e) => {
								e.preventDefault(), n("home");
							},
							children: ["Librería ", /* @__PURE__ */ (0, Q.jsx)("span", { children: "Deporvida" })]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("form", {
							className: "crisol-search-bar",
							onSubmit: d,
							role: "search",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("label", {
									htmlFor: "crisol-search",
									className: "visually-hidden",
									children: "Buscar libros"
								}),
								/* @__PURE__ */ (0, Q.jsx)("input", {
									id: "crisol-search",
									type: "search",
									placeholder: "Buscar libros, autores, categorías...",
									value: l,
									onChange: (e) => {
										u(e.target.value);
									},
									className: "crisol-search-input",
									autoComplete: "off"
								}),
								/* @__PURE__ */ (0, Q.jsx)("button", {
									type: "submit",
									className: "crisol-search-btn",
									"aria-label": "Buscar",
									children: /* @__PURE__ */ (0, Q.jsxs)("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, Q.jsx)("circle", {
											cx: "11",
											cy: "11",
											r: "8"
										}), /* @__PURE__ */ (0, Q.jsx)("path", { d: "M21 21l-4.35-4.35" })]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-header-actions",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-icon-btn",
									onClick: (e) => {
										e.preventDefault(), n("favoritos");
									},
									"aria-label": "Mis favoritos",
									children: /* @__PURE__ */ (0, Q.jsx)("svg", {
										width: "22",
										height: "22",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ (0, Q.jsx)("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
									})
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-icon-btn",
									onClick: (e) => {
										if (e.preventDefault(), !o) {
											n("login");
											return;
										}
										o.role === "admin" ? n("admin-dashboard") : o.role === "colaborador" ? n("colaborador-dashboard") : n("cliente-dashboard");
									},
									"aria-label": "Mi cuenta",
									children: /* @__PURE__ */ (0, Q.jsxs)("svg", {
										width: "22",
										height: "22",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: [/* @__PURE__ */ (0, Q.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, Q.jsx)("circle", {
											cx: "12",
											cy: "7",
											r: "4"
										})]
									})
								}),
								o && /* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-icon-btn",
									onClick: (e) => {
										e.preventDefault(), s();
									},
									"aria-label": "Cerrar sesión",
									children: "Salir"
								}),
								/* @__PURE__ */ (0, Q.jsxs)("a", {
									href: "#",
									className: "crisol-cart-link",
									onClick: (e) => {
										e.preventDefault(), n("carrito");
									},
									"aria-label": "Carrito de compras",
									children: [/* @__PURE__ */ (0, Q.jsx)("span", {
										className: "crisol-cart-icon",
										children: "🛒"
									}), /* @__PURE__ */ (0, Q.jsx)("span", {
										className: "crisol-cart-badge",
										children: c
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, Q.jsx)("nav", {
					className: "crisol-nav-bar",
					role: "navigation",
					"aria-label": "Categorías principales",
					children: /* @__PURE__ */ (0, Q.jsxs)("ul", {
						className: "crisol-nav-list",
						children: [
							/* @__PURE__ */ (0, Q.jsx)("li", {
								className: "crisol-nav-item",
								children: /* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-nav-link",
									onClick: (e) => {
										e.preventDefault(), n("home");
									},
									children: "Inicio"
								})
							}),
							/* @__PURE__ */ (0, Q.jsx)("li", {
								className: "crisol-nav-item",
								children: /* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-nav-link",
									onClick: (e) => {
										e.preventDefault(), n("catalogo");
									},
									children: "Catálogo"
								})
							}),
							/* @__PURE__ */ (0, Q.jsx)("li", {
								className: "crisol-nav-item",
								children: /* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-nav-link",
									onClick: (e) => {
										e.preventDefault(), n("about");
									},
									children: "Nosotros"
								})
							}),
							/* @__PURE__ */ (0, Q.jsx)("li", {
								className: "crisol-nav-item",
								children: /* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-nav-link",
									onClick: (e) => {
										e.preventDefault(), n("contact");
									},
									children: "Contacto"
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, Q.jsx)("main", {
				id: "public-content",
				className: "crisol-main",
				children: e
			}),
			/* @__PURE__ */ (0, Q.jsxs)("footer", {
				className: "crisol-footer",
				children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "crisol-footer-top",
					children: [
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-footer-col",
							children: [
								/* @__PURE__ */ (0, Q.jsxs)("a", {
									href: "#",
									className: "crisol-footer-brand-logo",
									onClick: (e) => {
										e.preventDefault(), n("home");
									},
									children: ["Librería ", /* @__PURE__ */ (0, Q.jsx)("span", { children: "Deporvida" })]
								}),
								/* @__PURE__ */ (0, Q.jsx)("p", {
									className: "crisol-footer-tagline",
									children: "Libros y más"
								}),
								/* @__PURE__ */ (0, Q.jsx)("p", {
									className: "crisol-footer-label",
									children: "Síguenos en redes sociales:"
								}),
								/* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "crisol-footer-social",
									children: [
										/* @__PURE__ */ (0, Q.jsx)("a", {
											href: "#",
											"aria-label": "Facebook",
											children: "📘"
										}),
										/* @__PURE__ */ (0, Q.jsx)("a", {
											href: "#",
											"aria-label": "Instagram",
											children: "📸"
										}),
										/* @__PURE__ */ (0, Q.jsx)("a", {
											href: "#",
											"aria-label": "X (Twitter)",
											children: "🐦"
										}),
										/* @__PURE__ */ (0, Q.jsx)("a", {
											href: "#",
											"aria-label": "LinkedIn",
											children: "💼"
										}),
										/* @__PURE__ */ (0, Q.jsx)("a", {
											href: "#",
											"aria-label": "YouTube",
											children: "▶️"
										})
									]
								}),
								/* @__PURE__ */ (0, Q.jsx)("p", {
									className: "crisol-footer-label",
									children: "Métodos de Pago"
								}),
								/* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "crisol-payment-icons",
									children: [
										/* @__PURE__ */ (0, Q.jsx)("span", {
											className: "crisol-payment-badge",
											children: "💳 Mastercard"
										}),
										/* @__PURE__ */ (0, Q.jsx)("span", {
											className: "crisol-payment-badge",
											children: "💳 Visa"
										}),
										/* @__PURE__ */ (0, Q.jsx)("span", {
											className: "crisol-payment-badge",
											children: "📱 Yape"
										}),
										/* @__PURE__ */ (0, Q.jsx)("span", {
											className: "crisol-payment-badge",
											children: "💳 Diners"
										}),
										/* @__PURE__ */ (0, Q.jsx)("span", {
											className: "crisol-payment-badge",
											children: "💳 Amex"
										}),
										/* @__PURE__ */ (0, Q.jsx)("span", {
											className: "crisol-payment-badge",
											children: "📱 Plin"
										})
									]
								}),
								/* @__PURE__ */ (0, Q.jsx)("p", {
									className: "crisol-footer-label",
									children: "Libro de reclamaciones"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "crisol-reclamos-link",
									onClick: (e) => {
										e.preventDefault(), n("contact");
									},
									children: "📋 Libro de Reclamaciones"
								})
							]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-footer-col",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("h4", { children: "Mi cuenta" }),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault(), n(o ? "cliente-pedidos" : "login");
									},
									children: "Mis pedidos"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault(), n("favoritos");
									},
									children: "Mis deseos"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault(), n("contact");
									},
									children: "Recojo en tienda"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault(), n("contact");
									},
									children: "Preguntas frecuentes"
								})
							]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-footer-col",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("h4", { children: "Sobre Nosotros" }),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault(), n("about");
									},
									children: "Quiénes somos"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault(), n("contact");
									},
									children: "Nuestras tiendas"
								})
							]
						})] }),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-footer-col",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("h4", { children: "Contáctanos" }),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "tel:+51174XXXXX",
									children: "(+51) 933080551"
								}),
								/* @__PURE__ */ (0, Q.jsx)("span", {
									className: "crisol-footer-static",
									children: "Lun a Sáb de 8am a 8pm"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "mailto:atencion@deporvida.com",
									children: "atencion@deporvida.com"
								})
							]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-footer-col",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("h4", { children: "Términos y condiciones" }),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => e.preventDefault(),
									children: "Términos y condiciones del usuario"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => e.preventDefault(),
									children: "Políticas de privacidad"
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									onClick: (e) => e.preventDefault(),
									children: "Política de cambios y devoluciones"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "crisol-footer-bottom",
					children: "LIBRERÍA DEPORVIDA | Todos los Derechos Reservados © 2025"
				})]
			})
		]
	});
}
//#endregion
//#region src/layouts/AdminLayout.tsx
function pr({ children: e, userName: t }) {
	let { navigate: n, doLogout: r } = $();
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		id: "admin-layout",
		className: "deporvida-root",
		children: [/* @__PURE__ */ (0, Q.jsxs)("nav", {
			className: "navbar",
			children: [/* @__PURE__ */ (0, Q.jsxs)("a", {
				href: "#",
				className: "navbar-brand",
				onClick: (e) => {
					e.preventDefault(), n("home");
				},
				style: { cursor: "pointer" },
				children: ["Librería ", /* @__PURE__ */ (0, Q.jsx)("span", { children: "Deporvida" })]
			}), /* @__PURE__ */ (0, Q.jsxs)("div", { children: [/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "logout-btn",
				style: { marginRight: "8px" },
				onClick: () => n("home"),
				children: "🏠 Tienda"
			}), /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "logout-btn",
				onClick: r,
				children: "Cerrar Sesión"
			})] })]
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "layout",
			children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "sidebar",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("a", {
						href: "#",
						className: "sidebar-home-link",
						onClick: (e) => {
							e.preventDefault(), n("home");
						},
						children: "← Volver a Tienda"
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "profile",
						children: [/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "avatar",
							children: "A"
						}), /* @__PURE__ */ (0, Q.jsx)("h4", {
							id: "admin-user-name",
							children: t || "Admin"
						})]
					}),
					[
						{
							view: "admin-dashboard",
							label: "Panel",
							icon: "💻"
						},
						{
							view: "admin-colaborador",
							label: "Colaboradores",
							icon: "👤"
						},
						{
							view: "admin-cliente",
							label: "Clientes",
							icon: "📚"
						},
						{
							view: "admin-pedidos",
							label: "Pedidos",
							icon: "📋"
						},
						{
							view: "admin-compras",
							label: "Compras",
							icon: "💰"
						},
						{
							view: "admin-avisos",
							label: "Avisos",
							icon: "📢"
						}
					].map((e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: "#",
						"data-view": e.view,
						onClick: (t) => {
							t.preventDefault(), n(e.view);
						},
						children: [
							e.icon,
							" ",
							e.label
						]
					}, e.view))
				]
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "main-content",
				id: "admin-content",
				children: e
			})]
		})]
	});
}
//#endregion
//#region src/layouts/ColaboradorLayout.tsx
function mr({ children: e, userName: t }) {
	let { navigate: n, doLogout: r } = $();
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		id: "colaborador-layout",
		className: "deporvida-root",
		children: [/* @__PURE__ */ (0, Q.jsxs)("nav", {
			className: "navbar",
			children: [/* @__PURE__ */ (0, Q.jsxs)("a", {
				href: "#",
				className: "navbar-brand",
				onClick: (e) => {
					e.preventDefault(), n("home");
				},
				style: { cursor: "pointer" },
				children: ["Librería ", /* @__PURE__ */ (0, Q.jsx)("span", { children: "Deporvida" })]
			}), /* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "logout-btn",
				onClick: () => n("home"),
				children: "🏠 Tienda"
			}) })]
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "layout",
			children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "sidebar",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("a", {
						href: "#",
						className: "sidebar-home-link",
						onClick: (e) => {
							e.preventDefault(), n("home");
						},
						children: "← Volver a Tienda"
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "profile",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "avatar",
							style: {
								background: "#2ed8b6",
								position: "relative"
							},
							children: [t?.charAt(0).toUpperCase() || "C", /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "avatar-tooltip",
								children: [/* @__PURE__ */ (0, Q.jsx)("div", { className: "tooltip-arrow" }), /* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "tooltip-content",
									children: [
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: () => n("colaborador-dashboard"),
											children: "👤 Mi Perfil"
										}),
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: () => n("colaborador-pedidos"),
											children: "📋 Pedidos"
										}),
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: () => n("colaborador-avisos"),
											children: "📢 Avisos"
										}),
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: r,
											children: "🔴 Cerrar Sesión"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, Q.jsx)("h4", {
							id: "colaborador-user-name",
							children: t || "Colaborador"
						})]
					}),
					[
						{
							view: "colaborador-dashboard",
							label: "Panel",
							icon: "💻"
						},
						{
							view: "colaborador-pedidos",
							label: "Pedidos",
							icon: "📋"
						},
						{
							view: "colaborador-avisos",
							label: "Avisos",
							icon: "📢"
						}
					].map((e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: "#",
						"data-view": e.view,
						onClick: (t) => {
							t.preventDefault(), n(e.view);
						},
						children: [
							e.icon,
							" ",
							e.label
						]
					}, e.view))
				]
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "main-content",
				id: "colaborador-content",
				children: e
			})]
		})]
	});
}
//#endregion
//#region src/layouts/ClienteLayout.tsx
function hr({ children: e, userName: t }) {
	let { navigate: n, doLogout: r } = $();
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		id: "cliente-layout",
		className: "deporvida-root",
		children: [/* @__PURE__ */ (0, Q.jsxs)("nav", {
			className: "navbar",
			children: [/* @__PURE__ */ (0, Q.jsxs)("a", {
				href: "#",
				className: "navbar-brand",
				onClick: (e) => {
					e.preventDefault(), n("home");
				},
				style: { cursor: "pointer" },
				children: ["Librería ", /* @__PURE__ */ (0, Q.jsx)("span", { children: "Deporvida" })]
			}), /* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "logout-btn",
				onClick: () => n("home"),
				children: "🏠 Tienda"
			}) })]
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "layout",
			children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "sidebar",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("a", {
						href: "#",
						className: "sidebar-home-link",
						onClick: (e) => {
							e.preventDefault(), n("home");
						},
						children: "← Volver a Tienda"
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "profile",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "avatar",
							style: {
								background: "#FFB64D",
								position: "relative"
							},
							children: [t?.charAt(0).toUpperCase() || "C", /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "avatar-tooltip",
								children: [/* @__PURE__ */ (0, Q.jsx)("div", { className: "tooltip-arrow" }), /* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "tooltip-content",
									children: [
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: () => n("cliente-dashboard"),
											children: "👤 Mi Perfil"
										}),
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: () => n("cliente-pedidos"),
											children: "📋 Mis Pedidos"
										}),
										/* @__PURE__ */ (0, Q.jsx)("button", {
											className: "tooltip-btn",
											onClick: r,
											children: "🔴 Cerrar Sesión"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, Q.jsx)("h4", {
							id: "cliente-user-name",
							children: t || "Cliente"
						})]
					}),
					[{
						view: "cliente-dashboard",
						label: "Panel",
						icon: "💻"
					}, {
						view: "cliente-pedidos",
						label: "Mis Pedidos",
						icon: "📋"
					}].map((e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: "#",
						"data-view": e.view,
						onClick: (t) => {
							t.preventDefault(), n(e.view);
						},
						children: [
							e.icon,
							" ",
							e.label
						]
					}, e.view))
				]
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "main-content",
				id: "cliente-content",
				children: e
			})]
		})]
	});
}
//#endregion
//#region src/components/public/BookCard.tsx
function gr(e) {
	return e ? e.startsWith("http") ? e : e.startsWith("/imagenes/") ? `${f}${e}` : `${f}/imagenes/${e}` : `${f}/imagenes/default.png`;
}
var _r = `${f}/imagenes/default.png`;
function vr({ libro: e, onAddToCart: t, showFavorite: n = !0, variant: r = "default" }) {
	let { toggleFavorite: a, isFavorito: o, carrito: s } = $(), [c, l] = i(!1), u = o(e.id), d = s.some((t) => t.libro.id === e.id), f = (t) => {
		t.stopPropagation(), a(e.id);
	}, p = e.stock === 0, m = `role-card book-card ${r === "compact" ? "book-card-compact" : ""}`, h = gr(e.urlPortada || e.imagen);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: m,
		style: { position: "relative" },
		children: [
			n && /* @__PURE__ */ (0, Q.jsx)("button", {
				className: `crisol-favorite-btn ${u ? "active" : ""}`,
				onClick: f,
				"aria-label": u ? "Quitar de favoritos" : "Agregar a favoritos",
				"aria-pressed": u,
				children: u ? "♥" : "♡"
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "book-cover",
				children: /* @__PURE__ */ (0, Q.jsx)("img", {
					src: c ? _r : h,
					alt: e.titulo,
					style: {
						width: "100%",
						height: "100%",
						objectFit: "cover",
						borderRadius: "8px"
					},
					onError: () => l(!0),
					loading: "lazy"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("h3", { children: e.titulo }),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "book-author",
				children: e.autor
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "book-category",
				children: e.categoria
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "book-price",
				children: e.enOferta && e.precioEfectivo != null && e.precioEfectivo < e.precio ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
					/* @__PURE__ */ (0, Q.jsxs)("span", {
						style: {
							textDecoration: "line-through",
							color: "#999",
							marginRight: "8px"
						},
						children: ["S/ ", e.precio.toFixed(2)]
					}),
					"S/ ",
					e.precioEfectivo.toFixed(2)
				] }) : `S/ ${e.precio.toFixed(2)}`
			}),
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: `btn ${d ? "btn-success" : "btn-primary"}`,
				onClick: (n) => {
					n.stopPropagation(), d || t(e);
				},
				disabled: p || d,
				"aria-label": p ? `${e.titulo} está agotado` : d ? `${e.titulo} ya está en el carrito` : `Agregar ${e.titulo} al carrito`,
				children: p ? "Agotado" : d ? "En el carrito" : "Agregar al carrito"
			})
		]
	});
}
//#endregion
//#region src/components/public/ProductCarousel.tsx
function yr({ title: e, libros: t, onSeeMore: n, onAddToCart: r, variant: i = "default", showFavorite: a = !0 }) {
	return t.length === 0 ? null : /* @__PURE__ */ (0, Q.jsxs)("section", {
		className: "crisol-carousel-section",
		"aria-labelledby": `carousel-${e}`,
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "crisol-carousel-header",
			children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
				id: `carousel-${e}`,
				className: "crisol-section-title",
				children: e
			}), /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "crisol-see-more",
				onClick: n,
				"aria-label": `Ver más ${e}`,
				children: "Ver más ›"
			})]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "crisol-carousel",
			role: "region",
			"aria-label": `Carrusel ${e}`,
			children: /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "crisol-carousel-track",
				role: "list",
				children: t.map((e) => /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "crisol-carousel-item",
					role: "listitem",
					children: /* @__PURE__ */ (0, Q.jsx)(vr, {
						libro: e,
						onAddToCart: r,
						variant: i,
						showFavorite: a
					})
				}, e.id))
			})
		})]
	});
}
//#endregion
//#region src/components/public/HomeView.tsx
function br() {
	let { data: e, navigate: n, addToCart: a, apiLibros: o, fetchApiLibros: s } = $(), c = o.length > 0 ? o : e.libros ?? [];
	r(() => {
		o.length === 0 && s();
	}, []);
	let [l, u] = i(0), d = [
		{
			title: "Descubre tu próxima gran lectura",
			subtitle: "Miles de títulos en novela, ciencia, historia, infantil y más",
			bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
		},
		{
			title: "Novedades cada semana",
			subtitle: "Los últimos lanzamientos de tus autores favoritos",
			bg: "linear-gradient(135deg, #2d1b4e 0%, #11998e 50%, #38ef7d 100%)"
		},
		{
			title: "Envío gratis desde S/ 150",
			subtitle: "Recibe tus libros en la puerta de tu casa",
			bg: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
		}
	], f = d[l];
	r(() => {
		let e = setInterval(() => {
			u((e) => (e + 1) % d.length);
		}, 5e3);
		return () => clearInterval(e);
	}, []);
	let p = (e) => u(e), m = () => u((e) => (e - 1 + d.length) % d.length), h = () => u((e) => (e + 1) % d.length), g = t(() => [...new Set(c.map((e) => e.categoria))], [c]), _ = t(() => {
		let e = g(), t = [];
		return t.push({
			title: "Novedades",
			libros: [...c].sort((e, t) => t.id - e.id).slice(0, 10)
		}), t.push({
			title: "Los más destacados",
			libros: [...c].sort((e, t) => t.precio - e.precio).slice(0, 10)
		}), e.slice(0, 3).forEach((e) => {
			let n = c.filter((t) => t.categoria === e).slice(0, 10);
			n.length > 0 && t.push({
				title: e,
				libros: n
			});
		}), t;
	}, [c, g])(), v = g();
	return /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: /* @__PURE__ */ (0, Q.jsxs)("main", {
		className: "crisol-main",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("section", {
				className: "crisol-hero",
				role: "region",
				"aria-label": "Banner principal",
				children: /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "crisol-hero-slide",
					style: { background: f.bg },
					children: [
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "crisol-hero-content",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("h1", {
									className: "crisol-hero-title",
									children: f.title
								}),
								/* @__PURE__ */ (0, Q.jsx)("p", {
									className: "crisol-hero-subtitle",
									children: f.subtitle
								}),
								/* @__PURE__ */ (0, Q.jsx)("a", {
									href: "#",
									className: "btn btn-primary crisol-hero-cta",
									onClick: (e) => {
										e.preventDefault(), n("catalogo");
									},
									children: "Explorar catálogo"
								})
							]
						}),
						/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "crisol-hero-dots",
							role: "tablist",
							"aria-label": "Slides del carrusel",
							children: d.map((e, t) => /* @__PURE__ */ (0, Q.jsx)("button", {
								className: `crisol-hero-dot ${t === l ? "active" : ""}`,
								onClick: () => p(t),
								role: "tab",
								"aria-selected": t === l,
								"aria-label": `Ir a slide ${t + 1}`
							}, t))
						}),
						/* @__PURE__ */ (0, Q.jsx)("button", {
							className: "crisol-hero-arrow prev",
							onClick: m,
							"aria-label": "Slide anterior",
							children: /* @__PURE__ */ (0, Q.jsx)("svg", {
								width: "24",
								height: "24",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: /* @__PURE__ */ (0, Q.jsx)("path", { d: "M15 18l-6-6 6-6" })
							})
						}),
						/* @__PURE__ */ (0, Q.jsx)("button", {
							className: "crisol-hero-arrow next",
							onClick: h,
							"aria-label": "Slide siguiente",
							children: /* @__PURE__ */ (0, Q.jsx)("svg", {
								width: "24",
								height: "24",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: /* @__PURE__ */ (0, Q.jsx)("path", { d: "M9 18l6-6-6-6" })
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("section", {
				className: "crisol-banner-row",
				"aria-label": "Banners promocionales",
				children: [
					{
						title: "2x1 en Novelas",
						subtitle: "Solo esta semana",
						icon: "📚"
					},
					{
						title: "Nuevos Ebooks",
						subtitle: "Descarga inmediata",
						icon: "📱"
					},
					{
						title: "Infantil & Juvenil",
						subtitle: "Descuentos especiales",
						icon: "🧸"
					},
					{
						title: "Envío Gratis",
						subtitle: "Compras sobre S/ 150",
						icon: "🚚"
					}
				].map((e, t) => /* @__PURE__ */ (0, Q.jsx)("article", {
					className: "crisol-banner",
					children: /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "crisol-banner-content",
						children: [
							/* @__PURE__ */ (0, Q.jsx)("span", {
								style: {
									fontSize: "48px",
									marginBottom: "12px"
								},
								children: e.icon
							}),
							/* @__PURE__ */ (0, Q.jsx)("h3", {
								className: "crisol-banner-title",
								children: e.title
							}),
							/* @__PURE__ */ (0, Q.jsx)("p", {
								className: "crisol-banner-subtitle",
								children: e.subtitle
							})
						]
					})
				}, t))
			}),
			_.map((e, t) => /* @__PURE__ */ (0, Q.jsx)(yr, {
				title: e.title,
				libros: e.libros,
				onSeeMore: () => n("catalogo"),
				onAddToCart: a,
				variant: "compact"
			}, t)),
			/* @__PURE__ */ (0, Q.jsxs)("section", {
				className: "crisol-category-section",
				"aria-labelledby": "categorias-title",
				children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
					id: "categorias-title",
					className: "crisol-category-title",
					children: "Un mundo para cada lector"
				}), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "crisol-category-grid",
					role: "list",
					children: v.map((e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: "#",
						className: "crisol-category-circle",
						onClick: (t) => {
							t.preventDefault(), n("catalogo", { category: e });
						},
						role: "listitem",
						children: [/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "crisol-category-icon",
							"aria-hidden": "true",
							children: {
								Novela: "📖",
								Ficción: "🔮",
								Infantil: "🧸",
								Autoayuda: "💡",
								Negocios: "💼",
								Historia: "🏛️",
								Ciencia: "🔬",
								Poesía: "📜",
								Cómics: "💬",
								Académico: "🎓"
							}[e] || "📚"
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "crisol-category-name",
							children: e
						})]
					}, e))
				})]
			})
		]
	}) });
}
//#endregion
//#region src/components/public/AboutView.tsx
function xr() {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "about-page",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h2", { children: "Sobre Nosotros" }),
			/* @__PURE__ */ (0, Q.jsx)("p", { children: "Somos Librería Deporvida, un espacio dedicado a la venta y difusión de libros para todo tipo de lectores. Nuestro objetivo es acercar el conocimiento, la cultura y el entretenimiento a través de una variedad de publicaciones." }),
			/* @__PURE__ */ (0, Q.jsx)("p", { children: "Contamos con libros de diferentes temáticas, incluyendo deporte, historia, literatura, educación, análisis y otros contenidos pensados para quienes disfrutan aprender y descubrir nuevas ideas." }),
			/* @__PURE__ */ (0, Q.jsx)("p", { children: "Creemos que cada libro tiene una historia que contar y una enseñanza que compartir. Por eso trabajamos para ofrecer títulos de calidad y acompañar a nuestros clientes en su camino de lectura." }),
			/* @__PURE__ */ (0, Q.jsx)("h3", { children: "Que leer sea el deporte de nuestras vidas." }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn btn-primary",
				onClick: () => window.location.href = "#home",
				children: "INICIO"
			})
		]
	});
}
//#endregion
//#region src/components/public/ContactView.tsx
function Sr() {
	let [e, t] = i(""), [n, r] = i(""), [a, o] = i(""), [s, c] = i(!1);
	return s ? /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "about-page",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h2", { children: "¡Tu mensaje fue enviado con éxito!" }),
			/* @__PURE__ */ (0, Q.jsx)("p", { children: "Responderemos a tu consulta muy pronto" }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn btn-primary",
				onClick: () => window.location.href = "#home",
				children: "INICIO"
			})
		]
	}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
		style: {
			marginTop: "100px",
			textAlign: "center",
			padding: "20px 10%"
		},
		children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
			style: {
				color: "#2ed8b6",
				marginBottom: "30px"
			},
			children: "¡Envíanos tus comentarios!"
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "form-container",
			style: {
				display: "inline-block",
				textAlign: "left"
			},
			children: [/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "form-header",
				children: "Contáctanos"
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "form-body",
				children: /* @__PURE__ */ (0, Q.jsxs)("form", {
					onSubmit: (t) => {
						if (t.preventDefault(), !e || !n || !a) {
							alert("Por favor completa todos los campos");
							return;
						}
						c(!0);
					},
					children: [
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Nombre" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								value: e,
								onChange: (e) => t(e.target.value),
								placeholder: "Tu Nombre",
								required: !0
							})]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Correo" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "email",
								value: n,
								onChange: (e) => r(e.target.value),
								placeholder: "Tu Correo",
								required: !0
							})]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Mensaje" }), /* @__PURE__ */ (0, Q.jsx)("textarea", {
								value: a,
								onChange: (e) => o(e.target.value),
								rows: 4,
								placeholder: "Tu Mensaje",
								required: !0
							})]
						}),
						/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "form-actions",
							children: /* @__PURE__ */ (0, Q.jsx)("button", {
								type: "submit",
								className: "btn btn-primary",
								children: "Enviar Mensaje"
							})
						})
					]
				})
			})]
		})]
	});
}
//#endregion
//#region src/components/public/RoleClickView.tsx
function Cr({ role: e, roleKey: t, color: n }) {
	let { navigate: r } = $();
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "hero",
		style: {
			marginTop: "70px",
			padding: "80px 20px"
		},
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("h1", {
				style: { fontSize: "40px" },
				children: ["Hola, ", e]
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				style: { fontSize: "18px" },
				children: "Bienvenido al Sistema de Gestión de Librería Deporvida."
			}),
			/* @__PURE__ */ (0, Q.jsx)("hr", { style: {
				borderColor: "#444",
				maxWidth: "500px",
				margin: "20px auto"
			} }),
			/* @__PURE__ */ (0, Q.jsx)("p", { children: "Puedes acceder a distintas funciones luego de iniciar sesión o registrarte." }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn",
				style: {
					background: n,
					margin: "5px"
				},
				onClick: () => r(`${t}-signup`),
				children: "Registrarse"
			}),
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn",
				style: {
					background: n,
					marginLeft: "10px"
				},
				onClick: () => r("login"),
				children: "Iniciar Sesión"
			})
		]
	});
}
//#endregion
//#region src/components/public/SignupView.tsx
var wr = {
	admin: "Administrador",
	colaborador: "Colaborador",
	cliente: "Cliente"
};
function Tr({ role: e }) {
	let { navigate: t, doSignup: n, navParams: r } = $(), [a, o] = i({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		salary: "",
		mobile: ""
	}), [s, c] = i(""), l = (e) => {
		o((t) => ({
			...t,
			[e.target.name]: e.target.value
		}));
	};
	return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "auth-page",
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "form-container",
			style: { maxWidth: "600px" },
			children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "form-header",
				children: ["Registro de ", wr[e] || e]
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "form-body",
				children: /* @__PURE__ */ (0, Q.jsxs)("form", {
					onSubmit: async (t) => {
						t.preventDefault(), c("");
						let i = await n(e, a, r.redirectTo);
						i.success || c(i.message || "El registro falló. Intenta de nuevo.");
					},
					children: [
						s && /* @__PURE__ */ (0, Q.jsx)("div", {
							style: {
								color: "red",
								marginBottom: "15px",
								textAlign: "center"
							},
							children: s
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Nombre" }), /* @__PURE__ */ (0, Q.jsx)("input", {
									type: "text",
									name: "firstName",
									value: a.firstName,
									onChange: l,
									placeholder: "Nombre",
									required: !0
								})]
							}), /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Apellido" }), /* @__PURE__ */ (0, Q.jsx)("input", {
									type: "text",
									name: "lastName",
									value: a.lastName,
									onChange: l,
									placeholder: "Apellido",
									required: !0
								})]
							})]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Usuario" }), /* @__PURE__ */ (0, Q.jsx)("input", {
									type: "text",
									name: "username",
									value: a.username,
									onChange: l,
									placeholder: "Usuario",
									required: !0
								})]
							}), /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Email" }), /* @__PURE__ */ (0, Q.jsx)("input", {
									type: "email",
									name: "email",
									value: a.email,
									onChange: l,
									placeholder: "correo@ejemplo.com",
									required: !0
								})]
							})]
						}),
						/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "form-row",
							children: /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Contraseña" }), /* @__PURE__ */ (0, Q.jsx)("input", {
									type: "password",
									name: "password",
									value: a.password,
									onChange: l,
									placeholder: "Contraseña",
									required: !0
								})]
							})
						}),
						e === "colaborador" && /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Salario" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "number",
								name: "salary",
								value: a.salary,
								onChange: l,
								placeholder: "Salario"
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Celular" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "mobile",
								value: a.mobile,
								onChange: l,
								placeholder: "Celular"
							})]
						})] }),
						e === "cliente" && /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Celular" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "mobile",
								value: a.mobile,
								onChange: l,
								placeholder: "Celular"
							})]
						}),
						/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "form-actions",
							children: /* @__PURE__ */ (0, Q.jsx)("button", {
								type: "submit",
								className: "btn btn-primary",
								children: "Enviar"
							})
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-footer",
							children: ["¿Ya tienes cuenta? ", /* @__PURE__ */ (0, Q.jsx)("a", {
								href: "#",
								onClick: (e) => {
									e.preventDefault(), t("login");
								},
								children: "Inicia sesión aquí"
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
//#region src/components/public/LoginView.tsx
function Er() {
	let { navigate: e, doLogin: t, navParams: n } = $(), [r, a] = i(""), [o, s] = i(""), [c, l] = i("");
	return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "auth-page",
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "form-container",
			style: { maxWidth: "600px" },
			children: [/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "form-header",
				children: "Inicio de Sesión"
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "form-body",
				children: /* @__PURE__ */ (0, Q.jsxs)("form", {
					onSubmit: async (e) => {
						e.preventDefault(), l("");
						let i = await t(r, o, n.redirectTo);
						i.success || l(i.message || "Usuario o contraseña inválidos");
					},
					children: [
						c && /* @__PURE__ */ (0, Q.jsx)("div", {
							style: {
								color: "red",
								marginBottom: "15px",
								textAlign: "center"
							},
							children: c
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Usuario" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								value: r,
								onChange: (e) => a(e.target.value),
								placeholder: "Usuario",
								required: !0
							})]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Contraseña" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "password",
								value: o,
								onChange: (e) => s(e.target.value),
								placeholder: "Contraseña",
								required: !0
							})]
						}),
						/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "form-actions",
							children: /* @__PURE__ */ (0, Q.jsx)("button", {
								type: "submit",
								className: "btn btn-primary",
								children: "Ingresar"
							})
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-footer",
							children: ["¿No tienes cuenta? ", /* @__PURE__ */ (0, Q.jsx)("a", {
								href: "#",
								onClick: (t) => {
									t.preventDefault(), e("cliente-click");
								},
								children: "Regístrate aquí"
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
//#region src/services/categoriaService.ts
var Dr = {
	getAll: (e) => Y.get("/categories", { params: e }),
	getAllActivo: () => Y.get("/categories/activo"),
	getById: (e) => Y.get(`/categories/${e}`),
	search: (e, t) => Y.get("/categories/search", { params: {
		keyword: e,
		...t
	} })
};
//#endregion
//#region src/components/public/CatalogoView.tsx
function Or() {
	let { apiLibros: e, apiLoading: t, apiError: n, addToCart: a, fetchApiLibros: o, navParams: s } = $(), [c, l] = i([]), [u, d] = i(null), [f, p] = i(null);
	r(() => {
		o(), Dr.getAllActivo().then((e) => l(e.data)).catch(() => {});
	}, []), r(() => {
		s.searchTerm ? Kn.search(s.searchTerm, { size: 50 }).then((e) => p(e.data.content)).catch(() => p([])) : p(null);
	}, [s.searchTerm]);
	let m = f ?? e, h = u ? m.filter((e) => e.categoria === c.find((e) => e.id === u)?.nombre) : m;
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "hero",
		style: { padding: "60px 20px" },
		children: [/* @__PURE__ */ (0, Q.jsx)("h1", { children: "Catálogo de Libros" }), /* @__PURE__ */ (0, Q.jsx)("p", { children: "Todos nuestros títulos disponibles" })]
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		style: {
			padding: "20px 5%",
			maxWidth: "1200px",
			margin: "0 auto"
		},
		children: [
			n && /* @__PURE__ */ (0, Q.jsxs)("div", {
				style: {
					color: "#c00",
					background: "#fff0f0",
					padding: "16px",
					borderRadius: "8px",
					marginBottom: "20px",
					textAlign: "center"
				},
				children: [
					n,
					/* @__PURE__ */ (0, Q.jsx)("br", {}),
					/* @__PURE__ */ (0, Q.jsx)("button", {
						className: "btn btn-blue",
						style: { marginTop: "10px" },
						onClick: o,
						children: "Reintentar"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				style: {
					display: "flex",
					gap: "10px",
					marginBottom: "30px",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, Q.jsx)("button", {
					className: `btn ${u ? "btn-blue" : "btn-primary"}`,
					onClick: () => d(null),
					children: "Todos"
				}), c.map((e) => /* @__PURE__ */ (0, Q.jsx)("button", {
					className: `btn ${u === e.id ? "btn-primary" : "btn-blue"}`,
					onClick: () => d(e.id),
					children: e.nombre
				}, e.id))]
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "cards-grid",
				children: t ? /* @__PURE__ */ (0, Q.jsx)("p", {
					style: {
						gridColumn: "1/-1",
						textAlign: "center",
						color: "#888",
						padding: "40px"
					},
					children: "Cargando libros..."
				}) : h.length === 0 && !n ? /* @__PURE__ */ (0, Q.jsx)("p", {
					style: {
						gridColumn: "1/-1",
						textAlign: "center",
						color: "#888",
						padding: "40px"
					},
					children: "No hay libros disponibles."
				}) : h.map((e) => /* @__PURE__ */ (0, Q.jsx)(vr, {
					libro: e,
					onAddToCart: a,
					variant: "default"
				}, e.id))
			})
		]
	})] });
}
//#endregion
//#region src/components/public/CarritoView.tsx
function kr() {
	let { carrito: e, removeFromCart: t, updateCartQuantity: n, clearCart: r, getCartTotal: i, getCartCount: a, navigate: o } = $();
	return e.length === 0 ? /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "about-page",
		style: { minHeight: "50vh" },
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h2", { children: "🛒 Tu carrito está vacío" }),
			/* @__PURE__ */ (0, Q.jsx)("p", { children: "No has agregado ningún libro aún." }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn btn-primary",
				onClick: () => o("catalogo"),
				children: "Ir al Catálogo"
			})
		]
	}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
		style: {
			marginTop: "100px",
			padding: "20px",
			maxWidth: "900px",
			margin: "100px auto 0"
		},
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h2", {
				className: "section-title",
				children: "Carrito de Compras"
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "table-container",
				children: /* @__PURE__ */ (0, Q.jsxs)("table", {
					className: "data-table",
					children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Libro" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Precio" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Cantidad" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Subtotal" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Acciones" })
					] }) }), /* @__PURE__ */ (0, Q.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "10px"
							},
							children: [/* @__PURE__ */ (0, Q.jsx)("img", {
								src: gr(e.libro.urlPortada || e.libro.imagen),
								alt: e.libro.titulo,
								style: {
									width: "50px",
									height: "70px",
									objectFit: "cover",
									borderRadius: "4px"
								}
							}), /* @__PURE__ */ (0, Q.jsxs)("div", { children: [
								/* @__PURE__ */ (0, Q.jsx)("strong", { children: e.libro.titulo }),
								/* @__PURE__ */ (0, Q.jsx)("br", {}),
								/* @__PURE__ */ (0, Q.jsx)("small", {
									style: { color: "#888" },
									children: e.libro.autor
								})
							] })]
						}) }),
						/* @__PURE__ */ (0, Q.jsxs)("td", { children: ["S/ ", e.libro.precio.toFixed(2)] }),
						/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "10px"
							},
							children: [
								/* @__PURE__ */ (0, Q.jsx)("button", {
									className: "btn btn-sm",
									style: {
										background: "#19b3d3",
										padding: "5px 12px"
									},
									onClick: () => n(e.libro.id, e.cantidad - 1),
									disabled: e.cantidad <= 1,
									children: "-"
								}),
								/* @__PURE__ */ (0, Q.jsx)("span", {
									style: {
										minWidth: "30px",
										textAlign: "center"
									},
									children: e.cantidad
								}),
								/* @__PURE__ */ (0, Q.jsx)("button", {
									className: "btn btn-sm",
									style: {
										background: "#19b3d3",
										padding: "5px 12px"
									},
									onClick: () => n(e.libro.id, e.cantidad + 1),
									disabled: e.cantidad >= 1e3,
									children: "+"
								})
							]
						}) }),
						/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsxs)("strong", { children: ["S/ ", (e.libro.precio * e.cantidad).toFixed(2)] }) }),
						/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
							className: "btn btn-sm btn-danger",
							onClick: () => t(e.libro.id),
							children: "Eliminar"
						}) })
					] }, e.libro.id)) })]
				})
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "30px",
					flexWrap: "wrap",
					gap: "20px"
				},
				children: [/* @__PURE__ */ (0, Q.jsxs)("div", { children: [/* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-warning",
					onClick: r,
					children: "Vaciar Carrito"
				}), /* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-blue",
					style: { marginLeft: "10px" },
					onClick: () => o("catalogo"),
					children: "Seguir Comprando"
				})] }), /* @__PURE__ */ (0, Q.jsxs)("div", {
					style: { textAlign: "right" },
					children: [
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							style: {
								fontSize: "24px",
								fontWeight: "bold",
								color: "#19b3d3"
							},
							children: ["Total: S/ ", i().toFixed(2)]
						}),
						/* @__PURE__ */ (0, Q.jsxs)("div", {
							style: {
								color: "#888",
								fontSize: "14px",
								marginTop: "5px"
							},
							children: [
								a(),
								" producto",
								a() === 1 ? "" : "s",
								" en el carrito"
							]
						}),
						/* @__PURE__ */ (0, Q.jsx)("button", {
							className: "btn btn-success",
							style: {
								marginTop: "15px",
								padding: "15px 40px",
								fontSize: "18px"
							},
							onClick: () => o("checkout"),
							children: "Finalizar Compra"
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/services/pedidoService.ts
var Ar = {
	create: (e) => Y.post("/pedidos", e),
	getById: (e) => Y.get(`/pedidos/${e}`),
	getByNumeroPedido: (e) => Y.get(`/pedidos/numero/${e}`),
	getMisPedidos: (e) => Y.get("/pedidos", { params: e }),
	getAll: (e) => Y.get("/pedidos/all", { params: e }),
	cancel: (e, t) => Y.put(`/pedidos/${e}/cancelar`, null, { params: { motivo: t } })
}, jr = {
	createPago: (e) => Y.post("/pagos", e),
	processPago: (e) => Y.put(`/pagos/${e}/procesar`)
};
//#endregion
//#region src/components/public/CheckoutView.tsx
function Mr() {
	let { carrito: e, getCartTotal: t, clearCart: n, navigate: r, token: a } = $(), [o, s] = i({
		cardholderName: "",
		cardNumber: "",
		expiry: "",
		cvv: ""
	}), [c, l] = i({
		direccionEnvio: "",
		ciudadEnvio: "",
		departamentoEnvio: "",
		codigoPostalEnvio: "",
		paisEnvio: "Perú",
		telefonoEnvio: "",
		notas: ""
	}), [u, d] = i(!1), [f, p] = i(null), [m, h] = i(!1), [g, _] = i(0), [v, y] = i(0), b = t();
	if (!a) return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "checkout-container",
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "checkout-empty",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("h2", { children: "Inicia sesión para continuar" }),
				/* @__PURE__ */ (0, Q.jsx)("p", { children: "Debes iniciar sesión para realizar una compra." }),
				/* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-primary",
					onClick: () => r("login", { redirectTo: "checkout" }),
					children: "Iniciar Sesión"
				})
			]
		})
	});
	if (e.length === 0 && !m) return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "checkout-container",
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "checkout-empty",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("h2", { children: "Tu carrito está vacío" }),
				/* @__PURE__ */ (0, Q.jsx)("p", { children: "No has agregado ningún libro aún." }),
				/* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-primary",
					onClick: () => r("catalogo"),
					children: "Ir al Catálogo"
				})
			]
		})
	});
	if (m) return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "checkout-container",
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "checkout-success",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("div", {
					className: "success-icon",
					children: "✓"
				}),
				/* @__PURE__ */ (0, Q.jsx)("h2", { children: "¡Pago realizado con éxito!" }),
				/* @__PURE__ */ (0, Q.jsx)("p", { children: "Tu pedido ha sido confirmado. Recibirás un email con los detalles." }),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "order-summary",
					children: [/* @__PURE__ */ (0, Q.jsxs)("p", { children: [
						/* @__PURE__ */ (0, Q.jsx)("strong", { children: "Total pagado:" }),
						" S/ ",
						g.toFixed(2)
					] }), /* @__PURE__ */ (0, Q.jsxs)("p", { children: [
						/* @__PURE__ */ (0, Q.jsx)("strong", { children: "Productos:" }),
						" ",
						v,
						" libro",
						v === 1 ? "" : "s"
					] })]
				}),
				/* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-primary",
					onClick: () => r("cliente-pedidos"),
					children: "Ver mis pedidos"
				}),
				/* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-blue",
					style: { marginLeft: "10px" },
					onClick: () => r("home"),
					children: "Volver al Inicio"
				})
			]
		})
	});
	let x = (e) => {
		let { name: t, value: n } = e.target;
		s((e) => ({
			...e,
			[t]: n
		})), p(null);
	}, S = (e) => {
		let { name: t, value: n } = e.target;
		l((e) => ({
			...e,
			[t]: n
		})), p(null);
	}, C = (e) => (e.replace(/\D/g, "").slice(0, 16).match(/.{1,4}/g) || []).join(" "), w = (e) => {
		let t = e.replace(/\D/g, "").slice(0, 4);
		return t.length >= 3 ? `${t.slice(0, 2)}/${t.slice(2)}` : t;
	}, T = (e) => {
		let t = C(e.target.value);
		s((e) => ({
			...e,
			cardNumber: t
		}));
	}, E = (e) => {
		let t = w(e.target.value);
		s((e) => ({
			...e,
			expiry: t
		}));
	}, D = () => c.direccionEnvio.trim() ? c.ciudadEnvio.trim() ? c.departamentoEnvio.trim() ? c.codigoPostalEnvio.trim() ? c.paisEnvio.trim() ? o.cardholderName.trim() ? o.cardNumber.replace(/\s/g, "").length === 16 ? /^\d{2}\/\d{2}$/.test(o.expiry) ? o.cvv.length === 3 ? !0 : (p("El CVV debe tener 3 d&iacute;gitos"), !1) : (p("La fecha de expiraci&oacute;n debe ser MM/AA"), !1) : (p("El n&uacute;mero de tarjeta debe tener 16 d&iacute;gitos"), !1) : (p("Ingresa el nombre del titular de la tarjeta"), !1) : (p("Ingresa el pa&iacute;s de env&iacute;o"), !1) : (p("Ingresa el c&oacute;digo postal"), !1) : (p("Ingresa el departamento de env&iacute;o"), !1) : (p("Ingresa la ciudad de env&iacute;o"), !1) : (p("Ingresa la direcci&oacute;n de env&iacute;o"), !1);
	return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "checkout-container",
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "checkout-wrapper",
			children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "checkout-summary",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("h2", {
						className: "section-title",
						children: "Resumen del Pedido"
					}),
					/* @__PURE__ */ (0, Q.jsx)("div", {
						className: "checkout-items",
						children: e.map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "checkout-item",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("img", {
									src: gr(e.libro.urlPortada || e.libro.imagen),
									alt: e.libro.titulo,
									className: "checkout-item-image",
									style: {
										width: "50px",
										height: "70px",
										objectFit: "cover",
										borderRadius: "4px"
									}
								}),
								/* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "checkout-item-details",
									children: [
										/* @__PURE__ */ (0, Q.jsx)("strong", { children: e.libro.titulo }),
										/* @__PURE__ */ (0, Q.jsx)("br", {}),
										/* @__PURE__ */ (0, Q.jsx)("small", {
											style: { color: "#888" },
											children: e.libro.autor
										})
									]
								}),
								/* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "checkout-item-price",
									children: [/* @__PURE__ */ (0, Q.jsxs)("span", { children: ["x", e.cantidad] }), /* @__PURE__ */ (0, Q.jsxs)("strong", { children: ["S/ ", (e.libro.precio * e.cantidad).toFixed(2)] })]
								})
							]
						}, e.libro.id))
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "checkout-total",
						children: [/* @__PURE__ */ (0, Q.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, Q.jsxs)("strong", { children: ["S/ ", b.toFixed(2)] })]
					})
				]
			}), /* @__PURE__ */ (0, Q.jsxs)("form", {
				className: "checkout-form",
				onSubmit: async (t) => {
					if (t.preventDefault(), p(null), !D()) return;
					d(!0);
					let r = b, i = e.reduce((e, t) => e + t.cantidad, 0);
					try {
						let e = (await Ar.create({
							direccionEnvio: c.direccionEnvio,
							ciudadEnvio: c.ciudadEnvio,
							departamentoEnvio: c.departamentoEnvio,
							codigoPostalEnvio: c.codigoPostalEnvio,
							paisEnvio: c.paisEnvio,
							telefonoEnvio: c.telefonoEnvio || void 0,
							notas: c.notas || void 0
						})).data.id, t = (await jr.createPago({
							pedidoId: e,
							metodoPago: "TARJETA_CREDITO",
							monto: r
						})).data.id;
						await jr.processPago(t), _(r), y(i), h(!0), n();
					} catch (e) {
						let t = e.response?.data?.message || e.message || "Error al procesar el pago. Intenta nuevamente.";
						p(t);
					} finally {
						d(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, Q.jsx)("h2", {
						className: "section-title",
						children: "Dirección de Envío"
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, Q.jsx)("label", {
							htmlFor: "direccionEnvio",
							children: "Dirección"
						}), /* @__PURE__ */ (0, Q.jsx)("input", {
							type: "text",
							id: "direccionEnvio",
							name: "direccionEnvio",
							value: c.direccionEnvio,
							onChange: S,
							placeholder: "Av. Principal 123",
							required: !0,
							disabled: u
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "ciudadEnvio",
								children: "Ciudad"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "ciudadEnvio",
								name: "ciudadEnvio",
								value: c.ciudadEnvio,
								onChange: S,
								placeholder: "Lima",
								required: !0,
								disabled: u
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "departamentoEnvio",
								children: "Departamento"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "departamentoEnvio",
								name: "departamentoEnvio",
								value: c.departamentoEnvio,
								onChange: S,
								placeholder: "Lima",
								required: !0,
								disabled: u
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "codigoPostalEnvio",
								children: "Código Postal"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "codigoPostalEnvio",
								name: "codigoPostalEnvio",
								value: c.codigoPostalEnvio,
								onChange: S,
								placeholder: "15000",
								required: !0,
								disabled: u
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "paisEnvio",
								children: "País"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "paisEnvio",
								name: "paisEnvio",
								value: c.paisEnvio,
								onChange: S,
								placeholder: "Perú",
								required: !0,
								disabled: u
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("div", {
						className: "form-row",
						children: /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "telefonoEnvio",
								children: "Teléfono (opcional)"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "telefonoEnvio",
								name: "telefonoEnvio",
								value: c.telefonoEnvio,
								onChange: S,
								placeholder: "999 888 777",
								disabled: u
							})]
						})
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, Q.jsx)("label", {
							htmlFor: "notas",
							children: "Notas (opcional)"
						}), /* @__PURE__ */ (0, Q.jsx)("textarea", {
							id: "notas",
							name: "notas",
							value: c.notas,
							onChange: S,
							placeholder: "Instrucciones especiales de entrega...",
							rows: 3,
							style: {
								width: "100%",
								padding: "10px",
								borderRadius: "6px",
								border: "1px solid #ddd",
								fontSize: "14px"
							},
							disabled: u
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("h2", {
						className: "section-title",
						style: { marginTop: "20px" },
						children: "Datos de Pago"
					}),
					f && /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "checkout-error",
						role: "alert",
						children: f
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, Q.jsx)("label", {
							htmlFor: "cardholderName",
							children: "Nombre en la tarjeta"
						}), /* @__PURE__ */ (0, Q.jsx)("input", {
							type: "text",
							id: "cardholderName",
							name: "cardholderName",
							value: o.cardholderName,
							onChange: x,
							placeholder: "JUAN PEREZ",
							required: !0,
							autoComplete: "cc-name",
							disabled: u
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, Q.jsx)("label", {
							htmlFor: "cardNumber",
							children: "Número de tarjeta"
						}), /* @__PURE__ */ (0, Q.jsx)("input", {
							type: "text",
							id: "cardNumber",
							name: "cardNumber",
							value: o.cardNumber,
							onChange: T,
							placeholder: "1234 5678 9012 3456",
							maxLength: 19,
							required: !0,
							autoComplete: "cc-number",
							disabled: u
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "expiry",
								children: "Expiración (MM/AA)"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "expiry",
								name: "expiry",
								value: o.expiry,
								onChange: E,
								placeholder: "12/25",
								maxLength: 5,
								required: !0,
								autoComplete: "cc-exp",
								disabled: u
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", {
								htmlFor: "cvv",
								children: "CVV"
							}), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								id: "cvv",
								name: "cvv",
								value: o.cvv,
								onChange: x,
								placeholder: "123",
								maxLength: 3,
								required: !0,
								autoComplete: "cc-csc",
								disabled: u
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("button", {
						type: "submit",
						className: "btn btn-success checkout-submit-btn",
						disabled: u,
						children: u ? "Procesando..." : `Pagar S/ ${b.toFixed(2)}`
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/public/FavoritosView.tsx
function Nr() {
	let { getFavoritos: e, addToCart: t, navigate: n } = $(), r = e();
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "hero",
		style: { padding: "60px 20px" },
		children: [/* @__PURE__ */ (0, Q.jsx)("h1", { children: "Mis Favoritos" }), /* @__PURE__ */ (0, Q.jsx)("p", { children: r.length === 0 ? "Aún no has agregado libros a favoritos" : `${r.length} libro(s) guardado(s)` })]
	}), /* @__PURE__ */ (0, Q.jsx)("div", {
		style: {
			padding: "20px 5%",
			maxWidth: "1200px",
			margin: "0 auto"
		},
		children: r.length === 0 ? /* @__PURE__ */ (0, Q.jsxs)("div", {
			style: {
				textAlign: "center",
				padding: "60px 20px"
			},
			children: [
				/* @__PURE__ */ (0, Q.jsx)("p", {
					style: {
						fontSize: "48px",
						marginBottom: "16px"
					},
					children: "♡"
				}),
				/* @__PURE__ */ (0, Q.jsx)("p", {
					style: {
						color: "#888",
						marginBottom: "24px",
						fontSize: "16px"
					},
					children: "Explora nuestro catálogo y agrega tus libros favoritos"
				}),
				/* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-primary",
					onClick: () => n("catalogo"),
					children: "Ir al catálogo"
				})
			]
		}) : /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "cards-grid",
			children: r.map((e) => /* @__PURE__ */ (0, Q.jsx)(vr, {
				libro: e,
				onAddToCart: t,
				variant: "default"
			}, e.id))
		})
	})] });
}
//#endregion
//#region src/services/usuarioService.ts
var Pr = {
	getAll: (e) => Y.get("/usuarios", { params: e }),
	getById: (e) => Y.get(`/usuarios/${e}`),
	update: (e, t) => Y.put(`/usuarios/${e}`, t),
	delete: (e) => Y.delete(`/usuarios/${e}`),
	toggleActivo: (e) => Y.put(`/usuarios/${e}/toggle-activo`),
	actualizarRoles: (e, t) => Y.put(`/usuarios/${e}/roles`, t)
};
//#endregion
//#region src/components/admin/AdminDashboardView.tsx
function Fr() {
	let { data: e } = $(), [t, n] = i({
		admins: 0,
		usuarios: 0,
		vendedores: 0,
		total: 0
	});
	r(() => {
		Pr.getAll({ size: 100 }).then((e) => {
			let t = e.data.content;
			n({
				total: t.length,
				admins: t.filter((e) => e.roles.includes("ROL_ADMIN")).length,
				usuarios: t.filter((e) => e.roles.includes("ROL_USUARIO")).length,
				vendedores: t.filter((e) => e.roles.includes("ROL_VENDEDOR")).length
			});
		}).catch(() => {});
	}, []);
	let a = e.avisos.map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "notice-item",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "notice-close",
				onClick: () => {},
				children: "×"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("strong", { children: [
				d(e.date),
				" || Por: ",
				e.by
			] }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			e.message
		]
	}, e.id));
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			children: "Panel de Administración"
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "dashboard-cards",
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-blue",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Total Usuarios" }), /* @__PURE__ */ (0, Q.jsxs)("h2", { children: [
						/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "icon-left",
							children: "👥"
						}),
						" ",
						t.total
					] })]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-green",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Clientes (ROL_USUARIO)" }), /* @__PURE__ */ (0, Q.jsxs)("h2", { children: [
						/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "icon-left",
							children: "📚"
						}),
						" ",
						t.usuarios
					] })]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-yellow",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Administradores" }), /* @__PURE__ */ (0, Q.jsxs)("h2", { children: [
						/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "icon-left",
							children: "💼"
						}),
						" ",
						t.admins
					] })]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-pink",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Vendedores" }), /* @__PURE__ */ (0, Q.jsxs)("h2", { children: [
						/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "icon-left",
							children: "💰"
						}),
						" ",
						t.vendedores
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "notice-section",
			style: { padding: "0 30px" },
			children: [/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "notice-board-title",
				children: "Tablón de Avisos"
			}), a.length > 0 ? a : /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					color: "#888",
					padding: "15px"
				},
				children: "Sin avisos"
			})]
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			style: {
				padding: "16px 30px",
				marginTop: "20px",
				background: "#fff8e1",
				border: "1px solid #ffe082",
				borderRadius: "8px"
			},
			children: /* @__PURE__ */ (0, Q.jsxs)("p", {
				style: {
					color: "#8a6d00",
					fontSize: "13px"
				},
				children: [/* @__PURE__ */ (0, Q.jsx)("strong", { children: "Nota:" }), " La gestión de colaboradores (salarios, aprobación) es una funcionalidad pendiente de implementación en el backend."]
			})
		})
	] });
}
//#endregion
//#region src/components/admin/AdminColaboradorMenuView.tsx
function Ir() {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Menú de Colaboradores"
	}), /* @__PURE__ */ (0, Q.jsx)("div", {
		style: {
			padding: "40px",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			style: {
				background: "#fff8e1",
				border: "1px solid #ffe082",
				borderRadius: "8px",
				padding: "30px",
				maxWidth: "500px",
				margin: "0 auto"
			},
			children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
				style: {
					color: "#8a6d00",
					marginBottom: "16px"
				},
				children: "Funcionalidad pendiente de backend"
			}), /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					color: "#666",
					lineHeight: "1.6"
				},
				children: "La gestión de colaboradores es una funcionalidad pendiente de implementación en el backend."
			})]
		})
	})] });
}
//#endregion
//#region src/components/admin/AdminViewColaboradorView.tsx
function Lr() {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Gestión de Colaboradores"
	}), /* @__PURE__ */ (0, Q.jsx)("div", {
		style: {
			padding: "40px",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			style: {
				background: "#fff8e1",
				border: "1px solid #ffe082",
				borderRadius: "8px",
				padding: "30px",
				maxWidth: "500px",
				margin: "0 auto"
			},
			children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
				style: {
					color: "#8a6d00",
					marginBottom: "16px"
				},
				children: "Funcionalidad pendiente de backend"
			}), /* @__PURE__ */ (0, Q.jsxs)("p", {
				style: {
					color: "#666",
					lineHeight: "1.6"
				},
				children: [
					"La gestión de colaboradores (registro, salarios, aprobación) requiere un módulo de RRHH que aún no está implementado en el backend.",
					/* @__PURE__ */ (0, Q.jsx)("br", {}),
					/* @__PURE__ */ (0, Q.jsx)("br", {}),
					"El backend actual maneja usuarios con roles (ROL_ADMIN, ROL_USUARIO, ROL_VENDEDOR) pero no incluye una entidad Colaborador con salario ni flujo de aprobación."
				]
			})]
		})
	})] });
}
//#endregion
//#region src/components/admin/AdminAddColaboradorView.tsx
function Rr() {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Agregar Colaborador"
	}), /* @__PURE__ */ (0, Q.jsx)("div", {
		style: {
			padding: "40px",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			style: {
				background: "#fff8e1",
				border: "1px solid #ffe082",
				borderRadius: "8px",
				padding: "30px",
				maxWidth: "500px",
				margin: "0 auto"
			},
			children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
				style: {
					color: "#8a6d00",
					marginBottom: "16px"
				},
				children: "Funcionalidad pendiente de backend"
			}), /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					color: "#666",
					lineHeight: "1.6"
				},
				children: "El registro de colaboradores requiere un módulo de RRHH que aún no está implementado en el backend."
			})]
		})
	})] });
}
//#endregion
//#region src/components/admin/AdminApproveColaboradorView.tsx
function zr() {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Aprobar Colaboradores"
	}), /* @__PURE__ */ (0, Q.jsx)("div", {
		style: {
			padding: "40px",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			style: {
				background: "#fff8e1",
				border: "1px solid #ffe082",
				borderRadius: "8px",
				padding: "30px",
				maxWidth: "500px",
				margin: "0 auto"
			},
			children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
				style: {
					color: "#8a6d00",
					marginBottom: "16px"
				},
				children: "Funcionalidad pendiente de backend"
			}), /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					color: "#666",
					lineHeight: "1.6"
				},
				children: "La aprobación de colaboradores requiere un módulo de RRHH que aún no está implementado en el backend."
			})]
		})
	})] });
}
//#endregion
//#region src/components/admin/AdminClienteMenuView.tsx
function Br() {
	let { navigate: e } = $();
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Gestión de Clientes"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "action-cards",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "dash-card bg-blue",
				style: { cursor: "pointer" },
				onClick: () => e("admin-view-cliente"),
				children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Ver Todos los Clientes" }), /* @__PURE__ */ (0, Q.jsx)("h2", { children: /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "icon-left",
					children: "👁"
				}) })]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "dash-card bg-green",
				style: { cursor: "pointer" },
				onClick: () => e("admin-add-cliente"),
				children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Agregar Cliente" }), /* @__PURE__ */ (0, Q.jsx)("h2", { children: /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "icon-left",
					children: "+"
				}) })]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "dash-card bg-yellow",
				style: { cursor: "pointer" },
				onClick: () => e("admin-approve-cliente"),
				children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Aprobar Cliente" }), /* @__PURE__ */ (0, Q.jsx)("h2", { children: /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "icon-left",
					children: "✓"
				}) })]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "dash-card bg-pink",
				style: { cursor: "pointer" },
				onClick: () => e("admin-view-cliente-compras"),
				children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Ver Compras de Clientes" }), /* @__PURE__ */ (0, Q.jsx)("h2", { children: /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "icon-left",
					children: "$"
				}) })]
			})
		]
	})] });
}
//#endregion
//#region src/components/admin/AdminViewClienteView.tsx
function Vr() {
	let [e, t] = i([]), [n, a] = i(!0);
	r(() => {
		Pr.getAll({ size: 100 }).then((e) => t(e.data.content)).catch(() => {}).finally(() => a(!1));
	}, []);
	let o = e.filter((e) => e.roles.includes("ROL_USUARIO"));
	return n ? /* @__PURE__ */ (0, Q.jsx)("p", {
		style: {
			padding: "20px",
			color: "#888"
		},
		children: "Cargando clientes..."
	}) : /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Todos los Clientes"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "table-container",
		children: [/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "table-header",
			children: "Clientes"
		}), /* @__PURE__ */ (0, Q.jsxs)("table", {
			className: "data-table",
			children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Nombre" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Usuario" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Email" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Teléfono" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Activo" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Rol" })
			] }) }), /* @__PURE__ */ (0, Q.jsx)("tbody", { children: o.length > 0 ? o.map((e) => /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.nombreCompleto || `${e.nombres || ""} ${e.apellidos || ""}` }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.nombreUsuario }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.correo }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.telefono || "-" }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.activo ? "Sí" : "No" }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.roles.join(", ") })
			] }, e.id)) : /* @__PURE__ */ (0, Q.jsx)("tr", { children: /* @__PURE__ */ (0, Q.jsx)("td", {
				colSpan: 6,
				style: { textAlign: "center" },
				children: "No hay clientes"
			}) }) })]
		})]
	})] });
}
//#endregion
//#region src/components/admin/AdminAddClienteView.tsx
function Hr() {
	let { addCliente: e, navigate: t } = $(), [n, r] = i({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		codigo: "",
		categoria: "Novela",
		mobile: "",
		compras: ""
	}), [a, o] = i(""), s = (e) => {
		r((t) => ({
			...t,
			[e.target.name]: e.target.value
		}));
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Nuevo Cliente"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "form-container",
		children: [/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-header",
			children: "Registrar Nuevo Cliente en la Librería"
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-body",
			children: /* @__PURE__ */ (0, Q.jsxs)("form", {
				onSubmit: async (r) => {
					if (r.preventDefault(), o(""), !n.firstName || !n.lastName || !n.username || !n.password) {
						o("Completa todos los campos requeridos");
						return;
					}
					await e(n) ? t("admin-view-cliente") : o("El usuario ya existe");
				},
				children: [
					a && /* @__PURE__ */ (0, Q.jsx)("div", {
						style: {
							color: "red",
							marginBottom: "15px"
						},
						children: a
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Nombre" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "firstName",
								value: n.firstName,
								onChange: s,
								placeholder: "Nombre",
								required: !0
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Apellido" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "lastName",
								value: n.lastName,
								onChange: s,
								placeholder: "Apellido",
								required: !0
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Usuario" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "username",
								value: n.username,
								onChange: s,
								placeholder: "Usuario",
								required: !0
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Contraseña" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "password",
								name: "password",
								value: n.password,
								onChange: s,
								placeholder: "Contraseña",
								required: !0
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Código de Cliente" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "codigo",
								value: n.codigo,
								onChange: s,
								placeholder: "Código de Cliente"
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Categoría" }), /* @__PURE__ */ (0, Q.jsx)("select", {
								name: "categoria",
								value: n.categoria,
								onChange: s,
								children: l.map((e) => /* @__PURE__ */ (0, Q.jsx)("option", {
									value: e,
									children: e
								}, e))
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Celular" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "mobile",
								value: n.mobile,
								onChange: s,
								placeholder: "Celular"
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Compras" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "number",
								name: "compras",
								value: n.compras,
								onChange: s,
								placeholder: "Compras"
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, Q.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							children: "Enviar"
						})
					})
				]
			})
		})]
	})] });
}
//#endregion
//#region src/components/admin/AdminApproveClienteView.tsx
function Ur() {
	let { data: e, approveCliente: t, deleteCliente: n } = $(), r = e.clientes.filter((e) => !e.status).map((r) => {
		let i = e.users.find((e) => e.id === r.userId);
		return /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
			/* @__PURE__ */ (0, Q.jsxs)("td", { children: [
				i?.firstName,
				" ",
				i?.lastName
			] }),
			/* @__PURE__ */ (0, Q.jsx)("td", { children: r.categoria }),
			/* @__PURE__ */ (0, Q.jsx)("td", { children: r.compras || 0 }),
			/* @__PURE__ */ (0, Q.jsx)("td", { children: r.mobile }),
			/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn btn-success btn-sm",
				onClick: () => t(r.id),
				children: "✓"
			}) }),
			/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn btn-danger btn-sm",
				onClick: () => {
					confirm("¿Estás seguro?") && n(r.id);
				},
				children: "🗑"
			}) })
		] }, r.id);
	});
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Aprobar Clientes"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "table-container",
		children: [/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "table-header",
			children: "Clientes Pendientes"
		}), /* @__PURE__ */ (0, Q.jsxs)("table", {
			className: "data-table",
			children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Nombre" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Categoría" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Compras" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Celular" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Aprobar" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Eliminar" })
			] }) }), /* @__PURE__ */ (0, Q.jsx)("tbody", { children: r.length > 0 ? r : /* @__PURE__ */ (0, Q.jsx)("tr", { children: /* @__PURE__ */ (0, Q.jsx)("td", {
				colSpan: 6,
				style: { textAlign: "center" },
				children: "No hay clientes pendientes"
			}) }) })]
		})]
	})] });
}
//#endregion
//#region src/components/admin/AdminPedidosMenuView.tsx
function Wr() {
	let { navigate: e } = $();
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			children: "Registrar Pedidos"
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "class-grid",
			children: l.map((t) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "class-card",
				onClick: () => e("admin-registrar-pedido", { class: t }),
				children: [/* @__PURE__ */ (0, Q.jsx)("h3", { children: t }), /* @__PURE__ */ (0, Q.jsx)("p", { children: "Registrar Pedidos" })]
			}, t))
		}),
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			style: { marginTop: "30px" },
			children: "Ver Pedidos"
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "class-grid",
			children: l.map((t) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "class-card",
				onClick: () => e("admin-view-pedidos", { class: t }),
				children: [/* @__PURE__ */ (0, Q.jsx)("h3", { children: t }), /* @__PURE__ */ (0, Q.jsx)("p", { children: "Ver Pedidos" })]
			}, t))
		})
	] });
}
//#endregion
//#region src/components/admin/AdminAvisosView.tsx
function Gr() {
	let { postAviso: e } = $(), [t, n] = i("");
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Crear Aviso"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "form-container",
		style: { maxWidth: "500px" },
		children: [/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-header",
			children: "Publicar un Aviso"
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-body",
			children: /* @__PURE__ */ (0, Q.jsxs)("form", {
				onSubmit: async (r) => {
					r.preventDefault(), t.trim() && (await e(t), n(""), alert("¡Aviso publicado!"));
				},
				children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "form-group",
					children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Mensaje" }), /* @__PURE__ */ (0, Q.jsx)("textarea", {
						value: t,
						onChange: (e) => n(e.target.value),
						rows: 4,
						placeholder: "Escribe tu aviso aquí...",
						required: !0
					})]
				}), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "form-actions",
					children: /* @__PURE__ */ (0, Q.jsx)("button", {
						type: "submit",
						className: "btn btn-primary",
						children: "Publicar Aviso"
					})
				})]
			})
		})]
	})] });
}
//#endregion
//#region src/components/admin/AdminUpdateClienteView.tsx
function Kr({ clienteId: e }) {
	let { navigate: t } = $(), [n, a] = i(null), [o, s] = i({
		nombres: "",
		apellidos: "",
		nombreUsuario: "",
		correo: "",
		telefono: ""
	}), [c, l] = i(""), [u, d] = i(!1);
	r(() => {
		if (!e) {
			t("admin-view-cliente");
			return;
		}
		Pr.getById(e).then((e) => {
			let t = e.data;
			a(t), s({
				nombres: t.nombres || "",
				apellidos: t.apellidos || "",
				nombreUsuario: t.nombreUsuario,
				correo: t.correo,
				telefono: t.telefono || ""
			});
		}).catch(() => t("admin-view-cliente"));
	}, [e, t]);
	let f = (e) => {
		s((t) => ({
			...t,
			[e.target.name]: e.target.value
		}));
	};
	return e ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Actualizar Cliente"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "form-container",
		children: [/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-header",
			children: "Actualizar Datos del Cliente"
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-body",
			children: /* @__PURE__ */ (0, Q.jsxs)("form", {
				onSubmit: async (r) => {
					if (r.preventDefault(), e) {
						l(""), d(!0);
						try {
							await Pr.update(e, {
								...n,
								nombres: o.nombres,
								apellidos: o.apellidos,
								nombreUsuario: o.nombreUsuario,
								correo: o.correo,
								telefono: o.telefono
							}), t("admin-view-cliente");
						} catch (e) {
							l(e.response?.data?.message || "Error al actualizar");
						} finally {
							d(!1);
						}
					}
				},
				children: [
					c && /* @__PURE__ */ (0, Q.jsx)("div", {
						style: {
							color: "red",
							marginBottom: "15px"
						},
						children: c
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Nombre" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "nombres",
								value: o.nombres,
								onChange: f,
								required: !0
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Apellido" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "apellidos",
								value: o.apellidos,
								onChange: f,
								required: !0
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "form-row",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Usuario" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "nombreUsuario",
								value: o.nombreUsuario,
								onChange: f,
								required: !0
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Email" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "email",
								name: "correo",
								value: o.correo,
								onChange: f,
								required: !0
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("div", {
						className: "form-row",
						children: /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Teléfono" }), /* @__PURE__ */ (0, Q.jsx)("input", {
								type: "text",
								name: "telefono",
								value: o.telefono,
								onChange: f
							})]
						})
					}),
					/* @__PURE__ */ (0, Q.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, Q.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							disabled: u,
							children: u ? "Guardando..." : "Guardar"
						})
					})
				]
			})
		})]
	})] }) : null;
}
//#endregion
//#region src/components/admin/AdminLibrosView.tsx
function qr() {
	let [e, t] = i([]), [n, a] = i(!0), o = () => {
		a(!0), Kn.getAll({ size: 100 }).then((e) => t(e.data.content)).catch(() => {}).finally(() => a(!1));
	};
	r(() => {
		o();
	}, []);
	let s = (e) => {
		Kn.toggleActivo(e).then(() => o()).catch(() => {});
	};
	return n ? /* @__PURE__ */ (0, Q.jsx)("p", {
		style: {
			padding: "20px",
			color: "#888"
		},
		children: "Cargando libros..."
	}) : /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Gestión de Libros"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "table-container",
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "table-header",
			style: {
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center"
			},
			children: [/* @__PURE__ */ (0, Q.jsxs)("span", { children: [
				"Libros (",
				e.length,
				")"
			] }), /* @__PURE__ */ (0, Q.jsx)("button", {
				className: "btn btn-primary btn-sm",
				onClick: () => {},
				children: "+ Nuevo Libro"
			})]
		}), /* @__PURE__ */ (0, Q.jsxs)("table", {
			className: "data-table",
			children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Título" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Precio" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Stock" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Categoría" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Activo" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Destacado" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Más Vendido" }),
				/* @__PURE__ */ (0, Q.jsx)("th", { children: "Acción" })
			] }) }), /* @__PURE__ */ (0, Q.jsx)("tbody", { children: e.length > 0 ? e.map((e) => /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.titulo }),
				/* @__PURE__ */ (0, Q.jsxs)("td", { children: ["S/ ", (e.precioEfectivo || e.precio).toFixed(2)] }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.inventario?.cantidad ?? 0 }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.categoria?.nombre || "-" }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.activo ? "Sí" : "No" }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.destacado ? "Sí" : "No" }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: e.masVendido ? "Sí" : "No" }),
				/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
					className: "btn btn-warning btn-sm",
					onClick: () => s(e.id),
					style: { marginRight: "4px" },
					children: e.activo ? "Desactivar" : "Activar"
				}) })
			] }, e.id)) : /* @__PURE__ */ (0, Q.jsx)("tr", { children: /* @__PURE__ */ (0, Q.jsx)("td", {
				colSpan: 8,
				style: { textAlign: "center" },
				children: "No hay libros"
			}) }) })]
		})]
	})] });
}
//#endregion
//#region src/components/colaborador/ColaboradorDashboardView.tsx
function Jr() {
	let { data: e, currentUser: t } = $(), n = e.colaboradores.find((e) => e.userId === t?.id), r = e.avisos.map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "notice-item",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "notice-close",
				onClick: () => {},
				children: "×"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("strong", { children: [
				d(e.date),
				" || Por: ",
				e.by
			] }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			e.message
		]
	}, e.id));
	return n ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			children: "Panel del Colaborador"
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "dashboard-cards",
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-blue",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Salario" }), /* @__PURE__ */ (0, Q.jsxs)("h2", { children: [
						/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "icon-left",
							children: "$"
						}),
						" ",
						n.salary
					] })]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-green",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Celular" }), /* @__PURE__ */ (0, Q.jsx)("h2", {
						style: { fontSize: "20px" },
						children: n.mobile
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-yellow",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Fecha de Ingreso" }), /* @__PURE__ */ (0, Q.jsx)("h2", {
						style: { fontSize: "16px" },
						children: d(n.joinDate)
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "notice-section",
			style: { padding: "0 30px" },
			children: [/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "notice-board-title",
				children: "Tablón de Avisos"
			}), r.length > 0 ? r : /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					color: "#888",
					padding: "15px"
				},
				children: "Sin avisos"
			})]
		})
	] }) : /* @__PURE__ */ (0, Q.jsx)("div", { children: "Cargando..." });
}
//#endregion
//#region src/components/colaborador/ColaboradorPedidosMenuView.tsx
function Yr() {
	let { navigate: e } = $();
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			children: "Registrar Pedidos"
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "class-grid",
			children: l.map((t) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "class-card",
				onClick: () => e("colaborador-registrar-pedido", { class: t }),
				children: [/* @__PURE__ */ (0, Q.jsx)("h3", { children: t }), /* @__PURE__ */ (0, Q.jsx)("p", { children: "Registrar Pedidos" })]
			}, t))
		}),
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			style: { marginTop: "30px" },
			children: "Ver Pedidos"
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "class-grid",
			children: l.map((t) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "class-card",
				onClick: () => e("colaborador-view-pedidos", { class: t }),
				children: [/* @__PURE__ */ (0, Q.jsx)("h3", { children: t }), /* @__PURE__ */ (0, Q.jsx)("p", { children: "Ver Pedidos" })]
			}, t))
		})
	] });
}
//#endregion
//#region src/components/colaborador/ColaboradorRegistrarPedidoView.tsx
function Xr({ className: e }) {
	let { data: t, guardarPedidos: n, navigate: r } = $(), a = e || "Novela", [o, s] = i(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]), [c, l] = i({}), u = t.clientes.filter((e) => e.categoria === a && e.status), d = (e, t) => {
		l((n) => ({
			...n,
			[e]: t
		}));
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("h2", {
		className: "section-title",
		children: ["Registrar Pedidos - ", a]
	}), /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "form-container",
		style: { maxWidth: "100%" },
		children: /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "form-body",
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "form-group",
					style: {
						maxWidth: "300px",
						marginBottom: "20px"
					},
					children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Fecha" }), /* @__PURE__ */ (0, Q.jsx)("input", {
						type: "date",
						value: o,
						onChange: (e) => s(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "table-container",
					children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "table-header",
						children: ["Clientes - ", a]
					}), /* @__PURE__ */ (0, Q.jsxs)("table", {
						className: "data-table",
						children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, Q.jsx)("th", { children: "Código" }),
							/* @__PURE__ */ (0, Q.jsx)("th", { children: "Nombre" }),
							/* @__PURE__ */ (0, Q.jsx)("th", { children: "Estado" })
						] }) }), /* @__PURE__ */ (0, Q.jsxs)("tbody", { children: [u.map((e) => {
							let n = t.users.find((t) => t.id === e.userId);
							return /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, Q.jsx)("td", { children: e.codigo }),
								/* @__PURE__ */ (0, Q.jsxs)("td", { children: [
									n?.firstName,
									" ",
									n?.lastName
								] }),
								/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsxs)("select", {
									value: c[e.codigo] || "Pendiente",
									onChange: (t) => d(e.codigo, t.target.value),
									style: {
										padding: "6px 12px",
										borderRadius: "15px",
										border: "1px solid #ced4da"
									},
									children: [/* @__PURE__ */ (0, Q.jsx)("option", {
										value: "Entregado",
										children: "Entregado"
									}), /* @__PURE__ */ (0, Q.jsx)("option", {
										value: "Pendiente",
										children: "Pendiente"
									})]
								}) })
							] }, e.id);
						}), u.length === 0 && /* @__PURE__ */ (0, Q.jsx)("tr", { children: /* @__PURE__ */ (0, Q.jsx)("td", {
							colSpan: 3,
							style: { textAlign: "center" },
							children: "No hay clientes"
						}) })] })]
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "form-actions",
					style: { marginTop: "20px" },
					children: [/* @__PURE__ */ (0, Q.jsx)("button", {
						className: "btn btn-primary",
						onClick: () => {
							if (!o) {
								alert("Selecciona una fecha");
								return;
							}
							let e = u.map((e) => ({
								codigo: e.codigo,
								estado: c[e.codigo] || "Pendiente"
							}));
							n(a, o, e), r("colaborador-pedidos");
						},
						children: "Guardar Pedidos"
					}), /* @__PURE__ */ (0, Q.jsx)("button", {
						className: "btn btn-danger",
						style: { marginLeft: "10px" },
						onClick: () => r("colaborador-pedidos"),
						children: "Cancelar"
					})]
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/colaborador/ColaboradorAvisoView.tsx
function Zr() {
	let { postAviso: e } = $(), [t, n] = i("");
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Crear Aviso"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "form-container",
		style: { maxWidth: "500px" },
		children: [/* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-header",
			children: "Publicar un Aviso"
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "form-body",
			children: /* @__PURE__ */ (0, Q.jsxs)("form", {
				onSubmit: async (r) => {
					r.preventDefault(), t.trim() && (await e(t), n(""), alert("¡Aviso publicado!"));
				},
				children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "form-group",
					children: [/* @__PURE__ */ (0, Q.jsx)("label", { children: "Mensaje" }), /* @__PURE__ */ (0, Q.jsx)("textarea", {
						value: t,
						onChange: (e) => n(e.target.value),
						rows: 4,
						placeholder: "Escribe tu aviso aquí...",
						required: !0
					})]
				}), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "form-actions",
					children: /* @__PURE__ */ (0, Q.jsx)("button", {
						type: "submit",
						className: "btn btn-success",
						children: "Publicar Aviso"
					})
				})]
			})
		})]
	})] });
}
//#endregion
//#region src/components/cliente/ClienteDashboardView.tsx
function Qr() {
	let { data: e, currentUser: t } = $(), [n, a] = i(null), [o, s] = i(null), [c, l] = i(!0);
	r(() => {
		Promise.all([Gn.me(), Ar.getMisPedidos({ size: 1 })]).then(([e, t]) => {
			a({
				correo: e.data.correo,
				telefono: e.data.telefono
			}), s(t.data.totalElements);
		}).catch(() => {}).finally(() => l(!1));
	}, []);
	let u = e.avisos.map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "notice-item",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("button", {
				className: "notice-close",
				onClick: () => {},
				children: "×"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("strong", { children: [
				d(e.date),
				" || Por: ",
				e.by
			] }),
			/* @__PURE__ */ (0, Q.jsx)("br", {}),
			e.message
		]
	}, e.id));
	return c ? /* @__PURE__ */ (0, Q.jsx)("div", { children: "Cargando..." }) : /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			children: "Panel del Cliente"
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "dashboard-cards",
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-blue",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Usuario" }), /* @__PURE__ */ (0, Q.jsxs)("h2", {
						style: { fontSize: "20px" },
						children: [
							t?.firstName,
							" ",
							t?.lastName
						]
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-green",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Correo" }), /* @__PURE__ */ (0, Q.jsx)("h2", {
						style: { fontSize: "16px" },
						children: n?.correo || "-"
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "dash-card bg-yellow",
					children: [/* @__PURE__ */ (0, Q.jsx)("h6", { children: "Pedidos realizados" }), /* @__PURE__ */ (0, Q.jsx)("h2", { children: o ?? 0 })]
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "notice-section",
			style: { padding: "0 30px" },
			children: [/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "notice-board-title",
				children: "Tablón de Avisos"
			}), u.length > 0 ? u : /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					color: "#888",
					padding: "15px"
				},
				children: "Sin avisos"
			})]
		})
	] });
}
//#endregion
//#region src/components/cliente/ClienteMisPedidosView.tsx
function $r() {
	let { navigate: e } = $(), [t, n] = i([]), [a, o] = i(!0), [s, c] = i(null);
	return r(() => {
		let e = !0;
		return o(!0), Ar.getMisPedidos({ size: 50 }).then((t) => {
			e && n(t.data.content);
		}).catch((t) => {
			e && c(t.response?.data?.message || t.message || "No se pudieron cargar tus pedidos");
		}).finally(() => {
			e && o(!1);
		}), () => {
			e = !1;
		};
	}, []), /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
		className: "section-title",
		children: "Mis Pedidos"
	}), /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "table-container",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "table-header",
				children: "Historial de Pedidos"
			}),
			a && /* @__PURE__ */ (0, Q.jsx)("p", {
				style: { padding: "20px" },
				children: "Cargando pedidos..."
			}),
			!a && s && /* @__PURE__ */ (0, Q.jsx)("p", {
				style: {
					padding: "20px",
					color: "#c0392b"
				},
				children: s
			}),
			!a && !s && /* @__PURE__ */ (0, Q.jsxs)("table", {
				className: "data-table",
				children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, Q.jsx)("th", { children: "N° Pedido" }),
					/* @__PURE__ */ (0, Q.jsx)("th", { children: "Fecha" }),
					/* @__PURE__ */ (0, Q.jsx)("th", { children: "Estado" }),
					/* @__PURE__ */ (0, Q.jsx)("th", { children: "Total" }),
					/* @__PURE__ */ (0, Q.jsx)("th", {})
				] }) }), /* @__PURE__ */ (0, Q.jsxs)("tbody", { children: [t.length === 0 && /* @__PURE__ */ (0, Q.jsx)("tr", { children: /* @__PURE__ */ (0, Q.jsx)("td", {
					colSpan: 5,
					style: { textAlign: "center" },
					children: "Aún no tienes pedidos"
				}) }), t.map((t) => /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, Q.jsx)("td", { children: t.numeroPedido }),
					/* @__PURE__ */ (0, Q.jsx)("td", { children: d(t.createdAt) }),
					/* @__PURE__ */ (0, Q.jsx)("td", {
						style: {
							color: t.estado === "ENTREGADO" ? "green" : "#b8860b",
							fontWeight: 700
						},
						children: t.estado
					}),
					/* @__PURE__ */ (0, Q.jsxs)("td", { children: ["S/ ", t.montoTotal.toFixed(2)] }),
					/* @__PURE__ */ (0, Q.jsx)("td", { children: /* @__PURE__ */ (0, Q.jsx)("button", {
						className: "btn btn-blue",
						onClick: () => e("cliente-ver-pedido", { id: t.id }),
						children: "Ver detalle"
					}) })
				] }, t.id))] })]
			})
		]
	})] });
}
//#endregion
//#region src/components/cliente/ClienteVerPedidoView.tsx
function ei({ id: e }) {
	let { navigate: t } = $(), [n, a] = i(null), [o, s] = i(!0), [c, l] = i(null);
	r(() => {
		if (!e) {
			s(!1), l("Pedido no especificado");
			return;
		}
		let t = !0;
		return s(!0), Ar.getById(e).then((e) => {
			t && a(e.data);
		}).catch((e) => {
			t && l(e.response?.data?.message || e.message || "No se pudo cargar el pedido");
		}).finally(() => {
			t && s(!1);
		}), () => {
			t = !1;
		};
	}, [e]);
	let u = n?.estado === "ENTREGADO" ? "green" : n?.estado === "CANCELADO" ? "#c0392b" : "#b8860b";
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "section-title",
			children: "Detalle de Pedido"
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "table-container",
			style: { maxWidth: "500px" },
			children: [
				/* @__PURE__ */ (0, Q.jsx)("div", {
					className: "table-header",
					children: "Registro de Pedido"
				}),
				o && /* @__PURE__ */ (0, Q.jsx)("p", {
					style: { padding: "20px" },
					children: "Cargando..."
				}),
				!o && c && /* @__PURE__ */ (0, Q.jsx)("p", {
					style: {
						padding: "20px",
						color: "#c0392b"
					},
					children: c
				}),
				!o && !c && n && /* @__PURE__ */ (0, Q.jsxs)("table", {
					className: "data-table",
					children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "N° Pedido" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Fecha" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Estado" }),
						/* @__PURE__ */ (0, Q.jsx)("th", { children: "Total" })
					] }) }), /* @__PURE__ */ (0, Q.jsx)("tbody", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, Q.jsx)("td", { children: n.numeroPedido }),
						/* @__PURE__ */ (0, Q.jsx)("td", { children: d(n.createdAt) }),
						/* @__PURE__ */ (0, Q.jsx)("td", {
							style: {
								color: u,
								fontWeight: 700
							},
							children: n.estado
						}),
						/* @__PURE__ */ (0, Q.jsxs)("td", { children: ["S/ ", n.montoTotal.toFixed(2)] })
					] }) })]
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsx)("button", {
			className: "btn btn-danger",
			onClick: () => t("cliente-pedidos"),
			style: { marginTop: "15px" },
			children: "Volver"
		})
	] });
}
//#endregion
//#region src/components/DeporvidaApp.tsx
function ti() {
	let { currentView: e, currentUser: t, navParams: n } = $(), r = [
		"home",
		"about",
		"contact",
		"catalogo",
		"carrito",
		"checkout",
		"favoritos",
		"admin-click",
		"colaborador-click",
		"cliente-click",
		"admin-signup",
		"colaborador-signup",
		"cliente-signup",
		"login"
	], i = [
		"admin-dashboard",
		"admin-colaborador",
		"admin-view-colaborador",
		"admin-add-colaborador",
		"admin-approve-colaborador",
		"admin-update-colaborador",
		"admin-view-colaborador-salario",
		"admin-cliente",
		"admin-view-cliente",
		"admin-add-cliente",
		"admin-approve-cliente",
		"admin-update-cliente",
		"admin-view-cliente-compras",
		"admin-pedidos",
		"admin-avisos",
		"admin-libros",
		"admin-compras",
		"admin-view-compras",
		"admin-view-pedidos",
		"admin-registrar-pedido"
	], a = [
		"colaborador-dashboard",
		"colaborador-pedidos",
		"colaborador-registrar-pedido",
		"colaborador-avisos"
	], o = [
		"cliente-dashboard",
		"cliente-pedidos",
		"cliente-ver-pedido"
	];
	if (r.includes(e)) return /* @__PURE__ */ (0, Q.jsx)(fr, { children: s(e) });
	if (i.includes(e)) return /* @__PURE__ */ (0, Q.jsx)(pr, {
		userName: t?.firstName,
		children: c(e)
	});
	if (a.includes(e)) return /* @__PURE__ */ (0, Q.jsx)(mr, {
		userName: t?.firstName,
		children: l(e)
	});
	if (o.includes(e)) return /* @__PURE__ */ (0, Q.jsx)(hr, {
		userName: t?.firstName,
		children: u(e)
	});
	return /* @__PURE__ */ (0, Q.jsx)(fr, { children: /* @__PURE__ */ (0, Q.jsx)(br, {}) });
	function s(e) {
		switch (e) {
			case "home": return /* @__PURE__ */ (0, Q.jsx)(br, {});
			case "about": return /* @__PURE__ */ (0, Q.jsx)(xr, {});
			case "contact": return /* @__PURE__ */ (0, Q.jsx)(Sr, {});
			case "catalogo": return /* @__PURE__ */ (0, Q.jsx)(Or, {});
			case "carrito": return /* @__PURE__ */ (0, Q.jsx)(kr, {});
			case "checkout": return /* @__PURE__ */ (0, Q.jsx)(Mr, {});
			case "favoritos": return /* @__PURE__ */ (0, Q.jsx)(Nr, {});
			case "admin-click": return /* @__PURE__ */ (0, Q.jsx)(Cr, {
				role: "Admin",
				roleKey: "admin",
				color: "#19b3d3"
			});
			case "colaborador-click": return /* @__PURE__ */ (0, Q.jsx)(Cr, {
				role: "Colaborador",
				roleKey: "colaborador",
				color: "#2ed8b6"
			});
			case "cliente-click": return /* @__PURE__ */ (0, Q.jsx)(Cr, {
				role: "Cliente",
				roleKey: "cliente",
				color: "#FFB64D"
			});
			case "admin-signup": return /* @__PURE__ */ (0, Q.jsx)(Tr, { role: "admin" });
			case "colaborador-signup": return /* @__PURE__ */ (0, Q.jsx)(Tr, { role: "colaborador" });
			case "cliente-signup": return /* @__PURE__ */ (0, Q.jsx)(Tr, { role: "cliente" });
			case "login": return /* @__PURE__ */ (0, Q.jsx)(Er, {});
			default: return /* @__PURE__ */ (0, Q.jsx)(br, {});
		}
	}
	function c(e) {
		switch (e) {
			case "admin-dashboard": return /* @__PURE__ */ (0, Q.jsx)(Fr, {});
			case "admin-colaborador": return /* @__PURE__ */ (0, Q.jsx)(Ir, {});
			case "admin-view-colaborador": return /* @__PURE__ */ (0, Q.jsx)(Lr, {});
			case "admin-add-colaborador": return /* @__PURE__ */ (0, Q.jsx)(Rr, {});
			case "admin-approve-colaborador": return /* @__PURE__ */ (0, Q.jsx)(zr, {});
			case "admin-cliente": return /* @__PURE__ */ (0, Q.jsx)(Br, {});
			case "admin-view-cliente": return /* @__PURE__ */ (0, Q.jsx)(Vr, {});
			case "admin-add-cliente": return /* @__PURE__ */ (0, Q.jsx)(Hr, {});
			case "admin-approve-cliente": return /* @__PURE__ */ (0, Q.jsx)(Ur, {});
			case "admin-pedidos": return /* @__PURE__ */ (0, Q.jsx)(Wr, {});
			case "admin-avisos": return /* @__PURE__ */ (0, Q.jsx)(Gr, {});
			case "admin-update-cliente": return /* @__PURE__ */ (0, Q.jsx)(Kr, { clienteId: n.id });
			case "admin-libros": return /* @__PURE__ */ (0, Q.jsx)(qr, {});
			default: return /* @__PURE__ */ (0, Q.jsx)(Fr, {});
		}
	}
	function l(e) {
		switch (e) {
			case "colaborador-dashboard": return /* @__PURE__ */ (0, Q.jsx)(Jr, {});
			case "colaborador-pedidos": return /* @__PURE__ */ (0, Q.jsx)(Yr, {});
			case "colaborador-registrar-pedido": return /* @__PURE__ */ (0, Q.jsx)(Xr, { className: n.class });
			case "colaborador-avisos": return /* @__PURE__ */ (0, Q.jsx)(Zr, {});
			default: return /* @__PURE__ */ (0, Q.jsx)(Jr, {});
		}
	}
	function u(e) {
		switch (e) {
			case "cliente-dashboard": return /* @__PURE__ */ (0, Q.jsx)(Qr, {});
			case "cliente-pedidos": return /* @__PURE__ */ (0, Q.jsx)($r, {});
			case "cliente-ver-pedido": return /* @__PURE__ */ (0, Q.jsx)(ei, { id: n.id });
			default: return /* @__PURE__ */ (0, Q.jsx)(Qr, {});
		}
	}
}
//#endregion
export { ti as DeporvidaApp, dr as DeporvidaProvider, $ as useDeporvida };
