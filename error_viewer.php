<style>
DIV:nth-of-type(even) {background: #ebf9ea;}
DIV{padding: 10px;}
HR{margin:0}
H2{margin: 0;text-align: center;background: darkgreen;color: #fff;padding: 3px;}
</style>
<?php
//Read error folder
$files = glob("upload/error/*.log");

//init result var
$errors = "";

$delFile = isset($_GET["file"]) ? urldecode($_GET["file"]) : "";

//get all error as string
foreach($files as $file) 
	{
	if( $delFile==$file )	
		{unlink($file);}
	else{	
		$tmp = split( "\n" , file_get_contents($file) );
		$tmp = join("</div><hr><div>", $tmp);
		$errors .= "<h2>$file <a href=\"error_viewer.php?file=".urlencode($file)."\">[ DELETE FILE ]</a></h2><hr><div>$tmp</div><hr>";
		}
	}

echo "<h1>Error viewer</h1>";

if( $errors=="" )
	echo '<b style="color:darkgreen;">No error occured at the moment</b>';
else
	echo $errors;