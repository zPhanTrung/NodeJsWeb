const User = require("../manager/user")
const userManager = require("../manager/userManager")
const userService = require("../service/userService")
const chatService = require("../service/chatService")

module.exports.run = function (io) {
    io.on("connection", function (socket) {
        //console.log(socket.id + "ket noi")
        socket.on("disconnect", function () {
            var _user = userManager.getUserbySocketId(socket.id)
            if(_user!=null)
                _user.setStatus("offline")
        })

        socket.on("message-chat", async function (data) {
            var id = data.send_to_id_user
            var user_receive = userManager.getUserbyId(id)
            var user_send = userManager.getUserbySocketId(socket.id)
            var user_receive_db = await userService.getUserById(id)
            var id_socket
            var id_user_send
            var id_user_receive
            if (user_receive_db != null) {
                if (user_receive != null)
                    id_socket = user_receive.id_socket

                var message = {}
                message.id_user = user_send.id_user
                message.content = data.content
                message.time = data.time
                id_user_send = user_send.id_user
                id_user_receive = user_receive_db.id_user

                var res = await chatService.saveMessage(id_user_send, id_user_receive, message)
                if (res) {
                    if (user_receive.getStatus() == "online") {
                        var data_emit = { content: data.content, id_user_send: id_user_send, time:data.time }
                        io.to(id_socket).emit("message-chat", data_emit)
                    }

                    socket.emit("status-send-message", "sended")
                }
                else {
                    socket.emit("status-send-message", "error")
                }
            }

        })

        socket.on("send-id-user", function (data) {
            userManager.setId_socket(data, socket.id)
        })



    })
}


