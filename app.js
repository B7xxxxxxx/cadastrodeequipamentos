document.addEventListener("DOMContentLoaded", () => {
  // Função para atualizar a contagem de checklists por prédio (APENAS DO DIA ATUAL)
  function atualizarContagemPorPredio() {
    const checklists = JSON.parse(localStorage.getItem("checklists")) || [];
    const hoje = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
   
    // Filtra apenas os checklists do dia atual
    const checklistsHoje = checklists.filter(c => c.data === hoje);
   
    const contagemPorPredio = {};
   
    // Inicializa todos os prédios com 0
    const predios = [
      "Predio 1", "Predio 2", "Predio 3", "Predio 4", "Predio 5",
      "Predio 6", "Predio 7", "Predio 8", "Predio 9", "Predio 10", "Predio 11"
    ];
   
    predios.forEach(predio => {
      contagemPorPredio[predio] = 0;
    });
   
    // Conta os checklists por prédio apenas do dia atual
    checklistsHoje.forEach(checklist => {
      if (contagemPorPredio.hasOwnProperty(checklist.site)) {
        contagemPorPredio[checklist.site]++;
      }
    });
   
    // Salva no localStorage
    Object.keys(contagemPorPredio).forEach(predio => {
      localStorage.setItem(predio.toUpperCase(), contagemPorPredio[predio]);
    });
  }

  const checklistForm = document.getElementById("checklistForm");
  const consultaForm = document.getElementById("consultaForm");

  // Formulário de envio
  if (checklistForm) {
    checklistForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Garante que a data está no formato correto
      const dataInput = document.getElementById("data");
      const hoje = new Date().toISOString().split('T')[0];
     
      // Validação da data (não pode ser data futura)
      if (dataInput.value > hoje) {
        alert("Não é possível salvar checklist com data futura!");
        return;
      }

      const checklist = {
        data: dataInput.value,
        site: document.getElementById("site").value,
        local: document.getElementById("local").value,
        ambiente: document.getElementById("ambiente").value,
        temperatura: document.getElementById("temperatura").value,
        rack: document.getElementById("rack").value,
        numero: document.getElementById("numero").value,
        autonomia: document.getElementById("autonomia").value,
        equipamento: document.getElementById("equipamento").value,
        preenchido: document.getElementById("preenchido").value,
        observacao: document.getElementById("observacao").value,
      };

      let checklists = JSON.parse(localStorage.getItem("checklists")) || [];
      checklists.push(checklist);
      localStorage.setItem("checklists", JSON.stringify(checklists));
     
      // Atualiza a contagem por prédio
      atualizarContagemPorPredio();

      alert("Checklist salvo com sucesso!");
      checklistForm.reset();
    });
  }

  // Formulário de consulta
  if (consultaForm) {
    consultaForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const dataFiltro = document.getElementById("consultaData").value;
      const siteFiltro = document.getElementById("consultaSite").value;
      const checklists = JSON.parse(localStorage.getItem("checklists")) || [];

      // Verifica se "Selecione um Site" foi escolhido
      const todosSites = siteFiltro === "Selecione um Site";
     
      const resultadosFiltrados = checklists.filter((c) => {
        const dataMatch = !dataFiltro || c.data === dataFiltro;
        const siteMatch = todosSites || c.site === siteFiltro;
        return dataMatch && siteMatch;
      });

      const tabelaResultados = document.querySelector("#resultados tbody");
      tabelaResultados.innerHTML = "";

      if (resultadosFiltrados.length === 0) {
        const row = tabelaResultados.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = "Nenhum resultado encontrado";
        cell.colSpan = 10; // Número de colunas da sua tabela
        cell.style.textAlign = "center";
      } else {
        resultadosFiltrados.forEach((c) => {
          const row = tabelaResultados.insertRow();
          row.insertCell(0).textContent = c.data || "-";
          row.insertCell(1).textContent = c.site || "-";
          row.insertCell(2).textContent = c.local || "-";
          row.insertCell(3).textContent = c.ambiente || "-";
          row.insertCell(4).textContent = c.temperatura || "-";
          row.insertCell(5).textContent = c.rack || "-";
          row.insertCell(6).textContent = c.numero || "-";
          row.insertCell(7).textContent = c.equipamento || "-";
          row.insertCell(8).textContent = c.preenchido || "-";
          row.insertCell(9).textContent = c.observacao || "-";
        });
      }
    });

    // Carrega todos os dados quando a página é aberta
    const carregarTodosDados = () => {
      const checklists = JSON.parse(localStorage.getItem("checklists")) || [];
      const tabelaResultados = document.querySelector("#resultados tbody");
      tabelaResultados.innerHTML = "";

      if (checklists.length === 0) {
        const row = tabelaResultados.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = "Nenhum dado cadastrado";
        cell.colSpan = 10;
        cell.style.textAlign = "center";
      } else {
        checklists.forEach((c) => {
          const row = tabelaResultados.insertRow();
          row.insertCell(0).textContent = c.data || "-";
          row.insertCell(1).textContent = c.site || "-";
          row.insertCell(2).textContent = c.local || "-";
          row.insertCell(3).textContent = c.ambiente || "-";
          row.insertCell(4).textContent = c.temperatura || "-";
          row.insertCell(5).textContent = c.rack || "-";
          row.insertCell(6).textContent = c.numero || "-";
          row.insertCell(7).textContent = c.equipamento || "-";
          row.insertCell(8).textContent = c.preenchido || "-";
          row.insertCell(9).textContent = c.observacao || "-";
        });
      }
    };

    // Carrega todos os dados quando a página é aberta
    document.addEventListener("DOMContentLoaded", carregarTodosDados);
  }

  // Tabela de status dos prédios (index.html)
  if (document.querySelector("table tr th") && document.querySelector("table tr th").textContent === "FIELD") {
    const lancamentosEsperados = {
      "PREDIO 1": 9,
      "PREDIO 2": 1,
      "PREDIO 3": 1,
      "PREDIO 4": 47,
      "PREDIO 5": 60,
      "PREDIO 6": 1,
      "PREDIO 7": 13,
      "PREDIO 8": 14,
      "PREDIO 9": 41,
      "PREDIO 10": 14,
      "PREDIO 11": 50,
    };

    const tableRows = document.querySelectorAll("table tr");
    tableRows.forEach((row) => {
      if (row.cells[0].textContent === "FIELD") return;

      const predio = row.cells[0].textContent;
      const statusCell = row.cells[1];
      const expected = lancamentosEsperados[predio];
      const lancamentosAtuais = parseInt(localStorage.getItem(predio)) || 0;

      // Verifica se é um novo dia (depois das 9h)
      const agora = new Date();
      const horaAtual = agora.getHours();
      const ehNovoDia = horaAtual >= 9; // Considera novo dia após 9h
     
      if (ehNovoDia && lancamentosAtuais === 0) {
        statusCell.innerHTML = "<strong>ATRASADO</strong>";
        statusCell.style.color = "red";
      } else if (lancamentosAtuais >= expected) {
        statusCell.innerHTML = "<strong>EM DIA</strong>";
        statusCell.style.color = "green";
      } else if (lancamentosAtuais > 0) {
        statusCell.innerHTML = `<strong>${lancamentosAtuais}/${expected}</strong>`;
        statusCell.style.color = "orange";
      } else {
        statusCell.innerHTML = "<strong>PENDENTE</strong>";
        statusCell.style.color = "gray";
      }
    });
  }
});