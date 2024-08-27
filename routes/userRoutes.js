const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/", userController.renderIndexPage)
router.get("/new", userController.renderNewMessagePage)
router.post("/new", userController.createNewMessage)
router.get("/message/:id", userController.viewMessage)
router.get("/*", userController.renderInvalidPageError)

module.exports = router