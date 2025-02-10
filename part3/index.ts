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
