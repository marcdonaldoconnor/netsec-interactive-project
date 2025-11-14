/*

THIS SCRIPT IS TO LOAD THE SUMMERY PAGE FOR THE EMAIL GAME. IT LOADS THE RESULTS OF THE USERS LOCAL
STORAGE AND THEN PUTS IT INTO A TABLE

*/ 


async function loadSummary(){//this is the main func that does everything for this page
    let stats = loadDict("stats");//loads from the local storage

    const table = document.createElement("table");
    table.border = "1"; //simple border for visibility

    //create header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Question", "Correct", "Wrong", "Missed"].forEach(headerText => {//makes the headers.
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    Object.entries(stats).forEach(([key, values]) => {//for each row of the players results, make that row of the table.
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        keyCell.textContent = key;
        row.appendChild(keyCell);
        Object.entries(values).forEach(([key,value]) =>{//for each statistic make a cell (correct, wrong, missed)
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    document.getElementById("tableContainer").appendChild(table);
}

document.addEventListener("DOMContentLoaded", function() {//just loades the summery automatically when the page loads
    loadSummary();
});
