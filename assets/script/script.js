//Globals

    //Button Hooks
    var $searchBtn = $("#search-btn");
    var $clearBtn = $("#clear-btn");


    function clear () {
        $("#results-article").empty();
        $("#search-input").empty();
    }

    function searchNY() {
        $searchInput = $("#search-input");
        q = $searchInput.val();
        bd = $("#start-year-input").val();
        ed = $("#end-year-input").val();

        url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "44707c6f51e24148a732fcfb57bd9e6c",
            'q': q,
            'begin_date': bd,
            'end_date': ed
            
        });
      

        $.get(url).then(function (result) {

            $recordInput = $("#record-input");
            recordNum = $recordInput.val();
            
            var articleAdd = function(len) {
            for (i=0; i < len; i++){
                
                headline = result.response.docs[i].headline.main;
                snippet = result.response.docs[i].snippet;
                articleLink = result.response.docs[0].web_url;
        
                articleResult = $("#results-article");
    
                divCard = $("<div>")
                    .addClass("card border-dark mb-3 article-result")
                    .attr("style", "width: 90%;margin: 10px auto;");
    
                divHead = $("<div>")
                    .html("<a href='" + articleLink + "' target='_blank'>" + headline + "<a>")
        
                    .attr("style", "font-weight:bold;font-size:24px;");
    
                divBody = $("<div>")
                    .addClass("card-body")
                    .text(snippet);
    
                divCard.append(divHead)
                divCard.append(divBody)
                articleResult.append(divCard)
            }
           };

           resultFive = result.response.docs.length - 5;
           resultTen = result.response.docs.length;
           resultFifteen = result.response.docs.length + 5;

           if (recordNum == 5) {
             articleAdd(resultFive)
           } else if (recordNum == 10) {
             articleAdd(resultTen)
           } 
      
            console.log(result)
         });

    }


    $(document).on('click', "#search-btn", function() {
        $("#results-article").empty();
        searchNY()
    })

    $(document).on("click", "#clear-btn", function() {
        clear();
    })