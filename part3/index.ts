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