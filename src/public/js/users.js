//funcion para cargar el listado de usuarios registrados

function listUsers(usersList) {
  let container = document.getElementById("list-users");
  container.innerHTML = "";

  // Crear la tabla
  const table = document.createElement("table");
  table.classList.add("user-table");
  // Crear la fila de encabezado
  const headerRow = document.createElement("tr");
  const headers = ["Nombre", "Apellido", "Email", "Rol"];
  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
      });
    table.appendChild(headerRow);

    usersList.forEach((user) => {
        const row = document.createElement("tr");

        const first_nameCell = document.createElement("td");
        first_nameCell.textContent = user.first_name;
        row.appendChild(first_nameCell);

        const last_nameCell = document.createElement("td");
        last_nameCell.textContent = user.last_name;
        row.appendChild(last_nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const roleCell = document.createElement("td");
        roleCell.textContent = user.role;
        row.appendChild(roleCell);

        table.appendChild(row);
})
container.appendChild(table);
}
