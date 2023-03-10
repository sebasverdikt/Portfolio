! function(t, e) {
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, (function(t, e) {
	"use strict";
	var i = Array.prototype.slice,
		n = t.console,
		s = void 0 === n ? function() {} : function(t) {
			n.error(t)
		};

	function o(n, o, a) {
		(a = a || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function(t) {
			a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
		}), a.fn[n] = function(t) {
			var e;
			return "string" == typeof t ? function(t, e, i) {
				var o, r = "$()." + n + '("' + e + '")';
				return t.each((function(t, h) {
					var l = a.data(h, n);
					if (l) {
						var u = l[e];
						if (u && "_" != e.charAt(0)) {
							var c = u.apply(l, i);
							o = void 0 === o ? c : o
						} else s(r + " is not a valid method")
					} else s(n + " not initialized. Cannot call methods, i.e. " + r)
				})), void 0 !== o ? o : t
			}(this, t, i.call(arguments, 1)) : (e = t, this.each((function(t, i) {
				var s = a.data(i, n);
				s ? (s.option(e), s._init()) : (s = new o(i, e), a.data(i, n, s))
			})), this)
		}, r(a))
	}

	function r(t) {
		!t || t && t.bridget || (t.bridget = o)
	}
	return r(e || t.jQuery), o
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, (function() {
	function t() {}
	var e = t.prototype;
	return e.on = function(t, e) {
		if (t && e) {
			var i = this._events = this._events || {},
				n = i[t] = i[t] || [];
			return -1 == n.indexOf(e) && n.push(e), this
		}
	}, e.once = function(t, e) {
		if (t && e) {
			this.on(t, e);
			var i = this._onceEvents = this._onceEvents || {};
			return (i[t] = i[t] || {})[e] = !0, this
		}
	}, e.off = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = i.indexOf(e);
			return -1 != n && i.splice(n, 1), this
		}
	}, e.emitEvent = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			i = i.slice(0), e = e || [];
			for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
				var o = i[s];
				n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e)
			}
			return this
		}
	}, e.allOff = function() {
		delete this._events, delete this._onceEvents
	}, t
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, (function() {
	"use strict";

	function t(t) {
		var e = parseFloat(t);
		return -1 == t.indexOf("%") && !isNaN(e) && e
	}
	var e = "undefined" == typeof console ? function() {} : function(t) {
			console.error(t)
		},
		i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
		n = i.length;

	function s(t) {
		var i = getComputedStyle(t);
		return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), i
	}
	var o, r = !1;

	function a(e) {
		if (function() {
				if (!r) {
					r = !0;
					var e = document.createElement("div");
					e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
					var i = document.body || document.documentElement;
					i.appendChild(e);
					var n = s(e);
					o = 200 == Math.round(t(n.width)), a.isBoxSizeOuter = o, i.removeChild(e)
				}
			}(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
			var h = s(e);
			if ("none" == h.display) return function() {
				for (var t = {
						width: 0,
						height: 0,
						innerWidth: 0,
						innerHeight: 0,
						outerWidth: 0,
						outerHeight: 0
					}, e = 0; e < n; e++) t[i[e]] = 0;
				return t
			}();
			var l = {};
			l.width = e.offsetWidth, l.height = e.offsetHeight;
			for (var u = l.isBorderBox = "border-box" == h.boxSizing, c = 0; c < n; c++) {
				var d = i[c],
					f = h[d],
					p = parseFloat(f);
				l[d] = isNaN(p) ? 0 : p
			}
			var m = l.paddingLeft + l.paddingRight,
				g = l.paddingTop + l.paddingBottom,
				y = l.marginLeft + l.marginRight,
				v = l.marginTop + l.marginBottom,
				b = l.borderLeftWidth + l.borderRightWidth,
				_ = l.borderTopWidth + l.borderBottomWidth,
				x = u && o,
				E = t(h.width);
			!1 !== E && (l.width = E + (x ? 0 : m + b));
			var S = t(h.height);
			return !1 !== S && (l.height = S + (x ? 0 : g + _)), l.innerWidth = l.width - (m + b), l.innerHeight = l.height - (g + _), l.outerWidth = l.width + y, l.outerHeight = l.height + v, l
		}
	}
	return a
})),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, (function() {
	"use strict";
	var t = function() {
		var t = window.Element.prototype;
		if (t.matches) return "matches";
		if (t.matchesSelector) return "matchesSelector";
		for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
			var n = e[i] + "MatchesSelector";
			if (t[n]) return n
		}
	}();
	return function(e, i) {
		return e[t](i)
	}
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, (function(t, e) {
	var i = {
			extend: function(t, e) {
				for (var i in e) t[i] = e[i];
				return t
			},
			modulo: function(t, e) {
				return (t % e + e) % e
			}
		},
		n = Array.prototype.slice;
	i.makeArray = function(t) {
		return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
	}, i.removeFrom = function(t, e) {
		var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
	}, i.getParent = function(t, i) {
		for (; t.parentNode && t != document.body;)
			if (t = t.parentNode, e(t, i)) return t
	}, i.getQueryElement = function(t) {
		return "string" == typeof t ? document.querySelector(t) : t
	}, i.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, i.filterFindElements = function(t, n) {
		t = i.makeArray(t);
		var s = [];
		return t.forEach((function(t) {
			if (t instanceof HTMLElement)
				if (n) {
					e(t, n) && s.push(t);
					for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++) s.push(i[o])
				} else s.push(t)
		})), s
	}, i.debounceMethod = function(t, e, i) {
		i = i || 100;
		var n = t.prototype[e],
			s = e + "Timeout";
		t.prototype[e] = function() {
			var t = this[s];
			clearTimeout(t);
			var e = arguments,
				o = this;
			this[s] = setTimeout((function() {
				n.apply(o, e), delete o[s]
			}), i)
		}
	}, i.docReady = function(t) {
		var e = document.readyState;
		"complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
	}, i.toDashed = function(t) {
		return t.replace(/(.)([A-Z])/g, (function(t, e, i) {
			return e + "-" + i
		})).toLowerCase()
	};
	var s = t.console;
	return i.htmlInit = function(e, n) {
		i.docReady((function() {
			var o = i.toDashed(n),
				r = "data-" + o,
				a = document.querySelectorAll("[" + r + "]"),
				h = document.querySelectorAll(".js-" + o),
				l = i.makeArray(a).concat(i.makeArray(h)),
				u = r + "-options",
				c = t.jQuery;
			l.forEach((function(t) {
				var i, o = t.getAttribute(r) || t.getAttribute(u);
				try {
					i = o && JSON.parse(o)
				} catch (e) {
					return void(s && s.error("Error parsing " + r + " on " + t.className + ": " + e))
				}
				var a = new e(t, i);
				c && c.data(t, n, a)
			}))
		}))
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, (function(t, e) {
	"use strict";
	var i = document.documentElement.style,
		n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
		s = "string" == typeof i.transform ? "transform" : "WebkitTransform",
		o = {
			WebkitTransition: "webkitTransitionEnd",
			transition: "transitionend"
		} [n],
		r = {
			transform: s,
			transition: n,
			transitionDuration: n + "Duration",
			transitionProperty: n + "Property",
			transitionDelay: n + "Delay"
		};

	function a(t, e) {
		t && (this.element = t, this.layout = e, this.position = {
			x: 0,
			y: 0
		}, this._create())
	}
	var h = a.prototype = Object.create(t.prototype);
	h.constructor = a, h._create = function() {
		this._transn = {
			ingProperties: {},
			clean: {},
			onEnd: {}
		}, this.css({
			position: "absolute"
		})
	}, h.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, h.getSize = function() {
		this.size = e(this.element)
	}, h.css = function(t) {
		var e = this.element.style;
		for (var i in t) {
			e[r[i] || i] = t[i]
		}
	}, h.getPosition = function() {
		var t = getComputedStyle(this.element),
			e = this.layout._getOption("originLeft"),
			i = this.layout._getOption("originTop"),
			n = t[e ? "left" : "right"],
			s = t[i ? "top" : "bottom"],
			o = parseFloat(n),
			r = parseFloat(s),
			a = this.layout.size; - 1 != n.indexOf("%") && (o = o / 100 * a.width), -1 != s.indexOf("%") && (r = r / 100 * a.height), o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r, o -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = r
	}, h.layoutPosition = function() {
		var t = this.layout.size,
			e = {},
			i = this.layout._getOption("originLeft"),
			n = this.layout._getOption("originTop"),
			s = i ? "paddingLeft" : "paddingRight",
			o = i ? "left" : "right",
			r = i ? "right" : "left",
			a = this.position.x + t[s];
		e[o] = this.getXValue(a), e[r] = "";
		var h = n ? "paddingTop" : "paddingBottom",
			l = n ? "top" : "bottom",
			u = n ? "bottom" : "top",
			c = this.position.y + t[h];
		e[l] = this.getYValue(c), e[u] = "", this.css(e), this.emitEvent("layout", [this])
	}, h.getXValue = function(t) {
		var e = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
	}, h.getYValue = function(t) {
		var e = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
	}, h._transitionTo = function(t, e) {
		this.getPosition();
		var i = this.position.x,
			n = this.position.y,
			s = t == this.position.x && e == this.position.y;
		if (this.setPosition(t, e), !s || this.isTransitioning) {
			var o = t - i,
				r = e - n,
				a = {};
			a.transform = this.getTranslate(o, r), this.transition({
				to: a,
				onTransitionEnd: {
					transform: this.layoutPosition
				},
				isCleaning: !0
			})
		} else this.layoutPosition()
	}, h.getTranslate = function(t, e) {
		return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)"
	}, h.goTo = function(t, e) {
		this.setPosition(t, e), this.layoutPosition()
	}, h.moveTo = h._transitionTo, h.setPosition = function(t, e) {
		this.position.x = parseFloat(t), this.position.y = parseFloat(e)
	}, h._nonTransition = function(t) {
		for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this)
	}, h.transition = function(t) {
		if (parseFloat(this.layout.options.transitionDuration)) {
			var e = this._transn;
			for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
			for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
			if (t.from) {
				this.css(t.from);
				this.element.offsetHeight;
				null
			}
			this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
		} else this._nonTransition(t)
	};
	var l = "opacity," + s.replace(/([A-Z])/g, (function(t) {
		return "-" + t.toLowerCase()
	}));
	h.enableTransition = function() {
		if (!this.isTransitioning) {
			var t = this.layout.options.transitionDuration;
			t = "number" == typeof t ? t + "ms" : t, this.css({
				transitionProperty: l,
				transitionDuration: t,
				transitionDelay: this.staggerDelay || 0
			}), this.element.addEventListener(o, this, !1)
		}
	}, h.onwebkitTransitionEnd = function(t) {
		this.ontransitionend(t)
	}, h.onotransitionend = function(t) {
		this.ontransitionend(t)
	};
	var u = {
		"-webkit-transform": "transform"
	};
	h.ontransitionend = function(t) {
		if (t.target === this.element) {
			var e = this._transn,
				i = u[t.propertyName] || t.propertyName;
			if (delete e.ingProperties[i], function(t) {
					for (var e in t) return !1;
					return !0
				}(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) e.onEnd[i].call(this), delete e.onEnd[i];
			this.emitEvent("transitionEnd", [this])
		}
	}, h.disableTransition = function() {
		this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
	}, h._removeStyles = function(t) {
		var e = {};
		for (var i in t) e[i] = "";
		this.css(e)
	};
	var c = {
		transitionProperty: "",
		transitionDuration: "",
		transitionDelay: ""
	};
	return h.removeTransitionStyles = function() {
		this.css(c)
	}, h.stagger = function(t) {
		t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
	}, h.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.css({
			display: ""
		}), this.emitEvent("remove", [this])
	}, h.remove = function() {
		n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", (function() {
			this.removeElem()
		})), this.hide()) : this.removeElem()
	}, h.reveal = function() {
		delete this.isHidden, this.css({
			display: ""
		});
		var t = this.layout.options,
			e = {};
		e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
			from: t.hiddenStyle,
			to: t.visibleStyle,
			isCleaning: !0,
			onTransitionEnd: e
		})
	}, h.onRevealTransitionEnd = function() {
		this.isHidden || this.emitEvent("reveal")
	}, h.getHideRevealTransitionEndProperty = function(t) {
		var e = this.layout.options[t];
		if (e.opacity) return "opacity";
		for (var i in e) return i
	}, h.hide = function() {
		this.isHidden = !0, this.css({
			display: ""
		});
		var t = this.layout.options,
			e = {};
		e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
			from: t.visibleStyle,
			to: t.hiddenStyle,
			isCleaning: !0,
			onTransitionEnd: e
		})
	}, h.onHideTransitionEnd = function() {
		this.isHidden && (this.css({
			display: "none"
		}), this.emitEvent("hide"))
	}, h.destroy = function() {
		this.css({
			position: "",
			left: "",
			right: "",
			top: "",
			bottom: "",
			transition: "",
			transform: ""
		})
	}, a
})),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], (function(i, n, s, o) {
		return e(t, i, n, s, o)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, (function(t, e, i, n, s) {
	"use strict";
	var o = t.console,
		r = t.jQuery,
		a = function() {},
		h = 0,
		l = {};

	function u(t, e) {
		var i = n.getQueryElement(t);
		if (i) {
			this.element = i, r && (this.$element = r(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
			var s = ++h;
			this.element.outlayerGUID = s, l[s] = this, this._create(), this._getOption("initLayout") && this.layout()
		} else o && o.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
	}
	u.namespace = "outlayer", u.Item = s, u.defaults = {
		containerStyle: {
			position: "relative"
		},
		initLayout: !0,
		originLeft: !0,
		originTop: !0,
		resize: !0,
		resizeContainer: !0,
		transitionDuration: "0.4s",
		hiddenStyle: {
			opacity: 0,
			transform: "scale(0.001)"
		},
		visibleStyle: {
			opacity: 1,
			transform: "scale(1)"
		}
	};
	var c = u.prototype;

	function d(t) {
		function e() {
			t.apply(this, arguments)
		}
		return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
	}
	n.extend(c, e.prototype), c.option = function(t) {
		n.extend(this.options, t)
	}, c._getOption = function(t) {
		var e = this.constructor.compatOptions[t];
		return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
	}, u.compatOptions = {
		initLayout: "isInitLayout",
		horizontal: "isHorizontal",
		layoutInstant: "isLayoutInstant",
		originLeft: "isOriginLeft",
		originTop: "isOriginTop",
		resize: "isResizeBound",
		resizeContainer: "isResizingContainer"
	}, c._create = function() {
		this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
	}, c.reloadItems = function() {
		this.items = this._itemize(this.element.children)
	}, c._itemize = function(t) {
		for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], s = 0; s < e.length; s++) {
			var o = new i(e[s], this);
			n.push(o)
		}
		return n
	}, c._filterFindItemElements = function(t) {
		return n.filterFindElements(t, this.options.itemSelector)
	}, c.getItemElements = function() {
		return this.items.map((function(t) {
			return t.element
		}))
	}, c.layout = function() {
		this._resetLayout(), this._manageStamps();
		var t = this._getOption("layoutInstant"),
			e = void 0 !== t ? t : !this._isLayoutInited;
		this.layoutItems(this.items, e), this._isLayoutInited = !0
	}, c._init = c.layout, c._resetLayout = function() {
		this.getSize()
	}, c.getSize = function() {
		this.size = i(this.element)
	}, c._getMeasurement = function(t, e) {
		var n, s = this.options[t];
		s ? ("string" == typeof s ? n = this.element.querySelector(s) : s instanceof HTMLElement && (n = s), this[t] = n ? i(n)[e] : s) : this[t] = 0
	}, c.layoutItems = function(t, e) {
		t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
	}, c._getItemsForLayout = function(t) {
		return t.filter((function(t) {
			return !t.isIgnored
		}))
	}, c._layoutItems = function(t, e) {
		if (this._emitCompleteOnItems("layout", t), t && t.length) {
			var i = [];
			t.forEach((function(t) {
				var n = this._getItemLayoutPosition(t);
				n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
			}), this), this._processLayoutQueue(i)
		}
	}, c._getItemLayoutPosition = function() {
		return {
			x: 0,
			y: 0
		}
	}, c._processLayoutQueue = function(t) {
		this.updateStagger(), t.forEach((function(t, e) {
			this._positionItem(t.item, t.x, t.y, t.isInstant, e)
		}), this)
	}, c.updateStagger = function() {
		var t = this.options.stagger;
		if (null != t) return this.stagger = function(t) {
			if ("number" == typeof t) return t;
			var e = t.match(/(^\d*\.?\d*)(\w*)/),
				i = e && e[1],
				n = e && e[2];
			if (!i.length) return 0;
			i = parseFloat(i);
			var s = f[n] || 1;
			return i * s
		}(t), this.stagger;
		this.stagger = 0
	}, c._positionItem = function(t, e, i, n, s) {
		n ? t.goTo(e, i) : (t.stagger(s * this.stagger), t.moveTo(e, i))
	}, c._postLayout = function() {
		this.resizeContainer()
	}, c.resizeContainer = function() {
		if (this._getOption("resizeContainer")) {
			var t = this._getContainerSize();
			t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
		}
	}, c._getContainerSize = a, c._setContainerMeasure = function(t, e) {
		if (void 0 !== t) {
			var i = this.size;
			i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
		}
	}, c._emitCompleteOnItems = function(t, e) {
		var i = this;

		function n() {
			i.dispatchEvent(t + "Complete", null, [e])
		}
		var s = e.length;
		if (e && s) {
			var o = 0;
			e.forEach((function(e) {
				e.once(t, r)
			}))
		} else n();

		function r() {
			++o == s && n()
		}
	}, c.dispatchEvent = function(t, e, i) {
		var n = e ? [e].concat(i) : i;
		if (this.emitEvent(t, n), r)
			if (this.$element = this.$element || r(this.element), e) {
				var s = r.Event(e);
				s.type = t, this.$element.trigger(s, i)
			} else this.$element.trigger(t, i)
	}, c.ignore = function(t) {
		var e = this.getItem(t);
		e && (e.isIgnored = !0)
	}, c.unignore = function(t) {
		var e = this.getItem(t);
		e && delete e.isIgnored
	}, c.stamp = function(t) {
		(t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
	}, c.unstamp = function(t) {
		(t = this._find(t)) && t.forEach((function(t) {
			n.removeFrom(this.stamps, t), this.unignore(t)
		}), this)
	}, c._find = function(t) {
		if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)
	}, c._manageStamps = function() {
		this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
	}, c._getBoundingRect = function() {
		var t = this.element.getBoundingClientRect(),
			e = this.size;
		this._boundingRect = {
			left: t.left + e.paddingLeft + e.borderLeftWidth,
			top: t.top + e.paddingTop + e.borderTopWidth,
			right: t.right - (e.paddingRight + e.borderRightWidth),
			bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
		}
	}, c._manageStamp = a, c._getElementOffset = function(t) {
		var e = t.getBoundingClientRect(),
			n = this._boundingRect,
			s = i(t);
		return {
			left: e.left - n.left - s.marginLeft,
			top: e.top - n.top - s.marginTop,
			right: n.right - e.right - s.marginRight,
			bottom: n.bottom - e.bottom - s.marginBottom
		}
	}, c.handleEvent = n.handleEvent, c.bindResize = function() {
		t.addEventListener("resize", this), this.isResizeBound = !0
	}, c.unbindResize = function() {
		t.removeEventListener("resize", this), this.isResizeBound = !1
	}, c.onresize = function() {
		this.resize()
	}, n.debounceMethod(u, "onresize", 100), c.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && this.layout()
	}, c.needsResizeLayout = function() {
		var t = i(this.element);
		return this.size && t && t.innerWidth !== this.size.innerWidth
	}, c.addItems = function(t) {
		var e = this._itemize(t);
		return e.length && (this.items = this.items.concat(e)), e
	}, c.appended = function(t) {
		var e = this.addItems(t);
		e.length && (this.layoutItems(e, !0), this.reveal(e))
	}, c.prepended = function(t) {
		var e = this._itemize(t);
		if (e.length) {
			var i = this.items.slice(0);
			this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
		}
	}, c.reveal = function(t) {
		if (this._emitCompleteOnItems("reveal", t), t && t.length) {
			var e = this.updateStagger();
			t.forEach((function(t, i) {
				t.stagger(i * e), t.reveal()
			}))
		}
	}, c.hide = function(t) {
		if (this._emitCompleteOnItems("hide", t), t && t.length) {
			var e = this.updateStagger();
			t.forEach((function(t, i) {
				t.stagger(i * e), t.hide()
			}))
		}
	}, c.revealItemElements = function(t) {
		var e = this.getItems(t);
		this.reveal(e)
	}, c.hideItemElements = function(t) {
		var e = this.getItems(t);
		this.hide(e)
	}, c.getItem = function(t) {
		for (var e = 0; e < this.items.length; e++) {
			var i = this.items[e];
			if (i.element == t) return i
		}
	}, c.getItems = function(t) {
		t = n.makeArray(t);
		var e = [];
		return t.forEach((function(t) {
			var i = this.getItem(t);
			i && e.push(i)
		}), this), e
	}, c.remove = function(t) {
		var e = this.getItems(t);
		this._emitCompleteOnItems("remove", e), e && e.length && e.forEach((function(t) {
			t.remove(), n.removeFrom(this.items, t)
		}), this)
	}, c.destroy = function() {
		var t = this.element.style;
		t.height = "", t.position = "", t.width = "", this.items.forEach((function(t) {
			t.destroy()
		})), this.unbindResize();
		var e = this.element.outlayerGUID;
		delete l[e], delete this.element.outlayerGUID, r && r.removeData(this.element, this.constructor.namespace)
	}, u.data = function(t) {
		var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
		return e && l[e]
	}, u.create = function(t, e) {
		var i = d(u);
		return i.defaults = n.extend({}, u.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, u.compatOptions), i.namespace = t, i.data = u.data, i.Item = d(s), n.htmlInit(i, t), r && r.bridget && r.bridget(t, i), i
	};
	var f = {
		ms: 1,
		s: 1e3
	};
	return u.Item = s, u
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, (function(t) {
	"use strict";

	function e() {
		t.Item.apply(this, arguments)
	}
	var i = e.prototype = Object.create(t.Item.prototype),
		n = i._create;
	i._create = function() {
		this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
	}, i.updateSortData = function() {
		if (!this.isIgnored) {
			this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
			var t = this.layout.options.getSortData,
				e = this.layout._sorters;
			for (var i in t) {
				var n = e[i];
				this.sortData[i] = n(this.element, this)
			}
		}
	};
	var s = i.destroy;
	return i.destroy = function() {
		s.apply(this, arguments), this.css({
			display: ""
		})
	}, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, (function(t, e) {
	"use strict";

	function i(t) {
		this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
	}
	var n = i.prototype;
	return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach((function(t) {
		n[t] = function() {
			return e.prototype[t].apply(this.isotope, arguments)
		}
	})), n.needsVerticalResizeLayout = function() {
		var e = t(this.isotope.element);
		return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight
	}, n._getMeasurement = function() {
		this.isotope._getMeasurement.apply(this, arguments)
	}, n.getColumnWidth = function() {
		this.getSegmentSize("column", "Width")
	}, n.getRowHeight = function() {
		this.getSegmentSize("row", "Height")
	}, n.getSegmentSize = function(t, e) {
		var i = t + e,
			n = "outer" + e;
		if (this._getMeasurement(i, n), !this[i]) {
			var s = this.getFirstItemSize();
			this[i] = s && s[n] || this.isotope.size["inner" + e]
		}
	}, n.getFirstItemSize = function() {
		var e = this.isotope.filteredItems[0];
		return e && e.element && t(e.element)
	}, n.layout = function() {
		this.isotope.layout.apply(this.isotope, arguments)
	}, n.getSize = function() {
		this.isotope.getSize(), this.size = this.isotope.size
	}, i.modes = {}, i.create = function(t, e) {
		function s() {
			i.apply(this, arguments)
		}
		return s.prototype = Object.create(n), s.prototype.constructor = s, e && (s.options = e), s.prototype.namespace = t, i.modes[t] = s, s
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, (function(t, e) {
	var i = t.create("masonry");
	i.compatOptions.fitWidth = "isFitWidth";
	var n = i.prototype;
	return n._resetLayout = function() {
		this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
		for (var t = 0; t < this.cols; t++) this.colYs.push(0);
		this.maxY = 0, this.horizontalColIndex = 0
	}, n.measureColumns = function() {
		if (this.getContainerWidth(), !this.columnWidth) {
			var t = this.items[0],
				i = t && t.element;
			this.columnWidth = i && e(i).outerWidth || this.containerWidth
		}
		var n = this.columnWidth += this.gutter,
			s = this.containerWidth + this.gutter,
			o = s / n,
			r = n - s % n;
		o = Math[r && r < 1 ? "round" : "floor"](o), this.cols = Math.max(o, 1)
	}, n.getContainerWidth = function() {
		var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
			i = e(t);
		this.containerWidth = i && i.innerWidth
	}, n._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = t.size.outerWidth % this.columnWidth,
			i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
		i = Math.min(i, this.cols);
		for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), s = {
				x: this.columnWidth * n.col,
				y: n.y
			}, o = n.y + t.size.outerHeight, r = i + n.col, a = n.col; a < r; a++) this.colYs[a] = o;
		return s
	}, n._getTopColPosition = function(t) {
		var e = this._getTopColGroup(t),
			i = Math.min.apply(Math, e);
		return {
			col: e.indexOf(i),
			y: i
		}
	}, n._getTopColGroup = function(t) {
		if (t < 2) return this.colYs;
		for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) e[n] = this._getColGroupY(n, t);
		return e
	}, n._getColGroupY = function(t, e) {
		if (e < 2) return this.colYs[t];
		var i = this.colYs.slice(t, t + e);
		return Math.max.apply(Math, i)
	}, n._getHorizontalColPosition = function(t, e) {
		var i = this.horizontalColIndex % this.cols;
		i = t > 1 && i + t > this.cols ? 0 : i;
		var n = e.size.outerWidth && e.size.outerHeight;
		return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
			col: i,
			y: this._getColGroupY(i, t)
		}
	}, n._manageStamp = function(t) {
		var i = e(t),
			n = this._getElementOffset(t),
			s = this._getOption("originLeft") ? n.left : n.right,
			o = s + i.outerWidth,
			r = Math.floor(s / this.columnWidth);
		r = Math.max(0, r);
		var a = Math.floor(o / this.columnWidth);
		a -= o % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
		for (var h = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, l = r; l <= a; l++) this.colYs[l] = Math.max(h, this.colYs[l])
	}, n._getContainerSize = function() {
		this.maxY = Math.max.apply(Math, this.colYs);
		var t = {
			height: this.maxY
		};
		return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
	}, n._getContainerFitWidth = function() {
		for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
		return (this.cols - t) * this.columnWidth - this.gutter
	}, n.needsResizeLayout = function() {
		var t = this.containerWidth;
		return this.getContainerWidth(), t != this.containerWidth
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, (function(t, e) {
	"use strict";
	var i = t.create("masonry"),
		n = i.prototype,
		s = {
			_getElementOffset: !0,
			layout: !0,
			_getMeasurement: !0
		};
	for (var o in e.prototype) s[o] || (n[o] = e.prototype[o]);
	var r = n.measureColumns;
	n.measureColumns = function() {
		this.items = this.isotope.filteredItems, r.call(this)
	};
	var a = n._getOption;
	return n._getOption = function(t) {
		return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, (function(t) {
	"use strict";
	var e = t.create("fitRows"),
		i = e.prototype;
	return i._resetLayout = function() {
		this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
	}, i._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = t.size.outerWidth + this.gutter,
			i = this.isotope.size.innerWidth + this.gutter;
		0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
		var n = {
			x: this.x,
			y: this.y
		};
		return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
	}, i._getContainerSize = function() {
		return {
			height: this.maxY
		}
	}, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, (function(t) {
	"use strict";
	var e = t.create("vertical", {
			horizontalAlignment: 0
		}),
		i = e.prototype;
	return i._resetLayout = function() {
		this.y = 0
	}, i._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
			i = this.y;
		return this.y += t.size.outerHeight, {
			x: e,
			y: i
		}
	}, i._getContainerSize = function() {
		return {
			height: this.y
		}
	}, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], (function(i, n, s, o, r, a) {
		return e(t, i, n, s, o, r, a)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, (function(t, e, i, n, s, o, r) {
	var a = t.jQuery,
		h = String.prototype.trim ? function(t) {
			return t.trim()
		} : function(t) {
			return t.replace(/^\s+|\s+$/g, "")
		},
		l = e.create("isotope", {
			layoutMode: "masonry",
			isJQueryFiltering: !0,
			sortAscending: !0
		});
	l.Item = o, l.LayoutMode = r;
	var u = l.prototype;
	u._create = function() {
		for (var t in this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], r.modes) this._initLayoutMode(t)
	}, u.reloadItems = function() {
		this.itemGUID = 0, e.prototype.reloadItems.call(this)
	}, u._itemize = function() {
		for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
			t[i].id = this.itemGUID++
		}
		return this._updateItemsSortData(t), t
	}, u._initLayoutMode = function(t) {
		var e = r.modes[t],
			i = this.options[t] || {};
		this.options[t] = e.options ? s.extend(e.options, i) : i, this.modes[t] = new e(this)
	}, u.layout = function() {
		this._isLayoutInited || !this._getOption("initLayout") ? this._layout() : this.arrange()
	}, u._layout = function() {
		var t = this._getIsInstant();
		this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
	}, u.arrange = function(t) {
		this.option(t), this._getIsInstant();
		var e = this._filter(this.items);
		this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
	}, u._init = u.arrange, u._hideReveal = function(t) {
		this.reveal(t.needReveal), this.hide(t.needHide)
	}, u._getIsInstant = function() {
		var t = this._getOption("layoutInstant"),
			e = void 0 !== t ? t : !this._isLayoutInited;
		return this._isInstant = e, e
	}, u._bindArrangeComplete = function() {
		var t, e, i, n = this;

		function s() {
			t && e && i && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
		}
		this.once("layoutComplete", (function() {
			t = !0, s()
		})), this.once("hideComplete", (function() {
			e = !0, s()
		})), this.once("revealComplete", (function() {
			i = !0, s()
		}))
	}, u._filter = function(t) {
		var e = this.options.filter;
		e = e || "*";
		for (var i = [], n = [], s = [], o = this._getFilterTest(e), r = 0; r < t.length; r++) {
			var a = t[r];
			if (!a.isIgnored) {
				var h = o(a);
				h && i.push(a), h && a.isHidden ? n.push(a) : h || a.isHidden || s.push(a)
			}
		}
		return {
			matches: i,
			needReveal: n,
			needHide: s
		}
	}, u._getFilterTest = function(t) {
		return a && this.options.isJQueryFiltering ? function(e) {
			return a(e.element).is(t)
		} : "function" == typeof t ? function(e) {
			return t(e.element)
		} : function(e) {
			return n(e.element, t)
		}
	}, u.updateSortData = function(t) {
		var e;
		t ? (t = s.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
	}, u._getSorters = function() {
		var t = this.options.getSortData;
		for (var e in t) {
			var i = t[e];
			this._sorters[e] = c(i)
		}
	}, u._updateItemsSortData = function(t) {
		for (var e = t && t.length, i = 0; e && i < e; i++) {
			t[i].updateSortData()
		}
	};
	var c = function(t) {
		if ("string" != typeof t) return t;
		var e = h(t).split(" "),
			i = e[0],
			n = i.match(/^\[(.+)\]$/),
			s = function(t, e) {
				return t ? function(e) {
					return e.getAttribute(t)
				} : function(t) {
					var i = t.querySelector(e);
					return i && i.textContent
				}
			}(n && n[1], i),
			o = l.sortDataParsers[e[1]];
		return t = o ? function(t) {
			return t && o(s(t))
		} : function(t) {
			return t && s(t)
		}
	};
	l.sortDataParsers = {
		parseInt: function(t) {
			return parseInt(t, 10)
		},
		parseFloat: function(t) {
			return parseFloat(t)
		}
	}, u._sort = function() {
		if (this.options.sortBy) {
			var t = s.makeArray(this.options.sortBy);
			this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
			var e = function(t, e) {
				return function(i, n) {
					for (var s = 0; s < t.length; s++) {
						var o = t[s],
							r = i.sortData[o],
							a = n.sortData[o];
						if (r > a || r < a) return (r > a ? 1 : -1) * ((void 0 !== e[o] ? e[o] : e) ? 1 : -1)
					}
					return 0
				}
			}(this.sortHistory, this.options.sortAscending);
			this.filteredItems.sort(e)
		}
	}, u._getIsSameSortBy = function(t) {
		for (var e = 0; e < t.length; e++)
			if (t[e] != this.sortHistory[e]) return !1;
		return !0
	}, u._mode = function() {
		var t = this.options.layoutMode,
			e = this.modes[t];
		if (!e) throw new Error("No layout mode: " + t);
		return e.options = this.options[t], e
	}, u._resetLayout = function() {
		e.prototype._resetLayout.call(this), this._mode()._resetLayout()
	}, u._getItemLayoutPosition = function(t) {
		return this._mode()._getItemLayoutPosition(t)
	}, u._manageStamp = function(t) {
		this._mode()._manageStamp(t)
	}, u._getContainerSize = function() {
		return this._mode()._getContainerSize()
	}, u.needsResizeLayout = function() {
		return this._mode().needsResizeLayout()
	}, u.appended = function(t) {
		var e = this.addItems(t);
		if (e.length) {
			var i = this._filterRevealAdded(e);
			this.filteredItems = this.filteredItems.concat(i)
		}
	}, u.prepended = function(t) {
		var e = this._itemize(t);
		if (e.length) {
			this._resetLayout(), this._manageStamps();
			var i = this._filterRevealAdded(e);
			this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
		}
	}, u._filterRevealAdded = function(t) {
		var e = this._filter(t);
		return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
	}, u.insert = function(t) {
		var e = this.addItems(t);
		if (e.length) {
			var i, n, s = e.length;
			for (i = 0; i < s; i++) n = e[i], this.element.appendChild(n.element);
			var o = this._filter(e).matches;
			for (i = 0; i < s; i++) e[i].isLayoutInstant = !0;
			for (this.arrange(), i = 0; i < s; i++) delete e[i].isLayoutInstant;
			this.reveal(o)
		}
	};
	var d = u.remove;
	return u.remove = function(t) {
		t = s.makeArray(t);
		var e = this.getItems(t);
		d.call(this, t);
		for (var i = e && e.length, n = 0; i && n < i; n++) {
			var o = e[n];
			s.removeFrom(this.filteredItems, o)
		}
	}, u.shuffle = function() {
		for (var t = 0; t < this.items.length; t++) {
			this.items[t].sortData.random = Math.random()
		}
		this.options.sortBy = "random", this._sort(), this._layout()
	}, u._noTransition = function(t, e) {
		var i = this.options.transitionDuration;
		this.options.transitionDuration = 0;
		var n = t.apply(this, e);
		return this.options.transitionDuration = i, n
	}, u.getFilteredItemElements = function() {
		return this.filteredItems.map((function(t) {
			return t.element
		}))
	}, l
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("packery/js/rect", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Packery = t.Packery || {}, t.Packery.Rect = e())
}(window, (function() {
	function t(e) {
		for (var i in t.defaults) this[i] = t.defaults[i];
		for (i in e) this[i] = e[i]
	}
	t.defaults = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var e = t.prototype;
	return e.contains = function(t) {
		var e = t.width || 0,
			i = t.height || 0;
		return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
	}, e.overlaps = function(t) {
		var e = this.x + this.width,
			i = this.y + this.height,
			n = t.x + t.width,
			s = t.y + t.height;
		return this.x < n && e > t.x && this.y < s && i > t.y
	}, e.getMaximalFreeRects = function(e) {
		if (!this.overlaps(e)) return !1;
		var i, n = [],
			s = this.x + this.width,
			o = this.y + this.height,
			r = e.x + e.width,
			a = e.y + e.height;
		return this.y < e.y && (i = new t({
			x: this.x,
			y: this.y,
			width: this.width,
			height: e.y - this.y
		}), n.push(i)), s > r && (i = new t({
			x: r,
			y: this.y,
			width: s - r,
			height: this.height
		}), n.push(i)), o > a && (i = new t({
			x: this.x,
			y: a,
			width: this.width,
			height: o - a
		}), n.push(i)), this.x < e.x && (i = new t({
			x: this.x,
			y: this.y,
			width: e.x - this.x,
			height: this.height
		}), n.push(i)), n
	}, e.canFit = function(t) {
		return this.width >= t.width && this.height >= t.height
	}, t
})),
function(t, e) {
	if ("function" == typeof define && define.amd) define("packery/js/packer", ["./rect"], e);
	else if ("object" == typeof module && module.exports) module.exports = e(require("./rect"));
	else {
		var i = t.Packery = t.Packery || {};
		i.Packer = e(i.Rect)
	}
}(window, (function(t) {
	function e(t, e, i) {
		this.width = t || 0, this.height = e || 0, this.sortDirection = i || "downwardLeftToRight", this.reset()
	}
	var i = e.prototype;
	i.reset = function() {
		this.spaces = [];
		var e = new t({
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		});
		this.spaces.push(e), this.sorter = n[this.sortDirection] || n.downwardLeftToRight
	}, i.pack = function(t) {
		for (var e = 0; e < this.spaces.length; e++) {
			var i = this.spaces[e];
			if (i.canFit(t)) {
				this.placeInSpace(t, i);
				break
			}
		}
	}, i.columnPack = function(t) {
		for (var e = 0; e < this.spaces.length; e++) {
			var i = this.spaces[e];
			if (i.x <= t.x && i.x + i.width >= t.x + t.width && i.height >= t.height - .01) {
				t.y = i.y, this.placed(t);
				break
			}
		}
	}, i.rowPack = function(t) {
		for (var e = 0; e < this.spaces.length; e++) {
			var i = this.spaces[e];
			if (i.y <= t.y && i.y + i.height >= t.y + t.height && i.width >= t.width - .01) {
				t.x = i.x, this.placed(t);
				break
			}
		}
	}, i.placeInSpace = function(t, e) {
		t.x = e.x, t.y = e.y, this.placed(t)
	}, i.placed = function(t) {
		for (var e = [], i = 0; i < this.spaces.length; i++) {
			var n = this.spaces[i],
				s = n.getMaximalFreeRects(t);
			s ? e.push.apply(e, s) : e.push(n)
		}
		this.spaces = e, this.mergeSortSpaces()
	}, i.mergeSortSpaces = function() {
		e.mergeRects(this.spaces), this.spaces.sort(this.sorter)
	}, i.addSpace = function(t) {
		this.spaces.push(t), this.mergeSortSpaces()
	}, e.mergeRects = function(t) {
		var e = 0,
			i = t[e];
		t: for (; i;) {
			for (var n = 0, s = t[e + n]; s;) {
				if (s == i) n++;
				else {
					if (s.contains(i)) {
						t.splice(e, 1), i = t[e];
						continue t
					}
					i.contains(s) ? t.splice(e + n, 1) : n++
				}
				s = t[e + n]
			}
			i = t[++e]
		}
		return t
	};
	var n = {
		downwardLeftToRight: function(t, e) {
			return t.y - e.y || t.x - e.x
		},
		rightwardTopToBottom: function(t, e) {
			return t.x - e.x || t.y - e.y
		}
	};
	return e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("packery/js/item", ["outlayer/outlayer", "./rect"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("./rect")) : t.Packery.Item = e(t.Outlayer, t.Packery.Rect)
}(window, (function(t, e) {
	var i = "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform",
		n = function() {
			t.Item.apply(this, arguments)
		},
		s = n.prototype = Object.create(t.Item.prototype),
		o = s._create;
	s._create = function() {
		o.call(this), this.rect = new e
	};
	var r = s.moveTo;
	return s.moveTo = function(t, e) {
		var i = Math.abs(this.position.x - t),
			n = Math.abs(this.position.y - e);
		this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && i < 1 && n < 1 ? this.goTo(t, e) : r.apply(this, arguments)
	}, s.enablePlacing = function() {
		this.removeTransitionStyles(), this.isTransitioning && i && (this.element.style[i] = "none"), this.isTransitioning = !1, this.getSize(), this.layout._setRectSize(this.element, this.rect), this.isPlacing = !0
	}, s.disablePlacing = function() {
		this.isPlacing = !1
	}, s.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this])
	}, s.showDropPlaceholder = function() {
		var t = this.dropPlaceholder;
		t || ((t = this.dropPlaceholder = document.createElement("div")).className = "packery-drop-placeholder", t.style.position = "absolute"), t.style.width = this.size.width + "px", t.style.height = this.size.height + "px", this.positionDropPlaceholder(), this.layout.element.appendChild(t)
	}, s.positionDropPlaceholder = function() {
		this.dropPlaceholder.style[i] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)"
	}, s.hideDropPlaceholder = function() {
		this.layout.element.removeChild(this.dropPlaceholder)
	}, n
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("packery/js/packery", ["get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = e(t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item)
}(window, (function(t, e, i, n, s) {
	i.prototype.canFit = function(t) {
		return this.width >= t.width - 1 && this.height >= t.height - 1
	};
	var o = e.create("packery");
	o.Item = s;
	var r = o.prototype;

	function a(t, e) {
		return t.position.y - e.position.y || t.position.x - e.position.x
	}

	function h(t, e) {
		return t.position.x - e.position.x || t.position.y - e.position.y
	}
	r._create = function() {
		e.prototype._create.call(this), this.packer = new n, this.shiftPacker = new n, this.isEnabled = !0, this.dragItemCount = 0;
		var t = this;
		this.handleDraggabilly = {
			dragStart: function() {
				t.itemDragStart(this.element)
			},
			dragMove: function() {
				t.itemDragMove(this.element, this.position.x, this.position.y)
			},
			dragEnd: function() {
				t.itemDragEnd(this.element)
			}
		}, this.handleUIDraggable = {
			start: function(e, i) {
				i && t.itemDragStart(e.currentTarget)
			},
			drag: function(e, i) {
				i && t.itemDragMove(e.currentTarget, i.position.left, i.position.top)
			},
			stop: function(e, i) {
				i && t.itemDragEnd(e.currentTarget)
			}
		}
	}, r._resetLayout = function() {
		var t, e, i;
		this.getSize(), this._getMeasurements(), this._getOption("horizontal") ? (t = 1 / 0, e = this.size.innerHeight + this.gutter, i = "rightwardTopToBottom") : (t = this.size.innerWidth + this.gutter, e = 1 / 0, i = "downwardLeftToRight"), this.packer.width = this.shiftPacker.width = t, this.packer.height = this.shiftPacker.height = e, this.packer.sortDirection = this.shiftPacker.sortDirection = i, this.packer.reset(), this.maxY = 0, this.maxX = 0
	}, r._getMeasurements = function() {
		this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width")
	}, r._getItemLayoutPosition = function(t) {
		if (this._setRectSize(t.element, t.rect), this.isShifting || this.dragItemCount > 0) {
			var e = this._getPackMethod();
			this.packer[e](t.rect)
		} else this.packer.pack(t.rect);
		return this._setMaxXY(t.rect), t.rect
	}, r.shiftLayout = function() {
		this.isShifting = !0, this.layout(), delete this.isShifting
	}, r._getPackMethod = function() {
		return this._getOption("horizontal") ? "rowPack" : "columnPack"
	}, r._setMaxXY = function(t) {
		this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY)
	}, r._setRectSize = function(e, i) {
		var n = t(e),
			s = n.outerWidth,
			o = n.outerHeight;
		(s || o) && (s = this._applyGridGutter(s, this.columnWidth), o = this._applyGridGutter(o, this.rowHeight)), i.width = Math.min(s, this.packer.width), i.height = Math.min(o, this.packer.height)
	}, r._applyGridGutter = function(t, e) {
		if (!e) return t + this.gutter;
		var i = t % (e += this.gutter);
		return t = Math[i && i < 1 ? "round" : "ceil"](t / e) * e
	}, r._getContainerSize = function() {
		return this._getOption("horizontal") ? {
			width: this.maxX - this.gutter
		} : {
			height: this.maxY - this.gutter
		}
	}, r._manageStamp = function(t) {
		var e, n = this.getItem(t);
		if (n && n.isPlacing) e = n.rect;
		else {
			var s = this._getElementOffset(t);
			e = new i({
				x: this._getOption("originLeft") ? s.left : s.right,
				y: this._getOption("originTop") ? s.top : s.bottom
			})
		}
		this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e)
	}, r.sortItemsByPosition = function() {
		var t = this._getOption("horizontal") ? h : a;
		this.items.sort(t)
	}, r.fit = function(t, e, i) {
		var n = this.getItem(t);
		n && (this.stamp(n.element), n.enablePlacing(), this.updateShiftTargets(n), e = void 0 === e ? n.rect.x : e, i = void 0 === i ? n.rect.y : i, this.shift(n, e, i), this._bindFitEvents(n), n.moveTo(n.rect.x, n.rect.y), this.shiftLayout(), this.unstamp(n.element), this.sortItemsByPosition(), n.disablePlacing())
	}, r._bindFitEvents = function(t) {
		var e = this,
			i = 0;

		function n() {
			2 == ++i && e.dispatchEvent("fitComplete", null, [t])
		}
		t.once("layout", n), this.once("layoutComplete", n)
	}, r.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout())
	}, r.needsResizeLayout = function() {
		var e = t(this.element),
			i = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
		return e[i] != this.size[i]
	}, r.resizeShiftPercentLayout = function() {
		var e = this._getItemsForLayout(this.items),
			i = this._getOption("horizontal"),
			n = i ? "y" : "x",
			s = i ? "height" : "width",
			o = i ? "rowHeight" : "columnWidth",
			r = i ? "innerHeight" : "innerWidth",
			a = this[o];
		if (a = a && a + this.gutter) {
			this._getMeasurements();
			var h = this[o] + this.gutter;
			e.forEach((function(t) {
				var e = Math.round(t.rect[n] / a);
				t.rect[n] = e * h
			}))
		} else {
			var l = t(this.element)[r] + this.gutter,
				u = this.packer[s];
			e.forEach((function(t) {
				t.rect[n] = t.rect[n] / u * l
			}))
		}
		this.shiftLayout()
	}, r.itemDragStart = function(t) {
		if (this.isEnabled) {
			this.stamp(t);
			var e = this.getItem(t);
			e && (e.enablePlacing(), e.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(e))
		}
	}, r.updateShiftTargets = function(t) {
		this.shiftPacker.reset(), this._getBoundingRect();
		var e = this._getOption("originLeft"),
			n = this._getOption("originTop");
		this.stamps.forEach((function(t) {
			var s = this.getItem(t);
			if (!s || !s.isPlacing) {
				var o = this._getElementOffset(t),
					r = new i({
						x: e ? o.left : o.right,
						y: n ? o.top : o.bottom
					});
				this._setRectSize(t, r), this.shiftPacker.placed(r)
			}
		}), this);
		var s, o = this._getOption("horizontal"),
			r = o ? "rowHeight" : "columnWidth",
			a = o ? "height" : "width";
		this.shiftTargetKeys = [], this.shiftTargets = [];
		var h = this[r];
		if (h = h && h + this.gutter) {
			var l = Math.ceil(t.rect[a] / h),
				u = Math.floor((this.shiftPacker[a] + this.gutter) / h);
			s = (u - l) * h;
			for (var c = 0; c < u; c++) this._addShiftTarget(c * h, 0, s)
		} else s = this.shiftPacker[a] + this.gutter - t.rect[a], this._addShiftTarget(0, 0, s);
		var d = this._getItemsForLayout(this.items),
			f = this._getPackMethod();
		d.forEach((function(t) {
			var e = t.rect;
			this._setRectSize(t.element, e), this.shiftPacker[f](e), this._addShiftTarget(e.x, e.y, s);
			var i = o ? e.x + e.width : e.x,
				n = o ? e.y : e.y + e.height;
			if (this._addShiftTarget(i, n, s), h)
				for (var r = Math.round(e[a] / h), l = 1; l < r; l++) {
					var u = o ? i : e.x + h * l,
						c = o ? e.y + h * l : n;
					this._addShiftTarget(u, c, s)
				}
		}), this)
	}, r._addShiftTarget = function(t, e, i) {
		var n = this._getOption("horizontal") ? e : t;
		if (!(0 !== n && n > i)) {
			var s = t + "," + e; - 1 != this.shiftTargetKeys.indexOf(s) || (this.shiftTargetKeys.push(s), this.shiftTargets.push({
				x: t,
				y: e
			}))
		}
	}, r.shift = function(t, e, i) {
		var n, s = 1 / 0,
			o = {
				x: e,
				y: i
			};
		this.shiftTargets.forEach((function(t) {
			var e, i, r, a, h = (r = (i = o).x - (e = t).x, a = i.y - e.y, Math.sqrt(r * r + a * a));
			h < s && (n = t, s = h)
		})), t.rect.x = n.x, t.rect.y = n.y
	};
	r.itemDragMove = function(t, e, i) {
		var n = this.isEnabled && this.getItem(t);
		if (n) {
			e -= this.size.paddingLeft, i -= this.size.paddingTop;
			var s = this,
				o = new Date;
			this._itemDragTime && o - this._itemDragTime < 120 ? (clearTimeout(this.dragTimeout), this.dragTimeout = setTimeout(r, 120)) : (r(), this._itemDragTime = o)
		}

		function r() {
			s.shift(n, e, i), n.positionDropPlaceholder(), s.layout()
		}
	}, r.itemDragEnd = function(t) {
		var e = this.isEnabled && this.getItem(t);
		if (e) {
			clearTimeout(this.dragTimeout), e.element.classList.add("is-positioning-post-drag");
			var i = 0,
				n = this;
			e.once("layout", s), this.once("layoutComplete", s), e.moveTo(e.rect.x, e.rect.y), this.layout(), this.dragItemCount = Math.max(0, this.dragItemCount - 1), this.sortItemsByPosition(), e.disablePlacing(), this.unstamp(e.element)
		}

		function s() {
			2 == ++i && (e.element.classList.remove("is-positioning-post-drag"), e.hideDropPlaceholder(), n.dispatchEvent("dragItemPositioned", null, [e]))
		}
	}, r.bindDraggabillyEvents = function(t) {
		this._bindDraggabillyEvents(t, "on")
	}, r.unbindDraggabillyEvents = function(t) {
		this._bindDraggabillyEvents(t, "off")
	}, r._bindDraggabillyEvents = function(t, e) {
		var i = this.handleDraggabilly;
		t[e]("dragStart", i.dragStart), t[e]("dragMove", i.dragMove), t[e]("dragEnd", i.dragEnd)
	}, r.bindUIDraggableEvents = function(t) {
		this._bindUIDraggableEvents(t, "on")
	}, r.unbindUIDraggableEvents = function(t) {
		this._bindUIDraggableEvents(t, "off")
	}, r._bindUIDraggableEvents = function(t, e) {
		var i = this.handleUIDraggable;
		t[e]("dragstart", i.start)[e]("drag", i.drag)[e]("dragstop", i.stop)
	};
	var l = r.destroy;
	return r.destroy = function() {
		l.apply(this, arguments), this.isEnabled = !1
	}, o.Rect = i, o.Packer = n, o
})),
function(t, e) {
	"function" == typeof define && define.amd ? define(["isotope-layout/js/layout-mode", "packery/js/packery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("isotope-layout/js/layout-mode"), require("packery")) : e(t.Isotope.LayoutMode, t.Packery)
}(window, (function(t, e) {
	var i = t.create("packery"),
		n = i.prototype,
		s = {
			_getElementOffset: !0,
			_getMeasurement: !0
		};
	for (var o in e.prototype) s[o] || (n[o] = e.prototype[o]);
	var r = n._resetLayout;
	n._resetLayout = function() {
		this.packer = this.packer || new e.Packer, this.shiftPacker = this.shiftPacker || new e.Packer, r.apply(this, arguments)
	};
	var a = n._getItemLayoutPosition;
	n._getItemLayoutPosition = function(t) {
		return t.rect = t.rect || new e.Rect, a.call(this, t)
	};
	var h = n.needsResizeLayout;
	n.needsResizeLayout = function() {
		return this._getOption("horizontal") ? this.needsVerticalResizeLayout() : h.call(this)
	};
	var l = n._getOption;
	return n._getOption = function(t) {
		return "horizontal" == t ? void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal : l.apply(this.isotope, arguments)
	}, i
})),
function(t, e) {
	"object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, (function() {
	function t() {}
	let e = t.prototype;
	return e.on = function(t, e) {
		if (!t || !e) return this;
		let i = this._events = this._events || {},
			n = i[t] = i[t] || [];
		return n.includes(e) || n.push(e), this
	}, e.once = function(t, e) {
		if (!t || !e) return this;
		this.on(t, e);
		let i = this._onceEvents = this._onceEvents || {};
		return (i[t] = i[t] || {})[e] = !0, this
	}, e.off = function(t, e) {
		let i = this._events && this._events[t];
		if (!i || !i.length) return this;
		let n = i.indexOf(e);
		return -1 != n && i.splice(n, 1), this
	}, e.emitEvent = function(t, e) {
		let i = this._events && this._events[t];
		if (!i || !i.length) return this;
		i = i.slice(0), e = e || [];
		let n = this._onceEvents && this._onceEvents[t];
		for (let s of i) {
			n && n[s] && (this.off(t, s), delete n[s]), s.apply(this, e)
		}
		return this
	}, e.allOff = function() {
		return delete this._events, delete this._onceEvents, this
	}, t
})),
function(t, e) {
	"object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, (function(t, e) {
	let i = t.jQuery,
		n = t.console;

	function s(t, e, o) {
		if (!(this instanceof s)) return new s(t, e, o);
		let r = t;
		var a;
		("string" == typeof t && (r = document.querySelectorAll(t)), r) ? (this.elements = (a = r, Array.isArray(a) ? a : "object" == typeof a && "number" == typeof a.length ? [...a] : [a]), this.options = {}, "function" == typeof e ? o = e : Object.assign(this.options, e), o && this.on("always", o), this.getImages(), i && (this.jqDeferred = new i.Deferred), setTimeout(this.check.bind(this))) : n.error(`Bad element for imagesLoaded ${r||t}`)
	}
	s.prototype = Object.create(e.prototype), s.prototype.getImages = function() {
		this.images = [], this.elements.forEach(this.addElementImages, this)
	};
	const o = [1, 9, 11];
	s.prototype.addElementImages = function(t) {
		"IMG" === t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
		let {
			nodeType: e
		} = t;
		if (!e || !o.includes(e)) return;
		let i = t.querySelectorAll("img");
		for (let t of i) this.addImage(t);
		if ("string" == typeof this.options.background) {
			let e = t.querySelectorAll(this.options.background);
			for (let t of e) this.addElementBackgroundImages(t)
		}
	};
	const r = /url\((['"])?(.*?)\1\)/gi;

	function a(t) {
		this.img = t
	}

	function h(t, e) {
		this.url = t, this.element = e, this.img = new Image
	}
	return s.prototype.addElementBackgroundImages = function(t) {
		let e = getComputedStyle(t);
		if (!e) return;
		let i = r.exec(e.backgroundImage);
		for (; null !== i;) {
			let n = i && i[2];
			n && this.addBackground(n, t), i = r.exec(e.backgroundImage)
		}
	}, s.prototype.addImage = function(t) {
		let e = new a(t);
		this.images.push(e)
	}, s.prototype.addBackground = function(t, e) {
		let i = new h(t, e);
		this.images.push(i)
	}, s.prototype.check = function() {
		if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();
		let t = (t, e, i) => {
			setTimeout((() => {
				this.progress(t, e, i)
			}))
		};
		this.images.forEach((function(e) {
			e.once("progress", t), e.check()
		}))
	}, s.prototype.progress = function(t, e, i) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount === this.images.length && this.complete(), this.options.debug && n && n.log(`progress: ${i}`, t, e)
	}, s.prototype.complete = function() {
		let t = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
			let t = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[t](this)
		}
	}, a.prototype = Object.create(e.prototype), a.prototype.check = function() {
		this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src)
	}, a.prototype.getIsImageComplete = function() {
		return this.img.complete && this.img.naturalWidth
	}, a.prototype.confirm = function(t, e) {
		this.isLoaded = t;
		let {
			parentNode: i
		} = this.img, n = "PICTURE" === i.nodeName ? i : this.img;
		this.emitEvent("progress", [this, n, e])
	}, a.prototype.handleEvent = function(t) {
		let e = "on" + t.type;
		this[e] && this[e](t)
	}, a.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, a.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, a.prototype.unbindEvents = function() {
		this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, h.prototype = Object.create(a.prototype), h.prototype.check = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, h.prototype.unbindEvents = function() {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, h.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
	}, s.makeJQueryPlugin = function(e) {
		(e = e || t.jQuery) && (i = e, i.fn.imagesLoaded = function(t, e) {
			return new s(this, t, e).jqDeferred.promise(i(this))
		})
	}, s.makeJQueryPlugin(), s
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, (function(t, e) {
	"use strict";
	var i = Array.prototype.slice,
		n = t.console,
		s = void 0 === n ? function() {} : function(t) {
			n.error(t)
		};

	function o(n, o, a) {
		(a = a || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function(t) {
			a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
		}), a.fn[n] = function(t) {
			var e;
			return "string" == typeof t ? function(t, e, i) {
				var o, r = "$()." + n + '("' + e + '")';
				return t.each((function(t, h) {
					var l = a.data(h, n);
					if (l) {
						var u = l[e];
						if (u && "_" != e.charAt(0)) {
							var c = u.apply(l, i);
							o = void 0 === o ? c : o
						} else s(r + " is not a valid method")
					} else s(n + " not initialized. Cannot call methods, i.e. " + r)
				})), void 0 !== o ? o : t
			}(this, t, i.call(arguments, 1)) : (e = t, this.each((function(t, i) {
				var s = a.data(i, n);
				s ? (s.option(e), s._init()) : (s = new o(i, e), a.data(i, n, s))
			})), this)
		}, r(a))
	}

	function r(t) {
		!t || t && t.bridget || (t.bridget = o)
	}
	return r(e || t.jQuery), o
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, (function() {
	function t() {}
	var e = t.prototype;
	return e.on = function(t, e) {
		if (t && e) {
			var i = this._events = this._events || {},
				n = i[t] = i[t] || [];
			return -1 == n.indexOf(e) && n.push(e), this
		}
	}, e.once = function(t, e) {
		if (t && e) {
			this.on(t, e);
			var i = this._onceEvents = this._onceEvents || {};
			return (i[t] = i[t] || {})[e] = !0, this
		}
	}, e.off = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = i.indexOf(e);
			return -1 != n && i.splice(n, 1), this
		}
	}, e.emitEvent = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			i = i.slice(0), e = e || [];
			for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
				var o = i[s];
				n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e)
			}
			return this
		}
	}, e.allOff = function() {
		delete this._events, delete this._onceEvents
	}, t
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, (function() {
	"use strict";

	function t(t) {
		var e = parseFloat(t);
		return -1 == t.indexOf("%") && !isNaN(e) && e
	}
	var e = "undefined" == typeof console ? function() {} : function(t) {
			console.error(t)
		},
		i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
		n = i.length;

	function s(t) {
		var i = getComputedStyle(t);
		return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), i
	}
	var o, r = !1;

	function a(e) {
		if (function() {
				if (!r) {
					r = !0;
					var e = document.createElement("div");
					e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
					var i = document.body || document.documentElement;
					i.appendChild(e);
					var n = s(e);
					o = 200 == Math.round(t(n.width)), a.isBoxSizeOuter = o, i.removeChild(e)
				}
			}(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
			var h = s(e);
			if ("none" == h.display) return function() {
				for (var t = {
						width: 0,
						height: 0,
						innerWidth: 0,
						innerHeight: 0,
						outerWidth: 0,
						outerHeight: 0
					}, e = 0; e < n; e++) t[i[e]] = 0;
				return t
			}();
			var l = {};
			l.width = e.offsetWidth, l.height = e.offsetHeight;
			for (var u = l.isBorderBox = "border-box" == h.boxSizing, c = 0; c < n; c++) {
				var d = i[c],
					f = h[d],
					p = parseFloat(f);
				l[d] = isNaN(p) ? 0 : p
			}
			var m = l.paddingLeft + l.paddingRight,
				g = l.paddingTop + l.paddingBottom,
				y = l.marginLeft + l.marginRight,
				v = l.marginTop + l.marginBottom,
				b = l.borderLeftWidth + l.borderRightWidth,
				_ = l.borderTopWidth + l.borderBottomWidth,
				x = u && o,
				E = t(h.width);
			!1 !== E && (l.width = E + (x ? 0 : m + b));
			var S = t(h.height);
			return !1 !== S && (l.height = S + (x ? 0 : g + _)), l.innerWidth = l.width - (m + b), l.innerHeight = l.height - (g + _), l.outerWidth = l.width + y, l.outerHeight = l.height + v, l
		}
	}
	return a
})),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, (function() {
	"use strict";
	var t = function() {
		var t = window.Element.prototype;
		if (t.matches) return "matches";
		if (t.matchesSelector) return "matchesSelector";
		for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
			var n = e[i] + "MatchesSelector";
			if (t[n]) return n
		}
	}();
	return function(e, i) {
		return e[t](i)
	}
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, (function(t, e) {
	var i = {
			extend: function(t, e) {
				for (var i in e) t[i] = e[i];
				return t
			},
			modulo: function(t, e) {
				return (t % e + e) % e
			}
		},
		n = Array.prototype.slice;
	i.makeArray = function(t) {
		return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
	}, i.removeFrom = function(t, e) {
		var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
	}, i.getParent = function(t, i) {
		for (; t.parentNode && t != document.body;)
			if (t = t.parentNode, e(t, i)) return t
	}, i.getQueryElement = function(t) {
		return "string" == typeof t ? document.querySelector(t) : t
	}, i.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, i.filterFindElements = function(t, n) {
		t = i.makeArray(t);
		var s = [];
		return t.forEach((function(t) {
			if (t instanceof HTMLElement)
				if (n) {
					e(t, n) && s.push(t);
					for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++) s.push(i[o])
				} else s.push(t)
		})), s
	}, i.debounceMethod = function(t, e, i) {
		i = i || 100;
		var n = t.prototype[e],
			s = e + "Timeout";
		t.prototype[e] = function() {
			var t = this[s];
			clearTimeout(t);
			var e = arguments,
				o = this;
			this[s] = setTimeout((function() {
				n.apply(o, e), delete o[s]
			}), i)
		}
	}, i.docReady = function(t) {
		var e = document.readyState;
		"complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
	}, i.toDashed = function(t) {
		return t.replace(/(.)([A-Z])/g, (function(t, e, i) {
			return e + "-" + i
		})).toLowerCase()
	};
	var s = t.console;
	return i.htmlInit = function(e, n) {
		i.docReady((function() {
			var o = i.toDashed(n),
				r = "data-" + o,
				a = document.querySelectorAll("[" + r + "]"),
				h = document.querySelectorAll(".js-" + o),
				l = i.makeArray(a).concat(i.makeArray(h)),
				u = r + "-options",
				c = t.jQuery;
			l.forEach((function(t) {
				var i, o = t.getAttribute(r) || t.getAttribute(u);
				try {
					i = o && JSON.parse(o)
				} catch (e) {
					return void(s && s.error("Error parsing " + r + " on " + t.className + ": " + e))
				}
				var a = new e(t, i);
				c && c.data(t, n, a)
			}))
		}))
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
}(window, (function(t, e) {
	function i(t, e) {
		this.element = t, this.parent = e, this.create()
	}
	var n = i.prototype;
	return n.create = function() {
		this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0, this.element.style[this.parent.originSide] = 0
	}, n.destroy = function() {
		this.unselect(), this.element.style.position = "";
		var t = this.parent.originSide;
		this.element.style[t] = "", this.element.style.transform = "", this.element.removeAttribute("aria-hidden")
	}, n.getSize = function() {
		this.size = e(this.element)
	}, n.setPosition = function(t) {
		this.x = t, this.updateTarget(), this.renderPosition(t)
	}, n.updateTarget = n.setDefaultTarget = function() {
		var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
		this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
	}, n.renderPosition = function(t) {
		var e = "left" === this.parent.originSide ? 1 : -1,
			i = this.parent.options.percentPosition ? t * e * (this.parent.size.innerWidth / this.size.width) : t * e;
		this.element.style.transform = "translateX(" + this.parent.getPositionValue(i) + ")"
	}, n.select = function() {
		this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden")
	}, n.unselect = function() {
		this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true")
	}, n.wrapShift = function(t) {
		this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
	}, n.remove = function() {
		this.element.parentNode.removeChild(this.element)
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e())
}(window, (function() {
	"use strict";

	function t(t) {
		this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
	}
	var e = t.prototype;
	return e.addCell = function(t) {
		if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
			this.x = t.x;
			var e = this.isOriginLeft ? "marginLeft" : "marginRight";
			this.firstMargin = t.size[e]
		}
	}, e.updateTarget = function() {
		var t = this.isOriginLeft ? "marginRight" : "marginLeft",
			e = this.getLastCell(),
			i = e ? e.size[t] : 0,
			n = this.outerWidth - (this.firstMargin + i);
		this.target = this.x + this.firstMargin + n * this.parent.cellAlign
	}, e.getLastCell = function() {
		return this.cells[this.cells.length - 1]
	}, e.select = function() {
		this.cells.forEach((function(t) {
			t.select()
		}))
	}, e.unselect = function() {
		this.cells.forEach((function(t) {
			t.unselect()
		}))
	}, e.getCellElements = function() {
		return this.cells.map((function(t) {
			return t.element
		}))
	}, t
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, (function(t, e) {
	var i = {
		startAnimation: function() {
			this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
		},
		animate: function() {
			this.applyDragForce(), this.applySelectedAttraction();
			var t = this.x;
			if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
				var e = this;
				requestAnimationFrame((function() {
					e.animate()
				}))
			}
		},
		positionSlider: function() {
			var t = this.x;
			this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent()
		},
		setTranslateX: function(t, e) {
			t += this.cursorPosition, t = this.options.rightToLeft ? -t : t;
			var i = this.getPositionValue(t);
			this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
		},
		dispatchScrollEvent: function() {
			var t = this.slides[0];
			if (t) {
				var e = -this.x - t.target,
					i = e / this.slidesWidth;
				this.dispatchEvent("scroll", null, [i, e])
			}
		},
		positionSliderAtSelected: function() {
			this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
		},
		getPositionValue: function(t) {
			return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
		},
		settle: function(t) {
			!this.isPointerDown && Math.round(100 * this.x) == Math.round(100 * t) && this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
		},
		shiftWrapCells: function(t) {
			var e = this.cursorPosition + t;
			this._shiftCells(this.beforeShiftCells, e, -1);
			var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
			this._shiftCells(this.afterShiftCells, i, 1)
		},
		_shiftCells: function(t, e, i) {
			for (var n = 0; n < t.length; n++) {
				var s = t[n],
					o = e > 0 ? i : 0;
				s.wrapShift(o), e -= s.size.outerWidth
			}
		},
		_unshiftCells: function(t) {
			if (t && t.length)
				for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
		},
		integratePhysics: function() {
			this.x += this.velocity, this.velocity *= this.getFrictionFactor()
		},
		applyForce: function(t) {
			this.velocity += t
		},
		getFrictionFactor: function() {
			return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
		},
		getRestingPosition: function() {
			return this.x + this.velocity / (1 - this.getFrictionFactor())
		},
		applyDragForce: function() {
			if (this.isDraggable && this.isPointerDown) {
				var t = this.dragX - this.x - this.velocity;
				this.applyForce(t)
			}
		},
		applySelectedAttraction: function() {
			if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
				var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
				this.applyForce(t)
			}
		}
	};
	return i
})),
function(t, e) {
	if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], (function(i, n, s, o, r, a) {
		return e(t, i, n, s, o, r, a)
	}));
	else if ("object" == typeof module && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
	else {
		var i = t.Flickity;
		t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
	}
}(window, (function(t, e, i, n, s, o, r) {
	var a = t.jQuery,
		h = t.getComputedStyle,
		l = t.console;

	function u(t, e) {
		for (t = n.makeArray(t); t.length;) e.appendChild(t.shift())
	}
	var c = 0,
		d = {};

	function f(t, e) {
		var i = n.getQueryElement(t);
		if (i) {
			if (this.element = i, this.element.flickityGUID) {
				var s = d[this.element.flickityGUID];
				return s && s.option(e), s
			}
			a && (this.$element = a(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), this._create()
		} else l && l.error("Bad element for Flickity: " + (i || t))
	}
	f.defaults = {
		accessibility: !0,
		cellAlign: "center",
		freeScrollFriction: .075,
		friction: .28,
		namespaceJQueryEvents: !0,
		percentPosition: !0,
		resize: !0,
		selectedAttraction: .025,
		setGallerySize: !0
	}, f.createMethods = [];
	var p = f.prototype;
	n.extend(p, e.prototype), p._create = function() {
		var e = this.guid = ++c;
		for (var i in this.element.flickityGUID = e, d[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this), this.options.on) {
			var n = this.options.on[i];
			this.on(i, n)
		}
		f.createMethods.forEach((function(t) {
			this[t]()
		}), this), this.options.watchCSS ? this.watchCSS() : this.activate()
	}, p.option = function(t) {
		n.extend(this.options, t)
	}, p.activate = function() {
		this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), u(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready"))
	}, p._createSlider = function() {
		var t = document.createElement("div");
		t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
	}, p._filterFindCellElements = function(t) {
		return n.filterFindElements(t, this.options.cellSelector)
	}, p.reloadCells = function() {
		this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
	}, p._makeCells = function(t) {
		return this._filterFindCellElements(t).map((function(t) {
			return new s(t, this)
		}), this)
	}, p.getLastCell = function() {
		return this.cells[this.cells.length - 1]
	}, p.getLastSlide = function() {
		return this.slides[this.slides.length - 1]
	}, p.positionCells = function() {
		this._sizeCells(this.cells), this._positionCells(0)
	}, p._positionCells = function(t) {
		t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0;
		var e = 0;
		if (t > 0) {
			var i = this.cells[t - 1];
			e = i.x + i.size.outerWidth
		}
		for (var n = this.cells.length, s = t; s < n; s++) {
			var o = this.cells[s];
			o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
		}
		this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
	}, p._sizeCells = function(t) {
		t.forEach((function(t) {
			t.getSize()
		}))
	}, p.updateSlides = function() {
		if (this.slides = [], this.cells.length) {
			var t = new o(this);
			this.slides.push(t);
			var e = "left" == this.originSide ? "marginRight" : "marginLeft",
				i = this._getCanCellFit();
			this.cells.forEach((function(n, s) {
				if (t.cells.length) {
					var r = t.outerWidth - t.firstMargin + (n.size.outerWidth - n.size[e]);
					i.call(this, s, r) || (t.updateTarget(), t = new o(this), this.slides.push(t)), t.addCell(n)
				} else t.addCell(n)
			}), this), t.updateTarget(), this.updateSelectedSlide()
		}
	}, p._getCanCellFit = function() {
		var t = this.options.groupCells;
		if (!t) return function() {
			return !1
		};
		if ("number" == typeof t) {
			var e = parseInt(t, 10);
			return function(t) {
				return t % e != 0
			}
		}
		var i = "string" == typeof t && t.match(/^(\d+)%$/),
			n = i ? parseInt(i[1], 10) / 100 : 1;
		return function(t, e) {
			return e <= (this.size.innerWidth + 1) * n
		}
	}, p._init = p.reposition = function() {
		this.positionCells(), this.positionSliderAtSelected()
	}, p.getSize = function() {
		this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
	};
	var m = {
		center: {
			left: .5,
			right: .5
		},
		left: {
			left: 0,
			right: 1
		},
		right: {
			right: 0,
			left: 1
		}
	};
	return p.setCellAlign = function() {
		var t = m[this.options.cellAlign];
		this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
	}, p.setGallerySize = function() {
		if (this.options.setGallerySize) {
			var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
			this.viewport.style.height = t + "px"
		}
	}, p._getWrapShiftCells = function() {
		if (this.options.wrapAround) {
			this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
			var t = this.cursorPosition,
				e = this.cells.length - 1;
			this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
		}
	}, p._getGapCells = function(t, e, i) {
		for (var n = []; t > 0;) {
			var s = this.cells[e];
			if (!s) break;
			n.push(s), e += i, t -= s.size.outerWidth
		}
		return n
	}, p._containSlides = function() {
		if (this.options.contain && !this.options.wrapAround && this.cells.length) {
			var t = this.options.rightToLeft,
				e = t ? "marginRight" : "marginLeft",
				i = t ? "marginLeft" : "marginRight",
				n = this.slideableWidth - this.getLastCell().size[i],
				s = n < this.size.innerWidth,
				o = this.cursorPosition + this.cells[0].size[e],
				r = n - this.size.innerWidth * (1 - this.cellAlign);
			this.slides.forEach((function(t) {
				s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r))
			}), this)
		}
	}, p.dispatchEvent = function(t, e, i) {
		var n = e ? [e].concat(i) : i;
		if (this.emitEvent(t, n), a && this.$element) {
			var s = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
			if (e) {
				var o = new a.Event(e);
				o.type = t, s = o
			}
			this.$element.trigger(s, i)
		}
	}, p.select = function(t, e, i) {
		if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t])) {
			var s = this.selectedIndex;
			this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != s && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect")
		}
	}, p._wrapSelect = function(t) {
		var e = this.slides.length;
		if (!(this.options.wrapAround && e > 1)) return t;
		var i = n.modulo(t, e),
			s = Math.abs(i - this.selectedIndex),
			o = Math.abs(i + e - this.selectedIndex),
			r = Math.abs(i - e - this.selectedIndex);
		!this.isDragSelect && o < s ? t += e : !this.isDragSelect && r < s && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
	}, p.previous = function(t, e) {
		this.select(this.selectedIndex - 1, t, e)
	}, p.next = function(t, e) {
		this.select(this.selectedIndex + 1, t, e)
	}, p.updateSelectedSlide = function() {
		var t = this.slides[this.selectedIndex];
		t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
	}, p.unselectSelectedSlide = function() {
		this.selectedSlide && this.selectedSlide.unselect()
	}, p.selectInitialIndex = function() {
		var t = this.options.initialIndex;
		if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);
		else {
			if (t && "string" == typeof t)
				if (this.queryCell(t)) return void this.selectCell(t, !1, !0);
			var e = 0;
			t && this.slides[t] && (e = t), this.select(e, !1, !0)
		}
	}, p.selectCell = function(t, e, i) {
		var n = this.queryCell(t);
		if (n) {
			var s = this.getCellSlideIndex(n);
			this.select(s, e, i)
		}
	}, p.getCellSlideIndex = function(t) {
		for (var e = 0; e < this.slides.length; e++) {
			if (-1 != this.slides[e].cells.indexOf(t)) return e
		}
	}, p.getCell = function(t) {
		for (var e = 0; e < this.cells.length; e++) {
			var i = this.cells[e];
			if (i.element == t) return i
		}
	}, p.getCells = function(t) {
		t = n.makeArray(t);
		var e = [];
		return t.forEach((function(t) {
			var i = this.getCell(t);
			i && e.push(i)
		}), this), e
	}, p.getCellElements = function() {
		return this.cells.map((function(t) {
			return t.element
		}))
	}, p.getParentCell = function(t) {
		var e = this.getCell(t);
		return e || (t = n.getParent(t, ".flickity-slider > *"), this.getCell(t))
	}, p.getAdjacentCellElements = function(t, e) {
		if (!t) return this.selectedSlide.getCellElements();
		e = void 0 === e ? this.selectedIndex : e;
		var i = this.slides.length;
		if (1 + 2 * t >= i) return this.getCellElements();
		for (var s = [], o = e - t; o <= e + t; o++) {
			var r = this.options.wrapAround ? n.modulo(o, i) : o,
				a = this.slides[r];
			a && (s = s.concat(a.getCellElements()))
		}
		return s
	}, p.queryCell = function(t) {
		if ("number" == typeof t) return this.cells[t];
		if ("string" == typeof t) {
			if (t.match(/^[#.]?[\d/]/)) return;
			t = this.element.querySelector(t)
		}
		return this.getCell(t)
	}, p.uiChange = function() {
		this.emitEvent("uiChange")
	}, p.childUIPointerDown = function(t) {
		"touchstart" != t.type && t.preventDefault(), this.focus()
	}, p.onresize = function() {
		this.watchCSS(), this.resize()
	}, n.debounceMethod(f, "onresize", 150), p.resize = function() {
		if (this.isActive && !this.isAnimating && !this.isDragging) {
			this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
			var t = this.selectedElements && this.selectedElements[0];
			this.selectCell(t, !1, !0)
		}
	}, p.watchCSS = function() {
		this.options.watchCSS && (-1 != h(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
	}, p.onkeydown = function(t) {
		var e = document.activeElement && document.activeElement != this.element;
		if (this.options.accessibility && !e) {
			var i = f.keyboardHandlers[t.keyCode];
			i && i.call(this)
		}
	}, f.keyboardHandlers = {
		37: function() {
			var t = this.options.rightToLeft ? "next" : "previous";
			this.uiChange(), this[t]()
		},
		39: function() {
			var t = this.options.rightToLeft ? "previous" : "next";
			this.uiChange(), this[t]()
		}
	}, p.focus = function() {
		var e = t.pageYOffset;
		this.element.focus({
			preventScroll: !0
		}), t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
	}, p.deactivate = function() {
		this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach((function(t) {
			t.destroy()
		})), this.element.removeChild(this.viewport), u(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
	}, p.destroy = function() {
		this.deactivate(), t.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), a && this.$element && a.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete d[this.guid]
	}, n.extend(p, r), f.data = function(t) {
		var e = (t = n.getQueryElement(t)) && t.flickityGUID;
		return e && d[e]
	}, n.htmlInit(f, "flickity"), a && a.bridget && a.bridget("flickity", f), f.setJQuery = function(t) {
		a = t
	}, f.Cell = s, f.Slide = o, f
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, (function(t, e) {
	function i() {}
	var n = i.prototype = Object.create(e.prototype);
	n.bindStartEvent = function(t) {
		this._bindStartEvent(t, !0)
	}, n.unbindStartEvent = function(t) {
		this._bindStartEvent(t, !1)
	}, n._bindStartEvent = function(e, i) {
		var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener",
			s = "mousedown";
		"ontouchstart" in t ? s = "touchstart" : t.PointerEvent && (s = "pointerdown"), e[n](s, this)
	}, n.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, n.getTouch = function(t) {
		for (var e = 0; e < t.length; e++) {
			var i = t[e];
			if (i.identifier == this.pointerIdentifier) return i
		}
	}, n.onmousedown = function(t) {
		var e = t.button;
		e && 0 !== e && 1 !== e || this._pointerDown(t, t)
	}, n.ontouchstart = function(t) {
		this._pointerDown(t, t.changedTouches[0])
	}, n.onpointerdown = function(t) {
		this._pointerDown(t, t)
	}, n._pointerDown = function(t, e) {
		t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
	}, n.pointerDown = function(t, e) {
		this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
	};
	var s = {
		mousedown: ["mousemove", "mouseup"],
		touchstart: ["touchmove", "touchend", "touchcancel"],
		pointerdown: ["pointermove", "pointerup", "pointercancel"]
	};
	return n._bindPostStartEvents = function(e) {
		if (e) {
			var i = s[e.type];
			i.forEach((function(e) {
				t.addEventListener(e, this)
			}), this), this._boundPointerEvents = i
		}
	}, n._unbindPostStartEvents = function() {
		this._boundPointerEvents && (this._boundPointerEvents.forEach((function(e) {
			t.removeEventListener(e, this)
		}), this), delete this._boundPointerEvents)
	}, n.onmousemove = function(t) {
		this._pointerMove(t, t)
	}, n.onpointermove = function(t) {
		t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
	}, n.ontouchmove = function(t) {
		var e = this.getTouch(t.changedTouches);
		e && this._pointerMove(t, e)
	}, n._pointerMove = function(t, e) {
		this.pointerMove(t, e)
	}, n.pointerMove = function(t, e) {
		this.emitEvent("pointerMove", [t, e])
	}, n.onmouseup = function(t) {
		this._pointerUp(t, t)
	}, n.onpointerup = function(t) {
		t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
	}, n.ontouchend = function(t) {
		var e = this.getTouch(t.changedTouches);
		e && this._pointerUp(t, e)
	}, n._pointerUp = function(t, e) {
		this._pointerDone(), this.pointerUp(t, e)
	}, n.pointerUp = function(t, e) {
		this.emitEvent("pointerUp", [t, e])
	}, n._pointerDone = function() {
		this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
	}, n._pointerReset = function() {
		this.isPointerDown = !1, delete this.pointerIdentifier
	}, n.pointerDone = function() {}, n.onpointercancel = function(t) {
		t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
	}, n.ontouchcancel = function(t) {
		var e = this.getTouch(t.changedTouches);
		e && this._pointerCancel(t, e)
	}, n._pointerCancel = function(t, e) {
		this._pointerDone(), this.pointerCancel(t, e)
	}, n.pointerCancel = function(t, e) {
		this.emitEvent("pointerCancel", [t, e])
	}, i.getPointerPoint = function(t) {
		return {
			x: t.pageX,
			y: t.pageY
		}
	}, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, (function(t, e) {
	function i() {}
	var n = i.prototype = Object.create(e.prototype);
	n.bindHandles = function() {
		this._bindHandles(!0)
	}, n.unbindHandles = function() {
		this._bindHandles(!1)
	}, n._bindHandles = function(e) {
		for (var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", s = 0; s < this.handles.length; s++) {
			var o = this.handles[s];
			this._bindStartEvent(o, e), o[i]("click", this), t.PointerEvent && (o.style.touchAction = n)
		}
	}, n._touchActionValue = "none", n.pointerDown = function(t, e) {
		this.okayPointerDown(t) && (this.pointerDownPointer = {
			pageX: e.pageX,
			pageY: e.pageY
		}, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]))
	};
	var s = {
			TEXTAREA: !0,
			INPUT: !0,
			SELECT: !0,
			OPTION: !0
		},
		o = {
			radio: !0,
			checkbox: !0,
			button: !0,
			submit: !0,
			image: !0,
			file: !0
		};
	return n.okayPointerDown = function(t) {
		var e = s[t.target.nodeName],
			i = o[t.target.type],
			n = !e || i;
		return n || this._pointerReset(), n
	}, n.pointerDownBlur = function() {
		var t = document.activeElement;
		t && t.blur && t != document.body && t.blur()
	}, n.pointerMove = function(t, e) {
		var i = this._dragPointerMove(t, e);
		this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
	}, n._dragPointerMove = function(t, e) {
		var i = {
			x: e.pageX - this.pointerDownPointer.pageX,
			y: e.pageY - this.pointerDownPointer.pageY
		};
		return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i
	}, n.hasDragStarted = function(t) {
		return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
	}, n.pointerUp = function(t, e) {
		this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
	}, n._dragPointerUp = function(t, e) {
		this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
	}, n._dragStart = function(t, e) {
		this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e)
	}, n.dragStart = function(t, e) {
		this.emitEvent("dragStart", [t, e])
	}, n._dragMove = function(t, e, i) {
		this.isDragging && this.dragMove(t, e, i)
	}, n.dragMove = function(t, e, i) {
		t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
	}, n._dragEnd = function(t, e) {
		this.isDragging = !1, setTimeout(function() {
			delete this.isPreventingClicks
		}.bind(this)), this.dragEnd(t, e)
	}, n.dragEnd = function(t, e) {
		this.emitEvent("dragEnd", [t, e])
	}, n.onclick = function(t) {
		this.isPreventingClicks && t.preventDefault()
	}, n._staticClick = function(t, e) {
		this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
			delete this.isIgnoringMouseUp
		}.bind(this), 400)))
	}, n.staticClick = function(t, e) {
		this.emitEvent("staticClick", [t, e])
	}, i.getPointerPoint = e.getPointerPoint, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], (function(i, n, s) {
		return e(t, i, n, s)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, (function(t, e, i, n) {
	n.extend(e.defaults, {
		draggable: ">1",
		dragThreshold: 3
	}), e.createMethods.push("_createDrag");
	var s = e.prototype;
	n.extend(s, i.prototype), s._touchActionValue = "pan-y", s._createDrag = function() {
		this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable)
	}, s.onActivateDrag = function() {
		this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
	}, s.onDeactivateDrag = function() {
		this.unbindHandles(), this.element.classList.remove("is-draggable")
	}, s.updateDraggable = function() {
		">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
	}, s.bindDrag = function() {
		this.options.draggable = !0, this.updateDraggable()
	}, s.unbindDrag = function() {
		this.options.draggable = !1, this.updateDraggable()
	}, s._uiChangeDrag = function() {
		delete this.isFreeScrolling
	}, s.pointerDown = function(e, i) {
		this.isDraggable ? this.okayPointerDown(e) && (this._pointerDownPreventDefault(e), this.pointerDownFocus(e), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = r(), t.addEventListener("scroll", this), this._pointerDownDefault(e, i)) : this._pointerDownDefault(e, i)
	}, s._pointerDownDefault = function(t, e) {
		this.pointerDownPointer = {
			pageX: e.pageX,
			pageY: e.pageY
		}, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e])
	};
	var o = {
		INPUT: !0,
		TEXTAREA: !0,
		SELECT: !0
	};

	function r() {
		return {
			x: t.pageXOffset,
			y: t.pageYOffset
		}
	}
	return s.pointerDownFocus = function(t) {
		o[t.target.nodeName] || this.focus()
	}, s._pointerDownPreventDefault = function(t) {
		var e = "touchstart" == t.type,
			i = "touch" == t.pointerType,
			n = o[t.target.nodeName];
		e || i || n || t.preventDefault()
	}, s.hasDragStarted = function(t) {
		return Math.abs(t.x) > this.options.dragThreshold
	}, s.pointerUp = function(t, e) {
		delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
	}, s.pointerDone = function() {
		t.removeEventListener("scroll", this), delete this.pointerDownScroll
	}, s.dragStart = function(e, i) {
		this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i]))
	}, s.pointerMove = function(t, e) {
		var i = this._dragPointerMove(t, e);
		this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
	}, s.dragMove = function(t, e, i) {
		if (this.isDraggable) {
			t.preventDefault(), this.previousDragX = this.dragX;
			var n = this.options.rightToLeft ? -1 : 1;
			this.options.wrapAround && (i.x %= this.slideableWidth);
			var s = this.dragStartPosition + i.x * n;
			if (!this.options.wrapAround && this.slides.length) {
				var o = Math.max(-this.slides[0].target, this.dragStartPosition);
				s = s > o ? .5 * (s + o) : s;
				var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
				s = s < r ? .5 * (s + r) : s
			}
			this.dragX = s, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
		}
	}, s.dragEnd = function(t, e) {
		if (this.isDraggable) {
			this.options.freeScroll && (this.isFreeScrolling = !0);
			var i = this.dragEndRestingSelect();
			if (this.options.freeScroll && !this.options.wrapAround) {
				var n = this.getRestingPosition();
				this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
			} else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
			delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
		}
	}, s.dragEndRestingSelect = function() {
		var t = this.getRestingPosition(),
			e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
			i = this._getClosestResting(t, e, 1),
			n = this._getClosestResting(t, e, -1);
		return i.distance < n.distance ? i.index : n.index
	}, s._getClosestResting = function(t, e, i) {
		for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function(t, e) {
				return t <= e
			} : function(t, e) {
				return t < e
			}; o(e, s) && (n += i, s = e, null !== (e = this.getSlideDistance(-t, n)));) e = Math.abs(e);
		return {
			distance: s,
			index: n - i
		}
	}, s.getSlideDistance = function(t, e) {
		var i = this.slides.length,
			s = this.options.wrapAround && i > 1,
			o = s ? n.modulo(e, i) : e,
			r = this.slides[o];
		if (!r) return null;
		var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
		return t - (r.target + a)
	}, s.dragEndBoostSelect = function() {
		if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
		var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
			e = this.previousDragX - this.dragX;
		return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
	}, s.staticClick = function(t, e) {
		var i = this.getParentCell(t.target),
			n = i && i.element,
			s = i && this.cells.indexOf(i);
		this.dispatchEvent("staticClick", t, [e, n, s])
	}, s.onscroll = function() {
		var t = r(),
			e = this.pointerDownScroll.x - t.x,
			i = this.pointerDownScroll.y - t.y;
		(Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
	}, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], (function(i, n, s) {
		return e(t, i, n, s)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils)
}(window, (function(t, e, i, n) {
	"use strict";
	var s = "http://www.w3.org/2000/svg";

	function o(t, e) {
		this.direction = t, this.parent = e, this._create()
	}
	o.prototype = Object.create(i.prototype), o.prototype._create = function() {
		this.isEnabled = !0, this.isPrevious = -1 == this.direction;
		var t = this.parent.options.rightToLeft ? 1 : -1;
		this.isLeft = this.direction == t;
		var e = this.element = document.createElement("button");
		e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
		var i = this.createSVG();
		e.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
	}, o.prototype.activate = function() {
		this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
	}, o.prototype.deactivate = function() {
		this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this)
	}, o.prototype.createSVG = function() {
		var t = document.createElementNS(s, "svg");
		t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");
		var e = document.createElementNS(s, "path"),
			i = function(t) {
				if ("string" == typeof t) return t;
				return "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
			}(this.parent.options.arrowShape);
		return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
	}, o.prototype.handleEvent = n.handleEvent, o.prototype.onclick = function() {
		if (this.isEnabled) {
			this.parent.uiChange();
			var t = this.isPrevious ? "previous" : "next";
			this.parent[t]()
		}
	}, o.prototype.enable = function() {
		this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
	}, o.prototype.disable = function() {
		this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
	}, o.prototype.update = function() {
		var t = this.parent.slides;
		if (this.parent.options.wrapAround && t.length > 1) this.enable();
		else {
			var e = t.length ? t.length - 1 : 0,
				i = this.isPrevious ? 0 : e;
			this[this.parent.selectedIndex == i ? "disable" : "enable"]()
		}
	}, o.prototype.destroy = function() {
		this.deactivate(), this.allOff()
	}, n.extend(e.defaults, {
		prevNextButtons: !0,
		arrowShape: {
			x0: 10,
			x1: 60,
			y1: 50,
			x2: 70,
			y2: 40,
			x3: 30
		}
	}), e.createMethods.push("_createPrevNextButtons");
	var r = e.prototype;
	return r._createPrevNextButtons = function() {
		this.options.prevNextButtons && (this.prevButton = new o(-1, this), this.nextButton = new o(1, this), this.on("activate", this.activatePrevNextButtons))
	}, r.activatePrevNextButtons = function() {
		this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
	}, r.deactivatePrevNextButtons = function() {
		this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
	}, e.PrevNextButton = o, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], (function(i, n, s) {
		return e(t, i, n, s)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils)
}(window, (function(t, e, i, n) {
	function s(t) {
		this.parent = t, this._create()
	}
	s.prototype = Object.create(i.prototype), s.prototype._create = function() {
		this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
	}, s.prototype.activate = function() {
		this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder)
	}, s.prototype.deactivate = function() {
		this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder)
	}, s.prototype.setDots = function() {
		var t = this.parent.slides.length - this.dots.length;
		t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
	}, s.prototype.addDots = function(t) {
		for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
			var r = document.createElement("li");
			r.className = "dot", r.setAttribute("aria-label", "Page dot " + (o + 1)), e.appendChild(r), i.push(r)
		}
		this.holder.appendChild(e), this.dots = this.dots.concat(i)
	}, s.prototype.removeDots = function(t) {
		this.dots.splice(this.dots.length - t, t).forEach((function(t) {
			this.holder.removeChild(t)
		}), this)
	}, s.prototype.updateSelected = function() {
		this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
	}, s.prototype.onTap = s.prototype.onClick = function(t) {
		var e = t.target;
		if ("LI" == e.nodeName) {
			this.parent.uiChange();
			var i = this.dots.indexOf(e);
			this.parent.select(i)
		}
	}, s.prototype.destroy = function() {
		this.deactivate(), this.allOff()
	}, e.PageDots = s, n.extend(e.defaults, {
		pageDots: !0
	}), e.createMethods.push("_createPageDots");
	var o = e.prototype;
	return o._createPageDots = function() {
		this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
	}, o.activatePageDots = function() {
		this.pageDots.activate()
	}, o.updateSelectedPageDots = function() {
		this.pageDots.updateSelected()
	}, o.updatePageDots = function() {
		this.pageDots.setDots()
	}, o.deactivatePageDots = function() {
		this.pageDots.deactivate()
	}, e.PageDots = s, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], (function(t, i, n) {
		return e(t, i, n)
	})) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, (function(t, e, i) {
	function n(t) {
		this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this)
	}
	n.prototype = Object.create(t.prototype), n.prototype.play = function() {
		"playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()))
	}, n.prototype.tick = function() {
		if ("playing" == this.state) {
			var t = this.parent.options.autoPlay;
			t = "number" == typeof t ? t : 3e3;
			var e = this;
			this.clear(), this.timeout = setTimeout((function() {
				e.parent.next(!0), e.tick()
			}), t)
		}
	}, n.prototype.stop = function() {
		this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange)
	}, n.prototype.clear = function() {
		clearTimeout(this.timeout)
	}, n.prototype.pause = function() {
		"playing" == this.state && (this.state = "paused", this.clear())
	}, n.prototype.unpause = function() {
		"paused" == this.state && this.play()
	}, n.prototype.visibilityChange = function() {
		this[document.hidden ? "pause" : "unpause"]()
	}, n.prototype.visibilityPlay = function() {
		this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay)
	}, e.extend(i.defaults, {
		pauseAutoPlayOnHover: !0
	}), i.createMethods.push("_createPlayer");
	var s = i.prototype;
	return s._createPlayer = function() {
		this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
	}, s.activatePlayer = function() {
		this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
	}, s.playPlayer = function() {
		this.player.play()
	}, s.stopPlayer = function() {
		this.player.stop()
	}, s.pausePlayer = function() {
		this.player.pause()
	}, s.unpausePlayer = function() {
		this.player.unpause()
	}, s.deactivatePlayer = function() {
		this.player.stop(), this.element.removeEventListener("mouseenter", this)
	}, s.onmouseenter = function() {
		this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
	}, s.onmouseleave = function() {
		this.player.unpause(), this.element.removeEventListener("mouseleave", this)
	}, i.Player = n, i
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], (function(i, n) {
		return e(t, i, n)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, (function(t, e, i) {
	var n = e.prototype;
	return n.insert = function(t, e) {
		var i = this._makeCells(t);
		if (i && i.length) {
			var n = this.cells.length;
			e = void 0 === e ? n : e;
			var s = function(t) {
					var e = document.createDocumentFragment();
					return t.forEach((function(t) {
						e.appendChild(t.element)
					})), e
				}(i),
				o = e == n;
			if (o) this.slider.appendChild(s);
			else {
				var r = this.cells[e].element;
				this.slider.insertBefore(s, r)
			}
			if (0 === e) this.cells = i.concat(this.cells);
			else if (o) this.cells = this.cells.concat(i);
			else {
				var a = this.cells.splice(e, n - e);
				this.cells = this.cells.concat(i).concat(a)
			}
			this._sizeCells(i), this.cellChange(e, !0)
		}
	}, n.append = function(t) {
		this.insert(t, this.cells.length)
	}, n.prepend = function(t) {
		this.insert(t, 0)
	}, n.remove = function(t) {
		var e = this.getCells(t);
		if (e && e.length) {
			var n = this.cells.length - 1;
			e.forEach((function(t) {
				t.remove();
				var e = this.cells.indexOf(t);
				n = Math.min(e, n), i.removeFrom(this.cells, t)
			}), this), this.cellChange(n, !0)
		}
	}, n.cellSizeChange = function(t) {
		var e = this.getCell(t);
		if (e) {
			e.getSize();
			var i = this.cells.indexOf(e);
			this.cellChange(i)
		}
	}, n.cellChange = function(t, e) {
		var i = this.selectedElement;
		this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
		var n = this.getCell(i);
		n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected()
	}, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], (function(i, n) {
		return e(t, i, n)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, (function(t, e, i) {
	"use strict";
	e.createMethods.push("_createLazyload");
	var n = e.prototype;

	function s(t, e) {
		this.img = t, this.flickity = e, this.load()
	}
	return n._createLazyload = function() {
		this.on("select", this.lazyLoad)
	}, n.lazyLoad = function() {
		var t = this.options.lazyLoad;
		if (t) {
			var e = "number" == typeof t ? t : 0,
				n = this.getAdjacentCellElements(e),
				o = [];
			n.forEach((function(t) {
				var e = function(t) {
					if ("IMG" == t.nodeName) {
						var e = t.getAttribute("data-flickity-lazyload"),
							n = t.getAttribute("data-flickity-lazyload-src"),
							s = t.getAttribute("data-flickity-lazyload-srcset");
						if (e || n || s) return [t]
					}
					var o = "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]",
						r = t.querySelectorAll(o);
					return i.makeArray(r)
				}(t);
				o = o.concat(e)
			})), o.forEach((function(t) {
				new s(t, this)
			}), this)
		}
	}, s.prototype.handleEvent = i.handleEvent, s.prototype.load = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this);
		var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
			e = this.img.getAttribute("data-flickity-lazyload-srcset");
		this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
	}, s.prototype.onload = function(t) {
		this.complete(t, "flickity-lazyloaded")
	}, s.prototype.onerror = function(t) {
		this.complete(t, "flickity-lazyerror")
	}, s.prototype.complete = function(t, e) {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
		var i = this.flickity.getParentCell(this.img),
			n = i && i.element;
		this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
	}, e.LazyLoader = s, e
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, (function(t) {
	return t
})),
function(t, e) {
	"function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, (function(t, e) {
	t.createMethods.push("_createAsNavFor");
	var i = t.prototype;
	return i._createAsNavFor = function() {
		this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
		var t = this.options.asNavFor;
		if (t) {
			var e = this;
			setTimeout((function() {
				e.setNavCompanion(t)
			}))
		}
	}, i.setNavCompanion = function(i) {
		i = e.getQueryElement(i);
		var n = t.data(i);
		if (n && n != this) {
			this.navCompanion = n;
			var s = this;
			this.onNavCompanionSelect = function() {
				s.navCompanionSelect()
			}, n.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
		}
	}, i.navCompanionSelect = function(t) {
		var e = this.navCompanion && this.navCompanion.selectedCells;
		if (e) {
			var i, n, s, o = e[0],
				r = this.navCompanion.cells.indexOf(o),
				a = r + e.length - 1,
				h = Math.floor((i = r, n = a, s = this.navCompanion.cellAlign, (n - i) * s + i));
			if (this.selectCell(h, !1, t), this.removeNavSelectedElements(), !(h >= this.cells.length)) {
				var l = this.cells.slice(r, a + 1);
				this.navSelectedElements = l.map((function(t) {
					return t.element
				})), this.changeNavSelectedClass("add")
			}
		}
	}, i.changeNavSelectedClass = function(t) {
		this.navSelectedElements.forEach((function(e) {
			e.classList[t]("is-nav-selected")
		}))
	}, i.activateAsNavFor = function() {
		this.navCompanionSelect(!0)
	}, i.removeNavSelectedElements = function() {
		this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
	}, i.onNavStaticClick = function(t, e, i, n) {
		"number" == typeof n && this.navCompanion.selectCell(n)
	}, i.deactivateAsNavFor = function() {
		this.removeNavSelectedElements()
	}, i.destroyAsNavFor = function() {
		this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
	}, t
})),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], (function(i) {
		return e(t, i)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, (function(t, e) {
	var i = t.jQuery,
		n = t.console;

	function s(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}
	var o = Array.prototype.slice;

	function r(t, e, a) {
		if (!(this instanceof r)) return new r(t, e, a);
		var h, l = t;
		("string" == typeof t && (l = document.querySelectorAll(t)), l) ? (this.elements = (h = l, Array.isArray(h) ? h : "object" == typeof h && "number" == typeof h.length ? o.call(h) : [h]), this.options = s({}, this.options), "function" == typeof e ? a = e : s(this.options, e), a && this.on("always", a), this.getImages(), i && (this.jqDeferred = new i.Deferred), setTimeout(this.check.bind(this))) : n.error("Bad element for imagesLoaded " + (l || t))
	}
	r.prototype = Object.create(e.prototype), r.prototype.options = {}, r.prototype.getImages = function() {
		this.images = [], this.elements.forEach(this.addElementImages, this)
	}, r.prototype.addElementImages = function(t) {
		"IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
		var e = t.nodeType;
		if (e && a[e]) {
			for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
				var s = i[n];
				this.addImage(s)
			}
			if ("string" == typeof this.options.background) {
				var o = t.querySelectorAll(this.options.background);
				for (n = 0; n < o.length; n++) {
					var r = o[n];
					this.addElementBackgroundImages(r)
				}
			}
		}
	};
	var a = {
		1: !0,
		9: !0,
		11: !0
	};

	function h(t) {
		this.img = t
	}

	function l(t, e) {
		this.url = t, this.element = e, this.img = new Image
	}
	return r.prototype.addElementBackgroundImages = function(t) {
		var e = getComputedStyle(t);
		if (e)
			for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
				var s = n && n[2];
				s && this.addBackground(s, t), n = i.exec(e.backgroundImage)
			}
	}, r.prototype.addImage = function(t) {
		var e = new h(t);
		this.images.push(e)
	}, r.prototype.addBackground = function(t, e) {
		var i = new l(t, e);
		this.images.push(i)
	}, r.prototype.check = function() {
		var t = this;

		function e(e, i, n) {
			setTimeout((function() {
				t.progress(e, i, n)
			}))
		}
		this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach((function(t) {
			t.once("progress", e), t.check()
		})) : this.complete()
	}, r.prototype.progress = function(t, e, i) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && n && n.log("progress: " + i, t, e)
	}, r.prototype.complete = function() {
		var t = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
			var e = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[e](this)
		}
	}, h.prototype = Object.create(e.prototype), h.prototype.check = function() {
		this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
	}, h.prototype.getIsImageComplete = function() {
		return this.img.complete && this.img.naturalWidth
	}, h.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
	}, h.prototype.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, h.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, h.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, h.prototype.unbindEvents = function() {
		this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, l.prototype = Object.create(h.prototype), l.prototype.check = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, l.prototype.unbindEvents = function() {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, l.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
	}, r.makeJQueryPlugin = function(e) {
		(e = e || t.jQuery) && ((i = e).fn.imagesLoaded = function(t, e) {
			return new r(this, t, e).jqDeferred.promise(i(this))
		})
	}, r.makeJQueryPlugin(), r
})),
function(t, e) {
	"function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], (function(i, n) {
		return e(t, i, n)
	})) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
}(window, (function(t, e, i) {
	"use strict";
	e.createMethods.push("_createImagesLoaded");
	var n = e.prototype;
	return n._createImagesLoaded = function() {
		this.on("activate", this.imagesLoaded)
	}, n.imagesLoaded = function() {
		if (this.options.imagesLoaded) {
			var t = this;
			i(this.slider).on("progress", (function(e, i) {
				var n = t.getParentCell(i.img);
				t.cellSizeChange(n && n.element), t.options.freeScroll || t.positionSliderAtSelected()
			}))
		}
	}, e
}))