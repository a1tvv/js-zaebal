// Модальное окно «Связаться»: кнопка в шапке открывает форму на любой странице сайта
document.querySelector('.site-header').insertAdjacentHTML('beforeend', `
  <button class="modal-open" id="modalOpen" type="button">Связаться</button>
`);

document.body.insertAdjacentHTML('beforeend', `
  <dialog class="site-modal" id="siteModal" aria-labelledby="siteModalTitle">
    <div class="site-modal-body">
      <button class="site-modal-close" id="modalClose" type="button" aria-label="Закрыть">×</button>
      <span class="eyebrow">F1 Paddock</span>
      <h2 id="siteModalTitle">Связаться</h2>
      <form class="site-modal-form" id="modalForm" novalidate>
        <label for="modalName">Имя и фамилия</label>
        <input id="modalName" name="name" autocomplete="name" required>

        <label for="modalGroup">Группа</label>
        <input id="modalGroup" name="group" required>

        <label for="modalEmail">Email</label>
        <input id="modalEmail" name="email" type="email" autocomplete="email" placeholder="name@gmail.com" required>

        <label for="modalPhone">Телефон</label>
        <input id="modalPhone" name="phone" type="tel" autocomplete="tel" placeholder="+7 700 123-45-67" required>

        <button class="site-modal-submit" type="submit">Отправить</button>
        <p class="site-modal-status" id="modalStatus" role="status" aria-live="polite"></p>
      </form>
    </div>
  </dialog>
`);

const siteModal = document.querySelector('#siteModal');
const modalForm = document.querySelector('#modalForm');
const modalStatus = document.querySelector('#modalStatus');

const modalPatterns = {
  name: /^[\p{L}][\p{L}\p{M} .'-]*$/u,
  group: /^[\p{L}\p{N}][\p{L}\p{M}\p{N} -]*$/u,
  email: /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i,
  phone: /^\+?[1-9]\d{7,14}$/
};

const modalMessages = {
  name: 'Введите имя и фамилию: используйте буквы, пробелы, дефис или апостроф.',
  group: 'Введите название группы, используя буквы, цифры, пробелы или дефис.',
  email: 'Введите корректный email, например name@gmail.com.',
  phone: 'Введите телефон в международном формате, например +7 700 123-45-67.'
};

function validateModalField(field) {
  const value = field.value.trim();
  const normalizedValue = field.name === 'phone' ? value.replace(/[\s()-]/g, '') : value;
  const isValid = Boolean(value) && modalPatterns[field.name].test(normalizedValue);

  field.setCustomValidity(isValid ? '' : modalMessages[field.name]);
  return isValid;
}

function setModalStatus(text, type) {
  modalStatus.textContent = text;
  modalStatus.className = type ? `site-modal-status is-${type}` : 'site-modal-status';
}

// Открытие и закрытие: кнопка в шапке, крестик, Esc (работает у <dialog> сам) и клик по фону
document.querySelector('#modalOpen').addEventListener('click', () => siteModal.showModal());
document.querySelector('#modalClose').addEventListener('click', () => siteModal.close());
siteModal.addEventListener('click', (event) => {
  if (event.target === siteModal) {
    siteModal.close();
  }
});

modalForm.addEventListener('input', (event) => {
  if (event.target.name in modalPatterns) {
    validateModalField(event.target);
  }
  setModalStatus('');
});

modalForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = [...modalForm.querySelectorAll('input')];
  const isValid = fields.map(validateModalField).every(Boolean);

  if (!isValid) {
    setModalStatus('Проверьте поля: одно или несколько заполнены некорректно.', 'error');
    modalForm.reportValidity();
    return;
  }

  setModalStatus('Данные заполнены корректно. Отправка на сервер не настроена.', 'success');
});
