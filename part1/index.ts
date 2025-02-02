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


let f: any = 123;
    f = '123';
    f = true;


// 고정값
const g: true = true;
const h: 4 = 4;


function add(x: number, y: number): number {
  return x + y 
}
const result = add(1, 2); // : number

// const add2: (x: number, y: number) => number = (x, y) => x + y;

// type Add = (x: number, y: number) => number;
interface AddInterface{
  (x: number, y: number): number
}

const add2: AddInterface = (x, y) => x + y;

interface objInterface {
  lat: number;
  lon: number;
}
// const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
const obj: objInterface = { lat: 37.5, lon: 127.5 };


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
const arr5 = [ 123, 456, 'hi']; // (string | number)[]

const obj2 = { lat: 37.5, lon: 127.5 }; // { lat: number; lon: number; }


// * 타입 단언
let aa = 123;
aa = 'hi' as unknown as number;


// * never 타입과 느낌표(non-null assertion)
function never (){
  // 빈 배열 선언 시 타입을 지정하지 않으면 never[]로 추론되므로 애초에 빈 배열을 선언할 때 타입을 지정해 주자
  const array = []; // never[]  
  array.push('hi'); // array: never[] -> array: any[]


  // '#head'가 없을 경우를 고려해서 Element | null로 타입이 추론된다.
  const head = document.querySelector('#head'); // Element | null

  // `!`를 붙여서 null, undefined가 아님을 보증
  const section = document.querySelector('#section')!; // Element 

  // 근데 위와 같은 방식은 비추이므로
  // if 같은 조건문으로 해당 값이 존재함을 보장해주는 방식을 사용하자
  if(head){
    head.textContent = 'dada';
  }
}


// * 원시 래퍼 타입, 템플릿 리터럴 타입, rest, 튜플
{
  // 원시 래퍼 타입
  const a: string = 'hi';
  const b: String = 'hell'; // String은 래퍼 객체, 내장 함수 String을 뜻함 -> interface String


  // 템플릿 리터럴 타입
  type World  = 'world' | 'hell';
  
  type Greeting = `hello ${World}`; // -> type Greeting = "hello hell" | "hello world"


  // rest
  let arr: string[] = [];
  let arr2: Array<string> = [];

  function rest(a: number, ...args: string[]){
    console.log(a, args);    
  }

  rest(1, ...['1', '2', '3']);

  
  // tuple
  const tuple: [string, number] = ['1', 1];

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
    const enum EDirection {
      Up,    // 0
      Down,  // 1
      Left,  // 2
      Right, // 3
    }
  
    const a = EDirection.Up;    // 0
    const b = EDirection.Down;  // 1
    const c = EDirection.Left;  // 2
    const d = EDirection.Right; // 3
  }


  // - 순서 설정, 앞에 설정된 순서의 이후 순서값으로 자동 설정된다.
  {
    const enum EDirection {
      Up = 3 , // 3
      Down,    // 4
      Left,    // 5
      Right,   // 6
    }
  
    const a = EDirection.Up;    // 3
    const b = EDirection.Down;  // 4
    const c = EDirection.Left;  // 5
    const d = EDirection.Right; // 6
  }


  // - 순서 설정, 맘대로 불규칙하게 순서를 설정
  {
    const enum EDirection {
      Up = 3 ,    // 3
      Down = 5,   // 5
      Left = 4,   // 4
      Right = 6,  // 6
    }
  
    const a = EDirection.Up;    // 3
    const b = EDirection.Down;  // 5
    const c = EDirection.Left;  // 4
    const d = EDirection.Right; // 6
  }


  // * as const
  {
    // 1. 설정한 값이 아닌 설정한 값의 타입으로 타입이 지정된 상황
    const ODirection1 = { 
      Up: 0,
      Down: 1,
      Left: 2,
      Right: 3,
    } // -> ODirection1: { Up: number; Down: number; Left: number; Right: number; }


    // 2. `as const`를 붙여서 정확하게 해당 값으로 타입을 지정, 수정할 수 없도록 `readonly` 키워드로 고정되게 된다.
    const ODirection2 = { 
      Up: 0,
      Down: 1,
      Left: 2,
      Right: 3,
    } as const; // -> ODirection2: { readonly Up: 0; readonly Down: 1; readonly Left: 2; readonly Right: 3; }    
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

    // 1. `typeof` 키워드로 obj에서 타입을 추출 -> obj: { a: string; b: string; c: string; }
    // 2. 추출된 해당 타입에서 `keyof` 키워드로 `key`만 추출 -> type key = "a" | "b" | "c"
    type key = keyof typeof obj; // "a" | "b" | "c"
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
    } as const;

    // 1. `value`를 타입으로 추출할 해당 객체가 `as const` 키워드로 설정되어야 해당 객체의 값을 정확하게 추출한다.
    //   1.1. 해당 객체에 `as const` 키워드가 없을 경우 
    //        해당 객체의 타입은 값이 아닌 타입(ex: string)로 널널하게 추론되므로 값으로 타입이 추출되지않는다.
    // 2. 객체의 `value`들을 타입으로 추출
    type key2 = typeof obj2 [keyof typeof obj2]; // "123" | "hello" | "world"
  }
}


// * type alias(타입 정의), interface, union(|)과 intersection(&)
{
  // - type alias(타입 정의)
  type A = { a: string; }; // { a: string; }
  const a: A = { a: 'hello' };
  
  // - interface
  interface B {a: string; }; // { a: string; }
  const b: B = { a: 'hello' }; 


  // - union(|)
  function add(x: string | number, y: string | number): string | number {    
    if ([x, y].every((item)=> (typeof item) === 'number')) {
      return (+x) + (+y);
    }
    return (x+'') + (y+'');
  }

  add(1, 2);
  add('1', '2');
  add(1, '2');


  // - intersection(&)
  //   둘 다 만족
  type C = { hello: 'world' } & { zero: 'cho' }; // { hello: "world"; } & { zero: "cho"; }
  
  const c: C = {
    hello: 'world',
    zero: 'cho',
  };

  // union(|)으로도 합치기 가능 다만 의미는 다르다.
  type D = { hello: 'world' } | { zero: 'cho' }; // { hello: "world"; } | { zero: "cho"; }
  
  const d: D = {
    hello: 'world',
    zero: 'cho',
  };
  
  // A 또는 B 라는 의미가 되므로
  // 둘 중 하나의 타입만 만족해도 되게된다.
  const d2: D = {
    hello: 'world',    
  };

  // -> intersection(&): 모든 속성이 다 존재해야한다.
  // -> union(|): 여러개 중에 하나만 있어도 된다.

}


// * type alias와 인터페이스의 상속(extends)
{ 
  // - type alias의 상속(extends)
  type Animal = { breath: true }; // { breed: true; }
  type Poyouryu = Animal & {breed: true}; // -> { breath: true; breed: true; }
  type Human = Poyouryu & {think: true}; // -> { breath: true; breed: true; think: true }

  const jin: Human = { // { breath: true; breed: true; think: true }
    breath: true,
    breed: true,
    think: true,
  };


  // - interface의 상속(extends)
  interface A {
    breath: true,
  }
  
  interface B extends A { // interface A를 상속 받아서 확장    
    breed: true,
  } 
  // -> { breath: true; breed: true; }
  // interface가 같은 interface 뿐 만 아니라 type alias을 extends 하는것도 가능.
  
  const jin2: B = { // { breath: true; breed: true; }
    breath: true,
    breed: true,    
  };

  // * interface는 식별자 중복 가능, type은 불가능
  // * 식별자가 중복되면 식별자가 동일한 interface 끼리 합쳐진다. (이 특성을 기반으로 라이브러리에 선언된 interfae를 수정할 수 있다.)
  interface A {
    // talk: ()=> void;
  }
  interface A {
    // eat: ()=> void;
  }
  interface A {
    // shit: ()=> void;
  }

  
  // - interface, type alias 네이밍(옛날 방식)
  // 식별자에 다음과 같은 키워드를 붙인다.
  // interface -> I
  // type -> T
  // enum -> E
}


// * 타입을 집합으로 생각하자(좁은 타입과 넓은 타입)
{ 
  // 집합으로 생각하기
  type A = string | number; // 넓은 타입
  type B = string; // 좁은 타입
  
  type C = string & number; // never, 공집합
}


// * 객체 타입에서의 넓은 타입과 좁은 타입
{ 
  // - 객체 타입은 상세할 수록 넓은 타입이다.
  type A = { name: string };
  type B = { age: number };

  // * union(|)
  // A와 B타입의 합집합 -> 넓은 타입
  type AB = A | B;     
  
  const ab: AB = { name: 'jin' }; // ⭕️
  // const ab: AB = { age: 28 }; // ⭕️
  // const ab: AB = { name: 'jin', age: 28 }; // ⭕️

  // * intersection(&)
  // type C = { name: string, age: number };

  // A와 B타입의 교집합 -> 좁은 타입, { name: string, age: number };와 동일하다.
  type C = A & B; 

  const c: C = { name: 'jin', age: 28 }; // ⭕️
  //const c: C = { name: 'jin' }; // ❌
  // const c: C = { age: 28 }; // ❌    
  
  const ab1: AB = { name: 'jin' }; // `A | B` 타입 합집합 이므로 ⭕️
  const c1: C = { name: 'jin', age: 28}; // `A & B` 타입 교집합 이므로 ⭕️
  
  // * 좁은 타입 = 넓은 타입
  // const c2: C = ab; // `A & B` 타입 교집합 C 보다 넓은 합집합 타입 `A | B` 타입 ab는 대입 불가능 ❌
  
  // * 넓은 타입 = 좁은 타입
  const ab2: AB = c; // 합집합 `A | B`에 교집합 `A & B`를 대입하는 것이므로 가능 ⭕️      
  
  // -> 속성이 타입이 넓은지 좁은지로 따질 수 있다.
}


// * 잉여 속성 검사
{
  interface A {
    a: string;
  }

  const obj = { a: 'hi', b: 'yo' }; 

  const obj1: A = obj 
  
}


//* void의 세 가지 사용법
// - return 값이 `void` 일때
// - 매개변수에 `void`를 반환하는 함수가 들어올때
// - 객체 내부에 메서드가 `void`를 반환하도록 선언될때
{

  // void를 반환하는 함수
  function a(): void { 

  }

  // 매개변수로 선언한 void
  function b(callback: ()=> void): void{
    
  }

  // b함수 매개변수에는 void로 설정되었으나
  // 문자열을 반환하는 함수를 전달했음에도 에러가 출력되지 않는다.
  b(()=>{
    return '3';
  });

  interface Human{
    talk: () => void;
  }

  const human: Human = {
    // - 객체 내부에 void를 반환하는 메서드
    // - 반환하는 값이 없으므로 void에 해당
    talk(){ 
      // return;
      // return undefined;

      return 'adfs';
    }
  }
  
}


// * 함수에 직접적으로 대입한 void와 매개변수 콜백의 void, method의 void는 서로 다르다.
// declare function forEach(arr: number[], callback:(el: number)=> undefined): void; // ❌
// declare function forEach(arr: number[], callback:(el: number)=> number): void; // ⭕️

// - 즉, 매개변수에서 쓰이는 void는 실제 return 값이 뭐든 상관하지 않겠다는 의미인 것이다.
declare function forEach(arr: number[], callback:(el: number)=> void): void; // ⭕️

let target: number[] = [];
forEach([1, 2, 3], el => target.push(el))




// * unknown과 any(그리고 타입 대입가능표)
// 1. any타입을 쓸 바에는 unknown 타입을 쓰도록 하자
//  1.1. any타입을 설정하면 ts가 타입 자체를 검사지 않는다.

// 2. unknown 타입을 설정하면 직접 타입을 설정해줘야 한다.
//  2.2. 타입 단언(as)로 정해진 타입만 쓸 수 있도록 
