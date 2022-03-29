


class User {
    constructor(id_user, name, avatar, id_socket, status, auth_cookie) {
        this.id_user = ""
        this.id_socket = ""
        this.auth_cookie = ""
        this.status = ""
    }

    getId_user() {
        return this.id_user
    }
    setId_user(id) {
        this.id_user = id
    }
    getAvatar() {
        return this.avatar
    }
    setAvatar(avatar) {
        this.avatar = avatar
    }
    getId_socket() {
        return id_socket
    }
    setId_socket(id) {
        this.id_socket = id
    }
    getStatus() {
        return this.status
    }
    setStatus(status) {
        this.status = status
    }
    getAuth_cookie() {
        return this.auth_cookie
    }
    setAuth_cookie(value) {
        this.auth_cookie = value
    }

}

module.exports = User