// Copyright 2012 Google Inc. All Rights Reserved.

var A_05_05_02 = {
    name: 'A_05_05_02',
    assert: 'Hosting Multiple Shadow Subtrees:'
    	+ 'If multiple shadow insertion points exist in a shadow DOM subtree, ' + 
    	+ 'only the first, in tree order, is recognized.',
    link:'http://www.w3.org/TR/shadow-dom/#multiple-shadow-subtrees'
};



var A_05_05_02_T1 = async_test('A_05_05_02_T01', PROPS(A_05_05_02, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_05_02_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_05_02_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
                                    
            //make the oldest shadow subtree
            var s1 = new SR(ul);
            var subdiv1 = d.createElement('div');
            subdiv1.innerHTML = '<ul><content select="#li1"></content></ul>';
            s1.appendChild(subdiv1);
                        
            //make an old shadow subtree
            var s2 = new SR(ul);
            var subdiv2 = d.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s2.appendChild(subdiv2);
            
            //make the youngest shadow subtree
            var s3 = new SR(ul);
            var subdiv3 = d.createElement('div');
            subdiv3.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s3.appendChild(subdiv3);
            
            //add a shadow insertion point for the old tree
            s3.appendChild(d.createElement('shadow'));
            //add another shadow insertion point for the older tree.
            //Shouldn't match
            s3.appendChild(d.createElement('shadow'));
            
            
            //The order of DOM elements should be the following:
            //li4, li3, li6 visible. Other elements invisible
            assert_true(d.querySelector('#li4').offsetTop > 0,
                'Only the younger tree should take part in the distribution');
            assert_true(d.querySelector('#li3').offsetTop > d.querySelector('#li4').offsetTop,
        		'Point 1: Older tree should take part in the distribution');
            assert_true(d.querySelector('#li6').offsetTop > d.querySelector('#li3').offsetTop,
        		'Point 2: Older tree should take part in the distribution');            

            assert_equals(d.querySelector('#li1').offsetTop, 0,
                'The oldest tree shouldn\'t take part in the distribution');
            assert_equals(d.querySelector('#li2').offsetTop, 0,
                'Point 3: Elements that don\'t mach insertion point criteria participate in distribution');
            assert_equals(d.querySelector('#li5').offsetTop, 0,
                'Point 4: Elements that don\'t mach insertion point criteria participate in distribution');
                
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_05_02_T1.done();
    });
});