let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
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

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "NIRVANA",
            categoria:"BANDAS"
        },
        palavra002 = {
            nome: "METALLICA",
            categoria:"BANDAS"
        },
        palavra003 = {
            nome: "AEROSMITH",
            categoria:"BANDAS"
        },
        palavra004 = {
            nome: "BARAO VERMELHO",
            categoria:"BANDAS"
        },
        palavra005 = {
            nome: "GUNS N ROSES",
            categoria:"BANDAS"
        },
        palavra006 = {
            nome: "SEPULTURA",
            categoria:"BANDAS"
        },
        palavra007 = {
            nome: "FOO FIGHTERS",
            categoria:"BANDAS"
        },
        palavra008 = {
            nome: "LEGIAO URBANA",
            categoria:"BANDAS"
        },
        palavra009 = {
            nome: "THE OFFSPRING",
            categoria:"BANDAS"
        },
        palavra010 = {
            nome: "THE ROLLING STONES",
            categoria:"BANDAS"
        },
        palavra011 = {
            nome: "IRON MAIDEN",
            categoria:"BANDAS"
        },
        palavra012 = {
            nome: "BLACK SABBATH",
            categoria:"BANDAS"
        },
        palavra013 = {
            nome: "PINK FLOYD",
            categoria:"BANDAS"
        },
        palavra014 = {
            nome: "BON JOVI",
            categoria:"BANDAS"
        },
        palavra015 = {
            nome: "PEARL JAM",
            categoria:"BANDAS"
        },
        palavra016 = {
            nome: "THE BEATLES",
            categoria:"BANDAS"
        },
        palavra017 = {
            nome: "RED HOT CHILLI PEPPERS",
            categoria:"BANDAS"
        },
        palavra018 = {
            nome: "LINKIN PARK",
            categoria:"BANDAS"
        },
        palavra019 = {
            nome: "BIQUINI CAVADAO",
            categoria:"BANDAS"
        },
        palavra020 = {
            nome: "PARALAMAS DO SUCESSO",
            categoria:"BANDAS"
        },
        palavra021 = {
            nome: "ULTRAGE A RIGOR",
            categoria:"BANDAS"
        },
        palavra022 = {
            nome: "CHARLIE BROWN JR",
            categoria:"BANDAS"
        },
        palavra023 = {
            nome: "ENGENHEIROS DO HAWAII",
            categoria:"BANDAS"
        },
        palavra024 = {
            nome: "CAPITAL INICIAL",
            categoria:"BANDAS"
        },
        palavra025 = {
            nome: "DETONAUTAS",
            categoria:"BANDAS"
        },
        palavra026 = {
            nome: "PLANET HEMP",
            categoria:"BANDAS"
        },
        palavra027 = {
            nome: "ROUPA NOVA",
            categoria:"BANDAS"
        },
        palavra028 = {
            nome: "AXL ROSE",
            categoria:"ROCKSTAR"
        },
        palavra029 = {
            nome: "SLASH",
            categoria:"ROCKSTAR"
        },
        palavra030 = {
            nome: "FREDDIE MERCURY",
            categoria:"ROCKSTAR"
        },
        palavra031 = {
            nome: "JON BON JOVI",
            categoria:"ROCKSTAR"
        },
        palavra032 = {
            nome: "BRUCE DICKINSON",
            categoria:"ROCKSTAR"
        },
        palavra033 = {
            nome: "RENATO RUSSO",
            categoria:"ROCKSTAR"
        },
        palavra034 = {
            nome: "ELVIS PRESLEY",
            categoria:"ROCKSTAR"
        },
        palavra035 = {
            nome: "KURT COBAIN",
            categoria:"ROCKSTAR"
        },
        palavra036 = {
            nome: "PAUL MCCARTNEY",
            categoria:"ROCKSTAR"
        },
        palavra037 = {
            nome: "JIMI HENDRIX",
            categoria:"ROCKSTAR"
        },
        palavra038 = {
            nome: "SMELLS LIKE TEEN SPIRIT",
            categoria:"MÚSICAS"
        },
        palavra039 = {
            nome: "SUNDAY BLOODY SUNDAY",
            categoria:"MÚSICAS"
        },
        palavra040 = {
            nome: "HOTEL CALIFORNIA",
            categoria:"MÚSICAS"
        },
        palavra041 = {
            nome: "WELCOME TO THE JUNGLE",
            categoria:"MÚSICAS"
        },
        palavra042 = {
            nome: "PESCADOR DE ILUSOES",
            categoria:"MÚSICAS"
        },
        palavra043 = {
            nome: "MULHER DE FASES",
            categoria:"MÚSICAS"
        },
        palavra044 = {
            nome: "SONIFERA ILHA",
            categoria:"MÚSICAS"
        },
        palavra045 = {
            nome: "SO OS LOUCOS SABEM",
            categoria:"MÚSICAS"
        },
        palavra046 = {
            nome: "VOCE ME FAZ TAO BEM",
            categoria:"MÚSICAS"
        },
        palavra047 = {
            nome: "O SEGUNDO SOL",
            categoria:"MÚSICAS"
        },
        palavra048 = {
            nome: "EDUARDO E MONICA",
            categoria:"MÚSICAS"
        },
        palavra049 = {
            nome: "PRO DIA NASCER FELIZ",
            categoria:"MÚSICAS"
        },
        palavra050 = {
            nome: "VOCE NAO SOUBE ME AMAR",
            categoria:"MÚSICAS"
        },
        palavra051 = {
            nome: "ANNA JULIA",
            categoria:"MÚSICAS"
        },
        palavra052 = {
            nome: "TROPA DE ELITE",
            categoria:"MÚSICAS"
        },
        palavra053 = {
            nome: "RAZOES E EMOÇOES",
            categoria:"MÚSICAS"
        },
        palavra054 = {
            nome: "SO OS LOUCOS SABEM",
            categoria:"MÚSICAS"
        },
        palavra055 = {
            nome: "BOB DYLAN",
            categoria:"ROCKSTAR"
        },
        palavra056 = {
            nome: "MICK JAGGER",
            categoria:"ROCKSTAR"
        },
        palavra057 = {
            nome: "RAUL SEIXAS",
            categoria:"ROCKSTAR"
        },
        palavra058 = {
            nome: "BONO VOX",
            categoria:"ROCKSTAR"
        },
        palavra059 = {
            nome: "MARILYN MANSON",
            categoria:"ROCKSTAR"
        },
        palavra060 = {
            nome: "DAVE GROHL",
            categoria:"ROCKSTAR"
        },
        palavra061 = {
            nome: "ERIC CLAPTON",
            categoria:"ROCKSTAR"
        },
        palavra062 = {
            nome: "SKID ROW",
            categoria:"BANDAS"
        },
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}