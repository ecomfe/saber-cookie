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
     * @param {string} name cookie键名
     * @param {string} value cookie原始值
     * @param {Object=} options cookie选项
     * @param {boolean=} options.raw 是否不自动编码
     * @param {number=|Date=} options.expires 有效期，为数字时单位为毫秒
     * @param {string=} options.domain 域名
     * @param {string=} options.path 路径
     * @param {boolean=} options.secure 是否安全传输
     */
    exports.set = function( name, value, options ) {
        if ( !isValidName( name ) ) {
            return;
        }

        options = options || {};

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
     * @param {string} name cookie键名
     * @param {Object=} options cookie选项
     * @param {boolean=} options.raw 是否不自动编码
     * @return {?string} 获取的cookie值，获取不到时返回null
     */
    exports.get = function( name, options ) {
        options = options || {};
        return parseCookie( isValidName( name ) ? name : '', !options.raw );
    };

    /**
     * 删除Cookie
     * 
     * @param {string} name 需要删除cookie的键名
     * @param {Object=} options 需要删除cookie的配置
     * @param {string=} options.domain 域名
     * @param {string=} options.path 路径
     * @param {boolean=} options.secure 是否安全传输
     */
    exports.remove = function( name, options ) {
        options = options || {};
        options.raw = !0;
        options.expires = new Date( 0 );
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
     * @param {string} name cookie键名
     * @param {boolean} needDecode 是否自动解码
     * @return {?string} 获取的cookie值，获取不到时返回null
     */
    function parseCookie( name, needDecode ) {
        if ( isNotEmptyString( name ) ) {
            var matchs = String( document.cookie ).match(
                new RegExp( '(?:^| )' + name + '(?:(?:=([^;]*))|;|$)' )
            );

            if ( matchs ) {
                if ( (matchs = matchs[1]) ) {
                    return needDecode ? decodeURIComponent( matchs ) : matchs;
                }

                return '';
            }
        }

        return null;
    }

    return exports;

});
