// script.js

document.getElementById('equipment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Coletando os dados do formulário
    const formData = new FormData(this);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log("Dados salvos:", data);
    alert("Formulário salvo com sucesso!");
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('equipment-form').reset();
});

document.getElementById('dataRevisao').addEventListener('change', function() {
    const dataRevisao = new Date(this.value);
    const hoje = new Date();
    const statusElement = document.getElementById('statusRevisao');
    
    // Limpar qualquer classe anterior
    statusElement.classList.remove('atrasado', 'em-dia');
    
    // Verificar se está em atraso ou em dia
    if (dataRevisao < hoje) {
        statusElement.textContent = "Atrasado";
        statusElement.classList.add('atrasado');
    } else {
        statusElement.textContent = "Em Dia";
        statusElement.classList.add('em-dia');
    }
});


