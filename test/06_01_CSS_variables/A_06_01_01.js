/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_01_01 = {
    name:'A_06_01_01',
    assert: 'CSS variables: ' +
		'The shadow host styles being inherited by the children of the shadow root must also ' +
		'apply to CSS Variables.',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#css-variables',
    highlight:'The shadow host styles being inherited by the children of the shadow root must ' +
    	'also apply to CSS Variables.'
};

//TODO For now (November, 2012) CSS variables support is not implemented yet
// so this test won't work. Treat it as a placeholder for now
test(unit(function (ctx) {
	
    var d = newRenderedHTMLDocument(ctx);
    d.head.innerHtml = '' +
    	'<style>' +
    	'body {font-size:10px;}' +
    	'</style>';

	d.body.innerHTML = 
		'<ul id="shHost">' +
			'<li id="li1" class="shadow">1</li>' +
			'<li id="li2" class="shadow2">2</li>' +
			'<li id="li3" class="shadow">3</li>' +
			'<li id="li4">4</li>' +
			'<li id="li5" class="shadow">5</li>' +
			'<li id="li6" class="shadow2">6</li>' +
		'</ul>';
	
	
	var host = d.querySelector('#shHost');
	var s = new SR(host);

	var div = d.createElement('div');	
	div.innerHTML ='<ul><content select=".shadow"></content></ul>'; 
	s.appendChild(div);
	
	var defHeight1 = d.querySelector('#li1').offsetHeight;
	var defHeight3 = d.querySelector('#li3').offsetHeight;
	var defHeight5 = d.querySelector('#li5').offsetHeight;
	
	var style = d.createElement('style');	
	style.innerHTML =':root {' +
		'var-text-size: 30px;' +
		'}' +
		'body {' +
		'font-size: var(text-size);' + 
		'}'; 
	s.appendChild(style);
	
	assert_true(d.querySelector('#li1').offsetHeight > defHeight1, 'Point 1: Element height should be changed');
	assert_true(d.querySelector('#li3').offsetHeight > defHeight3, 'Point 2: Element height should be changed');
	assert_true(d.querySelector('#li5').offsetHeight > defHeight5, 'Point 3: Element height should be changed');
	
}), 'A_06_01_01_T01', PROPS(A_06_01_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

