<?
/**
 * TESTED ON :
 * -----------
 * Android 4.4 (>=API19) 
 * Chrome
 * Opera
 * Firefox
 * Internet Explorer 11 (win7)
 *
 * TODO :
 * ------
 * TEST IE 10
 * TEST Iphone/Ipad/Mac
 *
 * BONUS :
 * -------
 * - Unlock exercice seuelement si précédent fait
 * - graphisme pour page 404 & offline.html
 * - page de synthèse des résulatats
 * - Gestion d'un compte avec évolution des scores (historique)
 * - animation du "mark as done" sur la home
 * - Compatibilité 4.1 si possible ?
 *
 * Bug : fast click stop audio si pas chargé 
 *
 *
 * - click logo message confirm quit exerice
 * - plaquette ou paquet peu importe
 */


/* time execution calculation */
$ts = microtime(true);

/* Page header */
header("Expires: Tue, 02 Aug 1980 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
header('Content-Type: text/html; charset=UTF-8');

/* Constantes */
include "inc/inc.php";
/* Common functions */
include "inc/php/com.php";
?>
<!DOCTYPE html>
<html lang="<?=C::$WEB_Lang?>" <?if(isSet($_GET['manifest']) || $msie){?>manifest="cascade.manifest.php"<?}?>>
<head>
<title><?=C::$WEB_SpeChr?> <?=C::$WEB_Name?> - <?=C::$WEB_SubName?> <?=C::$WEB_SpeChr?></title>
<!--Content meta-->
<meta http-equiv="Content-Type" content="text/html;charset=<?=C::$WEB_Encod?>">
<!--Author meta-->
<meta name="author"		content="<?=C::$WEB_Auth?>">
<meta name="copyright"	content="<?=C::$WEB_Copy?>">
<meta name="generator"	content="<?=C::$WEB_Generator?>">
<!--Mobile meta-->
<meta name="viewport"	content="width=device-width, initial-scale=1.0"/>
<!--Init-->
<?include "inc/js/init.php";?>
<!--Includes CSS-->
<?if(C::$WEB_Mode=="dev"){?>
	<!--lib-->
	<script type="text/javascript" src="inc/js/lib/1_jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="inc/js/lib/2_jquery-ui.min.js"></script>
	<script type="text/javascript" src="inc/js/lib/3_jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="inc/js/lib/progressbar.min.js"></script>
	<!--Includes JS-->
	<script type="text/javascript" src="inc/js/article/manifest.js"></script>
	<script type="text/javascript" src="inc/js/com.js"></script>
	<script type="text/javascript" src="inc/js/class/ajax.js"></script>
	<script type="text/javascript" src="inc/js/class/message.js"></script>
	<script type="text/javascript" src="inc/js/class/score.js"></script>
	<script type="text/javascript" src="<?=$foldUp?>exercice/exercice.js"></script>
	<script type="text/javascript" src="inc/js/article/exercice.js"></script>
	<!-- <script type="text/javascript" src="inc/js/article/manifest.debug.js"></script> -->
	<link href="inc/css/style.css"	rel="stylesheet" type="text/css">
	<link href="inc/css/effect.css"	rel="stylesheet" type="text/css">
	<link href="inc/css/home.css"	rel="stylesheet" type="text/css">
<?}else{?>
	<script type="text/javascript" src="<?=$foldUp?>exercice/exercice.js"></script>
	<script src="upload/min/min.js" async="async" defer="defer" type="text/javascript"></script>
	<link href="upload/min/min.css"	rel="stylesheet" type="text/css">
<?}?>

<!--Compatibility CSS-->
<?include "inc/css/extra_style.php";?>
</head>
<body>
<!-- Templates -->
<?include "inc/php/tpl.php";?>

<div id="container">
<?include "inc/php/page_header.php";?>
<!-- Main article -->
<article><div class="partContent"></div></article>
</div>
<?include "inc/php/page_footer.php";?>

<!-- Add sound if exist -->
<audio id="comment" type="audio/mpeg"></audio>

<script type="text/javascript">
//time calculation
function setPageAsloaded(){ console.log( "%c page générée en <?=getExecTime($ts)?> sec et affichée en "+((new Date()-document.app.ts)/1000)+" sec" , 'background: <?=C::$WEB_LogBg?>; color: <?=C::$WEB_LogCol?>' ); }

/*
new BroadcastChannel('service-worker').addEventListener('message', event => {
    console.log('Broadcast received in page:', event.data);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

*/

</script>
</body>
</html>