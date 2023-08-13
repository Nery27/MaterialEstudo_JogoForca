let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;
let contadorSucessosConsecutivos = 0;

carregaListaAutomatica();

criarPalavraSecreta();
montarPalavraNaTela();

function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length);

    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}


function iniciarTimer() {
    let segundosRestantes = 10;
    const timerElement = document.getElementById("timer");

    const timerInterval = setInterval(() => {
        if (segundosRestantes <= 0) {
            clearInterval(timerInterval);
            verificaLetraEscolhida(null, true);
        } else {
            timerElement.innerText = `Tempo: ${segundosRestantes} segundos`;
            segundosRestantes--;
        }
    }, 1000);
}

function verificaLetraEscolhida(letra, tempoEsgotou) {
    if (tempoEsgotou) {
        tentativas--;
        carregaImagemForca();

        if (tentativas === 0) {
            abreModal("Que pena! Não foi dessa vez....", "Tente novamente. A palavra secreta era: <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    } else {
        if (letra) {
            // ... (código para verificar a letra escolhida e atualizar o jogo)
        }
    }
    // Resto do código para verificar vitória, exibir modal, etc.
}

function comparalistas(letra) {
    // ... (código para comparar listas e verificar se a letra está correta)
    if (letra) {
        iniciarTimer();
    }
    // Resto do código para atualizar jogo, exibir modal de vitória, etc.
}

// Restante das funções (mudarStyleLetra, carregaImagemForca, abreModal, etc.)

// Função para reiniciar o jogo
function reiniciarJogo() {
    jogarNovamente = false;
    jogarNovamente = true;
    tentativas = 6;
    listaDinamica = [];
    palavraSecretaCategoria = '';
    palavraSecretaSorteada = '';
    palavras = [];
    jogoAutomatico = true;

    carregaListaAutomatica();
    criarPalavraSecreta();
    montarPalavraNaTela();
    configurarEventos();
}

let bntReiniciar = document.querySelector("#btnReiniciar");
bntReiniciar.addEventListener("click", reiniciarJogo);
