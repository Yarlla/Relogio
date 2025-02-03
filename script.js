const cidade = 'Cedro'; 
const unidadeMedida = 'metric'; // unidade da temperatura
const apiKey = 'd006f0c9a666ec387d2c1c236b7c67fb'; // chave da API 

var h = document.getElementById('horas'); 
var min = document.getElementById('minutos');
var seg = document.getElementById('segundos');
const dataHoje = document.getElementById('data');
const diaSemana = document.getElementById('dia');
const temperaturaHoje = document.getElementById('temperatura');
const iconeClima = document.getElementById('icone-clima');

const relogio = setInterval(function time() { // setInterval - executa uma função repetidamente em intervalos regulares
    let horarioAtual = new Date();
    let horas = horarioAtual.getHours();
    let minutos = horarioAtual.getMinutes();
    let segundos = horarioAtual.getSeconds();

    // Para adicionar o 0 quando o horario for menor que 10
    if (horas < 10) {
        horas = '0' + horas;
    }
    if (minutos < 10){
        minutos = '0' + minutos;
    } 
    if (segundos < 10) {
        segundos = '0' + segundos;
    }

    h.textContent = horas; // textContent - define o conteúdo de texto do elemento HTML
    min.textContent = minutos;
    seg.textContent = segundos;
}, 1000);

const data = setInterval(function time() {
    let dH = new Date();
    let dataFormatada = dH.toLocaleDateString();  // toLocaleDateString() - Para formatar a data de acordo com um idioma em especifico
    dataHoje.textContent = dataFormatada; 
});

const dia = setInterval(function time() { 
    let d = new Date();
    let diaDaSemana = d.toLocaleDateString('pt-BR', { weekday: 'long' });
    diaSemana.textContent = diaDaSemana[0].toUpperCase() + diaDaSemana.slice(1); // Primeira letra em maiúsculo e o resto em minúsculo para formatar o dia da semana
});

// Função para consultar a temperatura do dia atual e mudar o ícone de acordo com o horário e o clima
setInterval(async function () {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=${unidadeMedida}`
        );
        
        if (response.ok) {
            const data = await response.json();
            temperaturaHoje.textContent = `${Math.round(data.main.temp)}°C`; // aqui exibi a temperatura, usando placeholder, e arredonda o valor

            // Atualiza o ícone diretamente
            const icone = data.weather[0].icon; // icone do clima
            iconeClima.src = `https://openweathermap.org/img/wn/${icone}@2x.png`; //adiciona o icone do clima ao elemento img
           
        } else {
            console.error(`Falha na requisição: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro na requisição ou processamento dos dados:', error);
    }
});

// Função para ativar o alarme
function ativarAlarme() {
    const audio = document.getElementById('audio');
    audio.play(); // ativa o alarme  a partir do horario atual
    
    // toca durante 5 minutos e depois para
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 300000);
}
