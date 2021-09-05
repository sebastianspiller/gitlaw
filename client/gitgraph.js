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
                subject: 'Gerichtsakte vom OLG Düsseldorf', author: " <Judge Faden>", onMessageClick(event) {
                    console.log({this: this, event: event})
                }
            })

            const branchObject= {}
            const nodeBranchObject  = {}
            gitTree.forEach((node) => {
                let branch = null

                switch (node.command) {
                    case 'branch':
                        branch = master.branch(node.recipient)
                        branch.commit({
                            subject: `${node.subject}`, author: ` <${node.beaId}>`, onMessageClick(event) {
                                $(location).attr('href', `/page/${node.documentId}`)
                            }
                        })
                        branchObject[node.recipient] = branch
                        nodeBranchObject[node.recipient] = node
                        break;
                    case 'merge':
                        master.merge({branch: branchObject[node.recipient], commitOptions: {author: ` <Judge Faden>`}})
                        master.tag('verifiziert')
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