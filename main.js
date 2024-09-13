let secret_number = getSecretNumber();
let tentativasRestantes = 5; // Limitar o número de tentativas

function getSecretNumber(){
    let numero = Math.floor(Math.random() * 10 + 1);
    return numero;
}

function exibeTextoTag(tag, texto){
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {pitch: 1});
}

function inicializaTexto(){
    exibeTextoTag('h1', 'Número Secreto');
    exibeTextoTag('p', 'Escolha um número entre 1 e 10');
}

inicializaTexto();

function verificarChute() {
    let guess = document.querySelector('input').value;
    tentativasRestantes--;

    if (guess == secret_number) {
        exibeTextoTag('h1', 'Parabéns, você acertou!');
        const word_attempts = tentativasRestantes !== 1 ? 'tentativas' : 'tentativa';
        exibeTextoTag('p', `Você acertou o número secreto com ${5 - tentativasRestantes} ${word_attempts}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);  // Desabilitar o botão de chutar
        document.querySelector('input').setAttribute('disabled', true);  // Desabilitar o input
    } else {
        if (tentativasRestantes > 0) {
            if (guess < secret_number) {
                exibeTextoTag('p', `Tente novamente, o número é maior. Tentativas restantes: ${tentativasRestantes}`);
            } else {
                exibeTextoTag('p', `Tente novamente, o número é menor. Tentativas restantes: ${tentativasRestantes}`);
            }
        } else {
            exibeTextoTag('p', `Fim de jogo! Você esgotou suas tentativas.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('chutar').setAttribute('disabled', true);  // Desabilitar o botão de chutar
            document.querySelector('input').setAttribute('disabled', true);  // Desabilitar o input
        }
    }

    limpaInput();
}

function limpaInput(){
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    tentativasRestantes = 5; // Reiniciar as tentativas
    secret_number = getSecretNumber();
    inicializaTexto();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');  // Habilitar o botão de chutar
    document.querySelector('input').removeAttribute('disabled');  // Habilitar o input
    limpaInput();
}
