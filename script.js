document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXR9bNkCr7QmZnaFplQPjBWd44yHbtEnPDGqTR54Pj7C4h4nwatvCW-d2_HH87LPJ6BrJigfK_imob/pub?output=csv"; // <-- replace with your link

  Papa.parse(sheetUrl, {
    download: true,
    header: true,
    complete: function (results) {
      const data = results.data;
      const tbody = document.getElementById("attendance");
      tbody.innerHTML = ""; // clear old rows

      let presentCount = 0;
      let absentCount = 0;

      data.forEach(row => {
        if (!row.Name) return; // skip empty rows

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.Name}</td>
          <td>${row.Date}</td>
          <td>${row.Time}</td>
          <td class="${row.Status.toLowerCase()}">${row.Status}</td>
        `;
        tbody.appendChild(tr);

        if (row.Status === "Present") presentCount++;
        else if (row.Status === "Absent") absentCount++;
      });

      document.getElementById("total").textContent = data.length - 1; // minus header
      document.getElementById("present").textContent = presentCount;
      document.getElementById("absent").textContent = absentCount;
    }
  });
});
