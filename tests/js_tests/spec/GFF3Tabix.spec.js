require([
            'dojo/_base/array',
            'dojo/_base/lang',
            'dojo/request/xhr',
            'JBrowse/Browser',
            'JBrowse/Model/XHRBlob',
            'JBrowse/Util/GFF3',
            'JBrowse/Store/SeqFeature/GFF3/Parser',
            'JBrowse/Store/SeqFeature/GFF3Tabix'
        ], function(
            array,
            lang,
            xhr,
            Browser,
            XHRBlob,
            GFF3,
            Parser,
            GFF3TabixStore
        ) {

describe( 'GFF3 store', function() {
   it( 'can parse volvox_tabix.gff3.gz', function() {
           var p = new GFF3TabixStore({
                                     browser: new Browser({ unitTestMode: true }),
                                     file: new XHRBlob( '../../sample_data/raw/volvox/volvox.sort.gff3.gz' ),
                                     tbi: new XHRBlob( '../../sample_data/raw/volvox/volvox.sort.gff3.gz.tbi' ),
                                     refSeq: { name: 'ctgA', start: 0, end: 50001 }
                                 });
           (function() {
               var features = [];
               var done;

               p.getFeatures(
                   { ref: 'ctgA', start: 1, end: 50000 },
                   function(f) { features.push(f); },
                   function() { done = true; },
                   function(e) { console.error(e); }
               );

               waitsFor( function() { return done; } );
               runs( function() {
                         //console.log( features );
                         expect( features.length ).toEqual( 197 );
                         console.log(features.length);
                         var edenIndex;
                         array.some( features, function(f,i) {
                                         if( f.get('name') == 'EDEN' ) {
                                             edenIndex = i;
                                             return true;
                                         }
                                         return false;
                                     });
                         expect( edenIndex ).toBeGreaterThan( 3 );
                         expect( edenIndex ).toBeLessThan( 7 );
                         expect( features[edenIndex].get('subfeatures').length ).toEqual( 3 );
                         expect( features[edenIndex].get('subfeatures')[0].get('subfeatures').length ).toEqual( 6 );
                     });
           }).call();

           (function() {
               var features = [];
               var done;

               p.getFeatures(
                   { ref: 'ctgA', start: -1, end: 2499 },
                   function(f) { features.push(f); },
                   function() { done = true; },
                   function(e) { console.error(e); }
               );

               waitsFor( function() { return done; } );
               runs( function() {
                         //console.log( features );
                         expect( features.length ).toEqual( 13 );
                         // expect( features[191].get('subfeatures').length ).toEqual( 3 );
                         // expect( features[191].get('subfeatures')[0].get('subfeatures').length ).toEqual( 6 );
                     });
           }).call();

           (function() {
               var features = [];
               var done;

               p.getFeatures(
                   { ref: 'ctgB', start: -1, end: 5000 },
                   function(f) { features.push(f); },
                   function() { done = true; },
                   function(e) { console.error(e); }
               );

               waitsFor( function() { return done; } );
               runs( function() {
                         //console.log( features );
                         expect( features.length ).toEqual( 4 );
                         // expect( features[191].get('subfeatures').length ).toEqual( 3 );
                         // expect( features[191].get('subfeatures')[0].get('subfeatures').length ).toEqual( 6 );
                         expect( features[3].get('note') ).toEqual( 'ああ、この機能は、世界中を旅しています！' );
                     });
           }).call();
   });
});

});
