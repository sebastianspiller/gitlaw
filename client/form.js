TemplateController('form', {
    state: {
        branches: [],
    },
    onCreated() {
        Array.prototype.remove = function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };

        this.autorun(() => {
            if (!this.subscriptionsReady()) {
                return
            }

            const gitTree = GitTree.find().fetch()
            const branches = []
            gitTree.forEach((node) => {
                if ('branch' === node.command) {
                    branches.push(node.subject)
                }
            })
            gitTree.forEach((node) => {
                if ('merge' === node.command) {
                    branches.remove(node.subject)
                }
            })

            this.state.branches = branches
        })
    },
    events: {
        'submit .document-data'(e) {
            e.preventDefault()

            const recipient = $('#recipient').val()
            const businessSign = $('#businessSign').val()
            const beaId = $('#beaId').val()
            const subject = $('#subject').val()
            const message = $('#message').val()

            if (!recipient || !beaId || !subject || !message) {
                return
            }

            $('.document-data').trigger('reset')

            Meteor.call('submitDocumentData', {
                recipient, businessSign, beaId, subject, message
            }, function (error, result) {
                if (error) {
                    console.error(error)
                }

                console.info(result)
            })
        },
        'click .merge-btn'(event) {
            event.preventDefault()

            const subject = $('#merge-branch').val()

            if (!subject) {
                return
            }

            Meteor.call('submitMerge', {
               subject
            }, function (error, result) {
                if (error) {
                    console.error(error)
                }

                console.info(result)
            })
        },
        'click .delete-btn'(e) {
            e.preventDefault()

            if (confirm('Are you sure you want to restart?')) {
                // Save it!
                Meteor.call('dropCollections', {}, function (error, result) {
                    if (error) {
                        console.error(error)
                    }

                    console.info(result)
                })
            } else {
                // Do nothing!
                console.log('Thing was not restarted.');
            }
        },
    },
})