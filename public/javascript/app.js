$(document).on("click", ".add-article", function () {
    var id = $(this).val();
    var article = {}
    article.story_id=id;
    article.title = $("." + id).children().children(".link").text();
    article.link = $("." + id).children().children(".link").attr("href");
    article.summry = $("." + id).children(".summary").text();
    console.log("data saved " ,article)

    $.ajax({
        method: "POST",
        url: "/addarticles",
        data: article

    }).then(function (data) {
        console.log("data saved ")
        window.location.reload();

    });
})
 var scrape =true
$(document).on("click", ".scrape", function () {
    if(scrape){
   console.log("am in scrape ")
    $.ajax({
        method: "GET",
        url: "/"
    }).then(function (data) {
        console.log(data);
        // window.location.reload();
        scrape=false;
    // }).then(function(){
        
     });
   
}else{
    console.log("whats up  ")
    $(".modal").modal('show');
  
}
});





$(document).on("click", ".remove-article", function () {
    var thisId = $(this).val();
    $.ajax({
        method: "POST",
        url: "/rmvarticles/" + thisId,

    })
        .then(function (data) {
            window.location.reload();

        });
});
$(document).on("click", ".add-note", function () {
    var id = $(this).val();
    console.log(id)
    $.ajax({
        method: "GET",
        url: "/note/" + id
    }).then(function (data) {
        console.log(data);
        $(".saved-note").text(data.note.body)
        $(".remove").val(data.note._id);
    });

    $(".save").val(id);
    $(".modal-title").text("Note for Article :" + id);
    $(".modal").modal('show');

})

$(document).on("click", ".save", function (req, res) {
    var id = $(this).val();
    console.log(id);
    if ($(".note").val() === "") {
        $(".modal").modal('hide');
        return;
    }
    $.ajax({
        method: "POST",
        url: "/addnote/" + id,
        data: {
            body: $(".note").val()
        }
    }).then(function (data) {

        $(".save").val("");
        $(".modal-title").text("");
        $(".saved-note").text("");
        $(".note").val("");
        window.location.reload();
    });
})
$(document).on("click", ".close", function (req, res) {
    $(".save").val("");
    $(".modal-title").text("");
    $(".saved-note").text("");
})
$(document).on("click", ".remove", function (req, res) {
    var id = $(this).val();
    $.ajax({
        method: "POST",
        url: "/removenote/" + id

    }).then
        (function (data) {

            $(".save").val("");
            $(".modal-title").text("");
            $(".saved-note").text("");
            window.location.reload();
        })
})
