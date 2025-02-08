
// * 제네릭
interface A<T>{
  // ...
}

type B<T> = {
  // ...
};

class C<T>{
  // ...    
}


// * forEach 메서드 타입 제네릭 분석
{
  interface Array<T>{
    forEach(callbackFn: (value: T, index: number, array: T[])=> void, thisArg?: any): void;    
  }
  
  /**
   * 콜백의 매개변수 value에 value: T 형태로 제네릭을 설정해 순회하는 요소의 타입에 따라서 타입이 선언되고 있다.
   * -> callbackFn: (value: T, index: number, array: T[])=> void
   */

  const arr1: Array<number> = [1, 2, 3]; 
  arr1.forEach( value =>{ console.log(value)}); 
  // -> value: number
  
  const arr2: Array<string> = ['1', '2', '3']; 
  arr2.forEach( value =>{ console.log(value)});
  // -> value: string 
  
  const arr3: Array<string | number | boolean> = ['1', 1, true]; 
  ['1', 1, true].forEach( value =>{ console.log(value)}); 
  // -> value: string | number | boolean


  function add<T>(x: T, y: T): T { 
    return x; 
  }

  // type parameter로 제네릭에 타입을 전달.
  add<number>(1,2);
  add<string>('1', '2');
  add<boolean>(true,false);
}


// * map 메서드 타입 제네릭 분석
{

  interface Array<T>{
    //...
    map<U>(callback: (value: T, index: number, array: T[])=> U, thisArg?: any): U [];
    //...
  }

  

  // 1. interface Array<T>의 제네릭 <T>가 number타입이 된다. 
  //  1.1. <T> -> number
  // 2. interface Array<T>의 map<U> 속성 제네릭 <U>가 string 타입이 된다. 
  //  2.2. <U> -> string
  const strings = [1, 2, 3].map(item => item.toString()); // string[]
  
}


// * filter 제네릭 분석
{
  interface Array<T>{
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    // -> filter<S extends number>(predicate: (value: number, index: number, array: number[]) => value is number, thisArg?: any): S[];
    // -> filter<S extends string | number>(predicate: (value: string | number, index: number, array: string | number[]) => value is string | number, thisArg?: any): S[];    
  }
  // const filtered = [1, 2, 3].filter((value)=> value % 2); // number[]  

  const predicate = (value: string | number )=> typeof value === 'string';
  const filtered = ['1', 2, '3', 4, '5'].filter(predicate); // string | number[]
  // const filtered = ['1', 2, '3', 4, '5'].filter<string | number>(predicate); // string[]

}


// * forEach 타입 직접 만들기
{  

  interface Arr<T>{        
    forEach(callbackFn:(value:T, index: number, thisArgs?: any)=> void): void;
  }

  // const a: Arr<number> = [1, 2, 3];
  // const a: Arr<string> = ['1', '2', '3'];
  const a: Arr<string | number> = ['1', '2', 3, 4];

  const forEached = [1, 2, 3].forEach(item => console.log(item));

}


// * map 타입 직접 만들기
{

  interface Arr<T>{
    // map(callbackFn:(value:T, index: number)=> T): T[];
    map<U>(callbackFn:(value:T, index: number)=> U): U[];
  }

  const a: Arr<number> = [1, 2, 3];
  const b = a.map(v => v + 1);

  // const c = a.map<string>(v=> v.toString()); // string[]
  const c = a.map(v=> v.toString()); // string[]

  const d = a.map(v=> v % 2 === 0); // boolean[]


  const e: Arr<string> = ['1', '2', '3'];
  const f = e.map(v=> +v); // number[]

  

}


// * filter 타입 직접 만들기
{

  interface Arr<T>{
    filter<S extends T>(callbackFn: (value: T, index: number)=>  value is S): S[];
  }

  const a: Arr<number> = [1,2,3];

  const b = a.filter((v): v is number => v % 2 === 0); // [2], number[]

  const c: Arr<number | string> = [1, '2', 3, '4'];
  const d = c.filter( (v): v is string => typeof v === 'string'); // ['2', '4'], string[]
  const e = c.filter((v): v is number => typeof v === 'number'); // [1, 3, 5], number[]  

}