$(document).on("click",".add-article",function(){
     var id=$(this).val();
     var article={}
     article.title=$("."+id).children().children(".link").text();
     article.link=$("."+id).children().children(".link").attr("href");
     article.summry=$("."+id).children(".summary").text();

     
     $.ajax({
        method: "POST",
        url: "/addarticles",
        data: article
        
      }).then(function(data) {
          console.log("data saved ")
        window.location.reload();

        });
})
$.ajax({
    method: "GET",
    url: "/"
  }).then(function(data) {
      console.log(data);

    });

$(document).on("click", ".remove-article", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).val();
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/rmvarticles/" + thisId,
      
    })
      .then(function(data) {
        window.location.reload();
        
      });

    });
