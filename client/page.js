TemplateController('page', {
    state: {
        page: undefined,
    },
    onCreated() {
        this.autorun(() => {
            if (!this.subscriptionsReady()) {
                return
            }

            const page = DocumentData.findOne({_id: FlowRouter.getParam('documentDataId')})
            this.state.page = page
        })
    },
    onRendered() {
        $('#pageModal').modal('show');
    },
})