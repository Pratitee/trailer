$(document).ready(function(){ 
	var clicked=0,clicked_hoverBox=0,checked=0;
	var listitem,listitem_hoverBox;
	var item,item_hoverBox;
	
$('[data-toggle="tooltip"]').tooltip(); 
	
$( "#nextPage11" ).click(function() { 
	$(location).attr('href', 'Survey_page1.html')
});
	
  $( ".wrapper-block" ).mouseover(function(event) {
  
	$(this).find(".img-block").css("outline","2px solid #463856"); 
	$(this).find(".hover-block").show();
});

$( ".wrapper-block" ).mouseout(function(event) {
	if(($(this).find(".hover-block").text()=="Now showing info")) // when img is clicked
		$(this).find(".hover-block").show();
	else
	{
		$(this).find(".hover-block").hide();        // when img is not clicked
	    $(this).find(".img-block").css("outline","none");
	}
});

    $("#movie_1").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_1.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Schindlers list");
	$(".movie-cast").find("span:nth-child(2)").text("Liam Neeson, Ralph Fiennes, Ben Kingsley ");
	$(".movie-plot").find("span:nth-child(2)").text("In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.");
	$(".movie_info").show();
	});
	
    $("#movie_2").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_2.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Harry potter(Goblet of Fire)");
	$(".movie-cast").find("span:nth-child(2)").text("Daniel Radcliffe, Emma Watson, Rupert Grint");
	$(".movie-plot").find("span:nth-child(2)").text("Harry finds himself mysteriously selected as an under-aged competitor in a dangerous tournament between three schools of magic.");
	$(".movie_info").show();
	});
	
    $("#movie_3").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_3.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Usual Suspects");
	$(".movie-cast").find("span:nth-child(2)").text(" Kevin Spacey, Gabriel Byrne, Chazz Palminteri");
	$(".movie-plot").find("span:nth-child(2)").text("A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which begin when five criminals meet at a seemingly random police lineup.");
	$(".movie_info").show();
	});
	
    $("#movie_4").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_4.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Lord of The Rings");
	$(".movie-cast").find("span:nth-child(2)").text("Elijah Wood, Ian McKellen, Orlando Bloom ");
	$(".movie-plot").find("span:nth-child(2)").text("A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle Earth from the Dark Lord Sauron.");
	$(".movie_info").show();
	});
	
    $("#movie_5").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_5.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Liar Liar");
	$(".movie-cast").find("span:nth-child(2)").text("Jim Carrey, Maura Tierney, Justin Cooper");
	$(".movie-plot").find("span:nth-child(2)").text("A fast-track lawyer can't lie for 24 hours due to his son's birthday wish after he turns his son down for the last time.");
	$(".movie_info").show();
	});
	
    $("#movie_6").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_6.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("La La Land");
	$(".movie-cast").find("span:nth-child(2)").text("Ryan Gosling, Emma Stone, Rosemarie DeWitt ");
	$(".movie-plot").find("span:nth-child(2)").text("A jazz pianist falls for an aspiring actress in Los Angeles.");
	$(".movie_info").show();
	});
	
    $("#movie_7").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_7.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Titanic");
	$(".movie-cast").find("span:nth-child(2)").text("Leonardo DiCaprio, Kate Winslet, Billy Zane ");
	$(".movie-plot").find("span:nth-child(2)").text("A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.");
	$(".movie_info").show();
	});
	
    $("#movie_8").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_8.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Conjuring");
	$(".movie-cast").find("span:nth-child(2)").text("Patrick Wilson, Vera Farmiga, Ron Livingston");
	$(".movie-plot").find("span:nth-child(2)").text("Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.");
	$(".movie_info").show();
	});
	
    $("#movie_9").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_9.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Polar Express");
	$(".movie-cast").find("span:nth-child(2)").text("Tom Hanks, Chris Coppola, Michael Jeter ");
	$(".movie-plot").find("span:nth-child(2)").text("A young boy embarks on a magical adventure to the North Pole on the Polar Express. During his adventure he learns about friendship, bravery, and the spirit of Christmas.");
	$(".movie_info").show();
	});
	
    $("#movie_10").click(function() {
	$(".intro").hide();
	$("#fillMovie").attr('src', 'img/m_10.jpg');
	$(".movie_img").show();
	$(".movie-title").find("span").text("Hangover");
	$(".movie-cast").find("span:nth-child(2)").text("Zach Galifianakis, Bradley Cooper, Justin Bartha");
	$(".movie-plot").find("span:nth-child(2)").text("Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.");
	$(".movie_info").show();
	});
	
    
$( ".hover-block" ).click(function() {
  if(clicked_hoverBox==1)
	{		
		$(".movie-block:nth-of-type("+parseInt(item_hoverBox+11)+")").find(".hover-block").text("Click to read info");
		$(".movie-block:nth-of-type("+parseInt(item_hoverBox+11)+")").find(".img-block").css("outline","none");
		$(".movie-block:nth-of-type("+parseInt(item_hoverBox+11)+")").find(".hover-block").hide();
		$(".highlight:nth-of-type("+parseInt(item_hoverBox+1)+")").css("background-color","#957ad6");					
	}  
	listitem_hoverBox=$(this).parents(".movie-block");
	item_hoverBox=listitem_hoverBox.index(".movie-block");	
	$(".movie_img").show();
	$(this).text("Now showing info");
	clicked_hoverBox=1;
	$("#movie_display_block").css("outline","5px solid #463856"); //change
	$(".highlight:nth-of-type("+parseInt(item_hoverBox+1)+")").css("background-color","#463856"); //change
});


$('input[type=radio][name^=rating_],input[type=radio][name^=known]').change(function() {
	if(($('input[type=radio][name^=rating_]:checked').length === 10)&&($('input[type=radio][name^=known]:checked').length === 10))
	{
		$(".next-button").children("button").css({"cursor":"pointer","opacity":"1","background-color":"#b4d98c"});
		$(".next-button").children("button").removeAttr('disabled');
	}
});

});