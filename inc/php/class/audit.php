<?
class A
{
public static $UserIP;
public static $PName;
public static $PgId;
public static $Method;
public static $SrvWeb;
public static $UrlFul;
public static $Browse;
public static $Langue;
public static $Cookie;
public static $UrlPort;
function getSrvInf($info){return isset($_SERVER[$info])?$_SERVER[$info]:'';}
function getUserIP(){if(isset($_SERVER["HTTP_CLIENT_IP"])){return $_SERVER["HTTP_CLIENT_IP"];}elseif(isset($_SERVER["HTTP_X_FORWARDED_FOR"])){return $_SERVER["HTTP_X_FORWARDED_FOR"];}elseif(isset($_SERVER["HTTP_X_FORWARDED"])){return $_SERVER["HTTP_X_FORWARDED"];}elseif(isset($_SERVER["HTTP_FORWARDED_FOR"])){return $_SERVER["HTTP_FORWARDED_FOR"];}elseif(isset($_SERVER["HTTP_FORWARDED"])){return $_SERVER["HTTP_FORWARDED"];}else{return $_SERVER["REMOTE_ADDR"];}return '';}
//function saveToDb($userId){foreach(C::$TOOL_NoSav as $key=>$IP){if(strpos($IP,$this->UserIP))return false;}GLOBAL $DB;$DB->request("INSERT INTO a (NOM,FK_U,FK_P,IP,METHOD,SRV,FULLURL,BROWSER,LANGUE,COOKIE,ADDED) VALUES('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s',now())",array($this->PName,$userId,$this->PgId,$this->UserIP,$this->Method,$this->SrvWeb,$this->UrlFul,$this->Browse,$this->Langue,$this->Cookie));}
function __construct()
{
$this->UserIP=$this->getUserIP();
$this->Browse=$this->getSrvInf("HTTP_USER_AGENT");
$this->Langue=$this->getSrvInf("HTTP_ACCEPT_LANGUAGE");
$this->Cookie=$this->getSrvInf("HTTP_COOKIE");
$this->Method=$this->getSrvInf("REQUEST_METHOD");
$this->SrvWeb=$this->getSrvInf("SERVER_NAME");
$this->UrlFul=$this->getSrvInf("REQUEST_URI");

//$this->PName=C::$Pa;$this->PgId	=U::$CU[$this->PName];$this->UrlPort=$this->getSrvInf('SERVER_PORT');
}
}
$A=new A();
?>