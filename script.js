function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3001/api/equipes");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
      const data = JSON.parse(this.responseText);

      document.getElementById("error").style.display = "none"

      // Limpa a tabela
      const tableBody = document.querySelector("#teams-table tbody");
      tableBody.innerHTML = "";

      // Cria cabeçalho da tabela
      document.getElementById("teams-table").style.display = "flex"
      const tableHeader = document.createElement("tr");
      const idHeader = document.createElement("th");
      idHeader.textContent = "ID";
      const nameHeader = document.createElement("th");
      nameHeader.textContent = "Nome";
      const pontosHeader = document.createElement("th");
      pontosHeader.textContent = "Pontos";
      tableHeader.appendChild(idHeader);
      tableHeader.appendChild(nameHeader);
      tableHeader.appendChild(pontosHeader);
      tableBody.appendChild(tableHeader);

      // Preenche a tabela com os dados retornados
      data.equipes.forEach(function (equipe) {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = equipe.id;
        const nameCell = document.createElement("td");
        nameCell.textContent = equipe.time;
        const pontosCell = document.createElement("td");
        pontosCell.textContent = equipe.pontos;
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(pontosCell);
        tableBody.appendChild(row);
      });
    } 
    else if (this.status === 404 || this.readyState === 4){
      document.getElementById("error").style.display = "flex"
      document.getElementById("teams-table").style.display = "none"
    }

    else if (this.readyState === 4) {
      console.error("Error: " + this.status);
    }
  };
}
