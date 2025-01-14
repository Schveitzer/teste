// Adicionar o script do Chart.js dinamicamente
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
script.onload = drawChart;
document.head.appendChild(script);

// Função para desenhar o gráfico
function drawChart() {
  const container = document.createElement("div");
  container.innerHTML = '<canvas id="radarChart" style="width:100%; height:400px;"></canvas>';
  document.body.appendChild(container);

  // Obter dados do Looker Studio
  dscc.subscribeToData((data) => {
    const labels = data.tables.DEFAULT.map((row) => row.dimension[0]); // Categorias
    const dataset = data.tables.DEFAULT.map((row) => row.metric[0]);   // Valores

    const ctx = document.getElementById("radarChart").getContext("2d");
    new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Valores",
            data: dataset,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
          },
        },
      },
    });
  });
}
