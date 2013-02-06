/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_04_05_01 = {
    name:'A_04_05_01',
    assert:'Hosting Multiple Shadow Subtrees:' +
    	'The shadow insertion point designates a place in the shadow DOM subtree, ' + 
    	'where an older tree is inserted when rendering',
    link:'http://www.w3.org/TR/shadow-dom/#multiple-shadow-subtrees',
    highlight: 'The shadow insertion point designates a place in the shadow tree, ' +
    	'where an older tree is inserted when rendering.',
};



var A_04_05_01_T1 = async_test('A_04_05_01_T01', PROPS(A_04_05_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));


// Check that only the younger tree is visible if there's no shadow insertion point
A_04_05_01_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_05_01_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
                                    
            //make old shadow subtree
            var s1 = createSR(ul);
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s1.appendChild(subdiv1);
                        
            //make younger shadow subtree
            var s2 = createSR(ul);
            var subdiv2 = d.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s2.appendChild(subdiv2);
            
            //The order of DOM elements should be the following:
            //li4 visible. Other elements invisible
            assert_true(isVisible(d.querySelector('#li4')),
                'Only the younger tree should take part in the distribution');

            assert_false(isVisible(d.querySelector('#li1')),
                'Point 1: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li2')),
                'Point 2: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li3')),
                'Point 3: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li5')),
                'Point 4: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li6')),
            	'Point 5: Elements that don\'t match insertion point criteria participate in distribution');
                
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_04_05_01_T1.done();
    });
});



//Check that both the younger tree and the older one are visible 
//if there's a shadow insertion point for the older tree
var A_04_05_01_T2 = async_test('A_04_05_01_T02', PROPS(A_04_05_01, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_04_05_01_T2.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_04_05_01_T2.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
                                    
            //make old shadow subtree
            var s1 = createSR(ul);
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s1.appendChild(subdiv1);
                        
            //make younger shadow subtree
            var s2 = createSR(ul);
            var subdiv2 = d.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s2.appendChild(subdiv2);
            
            //add a shadow insertion point for the older tree
            s2.appendChild(d.createElement('shadow'));
            
            //The order of DOM elements should be the following:
            //li4, li3, li6 visible. Other elements invisible
            assert_true(isVisible(d.querySelector('#li4')),
                'Younger tree should take part in the distribution');
            assert_true(d.querySelector('#li3').offsetTop > d.querySelector('#li4').offsetTop,
            	'Point 1: Older tree should take part in the distribution');
            assert_true(d.querySelector('#li6').offsetTop > d.querySelector('#li3').offsetTop,
            	'Point 2: Older tree should take part in the distribution');

            assert_false(isVisible(d.querySelector('#li1')),
                'Point 3: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li2')),
                'Point 4: Elements that don\'t match insertion point criteria participate in distribution');
            assert_false(isVisible(d.querySelector('#li5')),
                'Point 5: Elements that don\'t match insertion point criteria participate in distribution');
        } finally {
        	iframe.parentNode.removeChild(iframe);
        }
        A_04_05_01_T2.done();
    });
});
