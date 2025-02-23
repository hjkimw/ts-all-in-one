# 섹션4. Utility Types

---

## 📘 Partial 타입 분석

객체의 모든 속성들의 타입을 옵셔널로 변환

- index.ts

```tsx
// * Partial 타입 분석
// -> 객체의 모든 속성들의 타입을 옵셔널로 변환
interface Profile{
  name: string;
  age: number;
  marreid: boolean;
}

const jin: Profile = {
  name: 'jin',
  age: 28,
  marreid: false,
};

const newJin: Partial<Profile> ={
  name: 'newJin',
  age: 24,
};

// * partial 타입 : 옵셔널로 설정
// interface Profile{
//   name?: string;
//   age?: number;
//   marreid?: boolean;
// }

type P<T> = {
  // [key: string ]: string; // -> 인덱스 시그니처
  // [key in keyof T]: string; // -> 맵드 타입
}

// type Name = 'Human' | 'Animal';
// type Pp<T> ={
//   [key in keyof Name]: string; 
// }

type newPartial<T> = {
  [key in keyof T]?: T[key];
}

const jin2: newPartial<Profile> = {
  name: 'jin',
  age: 28,
  marreid: false,
};
```

## 📘 Pick 타입 분석

- index.ts

```tsx
// * Pick 타입 분석
// -> 객체의 여러 속성중에서 특정 속성 타입만 추출
interface Profile{
  name: string;
  age: number;
  married: false;
}

// 1. 제네릭 T, S 두 개를 전달받고, S는 전달받은 T의 key로 제한한다.
//  1.1. 제네릭 T는 속성을 추출할 대상 객체 타입이고, S는 추출할 속성 이름을 Union(|) 타입으로 전달받는다.
// 2. S의 각 key에 대해 T에서 해당 key의 값을 가져와 새로운 객체를 생성한다.
type newPick<T, S extends keyof T> = {
  [key in S]: T[key];
};

const newJin: newPick<Profile, 'name' | 'age'> = {
  name: 'jin',
  age: 24,
};
```

## 📘 Exclude, Omit, Extract 타입 분석

### ◻️ Exclude 타입 분석

- index.ts

```tsx
interface Profile {
  name: string;
  age: number;
  married: boolean;
};

// * Exclude 타입 분석
// -> type Exclude<T, U> = T extends U ? never : T;
// -> Exclude<T, U>는 T에서 U에 해당하는 타입을 제외한 나머지 타입을 반환한다.

// Profile의 key인 'name'을 제외한 'age' | 'married' 타입을 얻는다.
type A = Exclude<keyof Profile, 'name'>; // 결과: 'age' | 'married'

type Animal = 'Cat' | 'Dog' | 'Human';

// Animal 유니온 타입에서 'Human'을 제외한 'Cat' | 'Dog' 타입을 얻는다.
type B = Exclude<Animal, 'Human'>; // 결과: 'Cat' | 'Dog'
```

### ◻️ Omit 타입 분석

- index.ts

```tsx
...

// * Omit 타입 분석
// -> type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// -> Omit<T, K>는 객체 타입 T에서 K에 해당하는 key를 제외한 새로운 객체 타입을 생성한다.
// -> Pick<T, Exclude<keyof T, K>> 조합을 사용하여 Omit을 구현할 수 있다.

type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;

// Profile에서 'married' 속성을 제외한 새로운 타입을 생성
const newJin: O<Profile, 'married'> = {
  name: 'jin',
  age: 28,
  // married 속성은 제외되었기 때문에 포함할 수 없음
};
```

### ◻️ Extract 타입 분석

- index.ts

```tsx
...

// * Extract 타입 분석
// -> type Extract<T, U> = T extends U ? T : never;
// -> Extract<T, U>는 T에서 U에 해당하는 타입만을 추출하여 반환한다. (Exclude의 반대 개념)
// -> 즉, T에서 U에 포함되지 않은 타입은 제거되고, U에 해당하는 타입만 남는다.

// Profile의 key 중 'married'만 추출하여 반환 ('married' 타입만 남음)
type X = Extract<keyof Profile, 'married'>; // 결과: 'married'

// Animal 유니온 타입에서 'Cat' | 'Dog' 만 추출 (대소문자 주의)
type X2 = Extract<Animal, 'cat' | 'Dog'>; // 결과: 'Dog'
// 'cat'은 대소문자가 다르므로 'Animal' 유니온 타입에 존재하지 않음 -> 제외됨
```

## 📘 Required, Record, NonNullable 타입 분석

- index.ts

```tsx
// * Required, Record, NonNullable 타입 분석
interface Profile{
  name?: string;
  age?: number;
  marreid?: boolean;
}

type Name = Profile['name']; // string | undefined

type R<T> = {
  // [ Key in keyof T]? : T[Key]; // ?, 해당 타입에 옵셔널을 추가 
  // [ Key in keyof T]-? : T[Key]; // -?, 해당 타입 옵셔널을 제거    
}

// * readonly 추가 및 제거
interface Profile2{
  readonly name?: string;
  readonly age?: number;
  readonly  marreid?: boolean;
}

type Rm<T> = {
  // 앞에 -readOnly를 추가해 속성들의 readonly를 제거
  // -?를 추가해 속성들의 옵셔널을 제거
  -readonly [key in keyof T] -? : T[key];
}

const jin: Rm<Profile2> = {
  name: 'jin',
  age: 28,
  marreid: false,
};

// * Record  

// interface Obj {
//   [key: string]: number;
// }

const a: Record<string, number> = {
  a: 3,
  b: 5, 
  c: 7,
}

type Rc<T extends keyof any, S> = {
  [key in T] : S;
}

// * NonNullable
// -> 제네릭으로 전달한 타입에서 null, undefined 타입을 제거

type A = string | null | undefined | boolean | number;

type B = NonNullable<A> // string | boolean | number

// null | undefined 면 never로 제외시키고 아닐경우 T로
type N<T> = T extends null | undefined ? never : T; 
```

## 📘 infer 타입 분석

```tsx
// * Parameters, infer 타입 분석

// * Parameters
interface Zip { 
  (x: number, y: string, z: boolean): {x: number, y: string, z: boolean}; 
}

const zip: Zip = (x: number, y: string, z: boolean) =>{
  return {x, y, z};
} 

// type Params = Parameters<typeof zip>; // [x: number, y: string, z: boolean]

// * infer
// 1. 제네릭을 함수로 제한
// -> infer는 extends에서만 사용이 가능
type P<T extends (...args: any)=> any> = T extends (...args: infer A)=> any ? A: never;
type R<T extends (...args: any)=> any> = T extends (...args: any )=> infer A ? A : never;

type Params = P<typeof zip>;
type Ret = ReturnType<typeof zip>;
type First = Params[0];

class A {    
  protected a: string;
  protected b: number;
  protected c: boolean;
  
  constructor(
    a: string,
    b: number,
    c: boolean,
  ){
    this.a = a;
    this.b = b;
    this.c = c;
  }        
}

const a = new A('123', 456, true);

// 생성자의 타입 가져오기
type C = ConstructorParameters<typeof A>; // [a: string, b: number, c: boolean]

// 인스턴스의 타입 가져오기
type I = InstanceType<typeof A>; 

```

## 📘 완전 복잡한 타입 분석하기(Promise와 Awaited 편)

```tsx
const p1 = Promise.resolve(1).then( a=> a + 1).then(a=> a+1).then(a => a.toString());

// Promise<number>
const p2 = Promise.resolve(2);

// Promise<unknown>
const p3 = new Promise((res, rej)=> setTimeout(()=> res, 1000));

// { '0': string , '1': number, '2': unknown, length: 3 }
Promise.all([p1, p2, p3]).then(result => console.log(result)); // [ '3', 2, undefined ]  

// T = [string, number, unknown] 
// keyof T -> '0' | '1' | '2' | 'length'

const arr = [1, 2, 3] as const;
type Arr = keyof typeof arr; // keyof readonly [1, 2, 3]

```

## 📘 완전 복잡한 타입 분석하기(bind 편)

```
// 완전 복잡한 타입 분석하기(bind 편)

function a(this: Window | typeof obj){
  console.log(this.name);    
}

const obj = {name: 'jin'};

const b = a.bind(obj);
b(); // 'jin'

/
 * 함수 유형의 'this'매개 변수의 유형을 추출하거나 함수 유형에 'this'매개 변수가없는 경우 'unknown'.
 */
// type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;
type T = ThisParameterType<typeof a>;
```

## 📘 완전 복잡한 타입 분석하기(flat 편)

```tsx
// * 완전 복잡한 타입 분석하기(flat 편)

interface Array<T> {
  /
   * 배열의 각각한 요소에 정의된 콜백 함수를 호출합니다. 그런 다음 결과를 새 배열로 평평하게 만듭니다.
   * 이는 깊이 1의 맵 뒤에 평평한 것과 동일합니다.
   *
   * @param callback 최대 세 개의 인수를 허용하는 함수입니다. flatMap 메서드는
   * 배열의 각각한 요소에 대해 콜백 함수를 한 번씩 호출합니다.
   * @param thisArg 콜백 함수에서 this 키워드가 참조할 수 있는 객체입니다. 만약
   * thisArg가 생략되면, this 값으로 undefined가 사용됩니다.
   */
  flatMap<U, This = undefined>(
      callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
      thisArg?: This,
  ): U[];

  /
   * 지정된 깊이까지 모든 하위 배열 요소를 재귀적으로 연결하여 새로운 배열을 반환합니다.
   *
   * @param depth 최대 재귀 깊이
   */
  flat<A, D extends number = 1>(
      this: A,
      depth?: D,
  ): FlatArray<A, D>[];

```

---