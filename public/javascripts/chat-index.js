


$(document).ready(function () {
    $("#friendList li").click(function () {
        $("#friendList li").removeClass("active")
        $("#friendList li").css("background-color", "rgb(255, 255, 255)")
        $(this).addClass("active")
        $(this).css("background-color", "rgb(214, 219, 255)")
        contactOpenInterface($(this))
    });

    $("#friendList li").mouseover(function () {
        if (!$(this).hasClass("active"))
            $(this).css("background-color", "rgb(214, 214, 214)")
    });

    $("#friendList li").mouseout(function () {
        if (!$(this).hasClass("active"))
            $(this).css("background-color", "rgb(255, 255, 255)")
    });

    $("#friend-list-search input").focus(function () {
        $(this).css("background-color", "#ffffff")
        $("#friend-list-search div").css("background-color", "#ffffff")
    });

    $("#friend-list-search input").focusout(function () {
        $(this).css("background-color", "#d3d3d3")
        $("#friend-list-search div").css("background-color", "#d3d3d3")
    });

    //event message-input
    $("#message-input").keypress(function (e) {
        if (e.which == 13)
            $("#send-btn").click()
    })

    //meunu-bar
    $("ul#menu-bar li").mouseover(function () {
        if (!$(this).hasClass("active"))
            $(this).css("background-color", "#65b7ff")
    });
    $("ul#menu-bar li").mouseout(function () {
        if (!$(this).hasClass("active"))
            $(this).css("background-color", "#0B8CFA")
    });
    $("ul#menu-bar li").click(function () {
        $("ul#menu-bar li").removeClass("active")
        $("ul#menu-bar li").css("background-color", "#0B8CFA")
        $(this).addClass("active")
        $(this).css("background-color", "#0872ce")
        menuOpenInterface()
    });


    //event open interface
    function getMessage(user1, user2) {
        $.post(`https://chat-web-application-demo.herokuapp.com/chat/getMessage`, { user1: user1, user2: user2 }, function (data) {
            if (data.length > 0) {
                data.forEach(element => {
                    if (element.id_user == user1) {
                        var avatar = $("#avatar-user").attr("src")
                        appendMessage(element.content, avatar, element.time, "", true)
                    }
                    else {
                        var avatar = $("#chat-box-avatar").attr("src")
                        appendMessage(element.content, avatar, element.time, "", false)
                    }
                });
            }
        })

    }

    function contactOpenInterface(elm) {
        if ($("#add-friend-list").hasClass("active")) {
            $("#chat-box").removeClass("active")
            $("#chat-box").addClass("visually-hidden")
            $("#add-friend-list-detail").removeClass("visually-hidden")
        }
        else if ($("#friend").hasClass("active")) {
            $("#add-friend-list-detail").removeClass("active")
            $("#add-friend-list-detail").addClass("visually-hidden")
            $("#chat-box").removeClass("visually-hidden")
            var avatar = elm.children("img").attr("src")
            var name = elm.children("span").text()
            $("#chat-box-avatar").attr("src", avatar)
            $("#chat-box-name").text(name)
            $("#message-content").attr("data-id-user-receive", elm.attr("data-id-friend"))

            getMessage(getCookie("id_user"), $("#friend").attr("data-id-friend"))
        }
    }

    function menuOpenInterface() {
        if ($("#contacts").hasClass("active")) {
            $("#message-list").removeClass("active")
            $("#message-list").addClass("visually-hidden")
            $("#contact-detail").removeClass("visually-hidden")
        }
        else if ($("#message").hasClass("active")) {
            $("#contact-detail").removeClass("active")
            $("#contact-detail").addClass("visually-hidden")
            $("#message-list").removeClass("visually-hidden")
        }
    }



    //send message

    function appendMessage(content, avatar, time, status, is_user) {
        var msg_user_elm = `<div class="d-flex justify-content-end align-self-end w-100 mb-4">
        <div class="d-flex flex-column p-3 rounded-3" style="max-width:600px;background-color:#E5EFFF">
            <span class="d-block" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" >${content}</span>
            <div class="mt-1">
                <span style="font-size: 13px;">${time}</span>
                <span class="ms-1" style="font-size: 13px;" id="message-status">${status}</span>
            </div>
        </div>
        <div class="mx-3 ">
            <img src="${avatar}" class="rounded-circle" style="width: 40px;height: 40px;">
        </div>
    </div>`

        var msg_no_user_elm = `<div class="d-flex w-100 mb-4">
        <div class="mx-3 ">
            <img src="${avatar}" class="rounded-circle" style="width: 40px;height: 40px;">
        </div>
        <div class="d-flex flex-column p-3 rounded-3" style="max-width:600px;background-color:#E5EFFF">
            <span class="d-block"
                style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${content}</span>
            <div class="mt-1">
                <span style="font-size: 13px;">${time}</span>
                <span class="ms-1" style="font-size: 13px;" id="message-status">${status}</span>
            </div>
        </div>
    </div>`

        if (is_user)
            $("#message-content").append(msg_user_elm)
        else {
            $("#message-content").append(msg_no_user_elm)
        }
    }

    //socketio

    var socket = io("https://chat-web-application-demo.herokuapp.com")

    socket.on("connect", function () {
        var id = getCookie("id_user")
        socket.emit("send-id-user", id)
    })

    socket.on("message-chat", function (data) {
        var id_user_receive = $("#message-content").attr("data-id-user-receive")
        var avatar = $("#chat-box-avatar").attr("src")

        if (id_user_receive == data.id_user_send) {
            appendMessage(data.content, avatar, data.time, "", false)
        }

    })

    socket.on("status-send-message", function (data) {
        if (data == "sended") {
            $("#message-content #message-status").text("")
            var elm = $("#message-content #message-status")
            $(elm[elm.length - 1]).text("Đã gửi")

        }
        else {
            $(elm[elm.length - 1]).text("Lỗi")
        }
    })



    $("#send-btn").click(function () {

        var date = new Date()
        var time = date.getHours() + ":" + date.getMinutes()
        var avatar_user = $("#avatar-user").attr("src")
        var message = $("#message-input").val()
        if (message != "") {
            appendMessage(message, avatar_user, time, "Đang gửi", true)
            $("#message-input").val("")
            var id = $("#friend.active").attr("data-id-friend")
            socket.emit("message-chat", { content: message, send_to_id_user: id, time: time })
        }
    })


    function getCookie(name) {
        var arr = document.cookie.split(/; |;|=|""?/)
        var i = ""
        arr.find((elm, index) => {
            if (elm == name)
                i = index + 1
        })
        return arr[i]
    }

    //logout
    $("#logout").click(function () {
        var id = $("#avatar-user").attr("data-id-user")
        window.location.replace(`https://chat-web-application-demo.herokuapp.com/logout/?id_user=${id}`);
    })

})

