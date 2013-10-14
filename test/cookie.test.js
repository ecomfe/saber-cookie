define(function() {

    var Cookie = require( 'saber-cookie' );

    describe( 'Cookie', function() {

        var rawText = 'Hi，百度！ !@#%$(~...';

        describe( 'get', function() {

            document.cookie = '__saber_g1=1';
            document.cookie = '__saber_g2';
            document.cookie = '__saber_g3=';
            document.cookie = '__saber_g4[abc]=x';
            document.cookie = '__saber_g5=' + encodeURIComponent( rawText );

            it( 'should return string value for the given name.', function() {

                expect( Cookie.get( '__saber_g1' ) ).toEqual( '1' );
                expect( Cookie.get( '__saber_g2' ) ).toEqual( '' );
                expect( Cookie.get( '__saber_g3' ) ).toEqual( '' );
                expect( Cookie.get( '__saber_g5' ) ).toEqual( rawText );

            });

            it( 'should return null for invalid name.', function() {

                expect( Cookie.get( '' ) ).toEqual( null );

                var invalidKey;
                expect( Cookie.get( invalidKey ) ).toEqual( null );

                expect( Cookie.get( null ) ).toEqual( null );

                expect( Cookie.get( undefined ) ).toEqual( null );

            });


            it( 'should return null for like-array name.', function() {

                expect( Cookie.get( '__saber_g4' ) ).toEqual( null );

            });


            it( 'should return null for non-existing name.', function() {

                expect( Cookie.get( '__saber_g4' ) ).toEqual( null );
                expect( Cookie.get( '__saber_gx' ) ).toEqual( null );

            });

            it(
                'should return raw value for the given name'
                + ' when `options.raw = true`.',
                function() {

                    expect(
                        Cookie.get( '__saber_g5', { raw: true } )
                    ).toEqual( encodeURIComponent( rawText ) );

                }
            );

        });


        describe( 'set', function() {

            var rawText = 'Hi，百度一下，你就知道！';
            var rawOption = { raw: true };

            it( 'should set a cookie with given name and value.', function() {

                Cookie.set( '__saber_s1', 'a' );
                expect( Cookie.get( '__saber_s1' ) ).toEqual( 'a' );
                expect( Cookie.get( '__saber_s1', rawOption ) ).toEqual(
                    encodeURIComponent( 'a' )
                );

                Cookie.set( '__saber_s2', 'b', { expires: -1 } );
                expect( Cookie.get( '__saber_s2' ) ).toEqual( null );
                expect( Cookie.get( '__saber_s2', rawOption ) ).toEqual(
                    null
                );

                Cookie.set( '__saber_s3', 'c', {
                    expires: new Date( 2020, 1, 1 ),
                    path: '/'
                });
                expect( Cookie.get( '__saber_s3' ) ).toEqual( 'c' );
                expect( Cookie.get( '__saber_s3', rawOption ) ).toEqual(
                    encodeURIComponent( 'c' )
                );

                Cookie.remove( '__saber_s4' );
                Cookie.set( '__saber_s4', 'd', {
                    domain: document.domain,
                    path: '/',
                    secure: true
                });
                expect( Cookie.get( '__saber_s4' ) ).toEqual( null );
                expect( Cookie.get( '__saber_s4', rawOption ) ).toEqual(
                    null
                );

                Cookie.set( '__saber_s5', rawText );
                expect( Cookie.get( '__saber_s5' ) ).toEqual( rawText );
                expect( Cookie.get( '__saber_s5', rawOption ) ).toEqual(
                    encodeURIComponent( rawText )
                );

            });

            it(
                'should set a cookie with given name and value'
                + ' when `options.raw = true`.',
                function() {

                    Cookie.set( '__saber_s6', rawText, rawOption );
                    expect( Cookie.get( '__saber_s6' ) ).toEqual(
                        rawText
                    );
                    expect( Cookie.get( '__saber_s6', rawOption ) ).toEqual(
                        rawText
                    );

                }
            );

            it( 'should do nothing with given invalid name', function() {

                var emptyKey = '';
                Cookie.set( emptyKey, '?' );
                expect( Cookie.get( emptyKey ) ).toEqual( null );
                
                var nullKey = null;
                Cookie.set( nullKey, '?' );
                expect( Cookie.get( nullKey ) ).toEqual( null );

                var undefinedKey;
                Cookie.set( undefinedKey, '?' );
                expect( Cookie.get( undefinedKey ) ).toEqual( null );

            });

        });


        describe( 'remove', function() {

            it( 'should remove a cookie with given name.', function() {

                Cookie.set( '__saber_r1', 'x' );
                Cookie.remove( '__saber_r1' );
                expect( Cookie.get( '__saber_r1' ) ).toEqual( null );

                Cookie.set( '__saber_r2', 'y', {
                    expires: new Date( 2020, 1, 1 ),
                    path: '/'
                });
                Cookie.remove( '__saber_r2', { path: '/' } );
                expect( Cookie.get( '__saber_r2' ) ).toEqual( null );

                Cookie.set( '__saber_r3', 'z', {
                    expires: new Date( 2020, 1, 1 ),
                    path: '/'
                });
                Cookie.remove( '__saber_r3' );
                expect( Cookie.get( '__saber_r3' ) ).toEqual( 'z' );

            });

        });

    });

});
