//score object
function Score(){ this.init(); }

Score.prototype = 
	{
	txt 	: null,

	nbtry	: 0,

	nbconv	: 0,

	nbobj	: 0,

	htmlok	: null,

	htmlko	: null,

	doneTime: 0,

	timer	: function(){ this.doneTime = new Date() - this.doneTime; },

	getTime	: function(){ return (this.doneTime/1000).toFixed(3) +"s"; },

	resetTime: function(){ this.doneTime = new Date(); },

	init	: function(){ this.doneTime = new Date(); }
	}


function Scores( id , lvl )
	{
	this.id = id;
	this.lvl= lvl;
	this.data	= [];
	}

Scores.prototype = 
	{
	id		: null,

	lvl		: null,	
		
	data	: [],

	good	: 0,

	total	: function(){return this.data.length;},

	add		: function(score){this.data.push(score);}
	}

	
document.app.AllScores = 
	{
	done	: [],		
	data	: [],
	
	add : function( scores )
		{
		this.done[scores.id+'_'+scores.lvl] = true;
		this.data.push(scores);	
		}
	}