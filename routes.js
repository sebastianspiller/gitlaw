FlowRouter.route('/', {
    name: 'start',
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', { main: 'start' })
    }
})

FlowRouter.route('/track', {
    name: 'track',
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', { main: 'track' })
    }
})

FlowRouter.route('/gitgraph', {
    name: 'gitgraph',
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', { main: 'gitgraph' })
    }
})

FlowRouter.route('/login', {
    name: 'login',
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', { main: 'login' })
    }
})