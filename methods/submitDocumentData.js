Meteor.methods({
    'submitDocumentData'({recipient, businessSign, beaId, subject, message}) {
        check(recipient, String)
        check(businessSign, String)
        check(beaId, String)
        check(subject, String)
        check(message, String)

        const documentId = DocumentData.insert({recipient, businessSign, beaId, subject, message})

        const gitTreeId = GitTree.insert({command: 'branch', recipient, beaId, subject, documentId})

        return gitTreeId
    },
    'submitMerge'({recipient}) {
        const gitTreeId = GitTree.insert({command: 'merge', recipient})
        return gitTreeId
    },
})