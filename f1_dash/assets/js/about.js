const contactForm = document.querySelector('#contactForm');
const contactStatus = document.querySelector('#contactStatus');

const contactPatterns = {
  name: /^[\p{L}][\p{L}\p{M} .'-]*$/u,
  group: /^[\p{L}\p{N}][\p{L}\p{M}\p{N} -]*$/u,
  email: /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i,
  phone: /^\+?[1-9]\d{7,14}$/
};

const validationMessages = {
  name: 'Введите имя и фамилию: используйте буквы, пробелы, дефис или апостроф.',
  group: 'Введите название группы, используя буквы, цифры, пробелы или дефис.',
  email: 'Введите корректный email, например name@gmail.com.',
  phone: 'Введите телефон в международном формате, например +7 700 123-45-67.'
};

function validateContactField(field) {
  const value = field.value.trim();
  const normalizedValue = field.name === 'phone' ? value.replace(/[\s()-]/g, '') : value;
  const isValid = Boolean(value) && contactPatterns[field.name].test(normalizedValue);

  field.setCustomValidity(isValid ? '' : validationMessages[field.name]);
  return isValid;
}

contactForm.addEventListener('input', (event) => {
  const field = event.target;
  if (field instanceof HTMLInputElement && field.name in contactPatterns) {
    validateContactField(field);
  }

  contactStatus.textContent = '';
  contactStatus.className = 'contact-status';
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = [...contactForm.querySelectorAll('input')];
  const isValid = fields.map(validateContactField).every(Boolean);

  if (!isValid) {
    contactStatus.textContent = 'Проверьте поля: одно или несколько заполнены некорректно.';
    contactStatus.className = 'contact-status is-error';
    contactForm.reportValidity();
    return;
  }

  contactStatus.textContent = 'Контактные данные заполнены корректно. Отправка данных не настроена.';
  contactStatus.className = 'contact-status is-success';
});
