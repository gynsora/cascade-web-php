<?
include "class/audit.php";
$message	= $_GET['message'];
$url		= $_GET['url'];
$lineNumber	= $_GET['lineNumber'];
$today 		= date("Ymd");  
$file		= "../../upload/error/${today}-error.log";

if(!isset($_GET['url'])&&!isset($_GET['lineNumber']))
{
	file_put_contents( $file , date("Y-m-d h:i:s") . " - DEBUG : $message \n", FILE_APPEND);
	exit();
}




file_put_contents( $file , date("Y-m-d h:i:s") . " - ".$A->UserIP." - $url - line $lineNumber - $message - ".$A->Method." - ".$A->Browse." - ".$A->Langue." \n" , FILE_APPEND );