/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_00_06 = {
    name:'A_06_00_06',
    assert:'Events:' +
        'CSS rules declared in a shadow root style sheets must not apply in the document tree,',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles',
    highlight:'[[Conversely, to enforce lower-boundary encapsulation, CSS rules declared in ' +
    	'a shadow root style sheets must not apply in the document tree,]] with two exceptions:'
};

//check querySelector method
test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = 
    	'<div>' +
    		'<span class="invis" id="theTreeSpan">This is an element in the document tree</span>' +
    	'</div>' +
    	'<div id="sr">' +
    	'</div>';

	var host = d.querySelector('#sr');
	
	//Shadow root to play with
	var s = new SR(host);
	
	var style = d.createElement('style');
	style.innerHTML ='.invis {display:none}'; 
	s.appendChild(style);
	
	var span = d.createElement('span');
	span.setAttribute('id', 'theShadowSpan');
	span.setAttribute('class', 'invis');
	s.appendChild(span);
	
	//theTreeSpan should be visible, theShadowSpan not
	assert_true(d.querySelector('#theTreeSpan').offsetTop > 0,
		'CSS styles declared in shadow tree must not be applied to the elements ' +
		'in the document tree');

	//theTreeSpan should be visible, theShadowSpan not
	assert_equals(s.querySelector('#theShadowSpan').offsetTop, 0,
		'CSS styles declared in shadow tree must be applied to the element ' +
		'in the same shadow tree');
	
}), 'A_06_00_06_T01', PROPS(A_06_00_06, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));