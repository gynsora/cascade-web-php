document.app.content = 
{
//== Exercice Datas
/**
 * exercice Id
 */
num : null,
/**
 * exercice Level
 */
lvl	: null,
/**
 * selected exercice data
 */
data: null,
/**
 * selected exercice data size
 */
dataSize : null,
/**
 * Max valid id in exercice conversion list
 */
nbMaxValid : 5, //todo rendre dynamique ?

//== HTML Objects
/**
 * main content html block
 */
contentObj : null,
/**
 * sound html block
 */
sndObj : null,
/**
 * check if entered from buton or logo to know if we have to force to play sound on logo click
 * to be able to enable autoplay on mobile media
 */
sndClick: false,
/**
 * current objectif html content
 */
elementObjectifObj : null,
/**
 * current conversion html content
 */
elementConversionObj : null,
/**
 * Quizz result progress bar object
 */
pBar : null,

//== Quizz datas
/**
 * type : quizz or true/false
 */
quizzType : null,
/**
 * question number 
 */
quizzStep : null,
/**
 * selected quizz data 
 */
quizzData : null,
/**
 * selected quizz size
 */
quizzSize : null,
/**
 * current quizz score
 */
currScores : null,

/**
 * init application
 */
init : function()
	{
	//obj
	this.contentObj = $('ARTICLE .partContent');
	this.sndObj 	= $('#comment');

	//init page global event
	this.initEvent();
	
	//set sound event
	this.loadSound();
	
	if( $('html').attr('manifest')!=null )
		{//case home page
		//status 2 added to fix internet explorer reload when already cached case
		if( window.applicationCache.status==1 || ( document.app.isIE  &&  window.applicationCache.status==2 ))
			{this.loadIntro();}
		else
			{this.loadUpdate(this);}
		}
	else{
		//case cache updating ( and attr manifest == null )
		if( window.applicationCache.status==3 )
			{this.loadUpdate(this);}
		else
			{this.loadIntro();}
		}	
	},
/**
 * init main events
 */
initEvent:function()
	{
	var _that = this;
	
	//click on logo launch back to home 
	$('HEADER IMG').click(function()
		{
		if( $('HTML').attr('manifest')==null )
			{
			var skipSound = !_that.sndClick;
			if(!_that.sndClick)
				{
					//force to play sound if click on logo instead of button
					_that.setSound(document.app.homeSnd);
					_that.sndClick=true;
				}
			_that.loadHome(skipSound);
			}
		else{ 
			//if manifest page, redirect to main page
			document.location = "/"; 
			}
		});
	},
/**
 * set page title
 *@param {string} subTitle : subtitle of the title
 */
setPageTitle : function(subTitle)
	{
	document.title	=	document.app.titleSpeChr 
						+ ' ' 
						+ document.app.titleName 
						+ ' - '
						+ subTitle
						+ ' '
						+document.app.titleSpeChr;
	},
/**
 * set page sound and start it if required
 *@param {string} snd : filename
 *@param {boolean} skip : do not play the sound
 */	
setSound : function(snd,skip)
	{
	var oldMp3 = this.sndObj.attr('src'),
		currMp3= 'upload/snd/'+snd;
	
	if( oldMp3!=currMp3 )
		{
		this.sndObj.attr('src', currMp3 );
		if( document.app.snd && !skip){ this.sndObj[0].play(); }
		}
	},	
/**
 * remove page sound and stop it if required
 */	
removeSound : function()
	{
	this.sndObj[0].pause();
	this.sndObj.removeAttr('src');
	},
/**
 * load exercice objectives list
 */	
loadObjectifList:function()
	{
	var elementListHtml = $('#tpl-objectifList').html();
	var elementObjectifObj = $('<div class="objDiv"></div>');
	
	for( var k=0 ; k<this.dataSize ; k++ )
		{		
		if( !this.data.parts[k].fake )
			{
			var newLine 	= $(elementListHtml);
			var titleLine	= newLine.find('H4'); 

			    var txt;
			    if (this.data.parts[k].nbok == 1) {
				txt = this.data.parts[k].txt;
			    } else {
				txt = this.data.parts[k].txts;
			    }
			    
			titleLine.append(this.data.parts[k].nbok + ' ' + txt);
			
			for( var v=0 ; v<this.data.parts[k].nbok ; v++ )
				{		
				newLine.append('<img src="upload/exercice/ex'+this.num+'/lvl1/'+this.data.parts[k].id+'.png" alt="'+this.data.parts[k].txt+'"/>');
				}
			
			elementObjectifObj.append( newLine );
			}
		}
	
	this.elementObjectifObj = elementObjectifObj;
	},
	
/**
 * load exercice conversion list
 */	
loadConversionList:function()
	{	
	var _that=this;
	var str = '<table class="exMatch">';

	for( var w=0 ; w<this.dataSize ; w++ )
		{	
		if( !this.data.parts[w].fake )
			{
			str+= 	 '<tr>';
			  
			    if( this.lvl > 'niveau 2' ) {
				str += this.loadConvertionListItem (w, 3);				
			    }

			    if( this.lvl > 'niveau 1' ) {
				str += this.loadConvertionListItem (w, 2);				
			    }

			    str += this.loadConvertionListItem (w, 1);

			    str += '<td><img src="upload/exercice/ex'+this.num+'/lvl1/'+this.data.parts[w].id+'.png" title="'+this.data.parts[w].txt+'" alt="'+this.data.parts[w].txt+'"></td>' + '<td><h5>'+this.data.parts[w].txt+'</h5></td></tr>';
			    
			}
		}
	str += '</table>';	
	
	this.elementConversionObj = $(str);
	},

/**
 * load exercice conversion & objectivs list items
 */	
    loadConvertionListItem:function(partidx, assoc)
    {	
	var _that=this;
	var part=this.data.parts[partidx];
    	var ids = part['assoc' + assoc], imgs = "", badge = 1, lvl = assoc + 1;
	var txt = part['assoc' + lvl + 'txt'] || part['txt' + lvl];
	if (assoc > 1) txt = '';
	if (!txt) txt = '';
	if (!ids) ids = [ part.id ];

	// si l'écran est petit, teste si le tableau est constitué d'une valeur unique
	for (var b = 1; b < ids.length; b++) {
	    if (ids[b] != ids[0]) break;

	    if (screen.width < 416) {
		badge ++;
		if (b == ids.length - 1) {
		    ids = [ ids[0] ]
		}
	    }
	}

	$.each (ids, function(index, value) {
	    imgs += '<img src="upload/exercice/ex'+_that.num+'/lvl' + lvl + '/'+value+'.png" title="'+txt+'" alt="'+txt+'">'
	});
	
	return '<td>' + imgs + '</td>'				
	    + '<td><h5>'+txt+'</h5></td>'
	    + '<td><img src="upload/exercice/ex'+this.num+'/arrow' + badge + '.png" class="arrow"></td>';

    },
    
/**
 * load exercice conversion & objectivs list
 */	
loadCommon:function()
	{
	this.loadObjectifList();
	this.loadConversionList();
	},
	
/**
 * load sound object and set events (enable / disable sound)
 */
loadSound : function()
	{
	var sndComment 	= document.querySelector('#comment'),
		sndButton	= document.querySelector('#sound');
		
	//set disabled sound 
	if( !document.app.snd ){sndButton.addClass("off")}
	
	//Click sound event
	sndButton.addEventListener("click", function(e)
		{
		if( document.app.snd )
			{
				this.addClass("off");
				if(sndComment!=null && sndComment.src!=null && sndComment.src!='')
					{					
						sndComment.pause();
						sndComment.currentTime = 0;
					}
			}
		else{
				this.removeClass("off");
				if(sndComment!=null && sndComment.src!=null && sndComment.src!=''){sndComment.play();}
				
			}
		document.app.snd = !document.app.snd;
		});
	},
	
	/****************
	 * PAGES CALL   *
	 * WITH EFFECTS *
	 ****************/
 
	loadUpdate		:function()		{logger("> load content [ loadUpdate ]");var _that=this;this.contentObj.fadeOut(function(){document.app.contentUPDATE.init(_that);});},
	loadIntro		:function()		{logger("> load content [ loadIntro ]"); var _that=this;this.contentObj.fadeOut(function(){document.app.contentINTRO.init(_that);});},
	loadHome 		:function(skip) {logger("> load content [ loadHome ]");  var _that=this;this.contentObj.fadeOut(function(){document.app.contentHOME.init(_that,skip);});},
	loadPart1		:function()		{logger("> load content [ loadPart1 ]"); var _that=this;this.contentObj.fadeOut(function(){document.app.contentP1.init(_that);});},	
	loadPart2		:function()		{logger("> load content [ loadPart2 ]"); var _that=this;this.contentObj.fadeOut(function(){document.app.contentP2.init(_that);});},
	loadPart3		:function()		{logger("> load content [ loadPart3 ]"); var _that=this;this.contentObj.fadeOut(function(){document.app.contentP3.init(_that);});},
	loadPartQuizz	:function()		{logger("> load content [ loadQuizz ]"); var _that=this;this.contentObj.fadeOut(function(){document.app.contentQuizz.init(_that);});},
	loadPartQuizz1	:function()		{logger("> load content [ loadQuizz1 ]");var _that=this;this.contentObj.fadeOut(function(){document.app.contentQuizz1.init(_that);});},
	loadPartQuizz2	:function()		{logger("> load content [ loadQuizz2 ]");var _that=this;this.contentObj.fadeOut(function(){document.app.contentQuizz2.init(_that);});},
	loadPartQuizz3	:function()		{logger("> load content [ loadQuizz3 ]");var _that=this;this.contentObj.fadeOut(function(){document.app.contentQuizz3.init(_that);});}
}

/* ******* *
 *  INTRO  *
 ***********/
document.app.contentINTRO =
{
/**
 * parent object
 */
parent	: null,
/**
 * current html block
 */
currBlock : null,
/**
 * init INTRO page
 * @param {object} parent
 */
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.currBlock = $( $('#tpl-intro').prop('innerHTML') ); 
	this.loadContent();
	this.initEvent();
	this.parent.contentObj.fadeIn();
	this.parent.setPageTitle( document.app.titleSubName );
	},
/**
 * init INTRO events
 */
initEvent:function()
	{
	var _that=this;	
	$('ARTICLE INPUT').click(function()
		{
			_that.parent.loadHome( true );
			_that.parent.setSound(document.app.homeSnd);
			_that.parent.sndClick=true;
		});	
	},
/**
 * init html content
 */
loadContent:function()
	{
	var currBlock = this.currBlock.clone();
	this.parent.contentObj.append(currBlock);
	this.parent.contentObj.find( 'h3' ).html( document.app.homeTitle );
	this.parent.contentObj.find( '.msgIntro' ).html( document.app.homeMessage );
	checkScrollBar();
	}
}

/* ****** *
 *  HOME  *
 **********/
document.app.contentHOME =
{
/**
 * parent object
 */	
parent	: null,
/**
 * current html block
 */
currBlock : null,
/**
 * init HOME page
 * @param {object} parent : parent object
 * @param {boolean} skip : skip sound
 */
init : function(parent,skip)
	{
	var _that=this;
	this.parent = parent;
	this.currBlock = $( $('#tpl-home').prop('innerHTML') ); 
	this.loadContent();
	this.initEvent();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound(document.app.homeSnd , skip);});
	this.parent.setPageTitle( document.app.titleSubName );
	},
/**
 * init HOME events
 */	
initEvent:function()
	{
	var _that=this;
	
	//set each exerice block click event
	$('ARTICLE .linkDiv').click(function()
		{
		//set exerice data in main object
		_that.parent.num 	= $(this).parent().attr( 'ex' );
		_that.parent.lvl 	= $(this).parent().attr( 'lvl' );
		_that.parent.data	= document.app.exercice[ _that.parent.num  ];
		_that.parent.dataSize=_that.parent.data.parts.length;
		
		logger('DATA');
		logger('----------');
		logger(_that.parent.data);
		logger('----------');
		
		//set page title
		_that.parent.setPageTitle( document.app.exercice[ _that.parent.num  ].title + ' ' + _that.parent.lvl );
		logger("selected : exercice [ " + _that.parent.num  + " ] level [ " + _that.parent.lvl + " ]");
		
		//load quizz or exercice level
		_that.parent.lvl == 'quizz' ? 
			_that.parent.loadPartQuizz() : _that.parent.loadPart1();
		});
	},
/**
 * init html content
 */
loadContent:function()
	{
	var _that = this;
		
	//clean display
	this.parent.contentObj.empty();
	
	//adding each exerice block on the home
	for( var z=1 ; z<document.app.exercice.length ; z++ )
		{
		this.parent.contentObj.append( '<h2>Excercice '+document.app.exercice[ z ].title+'</h2>' );	
		this.parent.contentObj.append( '<div class="homeBlock"></div>' );
		//Adding each exercice block
		$.each(document.app.exercice[z].objectif, function(index, value) { _that.loadBlock( z , index ); }); 
		}
	//check if has scroll
	checkScrollBar();
	},
/**
 * load html exerice block
 *@param {number} id : exerice id
 *@param {number} lvl : exercice level
 */	
loadBlock:function( id , lvl )
	{
	var fullTitle = document.app.exercice[id].title + ' ' + lvl;
	var currBlock = this.currBlock.clone();
	
	//set block html datas
	currBlock.attr( 'ex' , id );
	currBlock.attr( 'lvl' , lvl );
	currBlock.find( 'B' ).html( document.app.exercice[id].title );
	currBlock.find( 'SPAN' ).html( lvl );
	currBlock.find( '.caption' ).html( fullTitle );
	currBlock.find('IMG')
		.attr( 'src' , 'upload/exercice/ex' + id + '/home.jpg' )
		.attr( 'alt' , fullTitle );
	
	//set as done if already done
	if( document.app.AllScores.done[ id+'_'+lvl ] )
		currBlock.find('.front.face').addClass('done');
	
	//adding block to home page
	this.parent.contentObj.find('.homeBlock:last').append(currBlock);
	}	
}

/* *********** *
 *  EXO PAGE 1 *
 * *********** */
document.app.contentP1 =  
{
/**
 * parent object
 */		
parent	: null,
/**
 * init PAGE1 page
 * @param {object} parent : parent object
 */
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.parent.currScores = new Scores( this.parent.num , this.parent.lvl );
	this.parent.currScores.data.push( new Score() );
	this.currScore = new Score();
	this.parent.loadCommon();
	this.loadContent();
	this.initEvent();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound(_that.parent.data.sndexo);});
	},
/**
 * init PAGE1 events
 */	
initEvent:function()
	{
	var _that = this;	
	$('ARTICLE .submitBtn').click(function(){ _that.parent.loadPart2(); });
	},	
/**
 * init PAGE1 html content
 */	
loadContent:function()
	{
	this.parent.contentObj.html($('#tpl-part1').html());
	$("ARTICLE .objectifText").html(this.parent.data.exercice);
	$('#commandeList').append(this.parent.elementObjectifObj.clone());
	checkScrollBar();
	}	
}

/* *********** *
 *  EXO PAGE 2 *
 * *********** */
document.app.contentP2 =  
{
/**
 * parent object
 */		
parent	: null,
/**
 * init PAGE2 page
 * @param {object} parent : parent object
 */	
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.loadContent();
	this.initEvent();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound(_that.parent.data.sndconv);});
	},
/**
 * init PAGE2 events
 */	
initEvent:function()
	{
	var _that = this;	
	$('ARTICLE .submitBtn').click(function(){ _that.parent.loadPart3();	});
	},	
/**
 * init PAGE2 html content
 */	
loadContent:function()
	{
	this.parent.contentObj.html($('#tpl-part2').html());
	$("ARTICLE .objectifText").html(this.parent.data.conversion);
	$('#conversionList').append(this.parent.elementConversionObj.clone());
	checkScrollBar();
	}		
}

/* *********** *
 *  EXO PAGE 3 *
 * *********** */
document.app.contentP3 =  
{
/**
 * parent object
 */			
parent	: null,
/**
 * html drag object
 */		
dragObj : null,	
/**
 * html desserte object is loaded ?
 */	
desserteLoaded : false,	
/**
 * current element html object
 */	
elementObj : null,
/**
 * current money html object
 */	
moneyObj : null,	
/**
 * current money2 html object
 */	
moneyObj2 : null,	
/**
 * money button html object
 */	
moneyBtn : null,	
/**
 * init PAGE3 page
 * @param {object} parent : parent object
 */	
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.desserteLoaded = false; //prevent from redisplaying page already set as true
	this.loadContent();
	this.initEvent();
	this.setDroppable();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound(_that.parent.data.objectif[_that.parent.lvl].snd);});
	this.parent.currScores.data[0].resetTime();
	},	
/**
 * init PAGE3 events
 */	
initEvent:function()
	{
	var _that = this;
	//show rules
	$('#exRule').click(		function(e)	{
		_that.parent.currScores.data[0].nbconv++;
		new Popin( _that.parent.elementConversionObj[0].outerHTML );
		});
	//show command
	$('#exCommand').click(	function(e)	{
		_that.parent.currScores.data[0].nbobj++;
		new Popin( _that.parent.elementObjectifObj[0].outerHTML );
		});
	//show result
	$('#exValid').click(	function(e)	{_that.showResult();});
	},	
/**
 * init PAGE3 html content
 */	
loadContent:function()
	{
	var _that = this;	
		
	this.parent.contentObj.html($('#tpl-part3').html());
	
	$("ARTICLE .objectifText").html(this.parent.data.objectif[this.parent.lvl].txt);
	$('#desserte .title').html(this.parent.data.target);		
	$('#desserteBg').css('background-image','url("upload/exercice/ex'+this.parent.num+'/home.jpg")');

	$('.submitBtn').prepend('<input style="background-color: #0e5dd4;" class="hvr-back-pulse blue" id="exMoney" type="button" value="REVOIR LES PIECES">');

	$("#checkout .arrow").hide ();

	//set html object
	this.dragObj 	= $(".exDrag.sel1 .allElements");
	this.elementObj = $(".exDrag.sel2");
	this.moneyObj 	= $(".exDrag.sel3");
	this.moneyObj2 	= $(".exDrag.sel4");
	this.moneyBtn	= $("#exMoney");
	$("#checkout").show ();
	    
	if (_that.parent.lvl == 'niveau 1') {
	    this.moneyBtn.hide ();
	    $("#checkout").hide ();	    
	}
	    
	//set money button event
	this.moneyBtn.click(function()
		{
		_that.moneyObj.hide();
		_that.moneyObj2.hide();
		_that.elementObj.hide();
		_that.dragObj.empty();
		$("#checkout SPAN").empty();
		$("#checkout .arrow").hide ();
		checkScrollBar();

		switch( _that.parent.lvl )
		    {
			case 'niveau 1' :
			break;
			case 'niveau 2' : 
			_that.moneyObj.show();
			break;
			case 'niveau 3' : 
			_that.moneyObj2.show();
			break;
		    }
				
		});
	
	
	//==================
	// [ LEVEL MANAGER ]
	//==================
	switch( this.parent.lvl )
		{
		case 'niveau 1' :
			this.elementObj.eq(0).show();
			this.loadElement();
		break;
		case 'niveau 2' : 
			this.moneyObj.show();
			this.loadMoney();
		break;
		case 'niveau 3' : 
			this.moneyObj2.show();
			this.loadMoney();
			this.loadMoney2();
		break;
		}

	//check scroll bar display
	checkScrollBar();	
	},
/**
 * load selected element
 * @param {number} selectedId : money selected id
 */	
loadElement : function( selectedId )
	{
	var _that = this;
	var arr = [];

	//Randomize
	for( var w=0 ; w<this.parent.dataSize ; w++ )
		{
		//==================
		// [ LEVEL MANAGER ]
		//==================
		if( this.parent.lvl != 'niveau 1'  )	
			arr.push(w);
		else{
			if( !this.parent.data.parts[w].fake )
				arr.push(w);
			}
		
		//loaded only the first time
		if( !this.parent.data.parts[w].fake && !this.desserteLoaded )
			$('#desserte').append('<div class="drop drop'+this.parent.data.parts[w].id+'"></div>');
		}
	arr.shuffle();
	
	//set dessert as loaded
	this.desserteLoaded = true;
	
	//clean
	this.elementObj.empty();
	
	//add to display
	for( var w=0 ; w<arr.length ; w++ )
		{
		var isFake= this.parent.data.parts[arr[w]].fake ? 'fake="fake"' : '';
		this.elementObj
			.eq( parseInt( w/this.parent.nbMaxValid ) )
			.append( '<img '+isFake+' realId="'+this.parent.data.parts[arr[w]].id+'" src="upload/exercice/ex'+this.parent.num+'/lvl2/'+this.parent.data.parts[arr[w]].id+'.png" title="'+this.parent.data.parts[arr[w]].txt2+'"/>' );
		}
	
	//set clicks events	
	this.elementObj.find("IMG").click(function()
		{
		    var currImg = $(this);
		    var targetId;

		    if ( _that.parent.data.parts[currImg.attr('realId')-1].assoc1) {
			// level 1 association can only contain a single item
			targetId =  _that.parent.data.parts[currImg.attr('realId')-1].assoc1[0]; 
		    } else {
			targetId = currImg.attr('realId');
		    }
		    
		//remove all clicked class & and add back for last clicked
		$(".exDrag.sel2 IMG").removeClass('clicked');
		currImg.addClass('clicked');
		
		//check if is fake img
		    if( currImg.attr('fake')=='fake' || ( selectedId && selectedId != targetId ))
			_that.dragObj.empty();
		    else {
			var item = _that.whatCanBuy (2);
			if (!item) {
			    $("#checkout SPAN").eq(2).append ($(this).clone());
			}
			_that.addPart( targetId);
		    }
		});
	},

/**
 * tells which item can be bought
 */	
whatCanBuy : function(lvl)
    {
	
	var assoc = lvl - 1;

	// contenu de la caisse correspondant au niveau lvl
	var current = $.map ($("#checkout SPAN").eq(4 - lvl).find ("IMG"), function(value) {
	    return parseInt ($(value).attr ("realId"));
	});

	current.sort ();

	for( var w=0 ; w<this.parent.dataSize ; w++ ) {
	    var part = this.parent.data.parts[w];
	    
	    if (part.fake) continue;
	    
	    var ids = part["assoc" + assoc];
	    if (!ids) ids = [ part.id ];
	    
	    if(ids.equals (current)) {
		return part.id;
	    }	    
	}

	return null;
    },
    

/**
 * init money html content
 */	
loadMoney : function()
	{
	var _that = this;

	var arr = [];
	    for( var w=0 ; w<this.parent.dataSize ; w++ ) {
		if (!this.parent.data.parts[w].txt3) break;
		arr.push(w);
	    }
	    
	arr.shuffle();

	//add money display
	for( var w=0 ; w<arr.length ; w++ )
	    {
		var img = '<img realId="'+this.parent.data.parts[arr[w]].id+'" src="upload/exercice/ex'+this.parent.num+'/lvl3/'+this.parent.data.parts[arr[w]].id+'.png" title="'+this.parent.data.parts[arr[w]].txt3+'">';
		
		if (arr.length < 6) {
		    this.moneyObj.eq(0).append(img);
		} else {
		    this.moneyObj.eq(parseInt( w%3 )).append(img);
		}
	    }
		
	//set money click event
	this.moneyObj
		.find('IMG')
		.click(function()
		       {
			   if ($(this).attr ('fake')) return;
			   
			   $("#checkout SPAN").eq(1).append ($(this).clone());

			   var item = _that.whatCanBuy (3);

			   if (item) {
			       _that.loadElement(item);
			       _that.moneyObj.hide();
			       _that.elementObj.show();
			       _that.moneyBtn.show();
			       
			       $("#checkout .arrow").eq(1).show ();

			       checkScrollBar();
			   }
			});
	},	

/**
 * init money html content
 */	
loadMoney2 : function()
	{
	var _that = this;

	var arr = [];
	    for( var w=0 ; w<this.parent.dataSize ; w++ ) {
		if (!this.parent.data.parts[w].txt4) break;
		arr.push(w);
	    }
	arr.shuffle();
	    
	//add money display
	for( var w=0 ; w<arr.length ; w++ )
	    {
		var img = '<img realId="'+this.parent.data.parts[arr[w]].id+'" src="upload/exercice/ex'+this.parent.num+'/lvl4/'+this.parent.data.parts[arr[w]].id+'.png" title="'+this.parent.data.parts[arr[w]].txt4+'">';

		
		if (arr.length < 6) {
		    this.moneyObj2.eq(0).append(img);
		} else {
		    this.moneyObj2.eq(parseInt( w%3 )).append(img);
		}
	    }
		
	//set money click event
	this.moneyObj2
		.find('IMG')
		.click(function()
		       {
			   $("#checkout SPAN").eq(0).append ($(this).clone());
			   
			   var item = _that.whatCanBuy (4);

			   if (item) {
			       var ids = _that.parent.data.parts[item-1].assoc2;
			       if (!ids) ids = [ item ];
			       
			       _that.moneyObj.find ("IMG").attr ("fake", "fake");

			       $.each (ids, function(index, value) {
				   _that.moneyObj.find ("[realId='" + value + "']").removeAttr ("fake");
			       });

			       $("#checkout .arrow").eq(0).show ();
			       
			       _that.moneyObj.show();
			       _that.moneyObj2.hide();
			       _that.moneyBtn.show();
			       
			       checkScrollBar();
			   }
			});
	},	

 /**
 * load list of possible elements
 * @param {number} realId : id of the selected vegetable/animal/stuff
 */		
addPart : function(realId)
	{
	//randomize array
	var arr = [];
	for( var w=0 ; w<this.parent.dataSize ; w++ ) arr.push(w);
	arr.shuffle();

	//hide > adding to display > showing back with effect fade in
	this.dragObj.hide().empty();
	for( var w=0 ; w<arr.length ; w++ )
		{
		if( !this.parent.data.parts[arr[w]].fake )
			this.dragObj.append( this.partLine( this.parent.num , this.parent.data.parts[arr[w]] , realId ) );
		}
	this.dragObj.fadeIn(777);	
	
	//set it draggable
	this.setDraggable();	
	},
/**
 * load each html images
 * @param {number} ex 		: current exercice id
 * @param {object} obj 		: current full object data 
 * @param {number} realId 	: current id
 */	
partLine : function( ex , obj , realId )
	{
	var clss='';	
	//can drop only if come from same id
	if( realId == obj.id ) clss='class="acceptable"';
	return '<img obj="'+obj.id+'" '+clss+' src="upload/exercice/ex'+ex+'/lvl1/'+obj.id+'.png" title="'+obj.txt+'"/>';
	},
/**
 * show the result of exercice
 */	
showResult:function()
	{
	var _that 	 = this;
	var tab 	 = "<div class=\"title\">Résultat</div><table>";
	var good 	 = true;
	var container= $('<div class="container"></div>');
	
	//all datas
	for( var w=0 ; w<this.parent.dataSize ; w++ )
		{
		if( !this.parent.data.parts[w].fake )
			{
			var nbok 	= this.parent.data.parts[w].nbok;
			var nbset	= $('#desserte .drop'+this.parent.data.parts[w].id+' .newObj').length;
			var clss	= 'red';
			
			if( nbok==nbset )
				{clss	= 'green';}
			else{good 	= false;}

			    var txt;
			    if (this.parent.data.parts[w].nbok == 1) {
				txt = this.parent.data.parts[w].txt;
			    } else {
				txt = this.parent.data.parts[w].txts;
			    }
			    
			tab += '<tr><td class="'+clss+'">'+nbset+'</td><td> > </td><td class="green">'+nbok+'</td><td><img src="upload/exercice/ex'+this.parent.num+'/lvl1/'+this.parent.data.parts[w].id+'.png" title="'+this.parent.data.parts[w].txt+'"></td><td>'+txt+'</td></tr>';
			}
		}

	//close bouton event (back to exercice)
	var closeBtn = $('<div class="submitBtn"><input class="hvr-back-pulse" type="button" value="REVENIR À L\'EXERCICE"/></div>');
		closeBtn.find('INPUT').click(function()
			{
			$('#result').fadeOut(function(){$('#exercice').show();checkScrollBar();});
			_that.parent.setSound(_that.parent.data.objectif[_that.parent.lvl].snd,true);
			});
	
	//remove close button if result is ok
	if(good)closeBtn='';	
		
	//set message with background
	container
		.append('<div class="containerBg" style="background-image:url(upload/exercice/'+this.parent.data.title+'.jpg)"></div>')
		.append(tab+'<table>')
		.append('<div class="message '+( good ? 'green' : 'red' )+'">'+( good ? this.parent.data.msgok : this.parent.data.msgko )+'</div>')
		.append(closeBtn);
	
	/* *** SCORE INFORMATION *** */
	//add a try to score
	this.parent.currScores.data[0].nbtry++;
	if( good )
		{
		//exerice end time
		this.parent.currScores.data[0].timer();
		
		//adding to all scores
		document.app.AllScores.add( this.parent.currScores );
		logger(this.parent.currScores);
		
		//add to display
		container.append( "<DIV class=\"resDetail\"><b>"+this.parent.currScores.data[0].nbtry+"</b>&nbsp;essai(s) en&nbsp;<b>" + this.parent.currScores.data[0].getTime() + "</b> - <b>"+this.parent.currScores.data[0].nbconv+"</b>&nbsp;règle(s) - <b>"+this.parent.currScores.data[0].nbobj+"</b>&nbsp;commande(s)</div>" );
		}
	/* *** END SCORE INFORMATION *** */
	
	//clean html before display
	$('#result')
		.empty()
		.append(container);

	//set content, then display it with fadein effect	
	$('#exercice').fadeOut(function(){$('#exercice').hide();checkScrollBar();$('#result').fadeIn();});

	//play result sound (good or bad answer)
	this.parent.setSound( good ? this.parent.data.sndok : this.parent.data.sndko );
	},
/**
 * init draggable event
 */		
setDraggable : function()
	{
	$('.exDrag.sel1 IMG').draggable(
		{		
		revert 	: 'invalid' , 
		helper	: "clone" , 	
		start 	: function(event, ui) { ui.helper.css('z-index',10); }
		});
	},
/**
 * init droppable event
 */	
setDroppable : function()
	{
	$('#desserte').droppable(
		{
		hoverClass: 'highlight',
		accept	: '.exDrag.sel1 IMG.acceptable',		
		drop	: function( e, ui )
						{
						var addObj 	= $(ui.draggable[0].outerHTML),
							newObj	= $('<div obj="'+$(ui.draggable[0]).attr('obj')+'" title="supprimer" class="newObj"></div>');
						
						newObj
							.attr( 'style' , 'background-image: url(' + addObj.attr('src') + ')' )
							.click(function(){ $(this).remove(); });
						
						$("#desserte .drop"+$(ui.draggable[0]).attr('obj')).append(newObj);
						}			
		});
	}	
}

/* ********** *
 *  EXO QUIZZ *
 * ********** */
document.app.contentQuizz =  
{
/**
 * parent object
 */
parent	: null,
/**
 * init QUIZZ page
 * @param {object} parent : parent object
 */	
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.parent.quizzStep = 0;

	this.parent.currScores = new Scores( this.parent.num , this.parent.lvl );
	
	logger('Scores data');
	logger(this.parent.currScores);
	
	this.parent.loadCommon();
	this.loadContent();	
	this.initEvent();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound(_that.parent.data.objectif[_that.parent.lvl].snd);});
	},	
/**
 * init QUIZZ events
 */	
initEvent:function()
	{
	var _that=this;	
	this.parent.contentObj.find( 'INPUT' ).eq(0).click(function(){ _that.loadRandom(0); });
	this.parent.contentObj.find( 'INPUT' ).eq(1).click(function(){ _that.loadRandom(1); });			
	},
/**
 * load randomly a quizz
 * @param {number} type : quizz type (question or true/false)
 */	
loadRandom:function( type )
	{
	this.parent.quizzType = type;
	this.parent.quizzData = this.parent.data.objectif[this.parent.lvl][this.parent.quizzType];
	this.parent.quizzSize = Object.keys(this.parent.quizzData).length;
	this.parent.quizzRdm = [];
	//Randomize
	for( var w=0 ; w<this.parent.quizzSize ; w++ ) this.parent.quizzRdm.push(w);
	this.parent.quizzRdm.shuffle();
	this.parent.loadPartQuizz1();	
	},
/**
 * init QUIZZ html content
 */	
loadContent:function()
	{
	var _that = this;	
	this.parent.contentObj.html($('#tpl-quizz').html());
	this.parent.contentObj.find( 'h3' ).html( _that.parent.data.objectif[_that.parent.lvl].title );
	this.parent.contentObj.find( '.msgIntro' ).html( _that.parent.data.objectif[_that.parent.lvl].txt );
	checkScrollBar();
	}

}

/* ******************* *
 *  EXO QUESTION QUIZZ *
 * ******************* */
document.app.contentQuizz1 =  
{
/**
 * parent object
 */	
parent	: null,
/**
 * quizz id (position in array)
 */
quizzNum : null,
/**
 * current quizz number of try
 */
quizzTry : 0,
/**
 * current quizz as been answered ?
 */
answered : false,
/**
 * maximum try available
 */
maxTry : 3 ,
/**
 * current quizz result
 */
currScore : null,
/**
 * nb time conversion has been displayed
 */
nbconv	: 0,
/**
 * nb time objectives has been displayed
 */
nbobj	: 0,
/**
 * init QUESTION QUIZZ page
 * @param {object} parent : parent object
 */	
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.quizzNum = this.parent.quizzRdm[ this.parent.quizzStep ];
	this.currScore = new Score();
	logger('step [' +this.parent.quizzStep +'] - id [' +this.quizzNum +']' );
	this.resetQuizz();
	this.loadContent();
	this.initEvent();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound( _that.parent.quizzData[_that.quizzNum].snd );});
	},	
/**
 * init QUIZZ events
 */	
initEvent:function()
	{
	var _that = this;	
	
	//each possible answer click
	$( '.choix DIV' ).click(function(){ _that.checkAnswer( $(this) ); });
	
	//valid button click, go to next step
	$( '#exValid' ).click(function()
		{
		//increase current quizz step
		_that.parent.quizzStep++;
		
		logger("Quizz [  " + _that.parent.quizzStep + " / " + _that.parent.quizzSize + " ]");
		
		//Add score to scrore list
		_that.parent.currScores.add(_that.currScore);
		
		//go to next quizz or final page
		if( _that.parent.quizzStep >= _that.parent.quizzSize )
			_that.parent.loadPartQuizz2();	
		else
			_that.parent.loadPartQuizz1();	
		
		});
	
	//display rules
	$('#exRule').click(	function(e)	
		{
		_that.nbconv++;
		new Popin( _that.parent.elementConversionObj[0].outerHTML );
		});
	
	//display command
	$('#exCommand').click( function(e)
		{
		_that.nbobj++;
		new Popin( _that.parent.elementObjectifObj[0].outerHTML );
		});		
	},
/**
 * reset QUIZZ
 */	
resetQuizz:function()
	{
	this.quizzTry 	= 0;
	this.answered 	= false;
	this.maxTry		= 3;
	this.nbconv		= 0;
	this.nbobj		= 0;
	},
/**
 * init QUESTION QUIZZ html content
 */	
loadContent:function()
	{
	var _that = this;	
	this.parent.contentObj.html($('#tpl-quizz1').html());
	this.parent.contentObj.find( 'h3' ).html( 'Question ' + (_that.parent.quizzStep+1) + ' / ' + _that.parent.quizzSize );
	this.parent.contentObj.find( '.msgIntro' ).html( _that.parent.quizzData[_that.quizzNum].txt );
	
	//set score text
	_that.currScore.txt = _that.parent.quizzData[_that.quizzNum].txt;
	
	logger( _that.parent.quizzData[_that.quizzNum].choice );	
		
	_that.loadChoice( _that.parent.quizzData[_that.quizzNum].choice );

	//check if has scrollbar
	checkScrollBar();
	},
/**
 * get True/False html string 
 * @param {boolean} curr : current true or false div class color
 * @param {string} good : is the good answer ?
 */	
getVraiFauxStr:function( curr , good )
	{
	return '<div class="'+ (curr ? 'V' : 'F' ) +'" style="display:none" '+good+'>' + (curr ? 'Vrai' : 'Faux') + '</div>';	
	},
/**
 * get html possible choice 
 * @param {object} choice : current choice object data
 */		
loadChoice:function( choice )
	{
	var target = this.parent.contentObj.find( '.choix' );	
	var good = 'good="true"';
	var allChoice = [];	
	var cond;
	
	switch( choice.type )
		{
		//== TRUE or FALSE CHOICE
		case 'tf-number' :		
		case 'tf-compare':		
		case 'tf-exist'  :
		case 'tf-notexist'  :
		case 'tf-total'  :
			//create true or false condition 
			switch( choice.type )
				{
				case 'tf-number' : cond = ( this.parent.data.parts[ ( choice.id  - 1 ) ].nbok == choice.value );break;		
				case 'tf-compare': cond = ( choice.id1 == choice.id2 );break;	
				case 'tf-exist'  : cond = ( choice.id <= this.parent.nbMaxValid );break;
				case 'tf-notexist'  : cond = ( choice.id > this.parent.nbMaxValid );break;
				case 'tf-total'  :	
					var total = 0;
					for (var l=0 ; l < this.parent.dataSize ; l++)
						total += this.parent.data.parts[ l ].nbok;
					cond = ( total == choice.value );break;
				}
			
			//add true/false html
			allChoice = [ cond , !cond ];
			target.append( this.getVraiFauxStr( allChoice[0] , good ) );
			target.append( this.getVraiFauxStr( allChoice[1] , '' ) );
		break;
			
		//== QUIZZ CHOICE (number)
		case 'number'  :
			var nbok = this.parent.data.parts[ choice.id-1 ].nbok;
			allChoice = [ nbok ];

			
			var toAdd = 0;
			for( var f=0 ; f<this.parent.nbMaxValid-1 ; f++ )
				{
				toAdd = ( Math.floor( Math.random() * 2 ) ) ? nbok + f + 1 : nbok - f + 1;
				!allChoice.inArray( toAdd ) && toAdd>0 ? allChoice.push( toAdd ) : f--;
				}
				
			for( var g=0 ; g<allChoice.length ; g++ )
				{
				if(g>0)good='';	
				target.append( '<div style="display:none" '+good+'>' + allChoice[g] + '</div>' );	
				}
			
			target.addClass('NUM');
		break;
				
		//== QUIZZ CHOICE (all other cases)
		default :
			allChoice = [ choice.id ];
			for( var f=1 ; f<this.parent.nbMaxValid+1 ; f++ )
				{
				if( $.inArray( f , allChoice ) == -1 ) allChoice.push(f );
				}	
				
			for( var g=0 ; g<this.parent.nbMaxValid; g++ )
				{
				if(g>0)good='';	
				target.append( '<div style="display:none" '+good+'><img src="upload/exercice/ex'+this.parent.num+'/'+choice.img+'/'+ allChoice[g] +'.png"></div>' );	
				}		
		break;
		}

	var target	= target.find('DIV');	
		
	//set good answer html
	this.currScore.htmlok = target.eq(0).html();

	//Randomize div	@TODO : set as jquery extend
	var nbDiv 	= target.length;
	for(var i = 0; i < target.length; i++)
		{			
		var t1 = Math.floor(Math.random() * nbDiv -1) + 1;
		var t2 = Math.floor(Math.random() * nbDiv -1) + 1;
		target.eq( t1 ).before( target.eq( t2 ) );
		}

	target.fadeIn();	
	},
/**
 * check if selected answer is good or not
 * @param {object} obj : current choice object data
 */	
checkAnswer:function( obj )
	{	
	if( this.answered ) return false;
	
	this.parent.contentObj.find( '.choix DIV' ).removeClass('ko');
	
	//add a try
	this.quizzTry++;
	
	if( obj.attr('good')!='true' )
		{//if answer is false
			
		if( this.quizzTry>=this.maxTry || this.parent.quizzType==1 )
			{
			this.setAnswered();	
			//add bad answer
			this.currScore.htmlko = obj.html();	
			}
		
		$('ARTICLE .resultat .txt').hide().removeClass('ok').addClass('ko').html( this.answered ? "Raté" : "Recommence" ).fadeIn(1000);
		obj.addClass('ko');	
		}
	else{//if answer is good
		$('ARTICLE .resultat .txt').hide().removeClass('ko').addClass('ok').html("Bravo !").fadeIn(1000);
		obj.addClass('ok');
		this.setAnswered();
		//add good answer
		this.parent.currScores.good++;	
		}

	},
/**
 * set current question answered
 */	
setAnswered : function()
	{
	//set score infos
	this.currScore.nbtry = this.quizzTry;
	this.currScore.nbconv= this.nbconv;
	this.currScore.nbobj = this.nbobj;
	this.currScore.timer();
	//set answered	
	this.answered = true;
	$( '#exValid' ).show();	
	}	
	
}

/* *********************** *
 * EXO QUIZZ INTERMEDIAIRE *
 * *********************** */
document.app.contentQuizz2 =  
{
/**
 * parent object
 */		
parent	: null,
/**
 * init QUIZZ INTERMEDIAIRE
 */	
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.loadContent();
	this.initEvent();
	this.parent.contentObj.fadeIn(function(){_that.parent.setSound( _that.parent.data.objectif[_that.parent.lvl].intermedsnd );});
	},		
/**
 * init QUIZZ INTERMEDIAIRE events
 */	
initEvent:function()
	{
	var _that = this;
	this.parent.contentObj.find( '.msgIntro IMG' ).click(function(){_that.parent.loadPartQuizz3();});
	},
/**
 * init QUIZZ INTERMEDIAIRE html content
 */	
loadContent:function()
	{
	this.parent.contentObj.html($('#tpl-quizz2').html());
	this.parent.contentObj.find( 'h3' ).html( this.parent.data.objectif[this.parent.lvl].intermediate );
	this.parent.contentObj.find( '.msgIntro' ).html( '<img class="intermediate" src="upload/exercice/ex'+this.parent.num+'/result.png">' );
	checkScrollBar();
	}	
}

/* **************** *
 * EXO QUIZZ RESULT *
 * **************** */
document.app.contentQuizz3 =  
{
/**
 * parent object
 */		
parent	: null,
/**
 * progress bar object
 */	
bar : null,
/**
 * init QUIZZ RESULT
 */	
init : function(parent)
	{
	var _that=this;
	this.parent = parent;
	this.loadContent();
	this.parent.contentObj.fadeIn(function()
		{
			_that.parent.removeSound();
			_that.bar.animate( _that.parent.currScores.good / _that.parent.currScores.total() );
		});
	},		
/**
 * init QUIZZ RESULT html content
 */	
loadContent:function()
	{
	var resBlock = $('#tpl-quizz3').html();
	
	this.parent.contentObj.empty().append('<h3>Résultats</h3><div id="pBar"></div>');
	
	//Display result in %
	this.bar = new ProgressBar.Line('#pBar',
		{
		strokeWidth	: 4,
		easing		: 'easeInOut',
		duration	: 1333,
		color		: '#FFEA82',
		trailColor	: '#eee',
		trailWidth	: 1,
		svgStyle	: { width : '100%' , height : '100%'},
		text: 
			{
			style:
				{
				color	: '#006400',
				padding	: 0,
				margin	: 0,
				transform: null
				},
			autoStyleContainer: false
			},
		from	: {color: '#FFEA82'},
		to		: {color: '#006400'},
		step	: function(state, bar) 
						{
							bar.path.setAttribute('stroke', state.color);
							bar.setText('Voici ton score ' + Math.round(bar.value() * 100) + ' %');
						}
		});
	
	//Add exerice score to all scores
	document.app.AllScores.add( this.parent.currScores );
	
	logger(this.parent.currScores);
	
	for(var o=0 ; o<this.parent.currScores.data.length ; o++ )
		{
		//add separator
		this.parent.contentObj.append('<HR/>');	
			
		//construct content
		var currBlock = $(resBlock).clone();		
		currBlock
			.find('.question')
			.html( this.parent.currScores.data[o].txt )
			.append( "<DIV class=\"resDetail\"><b>"+this.parent.currScores.data[o].nbtry+"</b>&nbsp;essai(s) en&nbsp;<b>" + this.parent.currScores.data[o].getTime() + "</b> - <b>"+this.parent.currScores.data[o].nbconv+"</b>&nbsp;règle(s) - <b>"+this.parent.currScores.data[o].nbobj+"</b>&nbsp;commande(s)</div>" );

		//add good & bad answer on left, and good answer if bad on the right
		if( this.parent.currScores.data[o].htmlko==null )
			{
			currBlock.find('.answer1').html( this.parent.currScores.data[o].htmlok );
			currBlock.find('.answer2').html( this.parent.currScores.data[o].htmlko );
			}
		else{
			currBlock.find('.answer1').addClass('ko').html( this.parent.currScores.data[o].htmlko );
			currBlock.find('.answer2').addClass('ok').html( this.parent.currScores.data[o].htmlok );
			}	
			
		//Check if has error
		if( this.parent.currScores.data[o].htmlko==null || this.parent.currScores.data[o].htmlko == "")
			currBlock.find('.answer2').removeClass('answer2');
		
		//add line content
		this.parent.contentObj.append(currBlock);
		}

	checkScrollBar();
	}	
}	
	
/* *********** *
 * SITE UPDATE *
 * *********** */
document.app.contentUPDATE =  
{
/**
 * parent object
 */		
parent		: null,
/**
 * update result object
 */	
updateEvo	: null,
/**
 * update progress bar object
 */	
updateBar	: null,
/**
 * update total files
 */	
totalFile	: 0,
/**
 * update nb downloaded file
 */	
dlFiles 	: 0,
/**
 * temporize data if current object still not loaded
 */	
temporized	: [],
/**
 * init UPDATE
 */	
init : function(parent)
	{
	var _that	= this;
	this.parent = parent;
	this.parent.setPageTitle('Téléchargement du site');
	this.loadContent();
	this.parent.contentObj.fadeIn(function(){_that.parent.removeSound();});
	},		
/**
 * init UPDATE html content
 */	
loadContent:function()
	{
	this.parent.contentObj.html($('#tpl-update').html());
	
	if( document.app.vInstall )
		{//download
		this.parent.contentObj.find( 'h3' ).html( 'Copie locale de l\'application' );
		this.parent.contentObj.find( '.msgIntro' ).html( 
				'Les données vont être copiées localement grâce à la technologie HTML5 "Cache Manifest"<br/>'
			+	'Cette technologie permet de stocker localement le contenu d\'une application. Celui-ci sera sauvegardé tant que ces données ne sont pas effacées.<br/><br/>'
			+	'Une fois téléchargé, l\'application "Cascade" sera disponible hors connexion.' );
		}
	else{//update
		this.parent.contentObj.find( 'h3' ).html( 'Mise à jour de l\'application' );
		this.parent.contentObj.find( '.msgIntro' ).html( 
				'Une mise à jour a été détectée, les données de l\'application vont être copiées localement grâce à la technologie HTML5 "Cache Manifest"<br/>'
			+	'Cette technologie permet de stocker localement le contenu d\'une application. Celui-ci sera sauvegardé tant que ces données ne sont pas effacées.<br/><br/>'
			+	'Merci de patienter.' );

		}
		
	this.updateEvo = this.parent.contentObj.find( '.updateEvo' );

	this.updateBar = this.parent.contentObj.find( '.updateBar' );	
	
	this.setProgressBar();
	
	checkScrollBar();
	
	//start event if was temporized, due to late loading
	if( this.temporized.length > 0)
		{
		this.displayResult( this.temporized[0] , this.temporized[1] );
		this.temporized = [];
		}
	
	},
/**
 * init UPDATE progress bar
 */		
setProgressBar:function()
	{
	this.bar = new ProgressBar.Line( this.updateBar[0] ,
		{
		strokeWidth	: 4,
		easing		: 'easeInOut',
		duration	: 1333,
		color		: '#2098d1',
		trailColor	: '#eee',
		trailWidth	: 1,
		svgStyle	: { width : '100%' , height : '100%'},
		text: 
			{
			style:
				{
				color		 : '#006400',
				padding		 : 0,
				margin		 : 0,
				'text-align' : 'right',
				'font-size'	 : '2.5vh',
				'line-height': '2.5vh',
				'font-family': 'MavenProLight',
				'font-weight': 'bold',
				transform: null
				},
			autoStyleContainer: false
			},
		from	: {color: '#2098d1'},
		to		: {color: '#2098d1'},
		step	: function(state, bar)
					{
						bar.path.setAttribute( 'stroke', state.color );
						bar.setText( 'Progression : ' + Math.round( bar.value() * 100 ) + ' %' );
					}
		});
	},		
/**
 * display UPDATE result
 */		
displayResult:function(msg, css)
	{
	
	logger(msg);
		
	//prevent from trigger event when not already loaded
	if( ! this.updateEvo )
		{
			this.temporized = [ msg , css ];
			return false;
		}
	
	var _that = this;
	this.updateEvo.slideUp(function( )
		{
		_that.updateEvo.addClass( "resultUpdate " + css ).html( msg );
		_that.updateEvo.slideDown();
		});
	this.updateBar.fadeOut();
	},
/**
 * display UPDATE progress %
 */	
displayProgress:function( value , max )
	{
	if( this.bar && max && value<=max)
		this.bar.set( value / max );
	} 
}
