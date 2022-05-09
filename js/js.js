function start() { // Inicio da função start()

	$("#inicio").hide(); //.hide para ocultar
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>"); //serão apresentadas essas seguintes 4 div
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

	//Principais variáveis do jogo
	var podeAtirar=true
	var fimdejogo=false
	var pontos=0;
	var salvos=0;
	var perdidos=0;
	var energiaAtual=3;
	var jogo = {}
	var velocidade=5;
	var velocidade1=3
	var velocidade2=1	
	var posicaoY = parseInt(Math.random() * 334); //Math.random é uma função randomica onde o helicptero ira se movimentar aleatoriamente entre 0 e 334

	
	var TECLA = {
		W: 87,
		S: 83,
		D: 68
		}
	
		jogo.pressionou = [];

	var somDisparo=document.getElementById("somDisparo");
	var somExplosao=document.getElementById("somExplosao");
	var musica=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");

	//Música em loop
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);//evento inserido de musica para tocar em loop
	musica.play();

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){ //keydown identifica que o usuario pressionou uma tecla
		jogo.pressionou[e.which] = true;
		});
	
		$(document).keyup(function(e){ //keyup significa que nao há nehuma tecla pressionada ainda
		   jogo.pressionou[e.which] = false;
		});
	
	//Game Loop
	jogo.timer = setInterval(loop,30);//jogo com propiedade timer, setinterval para colocar temporizador, chamando função loop a cada 30 milisegundos
	
	function loop() {
	
	movefundo();
	movejogador();
	moveinimigo1();
	moveinimigo2();
	moveamigo();
	colisao();
	placar();
	energia();

	} // Fim da função loop()

	//Função que movimenta o fundo do jogo
	
	function movefundo() {
	
		esquerda = parseInt($("#fundoGame").css("background-position"));//parseInt. converte uma string em numero inteiro
		$("#fundoGame").css("background-position",esquerda-1);
		
		} // fim da função movefundo()

	function movejogador() {

	if (jogo.pressionou[TECLA.W]) { //ao pressionar um tecla, ou seja true
		var topo = parseInt($("#jogador").css("top")); //atribuindo ao var topo, o css da div jogador no top
		$("#jogador").css("top",topo-10); //atualizar o css top da div jogador,  ao topo -10	
		
		if (topo<=0) {
		$("#jogador").css("top",topo+10);
		}
	}

	if (jogo.pressionou[TECLA.S]) { //ao pressionar um tecla, ou seja true
		
		var topo = parseInt($("#jogador").css("top")); 
		$("#jogador").css("top",topo+10);
		
		if (topo>=434) {	
		$("#jogador").css("top",topo-10);
		}
	} 
	
	if (jogo.pressionou[TECLA.D]) {
		
		//Chama função Disparo	
		disparo();
		}
	}// fim da função movejogador()

	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left")); //pega a posição .css left da div inimigo1
		$("#inimigo1").css("left",posicaoX-velocidade); //vai substrair -velocidad que é igual a -5
		$("#inimigo1").css("top",posicaoY); //posicionando o inimigo posição top, sendo posiçãoy é randomico
			
		if (posicaoX<=0) {
			posicaoY = parseInt(Math.random() * 334); //reposionando num valor randomico entre 0 e 334
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
		}
	} //Fim da função moveinimigo1()
	
	function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-velocidade1);
				
		if (posicaoX<=0) {
			
		$("#inimigo2").css("left",775);
					
		}
	} // Fim da função moveinimigo2()

	function moveamigo() {
	
	posicaoX = parseInt($("#amigo").css("left"));
	$("#amigo").css("left",posicaoX+velocidade2);
					
		if (posicaoX>900) {		
		$("#amigo").css("left",0);				
	}
	} // fim da função moveamigo()

	function disparo() {

		somDisparo.play();	
		if (podeAtirar==true) {
			
		podeAtirar=false; //false para que o usuario nao possa realizar um novo tiro enquanto essa função estiver em execusão
		
		topo = parseInt($("#jogador").css("top")); //top para saber a posição do jogador 
		posicaoX= parseInt($("#jogador").css("left")); //posição left para saber onde está o jogador
		tiroX = posicaoX + 190;//Disparo irá sair entre a posição da var tirox e topoTiro
		topoTiro=topo+38;//Se aumentar a soma, o disparo sai mais para baixo
		$("#fundoGame").append("<div id='disparo'></div");//criando a div disparo dentro dentro da fundogame do html
		$("#disparo").css("top",topoTiro);
		$("#disparo").css("left",tiroX);
		
		var tempoDisparo=window.setInterval(executaDisparo, 30);//window.setInterval para criar função de tempo; no caso a função executaDisparo a cada 30 milisegundos 
		
		} //Fecha podeAtirar

		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));//posiçãoX vai pegar a posição inicial da div disparo
			$("#disparo").css("left",posicaoX+15);//vai fazer ela caminhar +15 unidades, se quiser mais rapido ou lento, so alterar o numero
	
				if (posicaoX>900) { //quando o tiro passar da posição 900
							
				window.clearInterval(tempoDisparo);//excluir propiedade de tempo do tempoDisparo
				tempoDisparo=null; //igual a null
				$("#disparo").remove(); //remover a div disparo da tela
				podeAtirar=true; //depois de ter realizado todo o algoritmo e o disparo tiver sumido, o usuario podera atirar de novo
						
			}
		} // Fecha executaDisparo()
	} // Fecha disparo()

	function colisao() {
	var colisao1 = ($("#jogador").collision($("#inimigo1"))); // jogador com o inimigo1
	var colisao2 = ($("#jogador").collision($("#inimigo2")));
	var colisao3 = ($("#disparo").collision($("#inimigo1")));
	var colisao4 = ($("#disparo").collision($("#inimigo2")));
	var colisao5 = ($("#jogador").collision($("#amigo")));
	var colisao6 = ($("#inimigo2").collision($("#amigo")));

		
	if (colisao1.length>0) { //a partir de 1 as duas imagens colidem 
	
	energiaAtual--;
	inimigo1X = parseInt($("#inimigo1").css("left")); // Posição left do inimigo1
	inimigo1Y = parseInt($("#inimigo1").css("top"));//poisção top do inimigo1
		
	explosao1(inimigo1X,inimigo1Y);

	posicaoY = parseInt(Math.random() * 334); //Cria um valor randomico para reposisionar (entre 0 e 334) o inimigo1
	$("#inimigo1").css("left",694);
	$("#inimigo1").css("top",posicaoY);
	}

	// jogador com o inimigo2 
	if (colisao2.length>0) {
	
		energiaAtual--;
		inimigo2X = parseInt($("#inimigo2").css("left"));//pegando a posição left do inimigo2
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		explosao2(inimigo2X,inimigo2Y);//função com as posições do inimigo2 como parametros
				
		$("#inimigo2").remove();//remover o inimigo 2 da tela
				
		reposicionaInimigo2();//função para reposisionar o inimigo 2 apos 5 segundos e nao automaticamente logo enseguida de remover
				
		}	

	// Disparo com o inimigo1
	if (colisao3.length>0) {
		
		//Barra de energia

	function energia() {
	
		if (energiaAtual==3) {
		
		$("#energia").css("background-image", "url(imgs/energia3.png)");
		}

		if (energiaAtual==2) {
		
		$("#energia").css("background-image", "url(imgs/energia2.png)");
		}

		if (energiaAtual==1) {
		
		$("#energia").css("background-image", "url(imgs/energia1.png)");
		}

		if (energiaAtual==0) {
		
		$("#energia").css("background-image", "url(imgs/energia0.png)");
		
		//Game Over
	}

} // Fim da função energia()

		velocidade=velocidade+0.1;
		pontos=pontos+100;
		inimigo1X = parseInt($("#inimigo1").css("left"));
		inimigo1Y = parseInt($("#inimigo1").css("top"));
			
		explosao1(inimigo1X,inimigo1Y);
		$("#disparo").css("left",950);
			
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);	
	}

	// Disparo com o inimigo2
		
	if (colisao4.length>0) {
		
		velocidade1=velocidade1+0.1
		pontos=pontos+50;
		inimigo2X = parseInt($("#inimigo2").css("left"));
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		$("#inimigo2").remove();
		
		explosao2(inimigo2X,inimigo2Y);
		$("#disparo").css("left",950);
			
		reposicionaInimigo2();		
		}

	// jogador com o amigo
	if (colisao5.length>0) {

		somResgate.play();
		velocidade2=velocidade2+0.1
		salvos++;
		reposicionaAmigo();
		$("#amigo").remove();
		}

	//Inimigo2 com o amigo
	if (colisao6.length>0) {
			
		perdidos++;
		amigoX = parseInt($("#amigo").css("left"));
		amigoY = parseInt($("#amigo").css("top"));
		explosao3(amigoX,amigoY);
		$("#amigo").remove();
				
		reposicionaAmigo();
				
		}

	} //Fim da função colisao()	
	

	function explosao1(inimigo1X,inimigo1Y) {//com as variaveis como parametro

		somExplosao.play();
		$("#fundoGame").append("<div id='explosao1'></div");//criando na fundogame uma div
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");//essa div na propiedade background do css, vai colocar uma imagem
		var div=$("#explosao1");//var com a div como atribuição
		div.css("top", inimigo1Y);//vai indicar onde vai a aprecer a exploção
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");// animate é uma função do jquery, 200px e largura, a opacidade começa o 15 e vai 200 e sumir, slow para indicar com que velocidade quer que contaça tal evento
		
		var tempoExplosao=window.setInterval(removeExplosao, 1000);//variavel de tempo, que irá ativar a functión removeExplosao apos 1 segudo
		
			function removeExplosao() {
				
				div.remove();//remove a div
				window.clearInterval(tempoExplosao);//remove a função de tempo 
				tempoExplosao=null;//zerando a var tempoExplosao
				
			}
		} // Fim da função explosao1()
	
	//Reposiciona Inimigo2
	function reposicionaInimigo2() {
	
		var tempoColisao4=window.setInterval(reposiciona4, 5000);//indicando o reposisionamento do inimigo 2 apos 5 segundos
			
			function reposiciona4() {
			window.clearInterval(tempoColisao4);//remove a função de tempo
			tempoColisao4=null;//zerar a variavel
				
				if (fimdejogo==false) {//se o jogo terminar (true), a div inimigo2, não aparece mais.
				
				$("#fundoGame").append("<div id=inimigo2></div");
				
				}
				
			}	
		}	
	//Explosão2
	function explosao2(inimigo2X,inimigo2Y) {
		
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		var div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
			function removeExplosao2() {
				
				div2.remove();
				window.clearInterval(tempoExplosao2);
				tempoExplosao2=null;
				
			}
		} // Fim da função explosao2()
	
	//Reposiciona Amigo
	function reposicionaAmigo() {
	
		var tempoAmigo=window.setInterval(reposiciona6, 6000); //reposicion o amigo apos 6 segundos
		
			function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo=null;
			
			if (fimdejogo==false) {//caso o jogo nao chegou ao final
			
			$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
			
			}
		}
	} // Fim da função reposicionaAmigo()

	//Explosão3
	function explosao3(amigoX,amigoY) {

		somPerdido.play();
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top",amigoY);
		$("#explosao3").css("left",amigoX);
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);//apos 1 segundo, apga explosao
		function resetaExplosao3() {
		$("#explosao3").remove();//removedo explosao
		window.clearInterval(tempoExplosao3);
		tempoExplosao3=null;
				
		}
	} // Fim da função explosao3

	function placar() {
	
	$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar()
	
	//Barra de energia

	function energia() {
	
	if (energiaAtual==3) {
		
		$("#energia").css("background-image", "url(imgs/energia3.png)");
	}

	if (energiaAtual==2) {
		
		$("#energia").css("background-image", "url(imgs/energia2.png)");
	}

	if (energiaAtual==1) {
		
		$("#energia").css("background-image", "url(imgs/energia1.png)");
	}

	if (energiaAtual==0) {
		
		$("#energia").css("background-image", "url(imgs/energia0.png)");
		
		//Game Over
		gameOver();
	}

	} // Fim da função energia()

	//Função GAME OVER
	function gameOver() {
		fimdejogo=true;
		musica.pause();//pausando a musica de fundo
		somGameover.play();//reproduce uma nova música
		
		window.clearInterval(jogo.timer);//para o gameloop do jogo
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");//criando uma nova div no fundogame
		
		$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
		} // Fim da função gameOver();	
	
} //Fim da função Start

//Reinicia o Jogo
function reiniciaJogo() {
	somGameover.pause();//pausa o som de gameover
	$("#fim").remove();//remove a mensagem da div fim
	start();//chama função para começar o jogo novamente
} //Fim da função reiniciaJogo