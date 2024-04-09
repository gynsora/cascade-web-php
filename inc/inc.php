<?
//website version
$version 	= 0003;
/* Folders */
//Site physical absolute folder
$foldWeb	= "/opt/web/cascade/";
//Site upload relative folder
$foldUp		= "upload/";

/*Site parameters*/
class C
{
/* dev (uncompressed) or prog (compressed) by /minifier.php */
public static $WEB_Mode 	= "prod";
/* Site key*/
public static $WEB_Key		= 'S3cur1tYC4sC4d3K3yzR4nD0m1Z3d';
/* Web infos */
public static $WEB_Url		= "http://cascade.orb.ovh/";
public static $WEB_Name		= "Cascade";
public static $WEB_SubName	= "Application d'apprentissage";
public static $WEB_SpeChr	= "★";
public static $WEB_Copy		= '&copy; Copyright 2018 Moncef Benkherrat';
public static $WEB_SubCopy1	= 'D\'après une idée de Didier Beaufol';
public static $WEB_SubCopy2	= '&nbsp;- IME Le Clos Parisis - Montigny';
public static $WEB_SubCopy3	= '&nbsp; et le développement de Moncef Benkherrat - ECAM-EPMI';
public static $WEB_Mail		= 'admin@frogg.fr';
/*Web config */
public static $WEB_Lang		= "fr";
public static $WEB_Encod	= "UTF-8";
/* Web creator infos */
public static $WEB_Auth		= 'Frogg - admin@frogg.fr';
public static $WEB_Generator= 'notepad++';
/* Web Log start infos*/
public static $WEB_LogStart	= '★ Bienvenu(e) sur le site Cascade ! ★';
public static $WEB_LogBg	= '#006400';
public static $WEB_LogCol	= '#fff';
}

/* Upload parameters */
$allowFileType	= 
				[	'image/png' ,//png
					'image/gif' ,//gif
					'image/jpg'  //jpg
				];
	
$uploadLimit	= 500000;
