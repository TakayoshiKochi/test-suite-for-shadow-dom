/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_07_02_02 = {
    name:'A_07_02_02',
    assert:'User Interaction: ' +
        'The navigation order within a shadow tree must be computed as a list of focusable elements ' +
    	'in tree order as-rendered',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#focus-navigation',
    highlight: 'The navigation order within a shadow tree must be computed as a list of focusable elements ' +
    	'in tree order as-rendered'
};


var A_07_02_02_T01 = async_test('A_07_02_01_T01', PROPS(A_07_02_02, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));

A_07_02_02_T01.step(unit(function (ctx) {
	
	var counter = 0;
	
	var d = newRenderedHTMLDocument(ctx);	
	
	var host = d.createElement('div');
	d.body.appendChild(host);
	
	var chb1 = d.createElement('input');
	chb1.setAttribute('type', 'checkbox');
	chb1.setAttribute('id', 'chb1');
	chb1.addEventListener('focus', A_07_02_02_T01.step_func(function(event) {
		assert_true(false, 'Element shouldd\'t be rendered');  	
	}), false);
	host.appendChild(chb1);
	
	var chb2 = d.createElement('input');
	chb2.setAttribute('type', 'checkbox');
	chb2.setAttribute('id', 'chb2');
	chb2.setAttribute('class', 'shadow');
	chb2.addEventListener('focus', A_07_02_02_T01.step_func(function(event) {
		assert_equals(counter++, 0, 'Point 1: wrong focus navigation order');  	
	}), false);	
	host.appendChild(chb2);
	
	var chb3 = d.createElement('input');
	chb3.setAttribute('type', 'checkbox');
	chb3.setAttribute('id', 'chb2');
	chb3.setAttribute('class', 'shadow');
	chb3.addEventListener('focus', A_07_02_02_T01.step_func(function(event) {
		assert_equals(counter++, 1, 'Point 2: wrong focus navigation order');
	}), false);	
	host.appendChild(chb3);
	
	var s = new SR(host);
	
	var div = d.createElement('div');
	div.innerHTML = '<content select=".shadow"></content>';
	s.appendChild(div);
    
	var inp1 = d.createElement('input');
	inp1.setAttribute('type', 'text');
	inp1.setAttribute('id', 'shInp1');
	inp1.setAttribute('value', 'Input 1');
	inp1.addEventListener('focus', A_07_02_02_T01.step_func(function(event) {
		assert_equals(counter++, 2, 'Point 3: wrong focus navigation order');
	}), false);
	s.appendChild(inp1);
	
	var inp2 = d.createElement('input');
	inp2.setAttribute('type', 'text');
	inp2.setAttribute('id', 'shInp2');
	inp2.setAttribute('value', 'Input 2');
	inp2.addEventListener('focus', A_07_02_02_T01.step_func(function(event) {
		assert_equals(counter++, 3, 'Point 4: wrong focus navigation order');
	}), false);	
	s.appendChild(inp2);
	
	var chb4 = d.createElement('input');
	chb4.setAttribute('type', 'checkbox');
	chb4.setAttribute('id', 'chb2');
	chb4.addEventListener('focus', A_07_02_02_T01.step_func(function(event) {
		assert_equals(counter++, 4, 'Point 5: wrong focus navigation order');
	}), false);	
	d.body.appendChild(chb4);
	
	chb2.focus();
	
	//simulate TAB clicks	
	fireKeyboardEvent(d, chb2, 'U+0009');
	
	fireKeyboardEvent(d, chb3, 'U+0009');
	
	fireKeyboardEvent(d, inp1, 'U+0009');
	
	fireKeyboardEvent(d, inp2, 'U+0009');
	
	fireKeyboardEvent(d, chb4, 'U+0009');
	    
    A_07_02_02_T01.done();
}));
