/**
 * Saber
 * 
 * @file Cookie
 * @author zfkun(zfkun@msn.com)
 */

define(function () {

    var exports = {};

    /**
     * 设置Cookie的值
     * 
     * @public
     * @param {string} name Cookie名
     * @param {string} value Cookie值
     * @param {Object=} options Cookie选项
     */
    exports.set = function( name, value, options ) {
        if ( !isValidName( name ) ) {
            return;
        }

        options = options || {};

        // expires, 单位毫秒
        var date = options.expires;
        if ( 'number' === typeof date ) {
            date = new Date();
            date.setTime( date.getTime() + options.expires );
        }

        document.cookie =
            name + '=' + ( options.raw ? value : encodeURIComponent( value ) )
            + ( date instanceof Date ? '; expires=' + date.toUTCString() : '' )
            + ( options.domain ? '; domain=' + options.domain : '' )
            + ( options.path ? '; path=' + options.path : '' )
            + ( options.secure ? '; secure' : '' );
    };

    /**
     * 获取Cookie的值
     * 
     * @public 
     * @param {string} name Cookie名
     * @param {Object=} options Cookie选项
     * @return {?string} 获取的Cookie值，获取不到时返回null
     */
    exports.get = function( name, options ) {
        options = options || {};
        return parseCookie( isValidName( name ) ? name : '', !options.raw );
    };

    /**
     * 删除Cookie
     * 
     * @param {string} name 需要删除Cookie的键名
     * @param {Object=} options 需要删除Cookie的配置
     */
    exports.remove = function( name, options ) {
        options = options || {};
        options.expires = new Date(0);
        this.set( name, '', options );
    };


    /**
     * 空字符串检查
     * 
     * @inner
     * @param {?string} str 目标字符串
     * @return {boolean}
     */
    function isNotEmptyString( str ) {
        return typeof str === 'string' && str !== '';
    }

    /**
     * 验证字符串是否合法的cookie键名
     * 
     * @param {string} name 待验证的键名字符串
     * @return {boolean}
     */
    function isValidName( name ) {
        return isNotEmptyString( name );
    }


    /**
     * 解析Cookie
     * 
     * @param {string} name Cookie名
     * @param {boolean} needDecod 是否自动解码
     * @return {?string} 获取的Cookie值，获取不到时返回null
     */
    function parseCookie( name, needDecod ) {
        if ( isNotEmptyString( name ) ) {
            var matchs = String( document.cookie ).match(
                new RegExp( '(?:^| )' + name + '(?:(?:=([^;]*))|;|$)' )
            );

            if ( matchs ) {
                if ( (matchs = matchs[1]) ) {
                    return needDecod ? decodeURIComponent( matchs ) : matchs;
                }

                return '';
            }
        }

        return null;
    }

    return exports;

});
