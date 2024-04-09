<?php

/************** 
 * CSS MINIFY *
 **************/
 
//Read css folder
$files = glob("inc/css/*.css");

//init result var
$css = "";

//get all css as string
foreach($files as $file) { $css .= file_get_contents($file); }

//cleanning & minimizing css files
$css = preg_replace ( '/(\n|\r|\t)/' 			, '' , $css);
$css = preg_replace ( '/\/\*.*?\*\//' 		, '' , $css);
$css = preg_replace ( '/[ ]^[A-Za-z0-9#\-]/', '' , $css);

//set result in minified css
file_put_contents( "upload/min/min.css" , $css );

echo "<h1>CSS Minifier made by Frogg</h1>";
echo '<b style="color:darkgreen;">If no error occured, CSS has been minified to upload/min/min.css</b>';


/************* 
 * JS MINIFY *
 *************/
include "inc/php/class/Minifier.php";

//Read js lib folder
$libfiles = glob("inc/js/lib/*.js");
//init result var
$jslib = "";
//get all css as string
foreach($libfiles as $file){$jslib .= file_get_contents($file).";\n";}

//Read js common folder
$comfiles = glob("inc/js/*.js");
//init result var
$jscom = "";
//get all css as string
foreach($comfiles as $file){$jscom .= file_get_contents($file).";\n";}

//Read js class folder
$classfiles = glob("inc/js/class/*.js");
//init result var
$jsclass = "";
//get all css as string
foreach($classfiles as $file){$jsclass .= file_get_contents($file).";\n";}

//Read js article folder
$artfiles = glob("inc/js/article/*.js");
//init result var
$jsart = "";
//get all css as string
foreach($artfiles as $file){$jsart .= file_get_contents($file).";\n";}

//set result in minified css
$fullJs = $jslib.$jscom.$jsclass.$jsart;
$fullJs = \JShrink\Minifier::minify( $fullJs , array('flaggedComments' => false ));
file_put_contents( "upload/min/min.js" , $fullJs );

echo "<h1>JS Minifier made by Robert Hafner</h1>";
echo '<b style="color:darkgreen;">If no error occured, CSS has been minified to upload/min/min.js</b>';