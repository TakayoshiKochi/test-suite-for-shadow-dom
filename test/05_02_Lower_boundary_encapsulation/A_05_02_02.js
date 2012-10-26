// Copyright 2012 Google Inc. All Rights Reserved.
var A_05_02_02 = {
    name:'A_05_02_02',
    assert:'Each insertion point participates in distribution by providing ' +
        'a matching criteria for the child nodes. The matching criteria determines whether ' +
        'a given node could be distributed to a given insertion point',
    link:'http://www.w3.org/TR/shadow-dom/#lower-boundary-encapsulation'
};

var A_05_02_02_T1 = async_test('A_05_02_02_T01', PROPS(A_05_02_02, {
    author:'Sergey G. Grekhov (sgrekhov@unipro.ru)',
    reviewer:''
}));

A_05_02_02_T1.step(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'resources/bobs_page.html';
    document.body.appendChild(iframe);

    iframe.onload = A_05_02_02_T1.step_func(function () {
        try {
            var d = iframe.contentDocument;
            var ul = d.querySelector('ul.stories');
            var s = new SR(ul);

            //make shadow subtree
            var subdiv1 = document.createElement('div');
            subdiv1.innerHTML = '<ul><content select=".shadow"></content></ul>';
            s.appendChild(subdiv1);

            var subdiv2 = document.createElement('div');
            subdiv2.innerHTML = '<ul><content select=".shadow2"></content></ul>';
            s.appendChild(subdiv2);

            var subdiv3 = document.createElement('div');
            subdiv3.innerHTML = '<ul><content select="img"></content></ul>';
            s.appendChild(subdiv3);

            var subdiv4 = document.createElement('div');
            subdiv4.innerHTML = '<ul><content select="img"></content></ul>';
            s.appendChild(subdiv4);

            var subdiv5 = document.createElement('div');
            subdiv5.innerHTML = '<ul><content select="li"></content></ul>';
            s.appendChild(subdiv5);


            // Check the distribution.
            // After the distribution the order should be the following (starting from top):
            // li3, li6, li4, li1, li2, li5, li10, li11, li12, li13, li14, li15
            assert_true(d.querySelector('#li3').offsetTop < d.querySelector('#li6').offsetTop,
                'Point 1: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li6').offsetTop < d.querySelector('#li4').offsetTop,
                'Point 2: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li4').offsetTop < d.querySelector('#li1').offsetTop,
                'Point 3: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li1').offsetTop < d.querySelector('#li2').offsetTop,
                'Point 4: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li2').offsetTop < d.querySelector('#li5').offsetTop,
                'Point 5: Elements that mach insertion point criteria don\'t participate in distribution');

            assert_true(d.querySelector('#li5').offsetTop < d.querySelector('#li11').offsetTop,
                'Point 6: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li11').offsetTop < d.querySelector('#li12').offsetTop,
                'Point 7: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li12').offsetTop < d.querySelector('#li13').offsetTop,
                'Point 8: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li13').offsetTop < d.querySelector('#li14').offsetTop,
                'Point 9: Elements that mach insertion point criteria don\'t participate in distribution');
            assert_true(d.querySelector('#li14').offsetTop < d.querySelector('#li15').offsetTop,
                'Point 10: Elements that mach insertion point criteria don\'t participate in distribution');
        } finally {
            iframe.parentNode.removeChild(iframe);
        }
        A_05_02_02_T1.done();
    });
});
