//Объявление переменной, первый аргумент - вызов функции
let a = _.map(getItems(), fn);
//Присваивание значения переменной, второй аргумент - стрелочная функция
a = _.map(collection, item => item);
//Присваивание значения переменной, первый аргумент - литерал массива
a = _.map([1,2,3], fn);
//Присваивание значения переменной, первый аргумент - литерал объекта
a =_.map({a: 1, b: 2}, fn);
//Возврат значения функции через return
function q () {
	let w = "w";
	return _.map(collection, fn);
}
//Условный оператор
if (_.map(collection, fn)) {
	a = 0;
}
//Оператор цикла for + вызов свойства массива
for (let i = 0; i<= _.map(getItems(), fn).length; i++) {
	a++;
}
//Тернарный оператор
a = (Array.isArray(collection)) ? collection.map(fn) : _.map(collection, fn);