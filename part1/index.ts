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
{
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