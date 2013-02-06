/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_00_01 = {
    name:'A_06_00_01',
    assert: 'Styles: ' +
		'CSS rules declared in an enclosing tree must not apply in a shadow tree ' +
		'if apply-author-styles flag is set to false for this tree',
    link:'http://www.w3.org/TR/shadow-dom/#styles',
    highlight:'[[To enforce upper-boundary encapsulation, CSS rules declared in an enclosing tree ' + 
    	'must not apply in a shadow tree,]] except when the apply-author-styles flag is set for this ' +
    	'tree. The flag signals that the rules declared in the enclosing trees are applicable in ' +
    	'the shadow tree.'
};

//test apply-author-styles flag of ShadowRoot object (default value)
test(unit(function (ctx) {
	
    var d = newRenderedHTMLDocument(ctx);

    d.head.innerHTML = '<style>' +
		'.invis {' +
		'display:none;' +
		'}' +
		'</style>';
    
    var host = d.createElement('div');
    d.body.appendChild(host);

	//Shadow root to play with
	var s = createSR(host);
	
	var div1 = d.createElement('div');
	div1.innerHTML ='<span id="shd" class="invis">This is the shadow tree</span>'; 
	s.appendChild(div1);
	
	//apply-author-styles flag is false by default. Invisible style shouldn't be applied
	assert_true(isVisible(s.querySelector('#shd')),
    	'CSS styles declared in enclosing tree must not be applied in a shadow tree ' +
    	'if the apply-author-styles flag is set to false');


}), 'A_06_00_01_T01', PROPS(A_06_00_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


//test apply-author-styles flag of ShadowRoot object (set it)
test(unit(function (ctx) {
	
    var d = newRenderedHTMLDocument(ctx);

    d.head.innerHTML = '<style>' +
		'.invis {' +
		'display:none;' +
		'}' +
		'</style>';
    
    var host = d.createElement('div');
    d.body.appendChild(host);

	//Shadow root to play with
	var s = createSR(host);
	s.applyAuthorStyles = false;
	
	var div1 = d.createElement('div');
	div1.innerHTML ='<span id="shd" class="invis">This is the shadow tree</span>'; 
	s.appendChild(div1);
	
	//apply-author-styles flag is set to false. Invisible style shouldn't be applied
	assert_true(isVisible(s.querySelector('#shd')),
    	'CSS styles declared in enclosing tree must not be applied in a shadow tree ' +
    	'if the apply-author-styles flag is set to false');


}), 'A_06_00_01_T02', PROPS(A_06_00_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

//test apply-author-styles flag in a nested tree (default value)
test(unit(function (ctx) {
	
    var d = newRenderedHTMLDocument(ctx);

    d.head.innerHTML = '<style>' +
		'.invis {' +
		'display:none;' +
		'}' +
		'</style>';
    
    var host = d.createElement('div');
    d.body.appendChild(host);

	//Shadow root to play with
	var s1 = createSR(host);
	
	var div1 = d.createElement('div');
	div1.innerHTML = '<span id="shd1" class="invis">This is an old shadow tree</span>'; 
	s1.appendChild(div1);
	
	//younger tree
	var s2 = createSR(host);	
	var div1 = d.createElement('div');
	div1.innerHTML = '<span id="shd2" class="invis">This is a young shadow tree</span>' + 
		'<shadow><span id="shd3" class="invis">This is the shadow tree fallback content</span></shadow>'; 
	s2.appendChild(div1);
	
	
	//apply-author-styles flag is false by default. Invisible style shouldn't be applied
	//shd1 and shd2 should be visible. sh3 not because the tree should be active
	assert_true(isVisible(s1.querySelector('#shd1')),
    	'Point 1: CSS styles declared in enclosing tree must not be applied in a shadow tree ' +
    	'if the apply-author-styles flag is set to false');
	assert_true(isVisible(s2.querySelector('#shd2')),
	    'Point 2: CSS styles declared in enclosing tree must not be applied in a shadow tree ' +
	    'if the apply-author-styles flag is set to false');
	assert_false(isVisible(s2.querySelector('#shd3')),
		'Fallback content shouldn\'t be rendered for active tree');


}), 'A_06_00_01_T03', PROPS(A_06_00_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


//test apply-author-styles flag in a nested tree (set it)
test(unit(function (ctx) {
	
    var d = newRenderedHTMLDocument(ctx);

    d.head.innerHTML = '<style>' +
		'.invis {' +
		'display:none;' +
		'}' +
		'</style>';
    
    var host = d.createElement('div');
    d.body.appendChild(host);

	//Shadow root to play with
	var s1 = createSR(host);
	s1.applyAuthorStyles = false;
	
	var div1 = d.createElement('div');
	div1.innerHTML = '<span id="shd1" class="invis">This is an old shadow tree</span>'; 
	s1.appendChild(div1);
	
	//younger tree
	var s2 = createSR(host);	
	var div1 = d.createElement('div');
	div1.innerHTML = '<span id="shd2" class="invis">This is a young shadow tree</span>' + 
		'<shadow><span id="shd3" class="invis">This is the shadow tree fallback content</span></shadow>'; 
	s2.appendChild(div1);
	
	
	//apply-author-styles flag is set to false. Invisible style shouldn't be applied
	//shd1 and shd2 should be visible. sh3 not because the tree should be active
	assert_true(isVisible(s1.querySelector('#shd1')),
    	'Point 1: CSS styles declared in enclosing tree must not be applied in a shadow tree ' +
    	'if the apply-author-styles flag is set to false');
	assert_true(isVisible(s2.querySelector('#shd2')),
    	'Point 2: CSS styles declared in enclosing tree must not be applied in a shadow tree ' +
    	'if the apply-author-styles flag is set to false');
	assert_false(isVisible(s2.querySelector('#shd3')),
		'Fallback content shouldn\'t be rendered for active tree');


}), 'A_06_00_01_T04', PROPS(A_06_00_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));
