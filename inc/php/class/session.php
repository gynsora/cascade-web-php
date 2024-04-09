<?
class S
{
/*
public static $Sid;
public static $Sep="_@_";
public static $Tim=0;
function Cook($n){return (isset($_COOKIE[$n]) and $_COOKIE[$n]) ?explode(self::$Sep,$_COOKIE[$n]):false;}
function Sess($n){return (isset($_SESSION[$n])and $_SESSION[$n])?explode(self::$Sep,$_SESSION[$n]):false;}
function DelC($n){setcookie($n, false,self::$Tim,"/");unset($_SESSION[$n]);}
function DelS($n){$_SESSION[$n]=false;unset($_SESSION[$n]);}
function SetC($n,$v){setcookie($n,implode(S::$Sep,$v),self::$Tim,"/");}
function SetS($n,$v){$_SESSION[$n]=implode(S::$Sep,$v);}
*/

function secusize()
{
//Securise session
if(!isset($_SESSION['user_id']))
	{
	$_SESSION['user_id']= session_id();
	$_SESSION['new_id']	= 1;
	$_SESSION['key']	= C::$WEB_Key;
	}
else{
	$_SESSION['new_id']=0;
	}

if( $_SESSION['user_id']!=session_id() || !isset($_SESSION['key']) || $_SESSION['key'] != C::$WEB_Key )
	{
	exit( "An error occured with your session" );
	}
}

function __construct()
	{
	session_start();
	//session_id();self::$Tim=Time()+20000000;
	self::secusize();
	}
}
$S=new S;