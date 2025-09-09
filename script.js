document.addEventListener("DOMContentLoaded", () => {
  // Load attendance.csv (must be in the same folder as index.html)
  Papa.parse("attendance.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const tbody = document.getElementById("attendance-table");
      let presentCount = 0;

      data.forEach(student => {
        if (!student.Name) return; // skip empty rows

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.Name}</td>
          <td>${student.Date}</td>
          <td>${student.Time}</td>
          <td>${student.Status}</td>
        `;
        tbody.appendChild(row);

        if (student.Status === "Present") presentCount++;
      });

      document.getElementById("total").textContent = data.length;
      document.getElementById("present").textContent = presentCount;
      document.getElementById("absent").textContent = data.length - presentCount;
    }
  });
});
