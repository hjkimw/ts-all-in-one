"use strict";
class C {
}
// * forEach 제네릭 분석
{
    /**
     * 콜백의 매개변수 value에 value: T 형태로 제네릭을 설정해 순회하는 요소의 타입에 따라서 타입이 선언되고 있다.
     * -> callbackFn: (value: T, index: number, array: T[])=> void
     */
    const arr1 = [1, 2, 3];
    arr1.forEach(value => { console.log(value); });
    // -> value: number
    const arr2 = ['1', '2', '3'];
    arr2.forEach(value => { console.log(value); });
    // -> value: string 
    const arr3 = ['1', 1, true];
    ['1', 1, true].forEach(value => { console.log(value); });
    // -> value: string | number | boolean
    function add(x, y) {
        return x;
    }
    // type parameter로 제네릭에 타입을 전달.
    add(1, 2);
    add('1', '2');
    add(true, false);
}
