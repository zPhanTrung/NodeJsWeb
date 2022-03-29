
var client = require("./connect")


module.exports = {
    saveMessage: async function (id_user1, id_user2, data) {
        try {
            await client.connect();
            var db = client.db("chatApp")
            var col = db.collection("conversation")

            var res = await col.findOne({ id_users: { $all: [id_user1, id_user2] } })

            var message = []
            if (res != null) {
                newContent = { id_user: data.id_user, content: data.content, time: data.time }
                await col.updateOne(
                    { _id: res._id },
                    { $push: { message: newContent } }
                )
            }
            else {
                var document = {}
                document.id_users = [id_user1, id_user2]
                document.type = "private"
                message.push({ id_user: data.id_user, content: data.content, time: data.time })
                document.message = message
                await col.insertOne(document)
            }
            return true

        }
        catch (e) {
            console.log(e.stack)
            return false
        }
        finally {
            await client.close();
        }
    },

    removeAllMessage: async function (user1, user2, data) {
        try {
            await client.connect();
            var db = client.db("chatApp")
            var col = db.collection("conversation")

            var res = col.findOne({ id_users: { $all: [user1, user2] } })
            if (res != null) {
                await col.updateOne(
                    { _id: res._id },
                    { $unset: { message: "" } }
                )
                return true
            }
            else {
                return false
            }

        }
        catch (e) {
            console.log(e.stack)
            return false
        }
        finally {
            await client.close();
        }

    },

    getMessage: async function (req, res) {
        try {
            await client.connect();
            var db = client.db("chatApp")
            var col = db.collection("conversation")

            var user1 = req.body.user1
            var user2 = req.body.user2

            var result = await col.findOne({ id_users: { $all: [user1, user2] } })
            if (result != null) {
                res.send(result.message)
            }
            else {
                res.send("not message")
            }
        }
        catch (e) {
            console.log(e.stack)
            res.send("fail")
        }
        finally {
            await client.close();
        }
    }
}
