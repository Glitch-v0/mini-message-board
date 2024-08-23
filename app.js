const express = require("express");
const path = require("node:path");
const app = express();

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath))

//date formatting
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Covers 4th to 20th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function formatDate(date) {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric',hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions).toLowerCase();
    
    return `${formattedDate.replace(day, day + suffix)} ${formattedTime}`;
}

// sample messages
const messages = [
    {
      text: "Hi there!",
      user: "Amanda",
      added: formatDate(new Date()),
      id: Date.now()
    },
    {
      text: "Hey, did you get that super secret message I sent you?",
      user: "Charles",
      added: formatDate(new Date()),
      id: Date.now()+1
    },
    {
      text: "Howdy friends!",
      user: "Bubba",
      added: formatDate(new Date()),
      id: Date.now()+2
    }
  ];


app.get("/", (req, res) => res.render("index", { title: "Mini Message Board", messages }));
app.get("/new", (req, res) => res.render("new", { title: "New Message" }));
app.post("/new", (req, res) => {
    // get message data from form and send back to home page
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date(), id: Date.now() });
    res.redirect("/");
})
app.get("/message/:id", (req, res) => {
    const messageID = parseInt(req.params.id)
    const messageToDisplay = messages.find(message => message.id === messageID)
    res.render("message", { title: "Message Details", messageToDisplay });
})

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });