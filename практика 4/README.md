**Counter & Лото**  
Два независимых одностраничных веб-приложения: счётчик с цветовой индикацией и генератор лото-чисел. Каждое — один .html-файл со встроенными <style> и <script>.  
| | |  
|-|-|  
| **Параметр** | **Значение** |   
| Версия | 1.0 |   
| Тип | Клиентские приложения (frontend) |   
| Стек | HTML5, CSS3, JavaScript (ES6+), Vanilla JS |   
| Зависимости | нет |   
| Сборка / сервер | не требуются |   
| Браузеры | Chrome, Firefox, Edge, Safari (современные версии) |   
   
**Быстрый старт**  
1. Сохранить код в файлы counter.html и lotto.html.  
2. Открыть файл в браузере (двойной клик или перетаскиванием в окно браузера).  
**Структура файлов**  
Оба файла устроены одинаково:  
.html  
 ├── <style>    — стили  
 ├── <body>     — разметка  
 └── <script>   — логика  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAUBBAwSf8GGLWDWFDY3ixgjcRZhLMNjNHdQYAwF9cq1rV/vUEAIDX7gcRXAQ2s/16gwAAAABJRU5ErkJggg==)  
**1. Counter**  
Демонстрирует работу с состоянием (переменная-счётчик), обработку кликов и динамическую смену стилей.  
**1.1. Требования**  
| | |  
|-|-|  
| **ID** | **Требование** |   
| F-1 | Отображать текущее значение счётчика |   
| F-2 | Кнопка «+» увеличивает значение на 1 |   
| F-3 | Кнопка «−» уменьшает значение на 1 |   
| F-4 | Кнопка «Сброс» устанавливает значение 0 |   
| F-5 | Цвет числа зависит от знака: зелёный (> 0), серый (= 0), красный (< 0) |   
   
**1.2. Разметка**  
.counter                     — карточка (белый фон, скругления, тень)  
 ├── h1                       — заголовок «Counter»  
 ├── #value (.value)          — число, 96px, цвет меняется динамически  
 └── .buttons  
     ├── #dec   (.btn-dec)    — «−»  
     ├── #reset (.btn-reset)  — «Сброс»  
     └── #inc   (.btn-inc)    — «+»  
   
**1.3. Состояние и функции**  
| | | |  
|-|-|-|  
| **Имя** | **Тип** | **Описание** |   
| count | переменная | Текущее значение. Начальное — 0 |   
| valueEl | константа | Ссылка на DOM-элемент #value |   
| render() | функция | Выводит count в #value и обновляет CSS-класс цвета |   
   
**1.4. Логика**  
При загрузке count = 0, выполняется render(). Каждый обработчик меняет count и вызывает render().  
let count = 0;  
 const valueEl = document.getElementById('value');  
   
 function render() {  
   valueEl.textContent = count;  
   valueEl.classList.remove('positive', 'zero', 'negative');  
   valueEl.classList.add(  
     count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'  
   );  
 }  
   
 document.getElementById('inc').addEventListener('click', () => { count++;   render(); });  
 document.getElementById('dec').addEventListener('click', () => { count--;   render(); });  
 document.getElementById('reset').addEventListener('click', () => { count = 0; render(); });  
   
 render();  
   
**1.5. Цветовая индикация**  
| | | |  
|-|-|-|  
| **Условие** | **CSS-класс** | **Цвет** |   
| count > 0 | .positive | #16a34a (зелёный) |   
| count === 0 | .zero | #94a3b8 (серый) |   
| count < 0 | .negative | #dc2626 (красный) |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsScYxpg/jFnsYARvRrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA22QBcposvV4AAAAAElFTkSuQmCC)  
**2. Лото**  
Генерирует 6 случайных чисел от 1 до 99 и выводит их кружками в двузначном формате. Демонстрирует генерацию случайных чисел, создание DOM-элементов из JavaScript и форматирование строк.  
**2.1. Требования**  
| | |  
|-|-|  
| **ID** | **Требование** |   
| F-1 | По нажатию кнопки генерируется 6 случайных чисел |   
| F-2 | Диапазон: от 1 до 99 включительно |   
| F-3 | Формат вывода — двузначный (05, 25, 99) |   
| F-4 | Кружки создаются через JavaScript |   
| F-5 | При повторном нажатии старые числа заменяются новыми |   
   
**2.2. Разметка**  
.lotto                        — карточка (glassmorphism)  
 ├── h1                        — заголовок «🎲 Лото»  
 ├── p.subtitle                — «6 случайных чисел от 01 до 99»  
 ├── #balls (.balls)           — контейнер кружков, сетка 3×2  
 └── #generate (.btn-generate) — кнопка «Генерировать»  
   
Кружок (.ball) создаётся динамически и в исходной разметке отсутствует. Стиль: радиальный градиент, тень; появление — анимация @keyframes pop.  
**2.3. Функции**  
| | | |  
|-|-|-|  
| **Имя** | **Тип** | **Описание** |   
| getRandomInt(min, max) | функция | Случайное целое в диапазоне [min, max] (обе границы включительно) |   
| generate() | функция | Очищает #balls, создаёт и добавляет 6 кружков |   
| ballsEl | константа | Ссылка на контейнер #balls |   
   
**2.4. Алгоритм**  
1. Пользователь нажимает «Генерировать» → вызывается generate().  
2. Контейнер очищается: ballsEl.innerHTML = ''.  
3. Цикл i = 0…5 (6 итераций):  
  - getRandomInt(1, 99) — случайное число;  
  - padStart(2, '0') — приведение к двум цифрам;  
  - создаётся <div class="ball"> с текстом числа;  
  - задаётся задержка анимации i * 0.07s;  
  - элемент добавляется в #balls.  
const ballsEl = document.getElementById('balls');  
   
 function getRandomInt(min, max) {  
   min = Math.ceil(min);  
   max = Math.floor(max);  
   return Math.floor(Math.random() * (max - min + 1)) + min;  
 }  
   
 function generate() {  
   ballsEl.innerHTML = '';  
   for (let i = 0; i < 6; i++) {  
     const num = getRandomInt(1, 99);  
     const ball = document.createElement('div');  
     ball.className = 'ball';  
     ball.textContent = String(num).padStart(2, '0');  
     ball.style.animationDelay = `${i * 0.07}s`;  
     ballsEl.appendChild(ball);  
   }  
 }  
   
 document.getElementById('generate').addEventListener('click', generate);  
   
**2.5. Параметры генерации**  
| | |  
|-|-|  
| **Параметр** | **Значение** |   
| Количество чисел | 6 |   
| Диапазон | 1–99 (включительно) |   
| Формат | String(num).padStart(2, '0') → 5 → "05", 25 → "25" |   
| Задержка анимации | i * 0.07s (0 … 0.35 s) |   
| Уникальность | не гарантируется — числа выбираются независимо, дубликаты возможны |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhwgJOUPcjIpnRgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseaJEEL8XMiYMAAAAASUVORK5CYII=)  
**3. Тестирование**  
**3.1. Counter**  
| | | |  
|-|-|-|  
| **#** | **Действие** | **Ожидаемый результат** |   
| T-1 | Открыть страницу | 0 серого цвета |   
| T-2 | Нажать «+» | 1 зелёного цвета |   
| T-3 | Нажать «−» при 0 | -1 красного цвета |   
| T-4 | Нажать «Сброс» | 0 серого цвета |   
| T-5 | Нажать «+» 5 раз, затем «Сброс» | 0 серого цвета |   
   
**3.2. Лото**  
| | | |  
|-|-|-|  
| **#** | **Действие** | **Ожидаемый результат** |   
| T-1 | Открыть страницу | Контейнер шаров пуст |   
| T-2 | Нажать «Генерировать» | Появляются ровно 6 кружков |   
| T-3 | Проверить диапазон | Все числа от 1 до 99 |   
| T-4 | Проверить формат | Однозначные числа с ведущим нулём (05) |   
| T-5 | Нажать «Генерировать» повторно | Старые числа заменены новыми |   
   
Быстрая проверка диапазона getRandomInt в консоли браузера:  
const s = Array.from({ length: 10000 }, () => getRandomInt(1, 99));  
 console.log(Math.min(...s), Math.max(...s)); // ожидается: 1 99  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNBCUrfDqrYGVDAgAU2QtIq6DIzW7UHAMBfHGt1V+fXEwAAXrseHCQGBEuErVgAAAAASUVORK5CYII=)  
**4. Ограничения**  
- Состояние не сохраняется: при перезагрузке страницы Counter возвращается к 0, числа Лото сбрасываются.  
- Лото допускает повторяющиеся числа.  
- У Counter нет верхней и нижней границы значения.  
- Адаптивная вёрстка под мобильные устройства не реализована.  
**5. Возможные доработки**  
| | |  
|-|-|  
| **Приложение** | **Идеи** |   
| Counter | Настраиваемый шаг (например, ±5); сохранение в localStorage; история изменений |   
| Лото | Уникальные числа; настраиваемые количество и диапазон; сортировка; звук при генерации; кнопка «Сброс» для очистки контейнера |   
| Общее | Объединение в одну страницу с вкладками; перенос на React/Vue; адаптивная вёрстка |   
   
   
   
   
   
**6. Глоссарий**  
| | |  
|-|-|  
| **Термин** | **Значение** |   
| DOM | Объектная модель документа, с которой работает JavaScript |   
| State (состояние) | Данные, определяющие текущее поведение приложения (count) |   
| padStart | Метод строки: дополняет её символами слева до заданной длины |   
| Vanilla JS | JavaScript без сторонних библиотек и фреймворков |   
| Glassmorphism | Стиль «матового стекла» (backdrop-filter: blur) |   
   
