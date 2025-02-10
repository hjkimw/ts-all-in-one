// * Partial 타입 분석
// -> 객체의 모든 속성들의 타입을 옵셔널로 변환
{
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

}


// * Pick 타입 분석
// -> 객체의 여러 속성중에서 특정 속성 타입만 추출
{

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

}


{
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
  
  
  // * Extract 타입 분석
  // -> type Extract<T, U> = T extends U ? T : never;
  // -> Extract<T, U>는 T에서 U에 해당하는 타입만을 추출하여 반환한다. (Exclude의 반대 개념)
  // -> 즉, T에서 U에 포함되지 않은 타입은 제거되고, U에 해당하는 타입만 남는다.
  
  // Profile의 key 중 'married'만 추출하여 반환 ('married' 타입만 남음)
  type X = Extract<keyof Profile, 'married'>; // 결과: 'married'
  
  // Animal 유니온 타입에서 'Cat' | 'Dog' 만 추출 (대소문자 주의)
  type X2 = Extract<Animal, 'cat' | 'Dog'>; // 결과: 'Dog'
  // 'cat'은 대소문자가 다르므로 'Animal' 유니온 타입에 존재하지 않음 -> 제외됨

}    