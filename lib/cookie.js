/**
 * @file cookie
 * @author treelite(c.xinle@gmail.com)
 */

var currentApp;

function blank(str) {
    return str;
}

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
    options = options || {};

    var res = currentApp.getContext().res;

    var date = options.expires;
    if ('number' === typeof date) {
        date = new Date();
        date.setTime(date.getTime() + options.expires);
        options.expires = date;
    }

    if (options.raw) {
        options.encode = blank;
    }

    res.cookie(name, value, options);
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

    var req = currentApp.getContext().req;

    var value = req.cookies[name];
    if (value && !options.raw) {
        value = decodeURIComponent(value);
    }

    return value;
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
    var res = currentApp.getContext().res;

    res.clearCookie(name, options);
};

/**
 * Plugin for Rebas
 *
 * @public
 * @param {Object} app app
 */
exports.rebas = function (app) {
    var cookieParser = require('cookie-parser');

    app.before(
        cookieParser(
            null,
            {
                decode: blank
            }
        )
    );

    currentApp = app;
};
