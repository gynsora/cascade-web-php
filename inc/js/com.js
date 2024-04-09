/*JQUERY EXTEND*/
jQuery.fn.center = function ()
	{
    this.css("position","absolute");
    this.css("top",  Math.max(0, (($(window).height()- $(this).outerHeight())/ 2) +  $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
	}

/* ************ */
/* ARRAY PROTOS */
/* ************ */
Array.prototype.random = function ()
	{
	return this[Math.floor((Math.random()*this.length))];
	}

Array.prototype.inArray = function ( str )
	{
	return (this.indexOf(str) != -1) ? true : false;
	}

Array.prototype.spliceItem = function ( items )
	{
	var arr = [],
		i=l=0;
	typeof items=="object" ? arr = items : arr.push(items);
	l=arr.length;
	for( ; i<l ; i++ )
		this.indexOf(arr[i])!==-1 && this.splice( this.indexOf(arr[i]) , 1 );
	return this;
	}	

Array.prototype.shuffle = function()
	{
	var cI = this.length, tmp, rI;
	// While there remain elements to shuffle...
	while (0 !== cI)
		{
		// Pick a remaining element...
		rI = Math.floor(Math.random() * cI);
		cI -= 1;
		// And swap it with the current element.
		tmp = this[cI];
		this[cI] = this[rI];
		this[rI] = tmp;
		}
	return this;
	}
	
Array.prototype.equals = function(other)
{
    if (this.length != other.length) return false;
    
    for (var i = 0; i < this.length; i++) {
	if (this[i] != other[i]) return false;
    }

    return true;
}

/* ************* */
/* STRING PROTOS */
/* ************* */

//Add extra char all n chars in string
String.prototype.extraChar=function( chr , n )
	{
	if( n < 1 ) return this;
	return this.match( new RegExp( '.{1,'+n+'}' , 'g' ) ).join( chr );
	}

//Add Char to start of string to complete it
String.prototype.pad=function( len , chr )
	{
	var tmp = this;
	while (tmp.length < len)tmp = chr + tmp;
	return tmp;
	}
	
//return escaped string for regExp	
String.prototype.escapeRegExp=function( )
	{
	return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

//reverse a string
String.prototype.reverseStr=function()
	{
	var l=this.length-1
		r='';
	for( ; l>-1 ; l-- )	r+=this[l];
	return r;
	}

//get string after separator
String.prototype.getStringAfter=function( sep )	
	{
	var last = this.split( sep );
	return last[ last.length-1 ];	
	}	

//get file information
String.prototype.getFileInfo=function()
	{
	var obj 		= {},
		fileInfo 	= this.split('/');
	obj.filename 	= fileInfo.pop();
	obj.path		= fileInfo.join('/');
	obj.ext			= obj.filename.getStringAfter( '.' );
	obj.fullname	= this;
	return obj;
	}	
	
/* ************* */
/* NUMBER PROTOS */
/* ************* */
	
//Add Char to start of string to complete it
Number.prototype.pad=function( len , chr )
	{
	var tmp = this.toString();
	while (tmp.length < len)tmp = chr + tmp;
	return tmp;
	}	
	
/* *********** */
/* NODE PROTOS */
/* *********** */	
	
//check if element has class
Node.prototype.hasClass=function( css )
	{
	return this.classList.contains(css);	
	}

//add class
Node.prototype.addClass=function( css )
	{
	var s,cssList = [];
	typeof css=="string" ? cssList.push( css ) : cssList = css;
	for( s in cssList )
		typeof cssList[s]=="string" && !this.hasClass( cssList[s] ) && this.classList.add( cssList[s] );
	return this;
	}	

//remove class
Node.prototype.removeClass=function( css )
	{
	var s,cssList = [];
	typeof css=="string" ? cssList.push( css ) : cssList = css;
	for( s in cssList )
		typeof cssList[s]=="string" && this.hasClass( cssList[s] ) && this.classList.remove( cssList[s] );
	return this;		
	}

//toggle class	
Node.prototype.toggleClass=function( css )
	{
	this.hasClass( css ) ? this.removeClass( css ) : this.addClass( css );
	}

//get node index	
Node.prototype.getIndex=function()
	{
	var i = 0,
		node = this;
	while( (node = node.previousSibling) != null )	i++; 
	return i+1;
	}

//Create & append an html element to DOM 
function appendTo( obj , str , id , css , struct )
	{
	if( !struct ) struct = 'div';
	var newObj = document.createElement( struct );
	if( id ) newObj.setAttribute( 'id' , id );
	if( css )newObj.setAttribute( 'class' , css );
	newObj.innerHTML = str;
	obj.appendChild(newObj);
	return newObj;
	}

/*****************/	
/* App Android ? */	
/*****************/
//check is is android and return the version	
function getAndroidVersion()
	{
	var ua = navigator.userAgent.toLowerCase(); 
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? match[1] : false;
	};
document.app.isAndroid = parseFloat(getAndroidVersion());	
	
/* ************* */	
/* Error Manager */
/* ************* */
if(!document.app.debug)
	{
	window.onerror = function(message, url, lineNumber)
		{  
		document.app.ajax = new Ajax( 
			"/inc/php/error_report.php" ,
			function()
				{
				console.log(message + ' on line ' + lineNumber);
				if(document.app.popin)
					{
					document.app.popin = new Popin( "A javascript error occured in the page and may become instable, you may need to refresh the page.<br/>An error report as been sent to the site administrator<br/><br/><u>Error message :</u> "+message , "err"  );
					}
				else{
					alert("A javascript error occured in the page and may become instable, you may need to refresh the page.\nAn error report as been sent to the site administrator\n\nError message : "+message);
					}
				} ,
			{ param : 'message='+message+'&url='+url+'&lineNumber='+lineNumber } 
			);
		return true;
		};
	}
/*
//only use for debug in some case like android
function debugMsg(message)
	{  
	document.app.ajax = new Ajax( 
		"/inc/php/error_report.php" ,
		function(){} ,
		{ param : 'message='+message } 
		);
	return true;
	};	
*/

/************/	
/* App Logs */	
/************/
function logger(str)
	{
	if(document.app.debug)
		console.log(str);
	}
		
/************/	
/* App Load */	
/************/
//Page Loaded Event
$( document ).ready( function()
	{
	//android compatibility
	if( document.app.isAndroid=='4.4' )$('FOOTER').hide();		
	//init display
	document.app.content.init();
	//page is loaded
	setPageAsloaded();
	} );
	
//Set Resize event	
function checkScrollBar() 
	{
	var part = $('ARTICLE .partContent');
	if( $('BODY').height() > 400)
		{ ( $('ARTICLE').height() - part.height() < 0 ) ?	part.removeClass('noScroll') :	part.addClass('noScroll'); }
	else{ part.removeClass('noScroll'); }
	}
$( window ).resize(function(){checkScrollBar();});
