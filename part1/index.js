"use strict";
// const a: string = '5';
// const b: number = 5;
// const c: boolean = false;
// const d: undefined = undefined;
// const e: null = null;
// * 타입 추론
const a = '5';
const b = 5;
const c = false;
const d = undefined;
const e = null;
let f = 123;
f = '123';
f = true;
// 고정값
const g = true;
const h = 4;
function add(x, y) {
    return x + y;
}
const result = add(1, 2); // : number
const add2 = (x, y) => x + y;
// const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
const obj = { lat: 37.5, lon: 127.5 };
// const arr1: string[] = ['123', '456'];
// const arr2: Array<string> = ['123', '456'];
// const arr3: number[] = [1, 2, 3];
// const arr4: Array<number> = [1, 2, 3];
// 튜플
// const arr5: [number, number, string] = [ 123, 456, 'hi'];
// * 타입 추론
const arr2 = ['123', '456']; // string[]
const arr4 = [1, 2, 3]; // number[]
// * 튜플
const arr5 = [123, 456, 'hi']; // (string | number)[]
const obj2 = { lat: 37.5, lon: 127.5 }; // { lat: number; lon: number; }
// * 타입 단언
let aa = 123;
aa = 'hi';
// * never 타입과 느낌표(non-null assertion)
{
    // 빈 배열 선언 시 타입을 지정하지 않으면 never[]로 추론되므로 애초에 빈 배열을 선언할 때 타입을 지정해 주자
    const array = []; // never[]  
    array.push('hi'); // array: never[] -> array: any[]
    // '#head'가 없을 경우를 고려해서 Element | null로 타입이 추론된다.
    const head = document.querySelector('#head'); // Element | null
    // `!`를 붙여서 null, undefined가 아님을 보증
    const section = document.querySelector('#section'); // Element 
    // 근데 위와 같은 방식은 비추이므로
    // if 같은 조건문으로 해당 값이 존재함을 보장해주는 방식을 사용하자
    if (head) {
        head.textContent = 'dada';
    }
}
// * 원시 래퍼 타입, 템플릿 리터럴 타입, rest, 튜플
{
    // 원시 래퍼 타입
    const a = 'hi';
    const b = 'hell'; // String은 래퍼 객체, 내장 함수 String을 뜻함 -> interface String
    // rest
    let arr = [];
    let arr2 = [];
    function rest(a, ...args) {
        console.log(a, args);
    }
    rest(1, ...['1', '2', '3']);
    // tuple
    const tuple = ['1', 1];
    // tuple[2]  = 'hello'; // ❌
    tuple.push('hello');
}
// * enum, keyof, typeof
{
    // * enum
    // -> enum은 js로 컴파일될떄 숫자로 치환된다.
    // -> 숫자, 문자열 타입 값을 설정할 수 있다.
    // -> 보통 변수들을 하나의 그룹으로 묶고 싶을 때 사용한다.
    // - 기본값
    {
        const a = 0 /* EDirection.Up */; // 0
        const b = 1 /* EDirection.Down */; // 1
        const c = 2 /* EDirection.Left */; // 2
        const d = 3 /* EDirection.Right */; // 3
    }
    // - 순서 설정, 앞에 설정된 순서의 이후 순서값으로 자동 설정된다.
    {
        const a = 3 /* EDirection.Up */; // 3
        const b = 4 /* EDirection.Down */; // 4
        const c = 5 /* EDirection.Left */; // 5
        const d = 6 /* EDirection.Right */; // 6
    }
    // - 순서 설정, 맘대로 불규칙하게 순서를 설정
    {
        const a = 3 /* EDirection.Up */; // 3
        const b = 5 /* EDirection.Down */; // 5
        const c = 4 /* EDirection.Left */; // 4
        const d = 6 /* EDirection.Right */; // 6
    }
    // * as const
    {
        // 1. 설정한 값이 아닌 설정한 값의 타입으로 타입이 지정된 상황
        const ODirection1 = {
            Up: 0,
            Down: 1,
            Left: 2,
            Right: 3,
        }; // -> ODirection1: { Up: number; Down: number; Left: number; Right: number; }
        // 2. `as const`를 붙여서 정확하게 해당 값으로 타입을 지정, 수정할 수 없도록 `readonly` 키워드로 고정되게 된다.
        const ODirection2 = {
            Up: 0,
            Down: 1,
            Left: 2,
            Right: 3,
        }; // -> ODirection2: { readonly Up: 0; readonly Down: 1; readonly Left: 2; readonly Right: 3; }    
    }
    // -> readonly 키워드 또한 TypeScript이므로 JavaScript로 컴파일될때 사라진다.
    // * keyof
    {
        // - 객체의 `key`들을 타입으로 추출
        const obj = {
            a: '123',
            b: 'hello',
            c: 'world',
        };
        /*
          - obj 객체는 JavaScript 값이므로 타입으로 쓸 수 없기 때문에
            typeof 키워드로 타입으로 추출하고
            추출한 해당 타입에 `keyof` 키워드로 `key`만 추출한 것이다.
        */
        // - 객체의 `value`들을 타입으로 추출
        const obj2 = {
            a: '123',
            b: 'hello',
            c: 'world',
        };
    }
}
