> [!TIP]
> Реальный кейс от компании «СКАН»

## Техническое задание
* Функциональные требования
    * Клиентская часть сервиса состоит из:
        * главной страницы,
        * формы авторизации,
        * формы для ввода параметров запроса,
        * страницы с выводом результатов запроса.

    * Требования к вёрстке
        * наличие всех элементов интерфейса,
        * цветовая гамма,
        * шрифты,
        * размеры,
        * отступы.
* Требования к коду
    * Проект должен был выполнен на React.
    * Интерфейс должен быть поделён на компоненты. Перед началом работы обдумайте, какие компоненты вы будете использовать. Деление должно быть логичным и оправданным.
    * Проект будет работать со множеством данных. Рекомендуем использовать более продвинутый инструмент хранения и изменения данных, чем обычный state. Например, useReducer, React Context или Redux.
    * При написании кода старайтесь следовать принципам:

    * KISS (Keep It Short and Simple — не усложняй),
    * DRY (Don’t Repeat Yourself — не повторяйся).
  

* Вывод результатов поиска
    * Здесь мы выводим результаты ранее введённого запроса. Этот раздел необязательно делать физически отдельной страницей (присваивать свой URL-адрес). Можно отобразить его поверх формы поиска после отправки запроса.

* Поиск состоит из трёх этапов:

    * Сначала мы делаем запрос POST objectsearch/histograms и получаем общую сводку по количеству публикаций и рискам.

    * После успешного выполнения запроса сводку необходимо отобразить  
    * На время, пока сводка подгружается, необходимо показать лоадер.
    * Затем, используя те же параметры поиска, отправляем запрос POST objectsearch, чтобы получить список публикаций. В ответе придёт список ID найденных документов.
   
* После того как мы получили ID документов, остался последний шаг. Подгрузить их содержимое: заголовок, дату, источник, текст публикации и так далее. Для этого воспользуемся запросом POST documents.
Однако мы уже знаем, что найденных публикаций может быть много (лимит поиска — 1000 результатов). Было бы неправильно загружать всё и сразу: это может занять много времени, а мы не хотим задерживать пользователя.

* Поэтому необходимо реализовать ленивую загрузку (lazy loading). Сначала нужно подгрузить только 10 первых результатов и добавить кнопку «Показать больше», по нажатии на которую будет подгружаться следующие 10 результатов. И так до тех пор, пока не будут загружены последние из найденных публикаций.

* После этого кнопку «Показать больше» необходимо спрятать.
  

> [!IMPORTANT]
>  Чтобы запустить загруженный проект React, выполните следующие действия:

### Установите Node.js и npm (менеджер пакетов для Node.js), если вы еще этого не сделали. Вы можете скачать и установить их по [ссылке](https://nodejs.org/en/download/)

> [!TIP] 
> Откройте терминал или командную строку и перейдите в каталог проекта.
  * Запустите npm install установку зависимостей проекта.
  * Запустите npm run dev, чтобы запустить сервер разработки.
  * Откройте веб-браузер и перейдите по адресу http://localhost:5173


***Задеплоенный проект можно увидеть по*** [ссылке](https://scan-wheat.vercel.app/)
