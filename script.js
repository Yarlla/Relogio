const cidade = 'Cedro'; 
const unidadeMedida = 'metric'; // unidade da temperatura
const api_key = '9dac1a61ad91c38c986f1fc63aa0c1a1'; //chave da api 


var h = document.getElementById('horas'); 
var min = document.getElementById('minutos');
var seg = document.getElementById('segundos');

// setInterval - executa uma função repetidamente em intervalos regulares
const relogio = setInterval(function time() {
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

    // textContent - define o conteúdo de texto do elemento HTML
    h.textContent = horas;
    min.textContent = minutos;
    seg.textContent = segundos;        
},1000)

const dataHoje = document.getElementById('data');
const data = setInterval(function time() {
    let dH = new Date();
    // toLocaleDateString() - Para formatar a data de acordo com um idioma em especifico
    let dataFormatada = dH.toLocaleDateString(); 
    dataHoje.textContent = dataFormatada; 
})

const diaSemana = document.getElementById('dia');
const dia = setInterval(function time(){
    let d = new Date();
    let diaDaSemana = d.toLocaleDateString('pt-BR', { weekday: 'long' }); // long é para colocar o nome completo da semana, por exemplo: terça-feira
    // diaDaSemana[0].toUpperCase() - pega o primeiro caractere do dia da semana e converte para maiscula
    // diaDaSemana.slice(1); - cria uma nova string a partir da segunda letra: erça-feira e junta com a letra maiscula
    diaSemana.textContent = diaDaSemana[0].toUpperCase() + diaDaSemana.slice(1);
})

// Função para consultar a temperatura do dia atual
setInterval(async function () {
    const temperaturaHoje = document.getElementById('clima');
    const response = await fetch( 
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=${unidadeMedida}&appid=${api_key}&lang=pt_br` 
    )
    
    if (response.ok){
        const data = await response.json(); // Converte a temperatura da API em json
        temperaturaHoje.textContent = `${Math.round(data.main.temp)}°C`; // aqui exibir a temperatura, usando placeholder, e arredondar o valor
    }
    else{
        console.error(`Falha na requisição: ${response.status}`);
    }
},100) 
