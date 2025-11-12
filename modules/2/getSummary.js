async function loadSummary(){
    let stats = loadDict("stats");

    const table = document.createElement("table");
    table.border = "1"; // Simple border for visibility

    // Create header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["quesiton", "correct", "wrong", "missed"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    Object.entries(stats).forEach(([key, values]) => {
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        keyCell.textContent = key;
        row.appendChild(keyCell);
        Object.entries(values).forEach(([key,value]) =>{
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    document.getElementById("tableContainer").appendChild(table);
}

document.addEventListener("DOMContentLoaded", function() {
    // Your function to create a table
    loadSummary();
});
