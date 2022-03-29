
var client = require("./connect")


module.exports.getFriendList = async function (id_user) {

    try {
        await client.connect();
        var db = client.db("chatApp")
        var col = db.collection("user")
        var result = await col.findOne({ "id_user": id_user })
        var id_friends = result.friends

        var info_friends = []

        if (id_friends != null) {
            for (id of id_friends) {
                var user = await col.findOne({ "id_user": id })

                var info_friend = {
                    id_user: user.id_user,
                    name: user.info.name,
                    avatar: user.info.avatar
                }
                info_friends.push(info_friend)
            }
        }
        return info_friends

    }
    catch (e) {
        console.log(e.stack)
    }
    finally {
        await client.close();
    }

}