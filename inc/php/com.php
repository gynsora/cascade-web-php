<?php

function getExecTime( $ts )
{
	$te = microtime( true );
	$ts=$te-$ts;
	return round( $ts , 3 );
}

//set error num
function setErrNum( $file , $num , $andExit=false )
	{
	if( $andExit ) echo '{ "result" : [';	
	echo '{ "file" : "'.$file.'" , "error" : "'.$num.'" }';
	if( $andExit ) echo ']}';
	if( $andExit ) exit();
	}
	
/*Strings*/	
	
//get last str after char file exstension / filename etc ..
function getLast( $str , $sep )
	{
	$sTab = explode( $sep , $str );
	return $sTab[count($sTab)-1];		
	}

/*File & Folders*/

function readFold( $target )
{
$fi=[];
$fo=[];
if( file_exists( $target ) && $handle = opendir( $target ) )
	{
	while( false !== ( $entry = readdir($handle) ) )
		{
		if( $entry != "." && $entry != ".." )
			{
			if( is_dir( $target . $entry ) )
				array_push( $fo , $entry );
			else
				array_push( $fi , $entry );
			}
		}
	closedir($handle);
	}	
return [ 'files' => $fi , 'folders' => $fo , 'in' => $target ];
}

function readFil( $file )
{
if( file_exists($file) ){ $r = readfile( $file ); }
}

function readAllFile( $target )
{
$f = readFold( $target );
foreach( $f['files'] as $k=>$v ) readFil( $f['in'].$v );
}

//from http://php.net/manual/en/function.rmdir.php
function delTree($dir)
{ 
$files = array_diff(scandir($dir), array('.','..')); 
foreach ($files as $file)  
	(is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file"); 
return rmdir($dir); 
} 

function delOldDir( $path , $execption , $old )//$old in sec
{
$allFold = readFold( $path );
foreach( $allFold['folders'] as $k=>$v )
	{
	if( $v!=session_id() )
		{
		if( (strtotime("now") - filemtime($path . $v) ) > $old ) //if older than 6 hours
			delTree( $path . $v	);
		}
	}
}
	
//seach if exist in array
/* (not used)
function arraySeach( $what , $arr )
	{
	foreach($arr as $k=>$v)
		{
		if ( strstr( $v , $what ) return true;
		}
	return false;
	}
*/

//TEST IF IS INTERNET EXPLORER
$msie = strpos($_SERVER["HTTP_USER_AGENT"], 'MSIE') ? true : false;
if(!$msie && strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false)$msie=true;