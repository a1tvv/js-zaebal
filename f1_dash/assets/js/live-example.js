// Пример для простой таблицы, если API отдаёт массив пилотов по адресу /api/live.
// Формат ответа: [{ "position": 1, "driver": "VER", "team": "Red Bull",
//                   "lapTime": "1:32.456", "points": 25 }]
const liveRows = document.querySelector('#live-rows');
const liveStatus = document.querySelector('#live-status');

async function updateLiveTiming() {
  try {
    const response = await fetch('/api/live');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const drivers = await response.json();
    if (!Array.isArray(drivers)) throw new TypeError('API должен вернуть массив пилотов');

    liveRows.replaceChildren(...drivers.map((driver) => {
      const row = document.createElement('tr');
      [driver.position, driver.driver, driver.team, driver.lapTime, driver.points].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value ?? '—';
        row.append(cell);
      });
      return row;
    }));
    liveStatus.textContent = `Обновлено: ${new Date().toLocaleTimeString('ru-RU')}`;
  } catch (error) {
    liveStatus.textContent = `Не удалось загрузить Live Timing: ${error.message}`;
    console.error('Live Timing request failed:', error);
  }
}

updateLiveTiming();
setInterval(updateLiveTiming, 2000);
