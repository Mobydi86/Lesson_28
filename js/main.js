$(document).ready(function() {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');
  modalBtn.on('click', function(){
    modal.toggleClass('modal--visible')
  });
  closeBtn.on('click', function(){
    modal.toggleClass('modal--visible')
  });
// Модальное окно с благодарностью
  var modalA = $('.modal-answer'),
      modalABtn = $('[data-toggle=modal-answer]'),
      closeABtn = $('.modal-answer__close');
  modalABtn.on('click', function(){
    modalA.toggleClass('modal-answer--visible')
  });
  closeABtn.on('click', function(){
    modalA.toggleClass('modal-answer--visible')
  });
  
  // слайдер в секции Завершенные проекты
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  })

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');
      
  next.css("left", prev.width() + bullets.width() + 40)
  bullets.css("left", prev.width() + 20)

  new WOW().init();

  // валидация форм
  function validateForm(form){
    $(form).validate({
      errorClass: "invalid",
      errorElement: "div",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15
        },
        userPhone: {
          required: true,
          minlength: 17
        },
        userQuestion: "required",
        // compound rule
        userEmail: {
          required: true,
          email: true
        }
      },
      messages: {
        userName: {
          required: "Заполните поле",
          minlength: "Слишком короткое имя",
          maxlength: "Имя не должно превышать 15 символов"
        },
        userPhone: {
          required: "Заполните поле",
          minlength: "Некорректно введен номер"
        },
        userQuestion: "Заполните поле",
        userEmail: {
          required: "Заполните поле",
          email: "Введите Ваш email в формате name@domain.com"
        }
      },
      submitHandler: function (form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function(){
           $(form)[0].reset();
           //$(form).html('<p class="modal-answer__text">Спасибо! Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут.</p>');
           modalA.toggleClass('modal-answer--visible');
          },
          error: function(jqXHR, textStatus) {
            console.error(jqXHR + " " + textStatus);
          }
        });
      }
    });
  }
  validateForm('.modal__form');
  validateForm('.control__form');
  validateForm('.footer__form');


  // маска для телефона

  $('[type=tel]').mask('+7(000) 00-00-000', {placeholder: "+7 (___) __-__-___"});

});