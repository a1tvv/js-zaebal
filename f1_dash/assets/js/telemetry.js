const labels = ['Старт', '300 м', '600 м', '900 м', '1.2 км', '1.5 км', '1.8 км', '2.1 км', '2.4 км', 'Финиш'];
const chartColors = { red: '#e10600', orange: '#ff6b35', muted: '#9298a3', grid: '#292c34' };

Chart.defaults.color = chartColors.muted;
Chart.defaults.font.family = '"Barlow", Arial, sans-serif';

new Chart(document.querySelector('#speedChart'), {
  type: 'line',
  data: {
    labels,
    datasets: [
      { label: 'Ферстаппен', data: [110, 188, 276, 302, 248, 172, 290, 315, 231, 118], borderColor: chartColors.red, backgroundColor: 'rgba(225, 6, 0, .12)', fill: true, tension: .35, pointRadius: 2 },
      { label: 'Норрис', data: [105, 180, 269, 296, 240, 168, 284, 309, 225, 115], borderColor: chartColors.orange, fill: false, tension: .35, pointRadius: 2 }
    ]
  },
  options: {
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
    scales: {
      x: { grid: { color: chartColors.grid } },
      y: { beginAtZero: true, title: { display: true, text: 'км/ч' }, grid: { color: chartColors.grid } }
    }
  }
});

new Chart(document.querySelector('#sectorChart'), {
  type: 'bar',
  data: {
    labels: ['Сектор 1', 'Сектор 2', 'Сектор 3'],
    datasets: [
      { label: 'Ферстаппен', data: [28.41, 34.12, 30.88], backgroundColor: chartColors.red, borderRadius: 4 },
      { label: 'Норрис', data: [28.56, 34.01, 30.93], backgroundColor: chartColors.orange, borderRadius: 4 }
    ]
  },
  options: {
    maintainAspectRatio: false,
    plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } } },
    scales: {
      x: { grid: { display: false } },
      y: { min: 25, title: { display: true, text: 'секунды' }, grid: { color: chartColors.grid } }
    }
  }
});
