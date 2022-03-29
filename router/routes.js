var express = require("express")

var router = express.Router();
const login = require("../controllers/loginController");
const message = require("../controllers/messageController")
const contact = require("../controllers/contactsController")
const chatService = require("../service/chatService")

router.get("/", login.index);
router.post("/chat", contact.post);
router.get("/chat", contact.get);
router.post("/chat/getMessage", chatService.getMessage)
router.get("/logout/*", login.logout)

module.exports = router