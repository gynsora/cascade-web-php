//Intro
document.app.homeTitle	= 'PROFIL ET OBJECTIFS DU LOGICIEL «LA CASCADE»';
document.app.homeMessage= 'Programme s\'adressant à des enfants présentant des troubles attentionnels, des déficits de mémorisation, des difficultés d’origine neurologique. Il met en jeu les processus cognitifs et les notions suivantes : association, logique, mémorisation, dénombrement. Il permet de travailler la notion de lien dans le raisonnement pour conduire un processus à son terme à l\'aide de consignes. Il stimule la permanence de la pensée par un mécanisme d’enchainement et l\'utilisation d\'outils.';
document.app.homeSnd 	= 'Jazzure.mp3';//"EKO.mp3"

//Tarte aux pommes
document.app.exercice[1] = 
	{
	title	: 'Pâtisserie',
	
	exercice: 'Ta mère veut bien te faire la tarte aux pommes que tu lui demandes.	Elle s\'aperçoit qu\'il lui manque quelques produits. Peux-tu aller les chercher ? Elle a besoin de :',
	sndexo	: 'cascade55.mp3',
	
	conversion: 'Observe bien l\'image qu\'il faudra choisir pour obtenir les ingrédients nécessaires.',
	sndconv	: 'cascade3.mp3',
	
	objectif:	{
				//lvl 1
				'niveau 1' 	: { snd : 'cascade4.mp3' , txt : 'Pour obtenir  un ingrédient, clique l\'image correspondante, puis fais glisser cet ingrédient sur la desserte, à droite de l\'écran. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat.' }, 
				//lvl 2
				'niveau 2' 	: { snd : 'cascade6.mp3' , txt : 'Pour obtenir un ingrédient clique d\'abord sur un euro puis sur l\'image correspondante. Pour accéder au produit dont tu as besoin. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat.' },
				//quizz
				'quizz'		: {
								snd 	: 'cascade10.mp3',
								title 	: 'Voilà, la tarte est faite, bravo !' ,
								txt 	: 'Maintenant il te faut le couteau pour pouvoir la couper. Mais je ne vais pas donner cette possibilité à n\'importe qui !<br/>Pour savoir que c\'est bien ta tarte, tu dois essayer de répondre à quelques questions.<br/><br/>Clique sur Quizz ou sur Vrai ou faux', 
								
								intermediate: 'Pour voir le résultat clique sur le couteau:',
								intermedsnd	: 'cascade59.mp3',
								
								//QUIZZ
								'0'		: 	[
												{
												txt 	: 'Quelle image fallait-il choisir pour obtenir de la farine ?',
												snd 	: 'cascade30.mp3',
												choice	: { id : 4 , img : 'lvl2' }
												},
												{
												txt 	: 'Quelle couleur n\'existait pas dans les pièces ?',
												snd 	: 'cascade35.mp3',
												choice	: { id : 6 , img : 'lvl3' }
												},
												{
												txt 	: 'Quelle couleur de pièce était nécessaire pour obtenir une vache ?',
												snd 	: 'cascade32.mp3',
												choice	: { id : 3 , img : 'lvl3' }
												},
												{
												txt 	: 'De combien de paquets de beurre avais-tu besoin ?',
												snd 	: 'cascade38.mp3',
												choice	: { id : 3 , type : 'number' }
												},
												{
												txt 	: 'Avec l\'image de la poule tu obtenais quel ingrédient ?',
												snd 	: 'cascade31.mp3',
												choice	: { id : 2 , img : 'lvl1' } 
												},
												{
												txt 	: 'Avec une pièce rouge tu pouvais obtenir quel animal ou végétal ?',
												snd 	: 'cascade36.mp3',
												choice	: { id : 1 , img : 'lvl2' } 
												},
												{
												txt 	: 'De quelle image n\'avais tu pas besoin ?',
												snd 	: 'cascade33.mp3',
												choice	: { id : 6 , img : 'lvl2' } 
												},
												{
												txt 	: 'Avec une pièce bleue tu pouvais obtenir quel animal ou végétal ?',
												snd 	: 'cascade34.mp3',
												choice	: { id : 5 , img : 'lvl2' } 
												},
												{
												txt 	: 'Avec une pièce rouge tu pouvais obtenir quel ingrédient ?',
												snd 	: 'cascade37.mp3',
												choice	: { id : 1 , img : 'lvl1' } 
												}
											],
								
								//VRAI ou FAUX			
								'1'		: [
												{
												txt 	: 'Tu avais besoin d\'1 seul paquet de farine.',
												snd 	: 'cascade47.mp3',
												choice	: { type : 'tf-number' , id : 4 , value : 1 } 
												},
												{
												txt 	: 'Avec du blé tu pouvais obtenir une pomme.',
												snd 	: 'cascade40.mp3',
												choice	: { type : 'tf-compare' , id1 : 4 , id2 : 1 } 												
												},
												{
												txt 	: 'Avec la pièce orange tu pouvais obtenir une pomme.',
												snd 	: 'cascade39.mp3',
												choice	: { type : 'tf-compare' , id1 : 4 , id2 : 1 } 	
												},
												{
												txt 	: 'Tu avais besoin de 7 ingrédients en tout.',
												snd 	: 'cascade48.mp3',
												choice	: { type : 'tf-total' , value : 7 } 
												},
												{
												txt 	: 'Il n\'y avait pas de pièce bleue.',
												snd 	: 'cascade45.mp3',
												choice	: { type : 'tf-notexist' , id : 5 } 
												},
												{
												txt 	: 'Tu devais avoir une pièce verte pour obtenir un paquet de beurre.',
												snd 	: 'cascade41.mp3',
												choice	: { type : 'tf-compare' , id1 : 3 , id2 : 3 } 	
												},						
												{
												txt 	: 'Dans les animaux ou végétaux intrus il y avait un chien.',
												snd 	: 'cascade42.mp3',
												choice	: { type : 'tf-notexist' , id : 6 } 
												},		
												{
												txt 	: 'Avec une pièce orange tu pouvais obtenir de la farine.',
												snd 	: 'cascade44.mp3',
												choice	: { type : 'tf-compare' , id1 : 4 , id2 : 4 } 
												},	
												{
												txt 	: 'Tu avais besoin de 3 œufs.',
												snd 	: 'cascade46.mp3',
												choice	: { type : 'tf-number' , id : 2 , value : 3 } 
												},	
												{
												txt 	: 'Pour faire la tarte il ne fallait pas de farine.',
												snd 	: 'cascade43.mp3',
												choice	: { type : 'tf-notexist' , id : 4 } 
												}
											]
								
								}
				},
	
	msgok	: 'Parfait, tu as tous les ingrédients pour finir la tarte !',
	sndok	: 'cascade8.mp3',
	
	msgko	: 'Regarde les résultats et complète les quantités en reprenant l\'exercice',
	sndko	: 'cascade7.mp3',
	
	target 	: 'Desserte',
	parts 	: [ 
	    { nbok : 6 , id : 1 , txt : "pomme"				,	txts : "pommes"	,
	      txt2 : "un pommier", txt3 : "pièce rouge" } , 
	    { nbok : 2 , id : 2 , txt : "oeuf"				,	txts : "oeufs" ,
	      txt2 : "une poule" , txt3 : "pièce jaune" } , 
	    { nbok : 5 , id : 3 , txt : "plaquette de beurre",	txts : "plaquettes de beurre",
	      txt2 : "une vache" , txt3 : "pièce verte" } , 
	    { nbok : 2 , id : 4 , txt : "paquet de farine" 	,	txts : "paquets de farine",
	      txt2 : "du blé" 	, txt3 : "pièce orange" } , 
	    { nbok : 12, id : 5 , txt : "sucre" 			,	txts : "sucres" ,
	      txt2 : "de la canne à sucre" 	, txt3 : "pièce bleue" },
				{ fake : true , id : 6 , txt2 :'chien' },
				{ fake : true , id : 7 , txt2 :'cerise' },
				{ fake : true , id : 8 , txt2 :'lait' },
				{ fake : true , id : 9 , txt2 :'artichaut' },
				{ fake : true , id : 10, txt2 :'bol' },
				{ fake : true , id : 11, txt2 :'poire' },
				{ fake : true , id : 12, txt2 :'boule' },
				{ fake : true , id : 13, txt2 :'casquette' },
				{ fake : true , id : 14, txt2 :'patate' },
				{ fake : true , id : 15, txt2 :'drapeau' }
			]
		
	}
	
//Construction
document.app.exercice[2] = 
	{
	title	: 'Construction',
	
	exercice: 'Pendant les vacances les travaux se sont arrêtés. Tes parents décident de terminer la maison pour en profiter. Ils te demandent de les aider en allant chercher le matériel qui manque.',
	sndexo	: 'cascade50.mp3',
		
	conversion: 'Observe bien l\'outil qui sera nécessaire pour obtenir le matériel souhaité.',
	sndconv	: 'cascade51.mp3',
		
	objectif:	{
				//lvl 1
				'niveau 1'	: { snd : 'cascade52.mp3', txt : 'Pour obtenir un matériau, clique l\'outil correspondant, puis fais glisser le matériau dans le magasin à droite de l\'écran. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat' }, 
				//lvl 2
				'niveau 2'	: { snd : 'cascade2.mp3' , txt : 'Pour obtenir un matériau clique d\'abord sur un euro puis sur l\'outil correspondant. Pour accéder au matériau dont tu as besoin.' },
				//quizz
				'quizz'		: {
								snd 	: 'cascade9.mp3',
								title 	: 'Voilà, la maison est construite, bravo !' ,
								txt 	: 'Maintenant il te faut la clef pour pouvoir entrer. Mais je ne vais pas donner la clef à n\'importe qui !<br/>Pour savoir que c\'est bien ta maison, tu dois essayer de répondre à quelques questions.<br/><br/>Clique sur Quizz ou sur Vrai ou faux', 
								
								intermediate: 'Pour voir le résultat clique sur la clé:',
								intermedsnd	: 'cascade58.mp3',
								
								//QUIZZ
								'0'		: 	[
												{
												txt 	: 'Quel est l\'outil dont on n\'avait pas besoin ?',
												snd 	: 'cascade14.mp3',
												choice	: { id : 8 , img : 'lvl2' }
												},
												{
												txt 	: 'Quelle couleur n\'existait pas dans les pièces ?',
												snd 	: 'cascade16.mp3',
												choice	: { id : 6 , img : 'lvl3' }
												},
												{
												txt 	: 'Quel outil fallait-il choisir  pour obtenir un pot de peinture ?',
												snd 	: 'cascade11.mp3',
												choice	: { id : 2 , img : 'lvl2' }
												},
												{
												txt 	: 'Avec quelle couleur de pièce pouvais-tu obtenir une brouette ?',
												snd 	: 'cascade13.mp3',
												choice	: { id : 4 , img : 'lvl3' }
												},
												{
												txt 	: 'Quelle couleur de pièce était nécessaire pour obtenir une brique ?',
												snd 	: 'cascade18.mp3',
												choice	: { id : 1 , img : 'lvl3' } 
												},
												{
												txt 	: 'Avec un marteau tu obtenais quel matériel ?',
												snd 	: 'cascade12.mp3',
												choice	: { id : 5 , img : 'lvl1' } 
												},
												{
												txt 	: 'Avec une pièce bleue tu pouvais obtenir quel outil ?',
												snd 	: 'cascade15.mp3',
												choice	: { id : 1 , img : 'lvl2' } 
												},
												{
												txt 	: 'De combien de sacs de ciment avait-on besoin ?',
												snd 	: 'cascade19.mp3',
												choice	: { id : 4 , type : 'number' }  //type : 'nbok' ?
												},
												{
												txt 	: 'Avec une pièce rouge tu pouvais obtenir quel outil ?',
												snd 	: 'cascade17.mp3',
												choice	: { id : 3 , img : 'lvl2' } 
												}
											],
																						
								//VRAI ou FAUX			
								'1'		: [
												{
												txt 	: 'Il fallait une pièce verte pour obtenir un sac du ciment.',
												snd 	: 'cascade22.mp3',
												choice	: { type : 'tf-compare' , id1 : 4 , id2 : 4 } 
												},
												{
												txt 	: 'Tu avais besoin d\'1 porte.',
												snd 	: 'cascade28.mp3',
												choice	: { type : 'tf-number' , id : 5 , value : 1 }
												},
												{
												txt 	: 'Avec la pièce orange tu pouvais obtenir une truelle.',
												snd 	: 'cascade20.mp3',
												choice	: { type : 'tf-compare' , id1 : 2 , id2 : 1 } 
												},
												{
												txt 	: 'Tu avais besoin de 6 outils en tout.',
												snd 	: 'cascade29.mp3',
												choice	: { type : 'tf-total' , value : 6 }
												},
												{
												txt 	: 'Il n\'y avait pas besoin de briques.',
												snd 	: 'cascade24.mp3',
												choice	: { type : 'tf-number' , id : 1 , value : 0 }
												},
												{
												txt 	: 'Il fallait une pièce orange pour obtenir un pot de peinture.',
												snd 	: 'cascade25.mp3',
												choice	: { type : 'tf-compare' , id1 : 2 , id2 : 2 } 
												},						
												{
												txt 	: 'Tu avais besoin de 2 sacs de ciment.',
												snd 	: 'cascade27.mp3',
												choice	: { type : 'tf-number' , id : 4 , value : 2 }
												},		
												{
												txt 	: 'Dans les outils intrus il y avait une scie.',
												snd 	: 'cascade23.mp3',
												choice	: { type : 'tf-notexist' , id : 8 } 
												},	
												{
												txt 	: 'Avec une truelle tu pouvais obtenir une porte.',
												snd 	: 'cascade21.mp3',
												choice	: { type : 'tf-compare' , id1 : 1 , id2 : 5 } 
												},	
												{
												txt 	: 'Il n\'y avait pas de pièce bleue.',
												snd 	: 'cascade26.mp3',
												choice	: { type : 'tf-notexist' , id : 1 }
												}
											]
								}
				},
	
	msgok	: 'Parfait, tu as tous les matériaux pour finir la maison !',
	sndok	: 'cascade54.mp3',
	
	msgko	: 'Regarde les résultats et complète les quantités en reprenant l\'exercice',
	sndko	: 'cascade7.mp3',
	
	target 	: 'Le magasin',
	parts 	: [ 
	    { nbok : 10, id : 1 , txt : 'brique'			,	txts : 'briques'			,
	      txt2 : 'une truelle', txt3 : 'pièce bleue' } , 
	    { nbok : 4 , id : 2 , txt : 'pot de peinture'	,	txts : 'pots de peinture' 	,
	      txt2 : 'un pinceau', txt3 : 'pièce orange' } , 
	    { nbok : 8 , id : 3 , txt : 'tuile'				,	txts : 'tuiles'				,
	      txt2 : 'une echelle', txt3 : 'pièce rouge' } , 
	    { nbok : 3 , id : 4 , txt : 'sac de ciment' 	,	txts : 'sacs de ciment' 	,
	      txt2 : 'une brouette', txt3 : 'pièce verte' } , 
	    { nbok : 2 , id : 5 , txt : 'porte' 			,	txts : 'portes' 			,
	      txt2 : 'un marteau' 	, txt3 : 'pièce jaune' } ,
				{ fake : true , id : 6 , txt2 : 'bétonnière' },
				{ fake : true , id : 7 , txt2 : 'clé à molette' },
				{ fake : true , id : 8 , txt2 : 'scie' },
				{ fake : true , id : 9 , txt2 : 'éponge' },
				{ fake : true , id : 10, txt2 : 'mètre' },
				{ fake : true , id : 11, txt2 : 'pelle' },
				{ fake : true , id : 12, txt2 : 'perceuse' },
				{ fake : true , id : 13, txt2 : 'rabot' },
				{ fake : true , id : 14, txt2 : 'seau' },
				{ fake : true , id : 15, txt2 : 'tourne vis' }				
			]
		
	}
	

document.app.exercice[3] = 
	{
	title	: 'Réparation',

	    exercice : 'La maison nécessites des travaux de rénovation suite aux orages violents qui ont eu lieu',
	    
	    sndexo	: 'cascade60.mp3',
		
	conversion: 'Observe bien l\'outil qui sera nécessaire pour obtenir le matériel souhaité.',
	sndconv	: 'cascade61.mp3',
		
	objectif:	{
				//lvl 1
				'niveau 1'	: { snd : 'cascade52.mp3', txt : 'Pour obtenir un matériau, clique l\'outil correspondant, puis fais glisser le matériau dans le magasin à droite de l\'écran. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat' }, 
				//lvl 2
				'niveau 2'	: { snd : 'cascade2.mp3' , txt : 'Pour obtenir un matériau clique d\'abord sur un euro puis sur l\'outil correspondant. Pour accéder au matériau dont tu as besoin.' },
				//lvl 3
				'niveau 3'	: { snd : 'cascade52.mp3', txt : 'Pour obtenir un matériau, clique l\'outil correspondant, puis fais glisser le matériau dans le magasin à droite de l\'écran. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat' }, 
				//quizz
				},
	
	msgok	: 'Parfait, tu as tous les matériaux pour réparer la maison !',
	sndok	: 'cascade62.mp3',
	
	msgko	: 'Regarde les résultats et complète les quantités en reprenant l\'exercice',
	sndko	: 'cascade63.mp3',
	
	target 	: 'Le magasin',
	parts 	: [ 
	    { nbok : 2, id : 1 , txt : 'brique'			,	txts : 'briques',
	      txt2 : 'une truelle'	, txt3 : 'anneau marron', txt4 : 'anneau marron',
	      assoc2 : [4, 4], assoc3 : [ 7, 7 ] } , 
	    { nbok : 1 , id : 2 , txt : 'pot de peinture'	,	txts : 'pots de peinture',
	      txt2 : 'un pinceau'	, txt3 : 'triangle vert', txt4 : 'triangle vert',
	      assoc2 :  [ 8 ], assoc3 : [ 6, 9 ] } , 
	    { nbok : 2 , id : 3 , txt : 'tuile'				,	txts : 'tuiles'	,
	      txt2 : 'une echelle'	, txt3 : 'hexagone rouge', txt4 : 'hexagone rouge',
	      assoc2 :  [ 3, 3 ], assoc3 : [ 2, 9 ]} , 
	    { nbok : 2 , id : 4 , txt : 'sac de ciment' 	,	txts : 'sacs de ciment' ,
	      txt2 : 'une brouette'	, txt3 : 'carré jaune', txt4 : 'carré jaune',
	      assoc2 : [ 1, 1 ], assoc3 : [ 2, 6 ] } , 
	    { nbok : 2 , id : 5 , txt : 'porte' 			,	txts : 'portes' ,
	      txt2 : 'un marteau' 	, txt3 : 'tiret vert', txt4 : 'tiret vert',
	      assoc2 : [ 5 ], assoc3 : [ 2, 7 ] } ,
	    
	    { fake : true , id : 6 , txt2 : 'bétonnière', txt3 : 'cercle jaune', txt4 : 'cercle jaune' },
	    { fake : true , id : 7 , txt2 : 'clé à molette', txt3 : 'triangle vert', txt4 : 'triangle vert' },
	    { fake : true , id : 8 , txt2 : 'scie', txt3 : 'carré bleu', txt4 : 'carré bleu' },
	    { fake : true , id : 9 , txt2 : 'éponge', txt3 : 'étoile jaune', txt4 : 'étoile jaune' },
	    { fake : true , id : 10, txt2 : 'mètre' },
	    { fake : true , id : 11, txt2 : 'pelle' },
	    { fake : true , id : 12, txt2 : 'perceuse' },
	    { fake : true , id : 13, txt2 : 'rabot' },
	    { fake : true , id : 14, txt2 : 'seau' },
	    { fake : true , id : 15, txt2 : 'tourne vis' }				
	]
	    
	}

document.app.exercice[4] = 
	{
	title	: 'Assemblage',

	    exercice : 'De quels éléments a tu besoin pour assembler une voiture ?',
	    
	    sndexo	: 'cascade64.mp3',
		
	conversion: 'Observe bien l\'outil qui sera nécessaire pour obtenir le matériel souhaité.',
	sndconv	: 'cascade61.mp3',
		
	objectif:	{
				//lvl 1
				'niveau 1'	: { snd : 'cascade52.mp3', txt : 'Pour obtenir un matériau, clique l\'outil correspondant, puis fais glisser le matériau dans le magasin à droite de l\'écran. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat' }, 
				//lvl 2
				'niveau 2'	: { snd : 'cascade2.mp3' , txt : 'Pour obtenir un matériau clique d\'abord sur un euro puis sur l\'outil correspondant. Pour accéder au matériau dont tu as besoin.' },
				//lvl 3
				'niveau 3'	: { snd : 'cascade52.mp3', txt : 'Pour obtenir un matériau, clique l\'outil correspondant, puis fais glisser le matériau dans le magasin à droite de l\'écran. Dès que tu auras stocké les quantités nécessaires à la commande, valide le résultat' }, 
				//quizz
				},
	
	msgok	: 'Parfait, tu as tous les matériaux pour assembler une nouvelle voiture !',
	sndok	: 'cascade65.mp3',
	
	msgko	: 'Regarde les résultats et complète les quantités en reprenant l\'exercice',
	sndko	: 'cascade63.mp3',
	
	target 	: 'Le magasin',
	parts 	: [ 
	    { nbok : 4, id : 1 , txt : 'roue'			,	txts : 'roues',
	      txt2 : 'manomètre'	, txt3 : 'anneau marron', txt4 : 'anneau marron',
	      assoc1 : [1], assoc2 : [4], assoc3 : [ 6, 9 ] } , 
	    { nbok : 1 , id : 2 , txt : 'moteur'	,	txts : 'moteurs',
	      txt2 : 'de l\'essence'	, txt3 : 'triangle vert', txt4 : 'triangle vert',
	      assoc1 : [2], assoc2 :  [ 3, 3 ], assoc3 : [ 7, 7 ] } , 
	    { nbok : 4 , id : 3 , txt : 'portière'				,	txts : 'portières'	,
	      txt2 : 'une clef'	, txt3 : 'hexagone rouge', txt4 : 'hexagone rouge',
	      assoc1 : [3], assoc2 :  [ 8 ], assoc3 : [ 2, 6 ]} , 
	    { nbok : 1 , id : 4 , txt : 'volant' 	,	txts : 'volants' ,
	      txt2 : 'un claxon'	, txt3 : 'carré jaune', txt4 : 'carré jaune',
	      assoc1 : [4], assoc2 : [ 2 ], assoc3 : [ 2, 9 ] } , 
	    { nbok : 4 , id : 5 , txt : 'siège' 			,	txts : 'sièges' ,
	      txt2 : 'une ceinture' 	, txt3 : 'tiret vert', txt4 : 'tiret vert',
	      assoc1 : [5], assoc2 : [ 1, 1 ], assoc3 : [ 2, 3 ] } ,
	    
	    { fake : true , id : 6 , txt2 : 'antenne', txt3 : 'cercle jaune', txt4 : 'cercle jaune' },
	    { fake : true , id : 7 , txt2 : 'gente', txt3 : 'triangle vert', txt4 : 'triangle vert' },
	    { fake : true , id : 8 , txt2 : 'logo', txt3 : 'carré bleu', txt4 : 'carré bleu' },
	    { fake : true , id : 9 , txt2 : 'girophare', txt3 : 'étoile jaune', txt4 : 'étoile jaune' },
	    { fake : true , id : 10, txt2 : 'bougie' },
	]
	    
	}
