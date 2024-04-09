<?
/* Constantes */
include "inc/inc.php";

$url=C::$WEB_Url;
header("Content-Type: text/cache-manifest; charset=utf-8");
header("Expires: Tue, 02 Aug 1980 15:15:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache , no-store , must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

//@work IE 11 :
//-------------
//Remove the no-store in the Cache-Control-Header,
// it breaks the appCache in IE10/IE11 (see https://stackoverflow.com/a/21272714/1039180).

echo <<<END
CACHE MANIFEST

# ================================
# MANIFEST pour Cascade
# $url
# v$version
# Sampled by FroggManiGen
# [ FROGG MANIFEST GENERATOR ]
# ================================

CACHE:

./
$url

END;

function recursive_readdir ($dir)
{
$dir=rtrim($dir,'/');
if (is_dir ($dir))$dh = opendir ($dir);
else {echo "repertoire introuvable";exit;}
while (($file = readdir ($dh)) !== false )
     { //boucle pour parcourir le repertoire
     if ($file !== '.' && $file !== '..')
        {
        $path =$dir.'/'.$file;

		if (
			   preg_match('/inc\/php\//',$path)==1
			|| preg_match('/inc.php/',$path)==1 
			|| preg_match('/offline.htm/',$path)==1
			|| preg_match('/index.php/',$path)==1
			|| preg_match('/minifier.php/',$path)==1
			|| preg_match('/error_viewer.php/',$path)==1
			|| preg_match('/cascade.manifest.php/',$path)==1
			|| preg_match('/upload\/error/',$path)==1 
			|| preg_match('/\.php$/',$path)>=1 
			|| preg_match('/\/\.\w/',$path)>=1 
			) continue;
		
		//remove only if production mode is enable
		if ( C::$WEB_Mode=="prod" && 
				(
				preg_match('/inc\/js\//',$path)==1 
				|| preg_match('/inc\/css\//',$path)==1
				)
			) continue;
			
		
		if (is_dir($path))
			{recursive_readdir ($path);}
		else{echo $path."\n";}
		}
     }
closedir ($dh); // on ferme le repertoire courant
}
recursive_readdir ('./');

echo <<<END

FALLBACK:

/ offline.htm

NETWORK:

*

END;
?>
