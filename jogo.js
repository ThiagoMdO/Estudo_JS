/* DOCTYPE javascript*/
/*
*Author: Thiago MdO
*Data: 03/05/2023
*/

/*Project - Jogo balões - com JS - Curso de desenvolvimento Web*/

/* -- Variáveis -- */
var url='';
var nivel_jogo = null;
var tempo = 0;
var qtd_baloes=null;
var qtd_baloes_restantes=null;
var qtd_baloes_estourados=0;
var timeId = null;



function inicia_jogo(){
	url = window.location.search;
	nivel_jogo = url.replace('?','');

	/* -------- Niveis do jogo -------- */
	//Fácil -> 120s
	if(nivel_jogo=='1'){
		tempo=90;
		qtd_baloes_restantes=50;
	}

	//Normal -> 60s
	if(nivel_jogo=='2'){
		tempo=60;
		qtd_baloes_restantes=40;
	}

	//Difícil -> 10s
	if(nivel_jogo=='3'){
		tempo=10;
		qtd_baloes_restantes=3;
	}

	/* -- Gravar quantidade de balões inicial -- */
	qtd_baloes = qtd_baloes_restantes;

	/* -- inserir quantidade de balões inicial -- */
	qtd_baloes_restantes = qtd_baloes_restantes;
	document.getElementById('qtd_baloes_restantes').innerHTML=qtd_baloes_restantes;
	document.getElementById('qtd_baloes_estourados').innerHTML=qtd_baloes_estourados;

	/* -- inserir tempo no cronometro inicial -- */
	document.getElementById('cronometro').innerHTML = tempo;

	/* -- inserir tempo no cronometro decremental -- */
	decrementar_tempo(tempo);

	/* -- Gerenciar Baloes -- */
	criar_baloes(qtd_baloes_restantes);

}

/* -------- Criação de Balões -------- */
function criar_baloes(qtd_baloes){
	for(i=1;i<=qtd_baloes;i++){
		var balao = document.createElement('img');
		balao.src='imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'balao_'+i;
		balao.onclick = function(){estourar_baloes(this);};
		document.getElementById('campo_baloes').appendChild(balao);
	}
}

/* -------- Estourar Balões -------- */
function estourar_baloes(e){
	/* -- pontuação -- */
	pontuacao();
	/* -- mudar imagem balões estourados -- */
	var balao_id = e.id;
	document.getElementById(balao_id).src = 'imagens/balao_azul_pequeno_estourado.png';
	e.onclick = null;
}

/* -------- Pontuação Jogo -------- */
function pontuacao(){
	/* -- acrescentar quantidade de balões estourados -- */
	qtd_baloes_estourados++;
	document.getElementById('qtd_baloes_estourados').innerHTML = qtd_baloes_estourados;

	/* -- decrementar quantidade de balões restantes -- */
	qtd_baloes_restantes--;
	document.getElementById('qtd_baloes_restantes').innerHTML = qtd_baloes_restantes;

	/* -- Verificar placar -- */
	if(qtd_baloes_estourados==qtd_baloes){
		alert('Todos balões estourados com sucesso, parabéns!!');
		fim_jogo();
	}
}

/* -------- Contar Tempo -------- */
function decrementar_tempo(segundos){
	/* -- Verificar situação jogo pelo tempo ou decrementar segundos -- */
	if(segundos==0){
		document.getElementById('cronometro').innerHTML = 0;
		if(qtd_baloes_estourados<=(qtd_baloes*.3)){
			alert('Passou longe em, tente um nivel mais fácil para praticar, estorou apenas '+qtd_baloes_estourados);
		}
		else if(qtd_baloes_estourados<=(qtd_baloes*.5)){
			alert('Mediano, continue tentando, balões estourados: '+qtd_baloes_estourados);
		}
		else if(qtd_baloes_estourados<=(qtd_baloes*.7)){
			alert('Foi quase lá, tente mais uma vez, balões estourados: '+qtd_baloes_estourados);
		}
		fim_jogo();
		return false;
	}else{
		document.getElementById('cronometro').innerHTML = segundos;
		segundos--;
	}

	//precisa estar no fim da função para funciona adequandamente
	timeId = setTimeout("decrementar_tempo("+segundos+")",1000);

}

/* -------- Fim do Jogo -------- */
function fim_jogo(){
	clearTimeout(timeId);// Parar a função do setTimeout(), no caso que está dentro da variável
	let i = 1;
	while(document.getElementById('balao_'+i)){
		document.getElementById('balao_'+i).onclick = '';
		i++;
	}
	return false;
}

