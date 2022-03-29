
const userService = require("../service/userService")
const userManager = require("../manager/userManager")
const contactService = require("../service/contactService")
const contactsController = require("./contactsController")


module.exports = {
    index: async function (req, res) {
        var id = req.cookies.id_user
        var user = userManager.getUserbyId(id)
        if (user != null) {
            contactsController.get(req, res)
        }
        else
            res.render("login/login", { layout: "default" })
    },

    logout: function (req, res) {
        var id = req.query.id_user
        var user = userManager.getUserbyId(id)
        
        if (user != null){
            user.setAuth_cookie("")
            res.render("login/login", { layout: "default" })
        }
    }

}