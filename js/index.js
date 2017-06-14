var score=0;
var clicks=0;
$(document).ready(function(){
	var n;
	$("#easy").click(function(){
		score=0;
		clicks=0;
		for(var i=0;i<usedAlpha.length;i++)
			usedAlpha[i]=false;
		for(var i=0;i<randBox.length;i++)
			randBox[i]=false;
		init(1);
		n=1;
	});
	$("#diff").click(function(){
		score=0;
		clicks=0;
		for(var i=0;i<usedAlpha.length;i++)
			usedAlpha[i]=false;
		for(var i=0;i<randBox.length;i++)
			randBox[i]=false;
		init(2);n=2;
	});

var usedAlpha=new Array(9);
var newAlpha=new Array(16);
var randBox=new Array(16);

var card_values = [];
var card_ids = [];
var cards_flipped = 0;

function NewCard(n)	//For placing alphabets in cards
{ 
	for(var i=0; i<8; i++)
	{
		newAlpha[i+8]=newAlpha[i]=NewAlpha(n);
	}
	if(n==1)
	{
		for(var i=0;i<16;i++)
		{
			document.getElementById(GenerateId()).innerHTML=newAlpha[i];
		}
	}
	else if(n==2)
	{
		for(var i=0;i<16;i++)
		{
			document.getElementById(GenerateId()).innerHTML='<img src="'+ newAlpha[i].img +'" id="'+newAlpha[i].name+'">';
		}
	}
}

function NewAlpha(n)		//For generating random alphabets
{
	var alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var newNum;
	if(n==1)
	{
		do
		{
			newNum=Math.floor(Math.random()*26);
		}while(usedAlpha[newNum]);

		usedAlpha[newNum]=true;
		return alphabet[newNum];
	}
	else if(n==2)
	{
		do
		{
			newNum=Math.floor(Math.random()*8);
		}while(usedAlpha[newNum]);

		usedAlpha[newNum]=true;
		return pics[newNum];
	}
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
	$("#"+id1).parent().css({"background":"rgba(255,255,255,0.5)","color":"white"}).parent().removeClass("box");
	$("#"+id1).contents().unwrap();
	
	$("#"+id2).parent().css({"background":"rgba(255,255,255,0.5)","color":"white"}).parent().removeClass("box");
	$("#"+id2).contents().unwrap();
}

function cardFlip()			//For flipping two cards and checking
{
	if(n==1)
	{
		val=$(this).children().children().text();
	}
	else if(n==2)
	{
		val=$(this).children().children().children().attr("id");
	}
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
function init(n)
{
	AddCards();
	NewCard(n);
	$("#turns").text("Turns = "+clicks);
	$("#score").text("Score = "+(score-clicks));
	for(var i=0;i<16;i++)
	{
		document.getElementsByClassName("box")[i].onclick=cardFlip;
	}
}
});