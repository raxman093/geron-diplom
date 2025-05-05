const navigation = document.querySelectorAll('.main-nav li a');
const sections = document.querySelectorAll('main section');

// Функция для обновления активного пункта меню
function updateActiveLink() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 76; // Учитываем высоту фиксированного меню (80px)
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  // Обновляем активный пункт меню
  navigation.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

// Слушаем событие прокрутки
window.addEventListener('scroll', updateActiveLink);

// Обработчик клика
navigation.forEach(link => {
  link.addEventListener('click', function(event) {
    // Убираем стандартное поведение (прокрутка через #href)
    event.preventDefault();

    // Прокручиваем страницу до секции
    const targetSection = document.querySelector(this.getAttribute('href'));
    const sectionTop = targetSection.offsetTop - 76; // Учитываем высоту фиксированного меню

    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });

    // Обновляем активный класс
    navigation.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});
    




//Переключаем форму
const mailLogin = document.querySelector('.mail-login');
const telegramLogin = document.querySelector('.telegram-login');
const mailTelegramIco = document.querySelectorAll('.input-wrapper svg');
const placeholder = ["example@gmail.com", "@example123"];
const inputWrapper = document.querySelector('.field-login');

mailLogin.addEventListener('click', function(e){
    e.target.classList.add('active');
    mailTelegramIco[0].classList.add('active');
    mailTelegramIco[1].classList.remove('active');
    telegramLogin.classList.remove('active');
    inputWrapper.placeholder = placeholder[0];
});
telegramLogin.addEventListener('click', function(e){
    e.target.classList.add('active');
    mailTelegramIco[1].classList.add('active');
    mailTelegramIco[0].classList.remove('active');
    mailLogin.classList.remove('active');
    inputWrapper.placeholder = placeholder[1];
});



//Расчитываем свой тариф
const tarrifsLicence = document.querySelector('.tarrifs-licence');
const tarrifsProject = document.querySelector('.tarrifs-project');
const tarrifsPrice = document.querySelector('.tarrifs-price');

function priceCalculate(){
    tarrifsPrice.value = (tarrifsLicence.value * 1000  + tarrifsProject.value * 1000).toLocaleString("ru-RU") + " т";
}