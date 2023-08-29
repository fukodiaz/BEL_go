# SPA "BEL_go"

1. личный учебный проект приложения, предусматривающего возможность аренды жилья <br>
	из предложенных вариантов в одном из четырех городов Бельгии;
2. для удобного поиска жилья присутствуют опции для сортировки предложений по различным критериям;
3. каждая позиция из списка арендуемых объектов ведет на "отдельную" страницу с её детализацией;
4. учитывается авторизация пользователей;
5. frontend-часть создана на основе связки React+Redux;
6. backend написан на PHP 8.2 (Slim 4 - фреймворк);
7. для работы с данными используется MySQL;
8. RESTful сервис разворачивается в Docker контейнере, в котором на Alpine Linux запускается Nginx 1.24 & PHP-FPM 8.2;
9. сборка клиентской части осуществялется через webpack;
 10. реализована адаптивная сетка для мобильной, планшетной и десктопной версий;
 11. при стилизации используется препроцессор Less

ссылка на сайт https://bel-go.vercel.app/
# Preview
<image src="assets/main.png" alt="Скриншот главной страницы">

<image src="assets/details.png" alt="Скриншот страницы с детализацией">

<image src="assets/favorites.png" alt="Скриншот с избранными номерами">

<image src="assets/auth.png" alt="авторизация">