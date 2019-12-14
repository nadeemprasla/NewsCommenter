$(document).ready(function () {
    $("#scraping").on("click", function () {
        $(".headline").text("Scraping...Scraping...Still Scraping")
    })

    $(".heart").on("click", function (e) {
        isSaved = e.target.dataset.saved
        id = e.target.id
        console.log(e)
        if (isSaved == "false") {
            $("#" + id).attr("src", "https://img.icons8.com/cotton/64/000000/like--v3.png")
            $("#" + id).attr("data-saved", "true")
            $.post("/add", {
                id: e.target.dataset.articleid,
                saved: "true",
                hearturl: "https://img.icons8.com/cotton/64/000000/like--v3.png"
            }, (updatedArticle) => {
                console.log(updatedArticle)


            })
        }
        else {
            $("#" + id).attr("src", "https://img.icons8.com/pastel-glyph/64/000000/like--v1.png")
            $("#" + id).attr("data-saved", "false")
            $.post("/add", {
                id: e.target.dataset.articleid,
                saved: "false",
                hearturl: "https://img.icons8.com/pastel-glyph/64/000000/like--v1.png"
            }, (updatedArticle) => {
                value = e.target.baseURI
                value = value.search("/saved")
                if (value > 0) {
                    $("#" + id).parent().parent().removeClass()
                    $("#" + id).parent().parent().html("")
                }
            })
        }
    })


    $(".note").on("click", function (e) {
        console.log(e)
        openId = e.target.dataset.articleid;
        console.log(openId)
        $("#noteModal").modal("toggle")
        $("#noteModal").attr("data-articleid", e.target.dataset.articleid)
        $.get("/getNote/" + openId, (updatedNote) => {
            // console.log(updatedNote)
            $(".modal-title").val(updatedNote.note.title)
            $("#noteBody").val(updatedNote.note.body)

        })
    })


    $('#noteModal').on('hidden.bs.modal', function (e) {
        console.log(e)
        title = $(".modal-title").val()
        body = $("#noteBody").val()
        id = $("#noteModal").attr("data-articleid");
        console.log(id)
        if (title && body && id) {

            $.post("/note", {
                id: id,
                title: title,
                body: body
            }, (updatedNote) => {
                // console.log(updatedNote)
                $(".modal-title").val("")
                $("#noteBody").val("")
                $("#noteModal").attr("data-articleid", "")


            })
        }
    })







})
