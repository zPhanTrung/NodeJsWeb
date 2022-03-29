const contactService = require("../service/contactService")
const userService = require("../service/userService")
var crypto = require('crypto');
const userManager = require("../manager/userManager");
const User = require("../manager/user");


module.exports = {
    post: async function (req, res) {
        //show contacts
        var userName = req.body.userName
        var password = req.body.password
        var id_user = await userService.checkLogin(userName, password)


        if (id_user != null) {
            var friends = await contactService.getFriendList(id_user)
            var avatar = await userService.getAvatarUser(id_user)
            friend_amount = friends.length

            var name = userName;
            var hash = crypto.createHash('md5').update(name).digest('hex');
            res.cookie("auth", hash)
            res.cookie("id_user", id_user)
            var newUser = new User()
            newUser.setId_user(id_user)
            newUser.setAuth_cookie(hash)
            newUser.setStatus("online")
            userManager.addUser(newUser)

            res.render("chat/index", { layout: "main", friends: friends, avatar: avatar, friend_amount: friend_amount, id_user: id_user })
        }
        else
            res.redirect("/")

    },

    get: async function (req, res) {
        var id = req.cookies.id_user
        var auth = req.cookies.auth
        var user = userManager.getUserbyId(id)

        if (user != null) {
            if (user.getAuth_cookie() == auth) {
                var friends = await contactService.getFriendList(id)
                var avatar = await userService.getAvatarUser(id)
                friend_amount = friends.length
                res.render("chat/index", { layout: "main", friends: friends, avatar: avatar, friend_amount: friend_amount, id_user: id })
            }
            else{
                res.redirect("/")
            }

        }
        else{
            res.redirect("/")
        }

    }


}

