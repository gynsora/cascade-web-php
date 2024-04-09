<script>
console.log( "%c <?=C::$WEB_LogStart?> " , 'background: <?=C::$WEB_LogBg?>; color: <?=C::$WEB_LogCol?>' );

/* ******** */	
/* APP INIT */
/* ******** */

//Init web application params
document.app			= {}
//set debug mode
document.app.debug		= <?=C::$WEB_Mode=="dev" ? 'true' : 'false'?>;
//is ie 
document.app.isIE		= <?=$msie ? 'true' : 'false'?>;
//app version
document.app.version	= <?=$version?>;
document.app.vInstall	= <?echo isset($_GET['manifest'])?'true':'false';?>;
//Init web application title
document.app.titleName 	= "<?=C::$WEB_Name?>";
document.app.titleSubName="<?=C::$WEB_SubName?>";
document.app.titleSpeChr= "<?=C::$WEB_SpeChr?>";
document.app.author		= "<?=C::$WEB_Auth?>";
//timer start
document.app.ts			= new Date();
//sound enabled
document.app.snd		= true;
//Server information
document.app.srv		= "<?=C::$WEB_Url?>";
//init exercice array obj
document.app.exercice	= [];
//init exercice scores
document.app.allScore	= [];
//Allowed upload files
document.app.allowedFiles = [ <?
								$w=0;
								foreach( $allowFileType as $t )
									{ if( $w!=0 ) echo ",";echo "'".$t."'";$w++; }
							?> ];
</script>