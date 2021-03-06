/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_09_00_01 = {
    name:'A_09_00_01',
    assert:'HTML Elements and Their Shadow Trees: ' +
    	'If the element can have fallback content, UA should allow the shadow tree to contain at least ' +
    	'one insertion point.',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#html-elements-and-their-shadow-trees',
    highlight: 'If the element can have fallback content, contains one insertion point.',
    bug: ['https://bugs.webkit.org/show_bug.cgi?id=102864']
};

//test iframe
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('iframe');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'Iframe should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T01', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test object
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('object');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'object should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T02', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test video
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('video');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'video should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T03', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test audio
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('audio');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'audio should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T04', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test canvas
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('canvas');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'canvas should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T05', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test map
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
    var img = d.createElement('img');
    img.setAttribute('usemap', '#theMap');
    img.setAttribute('width', '20px');
    img.setAttribute('height', '20px');
    d.body.appendChild(img);
	
	
	// create element
    var el = d.createElement('map');
    el.setAttribute('name', 'theMap');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
		'<span id="shadow">This is a node that should be distributed</span>' +
		'<span id="flbk">This is a fallback content</span>';
    
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'map should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T06', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test textarea
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('textarea');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'textarea should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T07', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test progress
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('progress');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'progress should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T08', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));


//test meter
test(unit(function (ctx) {
	
	var d = newRenderedHTMLDocument(ctx);
	
	// create element
    var el = d.createElement('meter');
    d.body.appendChild(el);
    
    el.innerHTML = '' + 
    	'<span id="shadow">This is a node that should be distributed</span>' +
    	'<span id="flbk">This is a fallback content</span>';
    
    var s = createSR(el);
    s.innerHTML = '<content select="#shadow"></content>';

    assert_true(isVisible(d.querySelector('#shadow')), 'meter should allow at least one insertion point');
    assert_false(isVisible(d.querySelector('#flbk')), 'Fallback content shouldn\'t be rendered');
        
}), 'A_09_00_01_T09', PROPS(A_09_00_01, {
	author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer:''
}));
