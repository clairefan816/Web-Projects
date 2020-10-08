// alert("connected");
//check off specific todos by clicking
//click on X to delete Todo
//click only listens on existing item
//click will not listen if new item added
//but on can 
//attention here, the listener should be the one when page load
//if the listener is li, there will be new li added
$("ul").on("click", "li", function(){
    //or do it in css
    $(this).toggleClass("completed");
});

    // //one way to do it
    // //this here is the specific li
    // $(this).css("color", "gray");
    // //strike through
    // $(this).css("text-decoration", "line-through");

    //improved way to do it with an object
    //and here is the logic
    //if li is gray -> turn it black
    //else -> turn it gray
    // if ($(this).css("color") === "rgb(128, 128, 128)"){
    //     $(this).css({
    //         color: "black",
    //         textDecoration: "none"
    //     });
    // }
    // else{
    //     $(this).css({
    //         color: "gray",
    //         textDecoration: "line-through"
    //     });
    // }

//click span then fadeout and remove
$("ul").on("click", "span", function(event){
    //choose span, get the parent-li, and remove li
    $(this).parent().fadeOut(500, function(){
        // this here is parent - li
        $(this).remove();
    });
    //since the click will bubble up automatically
    //which will trigger other functions
    //so we need a stop 
    event.stopPropagation();
});

//only work with enter key
$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        //grabing new todo text from input
        var todoText = $(this).val();
        //setter which reset the text to empty each round
        $(this).val("");
        //create a new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

$(".fa-pencil").click(function(){
    $("input[type='text']").fadeToggle();
});