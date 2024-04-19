# Долевое строительство

Дан массив из N долей, представленных в виде N рациональных: ['1.5','3','6','1.5']<br>
Написать программу, представляющую эти доли в процентном выражении с точностью до трех знаков после запятой: ['12.500','25.000','50.000','12.500']<br>

**Оценка трудозатрат**: 30 мин<br>
**Фактические трудозатраты**: 1 час с написанием тестов<br>
**Файл с тестом**: task1.js<br>
**Описание**: Реализация функции представляет собой формулу поиска процента от числа. (number \* 100 ) / summ<br>
**Вычислительная сложность**: O(n)<br>

# Кэш данных об облигациях

Дана функция, которая получает из API данные о финансовых показателях облигаций за заданную дату по массиву идентификаторов облигаций (ISIN)Изменить код функции, реализовав кэш на стороне клиента.<br>

**Оценка трудозатрат**: 2 часа<br>
**Фактические трудозатраты**: 3 часа с написанем тестов<br>
**Файл с тестом**: task2.js<br>
**Дополнительное решение**: task2(v2).js<br>
**Описание**: Реализовал хранение клиентского кэша с помощью структуры хэш-мап в памяти клиента. Так как в задаче не было уточнено какие именно данные будут содержаться в результате ответа я решил что безопаснее их будет хранить именно в памяти клиента. Данные будут хранится в памяти до тех пор пока пользователь не закроет браузер или перезагрузит страницу. Если в кэше будет содержаться isin запрашиваемый клиентом, мы получим его из памяти, isins не обнаруженные в кэше будут отправлены в теле запроса к серверу и впоследствии закэшированы в памяти клиента.<br>
**Описание дополнительного решения**: На случай если данные в ответе не содержат чувствительных данных.Идентичная логика как у основного решения, только вместо памяти клиента данные будут хранится в localStorage. Это позволит хранить данные клиента после закрытия и перезагрузки браузера при каждом посещении страницы.<br>
**Вычислительная сложность**: O(n) - если данных в кэше не содержиться. O(n*m) - если данные в кэше имеются, где n - размер массива элементов в полученных из кэша, m - размер массива isins из параметра функции<br>
