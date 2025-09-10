document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXR9bNkCr7QmZnaFplQPjBWd44yHbtEnPDGqTR54Pj7C4h4nwatvCW-d2_HH87LPJ6BrJigfK_imob/pub?output=csv";

  Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function (results) {
      const data = results.data;
      const tbody = document.getElementById("attendance");
      let presentCount = 0;

      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.Name}</td>
          <td>${row.Date}</td>
          <td>${row.Time}</td>
          <td>${row.Status}</td>
        `;
        tbody.appendChild(tr);

        if (row.Status === "Present") presentCount++;
      });

      document.getElementById("total").textContent = data.length - 1;
      document.getElementById("present").textContent = presentCount;
      document.getElementById("absent").textContent = (data.length - 1) - presentCount;
    }
  });
});
