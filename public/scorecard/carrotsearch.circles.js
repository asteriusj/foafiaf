/**
 * Carrot Search Circles HTML5 (demo variant)
 * v2.3.6, 903dbc847f249112dce68481ca74028db9bc68ee/903dbc84, build CIRCLES-SOFTWARE-DIST-57, Dec 16, 2016
 * 
 * Carrot Search confidential.
 * Copyright 2002-2016, Carrot Search s.c, All Rights Reserved.
 */
(function() {
    /*
     Includes Hammer.JS (1.0.3), http://eightmedia.github.com/hammer.js
     Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>, MIT license.
    */
    var aa = {
            stop_browser_behavior: {
                userSelect: "none",
                touchCallout: "none",
                touchAction: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        },
        ca = navigator.pointerEnabled || navigator.msPointerEnabled,
        da = {},
        ea = "move",
        p = "end",
        fa = !1;

    function ha(a) {
        return function() {
            if (1 <= arguments.length) {
                var c = arguments[0];
                if ("pageX" in c && !c.pageX && c.clientX) {
                    var b = c.target.ownerDocument || document,
                        e = b.documentElement,
                        b = b.body;
                    c.pageX_ || (c.pageX_ = c.clientX + (e && e.scrollLeft || b && b.scrollLeft || 0) - (e && e.clientLeft || b && b.clientLeft || 0));
                    c.pageY_ || (c.pageY_ = c.clientY + (e && e.scrollTop || b && b.scrollTop || 0) - (e && e.clientTop || b && b.clientTop || 0))
                }
            }
            a.apply(this, arguments)
        }
    }

    function u(a) {
        return "pageX_" in a ? a.pageX_ : a.pageX
    }

    function G(a) {
        return "pageY_" in a ? a.pageY_ : a.pageY
    }

    function ja() {
        if (!fa) {
            ka.Dd();
            for (var a in I) I.hasOwnProperty(a) && J.Ee(I[a]);
            ka.Db(document, ea, J.ib);
            ka.Db(document, p, J.Kd);
            fa = !0
        }
    }

    function la(a, c) {
        var b = this;
        ja();
        this.element = a;
        this.enabled = !0;
        this.options = K.extend(K.extend({}, aa), c || {});
        this.options.Qe && K.Pe(this.element, this.options.Qe);
        ka.Db(a, "start", function(a) {
            b.enabled && J.Oe(b, a)
        });
        return this
    }
    la.prototype = {
        ma: function(a, c) {
            for (var b = a.split(" "), e = 0; e < b.length; e++) this.element.addEventListener(b[e], ha(c), !1);
            return this
        }
    };

    function P(a, c, b) {
        var e = document.createEvent("Event");
        e.initEvent(c, !0, !0);
        e.gc = b;
        a.element.dispatchEvent(e)
    }
    var ma = null,
        na = !1,
        oa = !1,
        ka = function() {
            var a = {
                td: function(a, b, e) {
                    b = b.split(" ");
                    for (var d = 0; d < b.length; d++) a.addEventListener(b[d], ha(e), !1)
                },
                Db: function(c, b, e) {
                    a.td(c, da[b], function(d) {
                        var f = d.type.toLowerCase();
                        if (f.match(/mouseup/) && oa) oa = !1;
                        else {
                            if (f.match(/touch/) || f.match(/mouse/) && 1 === d.which || ca && f.match(/down/)) na = !0;
                            f.match(/touch|pointer/) && (oa = !0);
                            !na || oa && f.match(/mouse/) || (ca && b != p && pa.hd(b, d), b === p && null !== ma ? d = ma : ma = d, e.call(J, a.vd(c, b, d)), ca && b == p && pa.hd(b, d));
                            f.match(/up|cancel|end/) &&
                                (na = !1, ma = null, pa.reset())
                        }
                    })
                },
                Dd: function() {
                    var a;
                    a = ca ? ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"];
                    da.start = a[0];
                    da[ea] = a[1];
                    da[p] = a[2]
                },
                mb: function(a) {
                    return ca ? pa.mb() : a.touches ? a.touches : [{
                        identifier: 1,
                        pageX: u(a),
                        pageY: G(a),
                        target: a.target
                    }]
                },
                vd: function(c, b, e) {
                    c = a.mb(e, b);
                    var d = "touch";
                    if (e.type.match(/mouse/) || pa.ie("mouse", e)) d = "mouse";
                    return {
                        I: K.Rd(c),
                        timestamp: e.timestamp || (new Date).getTime(),
                        target: e.target,
                        touches: c,
                        aa: b,
                        pointerType: d,
                        Ne: e,
                        preventDefault: function() {
                            e.re && e.re();
                            e.preventDefault && e.preventDefault()
                        },
                        stopPropagation: function() {
                            e.stopPropagation()
                        },
                        Wa: function() {
                            return J.Wa()
                        }
                    }
                }
            };
            return a
        }(),
        pa = function() {
            var a = {
                Sa: {},
                mb: function() {
                    var c = a.Sa,
                        b = [];
                    null != c && Object.keys(c).sort().forEach(function(a) {
                        b.push(c[a])
                    });
                    return b
                },
                hd: function(c, b) {
                    c == p ? delete a.Sa[b.pointerId] : (b.identifier = b.pointerId, a.Sa[b.pointerId] = b)
                },
                ie: function(a,
                    b) {
                    if (!b.pointerType) return !1;
                    var e = {};
                    e.mouse = b.pointerType == b.MSPOINTER_TYPE_MOUSE || "mouse" == b.pointerType;
                    e.touch = b.pointerType == b.MSPOINTER_TYPE_TOUCH || "touch" == b.pointerType;
                    e.pen = b.pointerType == b.MSPOINTER_TYPE_PEN || "pen" == b.pointerType;
                    return e[a]
                },
                of: function() {
                    return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
                },
                reset: function() {
                    a.Sa = {}
                }
            };
            return a
        }(),
        K = function() {
            var a = {
                extend: function(a, b) {
                    for (var e in b) a[e] = b[e];
                    return a
                },
                Rd: function(a) {
                    for (var b = [], e = [], d = 0, f = a.length; d < f; d++) b.push(u(a[d])), e.push(G(a[d]));
                    return {
                        pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
                        pageY: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2
                    }
                },
                Vd: function(a, b, e) {
                    return {
                        x: Math.abs(b / a) || 0,
                        y: Math.abs(e / a) || 0
                    }
                },
                lb: function(a, b) {
                    return 180 * Math.atan2(G(b) - G(a), u(b) - u(a)) / Math.PI
                },
                Sd: function(a, b) {
                    return Math.abs(u(a) - u(b)) >= Math.abs(G(a) - G(b)) ? 0 < u(a) - u(b) ? "left" : "right" : 0 < G(a) - G(b) ? "up" : "down"
                },
                Ka: function(a, b) {
                    var e = u(b) - u(a),
                        d = G(b) -
                        G(a);
                    return Math.sqrt(e * e + d * d)
                },
                Ud: function(c, b) {
                    return 2 <= c.length && 2 <= b.length ? a.Ka(b[0], b[1]) / a.Ka(c[0], c[1]) : 1
                },
                Td: function(c, b) {
                    return 2 <= c.length && 2 <= b.length ? a.lb(b[1], b[0]) - a.lb(c[1], c[0]) : 0
                },
                sb: function(a) {
                    return "up" == a || "down" == a
                },
                Pe: function(a, b) {
                    var e, d = "webkit khtml moz ms o ".split(" ");
                    if (b && a.style) {
                        for (var f = 0; f < d.length; f++)
                            for (var l in b) b.hasOwnProperty(l) && (e = l, d[f] && (e = d[f] + e.substring(0, 1).toUpperCase() + e.substring(1)), a.style[e] = b[l]);
                        "none" == b.Bf && (a.onselectstart = function() {
                            return !1
                        })
                    }
                }
            };
            return a
        }(),
        J = function() {
            var a = {
                xa: [],
                i: null,
                Qc: null,
                Xa: !1,
                Oe: function(c, b) {
                    a.i || (a.Xa = !1, a.i = {
                        sc: c,
                        Mb: K.extend({}, b),
                        wb: !1,
                        name: ""
                    }, a.ib(b))
                },
                ib: function(c) {
                    if (a.i && !J.Xa) {
                        c = a.Nd(c);
                        for (var b = a.i.sc.options, e = 0, d = a.xa.length; e < d; e++) {
                            var f = a.xa[e];
                            if (!a.Xa && !1 !== b[f.name] && !1 === f.ca.call(f, c, a.i.sc)) {
                                a.Wa();
                                break
                            }
                        }
                        a.i && (a.i.wb = c)
                    }
                },
                Kd: function(c) {
                    a.ib(c);
                    a.Wa()
                },
                Wa: function() {
                    a.Qc = K.extend({}, a.i);
                    a.i = null;
                    a.Xa = !0
                },
                Nd: function(c) {
                    var b = a.i.Mb;
                    if (b && (c.touches.length != b.touches.length || c.touches ===
                            b.touches)) {
                        b.touches = [];
                        for (var e = 0, d = c.touches.length; e < d; e++) b.touches.push(K.extend({}, c.touches[e]))
                    }
                    var e = c.timestamp - b.timestamp,
                        d = u(c.I) - u(b.I),
                        f = G(c.I) - G(b.I),
                        l = K.Vd(e, d, f);
                    K.extend(c, {
                        zd: e,
                        Ad: d,
                        Bd: f,
                        velocityX: l.x,
                        velocityY: l.y,
                        jb: K.Ka(b.I, c.I),
                        Da: K.lb(b.I, c.I),
                        direction: K.Sd(b.I, c.I),
                        scale: K.Ud(b.touches, c.touches),
                        rotation: K.Td(b.touches, c.touches),
                        Mb: b
                    });
                    return c
                },
                Ee: function(c) {
                    var b = c.J || {};
                    "undefined" == typeof b[c.name] && (b[c.name] = !0);
                    K.extend(aa, b);
                    c.index = c.index || 1E3;
                    a.xa.push(c);
                    a.xa.sort(function(a, b) {
                        return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
                    });
                    return a.xa
                }
            };
            return a
        }(),
        I = I || {};
    I.df = function() {
        var a = {
            name: "hold",
            index: 10,
            J: {
                be: 500,
                ae: 1
            },
            Ya: null,
            ca: function(c, b) {
                switch (c.aa) {
                    case "start":
                        clearTimeout(a.Ya);
                        J.i.name = a.name;
                        a.Ya = setTimeout(function() {
                            J.i.name == a.name && P(b, a.name, c)
                        }, b.options.be);
                        break;
                    case ea:
                        c.jb > b.options.ae && clearTimeout(a.Ya);
                        break;
                    case p:
                        clearTimeout(a.Ya)
                }
            }
        };
        return a
    }();
    I.gf = {
        name: "tap",
        index: 100,
        J: {
            Se: 250,
            Re: 10,
            Ed: 20,
            Fd: 300
        },
        ca: function(a, c) {
            if (a.aa == p) {
                var b = J.Qc;
                a.zd > c.options.Se || a.jb > c.options.Re || (J.i.name = b && "tap" == b.name && a.timestamp - b.wb.timestamp < c.options.Fd && K.Ka(a.I, b.Mb.I) < c.options.Ed ? "doubletap" : "tap", P(c, J.i.name, a))
            }
        }
    };
    I.ff = function() {
        var a = {
            name: "swipe",
            index: 40,
            J: {
                Tc: 1,
                Uc: 0.7
            },
            ca: function(c, b) {
                c.aa != p || 0 < b.options.Tc && c.touches.length > b.options.Tc || !(c.velocityX > b.options.Uc || c.velocityY > b.options.Uc) || (P(b, a.name, c), P(b, a.name + c.direction, c))
            }
        };
        return a
    }();
    I.cf = function() {
        var a = {
            name: "drag",
            index: 50,
            J: {
                Jd: 10,
                ac: 1,
                Gd: !1,
                Hd: !1,
                Id: !1
            },
            A: !1,
            ca: function(c, b) {
                if (J.i.name != a.name && a.A) P(b, a.name + "end", c), a.A = !1;
                else if (!(0 < b.options.ac && c.touches.length > b.options.ac)) switch (c.aa) {
                    case "start":
                        a.A = !1;
                        break;
                    case ea:
                        if (c.jb < b.options.Jd && J.i.name != a.name) break;
                        J.i.name = a.name;
                        var e = J.i.wb.direction;
                        b.options.Id && e !== c.direction && (c.direction = K.sb(e) ? 0 > c.Bd ? "up" : "down" : 0 > c.Ad ? "left" : "right");
                        a.A || (P(b, a.name + "start", c), a.A = !0);
                        P(b, a.name, c);
                        P(b, a.name + c.direction,
                            c);
                        (b.options.Hd && K.sb(c.direction) || b.options.Gd && !K.sb(c.direction)) && c.preventDefault();
                        break;
                    case p:
                        a.A && P(b, a.name + "end", c), a.A = !1
                }
            }
        };
        return a
    }();
    I.jf = function() {
        var a = {
            name: "transform",
            index: 45,
            J: {
                gd: 0.01,
                fd: 1,
                Ye: !1
            },
            A: !1,
            ca: function(c, b) {
                if (J.i.name != a.name && a.A) P(b, a.name + "end", c), a.A = !1;
                else if (!(2 > c.touches.length)) switch (b.options.Ye && c.preventDefault(), c.aa) {
                    case "start":
                        a.A = !1;
                        break;
                    case ea:
                        var e = Math.abs(1 - c.scale),
                            d = Math.abs(c.rotation);
                        if (e < b.options.gd && d < b.options.fd) break;
                        J.i.name = a.name;
                        a.A || (P(b, a.name + "start", c), a.A = !0);
                        P(b, a.name, c);
                        d > b.options.fd && P(b, "rotate", c);
                        e > b.options.gd && (P(b, "pinch", c), P(b, "pinch" + (1 > c.scale ? "in" :
                            "out"), c));
                        break;
                    case p:
                        a.A && P(b, a.name + "end", c), a.A = !1
                }
            }
        };
        return a
    }();
    I.hf = function() {
        var a = {
            name: "touch",
            index: -Infinity,
            J: {
                Fb: !1
            },
            ca: function(c, b) {
                b.options.Fb && c.preventDefault();
                "start" == c.aa && P(b, a.name, c)
            }
        };
        return a
    }();
    I.ef = function() {
        var a = {
            name: "release",
            index: Infinity,
            ca: function(c, b) {
                c.aa == p && P(b, a.name, c)
            }
        };
        return a
    }();
    var Q = function() {
        var a = {},
            c = Array.prototype,
            b = Object.prototype,
            e = c.slice,
            d = c.concat,
            f = b.toString,
            l = b.hasOwnProperty,
            b = Object.keys,
            g = c.forEach,
            k = c.filter,
            m = c.map;
        a.isArray = Array.isArray || function(a) {
            return "[object Array]" == f.call(a)
        };
        a.uf = function(a) {
            return "[object Arguments]" == f.call(a)
        };
        a.X = function(a) {
            return "[object Function]" == f.call(a)
        };
        a.rb = function(a) {
            return "[object String]" == f.call(a)
        };
        a.Oa = function(a) {
            return "[object Number]" == f.call(a)
        };
        a.vf = function(a) {
            return "[object Date]" == f.call(a)
        };
        a.wf =
            function(a) {
                return "[object RegExp]" == f.call(a)
            };
        a.j = function(a) {
            return void 0 === a
        };
        a.da = function(a) {
            return a === Object(a)
        };
        a.lf = function(a, b, c) {
            c || (c = 1E-6);
            a -= b;
            return a < c && a > -c
        };
        a.N = function(b, c) {
            return a.da(b) ? c in b : !1
        };
        a.hasOwnProperty = function(a, b) {
            return l.call(a, b)
        };
        a.forEach = function(b, c, d) {
            if (null != b)
                if (g && b.forEach === g) b.forEach(c, d);
                else if (b.length === +b.length)
                for (var e = 0, f = b.length; e < f; e++) c.call(d, b[e], e, b);
            else
                for (e in b) a.hasOwnProperty(b, e) && c.call(d, b[e], e, b)
        };
        a.filter = function(b,
            c, d) {
            if (null == b) return [];
            if (k && b.filter === k) return b.filter(c, d);
            var e = [];
            a.forEach(b, function(a, b, f) {
                c.call(d, a, b, f) && e.push(a)
            });
            return e
        };
        a.map = function(b, c, d) {
            if (null == b) return [];
            if (m && b.map === m) return b.map(c, d);
            var e = [];
            a.forEach(b, function(a, b, f) {
                e.push(c.call(d, a, b, f))
            });
            return e
        };
        a.extend = function(a, b) {
            for (var c = 1, d = arguments.length; c < d; c++) {
                var e = arguments[c],
                    f;
                for (f in e) a[f] = e[f]
            }
            return a
        };
        a.keys = b || function(b) {
            if (!a.da(b)) throw new TypeError;
            var c = [],
                d;
            for (d in b) a.hasOwnProperty(b, d) &&
                c.push(d);
            return c
        };
        a.oe = function(a, b) {
            for (var f = {}, l = d.apply(c, e.call(arguments, 1)), g = 0, k = l.length; g < k; g++) {
                var m = l[g];
                m in a && (f[m] = a[m])
            }
            return f
        };
        a.ta = function(b) {
            return a.isArray(b) ? b.slice() : a.extend({}, b)
        };
        a.J = function(b, c) {
            a.forEach(e.call(arguments, 1), function(a) {
                for (var c in a) null == b[c] && (b[c] = a[c])
            });
            return b
        };
        a.contains = function(a, b) {
            return null == a ? !1 : -1 != a.indexOf(b)
        };
        a.Od = function(b) {
            for (var c = 0, d = arguments.length; c < d; c++)
                if (!a.j(arguments[c])) return arguments[c]
        };
        return a
    }();
    var qa = function() {
        var a = window.performance && (window.performance.now || window.performance.mozNow || window.performance.msNow || window.performance.oNow || window.performance.webkitNow);
        return function() {
            return a && a.call(window.performance) || (new Date).getTime()
        }
    }();
    var R, ra, sa, ta, ua;
    (function() {
        function a(a) {
            return function(b) {
                return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
            }
        }
        R = function(a) {
            return a
        };
        ra = function(a) {
            return function(b) {
                return Math.pow(b, a)
            }
        }(3);
        sa = function(a) {
            return function(b) {
                return 1 - Math.pow(1 - b, a)
            }
        }(3);
        ta = a(3);
        ua = a(2)
    })();

    function va() {
        function a(a) {
            if (!a.type) throw "Events must have a type.";
            for (var b = "on" + a.type.substr(0, 1).toUpperCase() + a.type.substring(1), f = c.slice(0), l = 0; l < f.length; l++) {
                var g = f[l][b];
                g && g.call(g, a);
                if (!0 === a.stopPropagation) break
            }
        }
        var c = [],
            b;
        this.addEventListener = function(a) {
            c.push(a)
        };
        this.removeEventListener = function(a) {
            for (var b = 0; b < c.length; b++) c[b] === a && c.splice(b, 1)
        };
        this.Lb = function(a) {
            b = a
        };
        this.F = function(b) {
            a(b);
            !0 !== b.stopPropagation && wa(this, function(a) {
                a.F && a.F(b)
            })
        };
        this.W = function(c) {
            a(c);
            b && b.W(c)
        };
        return this
    }

    function xa() {
        va.call(this);
        var a = this;
        a.addEventListener({
            onAddedToStage: function(c) {
                a.Aa = c.Aa;
                a.Lb(c.Aa)
            },
            onRemovedFromStage: function() {
                a.Aa = void 0;
                a.Lb(void 0)
            }
        });
        a.C = function() {
            a.W({
                type: "dirty",
                target: this
            })
        };
        return a
    }

    function ya() {
        va.call(this);
        this.vc = this.children = [];
        this.ge = {};
        this.Rb = function(a, c) {
            this.vc.push(c);
            this.ge[a] = c;
            c.Lb(this)
        }
    }

    function za(a, c) {
        function b() {
            e.F({
                type: "paint"
            })
        }
        va.call(this);
        this.children = [];
        this.name = c ? c : "unnamed";
        this.canvas = a;
        this.L = a.getContext("2d");
        var e = this,
            d = !1;
        this.addEventListener({
            onDirty: function() {
                d || (d = !0, Aa.Pc(b))
            },
            onPaint: function(b) {
                a = a || this.canvas;
                var c = a.getContext("2d");
                c.clearRect(0, 0, a.width, a.height);
                b.L = c;
                d = !1
            },
            onLayout: function(a) {
                var b = e.canvas;
                if (b.width != a.e || b.height != a.d) b.width = a.e, b.height = a.d
            }
        });
        this.ab = function(a) {
            for (var b = 0; b < arguments.length; b++) this.children.push(arguments[b]),
                arguments[b].F({
                    type: "addedToStage",
                    Aa: e
                })
        };
        this.Ib = function(a) {
            for (var b = 0; b < arguments.length; b++)
                for (var c = 0; c < this.children.length;) this.children[c] === arguments[b] ? (this.children.splice(c, 1), arguments[b].F({
                    type: "removedFromStage",
                    Aa: e
                })) : c++
        }
    };
    var Ba = new function() {
        this.pe = function(a, c) {
            for (var b = 0; b < a.length; b++) {
                var e = a[b],
                    d = a[b + 1] || a[0];
                if (0 > (c.y - e.y) * (d.x - e.x) - (c.x - e.x) * (d.y - e.y)) return !1
            }
            return !0
        };
        this.qe = function(a, c) {
            return a.x >= c.x && a.y >= c.y && a.x <= c.x + c.e && a.y <= c.y + c.d
        };
        this.Pd = function(a, c) {
            a.beginPath();
            var b = c[0];
            a.moveTo(b.x, b.y);
            for (var e = 1; e < c.length; e++) b = c[e], a.lineTo(b.x, b.y)
        };
        return this
    };
    var Ca = new function() {
        function a(a, b, f, l, g, k) {
            a.font = f + "px " + l;
            l = 0;
            for (var m = [], x = !0; !(0 == b.length || l + g > k.d);) {
                var s = c(a, b, k.e);
                s.x = 0;
                s.y = l;
                m.push(s);
                b = s.Vc;
                x = x && s.Ha;
                l += g
            }
            return {
                t: m,
                va: f,
                Pb: 0 < b.length,
                Ha: x
            }
        }

        function c(a, b, c) {
            b = b.trim();
            for (var l = 0, g = b.length + 1; 1 < g - l;) {
                var k = Math.floor((g + l) / 2),
                    m = a.measureText(b.substring(0, k)).width;
                if (m == c) {
                    l = k;
                    break
                }
                m < c ? l = k : g = k
            }
            c = !0;
            if (l < b.length) {
                for (g = l; 0 < g && " " != b.charAt(g);) g--;
                (c = 0 < g) && (l = g)
            }
            g = b.substring(0, l);
            return {
                text: g,
                width: a.measureText(g).width,
                Vc: b.substring(l).trim(),
                Ha: c
            }
        }
        this.fc = function(e, d, f, l, g, k, m, x, s) {
            if (Q.rb(d)) {
                m = Number(m);
                var n = String.fromCharCode(8230),
                    q = s ? s.Qa : void 0;
                if (!q) {
                    e.textBaseline = "top";
                    g = Math.floor(g);
                    k = Math.floor(k);
                    var y, t;
                    if (1 >= k - g)
                        for (y = k; y >= g; y--) {
                            if (t = a(e, d, y, l, y + m, f), !t.Pb && t.Ha) {
                                q = t;
                                break
                            }
                        } else
                            for (; 1 < k - g;) y = Math.floor((k + g) / 2), t = a(e, d, y, l, y + m, f), t.Pb || !t.Ha ? k = y : (g = y, q = t);
                    q || (q = t);
                    if (q) {
                        if (q.Pb && 0 < q.t.length)
                            for (e.font = q.va + "px " + l, t = q.t[q.t.length - 1], g = t.text; 0 < g.length;) {
                                for (d = g.length - 1; 0 < d && " " == g.charCodeAt(d);) d--;
                                g = g.substring(0,
                                    d);
                                d = c(e, g + n, f.e);
                                if (0 == d.Vc.length) {
                                    q.t.pop();
                                    d.x = 0;
                                    d.y = t.y;
                                    q.t.push(d);
                                    break
                                }
                            }
                        t = 0;
                        g = q.va + m;
                        for (n = 0; n < q.t.length; n++) d = q.t[n], t = Math.max(d.y + g, t);
                        d = (f.d - t) / 2;
                        for (n = 0; n < q.t.length; n++) q.t[n].y += d;
                        for (n = 0; n < q.t.length; n++) d = q.t[n], d.x = (f.e - d.width) / 2;
                        if (s) {
                            d = q.t;
                            if (0 < d.length)
                                for (m = q.Ub = {
                                        x: d[0].x,
                                        y: d[0].y,
                                        e: d[0].width,
                                        d: (q.va + m) * d.length
                                    }, n = 1; n < d.length; n++) m.x = Math.min(m.x, d[n].x), m.e = Math.max(m.e, d[n].width);
                            s.Qa = q
                        }
                    }
                }
                if (q)
                    for (e.font = q.va + "px " + l, e.fillStyle = x, n = 0; n < q.t.length; n++) d = q.t[n], e.fillText(d.text,
                        f.x + d.x, f.y + d.y + (b ? 0.1 : -0.1) * q.va)
            }
        };
        var b = /Firefox/.test(navigator.userAgent);
        return this
    };
    var Da = 2 * Math.PI,
        Ea = "SE",
        Fa = "SW",
        Ga = "NE",
        Ha = "NW";

    function S(a) {
        return a * Math.PI / 180
    }

    function Ia(a) {
        if (0 <= a && 360 > a) return a;
        a %= 360;
        return 0 > a ? a + 360 : a
    }

    function Ja(a) {
        if (0 <= a && a < Da) return a;
        a %= Da;
        return 0 > a ? Da + a : a
    }

    function Ka(a, c) {
        if (a == c) return 0;
        if (0 > a || a > Da) a = Ja(a);
        if (0 > c || c > Da) c = Ja(c);
        return a < c ? c - a : a > Math.PI ? Da - a + c : Da - c + a
    };
    var Aa = function() {
        function a() {
            if (!k) throw "Panic. onFrame called from unregistered state?";
            var a = qa();
            g = g.filter(function(a) {
                return null !== a
            });
            e.frames++;
            e.ve = g.length;
            e.Ac = Math.max(e.Ac, g.length);
            for (var b = 0; b < g.length; b++) {
                var s = g[b];
                null !== s && (s.Wb.call(s.L), Q.Oa(s.repeat) && (s.repeat -= 1, 0 >= s.repeat && (g[b] = null)))
            }
            a = qa() - a;
            e.totalTime += a;
            e.zc = Math.max(e.zc, a);
            d += a;
            for (e.wa.push(a); e.wa.length > f;) d -= e.wa.shift();
            e.Qd = e.wa.length / (d / 1E3);
            e.Xe = d / e.wa.length;
            g = g.filter(function(a) {
                return null !== a
            });
            k = !1;
            c()
        }

        function c() {
            0 < g.length && !k && (k = !0, l(a))
        }
        var b = {},
            e = b.Af = {
                frames: 0,
                totalTime: 0,
                Xe: 0,
                Qd: 0,
                ve: 0,
                Ac: 0,
                zc: 0,
                wa: []
            },
            d = 0,
            f = 100,
            l = function() {
                return /iPad|iPhone/.test(window.navigator.userAgent) ? function(a) {
                    window.setTimeout(a, 0)
                } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                    var b = 0;
                    window.setTimeout(function() {
                        var c = qa();
                        a();
                        b = qa() - c
                    }, 16 > b ? 16 - b : 0)
                }
            }(),
            g = [],
            k = !1;
        b.repeat =
            function(a, d, e) {
                b.cancel(a);
                g.push({
                    Wb: a,
                    L: e,
                    repeat: d
                });
                c()
            };
        b.Pc = function(a) {
            b.repeat(a, 1, void 0)
        };
        b.cancel = function(a) {
            for (var b = 0; b < g.length; b++) {
                var c = g[b];
                null !== c && c.Wb === a && (g[b] = null)
            }
        };
        return b
    }();
    var W = function() {
        function a(a, b, k) {
            var m = this,
                x;
            this.id = d++;
            this.name = k ? k : "{unnamed on " + a + "}";
            this.target = function() {
                return a
            };
            this.pb = function() {
                return -1 != f.indexOf(m)
            };
            this.start = function() {
                if (!m.pb()) {
                    if (-1 == f.indexOf(m)) {
                        var a = qa();
                        !0 === m.Hc(a) && (f = f.slice(), f.push(m))
                    }
                    0 < f.length && Aa.repeat(c)
                }
                return this
            };
            this.stop = function() {
                e(m);
                return this
            };
            this.Rc = function() {
                x = void 0
            };
            this.Hc = function(a) {
                if (0 !== b.length) {
                    var c;
                    Q.j(x) ? (x = 0, c = b[x], c.ia && c.ia.call(c, a, m)) : c = b[x];
                    for (; x < b.length;) {
                        if (c.la &&
                            c.la.call(c, a, m)) return !0;
                        c.od && c.od.call(c, a, m);
                        Q.j(x) && (x = -1);
                        ++x < b.length && (c = b[x], c.ia && c.ia.call(c, a, m))
                    }
                }
                return !1
            }
        }

        function c() {
            b();
            0 == f.length && Aa.cancel(c)
        }

        function b() {
            var a = qa();
            f.forEach(function(b) {
                !0 !== b.Hc(a) && e(b)
            })
        }

        function e(a) {
            f = f.filter(function(b) {
                return b !== a
            })
        }
        var d = 0,
            f = [];
        a.nd = function(a) {
            return Q.j(a) ? f.slice() : f.filter(function(b) {
                return b.target() === a
            })
        };
        a.H = function() {
            function b() {
                throw "No instances.";
            }

            function c(a) {
                var b = a.target,
                    d = a.duration,
                    e = a.O,
                    f, k;
                this.ia = function() {
                    f = {};
                    for (var c in a.k) c in b && (f[c] = {
                        start: Q.j(a.k[c].start) ? b[c] : Q.X(a.k[c].start) ? a.k[c].start.call(void 0) : a.k[c].start,
                        end: Q.j(a.k[c].end) ? b[c] : Q.X(a.k[c].end) ? a.k[c].end.call(void 0) : a.k[c].end,
                        f: Q.j(a.k[c].f) ? R : a.k[c].f
                    });
                    k = qa()
                };
                this.la = function() {
                    var a = qa() - k,
                        a = 0 === d ? 1 : Math.min(d, a) / d,
                        c;
                    for (c in f) {
                        var g = f[c];
                        b[c] = g.start + (g.end - g.start) * g.f(a)
                    }
                    e && e.call(b, a);
                    return 1 > a
                }
            }

            function d(a, b) {
                this.la = function() {
                    a.call(b);
                    return !1
                }
            }

            function e(a) {
                var b;
                this.ia = function(c) {
                    b = c + a
                };
                this.la = function(a) {
                    return a <
                        b
                }
            }

            function f(a) {
                if (!Array.isArray(a)) throw "An array of timelines required.";
                this.ia = function() {
                    a.forEach(function(a) {
                        a.start()
                    })
                };
                this.la = function() {
                    for (var b = 0; b < a.length; b++)
                        if (a[b].pb()) return !0;
                    return !1
                }
            }
            b.ma = function(b, l) {
                return new function() {
                    var q = [];
                    this.sa = function(a) {
                        q.push(a);
                        return this
                    };
                    this.kd = function(a) {
                        return this.sa(new e(a))
                    };
                    this.call = function(a, c) {
                        Q.j(c) && (c = b);
                        return this.sa(new d(a, c))
                    };
                    this.V = function(a) {
                        Q.j(a.target) && (a.target = b);
                        return this.sa(new c(a))
                    };
                    this.Eb = function(a) {
                        return this.sa(new f(a))
                    };
                    this.Rc = function() {
                        return this.sa({
                            la: function(a, b) {
                                b.Rc();
                                return !0
                            }
                        })
                    };
                    this.Ja = function() {
                        return new a(b, q, l)
                    };
                    this.start = function() {
                        return this.Ja().start()
                    }
                }
            };
            b.K = function(c, d) {
                a.nd(c).forEach(function(a) {
                    a.stop()
                });
                return b.ma(c, d)
            };
            return b
        }();
        return a
    }();
    var La = new function() {
        function a(a, b, e, d, f, l, g, k, m, x, s, n, q, y) {
            var t, M;
            a.save();
            a.beginPath();
            a.moveTo(e, d);
            a.lineTo(f, l);
            a.lineTo(g, k);
            a.clip();
            f -= e;
            l -= d;
            g -= e;
            k -= d;
            s -= m;
            n -= x;
            q -= m;
            y -= x;
            t = s * y - q * n;
            0 != t && (M = 1 / t, t = (y * f - n * g) * M, n = (y * l - n * k) * M, f = (s * g - q * f) * M, l = (s * k - q * l) * M, a.transform(t, n, f, l, e - t * m - f * x, d - n * m - l * x), a.drawImage(b, 0, 0));
            a.restore()
        }
        this.he = function(c, b, e, d, f, l, g, k, m, x, s, n, q, y, t, M, ga, N) {
            m = Math.ceil((k - g) / m);
            l = Math.ceil((f - d) / l);
            if (!(0 >= m || 0 >= l)) {
                var O = function(a, c) {
                        var r = (a - g) / (k - g),
                            ba = (c - d) / (f -
                                d);
                        M && (r = 1 - r);
                        ga || (ba = 1 - ba);
                        if (t) var Xa = r,
                            r = ba,
                            ba = Xa;
                        return {
                            x: b + c * Math.cos(a),
                            y: e + c * Math.sin(a),
                            oa: s + q * r,
                            pa: n + y * ba
                        }
                    },
                    Z = N && N.Wc;
                N = N.Te;
                for (var H = (k - g) / m, h = (f - d) / l, A = 0; A < l; A++)
                    for (var z = d + A * h, E = d + (A + 1) * h, w = N, L = N / E, D = 0; D < m; D++) {
                        var B = g + D * H,
                            T = g + (D + 1) * H,
                            C = O(B - L, z),
                            U = O(T, z),
                            F = O(T, E + w);
                        a(c, x, C.x, C.y, F.x, F.y, U.x, U.y, C.oa, C.pa, F.oa, F.pa, U.oa, U.pa);
                        0 !== N && (C = O(B - L, z - w), F = O(T + L, E + w));
                        B = O(B - L, E + w);
                        a(c, x, C.x, C.y, F.x, F.y, B.x, B.y, C.oa, C.pa, F.oa, F.pa, B.oa, B.pa);
                        Z && (c.strokeStyle = "rgba(0,0,0,0.1)", c.beginPath(), c.moveTo(C.x,
                            C.y), c.lineTo(B.x, B.y), c.lineTo(F.x, F.y), c.lineTo(U.x, U.y), c.closePath(), c.stroke())
                    }
            }
        };
        return this
    };

    function wa(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++) c(b[e], e)
    }

    function X(a, c) {
        Ma(a, c)
    }

    function Ma(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++) Ma(b[e], c), c(b[e], e)
    }

    function Na(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++) c(b[e], e), Na(b[e], c)
    }

    function Oa(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++)
                if (!1 === Oa(b[e], c)) return !1;
        return c(a)
    }

    function Pa(a, c) {
        c(a);
        Na(a, c)
    };
    var $ = new function() {
        this.kb = function(a, c, b) {
            var e;
            return Q.rb(a) && 0 < (e = a.indexOf("%")) ? c * Number(a.substring(0, e)) / 100 : Q.j(b) ? Number(a) : Number(a) * b
        };
        this.Dc = function(a, c) {
            return 0 > c ? 0 : c > a ? a : c
        };
        this.Je = function() {
            for (var a = "", c = 0; 31 > c; c++) a += String.fromCharCode("iuuq;..b`ssnurd`sbi/bnl.bhsbmdr".charCodeAt(c) ^ 1);
            return a
        };
        this.o = function(a) {
            var c;
            return (c = /rgba\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 5 == c.length ? {
                r: parseFloat(c[1]),
                g: parseFloat(c[2]),
                b: parseFloat(c[3]),
                a: parseFloat(c[4]),
                model: "rgba"
            } : (c = /hsla\(\s*([^,\s]+)\s*,\s*([^,%\s]+)%\s*,\s*([^,\s%]+)%\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 5 == c.length ? {
                h: parseFloat(c[1]),
                s: parseFloat(c[2]),
                l: parseFloat(c[3]),
                a: parseFloat(c[4]),
                model: "hsla"
            } : (c = /rgb\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 4 == c.length ? {
                r: parseFloat(c[1]),
                g: parseFloat(c[2]),
                b: parseFloat(c[3]),
                a: 1,
                model: "rgb"
            } : (c = /hsl\(\s*([^,\s]+)\s*,\s*([^,\s%]+)%\s*,\s*([^,\s%]+)%\s*\)/.exec(a)) && 4 == c.length ? {
                h: parseFloat(c[1]),
                s: parseFloat(c[2]),
                l: parseFloat(c[3]),
                a: 1,
                model: "hsl"
            } : (c = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a)) && 4 == c.length ? {
                r: parseInt(c[1], 16),
                g: parseInt(c[2], 16),
                b: parseInt(c[3], 16),
                a: 1,
                model: "rgb"
            } : (c = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a)) && 4 == c.length ? {
                r: 17 * parseInt(c[1], 16),
                g: 17 * parseInt(c[2], 16),
                b: 17 * parseInt(c[3], 16),
                a: 1,
                model: "rgb"
            } : {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
                model: "rgb"
            }
        };
        this.Vb = function(a) {
            function c(a, b, c) {
                0 > c && (c += 1);
                1 < c && (c -= 1);
                return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
            }
            if ("rgb" ==
                a.model || "rgba" == a.model) return Math.sqrt(a.r * a.r * 0.241 + a.g * a.g * 0.691 + a.b * a.b * 0.068) / 255;
            var b, e;
            b = a.l / 100;
            var d = a.s / 100;
            e = a.h / 360;
            if (0 == a.zf) b = a = e = b;
            else {
                var d = 0.5 > b ? b * (1 + d) : b + d - b * d,
                    f = 2 * b - d;
                b = c(f, d, e + 1 / 3);
                a = c(f, d, e);
                e = c(f, d, e - 1 / 3)
            }
            return Math.sqrt(65025 * b * b * 0.241 + 65025 * a * a * 0.691 + 65025 * e * e * 0.068) / 255
        };
        this.v = function(a) {
            if ("hsl" == a.model || "hsla" == a.model) return a;
            var c = a.r /= 255,
                b = a.g /= 255,
                e = a.b /= 255,
                d = Math.max(c, b, e),
                f = Math.min(c, b, e),
                l, g = (d + f) / 2;
            if (d == f) l = f = 0;
            else {
                var k = d - f,
                    f = 0.5 < g ? k / (2 - d - f) : k / (d +
                        f);
                switch (d) {
                    case c:
                        l = (b - e) / k + (b < e ? 6 : 0);
                        break;
                    case b:
                        l = (e - c) / k + 2;
                        break;
                    case e:
                        l = (c - b) / k + 4
                }
                l /= 6
            }
            a.h = 360 * l;
            a.s = 100 * f;
            a.l = 100 * g;
            "rgba" == a.model ? (a.a = a.a, a.model = "hsla") : a.model = "hsl";
            return a
        };
        this.ta = function(a) {
            var c = {},
                b;
            for (b in a) a.hasOwnProperty(b) && (c[b] = a[b]);
            return c
        };
        this.qc = function(a, c) {
            return a && "undefined" != typeof a[c]
        };
        this.hb = function(a, c, b) {
            return this.qc(a, c) ? a[c] : b
        };
        this.time = function(a) {
            var c = Date.now();
            a();
            return Date.now() - c
        };
        this.ed = function(a, c, b, e) {
            return "hsla(" + a.toFixed(2) +
                ", " + c.toFixed(2) + "%, " + b.toFixed(2) + "%, " + e.toFixed(2) + ")"
        };
        this.dd = function(a) {
            if ("hsla" == a.model) return this.ed(a.h, a.s, a.l, a.a);
            if ("hsl" == a.model) return this.ed(a.h, a.s, a.l, 1);
            if ("rgba" == a.model) return "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + a.a + ")";
            if ("rgb" == a.model) return "rgba(" + a.r + ", " + a.g + ", " + a.b + ", 1)";
            throw "Unknown color model: " + a.yf;
        }
    };

    function Qa() {
        function a(a) {
            if (!a) throw "Element in which to embed Circles not found.";
            /relative|absolute|fixed/.test(window.getComputedStyle(a, null).getPropertyValue("position")) || (a.style.position = "relative");
            var b = document.createElement("canvas");
            b.setAttribute("style", "position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%");
            a.innerHTML = "";
            a.appendChild(b);
            g() && window.console.log(k.fa + ": embedded.");
            return b
        }

        function c() {
            var a;
            if (0 != arguments.length) {
                1 == arguments.length ?
                    a = d({}, arguments[0]) : 2 == arguments.length && (a = {}, a[arguments[0]] = arguments[1]);
                var b = m.logging;
                f(a, "logging") && (m.logging = a.logging);
                g() && window.console.log(k.fa + ": setting options: ", a);
                e(a);
                m.logging = b;
                var c = 0,
                    y = {};
                l(a, function(a, b) {
                    m[a] != b && (y[a] = b, c++)
                });
                0 < c && (c = 0, l(y, function(a, b) {
                    m[a] = b;
                    c++
                }), k.ra.set(y));
                return c
            }
        }

        function b() {
            if (0 == arguments.length) {
                var a = {};
                Q.forEach(k.J, function(b, c) {
                    a[c] = k.ra.get(c, [])
                });
                return a
            }
            var b = arguments[0];
            return null == b ? k.J : k.ra.get(b, Array.prototype.slice.call(arguments,
                1))
        }

        function e(a) {
            var b = {};
            if (k.Sb) {
                var c = "undefined" != typeof window.console,
                    d = !1;
                l(k.Sb, function(b, e) {
                    l(e, function(e, g) {
                        f(a, e) && !f(a, g) && (a[g] = a[e], c && (d || (window.console.warn(k.fa + ": deprecated option names used"), d = !0), window.console.warn(k.fa + ': Use "' + g + '" instead of "' + e + '". The old option name will stop working in version ' + b + ".")), delete a[e])
                    })
                })
            }
            l(a, function(c) {
                f(k.J, c) || f(b, c) || (g() && window.console.warn(k.fa + ": Ignoring unknown option: ", c), delete a[c])
            });
            k.ra.jd && k.ra.jd(a)
        }

        function d(a) {
            for (var b =
                    arguments[0], c = arguments.length, d = 1; d < c; d++) {
                var e = arguments[d];
                null != e && l(e, function(a, c) {
                    b[a] = c
                })
            }
            return b
        }

        function f(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }

        function l(a, b) {
            var c, d = 0,
                e = a.length;
            if (void 0 === e)
                for (c in a) {
                    if (!1 === b.call(a[c], c, a[c])) break
                } else
                    for (; d < e && !1 !== b.call(a[d], d, a[d++]););
        }

        function g() {
            return m.logging && "undefined" != typeof window.console
        }
        var k, m, x;
        this.ob = function(f, l) {
            x = f;
            k = l;
            m = d({}, k.Le);
            g() && window.console.log(k.fa + ": initial embedding.");
            e(m);
            m = d({}, k.J,
                m);
            g() && window.console.log(k.fa + ": options parsed.");
            var q = x;
            q.get = b;
            q.set = c;
            return {
                options: m,
                bc: a
            }
        };
        this.qc = f
    };
    var Ra = new function() {
        this.ud = function(a) {
            function c(b, c) {
                a.lineTo(b, c)
            }

            function b(b, c, e, g, k, m) {
                a.bezierCurveTo(b, c, e, g, k, m)
            }

            function e(b, c) {
                a.moveTo(b, c)
            }
            a.beginPath();
            a.fillStyle = "rgba(195,119,62,1)";
            e(87.6, 170.1);
            b(73, 168.2, 59.8, 162.6, 47.2, 153.1);
            b(43.5, 150.3, 35.6, 142.4, 32.9, 138.7);
            b(24.8, 128, 19.6, 117, 16.9, 104.8);
            b(16, 100.7, 15.2, 94.1, 15.2, 90.3);
            c(15.2, 86.8);
            c(36, 86.8);
            c(36, 89.2);
            b(36, 97.1, 39.1, 109.3, 43, 116.4);
            b(50.4, 130.1, 61.9, 140.4, 76.2, 146.1);
            b(79.5, 147.4, 81.4, 147.5, 82.2, 146.3);
            b(82.5, 145.9,
                83.9, 142, 85.3, 137.7);
            b(86.7, 133.3, 88, 129.6, 88.2, 129.5);
            b(88.4, 129.2, 89.2, 129.3, 90.5, 129.6);
            b(91.7, 129.8, 94.1, 130.1, 96, 130.2);
            c(99.5, 130.4);
            c(99.7, 131.5);
            b(99.8, 132.1, 99.9, 141.1, 99.9, 151.6);
            c(99.9, 170.7);
            c(95.5, 170.7);
            b(93.1, 170.6, 89.5, 170.4, 87.6, 170.1);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(250,175,65,1)";
            e(77.4, 142.2);
            b(69.1, 139.2, 59.4, 132.3, 53.8, 125.3);
            b(48.2, 118.4, 45.3, 113.2, 42.9, 105.8);
            b(41, 99.9, 40.4, 97.1, 39.8, 91.5);
            b(39.2, 85.4, 40, 77.1, 41.8, 71.2);
            b(42.1, 70.2, 42.4, 69.8, 42.9, 69.7);
            b(43.3, 69.7, 48.9, 71.5, 55.4, 73.7);
            b(65.8, 77.2, 67.2, 77.7, 67.1, 78.4);
            b(67.1, 78.8, 66.8, 80.3, 66.5, 81.8);
            b(65.2, 87.9, 66.5, 95.9, 69.8, 102.1);
            b(72.8, 107.9, 78.9, 114, 84.4, 116.6);
            b(86.4, 117.6, 87, 118.1, 87, 118.6);
            b(87, 119.7, 86, 123.1, 82.5, 133.5);
            b(79.3, 143, 79.3, 142.9, 77.4, 142.2);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(235,57,75,1)";
            e(113, 143.8);
            b(112.7, 143.1, 111.8, 138.3, 111.2, 135);
            b(110.9, 133.3, 110.1, 129.2, 109.4, 125.9);
            b(108.2, 120.2, 108.2, 119.8, 108.7, 119.4);
            b(109.1, 119.1, 109.5, 118.9, 109.8, 118.9);
            b(110.7, 118.9, 115.5, 116.6, 118, 115.1);
            b(120.4, 113.5, 127.1, 107.2, 127.1, 106.4);
            b(127.1, 106.2, 127.5, 105.3, 128.1, 104.5);
            b(131.4, 99.5, 133.5, 90.8, 133, 84.3);
            b(132.8, 81.4, 132.1, 77.9, 131.2, 75.3);
            b(130.5, 73.5, 130.5, 73.2, 131.1, 73.2);
            b(131.5, 73.2, 136.9, 70.5, 141.9, 67.8);
            b(143.5, 67, 146, 65.7, 147.6, 64.9);
            b(149.2, 64.1, 151, 63.2, 151.7, 62.8);
            b(153.1, 62.1, 153.9, 62.4, 153.9, 63.6);
            b(153.9, 63.9, 154.2, 65, 154.6, 65.9);
            b(156.5, 70.3, 158.3, 78.5, 158.7, 84.3);
            b(159, 88.6, 158.4, 95, 157.4, 98.7);
            b(156.2, 103.2, 153.2, 111.9, 152, 114.1);
            b(149.7,
                118.6, 145.6, 124.2, 141.9, 128.1);
            b(136.5, 133.9, 125.9, 140.4, 118, 143);
            b(114.2, 144.2, 113.2, 144.4, 113, 143.8);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(199,62,62,1)";
            e(140, 156.9);
            b(136.2, 150.3, 131.6, 142.1, 131.8, 142);
            b(131.8, 141.9, 133, 141.2, 134.4, 140.3);
            b(138.1, 137.9, 141.8, 134.8, 145.7, 130.8);
            b(153.1, 123.1, 157, 116.3, 160.6, 104.7);
            b(162.3, 99.2, 162.8, 96.4, 163, 89.4);
            b(163.2, 82.2, 162.7, 76.8, 161.2, 70.9);
            b(159.8, 65.4, 157.1, 58.7, 156, 57.6);
            b(154.5, 56.3, 153.7, 56.5, 145.4, 60.7);
            b(141, 62.8, 137.3, 64.6, 137.3,
                64.6);
            b(137.2, 64.6, 136.6, 63.8, 135.9, 62.7);
            b(135.3, 61.7, 133.8, 59.8, 132.7, 58.5);
            b(131.6, 57.2, 130.6, 55.9, 130.6, 55.8);
            b(130.6, 55.3, 157.7, 27.7, 158.3, 27.5);
            b(158.8, 27.4, 162.4, 31.1, 165.3, 35);
            b(171.7, 43.4, 177.1, 53.9, 179.7, 63);
            b(182, 71.3, 182.8, 77.2, 182.8, 86.8);
            b(182.8, 101.5, 180.2, 112.5, 173.8, 125.1);
            b(167.2, 138, 157.9, 148.5, 145.6, 156.7);
            b(141.1, 159.7, 141.6, 159.6, 140, 156.9);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(64,195,64,1)";
            e(42.2, 57.4);
            b(32.6, 52.5, 24.6, 48.3, 24.5, 48);
            b(24, 47.3, 27.9, 40.9, 32.5,
                34.8);
            b(35.3, 31.1, 43.5, 22.9, 47.2, 20.1);
            b(57.9, 12, 68.9, 6.9, 81.5, 4.1);
            b(91.9, 1.8, 106.9, 1.9, 117.4, 4.2);
            b(121.5, 5.2, 125.3, 6.3, 125.7, 6.7);
            b(126, 7, 120.2, 25.8, 119.6, 26.5);
            b(119.4, 26.6, 117.8, 26.4, 116, 25.9);
            b(110.7, 24.5, 106, 23.9, 99.7, 23.9);
            b(90.9, 23.9, 85.1, 24.8, 77.6, 27.5);
            b(70.7, 29.9, 64, 33.8, 58.3, 38.8);
            b(55.8, 40.9, 55.4, 41.4, 55.3, 42.6);
            b(55.2, 43.9, 55.4, 44.1, 61.3, 50.3);
            b(64.7, 53.8, 67.4, 56.8, 67.4, 56.9);
            b(67.4, 57.1, 66.7, 58.1, 65.8, 59.2);
            b(64.9, 60.2, 63.4, 62.3, 62.5, 63.7);
            b(61.6, 65.2, 60.6, 66.4, 60.3, 66.4);
            b(60, 66.4,
                51.8, 62.3, 42.2, 57.4);
            e(68.4, 52.4);
            b(63.6, 47.5, 59.7, 43.2, 59.7, 42.9);
            b(59.7, 41.5, 69, 35.1, 74.5, 32.6);
            b(82.9, 28.9, 90.6, 27.3, 99.6, 27.3);
            b(106.3, 27.4, 112.1, 28.3, 118.3, 30.4);
            b(124.5, 32.5, 133.5, 37.3, 133.5, 38.4);
            b(133.5, 38.7, 131.8, 41.2, 129.7, 44);
            b(127.7, 46.8, 124.4, 51.3, 122.4, 54);
            b(120.4, 56.7, 118.5, 58.9, 118.3, 58.9);
            b(118, 58.9, 116.6, 58.3, 115.2, 57.5);
            b(111.4, 55.6, 110.8, 55.4, 107.4, 54.5);
            b(102.9, 53.4, 95.5, 53.4, 91.3, 54.6);
            b(87.6, 55.6, 82.5, 58, 79.9, 59.9);
            b(78.8, 60.7, 77.8, 61.4, 77.5, 61.4);
            b(77.3, 61.4, 73.2, 57.4, 68.4,
                52.4);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(188,63,63,1)";
            e(20.2, 226.5);
            b(15.3, 225.9, 11.3, 223.9, 8.1, 220.6);
            b(4.6, 217, 2.4, 212, 1.8, 206.3);
            b(0.7, 195, 6.4, 184.2, 15.5, 180.3);
            b(19.8, 178.4, 24.9, 178.2, 30.6, 179.7);
            b(33.3, 180.4, 35.4, 181.4, 37.2, 182.8);
            b(39.5, 184.7, 40.1, 186.6, 40.2, 191.6);
            c(40.2, 194.2);
            c(39.8, 194.2);
            b(39.3, 194.2, 39.3, 194.1, 39, 192.8);
            b(37, 185, 32.3, 181, 24.9, 181);
            b(16.8, 181, 11.3, 185.6, 9.2, 193.9);
            b(8.1, 198.3, 7.8, 204.4, 8.6, 208.7);
            b(10, 216.6, 14.3, 222.1, 20.4, 223.7);
            b(25.2, 225, 30.3, 224.2,
                34.2, 221.6);
            b(36.1, 220.4, 38.2, 218.2, 39.7, 216);
            b(40.1, 215.4, 40.6, 214.9, 40.6, 214.9);
            b(40.7, 214.9, 40.9, 215, 41.1, 215.2);
            b(41.6, 215.6, 41.5, 215.8, 40.1, 218);
            b(36.8, 223, 32.4, 225.7, 26.5, 226.4);
            b(25.3, 226.6, 21.1, 226.6, 20.2, 226.5);
            e(103.9, 225.8);
            b(95.7, 224.7, 91, 218.1, 91.4, 208.2);
            b(91.6, 202.2, 93.8, 197.6, 97.6, 195);
            b(98.7, 194.3, 100.6, 193.4, 102, 193);
            b(104.5, 192.4, 109.8, 192.5, 112.7, 193.2);
            b(116.7, 194.2, 117.8, 196.1, 117.7, 201.6);
            c(117.7, 203.5);
            c(117.3, 203.5);
            b(117, 203.5, 116.9, 203.4, 116.7, 202.2);
            b(116.2, 199.9, 115.5,
                198.5, 114, 197.1);
            b(112.5, 195.8, 110.7, 195, 108.2, 194.9);
            b(102.6, 194.5, 98.6, 198.6, 97.6, 205.8);
            b(97.1, 209.8, 97.5, 214.3, 98.8, 217.4);
            b(100.1, 220.5, 102.5, 222.7, 105.4, 223.4);
            b(106.8, 223.7, 109.9, 223.6, 111.3, 223.2);
            b(113.1, 222.6, 114.3, 221.9, 115.8, 220.4);
            b(116.5, 219.7, 117.2, 218.9, 117.4, 218.7);
            c(117.7, 218.2);
            c(118.2, 218.6);
            b(118.4, 218.7, 118.6, 219, 118.6, 219.1);
            b(118.6, 219.4, 116.7, 221.8, 115.8, 222.6);
            b(114.1, 224.1, 112.1, 225.1, 109.8, 225.6);
            b(108.4, 225.9, 105.3, 226, 103.9, 225.8);
            e(151.1, 225.8);
            b(143.8, 224.6, 139.4, 218.4,
                139.4, 209.2);
            b(139.4, 201.6, 142.7, 195.5, 147.9, 193.4);
            b(149.6, 192.8, 151.1, 192.6, 153.5, 192.6);
            b(160.3, 192.9, 164.3, 196.1, 165.7, 202.4);
            b(166.1, 204.1, 166.3, 206.9, 166.2, 208.6);
            c(166.1, 210);
            c(155.8, 210.1);
            c(145.6, 210.2);
            c(145.5, 211);
            b(145.4, 212.6, 146, 215.6, 146.7, 217.5);
            b(147.7, 219.9, 149.4, 221.9, 151.3, 222.8);
            b(152.9, 223.5, 153.7, 223.7, 155.7, 223.6);
            b(157.9, 223.5, 159.4, 223, 161, 222);
            b(162, 221.3, 163.8, 219.6, 164.4, 218.7);
            c(164.7, 218.2);
            c(165.2, 218.6);
            b(165.5, 218.7, 165.7, 219, 165.7, 219);
            b(165.7, 219.3, 164.5, 220.9,
                163.7, 221.8);
            b(162, 223.7, 159.8, 225, 157.4, 225.5);
            b(155.7, 225.9, 152.8, 226.1, 151.1, 225.8);
            e(160.4, 207.4);
            b(160.6, 206.8, 160.3, 203.5, 159.8, 201.7);
            b(159.1, 198.8, 157.7, 196.8, 155.8, 195.8);
            b(154.8, 195.4, 154.7, 195.3, 153.1, 195.3);
            b(151.6, 195.3, 151.4, 195.4, 150.6, 195.8);
            b(149.6, 196.3, 148.1, 197.8, 147.4, 199.1);
            b(146.7, 200.4, 146, 202.4, 145.7, 204.3);
            b(145.5, 205.8, 145.4, 207.5, 145.6, 207.6);
            b(145.6, 207.7, 148.9, 207.7, 152.9, 207.7);
            c(160.2, 207.7);
            c(160.4, 207.4);
            e(182, 225.9);
            b(177.9, 225.5, 175.6, 224.8, 174.1, 223.3);
            b(172.8,
                222.1, 172.4, 220.8, 172.4, 218);
            c(172.4, 216.3);
            c(172.8, 216.4);
            b(173.1, 216.4, 173.2, 216.5, 173.6, 217.8);
            b(174.4, 220.1, 175.6, 221.5, 177.6, 222.5);
            b(179.2, 223.3, 180.2, 223.5, 182.5, 223.6);
            b(186.6, 223.7, 189.2, 222.8, 190.4, 220.7);
            b(190.7, 220.1, 190.8, 219.8, 190.9, 218.8);
            b(190.9, 217.7, 190.9, 217.5, 190.5, 216.7);
            b(190, 215.5, 188.8, 214.3, 187.2, 213.4);
            b(186.6, 213.1, 184.6, 212.2, 182.7, 211.4);
            b(178.8, 209.7, 177.8, 209.3, 176.5, 208.4);
            b(174.4, 207, 172.9, 205.1, 172.5, 203.1);
            b(172.2, 201.9, 172.4, 199.4, 172.8, 198.3);
            b(174.2, 194.6, 178,
                192.6, 183.7, 192.6);
            b(189.6, 192.6, 193.5, 194, 194.7, 196.7);
            b(195.1, 197.6, 195.4, 199.5, 195.4, 201.2);
            c(195.4, 202.1);
            c(194.9, 202.1);
            b(194.4, 202.1, 194.4, 202.1, 194.2, 201.3);
            b(193.9, 199.9, 193, 198.4, 192, 197.4);
            b(190.3, 195.7, 188.2, 194.9, 185, 194.9);
            b(182, 194.9, 180.3, 195.5, 178.9, 197);
            b(176.9, 199.2, 177.5, 202.3, 180.4, 204.4);
            b(181.6, 205.2, 182.3, 205.6, 186.1, 207.1);
            b(189.9, 208.7, 190.7, 209.1, 192.3, 210.2);
            b(194.7, 211.8, 195.9, 213.6, 196.3, 216);
            b(196.8, 219.8, 195, 222.9, 191.5, 224.6);
            b(189.1, 225.7, 185.4, 226.2, 182, 225.9);
            e(50.9,
                211.9);
            b(50.9, 198.9, 50.9, 198.4, 50.6, 197.5);
            b(49.9, 195.3, 48.6, 194.3, 46.1, 194.1);
            c(44.7, 194);
            c(44.7, 193.2);
            c(48.8, 193.2);
            b(53.6, 193.3, 54.1, 193.4, 55.2, 194.4);
            b(56.6, 195.9, 56.8, 197.3, 56.7, 213.1);
            c(56.7, 225.2);
            c(53.8, 225.2);
            c(51, 225.3);
            c(50.9, 211.9);
            e(67.5, 211.8);
            c(67.5, 198.3);
            c(67.1, 197.3);
            b(66.5, 195.4, 65, 194.2, 63, 194.2);
            c(62.1, 194.2);
            c(62.1, 193.2);
            c(65.7, 193.2);
            b(68.8, 193.3, 69.4, 193.3, 70.2, 193.6);
            b(71.4, 194, 72.3, 194.7, 72.8, 195.6);
            b(73.2, 196.4, 73.6, 196.5, 74.1, 195.9);
            b(74.5, 195.2, 76.1, 194.1, 77.3, 193.6);
            b(79.8, 192.4, 83.4, 192.3, 85.5, 193.3);
            b(86.2, 193.7, 87.3, 194.9, 87.7, 195.7);
            b(87.9, 196, 88.1, 196.3, 88.1, 196.4);
            b(88.1, 196.5, 85.9, 198.1, 85.8, 198.1);
            b(85.7, 198.1, 85.4, 197.9, 85, 197.6);
            b(83.7, 196.7, 82.7, 196.4, 80.7, 196.3);
            b(79.3, 196.3, 78.7, 196.3, 78, 196.5);
            b(76.6, 197, 75.4, 197.6, 74.4, 198.7);
            c(73.4, 199.7);
            c(73.4, 225.2);
            c(67.6, 225.2);
            c(67.5, 211.8);
            e(125.6, 206.1);
            b(125.6, 193.8, 125.5, 186.6, 125.4, 185.8);
            b(125, 182.5, 123.7, 181.2, 120.7, 181.1);
            c(119.4, 181);
            c(119.4, 180.1);
            c(123.6, 180.2);
            b(127.7, 180.2, 127.9, 180.2, 128.7,
                180.6);
            b(130.4, 181.3, 131, 182.6, 131.2, 186.1);
            b(131.3, 187.5, 131.4, 194.8, 131.4, 206.7);
            c(131.3, 225.2);
            c(128.5, 225.2);
            c(125.6, 225.3);
            c(125.6, 206.1);
            e(52.1, 188.3);
            b(51.3, 188, 50.6, 187.2, 50.2, 186.4);
            b(49.9, 186, 49.8, 185.6, 49.8, 184.5);
            b(49.8, 183.3, 49.9, 183.1, 50.2, 182.6);
            b(51.3, 181.2, 53.7, 181.2, 55.1, 182.7);
            b(56.4, 184.1, 56.7, 186.6, 55.5, 187.8);
            b(54.7, 188.6, 53.2, 188.8, 52.1, 188.3);
            a.closePath();
            a.fill()
        }
    };
    Ra.$b = {
        width: 200,
        height: 230
    };

    function Sa(a, c) {
        function b(a, b, d) {
            return Q.X(a) ? c.c * Number(a.call(void 0, {
                width: h.e / c.c,
                height: h.d / c.c
            })) | 0 : $.kb(a, b, d) | 0
        }

        function e(a, b) {
            b && X(b, function(b) {
                if (!1 !== b.visible) {
                    var d = b.T,
                        e = b.U,
                        r = Math.max((e - d) * c.De / 2, c.le);
                    if (!(e - d <= 2 * r)) {
                        var d = d + r,
                            e = e - r,
                            r = z[b.id],
                            f = r.m,
                            g = r.G;
                        if (f > g) var V = f,
                            f = g,
                            g = V;
                        var k = (d + e) / 2,
                            r = Ka(f, g),
                            l = Math.max(r * c.Be / 2, c.je / k);
                        if (!(r <= 2 * l)) {
                            var f = f + l,
                                g = g - l,
                                r = Ka(f, g),
                                l = c.pd / e,
                                Y = c.we,
                                m = k * r,
                                n = e - d;
                            if (!(5 > m || 5 > n)) {
                                var q = !0;
                                m / n < c.Ce && (q = !1, V = n, n = m, m = V);
                                if (D.width < m + 5 || D.height < n +
                                    5) D.width = m + 5, D.height = n + 5;
                                e = D.getContext("2d");
                                e.clearRect(0, 0, m + 5, n + 5);
                                V = {
                                    x: 0,
                                    y: 0,
                                    e: m,
                                    d: n
                                };
                                d = {};
                                Ca.fc(e, b.Ia, V, c.ic, (void 0 !== c.Cc ? V.d * c.Cc / 100 + 0.5 | 0 : c.Ma) * c.c, (void 0 !== c.yc ? V.d * c.yc / 100 + 0.5 | 0 : c.La) * c.c, c.mc, b.uc, d);
                                if (d.Qa && d.Qa.Ub) {
                                    b = f + Ka(f, g) / 2;
                                    var f = Ja(b),
                                        f = f < Math.PI / 2 ? Ea : f < Math.PI ? Fa : f < 3 * Math.PI / 2 ? Ha : Ga,
                                        t = V = !1,
                                        x = !q;
                                    if (q) switch (f) {
                                        case Fa:
                                        case Ea:
                                            t = V = !0
                                    } else switch (f) {
                                        case Ga:
                                        case Ea:
                                            t = !0;
                                            break;
                                        case Ha:
                                        case Fa:
                                            V = !0
                                    }
                                    var s = d.Qa.Ub,
                                        f = (q ? s.d : s.e) / 2,
                                        d = k - f,
                                        e = k + f,
                                        k = (q ? s.e / m : s.d / n) / 2,
                                        f = b - r * k,
                                        g = b + r *
                                        k;
                                    Ka(f, g) / (2 * Math.PI) * 1E3 / (e / c.c) < c.me ? (a.save(), a.translate(h.p + (d + e) / 2 * Math.cos(b), h.q + (d + e) / 2 * Math.sin(b)), a.rotate(b + (q ? Math.PI / 2 : 0) + (V ? Math.PI : 0)), a.drawImage(D, s.x, s.y, s.e, s.d, s.e / -2, s.d / -2, s.e, s.d), c.Wc && (a.globalAlpha = 0.2, a.fillRect(s.e / -2, s.d / -2, s.e, s.d)), a.restore()) : La.he(a, h.p, h.q, d, e, Y, f, g, l, D, s.x, s.y, s.e, s.d, x, V, t, c)
                                }
                            }
                        }
                    }
                }
            })
        }

        function d() {
            a && (A = f(a, h.ua / 2), z = l(a, {
                m: h.Q,
                G: h.ga
            }))
        }

        function f(a, b) {
            var d = 0;
            X(a, function(a) {
                d = Math.max(a.ea + 1, d)
            });
            var e = [],
                v = c.Fe,
                f;
            f = 1 != v ? b * (1 - v) / (1 - Math.pow(v,
                d)) : b / d;
            e.push(f);
            for (var h = 0; h < d - 1; h++) f *= v, e.push(f);
            if (1 < v)
                for (h = 1, v = e.length - 1; h < v; h++, v--) f = e[h], e[h] = e[v], e[v] = f;
            for (h = 0; h < d - 1; h++) e[h + 1] += e[h];
            return e
        }

        function l(a, b, d) {
            d = d || {};
            d[a.id] = b;
            if (a.children) {
                var e = [];
                wa(a, function(a) {
                    e.push(a.M)
                });
                if (!a.za() && a.children.length > c.qa)
                    for (var v = 0, f = 0; v < e.length; v++) 0 != e[v] && f++, f > c.qa && (e[v] = 0);
                for (var f = 0, h = [], v = 0; v < e.length; v++) a.children[v].tb() ? h.push(v) : f += e[v];
                0 == f && (f = 1);
                if (0 < h.length)
                    for (f = f * c.ld / (1 - c.ld), v = 0; v < h.length; v++) e[h[v]] = f / h.length;
                a.children.length > c.qa && (v = b.G - b.m, f = Math.min(S(c.Md), Math.abs(v / 2)), 0 > v && (f = -f), b.ba = {
                    bb: a.children[a.children.length - 1]
                }, b = {
                    m: b.m,
                    G: b.G - (a.za() ? 0 : f)
                });
                for (v = f = 0; v < e.length; v++) f += e[v];
                for (var h = b.G - b.m, g = 0, v = 0; v < e.length; v++) {
                    var k = {
                            m: b.m + g / f * h,
                            G: b.m + (g + e[v]) / f * h
                        },
                        g = g + e[v];
                    l(a.children[v], k, d)
                }
            }
            return d
        }

        function g(a) {
            E !== a && (E = a, F.C(), h.W({
                type: "hoverChanged",
                u: a
            }))
        }

        function k(a) {
            a.call(function() {
                B = !1;
                C ? h.S() : T && T();
                C = !1;
                T = null
            });
            return a
        }

        function m(a, b) {
            a.lineWidth = c.Na * c.c;
            a.strokeStyle = c.nc;
            X(b, function(b) {
                var d = z[b.id];
                d.R = void 0;
                d.shape = void 0;
                if (!1 !== b.visible) {
                    var e = d.m,
                        r = d.G;
                    if (r != e) {
                        var f = b.ea,
                            g = b.T,
                            k = b.U;
                        h.rotation && (e += h.rotation * f, r += h.rotation * f);
                        var l = h.p,
                            m = h.q;
                        if (h.D) var Y = (e + r) / 2,
                            l = l + Math.cos(Y) * h.D * f,
                            m = m + Math.sin(Y) * h.D * f;
                        f = c.c;
                        d.shape = {
                            x: l / f,
                            y: m / f,
                            r_inner: g / f,
                            r_outer: k / f,
                            angle_from: e,
                            angle_to: r
                        };
                        d.R = function(a, b, c, d, e, Wa) {
                            return function(r) {
                                var f = r.y - b;
                                r = r.x - a;
                                var ba = Math.sqrt(r * r + f * f);
                                return ba >= c && ba <= d ? (f = Ja(Math.atan2(f, r) - e), r = Wa - e, 0 > r ? f >= Ja(r) : f <= r) : !1
                            }
                        }(l, m, g, k,
                            e, r);
                        a.fillStyle = b.Wd;
                        a.beginPath();
                        d = e <= r;
                        a.arc(l, m, g, e, r, !d);
                        a.arc(l, m, k, r, e, d);
                        a.closePath();
                        a.fill();
                        0 < c.Na && a.stroke();
                        if (b.tb()) {
                            a.save();
                            a.lineWidth = c.Na * c.c;
                            a.strokeStyle = c.af;
                            a.fillStyle = c.$e;
                            b = (k + g) / 2;
                            d = g + 0.25 * (k - g);
                            g += 0.75 * (k - g);
                            a.translate(l, m);
                            k = Ja(r - e);
                            1E-4 > k && (k = 2 * Math.PI);
                            l = 0.5 * (g - d) / b;
                            m = 0.2 * (g - d) / b;
                            k < 2 * (l + m) && (m = 0, l = k / 3);
                            k = l + m;
                            if (0 != k) {
                                a.beginPath();
                                f = e += (r - e) / 2;
                                e += m;
                                f -= m;
                                r = Math.floor(Math.abs(r - e + l) / k);
                                if (isFinite(r))
                                    for (; r--; e += k, f -= k) a.moveTo(d * Math.cos(e), d * Math.sin(e)), a.lineTo(g *
                                        Math.cos(e), g * Math.sin(e)), a.lineTo(b * Math.cos(e + l), b * Math.sin(e + l)), a.closePath(), a.moveTo(d * Math.cos(f), d * Math.sin(f)), a.lineTo(g * Math.cos(f), g * Math.sin(f)), a.lineTo(b * Math.cos(f - l), b * Math.sin(f - l)), a.closePath();
                                a.fill();
                                0 < c.Na && a.stroke()
                            }
                            a.restore()
                        }
                    }
                }
            })
        }

        function x(a, b) {
            a.lineWidth = c.ec * c.c;
            a.strokeStyle = c.dc;
            a.fillStyle = c.cc;
            Oa(b, function(b) {
                var d = z[b.id];
                if (d.ba && (d.ba.R = void 0, !(Ka(d.m, d.G) <= S(c.ke) || b.children && 0 == b.children.filter(function(a) {
                        return !0 === a.visible || void 0 === a.visible
                    }).length))) {
                    var e =
                        d.ba.bb,
                        r = b.ea + 1,
                        f = z[e.id].G;
                    h.rotation && (f += h.rotation * r);
                    var g = e.U,
                        e = (e.T + g) / 2,
                        k = h.p,
                        l = h.q;
                    h.D && (k += Math.cos(f) * h.D * r, l += Math.sin(f) * h.D * r);
                    var r = k + Math.cos(f) * e,
                        e = l + Math.sin(f) * e,
                        k = k + Math.cos(f) * g,
                        f = l + Math.sin(f) * g,
                        g = k - r,
                        l = f - e,
                        m = -l / 2,
                        Y = g / 2,
                        n = b.za();
                    d.G < d.m && (n = !n);
                    n && (m = -m, Y = -Y);
                    d = [n ? {
                        x: k,
                        y: f
                    } : {
                        x: r,
                        y: e
                    }, n ? {
                        x: r,
                        y: e
                    } : {
                        x: k,
                        y: f
                    }, {
                        x: r + m + g / 2,
                        y: e + Y + l / 2
                    }];
                    z[b.id].ba.R = function(a) {
                        return function(b) {
                            return Ba.pe(a, b)
                        }
                    }(d);
                    Ba.Pd(a, d);
                    a.closePath();
                    a.fill();
                    0 < c.ec && a.stroke()
                }
            })
        }

        function s(b) {
            var c;
            if (a) {
                Oa(a,
                    function(a) {
                        var d = z[a.id].ba;
                        if (d && d.R && d.R(b)) return c = {
                            type: "expander",
                            u: a
                        }, !1
                    });
                if (c) return c;
                Oa(a, function(a) {
                    var d = z[a.id];
                    if (d && d.R && d.R(b)) return c = {
                        type: "group",
                        u: a
                    }, !1
                });
                if (c) return c
            }
        }

        function n(a, b, c) {
            var d = z[b.id],
                e = d.m,
                d = d.G;
            if (d != e) {
                var f = b.ea,
                    g = b.T;
                b = b.U;
                h.rotation && (e += h.rotation * f, d += h.rotation * f);
                var k = h.p,
                    l = h.q;
                if (h.D) var m = (e + d) / 2,
                    k = k + Math.cos(m) * h.D * f,
                    l = l + Math.sin(m) * h.D * f;
                f = e <= d;
                a.beginPath();
                a.moveTo(k, l);
                a.arc(k, l, b, d, e, f);
                a.closePath();
                a.fill();
                0 < c.lineWidth && (a.beginPath(),
                    a.arc(k, l, g, e, d, !f), a.arc(k, l, b, d, e, f), a.closePath(), a.stroke())
            }
        }

        function q(b) {
            if (a) {
                var c = ua;
                return W.H.K(h, "implode").call(function() {
                    B = !0;
                    h.n = 0
                }).call(function() {
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a)
                }).V({
                    target: h,
                    duration: 1E3 * b,
                    O: function() {
                        h.C()
                    },
                    k: {
                        rotation: {
                            start: S(30),
                            end: 0,
                            f: c
                        },
                        D: {
                            start: 100,
                            end: 0,
                            f: c
                        },
                        opacity: {
                            start: 0,
                            end: 1,
                            f: R
                        },
                        n: {
                            end: 1,
                            f: R
                        }
                    }
                })
            }
            return W.H.K(h, "implode-dummy")
        }

        function y(b) {
            return a && 0 !== h.opacity ? W.H.K(h, "explode").call(function() {
                B = !0
            }).V({
                target: h,
                duration: 1E3 * b,
                O: h.C,
                k: {
                    rotation: {
                        end: S(30),
                        f: ua
                    },
                    D: {
                        end: 100,
                        f: ua
                    },
                    opacity: {
                        end: 0,
                        f: R
                    },
                    n: {
                        end: 0,
                        f: R
                    }
                }
            }) : W.H.K(h, "explode-dummy")
        }

        function t(b, e) {
            return a && 0 !== h.opacity ? W.H.K(h, "pullback").call(function() {
                B = !0
            }).V({
                target: h,
                duration: 1E3 * b,
                O: function() {
                    d();
                    h.C()
                },
                k: {
                    rotation: {
                        end: S(e),
                        f: ra
                    },
                    D: {
                        end: 0
                    },
                    opacity: {
                        end: 0,
                        f: R
                    },
                    n: {
                        end: 0,
                        f: R
                    },
                    Q: {
                        end: S(c.P)
                    },
                    ga: {
                        end: S(c.P),
                        f: ra
                    }
                }
            }) : W.H.K(h, "pullback-dummy")
        }

        function M(b, c) {
            var f = ra,
                g = W.H.K(h, "fade");
            g.call(function() {
                B = !0;
                0 < c && (h.n = 0, h.Y = 0, Z(w, h.e, h.d), e(w.getContext("2d"), a))
            });
            a && c !== h.opacity && g.V({
                target: h,
                duration: 1E3 * b,
                O: function() {
                    d();
                    h.C()
                },
                k: {
                    rotation: {
                        end: 0,
                        f: f
                    },
                    D: {
                        end: 0,
                        f: f
                    },
                    opacity: {
                        end: c,
                        f: f
                    },
                    n: {
                        end: c,
                        f: R
                    }
                }
            });
            return g
        }

        function ga(b, c, f) {
            if (a) {
                var g = sa;
                return W.H.K(h, "rollout").call(function() {
                    B = !0;
                    h.n = 0;
                    d();
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a)
                }).V({
                    target: h,
                    duration: 1E3 * b,
                    O: function() {
                        d();
                        h.C()
                    },
                    k: {
                        rotation: {
                            start: S(c),
                            end: 0,
                            f: g
                        },
                        D: {
                            start: f,
                            end: 0
                        },
                        opacity: {
                            start: 0,
                            end: 1,
                            f: R
                        },
                        Q: {
                            start: h.Q,
                            end: h.Q
                        },
                        ga: {
                            start: h.Q,
                            end: h.ga,
                            f: g
                        },
                        n: {
                            end: 1,
                            f: R
                        }
                    }
                })
            }
            return W.H.K(h, "rollout-dummy")
        }

        function N(a) {
            var b = s(a.$);
            b && "group" === b.type && h.W({
                type: "nodeDoubleClick",
                u: b.u,
                metaKey: a.metaKey,
                ctrlKey: a.ctrlKey,
                altKey: a.altKey,
                shiftKey: a.shiftKey
            })
        }

        function O(b) {
            function c(a) {
                for (var b in a) {
                    var d = a[b];
                    d.Da = d.G - d.m
                }
                return a
            }
            if (B) T = function() {
                O(b)
            };
            else {
                var d = c(z),
                    f = c(l(a, {
                        m: h.Q,
                        G: h.ga
                    }));
                if (0 < h.Y) {
                    Z(D, w.width, w.height);
                    var g = D.getContext("2d");
                    g.save();
                    g.globalAlpha = h.n;
                    g.drawImage(w, 0, 0);
                    g.globalAlpha = h.Y;
                    g.drawImage(L, 0, 0);
                    g.restore();
                    g = w.getContext("2d");
                    g.save();
                    g.globalCompositeOperation =
                        "copy";
                    g.drawImage(D, 0, 0);
                    g.restore()
                }
                var k = w;
                w = L;
                L = k;
                h.Gb = 0;
                h.Y = 1;
                h.n = 0;
                h.C();
                W.H.K(h).call(function() {
                    k = z;
                    z = f;
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a);
                    z = k
                }).V({
                    target: h,
                    duration: 1E3 * b,
                    O: function() {
                        var a = {},
                            b;
                        for (b in d) {
                            var c = d[b],
                                e = f[b],
                                r = c.m + (e.m - c.m) * h.Gb;
                            a[b] = {
                                m: r,
                                G: r + (c.Da + (e.Da - c.Da) * h.Gb),
                                ba: c.ba
                            }
                        }
                        z = a;
                        h.C()
                    },
                    k: {
                        Gb: {
                            end: 1,
                            f: ta
                        },
                        Y: {
                            end: 0,
                            f: R
                        },
                        n: {
                            end: 1,
                            f: R
                        }
                    }
                }).start()
            }
        }

        function Z(a, b, c) {
            if (a.width != b || a.height != c) a.width = b, a.height = c;
            a.getContext("2d").clearRect(0, 0, b, c)
        }

        function H(a, b) {
            a.lineWidth =
                0 < b.lineWidth ? b.lineWidth * c.c : 10;
            a.strokeStyle = b.strokeStyle;
            a.fillStyle = b.fillStyle;
            a.globalAlpha = b.globalAlpha
        }
        xa.call(this);
        this.children = [];
        var h = this,
            A, z, E, w = document.createElement("canvas"),
            L = document.createElement("canvas"),
            D;
        Sa && !Ta && (Ta = document.createElement("canvas"));
        D = Ta;
        var B = !1,
            T = null,
            C = !1;
        this.opacity = this.D = this.ua = this.q = this.p = this.d = this.e = this.y = this.x = this.ga = this.Q = this.rotation = this.Y = this.n = 0;
        this.Ie = {
            "default": function(a) {
                return k(q(a))
            },
            implode: function(a) {
                return k(q(a))
            },
            rollout: function(a) {
                return k(ga(a, 0, 100))
            },
            tumbler: function(a) {
                return k(ga(a, 720, 0))
            },
            fadein: function(a) {
                return k(M(a, 1))
            }
        };
        this.ue = {
            "default": function(a) {
                return y(a)
            },
            explode: function(a) {
                return y(a)
            },
            rollin: function(a) {
                return t(a, 0)
            },
            fadeout: function(a) {
                return M(a, 0)
            },
            tumbler: function(a) {
                return t(a, 720)
            }
        };
        var U = new function() {
                var b = this;
                xa.call(this);
                this.addEventListener({
                    onSelectionChanged: function() {
                        b.C()
                    },
                    onPaint: function(b) {
                        var d = {
                            lineWidth: c.$d,
                            fillStyle: c.oc,
                            strokeStyle: c.pc,
                            globalAlpha: h.opacity
                        };
                        H(b.L, d);
                        X(a, function(a) {
                            a.qb() && !1 !== a.visible && n(b.L, a, d)
                        })
                    }
                })
            },
            F = new function() {
                xa.call(this);
                this.addEventListener({
                    onPaint: function(a) {
                        if (E && !1 !== E.visible) {
                            var b = [];
                            if (c.Yd)
                                for (var d = E; 0 !== d.id; d = d.parent) b.push(d);
                            else b.push(E);
                            d = {
                                lineWidth: c.Zd,
                                fillStyle: c.jc,
                                strokeStyle: c.kc,
                                globalAlpha: h.opacity
                            };
                            H(a.L, d);
                            for (var e = b.length; 0 <= --e;) !1 !== b[e].visible && n(a.L, b[e], d)
                        }
                    }
                })
            },
            ia = new function() {
                xa.call(this);
                this.addEventListener({
                    onPaint: function(a) {
                        a = a.L;
                        a.save();
                        0 < h.n && (a.globalAlpha = h.n * h.opacity,
                            a.drawImage(w, 0, 0));
                        0 < h.Y && (a.globalAlpha = h.Y * h.opacity, a.drawImage(L, 0, 0));
                        a.restore()
                    }
                })
            };
        this.addEventListener({
            onPaint: function(b) {
                a && h.ne(b.L)
            },
            onLayout: function(b) {
                a && h.S(b)
            },
            onClick: function(b) {
                if (!B && a) {
                    var c = s(b.$);
                    c && ("expander" === c.type ? h.W({
                        type: "requestOpenStateChange",
                        Ca: {
                            nodes: [c.u],
                            open: !c.u.za()
                        }
                    }) : "group" === c.type && h.W({
                        type: "nodeClick",
                        u: c.u,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    }))
                }
            },
            onHold: function(b) {
                !B && a && N(b)
            },
            onDoubleClick: function(b) {
                !B &&
                    a && N(b)
            },
            onGroupOpenOrClose: function() {
                a && O(c.Ld)
            },
            onGroupZoom: function() {
                a && O(c.bf)
            },
            onMouseMove: function(b) {
                !a || E && z[E.id].R && z[E.id].R(b.$) || ((b = s(b.$)) && "group" === b.type ? g(b.u) : g(void 0))
            },
            onMouseOut: function() {
                a && g(void 0)
            }
        });
        this.S = function(b) {
            b && Q.extend(h, Q.oe(b, Q.keys(h)));
            if (B) C = !0;
            else if (this.rc(), a) {
                b && b.options && (c.c = b.options.c, c.ja = b.options.ja, c.ka = b.options.ka);
                Q.X(c.tc) && X(a, function(a) {
                    a.visible = !!c.tc.call(void 0, a.group)
                });
                d();
                X(a, function(a) {
                    a.T = A[a.ea - 1];
                    a.U = A[a.ea]
                });
                a.T =
                    0;
                a.U = A[0];
                if (Q.X(c.Sc)) {
                    var f = {
                            group: null,
                            maxRadius: h.ua / 2 / c.c,
                            centerx: h.p / c.c,
                            centery: h.q / c.c,
                            r_inner: void 0,
                            r_outer: void 0
                        },
                        g = c.Sc;
                    Pa(a, function(a) {
                        f.r_inner = a.T / c.c;
                        f.r_outer = a.U / c.c;
                        f.group = a.group;
                        g.call(void 0, f);
                        a.T = f.r_inner * c.c;
                        a.U = f.r_outer * c.c;
                        if (isNaN(a.T) || isNaN(a.U)) a.T = 0, a.U = 0
                    })
                }
                h.n = 0;
                h.Y = 0;
                W.H.K(h, "Label paint deferral").kd(1E3 * c.ja).call(function() {
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a)
                }).V({
                    target: h,
                    duration: 1E3 * c.ka,
                    O: h.C,
                    k: {
                        n: {
                            end: 1
                        }
                    }
                }).start()
            }
        };
        this.Hb = function() {
            return A.slice()
        };
        this.nb = function(a) {
            return z[a].shape
        };
        this.ne = function(b) {
            a && (0 !== h.opacity && (c.backgroundColor && (b.save(), b.globalAlpha = h.opacity, b.fillStyle = c.backgroundColor, b.fillRect(h.x, h.y, h.e, h.d), b.restore()), b.save(), b.globalAlpha = h.opacity, m(b, a), x(b, a), b.restore()), c.Cb && c.Cb())
        };
        this.rc = function() {
            this.Q = Ja(S(c.P));
            this.ga = this.Q + S(c.Ea);
            this.rotation = 0;
            this.p = b(c.p, h.e, c.c) | 0;
            this.q = b(c.q, h.d, c.c) | 0;
            this.ua = b(c.ua, Math.min(h.e, h.d), c.c) | 0
        };
        this.update = function() {
            O(c.Ze)
        };
        a && this.children.push(F, U,
            ia);
        this.rc();
        return this
    }
    var Ta;

    function Ua(a) {
        function c(a) {
            var b, c;

            function d() {
                var e = f.naturalWidth,
                    g = f.naturalHeight,
                    e = e / a.c,
                    g = g / a.c;
                if (Q.X(a.Tb)) {
                    var k = {
                        imageWidth: e,
                        imageHeight: g,
                        layout: {
                            x: h.x,
                            y: h.y,
                            w: h.e,
                            h: h.d
                        }
                    };
                    try {
                        a.Tb.call(void 0, k)
                    } catch (l) {}
                    var v = k.imageWidth;
                    Q.Oa(v) && (e = Math.max(30, v));
                    v = k.imageHeight;
                    Q.Oa(v) && (g = Math.max(30, v))
                }
                b = h.x + $.Dc(h.e - e, $.kb(a.rd, h.e - e));
                c = h.y + $.Dc(h.d - g, $.kb(a.sd, h.d - g));
                b = Math.round(a.c * b);
                c = Math.round(a.c * c);
                f.width = e * a.c;
                f.height = g * a.c
            }
            xa.call(this);
            var e = this,
                f, h;
            c = b = void 0;
            var g;
            this.opacity =
                0;
            this.addEventListener({
                onLayout: function(k) {
                    Q.extend(a, U);
                    var l = document.createElement("canvas"),
                        m = 0.3 * a.c;
                    l.width = Ra.$b.width * m;
                    l.height = Ra.$b.height * m;
                    var Y = l.getContext("2d");
                    Y.scale(m, m);
                    Ra.ud(Y);
                    a.ha = l.toDataURL("image/png");
                    c = b = void 0;
                    a.ha ? (h = {
                        x: k.x / a.c,
                        y: k.y / a.c,
                        e: k.e / a.c,
                        d: k.d / a.c
                    }, f && g === a.ha ? f.naturalWidth && d() : (g = a.ha, f = new Image, f.src = a.ha, f.onload = function() {
                        d();
                        e.C()
                    })) : f = void 0
                },
                onClick: function(d) {
                    if (0 < e.opacity && f && Ba.qe(d.$, {
                            x: b,
                            y: c,
                            e: f.width,
                            d: f.height
                        })) return Q.extend(a, U),
                        a.eb && (document.location.href = a.eb), !1
                },
                onPaint: function(a) {
                    f && void 0 !== b && (a = a.L, a.save(), a.globalAlpha = e.opacity, a.drawImage(f, b, c, f.width, f.height), a.restore())
                }
            })
        }

        function b(a, b) {
            function c(a) {
                a.Bc = Math.round((void 0 !== b.ad ? a.d * b.ad / 100 + 0.5 | 0 : b.$a) * b.c);
                a.xc = Math.round((void 0 !== b.$c ? a.d * b.$c / 100 + 0.5 | 0 : b.Za) * b.c)
            }
            xa.call(this);
            var d = this,
                e, f, h = !0,
                g, k = a.Ba("selected"),
                l, m = {
                    onHoverChanged: function(a) {
                        g = a.u ? a.u : void 0;
                        d.Qb()
                    },
                    onPostChangeSelection: function(a) {
                        k = a.selected;
                        d.Qb()
                    }
                };
            this.bb = function(a) {
                a.addEventListener(m)
            };
            this.Cd = function(a) {
                a.removeEventListener(m)
            };
            this.Qb = function() {
                var a = void 0;
                g && (a = g.Ia);
                var c = k.Ec;
                Q.j(a) && 0 < c.length && (a = "[" + c[0].Ia + (1 < c.length ? ", ...+" + (c.length - 1) + "]" : "]"));
                b.Nb ? (a = {
                    hoverGroup: g ? g.group : void 0,
                    selectedGroups: k.ya,
                    label: a
                }, b.Nb && b.Nb(a), l = a.label) : l = a;
                d.C()
            };
            this.addEventListener({
                onPostLayout: function(a) {
                    f = {
                        x: a.x,
                        y: a.y,
                        e: a.e,
                        d: a.d,
                        p: a.p,
                        q: a.q
                    };
                    switch (b.Yc) {
                        case "none":
                            e = void 0;
                            break;
                        case "top":
                        case "bottom":
                        case "topbottom":
                            e = Q.ta(f);
                            c(e);
                            e.d = e.xc + 2 * b.Ob * b.c;
                            break;
                        case "inscribed":
                            var h =
                                S(35),
                                g = a.Hb[0] * a.c;
                            a = Math.cos(h) * g;
                            h = Math.sin(h) * g;
                            e = {
                                x: f.p - a,
                                y: f.q - h,
                                e: 2 * a,
                                d: 2 * h
                            };
                            c(e)
                    }
                    d.Qb()
                },
                onMouseMove: function(a) {
                    h = a.$.y >= f.d / 2
                },
                onClick: function() {},
                onPaint: function(a) {
                    if (e && l) {
                        a = a.L;
                        a.save();
                        switch (b.Yc) {
                            case "topbottom":
                                e.y = h ? 0 : f.d - e.d;
                                break;
                            case "top":
                                e.y = 0;
                                break;
                            case "bottom":
                                e.y = f.d - e.d
                        }
                        0 != b.Ue.md && (a.fillStyle = b.Zc, a.fillRect(e.x, e.y, e.e, e.d));
                        if (0 != b.We.md) {
                            var c = Q.ta(e);
                            c.x += b.cd * b.c;
                            c.y += b.Ob * b.c;
                            c.e -= 2 * b.cd * b.c;
                            c.d -= 2 * b.Ob * b.c;
                            if (0 >= c.e || c.d <= e.Bc) e = void 0;
                            a.fillStyle = b.bd;
                            Ca.fc(a,
                                l, c, Q.Od(b.Ve, b.ic), e.Bc, e.xc, b.mc, b.uc, {})
                        }
                        a.restore()
                    }
                }
            })
        }

        function e(b, c) {
            return function(e) {
                if (h) {
                    if ("mousemove" === e.type) {
                        var d = void 0,
                            g;
                        Q.N(e, "movementX") ? (d = "movementX", g = "movementY") : Q.N(e, "mozMovementX") ? (d = "mozMovementX", g = "mozMovementY") : Q.N(e, "webkitMovementX") && (d = "webkitMovementX", g = "webkitMovementY");
                        if (void 0 !== d && 0 == e[d] && 0 == e[g]) return
                    }
                    d = e.pageX;
                    g = e.pageY;
                    if (!d && e.clientX) {
                        d = e.target.ownerDocument || document;
                        g = d.documentElement;
                        var k = d.body,
                            d = e.clientX + (g && g.scrollLeft || k && k.scrollLeft ||
                                0) - (g && g.clientLeft || k && k.clientLeft || 0);
                        g = e.clientY + (g && g.scrollTop || k && k.scrollTop || 0) - (g && g.clientTop || k && k.clientTop || 0)
                    }
                    e = f(e, {
                        type: b,
                        $: ga(d, g, c, a.c)
                    });
                    w.F(e);
                    return !1
                }
            }
        }

        function d(b, c) {
            return function(e) {
                if (h) {
                    var d = e.gc.touches[0];
                    e = f(e.gc.Ne, {
                        type: b,
                        $: ga("pageX_" in d ? d.pageX_ : d.pageX, "pageY_" in d ? d.pageY_ : d.pageY, c, a.c)
                    });
                    w.F(e);
                    return !1
                }
            }
        }

        function f(a, b) {
            Q.N(a, "altKey") && (b.altKey = a.altKey);
            Q.N(a, "ctrlKey") && (b.ctrlKey = a.ctrlKey);
            Q.N(a, "metaKey") && (b.metaKey = a.metaKey);
            Q.N(a, "shiftKey") &&
                (b.shiftKey = a.shiftKey);
            return b
        }

        function l(b) {
            if (a.lc) {
                var c = {
                    labelText: null
                };
                X(b, function(b) {
                    c.labelText = b.group.label;
        //
        // Edited by JAS - try tyopick up title field
        //
                    if (   (b.group.title != undefined) && (b.group.title != "")   ) c.labelText = b.group.title;
                    a.lc(a, M(b), c);
                    b.Ia = c.labelText
                })
            } else X(b, function(a) {
                a.Ia = a.group.label
            })
        }

        function g(b) {
            function c(a) {
                if (a.children) {
                    var b = a.Xd,
                        d = a.children.length - 1,
                        f = Math.min(50, 7 * d),
                        g = Math.max(0, b.l - f / 2);
                    80 < g + f && (g = Math.max(0, 80 - f));
                    for (var h = 0; h <= d; h++) e(a.children[h], {
                        h: b.h,
                        s: 0.8 * b.s,
                        l: Math.ceil(0 == d ? g : g + f * (d - h) / d),
                        a: b.a,
                        model: "hsla"
                    }), c(a.children[h])
                }
            }

            function e(b, c) {
                var f = 0 === a.Pa ? a.ub :
                    1 === a.Pa ? a.vb : $.Vb(c) >= a.Pa ? a.ub : a.vb;
                a.hc && (f = {
                    labelColor: f,
                    groupColor: c
                }, a.hc(a, M(b), f), c = d(f, "groupColor"), f = "auto" === f.labelColor ? $.Vb(c) >= a.Pa ? a.ub : a.vb : d(f, "labelColor"));
                b.Xd = c;
                b.Wd = $.dd(c);
                b.xf = f;
                b.uc = $.dd(f)
            }

            function d(a, b) {
                var c = a[b];
                Q.rb(c) ? a[b] = c = $.o(c) : Q.j(c) && (a[b] = c = $.o("rgba(0,0,0,0)"));
                $.v(c);
                return c
            }

            function f(a, b, c, d) {
                b = b[d];
                return b + (c[d] - b) * a
            }
            for (var g = 0, h = b.children.length - 1; 0 <= --h;) g += b.children[h].M;
            0 == g && (g = 1);
            var k = a.Ae,
                l = a.ye,
                m = 0;
            wa(b, function(a) {
                var b = m / g;
                m += a.M;
                e(a, {
                    h: f(b,
                        k, l, "h"),
                    s: f(b, k, l, "s"),
                    l: f(b, k, l, "l"),
                    a: f(b, k, l, "a"),
                    model: "hsla"
                });
                c(a)
            })
        }

        function k(a) {
            function b(a, c) {
                var d = {
                    ea: c,
                    group: a,
                    M: 0,
                    tb: function() {
                        return a.zoomed || !1
                    },
                    qb: function() {
                        return a.selected || !1
                    },
                    za: function() {
                        return a.open || !1
                    }
                };
                a.id && (T[a.id] = d);
                var e = a.groups;
                if (e && 0 < e.length) {
                    for (var f = [], g = 0, h = 0; g < e.length; g++) {
                        var k = b(e[g], c + 1);
                        k.parent = d;
                        k.index = h++;
                        f.push(k)
                    }
                    d.children = f
                }
                return d
            }
            T = {};
            a = b(a, 0);
            m(a);
            x(a);
            s(a);
            var c = 0;
            a.id = 0;
            X(a, function(a) {
                a.id = ++c
            });
            a.children || (a.children = []);
            return a
        }

        function m(a) {
            X(a, function(a) {
                var b = a.group;
                a.M = Q.N(b, "weight") ? parseFloat(b.weight) : 1
            })
        }

        function x(b) {
            if (a.Me) {
                var c = Number.MAX_VALUE,
                    d = 0;
                wa(b, function(a) {
                    a = a.M;
                    0 < a ? c = Math.min(a, c) : d++
                });
                c == Number.MAX_VALUE && (c = 1);
                wa(b, function(a) {
                    0 >= a.M && (a.M = 0.9 * c);
                    a.children && x(a)
                })
            }
        }

        function s(a) {
            var b = 0;
            wa(a, function(a) {
                b = Math.max(a.M, b)
            });
            0 < b && wa(a, function(a) {
                a.M /= b;
                a.children && s(a.children)
            })
        }

        function n(a, b) {
            if ("random" === b) {
                var c = [],
                    d;
                for (d in a) "default" !== d && c.push(d);
                b = c[Math.floor(Math.random() * (c.length +
                    1))]
            }
            return a.hasOwnProperty(b) ? a[b] : a["default"]
        }

        function q(b) {
            if (h) {
                var c = y(h, b.Kb),
                    d = [];
                if (c) {
                    var e = b.Ta,
                        f = b.value,
                        g = b.Jb;
                    Oa(h, function(a) {
                        var b = a.group[e] || !1;
                        c[a.id] ? b !== f && (a.group[e] = f, d.push(a)) : void 0 !== g && b !== g && (a.group[e] = g, d.push(a))
                    });
                    if (b.Ra)
                        for (var k = 0; k < d.length; k++) {
                            var l = d[k],
                                m = {};
                            m.group = l.group;
                            m[e] = l.group[e];
                            a.wc && window.console && window.console.log("Circles: Triggering onChange(property=" + b.Ta + ") event", m);
                            b.Ra(m)
                        }
                    b.Va && w.F({
                        type: b.Va,
                        Ec: d
                    })
                }
                return d
            }
        }

        function y(a, b) {
            var c = {};
            if (Q.da(b) && b.all) return Oa(a, function(a) {
                c[a.id] = !0
            }), c;
            if (Q.da(b) && Q.isArray(b.nodes))
                for (var d = b.nodes, e = d.length; 0 <= --e;) c[d[e].id] = !0;
            var f = {};
            Q.da(b) && Q.N(b, "groups") && (b = Q.isArray(b.groups) ? b.groups : [b.groups]);
            if (Q.isArray(b))
                for (e = b.length; 0 <= --e;) f[b[e]] = !0;
            Q.da(b) || (f[b] = !0);
            Oa(a, function(a) {
                void 0 !== a.group.id && f[a.group.id] && (c[a.id] = !0)
            });
            return c
        }

        function t(a, b, c) {
            return Q.da(a) && b in a ? a[b] : c
        }

        function M(a) {
            var b = {};
            b.group = a.group;
            b.weightNormalized = a.M;
            b.level = a.ea - 1;
            b.index = a.index;
            b.siblingCount = a.parent.children.length;
            return b
        }

        function ga(a, b, c, d) {
            var e;
            var f = {
                    top: 0,
                    left: 0
                },
                g = c && c.ownerDocument;
            g ? (e = g.documentElement, "undefined" !== typeof c.getBoundingClientRect && (f = c.getBoundingClientRect()), c = null != g && g == g.window ? g : 9 === g.nodeType ? g.defaultView || g.parentWindow : !1, e = {
                top: f.top + (c.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: f.left + (c.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : e = void 0;
            return {
                x: (a - e.left) * d,
                y: (b - e.top) * d
            }
        }

        function N() {
            C = Q.ta(a);
            A = new Sa(h, C);
            L.ab(A);
            z && D.Ib(z);
            z = new c(C);
            D.ab(z);
            E && (E.Cd(w), D.Ib(E));
            E = new b(H, C);
            E.bb(w);
            D.ab(E)
        }
        var O = {},
            Z = {},
            H = this,
            h, A, z, E, w = new ya,
            L, D, B, T, C = {},
            U = {
                Ga: void 0,
                cb: void 0,
                eb: $.Je(),
                ha: void 0
            },
            F;
        this.ob = function(b) {
            var c = document.createElement("canvas");
            c.setAttribute("style", "position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;");
            b.parentNode.insertBefore(c, b.nextSibling);
            w.Rb("main", L = new za(b, "main"));
            w.Rb("overlay", D = new za(c, "overlay"));
            N();
            w.addEventListener({
                onHoverChanged: function(b) {
                    a.Ic({
                        group: b.u ? b.u.group : null
                    })
                },
                onRequestSelectionChange: function(a) {
                    H.Yb(a.Ca)
                },
                onRequestOpenStateChange: function(a) {
                    H.fb(a.Ca)
                },
                onRequestZoomStateChange: function(a) {
                    H.Zb(a.Ca)
                },
                onPostChangeSelection: function(b) {
                    b.Ke && a.Ab && (b = b.selected.ya, a.wc && window.console && window.console.log("Circles: Triggering onGroupSelectionChanged event", b), a.Ab({
                        groups: b
                    }))
                },
                onNodeDoubleClick: function(b) {
                    var c =
                        b.u;
                    Q.contains(a.Gc({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    }), !1) || w.W({
                        type: "requestZoomStateChange",
                        Ca: {
                            nodes: [c],
                            zoomed: !c.tb(),
                            resetValue: b.metaKey | b.ctrlKey ? !1 : void 0
                        }
                    });
                    a.zb && a.zb({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    })
                },
                onNodeClick: function(b) {
                    var c = b.u;
                    Q.contains(a.Fc({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    }), !1) || w.W({
                        type: "requestSelectionChange",
                        Ca: {
                            nodes: [c],
                            selected: !c.qb(),
                            resetValue: b.metaKey | b.ctrlKey ? void 0 : !1
                        }
                    });
                    a.yb && a.yb({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    })
                }
            });
            F = new la(c, {
                Fb: a.Xb
            });
            F.ma("tap", d("click", c));
            F.ma("doubletap", d("doubleClick", c));
            F.ma("hold", d("hold", c));
            "ontouchstart" in window || (c.addEventListener("mousemove", e("mouseMove", c), !1), c.addEventListener("mouseout", e("mouseOut", c), !1))
        };
        var ia = [];
        this.reload = function() {
            var b = {
                root: h,
                na: A,
                options: C
            };
            h = a.gb ? k(a.gb) : void 0;
            N();
            a.Mc(a.gb);
            H.S();
            H.Ua();
            var c = {
                root: h,
                na: A,
                options: C
            };
            (function() {
                Q.extend(a, U);
                var b = W.H.K(Z, "attribution").V({
                    target: z,
                    duration: Q.j(a.Fa) ? 0 : 1E3 * Math.min(5, a.Fa),
                    k: {
                        opacity: {
                            end: 1,
                            f: R
                        }
                    },
                    O: z.C
                });
                !Q.j(a.Ga) && 0 < a.Ga && b.kd(1E3 * a.Ga).V({
                    target: z,
                    duration: Q.j(a.cb) ? 0 : 1E3 * a.cb,
                    k: {
                        opacity: {
                            end: 0,
                            f: R
                        }
                    },
                    O: z.C
                });
                b.start()
            })();
            (function(b, c) {
                ia = Q.filter(ia, function(a) {
                    return a.pb()
                });
                var d = ia.slice(),
                    e = [],
                    f = [],
                    g = a.xb,
                    d = W.H.ma(O, "Reload model").Eb(d).call(function() {
                        var a = n(b.na.ue, b.options.se)(b.root ? b.options.te :
                                0).Ja(),
                            d = n(c.na.Ie, c.options.Ge)(c.options.He).Ja();
                        e.push(a);
                        c.na === A && ("parallel" == g ? e.push(d) : f.push(d));
                        c.options.Oc()
                    }).Eb(e).call(function() {
                        L.Ib(b.na);
                        c.na !== A && (f.length = 0)
                    }).Eb(f).call(function() {
                        Aa.Pc(function() {
                            c.options.Nc(H.Xc())
                        })
                    }).Ja();
                "sequential" == g && ia.push(d);
                d.start()
            })(b, c)
        };
        this.Xc = function() {
            return {}
        };
        this.nb = function(a) {
            return h ? A.nb(T[a].id) : {}
        };
        this.S = function() {
            if (h) {
                var b = L.canvas,
                    c = b.clientWidth * a.c,
                    b = b.clientHeight * a.c;
                if (0 == c || 0 == b) b = c = 1;
                m(h);
                x(h);
                s(h);
                g(h);
                l(h);
                w.F({
                    type: "layout",
                    x: 0,
                    y: 0,
                    e: c,
                    d: b,
                    root: h,
                    options: a
                });
                var d = 1 / a.c,
                    e = Q.map(A.Hb(), function(a) {
                        return a * d
                    });
                w.F({
                    root: h,
                    type: "postLayout",
                    x: 0,
                    y: 0,
                    e: c,
                    d: b,
                    p: A.p,
                    q: A.q,
                    c: a.c,
                    Hb: e,
                    options: a
                });
                B = {
                    x: 0,
                    y: 0,
                    w: c * d,
                    h: b * d,
                    pixelRatio: a.c,
                    centerx: A.p * d,
                    centery: A.q * d,
                    radii: e
                };
                a.Bb && a.Bb(B)
            }
        };
        this.fe = function() {
            return h ? B : void 0
        };
        this.update = function() {
            h && A && (m(h), x(h), s(h), A.update())
        };
        this.Ua = function() {
            h && w.F({
                type: "dirty"
            })
        };
        this.fb = function(b, c) {
            h && (Q.j(c) && (c = !0), q({
                Kb: b,
                Ta: "open",
                value: t(b, "open", !0),
                Jb: t(b, "resetValue", void 0),
                Ra: c ? t(b, "onChange", a.Jc) : void 0,
                Va: "groupOpenOrClose"
            }))
        };
        this.Zb = function(b, c) {
            h && (Q.j(c) && (c = !0), q({
                Kb: b,
                Ta: "zoomed",
                value: t(b, "zoomed", !0),
                Jb: t(b, "resetValue", void 0),
                Ra: c ? t(b, "onChange", a.Lc) : void 0,
                Va: "groupZoom"
            }))
        };
        this.Yb = function(b, c) {
            if (h) {
                Q.j(c) && (c = !0);
                var d = q({
                    Kb: b,
                    Ta: "selected",
                    value: t(b, "selected", !0),
                    Jb: t(b, "resetValue", void 0),
                    Ra: c ? t(b, "onChange", a.Kc) : void 0,
                    Va: "selectionChanged"
                });
                if (!Q.N(b, "open") || b.open) {
                    var e = [];
                    d.forEach(function(b) {
                        if (b.qb())
                            for (; b.parent;) !b.parent.za() &&
                                b.index >= a.qa && e.push(b.parent), b = b.parent;
                        return !1
                    });
                    0 < e.length && this.fb({
                        nodes: e,
                        open: !0
                    }, c)
                }
                w.F({
                    type: "postChangeSelection",
                    selected: H.Ba("selected"),
                    Ke: c
                })
            }
        };
        this.wd = function() {
            return {
                groups: H.Ba("open").ya
            }
        };
        this.xd = function() {
            return {
                groups: H.Ba("selected").ya
            }
        };
        this.yd = function() {
            return {
                groups: H.Ba("zoomed").ya
            }
        };
        this.ce = function(b) {
            var c = $.hb(b, "format", "image/png"),
                d = $.hb(b, "quality", 0.8),
                e = A.n,
                f = a.ja,
                g = a.ka,
                k = a.c;
            b = $.hb(b, "pixelRatio", k);
            var l = document.createElement("canvas");
            if (h) try {
                a.ja =
                    0;
                a.ka = 0;
                a.c = b;
                H.S();
                w.F({
                    type: "paint"
                });
                var m = L.canvas;
                l.width = m.width;
                l.height = m.height;
                var n = l.getContext("2d");
                n.save();
                w.vc.forEach(function(a) {
                    n.globalAlpha = "" === a.canvas.style.opacity ? 1 : a.canvas.style.opacity;
                    n.drawImage(a.canvas, 0, 0)
                });
                n.restore()
            } finally {
                a.c = k, A.n = e, H.S(), w.F({
                    type: "paint"
                }), a.ka = g, a.ja = f
            }
            return l.toDataURL(c, d)
        };
        this.qd = function() {
            Q.extend(C, a);
            F && (F.options.Fb = C.Xb)
        };
        this.Ba = function(a) {
            var b = [],
                c = [];
            h && Oa(h, function(d) {
                d.group[a] && (b.push(d), c.push(d.group))
            });
            return {
                Ec: b,
                ya: c
            }
        }
    }

    function Va() {
        return {
            version: "2.3.6",
            build: "903dbc847f249112dce68481ca74028db9bc68ee/903dbc84",
            brandingAllowed: !1
        }
    };
    window.CarrotSearchCircles = function(a) {
        function c(a) {
            function c(a) {
                return /%$/.test(a) ? parseFloat(a.replace(/[%\s]/g, "")) : void 0
            }

            function g(a) {
                return Q.j(a) || Q.Oa(a) ? a : parseFloat(a.replace(/[%\s]/g, ""))
            }

            function l(a) {
                return function() {
                    return a ? a.apply(b, arguments) : void 0
                }
            }

            function n(a) {
                function c() {
                    var a = [],
                        e = arguments;
                    Q.forEach(d, function(c) {
                        a.push(c.apply(b, e))
                    });
                    return a
                }
                var d = [];
                Q.isArray(a) ? Q.forEach(a, function(a) {
                    Q.X(a) && d.push(a)
                }) : Q.X(a) && d.push(a);
                c.B = function() {
                    return Q.ta(d)
                };
                return c
            }(function() {
                d.id =
                    e.id;
                d.element = e.element;
                d.p = e.centerx;
                d.q = e.centery;
                d.ua = e.diameter;
                d.gb = e.dataObject;
                d.wc = e.logging;
                d.Wc = e.textureMappingMesh;
                d.backgroundColor = e.backgroundColor;
                d.kf = $.v($.o(d.backgroundColor));
                d.Fe = e.ringScaling;
                d.Sc = e.ringShape;
                d.qa = e.visibleGroupCount;
                d.ld = e.zoomedFraction;
                d.Ze = e.updateTime;
                d.Ld = e.expandTime;
                d.bf = e.zoomTime;
                d.Md = e.expanderAngle;
                d.ke = e.minExpanderAngle;
                d.ec = e.expanderOutlineWidth;
                d.dc = e.expanderOutlineColor;
                d.nf = $.v($.o(d.dc));
                d.cc = e.expanderColor;
                d.mf = $.v($.o(d.cc));
                d.af = e.zoomDecorationStrokeColor;
                d.$e = e.zoomDecorationFillColor;
                d.ja = e.deferLabelRedraws;
                d.ka = e.labelRedrawFadeInTime;
                d.P = e.angleStart;
                d.Z = e.angleEnd;
                d.Ea = e.angleWidth;
                if (!Q.j(d.Z)) {
                    d.P = Ia(d.P);
                    d.Z = Ia(d.Z);
                    if (d.P >= d.Z) {
                        var a = d.P;
                        d.P = d.Z;
                        d.Z = a
                    }
                    d.Ea = d.Z - d.P;
                    0 == Ia(d.Ea) && 0 != e.angleEnd && (d.Ea = 360)
                }
                d.Ge = e.rolloutAnimation;
                d.He = e.rolloutTime;
                d.se = e.pullbackAnimation;
                d.te = e.pullbackTime;
                d.ze = e.rainbowStartColor;
                d.Ae = $.v($.o(d.ze));
                d.xe = e.rainbowEndColor;
                d.ye = $.v($.o(d.xe));
                d.Yd = e.groupHoverHierarchy;
                d.jc = e.groupHoverColor;
                d.pf = $.v($.o(d.jc));
                d.Zd = e.groupHoverOutlineWidth;
                d.kc = e.groupHoverOutlineColor;
                d.qf = $.v($.o(d.kc));
                d.oc = e.groupSelectionColor;
                d.sf = $.v($.o(d.oc));
                d.$d = e.groupSelectionOutlineWidth;
                d.pc = e.groupSelectionOutlineColor;
                d.tf = $.v($.o(d.pc));
                d.Na = e.groupOutlineWidth;
                d.nc = e.groupOutlineColor;
                d.rf = $.v($.o(d.nc));
                d.ee = e.labelLightColor;
                d.vb = $.v($.o(d.ee));
                d.de = e.labelDarkColor;
                d.ub = $.v($.o(d.de));
                d.Pa = e.labelColorThreshold;
                d.ic = e.groupFontFamily;
                d.Ma = e.groupMinFontSize;
                d.La = e.groupMaxFontSize;
                d.mc = e.groupLinePadding;
                d.lc = l(e.groupLabelDecorator);
                d.hc = l(e.groupColorDecorator);
                d.pd = e.angularTextureStep;
                d.we = e.radialTextureStep;
                d.Te = e.textureOverlapFudge;
                d.me = e.noTexturingCurvature;
                d.De = e.ratioRadialPadding;
                d.le = e.minRadialPadding;
                d.Be = e.ratioAngularPadding;
                d.je = e.minAngularPadding;
                d.Ce = e.ratioAspectSwap;
                d.tc = e.isGroupVisible;
                d.Mc = n(e.onModelChanged);
                d.Oc = n(e.onRolloutStart);
                d.Nc = n(e.onRolloutComplete);
                d.Cb = n(e.onRedraw);
                d.Bb = n(e.onLayout);
                d.Ic = n(e.onGroupHover);
                d.Jc = n(e.onGroupOpenOrClose);
                d.Lc = n(e.onGroupZoom);
                d.Kc = n(e.onGroupSelectionChanging);
                d.Ab = n(e.onGroupSelectionChanged);
                d.Fc = n(e.onBeforeSelection);
                d.Gc = n(e.onBeforeZoom);
                d.yb = n(e.onGroupClick);
                d.zb = n(e.onGroupDoubleClick);
                d.Me = e.showZeroWeightGroups;
                d.c = e.pixelRatio;
                d.Xb = e.captureMouseEvents;
                d.ha = e.attributionLogo;
                d.eb = e.attributionUrl;
                d.rd = e.attributionPositionX;
                d.sd = e.attributionPositionY;
                d.cb = e.attributionFadeOutTime;
                d.Ga = e.attributionStayOnTime;
                d.Tb = e.attributionSize;
                d.Yc = e.titleBar;
                d.Ve = e.titleBarFontFamily;
                d.$a = e.titleBarMinFontSize;
                d.Za = e.titleBarMaxFontSize;
                d.Zc = e.titleBarBackgroundColor;
                d.Ue = $.v($.o(d.Zc));
                d.bd = e.titleBarTextColor;
                d.We = $.v($.o(d.bd));
                d.cd = e.titleBarTextPaddingLeftRight;
                d.Ob = e.titleBarTextPaddingTopBottom;
                d.Nb = e.titleBarLabelDecorator;
                d.Fa = Number(e.attributionFadeInTime);
                isNaN(d.Fa) && (d.Fa = 0);
                d.Cc = c(d.Ma);
                d.yc = c(d.La);
                d.Ma = g(d.Ma);
                d.La = g(d.La);
                d.ad = c(d.$a);
                d.$a = g(d.$a);
                d.$c = c(d.Za);
                d.Za = g(d.Za);
                d.qa || (d.qa = Number.MAX_VALUE);
                d.xb = e.modelChangeAnimations;
                "auto" == d.xb && (d.xb = /iPad|iPhone/.test(window.navigator.userAgent) ? "sequential" : "parallel")
            })();
            for (var q = "dataObject showZeroWeightGroups attributionLogo attributionStayOnTime attributionFadeOutTime attributionFadeInTime pixelRatio".split(" "),
                    y = !1, t = 0; t < q.length; t++)
                if ("undefined" != typeof a[q[t]]) {
                    f.reload();
                    y = !0;
                    break
                }
            f.qd();
            if (!y)
                for (q = "centerx centery diameter ringScaling ringShape visibleGroupCount zoomedFraction expanderAngle minExpanderAngle angleStart angleEnd angleWidth rainbowStartColor rainbowEndColor labelColorThreshold labelDarkColor labelLightColor groupFontFamily groupMinFontSize groupMaxFontSize groupLinePadding ratioRadialPadding minRadialPadding ratioAngularPadding minAngularPadding groupLabelDecorator groupColorDecorator textureMappingMesh radialTextureStep angularTextureStep textureOverlapFudge attributionLogo attributionUrl attributionPositionX attributionPositionY attributionSize attributionFadeOutTime attributionStayOnTime noTexturingCurvature isGroupVisible ratioAspectSwap titleBar titleBarFontFamily titleBarMinFontSize titleBarMaxFontSize titleBarBackgroundColor titleBarTextColor titleBarTextPaddingLeftRight titleBarTextPaddingTopBottom titleBarLabelDecorator zoomDecorationStrokeColor zoomDecorationFillColor".split(" "),
                    t = 0; t < q.length; t++)
                    if ("undefined" != typeof a[q[t]]) {
                        f.S();
                        f.Ua();
                        break
                    }
                    "undefined" !== typeof a.selection && (delete e.selection, f.Yb(a.selection, !1));
            "undefined" !== typeof a.open && (delete e.open, f.fb(a.open, !1));
            "undefined" !== typeof a.zoom && (delete e.zoom, f.Zb(a.zoom, !1))
        }
        if (window.CarrotSearchCircles.supported) {
            var b = this;
            a = (new Qa).ob(this, {
                fa: "Circles",
                Le: a,
                J: {
                    id: null,
                    element: null,
                    dataObject: null,
                    logging: !1,
                    times: null,
                    textureMappingMesh: !1,
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    centerx: "50%",
                    centery: "50%",
                    diameter: "99%",
                    layout: void 0,
                    ringScaling: 0.75,
                    ringShape: void 0,
                    angleStart: 0,
                    angleEnd: void 0,
                    angleWidth: 360,
                    showZeroWeightGroups: !0,
                    visibleGroupCount: 6,
                    zoomedFraction: 0.75,
                    groupOutlineWidth: 1,
                    groupOutlineColor: "rgba(0, 0, 0, 0.5)",
                    rainbowStartColor: "hsla(0, 100%, 50%, 0.7)",
                    rainbowEndColor: "hsla(300, 100%, 50%, 0.7)",
                    labelDarkColor: "rgba(0, 0, 0, 0.8)",
                    labelLightColor: "rgba(255, 255, 255, 0.8)",
                    labelColorThreshold: 0.35,
                    groupColorDecorator: null,
                    groupFontFamily: "Impact, Charcoal, sans-serif",
                    groupMinFontSize: "5",
                    groupMaxFontSize: "30",
                    groupLinePadding: 1,
                    groupLabelDecorator: null,
                    ratioAspectSwap: 0.8,
                    ratioRadialPadding: 0.1,
                    minRadialPadding: 4,
                    ratioAngularPadding: 0.2,
                    minAngularPadding: 2,
                    radialTextureStep: 30,
                    angularTextureStep: 25,
                    noTexturingCurvature: 0.1,
                    textureOverlapFudge: navigator.userAgent.match(/Chrome/i) ? 0 : 0.5,
                    deferLabelRedraws: 0.25,
                    labelRedrawFadeInTime: 0.5,
                    expanderAngle: 2,
                    minExpanderAngle: 1,
                    expanderOutlineWidth: 1,
                    expanderOutlineColor: "rgba(0, 0, 0, .2)",
                    expanderColor: "rgba(255, 136, 136, 0.8)",
                    expandTime: 1,
                    zoomDecorationStrokeColor: "hsla(0, 0%, 0%, 0.2)",
                    zoomDecorationFillColor: "hsla(0, 0%, 0%, 0.1)",
                    zoomTime: 1,
                    rolloutAnimation: "random",
                    rolloutTime: 1,
                    pullbackAnimation: "random",
                    pullbackTime: 0.5,
                    updateTime: 1,
                    modelChangeAnimations: "auto",
                    groupSelectionColor: "rgba(255, 128, 128, 0.1)",
                    groupSelectionOutlineColor: "rgba(255, 128, 128, 1)",
                    groupSelectionOutlineWidth: 3,
                    groupHoverColor: "rgba(0, 0, 227, 0.1)",
                    groupHoverOutlineColor: "rgba(0, 0, 227, 0.1)",
                    groupHoverOutlineWidth: 1,
                    groupHoverHierarchy: !0,
                    selection: null,
                    open: null,
                    zoom: null,
                    attributionLogo: "carrotsearch",
                    attributionUrl: "http://carrotsearch.com/circles",
                    attributionPositionX: "3%",
                    attributionPositionY: "97%",
                    attributionSize: void 0,
                    attributionStayOnTime: 3,
                    attributionFadeOutTime: 3,
                    attributionFadeInTime: 0.5,
                    titleBar: "none",
                    titleBarFontFamily: void 0,
                    titleBarMinFontSize: 8,
                    titleBarMaxFontSize: 40,
                    titleBarBackgroundColor: "rgba(0, 0, 0, 0)",
                    titleBarTextColor: "rgba(255, 255, 255, .7)",
                    titleBarTextPaddingLeftRight: 5,
                    titleBarTextPaddingTopBottom: 5,
                    titleBarLabelDecorator: void 0,
                    isGroupVisible: null,
                    onModelChanged: void 0,
                    onRolloutStart: void 0,
                    onRolloutComplete: void 0,
                    onRedraw: void 0,
                    onLayout: void 0,
                    onGroupHover: void 0,
                    onGroupZoom: void 0,
                    onGroupOpenOrClose: void 0,
                    onGroupSelectionChanging: void 0,
                    onGroupSelectionChanged: void 0,
                    onGroupClick: void 0,
                    onGroupDoubleClick: void 0,
                    onBeforeZoom: void 0,
                    onBeforeSelection: void 0,
                    pixelRatio: 1,
                    captureMouseEvents: !0
                },
                Sb: {},
                ra: {
                    get: function(a, b) {
                        switch (a) {
                            case "selection":
                                return f.xd();
                            case "open":
                                return f.wd();
                            case "zoom":
                                return f.yd();
                            case "times":
                                return f.Xc();
                            case "layout":
                                return f.fe();
                            case "imageData":
                                return f.ce(b[0]);
                            case "onModelChanged":
                                return d.Mc.B();
                            case "onRolloutStart":
                                return d.Oc.B();
                            case "onRolloutComplete":
                                return d.Nc.B();
                            case "onRedraw":
                                return d.Cb.B();
                            case "onLayout":
                                return d.Bb.B();
                            case "onGroupHover":
                                console.log('onGroupHover d:',d)
                                return d.Ic.B();
                            case "onGroupOpenOrClose":
                                return d.Jc.B();
                            case "onGroupZoom":
                                return d.Lc.B();
                            case "onBeforeSelection":
                                return d.Fc.B();
                            case "onBeforeZoom":
                                return d.Gc.B();
                            case "onGroupClick":
                                return d.yb.B();
                            case "onGroupDoubleClick":
                                return d.zb.B();
                            case "onGroupSelectionChanging":
                                return d.Kc.B();
                            case "onGroupSelectionChanged":
                                return d.Ab.B();
                            default:
                                return e[a]
                        }
                    },
                    set: c,
                    jd: function(a) {
                        var b = window.CarrotSearchCircles.attributes;
                        if (b) {
                            var c = Va().version;
                            Q.forEach(a, function(d, e) {
                                try {
                                    b[e] && b[e].asserts && (b[e].asserts.validate(d), b[e].deprecated && window.console && window.console.warn("Attribute '" + e + "' has been deprecated in version " + b[e].deprecated + " (you are using version " + c + ")"))
                                } catch (f) {
                                    window.console && (window.console.error("Attribute validation failed for '" +
                                        e + "': " + f), window.console.log("Expected value for '" + e + "': " + b[e].asserts)), delete a[e]
                                }
                            })
                        }
                    }
                }
            });
            var e = a.options,
                d = {},
                f = new Ua(d);
            c({});
            if (null == d.id && null == d.element) throw Error("Either an id or element attributes are required for embedding.");
            if (null != d.id && null != d.element) throw Error("Either an id or element attributes are required for embedding (never both).", d.id, d.element);
            var l;
            if (null != d.id) {
                var g = document.getElementById(d.id);
                if (null == g) throw Error("No such element in the document: " + d.id);
                l = a.bc(g)
            } else l = a.bc(d.element);
            this.resize = function() {
                var a = d.c;
                return l.width != l.clientWidth * a || l.height != l.clientHeight * a ? (f.S(), f.Ua(), !0) : !1
            };
            this.update = function() {
                f.update()
            };
            this.redraw = function() {
                f.Ua()
            };
            this.layout = function() {
                f.S()
            };
            this.dispose = function() {};
            this.version = Va;
            this.groupShape = function(a) {
                return f.nb(a)
            };
            f.ob(l);
            f.reload()
        }
    };
    var Ya = window.CarrotSearchCircles,
        Za, $a = document.createElement("canvas");
    Za = !(!$a.getContext || !$a.getContext("2d"));
    Ya.supported = Za;
    window.CarrotSearchCircles.version = Va;
    var ab = window.CarrotSearchCircles,
        bb;
    var cb = window["CarrotSearchCircles.attributes"];
    cb ? (delete window["CarrotSearchCircles.attributes"], bb = cb) : bb = {};
    ab.attributes = bb;
})();
