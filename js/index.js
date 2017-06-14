var score=0;
var clicks=0;
$(document).ready(function(){
	init();
	$("#reload").click(function(){
		score=0;
		clicks=0;
		for(var i=0;i<usedAlpha.length;i++)
			usedAlpha[i]=false;
		for(var i=0;i<randBox.length;i++)
			randBox[i]=false;
		init();
	});
});
var usedAlpha=new Array(9);
var newAlpha=new Array(16);
var randBox=new Array(16);

var card_values = [];
var card_ids = [];
var cards_flipped = 0;

function NewCard()	//For placing alphabets in cards
{ 
	for(var i=0; i<8; i++)
	{
		newAlpha[i+8]=newAlpha[i]=NewAlpha();
	}
	for(var i=0;i<16;i++)
	{
		document.getElementById(GenerateId()).innerHTML=newAlpha[i];
	}
}

function NewAlpha()		//For generating random alphabets
{
	var alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var newNum;
	do
	{
		newNum=Math.floor(Math.random()*26);
	}while(usedAlpha[newNum]);

	usedAlpha[newNum]=true;
	return alphabet[newNum];
}
function GenerateId()		//For generating random ids
{
	var randId;
	do
	{
		randId=Math.floor(Math.random()*16);
	}while(randBox[randId]);

	randBox[randId]=true;
	return randId;
}

function Disable(id1,id2)		//For disabling a pair of cards
{
	$("#"+id1).parent().css({"background":"rgba(111,21,231,0.0)","color":"white"}).parent().removeClass("box");
	$("#"+id1).contents().unwrap();
	
	$("#"+id2).parent().css({"background":"rgba(111,21,231,0.0)","color":"white"}).parent().removeClass("box");
	$("#"+id2).contents().unwrap();
}

function cardFlip()			//For flipping two cards and checking
{

	val=$(this).children().children().text();
	id=$(this).children().children().attr("id");

	if(val && card_values.length < 2)
	{
		//$(this).children().toggleClass("hide");
		
		flip(this);
		
		if(card_values.length == 0)
		{
			card_values.push(val);
			card_ids.push(id);
		} 
		else if(card_values.length == 1 &&card_ids[0]!=id)
		{
			card_values.push(val);
			card_ids.push(id);
			clicks++;
			$("#turns").text("Turns = "+clicks);
			if(card_values[0] == card_values[1])
			{
				cards_flipped += 2;
				Disable(card_ids[0] , card_ids[1]);
				score+=10;
				$("#score").text("Score = "+(score-clicks));
				// Clear both arrays
				card_values = [];
            	card_ids = [];
				// Check to see if the whole board is cleared
				if(cards_flipped == 16)
				{
					//alert("Final Score: "+(score-clicks));
					$(".blank").text();
				}
			} 
			else 
			{
				setTimeout(flip2Back, 800);
			}
		}
		else if(card_values.length == 1 &&card_ids[0]==id)
		{
			flip2Back();
		}
	}
	$(".blank").text(score+"   "+clicks);
}
function flip2Back()		//For flipping back
{
    $("#"+card_ids[0]).parent().parent().removeClass("flipped");
    $("#"+card_ids[1]).parent().parent().removeClass("flipped");
    // Clear both arrays
    card_values = [];
    card_ids = [];
}
function flip(which) 
{
    $(which).addClass('flipped');
}
function AddCards()
{
	var card="";
	for(var i=0;i<16;i++)
	{
		if(i % 4 == 0)
		{	
			card += "<div class='row'>";
		}
		card += '<div class="flip3D col-3 box"><div class="front colorbox"></div><div class="back colorbox"><span id="'+i+'"></span></div></div>';
		if(i % 4 == 3)
		{
			card += "</div>";
		}
	}
	$('.cardbox').html(card);
}
function init()
{
	AddCards();
	NewCard();
	$("#turns").text("Turns = "+clicks);
	$("#score").text("Score = "+(score-clicks));
	for(var i=0;i<16;i++)
	{
		document.getElementsByClassName("box")[i].onclick=cardFlip;
	}
}