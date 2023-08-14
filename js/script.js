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
        document.getElementById(tecla).style.background = "#DA0037";
        document.getElementById(tecla).style.color = "#EDEDED";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#EDEDED";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("Que pena! Não foi dessa vez....", "Tente novamente. A palavra secreta era: <br>" + palavraSecretaSorteada);
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
        abreModal("PARABÉNS!", "Você acertou, bora mais uma?");
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
            categoria:"BANDA INT"
        },
        palavra002 = {
            nome: "METALLICA",
            categoria:"BANDA INT"
        },
        palavra003 = {
            nome: "AEROSMITH",
            categoria:"BANDA INT"
        },
        palavra004 = {
            nome: "BARAO VERMELHO",
            categoria:"BANDAS NAC"
        },
        palavra005 = {
            nome: "GUNS N ROSES",
            categoria:"BANDA INT"
        },
        palavra006 = {
            nome: "SEPULTURA",
            categoria:"BANDA INT"
        },
        palavra007 = {
            nome: "FOO FIGHTERS",
            categoria:"BANDA INT"
        },
        palavra008 = {
            nome: "LEGIAO URBANA",
            categoria:"BANDA NAC"
        },
        palavra009 = {
            nome: "THE OFFSPRING",
            categoria:"BANDA INT"
        },
        palavra010 = {
            nome: "THE ROLLING STONES",
            categoria:"BANDA INT"
        },
        palavra011 = {
            nome: "IRON MAIDEN",
            categoria:"BANDA INT"
        },
        palavra012 = {
            nome: "BLACK SABBATH",
            categoria:"BANDA INT"
        },
        palavra013 = {
            nome: "PINK FLOYD",
            categoria:"BANDA INT"
        },
        palavra014 = {
            nome: "BON JOVI",
            categoria:"BANDA INT"
        },
        palavra015 = {
            nome: "PEARL JAM",
            categoria:"BANDA INT"
        },
        palavra016 = {
            nome: "THE BEATLES",
            categoria:"BANDA INT"
        },
        palavra017 = {
            nome: "LOS HERMANOS",
            categoria:"BANDA NAC"
        },
        palavra018 = {
            nome: "LINKIN PARK",
            categoria:"BANDA INT"
        },
        palavra019 = {
            nome: "BIQUINI CAVADAO",
            categoria:"BANDA NAC"
        },
        palavra020 = {
            nome: "PARALAMAS DO SUCESSO",
            categoria:"BANDA NAC"
        },
        palavra021 = {
            nome: "ULTRAGE A RIGOR",
            categoria:"BANDA NAC"
        },
        palavra022 = {
            nome: "CHARLIE BROWN JR",
            categoria:"BANDA NAC"
        },
        palavra023 = {
            nome: "INIMIGOS DO REI",
            categoria:"BANDA NAC"
        },
        palavra024 = {
            nome: "CAPITAL INICIAL",
            categoria:"BANDA NAC"
        },
        palavra025 = {
            nome: "DETONAUTAS",
            categoria:"BANDA NAC"
        },
        palavra026 = {
            nome: "PLANET HEMP",
            categoria:"BANDA NAC"
        },
        palavra027 = {
            nome: "ROUPA NOVA",
            categoria:"BANDA NAC"
        },
        palavra028 = {
            nome: "AXL ROSE",
            categoria:"ROCKSTAR INT"
        },
        palavra029 = {
            nome: "SLASH",
            categoria:"ROCKSTAR INT"
        },
        palavra030 = {
            nome: "FREDDIE MERCURY",
            categoria:"ROCKSTAR INT"
        },
        palavra031 = {
            nome: "JON BON JOVI",
            categoria:"ROCKSTAR INT"
        },
        palavra032 = {
            nome: "BRUCE DICKINSON",
            categoria:"ROCKSTAR INT"
        },
        palavra033 = {
            nome: "RENATO RUSSO",
            categoria:"ROCKSTAR NAC"
        },
        palavra034 = {
            nome: "ELVIS PRESLEY",
            categoria:"ROCKSTAR INT"
        },
        palavra035 = {
            nome: "KURT COBAIN",
            categoria:"ROCKSTAR INT"
        },
        palavra036 = {
            nome: "PAUL MCCARTNEY",
            categoria:"ROCKSTAR INT"
        },
        palavra037 = {
            nome: "JIMI HENDRIX",
            categoria:"ROCKSTAR INT"
        },
        palavra038 = {
            nome: "LOURAS GELADAS",
            categoria:"MÚSICA NAC"
        },
        palavra039 = {
            nome: "PARADISE CITY",
            categoria:"MÚSICA INT"
        },
        palavra040 = {
            nome: "HOTEL CALIFORNIA",
            categoria:"MÚSICA INT"
        },
        palavra041 = {
            nome: "WELCOME TO THE JUNGLE",
            categoria:"MÚSICA INT"
        },
        palavra042 = {
            nome: "PESCADOR DE ILUSOES",
            categoria:"MÚSICA NAC"
        },
        palavra043 = {
            nome: "MULHER DE FASES",
            categoria:"MÚSICA NAC"
        },
        palavra044 = {
            nome: "SONIFERA ILHA",
            categoria:"MÚSICA NAC"
        },
        palavra045 = {
            nome: "SO OS LOUCOS SABEM",
            categoria:"MÚSICA NAC"
        },
        palavra046 = {
            nome: "VOCE ME FAZ TAO BEM",
            categoria:"MÚSICA NAC"
        },
        palavra047 = {
            nome: "O SEGUNDO SOL",
            categoria:"MÚSICA NAC"
        },
        palavra048 = {
            nome: "EDUARDO E MONICA",
            categoria:"MÚSICA NAC"
        },
        palavra049 = {
            nome: "MALANDRAGEM",
            categoria:"MÚSICA NAC"
        },
        palavra050 = {
            nome: "OVELHA NEGRA",
            categoria:"MÚSICA NAC"
        },
        palavra051 = {
            nome: "ANNA JULIA",
            categoria:"MÚSICA NAC"
        },
        palavra052 = {
            nome: "TROPA DE ELITE",
            categoria:"MÚSICA NAC"
        },
        palavra053 = {
            nome: "SEGUNDO SOL",
            categoria:"MÚSICA NAC"
        },
        palavra054 = {
            nome: "EXAGERADO",
            categoria:"MÚSICA NAC"
        },
        palavra055 = {
            nome: "BOB DYLAN",
            categoria:"ROCKSTAR INT"
        },
        palavra056 = {
            nome: "MICK JAGGER",
            categoria:"ROCKSTAR INT"
        },
        palavra057 = {
            nome: "RAUL SEIXAS",
            categoria:"ROCKSTAR NAC"
        },
        palavra058 = {
            nome: "BONO VOX",
            categoria:"ROCKSTAR INT"
        },
        palavra059 = {
            nome: "MARILYN MANSON",
            categoria:"ROCKSTAR INT"
        },
        palavra060 = {
            nome: "DAVE GROHL",
            categoria:"ROCKSTAR INT"
        },
        palavra061 = {
            nome: "ERIC CLAPTON",
            categoria:"ROCKSTAR INT"
        },
        palavra062 = {
            nome: "SKID ROW",
            categoria:"BANDA INT"
        },
        palavra063 = {
            nome: "CHORAO",
            categoria:"ROCKSTAR NAC"
        },
        palavra064 = {
            nome: "LULU SANTOS",
            categoria:"ROCKSTAR NAC"
        },
        palavra065 = {
            nome: "DAVID BOWIE",
            categoria:"ROCKSTAR INT"
        },
        palavra066 = {
            nome: "SLIPKNOT",
            categoria:"BANDA INT"
        },
        palavra067 = {
            nome: "SYSTEM OF A DOWN",
            categoria:"BANDA INT"
        },
        palavra068 = {
            nome: "THE DOORS",
            categoria:"BANDA INT"
        },
        palavra069 = {
            nome: "KISS",
            categoria:"BANDA INT"
        },
        palavra070 = {
            nome: "BATERIA",
            categoria:"INSTRUMENTO"
        },
        palavra071 = {
            nome: "CONTRABAIXO",
            categoria:"INSTRUMENTO"
        },
        palavra072 = {
            nome: "GUITARRA",
            categoria:"INSTRUMENTO"
        },
        palavra073 = {
            nome: "VIOLAO",
            categoria:"INSTRUMENTO"
        },
        palavra074 = {
            nome: "PIANO",
            categoria:"INSTRUMENTO"
        },
        palavra075 = {
            nome: "PERCURSSAO",
            categoria:"INSTRUMENTO"
        },
        palavra076 = {
            nome: "TECLADO",
            categoria:"INSTRUMENTO"
        },
        palavra077 = {
            nome: "CAJON",
            categoria:"INSTRUMENTO"
        },
        palavra078 = {
            nome: "THE POLICE",
            categoria:"BANDA INT"
        },
        palavra079 = {
            nome: "DIRE STRAITS",
            categoria:"BANDA INT"
        },
        palavra080 = {
            nome: "QUEEN",
            categoria:"BANDA INT"
        },
        palavra081 = {
            nome: "THE WHO",
            categoria:"BANDA INT"
        },
        palavra082 = {
            nome: "DEEP PURPLE",
            categoria:"BANDA INT"
        },
        palavra083 = {
            nome: "THE CLASH",
            categoria:"BANDA INT"
        },
        palavra084 = {
            nome: "VAN HALEN",
            categoria:"BANDA INT"
        },
        palavra085 = {
            nome: "FLEETWOOD MAC",
            categoria:"BANDA INT"
        },
        palavra086 = {
            nome: "RUSH",
            categoria:"BANDA INT"
        },
        palavra087 = {
            nome: "GREEN DAY",
            categoria:"BANDA INT"
        },
        palavra088 = {
            nome: "GENESIS",
            categoria:"BANDA INT"
        },
        palavra089 = {
            nome: "THE SEX PISTOLS",
            categoria:"BANDA INT"
        },
        palavra090 = {
            nome: "WHITESNAKE",
            categoria: "BANDA INT"
        },
        palavra091 = {
            nome: "ENGENHEIROS DO HAWAII",
            categoria:"BANDA NAC"
        },
        palavra092 = {
            nome: "O RAPPA",
            categoria:"BANDA NAC"
        },
        palavra093 = {
            nome: "CAZUZA",
            categoria:"ROCKSTAR NAC"
        },
        palavra094 = {
            nome: "CASSIA ELLER",
            categoria:"ROCKSTAR NAC"
        },
        palavra095 = {
            nome: "KID ABELHA",
            categoria:"BANDA NAC"
        },
        palavra096 = {
            nome: "NX ZERO",
            categoria:"BANDA NAC"
        },
        palavra097 = {
            nome: "PITTY",
            categoria:"ROCKSTAR NAC"
        },
        palavra098 = {
            nome: "RATOS DO PORAO",
            categoria:"BANDA NAC"
        },
        palavra099 = {
            nome: "RAIMUNDOS",
            categoria:"BANDA NAC"
        },
        palavra100 = {
            nome: "FREJAT",
            categoria: "ROCKSTAR NAC"
        },
        palavra101 = {
            nome: "JUDAS PRIEST",
            categoria:"BANDA INT"
        },
        palavra102 = {
            nome: "MOTORHEAD",
            categoria:"BANDA INT"
        },
        palavra103 = {
            nome: "SLAYER",
            categoria:"BANDA INT"
        },
        palavra104 = {
            nome: "PANTERA",
            categoria:"ROCKSTAR INT"
        },
        palavra105 = {
            nome: "OZZY OSBOURNE",
            categoria:"ROCKSTAR INT"
        },
        palavra106 = {
            nome: "SCORPIONS",
            categoria:"BANDA INT"
        },
        palavra107 = {
            nome: "ANTHRAX",
            categoria:"BANDA INT"
        },
        palavra108 = {
            nome: "DEF LEPPARD",
            categoria:"BANDA INT"
        },
        palavra109 = {
            nome: "RAMMSTEIN",
            categoria:"BANDA INT"
        },
        palavra110 = {
            nome: "ALICE IN CHAINS",
            categoria: "ROCKSTAR INT"
        },
        palavra111 = {
            nome: "JOHN LENNON",
            categoria:"ROCKSTAR INT"
        },
        palavra112 = {
            nome: "ROBERT PLANT",
            categoria:"ROCKSTAR INT"
        },
        palavra113 = {
            nome: "BRUCE SPRINGSTEEN",
            categoria:"ROCKSTAR INT"
        },
        palavra114 = {
            nome: "ROD STEWART",
            categoria:"ROCKSTAR INT"
        },
        palavra115 = {
            nome: "JANIS JOPLIN",
            categoria:"ROCKSTAR INT"
        },
        palavra116 = {
            nome: "BILLY IDOL",
            categoria:"ROCKSTAR INT"
        },
        palavra117 = {
            nome: "WOODSTOCK",
            categoria:"FESTIVAL"
        },
        palavra118 = {
            nome: "ROCK IN RIO",
            categoria:"FESTIVAL"
        },
        palavra119 = {
            nome: "LOLLAPALOOZA",
            categoria:"FESTIVAL"
        },
        palavra120 = {
            nome: "HOLLYWOOD ROCK",
            categoria: "FESTIVAL"
        },
        palavra121 = {
            nome: "ARCTIC MONKEYS",
            categoria: "BANDA INT"
        },
        palavra122 = {
            nome: "CAMISA DE VENUS",
            categoria:"BANDA NAC"
        },
        palavra123 = {
            nome: "ULTRAJE A RIGOR",
            categoria:"BANDA NAC"
        },
        palavra124 = {
            nome: "BLITZ",
            categoria:"BANDA NAC"
        },
        palavra125 = {
            nome: "LOBAO E OS RONALDOS",
            categoria:"BANDA NAC"
        },
        palavra126 = {
            nome: "PLEBE RUDE",
            categoria:"BANDA NAC"
        },
        palavra127 = {
            nome: "BIDE OU BALDE",
            categoria:"BANDA NAC"
        },
        palavra128 = {
            nome: "RPM",
            categoria:"BANDA NAC"
        },
        palavra129 = {
            nome: "IRA",
            categoria:"BANDA NAC"
        },
        palavra130 = {
            nome: "HOLLYWOOD ROCK",
            categoria: "FESTIVAL"
        },
        palavra131 = {
            nome: "JIM MORRISON",
            categoria: "ROCKSTAR INT"
        },
        palavra132 = {
            nome: "ANGUS YOUNG",
            categoria:"ROCKSTAR INT"
        },
        palavra133 = {
            nome: "STEVEN TYLER",
            categoria:"ROCKSTAR INT"
        },
        palavra134 = {
            nome: "SUPLA",
            categoria:"ROCKSTAR NAC"
        },
        palavra135 = {
            nome: "STING",
            categoria:"ROCKSTAR INT"
        },
        palavra136 = {
            nome: "NENHUM DE NOS",
            categoria:"BANDA NAC"
        },
        palavra137 = {
            nome: "CARTA AOS MISSIONARIOS",
            categoria:"MÚSICA NAC"
        },
        palavra138 = {
            nome: "SYLVINHO BLAU BLAU",
            categoria:"POP ROCK NAC"
        },
        palavra139 = {
            nome: "INXS",
            categoria:"BANDA INT"
        },
        palavra140 = {
            nome: "OINGO BOINGO",
            categoria:"BANDA INT"
        },
        palavra141 = {
            nome: "UNS E OUTROS",
            categoria:"BANDA NAC"
        },
        palavra142 = {
            nome: "RED HOT CHILI PEPPERS",
            categoria:"BANDA INT"
        },
        palavra143 = {
            nome: "ROXETTE",
            categoria:"BANDA INT"
        },
        palavra144 = {
            nome: "TEARS FOR FEARS",
            categoria:"BANDA INT"
        },
        palavra145 = {
            nome: "OASIS",
            categoria:"BANDA INT"
        },
        palavra146 = {
            nome: "SERGUEI",
            categoria:"ROCKSTAR NAC"
         },
        palavra147 = {
            nome: "RAUL SEIXAS",
            categoria:"ROCKSTAR NAC"
        }
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