

let userList = []

module.exports = {
    addUser: function (user) {
        if (userList.length > 0) {
            userList.find((elm, index, arr) => {
                if (elm.id_user == user.id_user) {
                    arr.splice(index, 1, user)
                    return
                }
            })
            userList.push(user)
        }
        else {
            userList.push(user)
        }

    },

    getUserList: function () {
        return userList
    },

    getUserbyId: function (id) {
        var user = userList.find(elm => elm.id_user == id)
        if (user != null)
            return user
    },
    getUserbySocketId: function (id) {
        var user = userList.find(elm => elm.id_socket == id)
        if (user != null)
            return user
    },

    setId_socket: function (id_user, id_socket) {
        userList.find(elm => {
            if (elm.id_user == id_user) {
                elm.id_socket = id_socket
                elm.status = "online"
                return
            }
        })
    }


}