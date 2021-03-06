!(function () {
  function t() {
    var t = document.cookie.match("(^|[^;]+)\\s*XSRF-TOKEN\\s*=\\s*([^;]+)");
    return t ? t.pop() : "";
  }
  function e(t) {
    return (
      !!t.match(new RegExp("^(https?:)?//" + window.location.hostname)) ||
      !t.match(new RegExp("^(https?:)?//"))
    );
  }
  function n(t, e) {
    return (
      (!t || "GET" === t.toUpperCase()) &&
      /\.(png|gif|jpe?g|css|js|json|svg|html?)$/.test(e.split("?")[0])
    );
  }
  function i(e) {
    (e.headers = e.headers || {}),
      e.headers.append
        ? (e.headers.delete("X-XSRF-TOKEN"),
          e.headers.append("X-XSRF-TOKEN", t()))
        : (e.headers["X-XSRF-TOKEN"] = t());
  }
  var s = Object.getPrototypeOf(new window.XMLHttpRequest()),
    r = s.open,
    o = s.send;
  function u(e) {
    var n = document.createElement("input"),
      i = e.target.getAttribute("action");
    null != i &&
      (function (t, e) {
        for (var n = 0; n < e.length; n++) if (t && t.match(e[n])) return !0;
        return !1;
      })(i, h) &&
      (e.target.method = "POST"),
      e.target.querySelector('input[name="authenticity_token"]') ||
        ("post" === e.target.method.toLowerCase() &&
          (n.setAttribute("type", "hidden"),
          n.setAttribute("name", "authenticity_token"),
          n.setAttribute("value", t()),
          e.target.appendChild(n)));
  }
  if (
    ((s.open = function () {
      return (
        (this._isLocalRequest = e(arguments[1])),
        (this._isAssetRequest = n(arguments[0], arguments[1])),
        r.apply(this, arguments)
      );
    }),
    (s.send = function () {
      return (
        this._isLocalRequest &&
          !this._isAssetRequest &&
          this.setRequestHeader("X-XSRF-TOKEN", t()),
        o.apply(this, arguments)
      );
    }),
    window.$ && window.$.fn && window.$.fn.jquery
      ? $(document).submit(u)
      : document.addEventListener("submit", u),
    window.fetch)
  ) {
    var a = window.fetch;
    window.fetch = function (t, s) {
      if (window.Request) {
        var r = new Request(t, s);
        return e(r.url) && !n(r.method, r.url) && i(r), a(r);
      }
      var o = t,
        u = s || {};
      return e(o) && !n(u.method, o) && i(u), a(o, u);
    };
  }
  var h = [
    new RegExp("^" + window.location.origin + "/wishlist.php"),
    new RegExp("^/?wishlist.php"),
  ];
})();
//# sourceMappingURL=csrf-protection-header-b572e5526f6854c73a5e080ef15a771f963740ae.js.map
