TemplateController('gitgraph', {
    state: {
    },
    onRendered() {
        this.autorun(() => {
            if (!this.subscriptionsReady()) {
                return
            }

            $('#graph-container').empty()

            const gitTree = GitTree.find().fetch()

            // Get the graph container HTML element.
            const graphContainer = document.getElementById("graph-container");

            // Instantiate the graph.
            const gitgraph = GitgraphJS.createGitgraph(graphContainer);

            // Simulate git commands with Gitgraph API.
            const master = gitgraph.branch("123 OH 1/21");

            master.commit({
                subject: 'Court Records of OLG Düsseldorf', author: " <Judge Faden>", onMessageClick(event) {
                    console.log({this: this, event: event})
                }
            })

            const branchObject= {}
            gitTree.forEach((node) => {
                let branch = null

                switch (node.command) {
                    case 'branch':
                        branch = master.branch(node.subject)
                        branch.commit({
                            subject: ``, author: `${node.recipient} <${node.beaId}>`, onMessageClick(event) {
                                $(location).attr('href', `/page/${node.documentId}`)
                            }
                        })
                        branchObject[node.subject] = branch
                        break;
                    case 'merge':
                        master.merge({branch: branchObject[node.subject], commitOptions: {author: ` <Judge Faden>`}})
                        master.tag('verified')
                        break;
                }
            })
        })

        //
        // const develop = master.branch("develop");
        // develop.commit("Add TypeScript");
        //
        // const aFeature = develop.branch("a-feature");
        // aFeature
        //     .commit("Make it work")
        //     .commit("Make it right")
        //     .commit("Make it fast");
        //
        // develop.merge(aFeature);
        // develop.commit("Prepare v1");
        //
        // master.merge(develop).tag("v1.0.0");
        //
        // const aFeature2 = develop.branch("a-feature");
        // aFeature2
        //     .commit("Make it work")
    },
})