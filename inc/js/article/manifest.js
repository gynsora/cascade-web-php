//cache download progression
var appCacheProgress	= 0;
//cache total file
var appCacheTotalFile	= 0;
//set update in progress status if required
var updateIsLoading = false;
//cache status 
var cacheStatus = window.applicationCache.status;

console.log( window.applicationCache );

//get wache progress
window.applicationCache.addEventListener(
	"progress",
	function(e)
		{
			if(document.app && document.app.contentUPDATE && document.app.contentUPDATE.displayProgress)
				document.app.contentUPDATE.displayProgress( appCacheProgress , appCacheTotalFile );
			appCacheProgress++;
		},
	false
	);
	
$( document ).ready( function()
	{
	if( $('html').attr('manifest')==null && window.applicationCache.status!=3)
		{	
		if( cacheStatus==0 )
			{
			//no cache exist
			document.app.popin = new Popin( 
					"L'application nécessite une connexion internet,<br/>voulez-vous l'enregistrer localement pour y accéder sans connexion ?",
					"info",
					function(){ document.location='/?manifest=manifest'; },
					function(){ return false; }
					);
			}
		}
	else{
		$.ajax({
			type	: "get",
			url		: $('html').attr('manifest'),
			dataType: "text",
			cache	: false,
			async	: true,
			success	: function( msg )
				{
				var msg=msg
						.replace(new RegExp("(NETWORK|FALLBACK):" +"((?!(NETWORK|FALLBACK|CACHE):)[\\w\\W]*)","gi"),"")
						.replace(new RegExp("(CACHE:)|(\/cascade\.manifest\.php)","g" ),"")
						.replace(new RegExp("#[^\\r\\n]*(\\r\\n?|\\n)","g" ),"")
						.replace(new RegExp("CACHE MANIFEST\\s*|\\s*$","g" ),"")
						.replace(new RegExp("[\\r\\n]+", "g"),"#");
				appCacheTotalFile = msg.split( "#" ).length - 3; //remove manifest file, ./website_url and ./ as not counted as file in total
			
				logger('total files = ' + appCacheTotalFile);
				},
			error: function(jqXHR, textStatus, errorThrown)
				{
					alert('Erreur inconue, veuillez vérifier le fichier : ' + $('html').attr('manifest'));
				}
			});	
			
		// recuperation du manifest pour savoir l etat du cache
		$( window.applicationCache ).bind("checking",function(event){console.log( "Recherche de mise à jour" );});
		// renvoye Telechargement des fichiers du manifest
		$( window.applicationCache ).bind("downloading",function(event){console.log( "Début du téléchargement de la mise à jour" );});
		// renvoye fin de mise en cache
		$( window.applicationCache ).bind("cached",function(event){document.app.contentUPDATE.displayResult( "Le site a été correctement téléchargé" , "ok" );});
		// renvoye nouvelle mise a jour
		$( window.applicationCache ).bind("updateready",function(event){document.app.contentUPDATE.displayResult( "Le site a été mis à jour" , "ok" );});
		// renvoye  Manifest non trouv
		$( window.applicationCache ).bind("obsolete",function(event){document.app.contentUPDATE.displayResult( "Référence à la mise à jour non trouvée" , "ko" );});
		// renvoye une erreur lors du traitement
		$( window.applicationCache ).bind("error",function(event){document.app.contentUPDATE.displayResult( "Une erreur est survenue" , "ko" );});	
		}
	});
