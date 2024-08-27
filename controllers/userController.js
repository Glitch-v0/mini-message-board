const db = require("../db/queries")

async function renderIndexPage(req, res){
    console.log('Loading messages')
    const messages = await db.getAllMessages()
    console.log({messages})
    res.render("index", { title: "Mini Message Board", messages })
}

async function renderNewMessagePage(req, res) {
    res.render("new", { title: "New Message" })
}

async function createNewMessage(req, res) {
    const newMessage = req.body
    console.log('Creating new message:')
    await db.createNewMessage(newMessage)
    const loadedNewMessages = await db.getAllMessages()
    console.log({loadedNewMessages})
    res.render("index", { title: "Mini Message Board", messages:loadedNewMessages })
}

async function viewMessage(req, res) {
    const messageID = req.params.id
    console.log(messageID)
    const messageToView = await db.viewMessage(messageID)
    if (messageToView) {
        const formattedDate = new Date(messageToView.added).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // 24-hour format
        });
        messageToView.added = formattedDate;

        res.render("message", { title: "Message Details", messageToDisplay: messageToView });
    } else {
        res.status(404).send("Message not found");
    }
}

async function renderInvalidPageError(req, res) {
    res.render("error", { title: "Error", error: "Page Not Found" })
}

module.exports = {
    renderIndexPage,
    renderNewMessagePage,
    renderInvalidPageError,
    createNewMessage,
    viewMessage
}