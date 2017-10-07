var socialLikesButtons = {
    twitter: {
        counterUrl: "https://opensharecount.com/count.json?url={url}",
        convertNumber: function(t) {
            return t.count
        }
    }
};
!function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t, e) {
    "use strict";
    function i(t, e) {
        this.container = t,
        this.options = e,
        this.init()
    }
    function n(e, i) {
        this.widget = e,
        this.options = t.extend({}, i),
        this.detectService(),
        this.service && this.init()
    }
    function s(t) {
        var e = {}
          , i = t.data();
        for (var n in i) {
            var s = i[n];
            "yes" === s ? s = !0 : "no" === s && (s = !1),
            e[n.replace(/-(\w)/g, function(t, e) {
                return e.toUpper()
            })] = s
        }
        return e
    }
    function o(t, e) {
        return r(t, e, encodeURIComponent)
    }
    function r(t, e, i) {
        return t.replace(/\{([^}]+)\}/g, function(t, n) {
            return n in e ? i ? i(e[n]) : e[n] : t
        })
    }
    function c(t, e) {
        var i = l + t;
        return i + " " + i + "_" + e
    }
    function a(e, i) {
        function n(r) {
            "keydown" === r.type && 27 !== r.which || t(r.target).closest(e).length || (e.removeClass(p),
            s.off(o, n),
            t.isFunction(i) && i())
        }
        var s = t(document)
          , o = "click touchstart keydown";
        s.on(o, n)
    }
    function u(t) {
        var e = 10;
        if (document.documentElement.getBoundingClientRect) {
            var i = parseInt(t.css("left"), 10)
              , n = parseInt(t.css("top"), 10)
              , s = t[0].getBoundingClientRect();
            s.left < e ? t.css("left", e - s.left + i) : s.right > window.innerWidth - e && t.css("left", window.innerWidth - s.right - e + i),
            s.top < e ? t.css("top", e - s.top + n) : s.bottom > window.innerHeight - e && t.css("top", window.innerHeight - s.bottom - e + n)
        }
        t.addClass(p)
    }
    var h = "social-likes"
      , l = h + "__"
      , p = h + "_opened"
      , d = "https:" === location.protocol ? "https:" : "http:"
      , f = {
        facebook: {
            counterUrl: "https://graph.facebook.com/?id={url}",
            convertNumber: function(t) {
                return t.share.share_count
            },
            popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
            popupWidth: 600,
            popupHeight: 359
        },
        twitter: {
            counters: !0,
            popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}",
            popupWidth: 600,
            popupHeight: 250,
            click: function() {
                return /[.?:\-–—]\s*$/.test(this.options.title) || (this.options.title += ":"),
                !0
            }
        },
        mailru: {
            counterUrl: d + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",
            convertNumber: function(t) {
                for (var e in t)
                    if (t.hasOwnProperty(e))
                        return t[e].shares
            },
            popupUrl: "https://connect.mail.ru/share?share_url={url}&title={title}",
            popupWidth: 492,
            popupHeight: 500
        },
        vkontakte: {
            counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}",
            counter: function(e, i) {
                var n = f.vkontakte;
                n._ || (n._ = [],
                window.VK || (window.VK = {}),
                window.VK.Share = {
                    count: function(t, e) {
                        n._[t].resolve(e)
                    }
                });
                var s = n._.length;
                n._.push(i),
                t.getScript(o(e, {
                    index: s
                })).fail(i.reject)
            },
            popupUrl: "https://vk.com/share.php?url={url}&title={title}",
            popupWidth: 655,
            popupHeight: 450
        },
        odnoklassniki: {
            counterUrl: d + "//connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",
            counter: function(e, i) {
                var n = f.odnoklassniki;
                n._ || (n._ = [],
                window.ODKL || (window.ODKL = {}),
                window.ODKL.updateCount = function(t, e) {
                    n._[t].resolve(e)
                }
                );
                var s = n._.length;
                n._.push(i),
                t.getScript(o(e, {
                    index: s
                })).fail(i.reject)
            },
            popupUrl: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",
            popupWidth: 580,
            popupHeight: 336
        },
        plusone: {
            popupUrl: "https://plus.google.com/share?url={url}",
            popupWidth: 500,
            popupHeight: 550
        }
    }
      , g = {
        promises: {},
        fetch: function(e, i, n) {
            g.promises[e] || (g.promises[e] = {});
            var s = g.promises[e];
            if (!n.forceUpdate && s[i])
                return s[i];
            var r = t.extend({}, f[e], n)
              , c = t.Deferred()
              , a = r.counterUrl && o(r.counterUrl, {
                url: i
            });
            return a && t.isFunction(r.counter) ? r.counter(a, c) : r.counterUrl ? t.getJSON(a).done(function(e) {
                try {
                    var i = e;
                    t.isFunction(r.convertNumber) && (i = r.convertNumber(e)),
                    c.resolve(i)
                } catch (t) {
                    c.reject()
                }
            }).fail(c.reject) : c.reject(),
            s[i] = c.promise(),
            s[i]
        }
    };
    t.fn.socialLikes = function(e) {
        return this.each(function() {
            var n = t(this)
              , o = n.data(h);
            o ? t.isPlainObject(e) && o.update(e) : (o = new i(n,t.extend({}, t.fn.socialLikes.defaults, e, s(n))),
            n.data(h, o))
        })
    }
    ,
    t.fn.socialLikes.defaults = {
        url: window.location.href.replace(window.location.hash, ""),
        title: document.title,
        counters: !0,
        zeroes: !1,
        wait: 500,
        timeout: 1e4,
        popupCheckInterval: 500,
        singleTitle: "Share"
    },
    i.prototype = {
        init: function() {
            this.container.addClass(h),
            this.single = this.container.hasClass(h + "_single"),
            this.initUserButtons(),
            this.countersLeft = 0,
            this.number = 0,
            this.container.on("counter." + h, t.proxy(this.updateCounter, this));
            var e = this.container.children();
            this.makeSingleButton(),
            this.buttons = [],
            e.each(t.proxy(function(e, i) {
                var s = new n(t(i),this.options);
                this.buttons.push(s),
                s.options.counterUrl && this.countersLeft++
            }, this)),
            this.options.counters ? (this.timer = setTimeout(t.proxy(this.appear, this), this.options.wait),
            this.timeout = setTimeout(t.proxy(this.ready, this, !0), this.options.timeout)) : this.appear()
        },
        initUserButtons: function() {
            !this.userButtonInited && window.socialLikesButtons && t.extend(!0, f, socialLikesButtons),
            this.userButtonInited = !0
        },
        makeSingleButton: function() {
            if (this.single) {
                var e = this.container;
                e.addClass(h + "_vertical"),
                e.wrap(t("<div>", {
                    class: h + "_single-w"
                })),
                e.wrapInner(t("<div>", {
                    class: h + "__single-container"
                }));
                var i = e.parent()
                  , n = t("<div>", {
                    class: c("widget", "single")
                })
                  , s = t(r('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', {
                    buttonCls: c("button", "single"),
                    iconCls: c("icon", "single"),
                    title: this.options.singleTitle
                }));
                n.append(s),
                i.append(n),
                n.on("click", function() {
                    var t = h + "__widget_active";
                    return n.toggleClass(t),
                    n.hasClass(t) ? (e.css({
                        left: -(e.width() - n.width()) / 2,
                        top: -e.height()
                    }),
                    u(e),
                    a(e, function() {
                        n.removeClass(t)
                    })) : e.removeClass(p),
                    !1
                }),
                this.widget = n
            }
        },
        update: function(e) {
            if (e.forceUpdate || e.url !== this.options.url) {
                this.number = 0,
                this.countersLeft = this.buttons.length,
                this.widget && this.widget.find("." + h + "__counter").remove(),
                t.extend(this.options, e);
                for (var i = 0; i < this.buttons.length; i++)
                    this.buttons[i].update(e)
            }
        },
        updateCounter: function(t, e, i) {
            ((i = i || 0) || this.options.zeroes) && (this.number += i,
            this.single && this.getCounterElem().text(this.number)),
            0 === --this.countersLeft && (this.appear(),
            this.ready())
        },
        appear: function() {
            this.container.addClass(h + "_visible")
        },
        ready: function(t) {
            this.timeout && clearTimeout(this.timeout),
            this.container.addClass(h + "_ready"),
            t || this.container.trigger("ready." + h, this.number)
        },
        getCounterElem: function() {
            var e = this.widget.find("." + l + "counter_single");
            return e.length || (e = t("<span>", {
                class: c("counter", "single")
            }),
            this.widget.append(e)),
            e
        }
    },
    n.prototype = {
        init: function() {
            this.detectParams(),
            this.initHtml(),
            setTimeout(t.proxy(this.initCounter, this), 0)
        },
        update: function(e) {
            t.extend(this.options, {
                forceUpdate: !1
            }, e),
            this.widget.find("." + h + "__counter").remove(),
            this.initCounter()
        },
        detectService: function() {
            var e = this.widget.data("service");
            if (!e) {
                for (var i = this.widget[0], n = i.classList || i.className.split(" "), s = 0; s < n.length; s++) {
                    var o = n[s];
                    if (f[o]) {
                        e = o;
                        break
                    }
                }
                if (!e)
                    return
            }
            this.service = e,
            t.extend(this.options, f[e])
        },
        detectParams: function() {
            var t = this.widget.data();
            if (t.counter) {
                var e = parseInt(t.counter, 10);
                isNaN(e) ? this.options.counterUrl = t.counter : this.options.counterNumber = e
            }
            t.title && (this.options.title = t.title),
            t.url && (this.options.url = t.url)
        },
        initHtml: function() {
            var e = this.options
              , i = this.widget
              , n = i.find("a");
            n.length && this.cloneDataAttrs(n, i);
            var s = t("<span>", {
                class: this.getElementClassNames("button"),
                html: i.html()
            });
            if (e.clickUrl) {
                var r = o(e.clickUrl, {
                    url: e.url,
                    title: e.title
                })
                  , c = t("<a>", {
                    href: r
                });
                this.cloneDataAttrs(i, c),
                i.replaceWith(c),
                this.widget = i = c
            } else
                i.on("click", t.proxy(this.click, this));
            i.removeClass(this.service),
            i.addClass(this.getElementClassNames("widget")),
            s.prepend(t("<span>", {
                class: this.getElementClassNames("icon")
            })),
            i.empty().append(s),
            this.button = s
        },
        initCounter: function() {
            if (this.options.counters)
                if (this.options.counterNumber)
                    this.updateCounter(this.options.counterNumber);
                else {
                    var e = {
                        counterUrl: this.options.counterUrl,
                        forceUpdate: this.options.forceUpdate
                    };
                    g.fetch(this.service, this.options.url, e).always(t.proxy(this.updateCounter, this))
                }
        },
        cloneDataAttrs: function(t, e) {
            var i = t.data();
            for (var n in i)
                i.hasOwnProperty(n) && e.data(n, i[n])
        },
        getElementClassNames: function(t) {
            return c(t, this.service)
        },
        updateCounter: function(e) {
            e = parseInt(e, 10) || 0;
            var i = {
                class: this.getElementClassNames("counter"),
                text: e
            };
            e || this.options.zeroes || (i.class += " " + h + "__counter_empty",
            i.text = "");
            var n = t("<span>", i);
            this.widget.append(n),
            this.widget.trigger("counter." + h, [this.service, e])
        },
        click: function(e) {
            var i = this.options
              , n = !0;
            if (t.isFunction(i.click) && (n = i.click.call(this, e)),
            n) {
                var s = o(i.popupUrl, {
                    url: i.url,
                    title: i.title
                });
                s = this.addAdditionalParamsToUrl(s),
                this.openPopup(s, {
                    width: i.popupWidth,
                    height: i.popupHeight
                })
            }
            return !1
        },
        addAdditionalParamsToUrl: function(e) {
            var i = t.param(t.extend(this.widget.data(), this.options.data));
            return t.isEmptyObject(i) ? e : e + (-1 === e.indexOf("?") ? "?" : "&") + i
        },
        openPopup: function(i, n) {
            var s = window.screenLeft !== e ? window.screenLeft : screen.left
              , o = window.screenTop !== e ? window.screenTop : screen.top
              , r = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
              , c = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
              , a = Math.round(r / 2 - n.width / 2) + s
              , u = 0;
            c > n.height && (u = Math.round(c / 3 - n.height / 2) + o);
            var l = window.open(i, "sl_" + this.service, "left=" + a + ",top=" + u + ",width=" + n.width + ",height=" + n.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
            if (l) {
                l.focus(),
                this.widget.trigger("popup_opened." + h, [this.service, l]);
                var p = setInterval(t.proxy(function() {
                    l.closed && (clearInterval(p),
                    this.widget.trigger("popup_closed." + h, this.service))
                }, this), this.options.popupCheckInterval)
            } else
                location.href = i
        }
    },
    t(function() {
        t("." + h).socialLikes()
    })
});
var url = "http://razbudi.net";
var data = {
    "method": "pos.plusones.get",
    "id": url,
    "params": {
        "nolog": !0,
        "id": url,
        "source": "widget",
        "userId": "@viewer",
        "groupId": "@self"
    },
    "jsonrpc": "2.0",
    "key": "p",
    "apiVersion": "v1"
};
$.ajax({
    type: "POST",
    url: "https://clients6.google.com/rpc",
    processData: !0,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(r) {
        setCount($(".social-likes__counter_plusone"), r.result.metadata.globalCounts.count)
    }
});
var setCount = function($item, count) {
    if (count) {
        $item.text(count)
    }
}