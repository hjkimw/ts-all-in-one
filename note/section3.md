# 섹션3. lib.es5.d.ts 분석

---

# 🔍 제네릭 분석하기

제네릭을 분석해보기 전에 

타입을 선언할때 사용되는 `interface`, `type ailas` 그리고 `class`에도 제네릭을 사용할 수 있으며 

다음과 같이 식별자 옆에 `<T>` 형태로 작성해 타입을 전달받는다.

전달 받는 타입 개수가 2개 이상일때는 `<T, K, .. >` 이런식으로 전달받는다.

```tsx
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
```

그리고 이 제네릭은 ts → js로 컴파일될 때 사라진다.

### 🔍 forEach 제네릭 분석

배열 메서드 `Array.prototype.forEach()` 메서드 타입을 분석해보도록 하자

`node_modules` 폴더에 있는 설치한 `typescript` 패키지의 

`lib`폴더 안에 타입들을 정의해놓은 `lib.es5.d.ts` 파일이 있다.

그 중에 내장 객체 `Array`의 메서드들의 타입을 선언한 `interface`가 있는 데 

제네릭`<T>`을 사용해 다음과 같이 정의해놓은 것을 볼 수 있다.

- node_modules / typescript / lib / lib.es5.d.ts

```tsx
// * forEach 제네릭 분석
interface Array<T>{
  forEach(callbackFn: (value: T, index: number, array: T[])=> void, thisArg?: any): void;
	// ...  
}
```

내장 객체 `Array`의 `forEach` 메서드의 정의된 타입을 확인하며

`forEach` 메서드를 직접 작성해 비교해보았다.

- index.ts

```tsx
// * forEach 제네릭 분석
interface Array<T>{
  forEach(callbackFn: (value: T, index: number, array: T[])=> void, thisArg?: any): void;
}

/
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

```

제네릭으로 타입을 전달받는 함수는 

다음과 같이 함수를 호출할 때 type parameter로 타입을 전달받을 수 있고

type paramter를 사용하지 않아도 

함수가 제네릭을 전달받는 경우 전달하는 인자의 값에 따른 타입으로 추론해 제네릭에 적용한다.

- index.ts

```tsx
...

function add<T>(x: T, y: T): T { 
  return x; 
}

// type parameter로 제네릭에 타입을 전달.
add<number>(1,2);
add<string>('1', '2');
add<boolean>(true,false);
```

### 🔍 map 제네릭 분석

- node_modules / typescript / lib / lib.es5.d.ts

```tsx
// * map 제네릭 분석
interface Array<T>{
  //...
  map<U>(callback: (value: T, index: number, array: T[])=> U, thisArg?: any): U [];
  //...
}
```

- index.ts

```tsx
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

```

### 📘 filter 제네릭 분석

- node_modules / typescript / lib / lib.es5.d.ts

```tsx
interface Array<T>{
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
}
```

- index.ts

```tsx

interface Array<T>{
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
	// -> filter<S extends number>(predicate: (value: number, index: number, array: number[]) => value is number, thisArg?: any): S[];
}

// 1. 
const filtered = [1, 2, 3].filter((value)=> value % 2); // number[]
```

- index.ts

```tsx
interface Array<T>{
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
  // -> filter<S extends string | number>(predicate: (value: string | number, index: number, array: string | number[]) => value is string | number, thisArg?: any): S[];    
}

const predicate = (value: string | number )=> typeof value === 'string';
const filtered = ['1', 2, '3', 4, '5'].filter(predicate); // string[]
```

### 📘 forEach 타입 직접 만들기

- index.ts

```tsx
// * forEach 타입 직접 만들기
interface Arr<T>{        
  forEach(callbackFn:(value:T, index: number, thisArgs?: any)=> void): void;
}

// const a: Arr<number> = [1, 2, 3];
// const a: Arr<string> = ['1', '2', '3'];
const a: Arr<string | number> = ['1', '2', 3, 4];

const forEached = [1, 2, 3].forEach(item => console.log(item));
```

### 📘 map 타입 직접 만들기

- index.ts

```tsx
// * map 타입 직접 만들기
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
```

### 📘 filter 타입 직접 만들기

- index.ts

```tsx
// * filter 타입 직접 만들기
interface Arr<T>{
  filter<S extends T>(callbackFn: (value: T, index: number)=>  value is S): S[];
}

const a: Arr<number> = [1,2,3];

const b = a.filter((v): v is number => v % 2 === 0); // [2], number[]

const c: Arr<number | string> = [1, '2', 3, '4'];
const d = c.filter( (v): v is string => typeof v === 'string'); // ['2', '4'], string[]
const e = c.filter((v): v is number => typeof v === 'number'); // [1, 3, 5], number[]  
```

### 📘 공변성과 반공변성

- index.ts

```tsx
// * 공변성과 반공변성
function a(x: string): number {
  return +a;
}

type B = (x: string)=> number | string;

const b: B = a; // ⭕️, <- 리턴값은 더 넓은 타입으로 대입할 수 있다.
// 합집합 number | string 이 number 보다 더 넓으므로 number | string 리턴값에 number를 대입 가능

function a1(x: string): number | string { // (x: string)=> number 또는 (x: string)=> string
  return +a;
}

type B1 = (x: string)=> number;  
// const b1: B1 = a1; // ❌, 대입하려는 B1 리턴값 타입이 a1 리턴값 타입 보다 더 좁으므로 대입 불가

// * 함수의 리턴값 타입의 경우
// -> 좁은 타입에서 넓은 타입 또는 동일한 타입으로 대입이 가능
// -> 넓은 타입에서 좁은 타입으로는 대입이 불가능하다.

// * 함수의 매개변수의 경우
// -> 넓은 타입에서 좁은 타입 또는 동일한 타입으로 대입이 가능
// -> 좁은 타입에서 넓은 타입으로는 대입이 불가능하다. 매개변수는 리턴값이랑 반대다.

// -> 결과적으로 리턴값 타입, 매개변수 타입도 만족해야 대입할 수 있게 된다.
```

### 📘 하나에는 걸리겠지(오버로딩)

- index.ts

```tsx
// * 하나에는 걸리겠지(오버로딩)
// -> function, interface, class 에서 오버로딩 가능

function s(x: number, y: number): number;
function s(x: string | number, y: string | number): string | number;
function s(x: any, y: any): any{}

interface Add{
  (x: number, y: number): number;
  (x: string, y: string): string;
}

const add: Add = (x: any, y: any) => x + y;

class A{
  add(x: number, y: number): number;
  add(x: string, y: string): string;
  add(x: any, y: any){
    return x + y;
  }
}

const c = new A().add(1, 2); // number
const c1 = new A().add('1', '2'); // string
```