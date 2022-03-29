
var client = require("./connect")


module.exports.getAvatarUser = async function (id_user) {

    try {
        await client.connect();
        var db = client.db("chatApp")
        var col = db.collection("user")
        var result = await col.findOne({ "id_user": id_user })
        var avatar = result.info.avatar

        return avatar

    }
    catch (e) {
        console.log(e.stack)
    }
    finally {
        await client.close();
    }

}

module.exports.checkLogin = async function (username, password) {

    try {
        await client.connect();
        var db = client.db("chatApp")
        var col = db.collection("user")
        var result = await col.findOne({ "account.username": username, "account.password": password })
        if (result != null)
            return result.id_user
    }
    catch (e) {
        console.log(e.stack)
    }
    finally {
        await client.close();
    }

}

module.exports.getUserById = async function (id) {

    try {
        await client.connect();
        var db = client.db("chatApp")
        var col = db.collection("user")
        var result = await col.findOne({ "id_user": id })
        if (result != null)
            return result
    }
    catch (e) {
        console.log(e.stack)
    }
    finally {
        await client.close();
    }

}