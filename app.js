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

