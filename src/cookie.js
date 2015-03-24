/**
 * Saber
 *
 * @file Cookie
 * @author zfkun(zfkun@msn.com)
 */

define(function (require) {

    /**
     * Cookie
     *
     * @exports Cookie
     * @module Cookie
     */
    var exports = {};

    /**
     * 设置Cookie的值
     *
     * @public
     * @param {string} name cookie键名
     * @param {string} value cookie原始值
     * @param {Object=} options cookie选项
     * @param {boolean=} options.raw 是否不自动编码
     * @param {(number | Date)=} options.expires 有效期，为数字时单位为毫秒
     * @param {string=} options.domain 域名
     * @param {string=} options.path 路径
     * @param {boolean=} options.secure 是否安全传输
     */
    exports.set = function (name, value, options) {
        if (!isValidName(name)) {
            return;
        }

        options = options || {};

        var date = options.expires;
        if ('number' === typeof date) {
            date = new Date();
            date.setTime(date.getTime() + options.expires);
        }

        document.cookie = name + '=' + (options.raw ? value : encodeURIComponent(value))
            + (date instanceof Date ? '; expires=' + date.toUTCString() : '')
            + (options.domain ? '; domain=' + options.domain : '')
            + (options.path ? '; path=' + options.path : '')
            + (options.secure ? '; secure' : '');
    };

    /**
     * 获取Cookie的值
     *
     * @public
     * @param {string} name cookie键名
     * @param {Object=} options cookie选项
     * @param {boolean=} options.raw 是否不自动编码
     * @return {?string} 获取的cookie值，获取不到时返回null
     */
    exports.get = function (name, options) {
        options = options || {};
        return parseCookie(isValidName(name) ? name : '', !options.raw);
    };

    /**
     * 删除Cookie
     *
     * @public
     * @param {string} name 需要删除cookie的键名
     * @param {Object=} options 需要删除cookie的配置
     * @param {string=} options.domain 域名
     * @param {string=} options.path 路径
     * @param {boolean=} options.secure 是否安全传输
     */
    exports.remove = function (name, options) {
        options = options || {};
        options.raw = !0;
        options.expires = new Date(0);
        this.set(name, '', options);
    };


    /**
     * 空字符串检查
     *
     * @inner
     * @param {?string} str 目标字符串
     * @return {boolean}
     */
    function isNotEmptyString(str) {
        return typeof str === 'string' && str !== '';
    }

    /**
     * 验证字符串是否合法的cookie键名
     *
     * @inner
     * @param {string} name 待验证的键名字符串
     * @return {boolean}
     */
    function isValidName(name) {
        return isNotEmptyString(name);
    }


    /**
     * 解析Cookie
     *
     * @inner
     * @param {string} name cookie键名
     * @param {boolean} needDecode 是否自动解码
     * @return {?string} 获取的cookie值，获取不到时返回null
     */
    function parseCookie(name, needDecode) {
        if (isNotEmptyString(name)) {
            var matches = String(document.cookie).match(
                new RegExp('(?:^|)' + name + '(?:(?:=([^;]*))|;|$)')
           );

            if (matches) {
                if ((matches = matches[1])) {
                    return needDecode ? decodeURIComponent(matches) : matches;
                }

                return '';
            }
        }

        return null;
    }

    return exports;

});
