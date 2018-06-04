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
           console.log(data);
           
        });
})