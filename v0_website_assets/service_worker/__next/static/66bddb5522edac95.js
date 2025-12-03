(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  32864,
  (e, t, r) => {
    var n = e.r(139269);
    t.exports = function (e) {
      return n(e) && e != +e;
    };
  },
  644007,
  (e) => {
    "use strict";
    var t = e.i(555221),
      r = e.i(32864),
      n = e.i(461317),
      o = e.i(139269),
      i = function (e) {
        return 0 === e ? 0 : e > 0 ? 1 : -1;
      },
      a = function (e) {
        return (0, t.default)(e) && e.indexOf("%") === e.length - 1;
      },
      u = function (e) {
        return (0, o.default)(e) && !(0, r.default)(e);
      },
      l = function (e) {
        return u(e) || (0, t.default)(e);
      },
      c = 0,
      s = function (e) {
        var t = ++c;
        return "".concat(e || "").concat(t);
      },
      f = function (e, n) {
        var o,
          i =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          l = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        if (!u(e) && !(0, t.default)(e)) return i;
        if (a(e)) {
          var c = e.indexOf("%");
          o = (n * parseFloat(e.slice(0, c))) / 100;
        } else o = +e;
        return ((0, r.default)(o) && (o = i), l && o > n && (o = n), o);
      },
      p = function (e) {
        if (!e) return null;
        var t = Object.keys(e);
        return t && t.length ? e[t[0]] : null;
      },
      d = function (e) {
        if (!Array.isArray(e)) return !1;
        for (var t = e.length, r = {}, n = 0; n < t; n++)
          if (r[e[n]]) return !0;
          else r[e[n]] = !0;
        return !1;
      },
      y = function (e, t) {
        return u(e) && u(t)
          ? function (r) {
              return e + r * (t - e);
            }
          : function () {
              return t;
            };
      };
    function h(e, t, r) {
      return e && e.length
        ? e.find(function (e) {
            return (
              e && ("function" == typeof t ? t(e) : (0, n.default)(e, t)) === r
            );
          })
        : null;
    }
    var m = function (e) {
        if (!e || !e.length) return null;
        for (
          var t = e.length,
            r = 0,
            n = 0,
            o = 0,
            i = 0,
            a = 1 / 0,
            u = -1 / 0,
            l = 0,
            c = 0,
            s = 0;
          s < t;
          s++
        )
          ((l = e[s].cx || 0),
            (c = e[s].cy || 0),
            (r += l),
            (n += c),
            (o += l * c),
            (i += l * l),
            (a = Math.min(a, l)),
            (u = Math.max(u, l)));
        var f = t * i != r * r ? (t * o - r * n) / (t * i - r * r) : 0;
        return { xmin: a, xmax: u, a: f, b: (n - f * r) / t };
      },
      b = function (e, r) {
        return u(e) && u(r)
          ? e - r
          : (0, t.default)(e) && (0, t.default)(r)
            ? e.localeCompare(r)
            : e instanceof Date && r instanceof Date
              ? e.getTime() - r.getTime()
              : String(e).localeCompare(String(r));
      };
    e.s([
      "compareValues",
      () => b,
      "findEntryInArray",
      () => h,
      "getAnyElementOfObject",
      () => p,
      "getLinearRegression",
      () => m,
      "getPercentValue",
      () => f,
      "hasDuplicate",
      () => d,
      "interpolateNumber",
      () => y,
      "isNumOrStr",
      () => l,
      "isNumber",
      () => u,
      "isPercent",
      () => a,
      "mathSign",
      () => i,
      "uniqueId",
      () => s,
    ]);
  },
  191642,
  (e) => {
    "use strict";
    var t = function (e, t) {
      for (
        var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), o = 2;
        o < r;
        o++
      )
        n[o - 2] = arguments[o];
    };
    e.s(["warn", () => t]);
  },
  150987,
  (e, t, r) => {
    t.exports = function (e) {
      return null == e;
    };
  },
  347739,
  (e, t, r) => {
    "use strict";
    var n = Symbol.for("react.transitional.element"),
      o = Symbol.for("react.portal"),
      i = Symbol.for("react.fragment"),
      a = Symbol.for("react.strict_mode"),
      u = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var l = Symbol.for("react.consumer"),
      c = Symbol.for("react.context"),
      s = Symbol.for("react.forward_ref"),
      f = Symbol.for("react.suspense"),
      p = Symbol.for("react.suspense_list"),
      d = Symbol.for("react.memo"),
      y = Symbol.for("react.lazy"),
      h = Symbol.for("react.offscreen"),
      m = Symbol.for("react.client.reference");
    function b(e) {
      if ("object" == typeof e && null !== e) {
        var t = e.$$typeof;
        switch (t) {
          case n:
            switch ((e = e.type)) {
              case i:
              case u:
              case a:
              case f:
              case p:
                return e;
              default:
                switch ((e = e && e.$$typeof)) {
                  case c:
                  case s:
                  case y:
                  case d:
                  case l:
                    return e;
                  default:
                    return t;
                }
            }
          case o:
            return t;
        }
      }
    }
    ((r.ContextConsumer = l),
      (r.ContextProvider = c),
      (r.Element = n),
      (r.ForwardRef = s),
      (r.Fragment = i),
      (r.Lazy = y),
      (r.Memo = d),
      (r.Portal = o),
      (r.Profiler = u),
      (r.StrictMode = a),
      (r.Suspense = f),
      (r.SuspenseList = p),
      (r.isContextConsumer = function (e) {
        return b(e) === l;
      }),
      (r.isContextProvider = function (e) {
        return b(e) === c;
      }),
      (r.isElement = function (e) {
        return "object" == typeof e && null !== e && e.$$typeof === n;
      }),
      (r.isForwardRef = function (e) {
        return b(e) === s;
      }),
      (r.isFragment = function (e) {
        return b(e) === i;
      }),
      (r.isLazy = function (e) {
        return b(e) === y;
      }),
      (r.isMemo = function (e) {
        return b(e) === d;
      }),
      (r.isPortal = function (e) {
        return b(e) === o;
      }),
      (r.isProfiler = function (e) {
        return b(e) === u;
      }),
      (r.isStrictMode = function (e) {
        return b(e) === a;
      }),
      (r.isSuspense = function (e) {
        return b(e) === f;
      }),
      (r.isSuspenseList = function (e) {
        return b(e) === p;
      }),
      (r.isValidElementType = function (e) {
        return (
          "string" == typeof e ||
          "function" == typeof e ||
          e === i ||
          e === u ||
          e === a ||
          e === f ||
          e === p ||
          e === h ||
          ("object" == typeof e &&
            null !== e &&
            (e.$$typeof === y ||
              e.$$typeof === d ||
              e.$$typeof === c ||
              e.$$typeof === l ||
              e.$$typeof === s ||
              e.$$typeof === m ||
              void 0 !== e.getModuleId)) ||
          !1
        );
      }),
      (r.typeOf = b));
  },
  531871,
  (e, t, r) => {
    "use strict";
    t.exports = e.r(347739);
  },
  104885,
  587478,
  660067,
  (e) => {
    "use strict";
    var t = e.i(461317),
      r = e.i(150987),
      n = e.i(555221),
      o = e.i(363883),
      i = e.i(791606),
      a = e.i(789783),
      u = e.i(531871),
      l = e.i(644007);
    function c(e, t) {
      for (var r in e)
        if (
          {}.hasOwnProperty.call(e, r) &&
          (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])
        )
          return !1;
      for (var n in t)
        if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
          return !1;
      return !0;
    }
    function s(e) {
      return (s =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    e.s(["shallowEqual", () => c], 587478);
    var f = [
        "aria-activedescendant",
        "aria-atomic",
        "aria-autocomplete",
        "aria-busy",
        "aria-checked",
        "aria-colcount",
        "aria-colindex",
        "aria-colspan",
        "aria-controls",
        "aria-current",
        "aria-describedby",
        "aria-details",
        "aria-disabled",
        "aria-errormessage",
        "aria-expanded",
        "aria-flowto",
        "aria-haspopup",
        "aria-hidden",
        "aria-invalid",
        "aria-keyshortcuts",
        "aria-label",
        "aria-labelledby",
        "aria-level",
        "aria-live",
        "aria-modal",
        "aria-multiline",
        "aria-multiselectable",
        "aria-orientation",
        "aria-owns",
        "aria-placeholder",
        "aria-posinset",
        "aria-pressed",
        "aria-readonly",
        "aria-relevant",
        "aria-required",
        "aria-roledescription",
        "aria-rowcount",
        "aria-rowindex",
        "aria-rowspan",
        "aria-selected",
        "aria-setsize",
        "aria-sort",
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow",
        "aria-valuetext",
        "className",
        "color",
        "height",
        "id",
        "lang",
        "max",
        "media",
        "method",
        "min",
        "name",
        "style",
        "target",
        "width",
        "role",
        "tabIndex",
        "accentHeight",
        "accumulate",
        "additive",
        "alignmentBaseline",
        "allowReorder",
        "alphabetic",
        "amplitude",
        "arabicForm",
        "ascent",
        "attributeName",
        "attributeType",
        "autoReverse",
        "azimuth",
        "baseFrequency",
        "baselineShift",
        "baseProfile",
        "bbox",
        "begin",
        "bias",
        "by",
        "calcMode",
        "capHeight",
        "clip",
        "clipPath",
        "clipPathUnits",
        "clipRule",
        "colorInterpolation",
        "colorInterpolationFilters",
        "colorProfile",
        "colorRendering",
        "contentScriptType",
        "contentStyleType",
        "cursor",
        "cx",
        "cy",
        "d",
        "decelerate",
        "descent",
        "diffuseConstant",
        "direction",
        "display",
        "divisor",
        "dominantBaseline",
        "dur",
        "dx",
        "dy",
        "edgeMode",
        "elevation",
        "enableBackground",
        "end",
        "exponent",
        "externalResourcesRequired",
        "fill",
        "fillOpacity",
        "fillRule",
        "filter",
        "filterRes",
        "filterUnits",
        "floodColor",
        "floodOpacity",
        "focusable",
        "fontFamily",
        "fontSize",
        "fontSizeAdjust",
        "fontStretch",
        "fontStyle",
        "fontVariant",
        "fontWeight",
        "format",
        "from",
        "fx",
        "fy",
        "g1",
        "g2",
        "glyphName",
        "glyphOrientationHorizontal",
        "glyphOrientationVertical",
        "glyphRef",
        "gradientTransform",
        "gradientUnits",
        "hanging",
        "horizAdvX",
        "horizOriginX",
        "href",
        "ideographic",
        "imageRendering",
        "in2",
        "in",
        "intercept",
        "k1",
        "k2",
        "k3",
        "k4",
        "k",
        "kernelMatrix",
        "kernelUnitLength",
        "kerning",
        "keyPoints",
        "keySplines",
        "keyTimes",
        "lengthAdjust",
        "letterSpacing",
        "lightingColor",
        "limitingConeAngle",
        "local",
        "markerEnd",
        "markerHeight",
        "markerMid",
        "markerStart",
        "markerUnits",
        "markerWidth",
        "mask",
        "maskContentUnits",
        "maskUnits",
        "mathematical",
        "mode",
        "numOctaves",
        "offset",
        "opacity",
        "operator",
        "order",
        "orient",
        "orientation",
        "origin",
        "overflow",
        "overlinePosition",
        "overlineThickness",
        "paintOrder",
        "panose1",
        "pathLength",
        "patternContentUnits",
        "patternTransform",
        "patternUnits",
        "pointerEvents",
        "pointsAtX",
        "pointsAtY",
        "pointsAtZ",
        "preserveAlpha",
        "preserveAspectRatio",
        "primitiveUnits",
        "r",
        "radius",
        "refX",
        "refY",
        "renderingIntent",
        "repeatCount",
        "repeatDur",
        "requiredExtensions",
        "requiredFeatures",
        "restart",
        "result",
        "rotate",
        "rx",
        "ry",
        "seed",
        "shapeRendering",
        "slope",
        "spacing",
        "specularConstant",
        "specularExponent",
        "speed",
        "spreadMethod",
        "startOffset",
        "stdDeviation",
        "stemh",
        "stemv",
        "stitchTiles",
        "stopColor",
        "stopOpacity",
        "strikethroughPosition",
        "strikethroughThickness",
        "string",
        "stroke",
        "strokeDasharray",
        "strokeDashoffset",
        "strokeLinecap",
        "strokeLinejoin",
        "strokeMiterlimit",
        "strokeOpacity",
        "strokeWidth",
        "surfaceScale",
        "systemLanguage",
        "tableValues",
        "targetX",
        "targetY",
        "textAnchor",
        "textDecoration",
        "textLength",
        "textRendering",
        "to",
        "transform",
        "u1",
        "u2",
        "underlinePosition",
        "underlineThickness",
        "unicode",
        "unicodeBidi",
        "unicodeRange",
        "unitsPerEm",
        "vAlphabetic",
        "values",
        "vectorEffect",
        "version",
        "vertAdvY",
        "vertOriginX",
        "vertOriginY",
        "vHanging",
        "vIdeographic",
        "viewTarget",
        "visibility",
        "vMathematical",
        "widths",
        "wordSpacing",
        "writingMode",
        "x1",
        "x2",
        "x",
        "xChannelSelector",
        "xHeight",
        "xlinkActuate",
        "xlinkArcrole",
        "xlinkHref",
        "xlinkRole",
        "xlinkShow",
        "xlinkTitle",
        "xlinkType",
        "xmlBase",
        "xmlLang",
        "xmlns",
        "xmlnsXlink",
        "xmlSpace",
        "y1",
        "y2",
        "y",
        "yChannelSelector",
        "z",
        "zoomAndPan",
        "ref",
        "key",
        "angle",
      ],
      p = ["points", "pathLength"],
      d = { svg: ["viewBox", "children"], polygon: p, polyline: p },
      y = [
        "dangerouslySetInnerHTML",
        "onCopy",
        "onCopyCapture",
        "onCut",
        "onCutCapture",
        "onPaste",
        "onPasteCapture",
        "onCompositionEnd",
        "onCompositionEndCapture",
        "onCompositionStart",
        "onCompositionStartCapture",
        "onCompositionUpdate",
        "onCompositionUpdateCapture",
        "onFocus",
        "onFocusCapture",
        "onBlur",
        "onBlurCapture",
        "onChange",
        "onChangeCapture",
        "onBeforeInput",
        "onBeforeInputCapture",
        "onInput",
        "onInputCapture",
        "onReset",
        "onResetCapture",
        "onSubmit",
        "onSubmitCapture",
        "onInvalid",
        "onInvalidCapture",
        "onLoad",
        "onLoadCapture",
        "onError",
        "onErrorCapture",
        "onKeyDown",
        "onKeyDownCapture",
        "onKeyPress",
        "onKeyPressCapture",
        "onKeyUp",
        "onKeyUpCapture",
        "onAbort",
        "onAbortCapture",
        "onCanPlay",
        "onCanPlayCapture",
        "onCanPlayThrough",
        "onCanPlayThroughCapture",
        "onDurationChange",
        "onDurationChangeCapture",
        "onEmptied",
        "onEmptiedCapture",
        "onEncrypted",
        "onEncryptedCapture",
        "onEnded",
        "onEndedCapture",
        "onLoadedData",
        "onLoadedDataCapture",
        "onLoadedMetadata",
        "onLoadedMetadataCapture",
        "onLoadStart",
        "onLoadStartCapture",
        "onPause",
        "onPauseCapture",
        "onPlay",
        "onPlayCapture",
        "onPlaying",
        "onPlayingCapture",
        "onProgress",
        "onProgressCapture",
        "onRateChange",
        "onRateChangeCapture",
        "onSeeked",
        "onSeekedCapture",
        "onSeeking",
        "onSeekingCapture",
        "onStalled",
        "onStalledCapture",
        "onSuspend",
        "onSuspendCapture",
        "onTimeUpdate",
        "onTimeUpdateCapture",
        "onVolumeChange",
        "onVolumeChangeCapture",
        "onWaiting",
        "onWaitingCapture",
        "onAuxClick",
        "onAuxClickCapture",
        "onClick",
        "onClickCapture",
        "onContextMenu",
        "onContextMenuCapture",
        "onDoubleClick",
        "onDoubleClickCapture",
        "onDrag",
        "onDragCapture",
        "onDragEnd",
        "onDragEndCapture",
        "onDragEnter",
        "onDragEnterCapture",
        "onDragExit",
        "onDragExitCapture",
        "onDragLeave",
        "onDragLeaveCapture",
        "onDragOver",
        "onDragOverCapture",
        "onDragStart",
        "onDragStartCapture",
        "onDrop",
        "onDropCapture",
        "onMouseDown",
        "onMouseDownCapture",
        "onMouseEnter",
        "onMouseLeave",
        "onMouseMove",
        "onMouseMoveCapture",
        "onMouseOut",
        "onMouseOutCapture",
        "onMouseOver",
        "onMouseOverCapture",
        "onMouseUp",
        "onMouseUpCapture",
        "onSelect",
        "onSelectCapture",
        "onTouchCancel",
        "onTouchCancelCapture",
        "onTouchEnd",
        "onTouchEndCapture",
        "onTouchMove",
        "onTouchMoveCapture",
        "onTouchStart",
        "onTouchStartCapture",
        "onPointerDown",
        "onPointerDownCapture",
        "onPointerMove",
        "onPointerMoveCapture",
        "onPointerUp",
        "onPointerUpCapture",
        "onPointerCancel",
        "onPointerCancelCapture",
        "onPointerEnter",
        "onPointerEnterCapture",
        "onPointerLeave",
        "onPointerLeaveCapture",
        "onPointerOver",
        "onPointerOverCapture",
        "onPointerOut",
        "onPointerOutCapture",
        "onGotPointerCapture",
        "onGotPointerCaptureCapture",
        "onLostPointerCapture",
        "onLostPointerCaptureCapture",
        "onScroll",
        "onScrollCapture",
        "onWheel",
        "onWheelCapture",
        "onAnimationStart",
        "onAnimationStartCapture",
        "onAnimationEnd",
        "onAnimationEndCapture",
        "onAnimationIteration",
        "onAnimationIterationCapture",
        "onTransitionEnd",
        "onTransitionEndCapture",
      ],
      h = function (e, t) {
        if (!e || "function" == typeof e || "boolean" == typeof e) return null;
        var r = e;
        if (((0, a.isValidElement)(e) && (r = e.props), !(0, i.default)(r)))
          return null;
        var n = {};
        return (
          Object.keys(r).forEach(function (e) {
            y.includes(e) &&
              (n[e] =
                t ||
                function (t) {
                  return r[e](r, t);
                });
          }),
          n
        );
      },
      m = function (e, t, r) {
        if (!(0, i.default)(e) || "object" !== s(e)) return null;
        var n = null;
        return (
          Object.keys(e).forEach(function (o) {
            var i = e[o];
            y.includes(o) &&
              "function" == typeof i &&
              (n || (n = {}),
              (n[o] = function (e) {
                return (i(t, r, e), null);
              }));
          }),
          n
        );
      };
    e.s(
      [
        "EventKeys",
        () => y,
        "FilteredElementKeyMap",
        () => d,
        "SVGElementPropKeys",
        () => f,
        "adaptEventHandlers",
        () => h,
        "adaptEventsOfChild",
        () => m,
      ],
      660067,
    );
    var b = ["children"],
      v = ["children"];
    function g(e, t) {
      if (null == e) return {};
      var r,
        n,
        o = (function (e, t) {
          if (null == e) return {};
          var r = {};
          for (var n in e)
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              if (t.indexOf(n) >= 0) continue;
              r[n] = e[n];
            }
          return r;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (n = 0; n < i.length; n++)
          ((r = i[n]),
            !(t.indexOf(r) >= 0) &&
              Object.prototype.propertyIsEnumerable.call(e, r) &&
              (o[r] = e[r]));
      }
      return o;
    }
    function O(e) {
      return (O =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    var w = {
        click: "onClick",
        mousedown: "onMouseDown",
        mouseup: "onMouseUp",
        mouseover: "onMouseOver",
        mousemove: "onMouseMove",
        mouseout: "onMouseOut",
        mouseenter: "onMouseEnter",
        mouseleave: "onMouseLeave",
        touchcancel: "onTouchCancel",
        touchend: "onTouchEnd",
        touchmove: "onTouchMove",
        touchstart: "onTouchStart",
        contextmenu: "onContextMenu",
        dblclick: "onDoubleClick",
      },
      P = function (e) {
        return "string" == typeof e
          ? e
          : e
            ? e.displayName || e.name || "Component"
            : "";
      },
      S = null,
      C = null,
      j = function e(t) {
        if (t === S && Array.isArray(C)) return C;
        var n = [];
        return (
          a.Children.forEach(t, function (t) {
            (0, r.default)(t) ||
              ((0, u.isFragment)(t)
                ? (n = n.concat(e(t.props.children)))
                : n.push(t));
          }),
          (C = n),
          (S = t),
          n
        );
      };
    function x(e, r) {
      var n = [],
        o = [];
      return (
        (o = Array.isArray(r)
          ? r.map(function (e) {
              return P(e);
            })
          : [P(r)]),
        j(e).forEach(function (e) {
          var r =
            (0, t.default)(e, "type.displayName") ||
            (0, t.default)(e, "type.name");
          -1 !== o.indexOf(r) && n.push(e);
        }),
        n
      );
    }
    function E(e, t) {
      return x(e, t)[0];
    }
    var T = function (e) {
        if (!e || !e.props) return !1;
        var t = e.props,
          r = t.width,
          n = t.height;
        return (
          !!(0, l.isNumber)(r) && !(r <= 0) && !!(0, l.isNumber)(n) && !(n <= 0)
        );
      },
      B = [
        "a",
        "altGlyph",
        "altGlyphDef",
        "altGlyphItem",
        "animate",
        "animateColor",
        "animateMotion",
        "animateTransform",
        "circle",
        "clipPath",
        "color-profile",
        "cursor",
        "defs",
        "desc",
        "ellipse",
        "feBlend",
        "feColormatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "filter",
        "font",
        "font-face",
        "font-face-format",
        "font-face-name",
        "font-face-url",
        "foreignObject",
        "g",
        "glyph",
        "glyphRef",
        "hkern",
        "image",
        "line",
        "lineGradient",
        "marker",
        "mask",
        "metadata",
        "missing-glyph",
        "mpath",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "script",
        "set",
        "stop",
        "style",
        "svg",
        "switch",
        "symbol",
        "text",
        "textPath",
        "title",
        "tref",
        "tspan",
        "use",
        "view",
        "vkern",
      ],
      k = function (e) {
        return e && e.type && (0, n.default)(e.type) && B.indexOf(e.type) >= 0;
      },
      D = function (e) {
        return e && "object" === O(e) && "clipDot" in e;
      },
      A = function (e, t, r, n) {
        var i,
          a = null != (i = null == d ? void 0 : d[n]) ? i : [];
        return (
          t.startsWith("data-") ||
          (!(0, o.default)(e) && ((n && a.includes(t)) || f.includes(t))) ||
          (r && y.includes(t))
        );
      },
      M = function (e) {
        var t = [];
        return (
          j(e).forEach(function (e) {
            k(e) && t.push(e);
          }),
          t
        );
      },
      N = function (e, t, r) {
        if (!e || "function" == typeof e || "boolean" == typeof e) return null;
        var n = e;
        if (((0, a.isValidElement)(e) && (n = e.props), !(0, i.default)(n)))
          return null;
        var o = {};
        return (
          Object.keys(n).forEach(function (e) {
            var i;
            A(null == (i = n) ? void 0 : i[e], e, t, r) && (o[e] = n[e]);
          }),
          o
        );
      },
      R = function e(t, r) {
        if (t === r) return !0;
        var n = a.Children.count(t);
        if (n !== a.Children.count(r)) return !1;
        if (0 === n) return !0;
        if (1 === n)
          return L(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
        for (var o = 0; o < n; o++) {
          var i = t[o],
            u = r[o];
          if (Array.isArray(i) || Array.isArray(u)) {
            if (!e(i, u)) return !1;
          } else if (!L(i, u)) return !1;
        }
        return !0;
      },
      L = function (e, t) {
        if ((0, r.default)(e) && (0, r.default)(t)) return !0;
        if (!(0, r.default)(e) && !(0, r.default)(t)) {
          var n = e.props || {},
            o = n.children,
            i = g(n, b),
            a = t.props || {},
            u = a.children,
            l = g(a, v);
          if (o && u) return c(i, l) && R(o, u);
          if (!o && !u) return c(i, l);
        }
        return !1;
      },
      I = function (e, t) {
        var r = [],
          n = {};
        return (
          j(e).forEach(function (e, o) {
            if (k(e)) r.push(e);
            else if (e) {
              var i = P(e.type),
                a = t[i] || {},
                u = a.handler,
                l = a.once;
              if (u && (!l || !n[i])) {
                var c = u(e, i, o);
                (r.push(c), (n[i] = !0));
              }
            }
          }),
          r
        );
      },
      U = function (e) {
        var t = e && e.type;
        return t && w[t] ? w[t] : null;
      },
      _ = function (e, t) {
        return j(t).indexOf(e);
      };
    e.s(
      [
        "filterProps",
        () => N,
        "filterSvgElements",
        () => M,
        "findAllByType",
        () => x,
        "findChildByType",
        () => E,
        "getDisplayName",
        () => P,
        "getReactEventByType",
        () => U,
        "hasClipDot",
        () => D,
        "isChildrenEqual",
        () => R,
        "parseChildIndex",
        () => _,
        "renderByOrder",
        () => I,
        "validateWidthHeight",
        () => T,
      ],
      104885,
    );
  },
  739453,
  (e) => {
    "use strict";
    var t = e.i(7284),
      r = e.i(789783),
      n = e.i(360174),
      o = e.i(644007),
      i = e.i(191642),
      a = e.i(104885);
    function u(e) {
      return (u =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function l(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function c(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? l(Object(r), !0).forEach(function (t) {
              var n, o, i;
              ((n = e),
                (o = t),
                (i = r[t]),
                (o = (function (e) {
                  var t = (function (e, t) {
                    if ("object" != u(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                      var n = r.call(e, t || "default");
                      if ("object" != u(n)) return n;
                      throw TypeError(
                        "@@toPrimitive must return a primitive value.",
                      );
                    }
                    return ("string" === t ? String : Number)(e);
                  })(e, "string");
                  return "symbol" == u(t) ? t : t + "";
                })(o)) in n
                  ? Object.defineProperty(n, o, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (n[o] = i));
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : l(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
      }
      return e;
    }
    function s(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    var f = (0, r.forwardRef)(function (e, u) {
      var l,
        f = e.aspect,
        p = e.initialDimension,
        d = void 0 === p ? { width: -1, height: -1 } : p,
        y = e.width,
        h = void 0 === y ? "100%" : y,
        m = e.height,
        b = void 0 === m ? "100%" : m,
        v = e.minWidth,
        g = void 0 === v ? 0 : v,
        O = e.minHeight,
        w = e.maxHeight,
        P = e.children,
        S = e.debounce,
        C = void 0 === S ? 0 : S,
        j = e.id,
        x = e.className,
        E = e.onResize,
        T = e.style,
        B = (0, r.useRef)(null),
        k = (0, r.useRef)();
      ((k.current = E),
        (0, r.useImperativeHandle)(u, function () {
          return Object.defineProperty(B.current, "current", {
            get: function () {
              return (
                console.warn(
                  "The usage of ref.current.current is deprecated and will no longer be supported.",
                ),
                B.current
              );
            },
            configurable: !0,
          });
        }));
      var D =
          (function (e) {
            if (Array.isArray(e)) return e;
          })(
            (l = (0, r.useState)({
              containerWidth: d.width,
              containerHeight: d.height,
            })),
          ) ||
          (function (e, t) {
            var r =
              null == e
                ? null
                : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != r) {
              var n,
                o,
                i,
                a,
                u = [],
                l = !0,
                c = !1;
              try {
                ((i = (r = r.call(e)).next), !1);
                for (
                  ;
                  !(l = (n = i.call(r)).done) &&
                  (u.push(n.value), 2 !== u.length);
                  l = !0
                );
              } catch (e) {
                ((c = !0), (o = e));
              } finally {
                try {
                  if (
                    !l &&
                    null != r.return &&
                    ((a = r.return()), Object(a) !== a)
                  )
                    return;
                } finally {
                  if (c) throw o;
                }
              }
              return u;
            }
          })(l, 2) ||
          (function (e, t) {
            if (e) {
              if ("string" == typeof e) return s(e, 2);
              var r = Object.prototype.toString.call(e).slice(8, -1);
              if (
                ("Object" === r && e.constructor && (r = e.constructor.name),
                "Map" === r || "Set" === r)
              )
                return Array.from(e);
              if (
                "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              )
                return s(e, 2);
            }
          })(l, 2) ||
          (function () {
            throw TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          })(),
        A = D[0],
        M = D[1],
        N = (0, r.useCallback)(function (e, t) {
          M(function (r) {
            var n = Math.round(e),
              o = Math.round(t);
            return r.containerWidth === n && r.containerHeight === o
              ? r
              : { containerWidth: n, containerHeight: o };
          });
        }, []);
      (0, r.useEffect)(
        function () {
          var e = function (e) {
            var t,
              r = e[0].contentRect,
              n = r.width,
              o = r.height;
            (N(n, o), null == (t = k.current) || t.call(k, n, o));
          };
          C > 0 && (e = (0, n.default)(e, C, { trailing: !0, leading: !1 }));
          var t = new ResizeObserver(e),
            r = B.current.getBoundingClientRect();
          return (
            N(r.width, r.height),
            t.observe(B.current),
            function () {
              t.disconnect();
            }
          );
        },
        [N, C],
      );
      var R = (0, r.useMemo)(
        function () {
          var e = A.containerWidth,
            t = A.containerHeight;
          if (e < 0 || t < 0) return null;
          ((0, i.warn)(
            (0, o.isPercent)(h) || (0, o.isPercent)(b),
            "The width(%s) and height(%s) are both fixed numbers,\n       maybe you don't need to use a ResponsiveContainer.",
            h,
            b,
          ),
            (0, i.warn)(
              !f || f > 0,
              "The aspect(%s) must be greater than zero.",
              f,
            ));
          var n = (0, o.isPercent)(h) ? e : h,
            u = (0, o.isPercent)(b) ? t : b;
          (f &&
            f > 0 &&
            (n ? (u = n / f) : u && (n = u * f), w && u > w && (u = w)),
            (0, i.warn)(
              n > 0 || u > 0,
              "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.",
              n,
              u,
              h,
              b,
              g,
              O,
              f,
            ));
          var l =
            !Array.isArray(P) &&
            (0, a.getDisplayName)(P.type).endsWith("Chart");
          return r.default.Children.map(P, function (e) {
            return r.default.isValidElement(e)
              ? (0, r.cloneElement)(
                  e,
                  c(
                    { width: n, height: u },
                    l
                      ? {
                          style: c(
                            {
                              height: "100%",
                              width: "100%",
                              maxHeight: u,
                              maxWidth: n,
                            },
                            e.props.style,
                          ),
                        }
                      : {},
                  ),
                )
              : e;
          });
        },
        [f, P, b, w, O, g, A, h],
      );
      return r.default.createElement(
        "div",
        {
          id: j ? "".concat(j) : void 0,
          className: (0, t.default)("recharts-responsive-container", x),
          style: c(
            c({}, void 0 === T ? {} : T),
            {},
            { width: h, height: b, minWidth: g, minHeight: O, maxHeight: w },
          ),
          ref: B,
        },
        R,
      );
    });
    e.s(["ResponsiveContainer", () => f]);
  },
  335232,
  668581,
  842650,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(426431),
      n = e.i(150987),
      o = e.i(7284),
      i = e.i(644007);
    function a(e) {
      return (a =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function u() {
      return (u = Object.assign.bind()).apply(this, arguments);
    }
    function l(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function c(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function s(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? c(Object(r), !0).forEach(function (t) {
              var n, o, i;
              ((n = e),
                (o = t),
                (i = r[t]),
                (o = (function (e) {
                  var t = (function (e, t) {
                    if ("object" != a(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                      var n = r.call(e, t || "default");
                      if ("object" != a(n)) return n;
                      throw TypeError(
                        "@@toPrimitive must return a primitive value.",
                      );
                    }
                    return ("string" === t ? String : Number)(e);
                  })(e, "string");
                  return "symbol" == a(t) ? t : t + "";
                })(o)) in n
                  ? Object.defineProperty(n, o, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (n[o] = i));
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : c(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
      }
      return e;
    }
    function f(e) {
      return Array.isArray(e) &&
        (0, i.isNumOrStr)(e[0]) &&
        (0, i.isNumOrStr)(e[1])
        ? e.join(" ~ ")
        : e;
    }
    var p = function (e) {
      var a = e.separator,
        c = void 0 === a ? " : " : a,
        p = e.contentStyle,
        d = e.itemStyle,
        y = void 0 === d ? {} : d,
        h = e.labelStyle,
        m = e.payload,
        b = e.formatter,
        v = e.itemSorter,
        g = e.wrapperClassName,
        O = e.labelClassName,
        w = e.label,
        P = e.labelFormatter,
        S = e.accessibilityLayer,
        C = s(
          {
            margin: 0,
            padding: 10,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            whiteSpace: "nowrap",
          },
          void 0 === p ? {} : p,
        ),
        j = s({ margin: 0 }, void 0 === h ? {} : h),
        x = !(0, n.default)(w),
        E = x ? w : "",
        T = (0, o.default)("recharts-default-tooltip", g),
        B = (0, o.default)("recharts-tooltip-label", O);
      return (
        x && P && null != m && (E = P(w, m)),
        t.default.createElement(
          "div",
          u(
            { className: T, style: C },
            void 0 !== S && S
              ? { role: "status", "aria-live": "assertive" }
              : {},
          ),
          t.default.createElement(
            "p",
            { className: B, style: j },
            t.default.isValidElement(E) ? E : "".concat(E),
          ),
          (function () {
            if (m && m.length) {
              var e = (v ? (0, r.default)(m, v) : m).map(function (e, r) {
                if ("none" === e.type) return null;
                var n = s(
                    {
                      display: "block",
                      paddingTop: 4,
                      paddingBottom: 4,
                      color: e.color || "#000",
                    },
                    y,
                  ),
                  o = e.formatter || b || f,
                  a = e.value,
                  u = e.name,
                  p = a,
                  d = u;
                if (o && null != p && null != d) {
                  var h = o(a, u, e, r, m);
                  if (Array.isArray(h)) {
                    var v =
                      (function (e) {
                        if (Array.isArray(e)) return e;
                      })(h) ||
                      (function (e, t) {
                        var r =
                          null == e
                            ? null
                            : ("undefined" != typeof Symbol &&
                                e[Symbol.iterator]) ||
                              e["@@iterator"];
                        if (null != r) {
                          var n,
                            o,
                            i,
                            a,
                            u = [],
                            l = !0,
                            c = !1;
                          try {
                            ((i = (r = r.call(e)).next), !1);
                            for (
                              ;
                              !(l = (n = i.call(r)).done) &&
                              (u.push(n.value), 2 !== u.length);
                              l = !0
                            );
                          } catch (e) {
                            ((c = !0), (o = e));
                          } finally {
                            try {
                              if (
                                !l &&
                                null != r.return &&
                                ((a = r.return()), Object(a) !== a)
                              )
                                return;
                            } finally {
                              if (c) throw o;
                            }
                          }
                          return u;
                        }
                      })(h, 2) ||
                      (function (e, t) {
                        if (e) {
                          if ("string" == typeof e) return l(e, 2);
                          var r = Object.prototype.toString
                            .call(e)
                            .slice(8, -1);
                          if (
                            ("Object" === r &&
                              e.constructor &&
                              (r = e.constructor.name),
                            "Map" === r || "Set" === r)
                          )
                            return Array.from(e);
                          if (
                            "Arguments" === r ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                          )
                            return l(e, 2);
                        }
                      })(h, 2) ||
                      (function () {
                        throw TypeError(
                          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                        );
                      })();
                    ((p = v[0]), (d = v[1]));
                  } else p = h;
                }
                return t.default.createElement(
                  "li",
                  {
                    className: "recharts-tooltip-item",
                    key: "tooltip-item-".concat(r),
                    style: n,
                  },
                  (0, i.isNumOrStr)(d)
                    ? t.default.createElement(
                        "span",
                        { className: "recharts-tooltip-item-name" },
                        d,
                      )
                    : null,
                  (0, i.isNumOrStr)(d)
                    ? t.default.createElement(
                        "span",
                        { className: "recharts-tooltip-item-separator" },
                        c,
                      )
                    : null,
                  t.default.createElement(
                    "span",
                    { className: "recharts-tooltip-item-value" },
                    p,
                  ),
                  t.default.createElement(
                    "span",
                    { className: "recharts-tooltip-item-unit" },
                    e.unit || "",
                  ),
                );
              });
              return t.default.createElement(
                "ul",
                {
                  className: "recharts-tooltip-item-list",
                  style: { padding: 0, margin: 0 },
                },
                e,
              );
            }
            return null;
          })(),
        )
      );
    };
    function d(e) {
      return (d =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function y(e, t, r) {
      var n;
      return (
        ((n = (function (e, t) {
          if ("object" != d(e) || !e) return e;
          var r = e[Symbol.toPrimitive];
          if (void 0 !== r) {
            var n = r.call(e, t || "default");
            if ("object" != d(n)) return n;
            throw TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t ? String : Number)(e);
        })(t, "string")),
        (t = "symbol" == d(n) ? n : n + "") in e)
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    e.s(["DefaultTooltipContent", () => p], 335232);
    var h = "recharts-tooltip-wrapper",
      m = { visibility: "hidden" };
    function b(e) {
      var t = e.allowEscapeViewBox,
        r = e.coordinate,
        n = e.key,
        o = e.offsetTopLeft,
        a = e.position,
        u = e.reverseDirection,
        l = e.tooltipDimension,
        c = e.viewBox,
        s = e.viewBoxDimension;
      if (a && (0, i.isNumber)(a[n])) return a[n];
      var f = r[n] - l - o,
        p = r[n] + o;
      return t[n]
        ? u[n]
          ? f
          : p
        : u[n]
          ? f < c[n]
            ? Math.max(p, c[n])
            : Math.max(f, c[n])
          : p + l > c[n] + s
            ? Math.max(f, c[n])
            : Math.max(p, c[n]);
    }
    function v(e) {
      return (v =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function g(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function O(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? g(Object(r), !0).forEach(function (t) {
              C(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : g(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
      }
      return e;
    }
    function w() {
      try {
        var e = !Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        );
      } catch (e) {}
      return (w = function () {
        return !!e;
      })();
    }
    function P(e) {
      return (P = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function S(e, t) {
      return (S = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (e, t) {
            return ((e.__proto__ = t), e);
          })(e, t);
    }
    function C(e, t, r) {
      return (
        (t = j(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function j(e) {
      var t = (function (e, t) {
        if ("object" != v(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, t || "default");
          if ("object" != v(n)) return n;
          throw TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" == v(t) ? t : t + "";
    }
    var x = (function (e) {
      var r;
      function n() {
        var e, t, r;
        if (!(this instanceof n))
          throw TypeError("Cannot call a class as a function");
        for (var o = arguments.length, i = Array(o), a = 0; a < o; a++)
          i[a] = arguments[a];
        return (
          (t = n),
          (r = [].concat(i)),
          (t = P(t)),
          C(
            (e = (function (e, t) {
              if (t && ("object" === v(t) || "function" == typeof t)) return t;
              if (void 0 !== t)
                throw TypeError(
                  "Derived constructors may only return object or undefined",
                );
              var r = e;
              if (void 0 === r)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called",
                );
              return r;
            })(
              this,
              w()
                ? Reflect.construct(t, r || [], P(this).constructor)
                : t.apply(this, r),
            )),
            "state",
            {
              dismissed: !1,
              dismissedAtCoordinate: { x: 0, y: 0 },
              lastBoundingBox: { width: -1, height: -1 },
            },
          ),
          C(e, "handleKeyDown", function (t) {
            if ("Escape" === t.key) {
              var r, n, o, i;
              e.setState({
                dismissed: !0,
                dismissedAtCoordinate: {
                  x:
                    null !=
                    (r = null == (n = e.props.coordinate) ? void 0 : n.x)
                      ? r
                      : 0,
                  y:
                    null !=
                    (o = null == (i = e.props.coordinate) ? void 0 : i.y)
                      ? o
                      : 0,
                },
              });
            }
          }),
          e
        );
      }
      if ("function" != typeof e && null !== e)
        throw TypeError("Super expression must either be null or a function");
      return (
        (n.prototype = Object.create(e && e.prototype, {
          constructor: { value: n, writable: !0, configurable: !0 },
        })),
        Object.defineProperty(n, "prototype", { writable: !1 }),
        e && S(n, e),
        (r = [
          {
            key: "updateBBox",
            value: function () {
              if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
                var e = this.wrapperNode.getBoundingClientRect();
                (Math.abs(e.width - this.state.lastBoundingBox.width) > 1 ||
                  Math.abs(e.height - this.state.lastBoundingBox.height) > 1) &&
                  this.setState({
                    lastBoundingBox: { width: e.width, height: e.height },
                  });
              } else
                (-1 !== this.state.lastBoundingBox.width ||
                  -1 !== this.state.lastBoundingBox.height) &&
                  this.setState({ lastBoundingBox: { width: -1, height: -1 } });
            },
          },
          {
            key: "componentDidMount",
            value: function () {
              (document.addEventListener("keydown", this.handleKeyDown),
                this.updateBBox());
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              document.removeEventListener("keydown", this.handleKeyDown);
            },
          },
          {
            key: "componentDidUpdate",
            value: function () {
              var e, t;
              (this.props.active && this.updateBBox(),
                this.state.dismissed &&
                  ((null == (e = this.props.coordinate) ? void 0 : e.x) !==
                    this.state.dismissedAtCoordinate.x ||
                    (null == (t = this.props.coordinate) ? void 0 : t.y) !==
                      this.state.dismissedAtCoordinate.y) &&
                  (this.state.dismissed = !1));
            },
          },
          {
            key: "render",
            value: function () {
              var e,
                r,
                n,
                a,
                u,
                l,
                c,
                s,
                f,
                p,
                d,
                v,
                g,
                w,
                P,
                S,
                C,
                j,
                x,
                E = this,
                T = this.props,
                B = T.active,
                k = T.allowEscapeViewBox,
                D = T.animationDuration,
                A = T.animationEasing,
                M = T.children,
                N = T.coordinate,
                R = T.hasPayload,
                L = T.isAnimationActive,
                I = T.offset,
                U = T.position,
                _ = T.reverseDirection,
                z = T.useTranslate3d,
                q = T.viewBox,
                H = T.wrapperStyle,
                V =
                  ((v = (e = {
                    allowEscapeViewBox: k,
                    coordinate: N,
                    offsetTopLeft: I,
                    position: U,
                    reverseDirection: _,
                    tooltipBox: this.state.lastBoundingBox,
                    useTranslate3d: z,
                    viewBox: q,
                  }).allowEscapeViewBox),
                  (g = e.coordinate),
                  (w = e.offsetTopLeft),
                  (P = e.position),
                  (S = e.reverseDirection),
                  (C = e.tooltipBox),
                  (j = e.useTranslate3d),
                  (x = e.viewBox),
                  C.height > 0 && C.width > 0 && g
                    ? ((n = (r = {
                        translateX: (p = b({
                          allowEscapeViewBox: v,
                          coordinate: g,
                          key: "x",
                          offsetTopLeft: w,
                          position: P,
                          reverseDirection: S,
                          tooltipDimension: C.width,
                          viewBox: x,
                          viewBoxDimension: x.width,
                        })),
                        translateY: (d = b({
                          allowEscapeViewBox: v,
                          coordinate: g,
                          key: "y",
                          offsetTopLeft: w,
                          position: P,
                          reverseDirection: S,
                          tooltipDimension: C.height,
                          viewBox: x,
                          viewBoxDimension: x.height,
                        })),
                        useTranslate3d: j,
                      }).translateX),
                      (a = r.translateY),
                      (f = {
                        transform: r.useTranslate3d
                          ? "translate3d(".concat(n, "px, ").concat(a, "px, 0)")
                          : "translate(".concat(n, "px, ").concat(a, "px)"),
                      }))
                    : (f = m),
                  {
                    cssProperties: f,
                    cssClasses:
                      ((l = (u = {
                        translateX: p,
                        translateY: d,
                        coordinate: g,
                      }).coordinate),
                      (c = u.translateX),
                      (s = u.translateY),
                      (0, o.default)(
                        h,
                        y(
                          y(
                            y(
                              y(
                                {},
                                "".concat(h, "-right"),
                                (0, i.isNumber)(c) &&
                                  l &&
                                  (0, i.isNumber)(l.x) &&
                                  c >= l.x,
                              ),
                              "".concat(h, "-left"),
                              (0, i.isNumber)(c) &&
                                l &&
                                (0, i.isNumber)(l.x) &&
                                c < l.x,
                            ),
                            "".concat(h, "-bottom"),
                            (0, i.isNumber)(s) &&
                              l &&
                              (0, i.isNumber)(l.y) &&
                              s >= l.y,
                          ),
                          "".concat(h, "-top"),
                          (0, i.isNumber)(s) &&
                            l &&
                            (0, i.isNumber)(l.y) &&
                            s < l.y,
                        ),
                      )),
                  }),
                W = V.cssClasses,
                F = V.cssProperties,
                $ = O(
                  O(
                    {
                      transition:
                        L && B
                          ? "transform ".concat(D, "ms ").concat(A)
                          : void 0,
                    },
                    F,
                  ),
                  {},
                  {
                    pointerEvents: "none",
                    visibility:
                      !this.state.dismissed && B && R ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  H,
                );
              return t.default.createElement(
                "div",
                {
                  tabIndex: -1,
                  className: W,
                  style: $,
                  ref: function (e) {
                    E.wrapperNode = e;
                  },
                },
                M,
              );
            },
          },
        ]),
        (function (e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            ((n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, j(n.key), n));
          }
        })(n.prototype, r),
        Object.defineProperty(n, "prototype", { writable: !1 }),
        n
      );
    })(t.PureComponent);
    e.s(["TooltipBoundingBox", () => x], 668581);
    var E = {
      isSsr: !(
        "undefined" != typeof window &&
        window.document &&
        window.document.createElement &&
        window.setTimeout
      ),
      get: function (e) {
        return E[e];
      },
      set: function (e, t) {
        if ("string" == typeof e) E[e] = t;
        else {
          var r = Object.keys(e);
          r &&
            r.length &&
            r.forEach(function (t) {
              E[t] = e[t];
            });
        }
      },
    };
    e.s(["Global", () => E], 842650);
  },
  613128,
  (e) => {
    "use strict";
    var t = e.i(747275),
      r = e.i(363883);
    function n(e, n, o) {
      return !0 === n
        ? (0, t.default)(e, o)
        : (0, r.default)(n)
          ? (0, t.default)(e, n)
          : e;
    }
    e.s(["getUniqPayload", () => n]);
  },
  358351,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(335232),
      n = e.i(668581),
      o = e.i(842650),
      i = e.i(613128);
    function a(e) {
      return (a =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function u(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function l(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? u(Object(r), !0).forEach(function (t) {
              p(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : u(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
      }
      return e;
    }
    function c() {
      try {
        var e = !Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        );
      } catch (e) {}
      return (c = function () {
        return !!e;
      })();
    }
    function s(e) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function f(e, t) {
      return (f = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (e, t) {
            return ((e.__proto__ = t), e);
          })(e, t);
    }
    function p(e, t, r) {
      return (
        (t = d(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function d(e) {
      var t = (function (e, t) {
        if ("object" != a(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, t || "default");
          if ("object" != a(n)) return n;
          throw TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" == a(t) ? t : t + "";
    }
    function y(e) {
      return e.dataKey;
    }
    var h = (function (e) {
      var o;
      function u() {
        var e, t;
        if (!(this instanceof u))
          throw TypeError("Cannot call a class as a function");
        return (
          (e = u),
          (t = arguments),
          (e = s(e)),
          (function (e, t) {
            if (t && ("object" === a(t) || "function" == typeof t)) return t;
            if (void 0 !== t)
              throw TypeError(
                "Derived constructors may only return object or undefined",
              );
            var r = e;
            if (void 0 === r)
              throw ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return r;
          })(
            this,
            c()
              ? Reflect.construct(e, t || [], s(this).constructor)
              : e.apply(this, t),
          )
        );
      }
      if ("function" != typeof e && null !== e)
        throw TypeError("Super expression must either be null or a function");
      return (
        (u.prototype = Object.create(e && e.prototype, {
          constructor: { value: u, writable: !0, configurable: !0 },
        })),
        Object.defineProperty(u, "prototype", { writable: !1 }),
        e && f(u, e),
        (o = [
          {
            key: "render",
            value: function () {
              var e,
                o = this,
                a = this.props,
                u = a.active,
                c = a.allowEscapeViewBox,
                s = a.animationDuration,
                f = a.animationEasing,
                p = a.content,
                d = a.coordinate,
                h = a.filterNull,
                m = a.isAnimationActive,
                b = a.offset,
                v = a.payload,
                g = a.payloadUniqBy,
                O = a.position,
                w = a.reverseDirection,
                P = a.useTranslate3d,
                S = a.viewBox,
                C = a.wrapperStyle,
                j = null != v ? v : [];
              h &&
                j.length &&
                (j = (0, i.getUniqPayload)(
                  v.filter(function (e) {
                    return (
                      null != e.value &&
                      (!0 !== e.hide || o.props.includeHidden)
                    );
                  }),
                  g,
                  y,
                ));
              var x = j.length > 0;
              return t.default.createElement(
                n.TooltipBoundingBox,
                {
                  allowEscapeViewBox: c,
                  animationDuration: s,
                  animationEasing: f,
                  isAnimationActive: m,
                  active: u,
                  coordinate: d,
                  hasPayload: x,
                  offset: b,
                  position: O,
                  reverseDirection: w,
                  useTranslate3d: P,
                  viewBox: S,
                  wrapperStyle: C,
                },
                ((e = l(l({}, this.props), {}, { payload: j })),
                t.default.isValidElement(p)
                  ? t.default.cloneElement(p, e)
                  : "function" == typeof p
                    ? t.default.createElement(p, e)
                    : t.default.createElement(r.DefaultTooltipContent, e)),
              );
            },
          },
        ]),
        (function (e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            ((n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, d(n.key), n));
          }
        })(u.prototype, o),
        Object.defineProperty(u, "prototype", { writable: !1 }),
        u
      );
    })(t.PureComponent);
    (p(h, "displayName", "Tooltip"),
      p(h, "defaultProps", {
        accessibilityLayer: !1,
        allowEscapeViewBox: { x: !1, y: !1 },
        animationDuration: 400,
        animationEasing: "ease",
        contentStyle: {},
        coordinate: { x: 0, y: 0 },
        cursor: !0,
        cursorStyle: {},
        filterNull: !0,
        isAnimationActive: !o.Global.isSsr,
        itemStyle: {},
        labelStyle: {},
        offset: 10,
        reverseDirection: { x: !1, y: !1 },
        separator: " : ",
        trigger: "hover",
        useTranslate3d: !1,
        viewBox: { x: 0, y: 0, height: 0, width: 0 },
        wrapperStyle: {},
      }),
      e.s(["Tooltip", () => h]));
  },
  294777,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(7284),
      n = e.i(104885),
      o = [
        "children",
        "width",
        "height",
        "viewBox",
        "className",
        "style",
        "title",
        "desc",
      ];
    function i() {
      return (i = Object.assign.bind()).apply(this, arguments);
    }
    function a(e) {
      var a = e.children,
        u = e.width,
        l = e.height,
        c = e.viewBox,
        s = e.className,
        f = e.style,
        p = e.title,
        d = e.desc,
        y = (function (e, t) {
          if (null == e) return {};
          var r,
            n,
            o = (function (e, t) {
              if (null == e) return {};
              var r = {};
              for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                  if (t.indexOf(n) >= 0) continue;
                  r[n] = e[n];
                }
              return r;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (n = 0; n < i.length; n++)
              ((r = i[n]),
                !(t.indexOf(r) >= 0) &&
                  Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (o[r] = e[r]));
          }
          return o;
        })(e, o),
        h = c || { width: u, height: l, x: 0, y: 0 },
        m = (0, r.default)("recharts-surface", s);
      return t.default.createElement(
        "svg",
        i({}, (0, n.filterProps)(y, !0, "svg"), {
          className: m,
          width: u,
          height: l,
          style: f,
          viewBox: ""
            .concat(h.x, " ")
            .concat(h.y, " ")
            .concat(h.width, " ")
            .concat(h.height),
        }),
        t.default.createElement("title", null, p),
        t.default.createElement("desc", null, d),
        a,
      );
    }
    e.s(["Surface", () => a]);
  },
  126272,
  (e, t, r) => {
    var n = e.r(225935);
    t.exports = function (e, t, r) {
      var o = e.length;
      return ((r = void 0 === r ? o : r), !t && r >= o ? e : n(e, t, r));
    };
  },
  326970,
  (e, t, r) => {
    var n = RegExp(
      "[\\u200d\ud800-\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]",
    );
    t.exports = function (e) {
      return n.test(e);
    };
  },
  380996,
  (e, t, r) => {
    t.exports = function (e) {
      return e.split("");
    };
  },
  64115,
  (e, t, r) => {
    var n = "\ud800-\udfff",
      o = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
      i = "\ud83c[\udffb-\udfff]",
      a = "[^" + n + "]",
      u = "(?:\ud83c[\udde6-\uddff]){2}",
      l = "[\ud800-\udbff][\udc00-\udfff]",
      c = "(?:" + o + "|" + i + ")?",
      s = "[\\ufe0e\\ufe0f]?",
      f = "(?:\\u200d(?:" + [a, u, l].join("|") + ")" + s + c + ")*",
      p = RegExp(
        i +
          "(?=" +
          i +
          ")|" +
          ("(?:" + [a + o + "?", o, u, l, "[" + n + "]"].join("|")) +
          ")" +
          (s + c + f),
        "g",
      );
    t.exports = function (e) {
      return e.match(p) || [];
    };
  },
  335167,
  (e, t, r) => {
    var n = e.r(380996),
      o = e.r(326970),
      i = e.r(64115);
    t.exports = function (e) {
      return o(e) ? i(e) : n(e);
    };
  },
  750480,
  (e, t, r) => {
    var n = e.r(126272),
      o = e.r(326970),
      i = e.r(335167),
      a = e.r(684016);
    t.exports = function (e) {
      return function (t) {
        var r = o((t = a(t))) ? i(t) : void 0,
          u = r ? r[0] : t.charAt(0),
          l = r ? n(r, 1).join("") : t.slice(1);
        return u[e]() + l;
      };
    };
  },
  83276,
  (e, t, r) => {
    t.exports = e.r(750480)("toUpperCase");
  },
  280076,
  805922,
  414292,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(363883),
      n = e.i(7284),
      o = e.i(191642),
      i = e.i(294777),
      a = e.i(83276);
    e.s([], 805922);
    var u = e.i(459683),
      l = e.i(199518),
      c = e.i(424885);
    (0, c.sqrt)(3);
    let s = {
        draw(e, t) {
          let r = (0, c.sqrt)(t / c.pi);
          (e.moveTo(r, 0), e.arc(0, 0, r, 0, c.tau));
        },
      },
      f = (0, c.sqrt)(1 / 3),
      p = 2 * f,
      d = (0, c.sin)(c.pi / 10) / (0, c.sin)((7 * c.pi) / 10),
      y = (0, c.sin)(c.tau / 10) * d,
      h = -(0, c.cos)(c.tau / 10) * d,
      m = (0, c.sqrt)(3);
    (0, c.sqrt)(3);
    let b = (0, c.sqrt)(3) / 2,
      v = 1 / (0, c.sqrt)(12),
      g = (v / 2 + 1) * 3;
    var O = e.i(104885);
    function w(e) {
      return (w =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    var P = ["type", "size", "sizeType"];
    function S() {
      return (S = Object.assign.bind()).apply(this, arguments);
    }
    function C(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function j(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? C(Object(r), !0).forEach(function (t) {
              var n, o, i;
              ((n = e),
                (o = t),
                (i = r[t]),
                (o = (function (e) {
                  var t = (function (e, t) {
                    if ("object" != w(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                      var n = r.call(e, t || "default");
                      if ("object" != w(n)) return n;
                      throw TypeError(
                        "@@toPrimitive must return a primitive value.",
                      );
                    }
                    return ("string" === t ? String : Number)(e);
                  })(e, "string");
                  return "symbol" == w(t) ? t : t + "";
                })(o)) in n
                  ? Object.defineProperty(n, o, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (n[o] = i));
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : C(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
      }
      return e;
    }
    var x = {
        symbolCircle: s,
        symbolCross: {
          draw(e, t) {
            let r = (0, c.sqrt)(t / 5) / 2;
            (e.moveTo(-3 * r, -r),
              e.lineTo(-r, -r),
              e.lineTo(-r, -3 * r),
              e.lineTo(r, -3 * r),
              e.lineTo(r, -r),
              e.lineTo(3 * r, -r),
              e.lineTo(3 * r, r),
              e.lineTo(r, r),
              e.lineTo(r, 3 * r),
              e.lineTo(-r, 3 * r),
              e.lineTo(-r, r),
              e.lineTo(-3 * r, r),
              e.closePath());
          },
        },
        symbolDiamond: {
          draw(e, t) {
            let r = (0, c.sqrt)(t / p),
              n = r * f;
            (e.moveTo(0, -r),
              e.lineTo(n, 0),
              e.lineTo(0, r),
              e.lineTo(-n, 0),
              e.closePath());
          },
        },
        symbolSquare: {
          draw(e, t) {
            let r = (0, c.sqrt)(t),
              n = -r / 2;
            e.rect(n, n, r, r);
          },
        },
        symbolStar: {
          draw(e, t) {
            let r = (0, c.sqrt)(0.8908130915292852 * t),
              n = y * r,
              o = h * r;
            (e.moveTo(0, -r), e.lineTo(n, o));
            for (let t = 1; t < 5; ++t) {
              let i = (c.tau * t) / 5,
                a = (0, c.cos)(i),
                u = (0, c.sin)(i);
              (e.lineTo(u * r, -a * r), e.lineTo(a * n - u * o, u * n + a * o));
            }
            e.closePath();
          },
        },
        symbolTriangle: {
          draw(e, t) {
            let r = -(0, c.sqrt)(t / (3 * m));
            (e.moveTo(0, 2 * r),
              e.lineTo(-m * r, -r),
              e.lineTo(m * r, -r),
              e.closePath());
          },
        },
        symbolWye: {
          draw(e, t) {
            let r = (0, c.sqrt)(t / g),
              n = r / 2,
              o = r * v,
              i = r * v + r,
              a = -n;
            (e.moveTo(n, o),
              e.lineTo(n, i),
              e.lineTo(a, i),
              e.lineTo(-0.5 * n - b * o, b * n + -0.5 * o),
              e.lineTo(-0.5 * n - b * i, b * n + -0.5 * i),
              e.lineTo(-0.5 * a - b * i, b * a + -0.5 * i),
              e.lineTo(-0.5 * n + b * o, -0.5 * o - b * n),
              e.lineTo(-0.5 * n + b * i, -0.5 * i - b * n),
              e.lineTo(-0.5 * a + b * i, -0.5 * i - b * a),
              e.closePath());
          },
        },
      },
      E = Math.PI / 180,
      T = function (e, t, r) {
        if ("area" === t) return e;
        switch (r) {
          case "cross":
            return (5 * e * e) / 9;
          case "diamond":
            return (0.5 * e * e) / Math.sqrt(3);
          case "square":
            return e * e;
          case "star":
            var n = 18 * E;
            return (
              1.25 *
              e *
              e *
              (Math.tan(n) - Math.tan(2 * n) * Math.pow(Math.tan(n), 2))
            );
          case "triangle":
            return (Math.sqrt(3) * e * e) / 4;
          case "wye":
            return ((21 - 10 * Math.sqrt(3)) * e * e) / 8;
          default:
            return (Math.PI * e * e) / 4;
        }
      },
      B = function (e) {
        var r,
          o = e.type,
          i = void 0 === o ? "circle" : o,
          c = e.size,
          f = void 0 === c ? 64 : c,
          p = e.sizeType,
          d = void 0 === p ? "area" : p,
          y = j(
            j(
              {},
              (function (e, t) {
                if (null == e) return {};
                var r,
                  n,
                  o = (function (e, t) {
                    if (null == e) return {};
                    var r = {};
                    for (var n in e)
                      if (Object.prototype.hasOwnProperty.call(e, n)) {
                        if (t.indexOf(n) >= 0) continue;
                        r[n] = e[n];
                      }
                    return r;
                  })(e, t);
                if (Object.getOwnPropertySymbols) {
                  var i = Object.getOwnPropertySymbols(e);
                  for (n = 0; n < i.length; n++)
                    ((r = i[n]),
                      !(t.indexOf(r) >= 0) &&
                        Object.prototype.propertyIsEnumerable.call(e, r) &&
                        (o[r] = e[r]));
                }
                return o;
              })(e, P),
            ),
            {},
            { type: i, size: f, sizeType: d },
          ),
          h = y.className,
          m = y.cx,
          b = y.cy,
          v = (0, O.filterProps)(y, !0);
        return m === +m && b === +b && f === +f
          ? t.default.createElement(
              "path",
              S({}, v, {
                className: (0, n.default)("recharts-symbols", h),
                transform: "translate(".concat(m, ", ").concat(b, ")"),
                d:
                  ((r = x["symbol".concat((0, a.default)(i))] || s),
                  (function (e, t) {
                    let r = null,
                      n = (0, l.withPath)(o);
                    function o() {
                      let o;
                      if (
                        (r || (r = o = n()),
                        e
                          .apply(this, arguments)
                          .draw(r, +t.apply(this, arguments)),
                        o)
                      )
                        return ((r = null), o + "" || null);
                    }
                    return (
                      (e = "function" == typeof e ? e : (0, u.default)(e || s)),
                      (t =
                        "function" == typeof t
                          ? t
                          : (0, u.default)(void 0 === t ? 64 : +t)),
                      (o.type = function (t) {
                        return arguments.length
                          ? ((e =
                              "function" == typeof t ? t : (0, u.default)(t)),
                            o)
                          : e;
                      }),
                      (o.size = function (e) {
                        return arguments.length
                          ? ((t =
                              "function" == typeof e ? e : (0, u.default)(+e)),
                            o)
                          : t;
                      }),
                      (o.context = function (e) {
                        return arguments.length
                          ? ((r = null == e ? null : e), o)
                          : r;
                      }),
                      o
                    );
                  })()
                    .type(r)
                    .size(T(f, d, i))()),
              }),
            )
          : null;
      };
    ((B.registerSymbol = function (e, t) {
      x["symbol".concat((0, a.default)(e))] = t;
    }),
      e.s(["Symbols", () => B], 414292));
    var k = e.i(660067);
    function D(e) {
      return (D =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function A() {
      return (A = Object.assign.bind()).apply(this, arguments);
    }
    function M(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function N() {
      try {
        var e = !Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        );
      } catch (e) {}
      return (N = function () {
        return !!e;
      })();
    }
    function R(e) {
      return (R = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function L(e, t) {
      return (L = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (e, t) {
            return ((e.__proto__ = t), e);
          })(e, t);
    }
    function I(e, t, r) {
      return (
        (t = U(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function U(e) {
      var t = (function (e, t) {
        if ("object" != D(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, t || "default");
          if ("object" != D(n)) return n;
          throw TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" == D(t) ? t : t + "";
    }
    var _ = (function (e) {
      var a;
      function u() {
        var e, t;
        if (!(this instanceof u))
          throw TypeError("Cannot call a class as a function");
        return (
          (e = u),
          (t = arguments),
          (e = R(e)),
          (function (e, t) {
            if (t && ("object" === D(t) || "function" == typeof t)) return t;
            if (void 0 !== t)
              throw TypeError(
                "Derived constructors may only return object or undefined",
              );
            var r = e;
            if (void 0 === r)
              throw ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return r;
          })(
            this,
            N()
              ? Reflect.construct(e, t || [], R(this).constructor)
              : e.apply(this, t),
          )
        );
      }
      if ("function" != typeof e && null !== e)
        throw TypeError("Super expression must either be null or a function");
      return (
        (u.prototype = Object.create(e && e.prototype, {
          constructor: { value: u, writable: !0, configurable: !0 },
        })),
        Object.defineProperty(u, "prototype", { writable: !1 }),
        e && L(u, e),
        (a = [
          {
            key: "renderIcon",
            value: function (e) {
              var r = this.props.inactiveColor,
                n = 32 / 6,
                o = 32 / 3,
                i = e.inactive ? r : e.color;
              if ("plainline" === e.type)
                return t.default.createElement("line", {
                  strokeWidth: 4,
                  fill: "none",
                  stroke: i,
                  strokeDasharray: e.payload.strokeDasharray,
                  x1: 0,
                  y1: 16,
                  x2: 32,
                  y2: 16,
                  className: "recharts-legend-icon",
                });
              if ("line" === e.type)
                return t.default.createElement("path", {
                  strokeWidth: 4,
                  fill: "none",
                  stroke: i,
                  d: "M0,"
                    .concat(16, "h")
                    .concat(o, "\n            A")
                    .concat(n, ",")
                    .concat(n, ",0,1,1,")
                    .concat(2 * o, ",")
                    .concat(16, "\n            H")
                    .concat(32, "M")
                    .concat(2 * o, ",")
                    .concat(16, "\n            A")
                    .concat(n, ",")
                    .concat(n, ",0,1,1,")
                    .concat(o, ",")
                    .concat(16),
                  className: "recharts-legend-icon",
                });
              if ("rect" === e.type)
                return t.default.createElement("path", {
                  stroke: "none",
                  fill: i,
                  d: "M0,"
                    .concat(4, "h")
                    .concat(32, "v")
                    .concat(24, "h")
                    .concat(-32, "z"),
                  className: "recharts-legend-icon",
                });
              if (t.default.isValidElement(e.legendIcon)) {
                var a = (function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2
                      ? M(Object(r), !0).forEach(function (t) {
                          I(e, t, r[t]);
                        })
                      : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                            e,
                            Object.getOwnPropertyDescriptors(r),
                          )
                        : M(Object(r)).forEach(function (t) {
                            Object.defineProperty(
                              e,
                              t,
                              Object.getOwnPropertyDescriptor(r, t),
                            );
                          });
                  }
                  return e;
                })({}, e);
                return (
                  delete a.legendIcon,
                  t.default.cloneElement(e.legendIcon, a)
                );
              }
              return t.default.createElement(B, {
                fill: i,
                cx: 16,
                cy: 16,
                size: 32,
                sizeType: "diameter",
                type: e.type,
              });
            },
          },
          {
            key: "renderItems",
            value: function () {
              var e = this,
                a = this.props,
                u = a.payload,
                l = a.iconSize,
                c = a.layout,
                s = a.formatter,
                f = a.inactiveColor,
                p = { x: 0, y: 0, width: 32, height: 32 },
                d = {
                  display: "horizontal" === c ? "inline-block" : "block",
                  marginRight: 10,
                },
                y = {
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: 4,
                };
              return u.map(function (a, u) {
                var c = a.formatter || s,
                  h = (0, n.default)(
                    I(
                      I(
                        { "recharts-legend-item": !0 },
                        "legend-item-".concat(u),
                        !0,
                      ),
                      "inactive",
                      a.inactive,
                    ),
                  );
                if ("none" === a.type) return null;
                var m = (0, r.default)(a.value) ? null : a.value;
                (0, o.warn)(
                  !(0, r.default)(a.value),
                  'The name property is also required when using a function for the dataKey of a chart\'s cartesian components. Ex: <Bar name="Name of my Data"/>',
                );
                var b = a.inactive ? f : a.color;
                return t.default.createElement(
                  "li",
                  A(
                    { className: h, style: d, key: "legend-item-".concat(u) },
                    (0, k.adaptEventsOfChild)(e.props, a, u),
                  ),
                  t.default.createElement(
                    i.Surface,
                    { width: l, height: l, viewBox: p, style: y },
                    e.renderIcon(a),
                  ),
                  t.default.createElement(
                    "span",
                    {
                      className: "recharts-legend-item-text",
                      style: { color: b },
                    },
                    c ? c(m, a, u) : m,
                  ),
                );
              });
            },
          },
          {
            key: "render",
            value: function () {
              var e = this.props,
                r = e.payload,
                n = e.layout,
                o = e.align;
              return r && r.length
                ? t.default.createElement(
                    "ul",
                    {
                      className: "recharts-default-legend",
                      style: {
                        padding: 0,
                        margin: 0,
                        textAlign: "horizontal" === n ? o : "left",
                      },
                    },
                    this.renderItems(),
                  )
                : null;
            },
          },
        ]),
        (function (e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            ((n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, U(n.key), n));
          }
        })(u.prototype, a),
        Object.defineProperty(u, "prototype", { writable: !1 }),
        u
      );
    })(t.PureComponent);
    (I(_, "displayName", "Legend"),
      I(_, "defaultProps", {
        iconSize: 14,
        layout: "horizontal",
        align: "center",
        verticalAlign: "middle",
        inactiveColor: "#ccc",
      }),
      e.s(["DefaultLegendContent", () => _], 280076));
  },
  553083,
  (e) => {
    "use strict";
    var t = e.i(789783),
      r = e.i(280076),
      n = e.i(644007),
      o = e.i(613128);
    function i(e) {
      return (i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    var a = ["ref"];
    function u(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n));
      }
      return r;
    }
    function l(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? u(Object(r), !0).forEach(function (t) {
              d(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : u(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
      }
      return e;
    }
    function c(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        ((n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, y(n.key), n));
      }
    }
    function s() {
      try {
        var e = !Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        );
      } catch (e) {}
      return (s = function () {
        return !!e;
      })();
    }
    function f(e) {
      return (f = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function p(e, t) {
      return (p = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (e, t) {
            return ((e.__proto__ = t), e);
          })(e, t);
    }
    function d(e, t, r) {
      return (
        (t = y(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function y(e) {
      var t = (function (e, t) {
        if ("object" != i(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, t || "default");
          if ("object" != i(n)) return n;
          throw TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" == i(t) ? t : t + "";
    }
    function h(e) {
      return e.value;
    }
    var m = (function (e) {
      var u, y;
      function m() {
        var e, t, r;
        if (!(this instanceof m))
          throw TypeError("Cannot call a class as a function");
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++)
          o[a] = arguments[a];
        return (
          (t = m),
          (r = [].concat(o)),
          (t = f(t)),
          d(
            (e = (function (e, t) {
              if (t && ("object" === i(t) || "function" == typeof t)) return t;
              if (void 0 !== t)
                throw TypeError(
                  "Derived constructors may only return object or undefined",
                );
              var r = e;
              if (void 0 === r)
                throw ReferenceError(
                  "this hasn't been initialised - super() hasn't been called",
                );
              return r;
            })(
              this,
              s()
                ? Reflect.construct(t, r || [], f(this).constructor)
                : t.apply(this, r),
            )),
            "lastBoundingBox",
            { width: -1, height: -1 },
          ),
          e
        );
      }
      if ("function" != typeof e && null !== e)
        throw TypeError("Super expression must either be null or a function");
      return (
        (m.prototype = Object.create(e && e.prototype, {
          constructor: { value: m, writable: !0, configurable: !0 },
        })),
        Object.defineProperty(m, "prototype", { writable: !1 }),
        e && p(m, e),
        (u = [
          {
            key: "componentDidMount",
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: "componentDidUpdate",
            value: function () {
              this.updateBBox();
            },
          },
          {
            key: "getBBox",
            value: function () {
              if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
                var e = this.wrapperNode.getBoundingClientRect();
                return (
                  (e.height = this.wrapperNode.offsetHeight),
                  (e.width = this.wrapperNode.offsetWidth),
                  e
                );
              }
              return null;
            },
          },
          {
            key: "updateBBox",
            value: function () {
              var e = this.props.onBBoxUpdate,
                t = this.getBBox();
              t
                ? (Math.abs(t.width - this.lastBoundingBox.width) > 1 ||
                    Math.abs(t.height - this.lastBoundingBox.height) > 1) &&
                  ((this.lastBoundingBox.width = t.width),
                  (this.lastBoundingBox.height = t.height),
                  e && e(t))
                : (-1 !== this.lastBoundingBox.width ||
                    -1 !== this.lastBoundingBox.height) &&
                  ((this.lastBoundingBox.width = -1),
                  (this.lastBoundingBox.height = -1),
                  e && e(null));
            },
          },
          {
            key: "getBBoxSnapshot",
            value: function () {
              return this.lastBoundingBox.width >= 0 &&
                this.lastBoundingBox.height >= 0
                ? l({}, this.lastBoundingBox)
                : { width: 0, height: 0 };
            },
          },
          {
            key: "getDefaultPosition",
            value: function (e) {
              var t,
                r,
                n = this.props,
                o = n.layout,
                i = n.align,
                a = n.verticalAlign,
                u = n.margin,
                c = n.chartWidth,
                s = n.chartHeight;
              return (
                (e &&
                  ((void 0 !== e.left && null !== e.left) ||
                    (void 0 !== e.right && null !== e.right))) ||
                  (t =
                    "center" === i && "vertical" === o
                      ? { left: ((c || 0) - this.getBBoxSnapshot().width) / 2 }
                      : "right" === i
                        ? { right: (u && u.right) || 0 }
                        : { left: (u && u.left) || 0 }),
                (e &&
                  ((void 0 !== e.top && null !== e.top) ||
                    (void 0 !== e.bottom && null !== e.bottom))) ||
                  (r =
                    "middle" === a
                      ? { top: ((s || 0) - this.getBBoxSnapshot().height) / 2 }
                      : "bottom" === a
                        ? { bottom: (u && u.bottom) || 0 }
                        : { top: (u && u.top) || 0 }),
                l(l({}, t), r)
              );
            },
          },
          {
            key: "render",
            value: function () {
              var e = this,
                n = this.props,
                i = n.content,
                u = n.width,
                c = n.height,
                s = n.wrapperStyle,
                f = n.payloadUniqBy,
                p = n.payload,
                d = l(
                  l(
                    {
                      position: "absolute",
                      width: u || "auto",
                      height: c || "auto",
                    },
                    this.getDefaultPosition(s),
                  ),
                  s,
                );
              return t.default.createElement(
                "div",
                {
                  className: "recharts-legend-wrapper",
                  style: d,
                  ref: function (t) {
                    e.wrapperNode = t;
                  },
                },
                (function (e, n) {
                  if (t.default.isValidElement(e))
                    return t.default.cloneElement(e, n);
                  if ("function" == typeof e)
                    return t.default.createElement(e, n);
                  n.ref;
                  var o = (function (e, t) {
                    if (null == e) return {};
                    var r,
                      n,
                      o = (function (e, t) {
                        if (null == e) return {};
                        var r = {};
                        for (var n in e)
                          if (Object.prototype.hasOwnProperty.call(e, n)) {
                            if (t.indexOf(n) >= 0) continue;
                            r[n] = e[n];
                          }
                        return r;
                      })(e, t);
                    if (Object.getOwnPropertySymbols) {
                      var i = Object.getOwnPropertySymbols(e);
                      for (n = 0; n < i.length; n++)
                        ((r = i[n]),
                          !(t.indexOf(r) >= 0) &&
                            Object.prototype.propertyIsEnumerable.call(e, r) &&
                            (o[r] = e[r]));
                    }
                    return o;
                  })(n, a);
                  return t.default.createElement(r.DefaultLegendContent, o);
                })(
                  i,
                  l(
                    l({}, this.props),
                    {},
                    { payload: (0, o.getUniqPayload)(p, f, h) },
                  ),
                ),
              );
            },
          },
        ]),
        (y = [
          {
            key: "getWithHeight",
            value: function (e, t) {
              var r = l(l({}, this.defaultProps), e.props).layout;
              return "vertical" === r && (0, n.isNumber)(e.props.height)
                ? { height: e.props.height }
                : "horizontal" === r
                  ? { width: e.props.width || t }
                  : null;
            },
          },
        ]),
        u && c(m.prototype, u),
        y && c(m, y),
        Object.defineProperty(m, "prototype", { writable: !1 }),
        m
      );
    })(t.PureComponent);
    (d(m, "displayName", "Legend"),
      d(m, "defaultProps", {
        iconSize: 14,
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      }),
      e.s(["Legend", () => m]));
  },
]);
