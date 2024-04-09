/*File name has changed to not be blocked by ads blocker*/

//popin object
function Popin( message , css , callbackOK , callbackKO )
	{ this.init( message , css , callbackOK , callbackKO ); }

Popin.prototype = 
{
popinObj	: null,
maskObj		: null,
divMask		: '',
divPopin	: '<div class="title"></div><div class="message"></div><div class="btn"></div>',
divBtnOK	: '',
divBtnKO	: '',
title		: null,
message		: null,
callBackOK	: null,
callbackKO	: null,	
css			: 'info',

//popin Css effect show & close 
mEffectCss	: { 'eshow' : 'unfade' , 'ehide' : 'fade' },
pEffectCss	: { 'eshow' : 'fadenslidedown' , 'ehide' : 'fade' },

init : function( message , css , callbackOK , callbackKO )
	{
	//check if is android
	if(typeof document.app.isAndroid == 'undefined')document.app.isAndroid=getAndroidVersion();

	//init vars
	if( !css ) css = this.css;
	this.setTile( css );
	this.message	= message;
	this.callbackOK = callbackOK;
	this.callbackKO = callbackKO;
	
	//set btn as yes / no if callback KO
	if( callbackKO )
		{
		this.divBtnOK='Oui&nbsp;&nbsp;';
		this.divBtnKO='Non&nbsp;&nbsp;';
		}
		
	//create html elements
	this.maskObj	= appendTo( document.body , this.divMask , "popinmask" );
	this.popinObj	= appendTo( document.body , this.divPopin , "popinWin" );
	
	//prepare display for android
	if( document.app.isAndroid=='4.4' ){ $(this.popinObj).hide(); }
	
	//set popin style
	this.popinObj.addClass( css );

	//set popin content
	this.setContent();
	
	//set display for android
	if( document.app.isAndroid=='4.4' ){ $(this.popinObj).center().show(); }
	
	//Add popin btn & events
	this.addEvent();
	
	//adDisplay effects	
	this.maskObj.addClass( this.mEffectCss.eshow );
	this.popinObj.addClass( this.pEffectCss.eshow );
	},

setTile : function( typ )
	{
	switch(typ)
		{
		case 'warn' : this.title = 'site warning'; break;
		case 'err'	: this.title = 'site error'; break;	
		default 	: this.title = 'information'; break;		
		}
	},	
	
setContent : function()
	{
	this.popinObj.getElementsByClassName("title")[0].innerHTML		= this.title;
	this.popinObj.getElementsByClassName("message")[0].innerHTML	= this.message;
	},

addEvent : function()
	{
	var _that = this;
	// [ OK Button ]
	//element
	this.btnOK = appendTo( this.popinObj.getElementsByClassName("btn")[0] , this.divBtnOK , null , 'ok hvr-back-pulse' , 'A' );
	//event
	this.btnOK.addEventListener("click", function(e){_that.hide(); if( _that.callbackOK ) { _that.callbackOK(); } });

	// [ KO Button ]
	if( this.callbackKO )
		{
		//element
		this.btnKO = appendTo( this.popinObj.getElementsByClassName("btn")[0] , this.divBtnKO , null , 'ko hvr-back-pulse' , 'A' );
		//event
		this.btnKO.addEventListener("click", function(e) {_that.hide();_that.callbackKO(); });
		}	

	//Effect events
	this.popinObj.addEventListener("animationend",function(e)
		{
		switch( true )
			{
			//fade out then remove
			case ( e.target.hasClass( _that.pEffectCss.ehide ) ): _that.remove(); break;
			}
		});		
	},

hide : function()
	{
	//remove display for android 4.4
	if( document.app.isAndroid=='4.4' )
		{  
		$(this.maskObj).remove();
		$(this.popinObj).remove();
		}
	else{	
		this.maskObj.removeClass( this.mEffectCss.eshow );
		this.popinObj.removeClass( this.pEffectCss.eshow );		
		this.maskObj.addClass( this.mEffectCss.ehide );
		this.popinObj.addClass( this.pEffectCss.ehide );
		}
	},

remove : function()
	{
	this.maskObj.parentElement.removeChild(this.maskObj);
	this.popinObj.parentElement.removeChild(this.popinObj);
	},

}