$(document).ready(function () {
    $("#scraping").on("click", function () {
        $(".headline").text("Scraping...Scraping...Still Scraping")
    })

    $(".heart").on("click", function (e) {
        isSaved = e.target.dataset.saved
        console.log(e)
        id = e.target.id
        console.log(id)
        if (isSaved == "false") {
            $("#" + id).attr("src", "https://img.icons8.com/cotton/64/000000/like--v3.png")
            $("#" + id).attr("data-saved", "true")
            $.post("/add", {
                id: e.target.dataset.articleid,
                saved: "true",
                hearturl: "https://img.icons8.com/cotton/64/000000/like--v3.png"
            }, (e) => {
                console.log(e)
    
            })
        }
        else {
            $("#" + id).attr("src", "https://img.icons8.com/pastel-glyph/64/000000/like--v1.png")
            $("#" + id).attr("data-saved", "false")
            $.post("/add", {
                id: e.target.dataset.articleid,
                saved: "true",
                hearturl: "https://img.icons8.com/pastel-glyph/64/000000/like--v1.png"
            }, (e) => {s
                console.log(e)
    
            })
        }
    })








})
