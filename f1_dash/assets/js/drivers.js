const driverList = document.querySelector('#driverList');
const driverModal = document.querySelector('#driverModal');
const driverDetail = document.querySelector('#driverDetail');

let drivers = [];

// List: выводит карточки всех пилотов
function list(items) {
  driverList.innerHTML = items.map((driver) => `
    <button class="card driver-card" type="button" data-id="${driver.id}">
      <div class="driver-photo" style="--team:${driver.teamColor}">${driver.number}</div>
      <div class="driver-info">
        <span class="driver-number">${String(driver.number).padStart(2, '0')}</span>
        <h2>${driver.name}</h2>
        <span class="driver-team">${driver.team} · ${driver.country}</span>
        <div class="driver-stat"><span>Дебют в F1</span><b>${driver.debut}</b></div>
      </div>
    </button>
  `).join('');
}

// Detail: показывает подробности одного пилота в модальном окне
function detail(id) {
  const driver = drivers.find((item) => item.id === id);

  driverDetail.innerHTML = `
    <div class="driver-detail-head" style="--team:${driver.teamColor}">
      <span class="driver-detail-number">${driver.number}</span>
      <div>
        <span class="eyebrow">${driver.team}</span>
        <h2 id="driverModalTitle">${driver.name}</h2>
      </div>
    </div>
    <dl class="driver-detail-list">
      <dt>Номер</dt><dd>${driver.number}</dd>
      <dt>Команда</dt><dd>${driver.team}</dd>
      <dt>Страна</dt><dd>${driver.country}</dd>
      <dt>Дата рождения</dt><dd>${driver.birthDate}</dd>
      <dt>Дебют в F1</dt><dd>${driver.debut}</dd>
      <dt>Чемпионские титулы</dt><dd>${driver.titles}</dd>
    </dl>
    <p class="driver-detail-bio">${driver.bio}</p>
  `;
  driverModal.showModal();
}

// Клик по карточке открывает detail этого пилота
driverList.addEventListener('click', (event) => {
  const card = event.target.closest('[data-id]');
  if (card) {
    detail(Number(card.dataset.id));
  }
});

// Закрытие модалки: крестик, Esc (работает у <dialog> сам) и клик по фону
document.querySelector('#driverModalClose').addEventListener('click', () => driverModal.close());
driverModal.addEventListener('click', (event) => {
  if (event.target === driverModal) {
    driverModal.close();
  }
});

// Загружаем JSON и выводим список
fetch('../assets/data/drivers.json')
  .then((response) => response.json())
  .then((data) => {
    drivers = data;
    list(drivers);
  })
  .catch(() => {
    driverList.innerHTML = '<p class="muted">Не удалось загрузить список пилотов. Открой страницу через сервер, а не через file://.</p>';
  });
