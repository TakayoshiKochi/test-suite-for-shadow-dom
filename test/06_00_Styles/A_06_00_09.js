/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/


var A_06_00_09 = {
    name:'A_06_00_09',
    assert:'Styles:' +
        'the styles of the shadow host are inherited by the children of the shadow root',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles',
    highlight:'the styles of the shadow host are inherited by the children of the shadow root'
};


test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = '' + 
    	'<div id="shHost" style="font-size:10px">' +
    	'<span id="spn1">This is a shadow host child</span>' +
    	'</div>';

    var host = d.querySelector('#shHost');
    
	var s = createSR(host);
	
	var div = d.createElement('div');	
	div.innerHTML ='<span id="spn2">This is a shadow root child</span>'; 
	s.appendChild(div);
	
	assert_false(isVisible(d.querySelector('#spn1')),
		'Element should not be rendered');
	assert_true(isVisible(s.querySelector('#spn2')),
		'Element should be rendered');
	
	var oldHeight = s.querySelector('#spn2').offsetHeight;
	
	host.setAttribute('style', 'font-size:20px');
	
	assert_true(s.querySelector('#spn2').offsetHeight > oldHeight,
		'Shadow host style must be aplied to the shadow root children');
	
}), 'A_06_00_09_T01', PROPS(A_06_00_09, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));




test(unit(function (ctx) {
	var d = newRenderedHTMLDocument(ctx);
    
    d.body.innerHTML = 
    	'<ul class="cls" style="font-size: 10px">' +
    		'<li id="li1" class="shadow">1</li>' +
    		'<li id="li2" class="shadow2">2</li>' +
    		'<li id="li3" class="shadow">3</li>' +
    		'<li id="li4">4</li>' +
    		'<li id="li5" class="shadow">5</li>' +
    		'<li id="li6" class="shadow2">6</li>' +
    	'</ul>';

    var host = d.querySelector('.cls');
	//Shadow root to play with
	var s = createSR(host);
	
	var div = d.createElement('div');	
	div.innerHTML ='<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	var height1 = d.querySelector('#li1').offsetHeight;
	var height3 = d.querySelector('#li3').offsetHeight;
	var height5 = d.querySelector('#li5').offsetHeight;
	
	host.setAttribute('style', 'font-size: 20px');
	
	assert_true(d.querySelector('#li1').offsetHeight > height1,
		'Point 1: Shadow host style must be aplied to the shadow root children');
	assert_true(d.querySelector('#li3').offsetHeight > height3,
		'Point 2: Shadow host style must be aplied to the shadow root children');
	assert_true(d.querySelector('#li5').offsetHeight > height5,
		'Point 3: Shadow host style must be aplied to the shadow root children');

	
}), 'A_06_00_09_T02', PROPS(A_06_00_09, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));



