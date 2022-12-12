console.log('Record 1');

setTimeout(() => {
    console.log('Record 2');
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3');
            Promise.resolve().then(() => {
                console.log('Record 4');
            });
        });
    });
});

console.log('Record 5');

Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

/*
Вывод: 1 5 6 2 3 4
Сначала выполняться выводы, которые "лежат на поверхности" в порядке их слдования по коду.
Затем идет промис на 17 строке.
После выполниться функция setTimeout,и "лесенкой" выполняться все промисы.
*/