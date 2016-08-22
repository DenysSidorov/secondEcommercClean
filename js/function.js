//Создано 21.08.2016 Сидоров Денис

/* Показать  sub_menu*/

$('.categorySubMenu').hover(function (e) {
    console.log('hover');
    $('.subMenu2').toggleClass('displayNone').toggleClass('inLineOn');
});


/*Показать sub_sub_menu по  AJAX запросу в формате HTML*/

$('.showSubSubMenu').hover(function (e) {
    console.log("hover sub sub");
    $('.subMenu3Ul').toggleClass('displayNone').toggleClass('inLineOn');

    var bool = $('.subMenu3Ul').find('li').length > 0;
    console.log(bool);
    //запрос на сервер в случае если меню еще нет
    if (!$('.subMenu3Ul').find('li').length > 0) {
        $.ajax({
            url: "ajax/subSubMenu.html",
            dataType: "html",
            cache: false,
            beforeSend: function () {
                $('#hideBlockLoad').toggleClass('displayNone').html('  Download menu...  ');
                console.log('Загрузка есть но, ее не видно');
            },
            success: function (html) {
                setTimeout(function () {
                    console.log('success    load 1.5s');
                    $(".subMenu3Ul").html(html);
                    $('#hideBlockLoad').toggleClass('displayNone');
                }, 1500);

            }
        });
    }
});


/* Переключатель вкадок, отображение их содержимого*/

function tab(el) {
    // Получить список вкладок меню
    var menu = el.parentNode;
    var tabs = menu.getElementsByTagName('li');
    for (var i = 0; i < tabs.length; i++) {
        // Вкладка
        var tab = tabs[i];
        // Блок контента
        var content = document.getElementById(tab.id + '_content');
        // Это вкладка на которой кликнули мышкой
        if (tab.id == el.id) {
            // Сделать вкладку активной
            tab.className = 'tab_active';
            // Показать связанный с ней блок контента
            if (content) {
                content.className = 'tab_content visible';
            }
        }
        else {
            // Сделать вкладку неактивной
            tab.className = '';
            // Скрыть связанный с ней блок контента
            if (content) {
                content.className = 'tab_content';
            }
        }
    }
}


/*Слайдер с переходами вправо и влево*/

jQuery(document).ready(function () {
    function htmSlider() {
        /* Зададим следующие параметры */
        /* обертка слайдера */
        var slideWrap = jQuery('.slide-wrap');
        /* кнопки вперед/назад и старт/пауза */
        var nextLink = jQuery('.next-slide');
        var prevLink = jQuery('.prev-slide');
        var playLink = jQuery('.auto');
        /* Проверка на анимацию */
        var is_animate = false;
        /* ширина слайда с отступами */
        var slideWidth = jQuery('.slide-item').outerWidth();
        /* смещение слайдера */
        var scrollSlider = slideWrap.position().left - slideWidth;

        /* Клик по ссылке на следующий слайд */
        prevLink.click(function () {
            if (!slideWrap.is(':animated')) {
                slideWrap.animate({left: scrollSlider}, 500, function () {
                    slideWrap
                        .find('.slide-item:first')
                        .appendTo(slideWrap)
                        .parent()
                        .css({'left': 0});
                });
            }
        });
        /* Клик по ссылке на предыдующий слайд */
        nextLink.click(function () {
            if (!slideWrap.is(':animated')) {
                slideWrap
                    .css({'left': scrollSlider})
                    .find('.slide-item:last')
                    .prependTo(slideWrap)
                    .parent()
                    .animate({left: 0}, 500);
            }
        });
        /* Функция автоматической прокрутки слайдера */
        function autoplay() {
            if (!is_animate) {
                is_animate = true;
                slideWrap.animate({left: scrollSlider}, 500, function () {
                    slideWrap
                        .find('.slide-item:first')
                        .appendTo(slideWrap)
                        .parent()
                        .css({'left': 0});
                    is_animate = false;
                });
            }
        }

        /* Клики по ссылкам старт/пауза */
        playLink.click(function () {
            if (playLink.hasClass('play')) {
                /* Изменяем клас у кнопки на клас паузы */
                playLink.removeClass('play').addClass('pause');
                /* Добавляем кнопкам вперед/назад клас который их скрывает */
                jQuery('.navy').addClass('disable');
                /* Инициализируем функцию autoplay() через переменную
                 чтобы потом можно было ее отключить
                 */
                timer = setInterval(autoplay, 1000);
            } else {
                playLink.removeClass('pause').addClass('play');
                /* показываем кнопки вперед/назад */
                jQuery('.navy').removeClass('disable');
                /* Отключаем функцию autoplay() */
                clearInterval(timer);
            }
        });

    }

    /* иницилизируем функцию слайдера */
    htmSlider();
});

