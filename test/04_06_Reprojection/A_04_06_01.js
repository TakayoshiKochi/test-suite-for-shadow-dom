/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_06_01 = {
    name: 'A_04_06_01',
    assert: 'Reprojection: ' +
        'The nodes distributed into that insertion point must appear as if they were child nodes ' +
        'of the shadow host in the context of distribution within the shadow DOM subtree, hosted by ' +
        'said shadow host',
    //TODO change the link to the working draft when ready
    link: 'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#reprojection',
    highlight: 'In such situations, [[the nodes distributed into that insertion point must appear ' +
    'as if they were child nodes of the shadow host in the context of distribution within the ' +
    'shadow tree, hosted by said shadow host]]'
};

var A_04_06_01_T01 = async_test('A_04_06_01_T01', PROPS(A_04_06_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_04_06_01_T01.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_06_01_T01.step_func(function () {
        try {
            var d = iframe.contentDocument;
            
            var div = d.createElement('div');
            div.innerHTML = '' + 
            	'<ul id="host">' +
            		'<li id="li1" class="shadow">' +
            			'<a id="a11" class="cl1" href="#">Link11 Shadow</a>' +
            			'<a id="a12" class="cl2" href="#">Link12 Shadow</a>' +
            			'<a id="a13" class="cl1" href="#">Link13 Shadow</a>' +
            		'</li>' +
            		'<li id="li2">' +
	        			'<a id="a21" href="#">Link21</a><a id="a22" href="#">Link22</a>' +
	        		'</li>' +
            		'<li id="li3" class="shadow">' +
	        			'<a id="a31" href="#">Link31 Shadow</a><a id="a32" href="#">Link32 Shadow</a>' +
	        		'</li>' +
            		'<li id="li4" class="shadow2">' +
	        			'<a id="a41" href="#">Link41 Shadow 2</a><a id="a42" href="#">Link22 Shadow 2</a>' +
	        		'</li>' +
            		'<li id="li5" class="shadow2">' +
	        			'<a id="a51" href="#">Link51 Shadow</a><a id="a52" href="#">Link52 Shadow 2</a>' +
	        		'</li>' +
            	'</ul>';
            
            d.body.appendChild(div);
            
            var li1 = d.querySelector('#li1');
            var s = createSR(li1);
            //make shadow subtree
            var shadowLI1 = document.createElement('li');
            shadowLI1.innerHTML = '<li><content select=".cl1"></content></li>';
            s.appendChild(shadowLI1);
            
            var ul = d.querySelector('#host');
            var s2 = createSR(ul);
            var div2 = document.createElement('div');
            div2.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s2.appendChild(div2);


            assert_true(d.querySelector('#li1').offsetTop > 0, 'Point 1: Node that match insertion ' +
            	'point criteria should be rendered');
            assert_true(d.querySelector('#li3').offsetTop > 0, 'Point 2: Node that match insertion ' +
            	'point criteria should be rendered');
            assert_equals(d.querySelector('#li2').offsetTop, 0, 'Point 3: Node that does not match ' +
            	'insertion point criteria shouldn\'t be rendered');
            assert_equals(d.querySelector('#li4').offsetTop, 0, 'Point 4: Node that does not match ' +
            	'insertion point criteria shouldn\'t be rendered');
            assert_equals(d.querySelector('#li5').offsetTop, 0, 'Point 5: Node that does not match ' +
            	'insertion point criteria shouldn\'t be rendered');

            //check the nested tree
            assert_true(d.querySelector('#a11').offsetTop > 0,
                'Point 6: Aleady distributed nodes should behave like a shadow host child nodes');
            assert_true(d.querySelector('#a13').offsetTop > 0,
            	'Point 7: Aleady distributed nodes should behave like a shadow host child nodes');
            assert_equals(d.querySelector('#a12').offsetTop, 0,
            	'Point 8: Aleady distributed nodes should behave like a shadow host child nodes');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_06_01_T01.done();
    });
});



var A_04_06_01_T02 = async_test('A_04_06_01_T02', PROPS(A_04_06_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_04_06_01_T02.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/blank.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_06_01_T02.step_func(function () {
        try {
            var d = iframe.contentDocument;
            
            var div = d.createElement('div');
            div.innerHTML = '' + 
            	'<ul id="host">' +
            		'<li id="li1" class="shadow">' +
            			'<a id="a11" class="cl1" href="#">Link11 Shadow</a>' +
            			'<a id="a12" class="cl2" href="#">Link12 Shadow</a>' +
            			'<a id="a13" class="cl1" href="#">Link13 Shadow</a>' +
            		'</li>' +
            		'<li id="li2">' +
	        			'<a id="a21" href="#">Link21</a><a id="a22" href="#">Link22</a>' +
	        		'</li>' +
            		'<li id="li3" class="shadow">' +
	        			'<a id="a31" href="#">Link31 Shadow</a><a id="a32" href="#">Link32 Shadow</a>' +
	        		'</li>' +
            		'<li id="li4" class="shadow2">' +
	        			'<a id="a41" href="#">Link41 Shadow 2</a><a id="a42" href="#">Link22 Shadow 2</a>' +
	        		'</li>' +
            		'<li id="li5" class="shadow2">' +
	        			'<a class="cl1" id="a51" href="#">Link51 Shadow</a><a id="a52" href="#">Link52 Shadow 2</a>' +
	        		'</li>' +
            	'</ul>';
            
            d.body.appendChild(div);
            
            var li1 = d.querySelector('#li1');
            var s = createSR(li1);
            //make shadow subtree
            var shadowLI1 = document.createElement('li');
            shadowLI1.innerHTML = '<li><content select=".cl1"></content></li>';
            s.appendChild(shadowLI1);
            
            var ul = d.querySelector('#host');
            var s2 = createSR(ul);
            var div2 = document.createElement('div');
            div2.innerHTML = '<li><content select=".cl1"></content></li>';
            s2.appendChild(div2);

            // The second distribution shouldn't render anything
            assert_equals(d.querySelector('#li1').offsetTop, 0, 'Point 1: Node that does not match ' +
                'insertion point criteria shouldn\'t be rendered');
            assert_equals(d.querySelector('#li2').offsetTop, 0, 'Point 2: Node that does not match ' +
                'insertion point criteria shouldn\'t be rendered');
            assert_equals(d.querySelector('#li3').offsetTop, 0, 'Point 3: Node that does not match ' +
            	'insertion point criteria shouldn\'t be rendered');
            assert_equals(d.querySelector('#li4').offsetTop, 0, 'Point 4: Node that does not match ' +
            	'insertion point criteria shouldn\'t be rendered');
            assert_equals(d.querySelector('#li5').offsetTop, 0, 'Point 5: Node that does not match ' +
            	'insertion point criteria shouldn\'t be rendered');

            //check the nested tree
            assert_equals(d.querySelector('#a11').offsetTop, 0,
                'Point 6: Aleady distributed nodes should behave like a shadow host child nodes');
            assert_equals(d.querySelector('#a13').offsetTop,  0,
            	'Point 7: Aleady distributed nodes should behave like a shadow host child nodes');
            assert_equals(d.querySelector('#a12').offsetTop, 0,
            	'Point 8: Aleady distributed nodes should behave like a shadow host child nodes');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_06_01_T02.done();
    });
});