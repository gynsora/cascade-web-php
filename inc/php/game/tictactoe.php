<script type="text/javascript" <?=$async?> src="<?=$foldJs?>class/tictactoe.js"></script>
<script type="text/javascript" <?=$async?> src="<?=$foldJs?>article/tictactoe.js"></script>

<style>
#formtictactoe {width:100%;max-width:600px;margin:auto;text-align:center}

#tictactoe DIV.p1 
{	
background-image:url(inc/img/tictactoe/cross.png);
}

#tictactoe DIV.p2
{
background-image:url(inc/img/tictactoe/circle.png);
}

#tictactoe DIV
{
vertical-align: top;
width:33%;
padding-top:33%;
background-size: cover;
display:inline-block;
box-shadow: 0px 0px 0px 1px #408080 inset;
}
</style>

<div class="more hvr-back-pulse"></div>
<h2><?=$articles[$r]["ptitle"]?><?=$articles[$r]["title"]?></h2>
<div class="partContent">

	<div id="introduction">
		Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
		(<a href="https://en.wikipedia.org/wiki/Tic-tac-toe" target="_blank">source wikipedia</a>)<br/>
		Scripts are in pure javascript and no game datas are stored on server side.
	</div>

	<div id="help">
		<ul>
			<li>
				<b>1. You can play clicking in the playground rows :</b><br/>
				The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
			</li>
			<li>
				<b>2. You can choose a difficulty :</b><br/>
				If you find the game too easy or too hard, you can change game difficulty on bottom of the playground
			</li>
			<li>
				<b>3. Show your score :</b><br/>
				If needed you can view the score of your played games as long as you didn't quit this page 
			</li>			
			<li>
				<b>4. Reset the game :</b><br/>
				If needed you can reset the game and reinitialize the playground 
			</li>
		</ul>
	</div>	
</div>	
	
<div class="more hvr-back-pulse"></div>
<h2><?=$articles[$r]["ptitle"]?><?=$articles[$r]["title"]?> - The (var) game</h2>
<div class="partContent">

<form id="formtictactoe">
	<div id="tictactoe"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
	<ul>
		<li>
			<label for="game-difficulty">Select a difficulty</label>
			<select name="game-difficulty">
				<option value="0">easy</option>
				<option value="1">normal</option>
				<option value="2">hard</option>
				<option value="3">very hard</option>
				<option value="4">impossible...(without cheating)</option>
			</select>
		</li>
	</ul>
	<input class="hvr-back-pulse" type="button" onclick="document.app.Game.showScore()" value="Show total score">
	<input class="hvr-back-pulse red" type="button" onclick="document.app.Game.externalResetGame()" value="Reset the game">
</form>

</div>