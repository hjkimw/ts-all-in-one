# 섹션1. 기본 세팅하기

[강의 레포지토리](https://github.com/ZeroCho/ts-all-in-one?tab=readme-ov-file)

<br>

## 📝 기본 지식

- 메인 룰: **TypeScript**는 최종적으로 **JavaScript**로 변환된다(TypeScript → JavaScript).
    
    순전한 TypeScript 코드를 돌릴 수 있는 것은 deno이나 대중화되지가 않았음.
    
    브라우저, 노드는 모두 js 파일을 실행한다.

<br>

- TypeScript는 언어이자 **컴파일러(tsc)** 이다.
    
    컴파일러는 ts 코드를 js로 바꿔준다.
    
    즉, TypeScript 코드가 동작할 때 중간에 변환 과정이 들어간다는 것
    
    그리고 그걸 해주는 게 tsc라는 컴파일러의 역할이다.

<br>

- tsc는 `tsconfig.json`(`tsc --init` 시 생성)에 따라 ts 코드를 js(tsc 시 생성)로 바꿔준다.
    
    인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 `tsconfig.json` 설정을 반드시 봐야한다.

<br>

- 단순히 타입 검사만 하고싶다면 `tsc --noEmit` 하면 된다.

<br>

- 개인 의견: `tsconfig.json`에서 그냥 `esModuleInterop: true`, `strict: true` 두 개만
    주로 켜놓는 편. **`strict: true`가 핵심**

<br>

- ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다.

<br>

- 에디터가 필수가 됨. VS Code나 웹스톰 반드시 필요. 메모장으로 코딩 불가능한 지경에 이름.

<br>

## 🛝 TS Playground

브라우저에서 TypeScript를 실행해 결과를 확인해볼 수 있다.

[TypeScript Playground](https://www.typescriptlang.org/play/?strictNullChecks=false&target=2#code/PTAEAEGcBcCcEsDG0ByBXANhgwgCwKaIDWkAXKAGYCGGk+AUCBNFbAOb7TkCiAygEwAGAIwBWegBNCGVvlCIA9gDsYoDArYcJASSUBVOrCVUAtvnIwEStgG569RSuig0hyKAC8oANr1QoAG9QYzNyACIAeQAjAE8wgBpQKg5yYX5QAF94v0Dg03NQMIAJfHxYKgSklNAAZnSs+gBdOwdlVXVNfB19Q08XNwA6CnglCQAKMbQASk8APhcBkLkPFbUNLV0DMqWpu0dIBQx8AY6xjo2esoHk-F2gA)

<br>

## 🛠️ 타입 스크립트 설치

1. **Node.js** 설치(미설치 시)
      
    [Node.js — Run JavaScript Everywhere](https://nodejs.org/en)

<br>

2. `package.json` 초기화  
    ```powershell
    npm init -y
    ```

<br>

3. **TypeScript** 패키지 설치  
    ```powershell
    npm i typescript
    ```  
    **→ `package.json`의 `"dependencies"`에 설치된 `"typescript"`가 명시된다.**  

<br>

## ✨ `tsconfig.json` 과 tsc

1. TypeScript 패키지 설치가 완료되었으면
    
    다음 명령어를 입력해 **tsc 초기화**
    
    ```powershell
    npx tsc --init
    ```
    
    **→ `tsconfig.json` 파일이 세팅된다.**

<br>

2. 다음 명령어를 입력해서 특정 동작을 실행 시킨다.

- **작성된 코드 type 검사 실행**

    ```powershell
    npx tsc --noEmit
    ```

- **ts파일을 js파일로 컴파일 실행**

    ```powershell
    npx tsc
    ```

- **ts파일이 수정될때마다 자동으로 컴파일 실행**

    ```powershell
    npx tsc -w
    ```

<br>

## ⚙️ `tsconfig.json` 옵션

- **tsconfig.json**

```json
{
  "compilerOptions": {
  
    /* 기본 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "incremental": true,                   /* 증분 컴파일 활성화 */ 
    "target": "es5",                          /* ECMAScript 목표 버전 설정: 'ES3'(기본), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "esnext",                       /* 생성될 모듈 코드 설정: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["dom", "dom.iterable", "esnext"], /* 컴파일 과정에 사용될 라이브러리 파일 설정 */
    "allowJs": true,                          /* JavaScript 파일 컴파일 허용 */
    "checkJs": true,                       /* .js 파일 오류 리포트 설정 */
    "jsx": "react",                        /* 생성될 JSX 코드 설정: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* '.d.ts' 파일 생성 설정 */
    "declarationMap": true,                /* 해당하는 각 '.d.ts'파일에 대한 소스 맵 생성 */
    "sourceMap": true,                     /* 소스맵 '.map' 파일 생성 설정 */
    "outFile": "./",                       /* 복수 파일을 묶어 하나의 파일로 출력 설정 */
    "outDir": "./dist",                    /* 출력될 디렉토리 설정 */
    "rootDir": "./",                       /* 입력 파일들의 루트 디렉토리 설정. --outDir 옵션을 사용해 출력 디렉토리 설정이 가능 */
    "composite": true,                     /* 프로젝트 컴파일 활성화 */
    "tsBuildInfoFile": "./",               /* 증분 컴파일 정보를 저장할 파일 지정 */
    "removeComments": true,                /* 출력 시, 주석 제거 설정 */
    "noEmit": true,                        /* 출력 방출(emit) 유무 설정 */
    "importHelpers": true,                 /* 'tslib'로부터 헬퍼를 호출할 지 설정 */
    "downlevelIteration": true,            /* 'ES5' 혹은 'ES3' 타겟 설정 시 Iterables 'for-of', 'spread', 'destructuring' 완벽 지원 설정 */
    "isolatedModules": true,               /* 각 파일을 별도 모듈로 변환 ('ts.transpileModule'과 유사) */

    /* 엄격한 유형 검사 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "strict": true,                        /* 모든 엄격한 유형 검사 옵션 활성화 */
    "noImplicitAny": true,                 /* 명시적이지 않은 'any' 유형으로 표현식 및 선언 사용 시 오류 발생 */
    "strictNullChecks": true,              /* 엄격한 null 검사 사용 */
    "strictFunctionTypes": true,           /* 엄격한 함수 유형 검사 사용 */
    "strictBindCallApply": true,           /* 엄격한 'bind', 'call', 'apply' 함수 메서드 사용 */
    "strictPropertyInitialization": true,  /* 클래스에서 속성 초기화 엄격 검사 사용 */
    "noImplicitThis": true,                /* 명시적이지 않은 'any'유형으로 'this' 표현식 사용 시 오류 발생 */
    "alwaysStrict": true,                  /* 엄격모드에서 구문 분석 후, 각 소스 파일에 "use strict" 코드를 출력 */

    /* 추가 검사 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "noUnusedLocals": true,                /* 사용되지 않은 로컬이 있을 경우, 오류로 보고 */
    "noUnusedParameters": true,            /* 사용되지 않은 매개변수가 있을 경우, 오류로 보고 */
    "noImplicitReturns": true,             /* 함수가 값을 반환하지 않을 경우, 오류로 보고 */
    "noFallthroughCasesInSwitch": true,    /* switch 문 오류 유형에 대한 오류 보고 */
    "noUncheckedIndexedAccess": true,      /* 인덱스 시그니처 결과에 'undefined' 포함 */

    /* 모듈 분석 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "moduleResolution": "node",            /* 모듈 분석 방법 설정: 'node' (Node.js) 또는 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                       /* 절대 경로 모듈이 아닌, 모듈이 기본적으로 위치한 디렉토리 설정 (예: './modules-name') */
    "paths": {},                           /* 'baseUrl'을 기준으로 상대 위치로 가져오기를 다시 매핑하는 항목 설정 */
    "rootDirs": [],                        /* 런타임 시 프로젝트 구조를 나타내는 로트 디렉토리 목록 */
    "typeRoots": [],                       /* 유형 정의를 포함할 디렉토리 목록 */
    "types": [],                           /* 컴파일 시 포함될 유형 선언 파일 입력 */
    "allowSyntheticDefaultImports": true,  /* 기본 출력(default export)이 없는 모듈로부터 기본 호출을 허용 (이 코드는 단지 유형 검사만 수행) */
    "esModuleInterop": true,               /* 모든 가져오기에 대한 네임스페이스 객체 생성을 통해 CommonJS와 ES 모듈 간의 상호 운용성을 제공. 'allowSyntheticDefaultImports' 암시 */
    "preserveSymlinks": true,              /* symlinks 실제 경로로 결정하지 않음 */
    "allowUmdGlobalAccess": true,          /* 모듈에서 UMD 글로벌에 접근 허용 */

    /* 소스맵 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "sourceRoot": "./",                    /* 디버거(debugger)가 소스 위치 대신 TypeScript 파일을 찾을 위치 설정 */
    "mapRoot": "./",                       /* 디버거가 생성된 위치 대신 맵 파일을 찾을 위치 설정 */
    "inlineSourceMap": true,               /* 하나의 인라인 소스맵을 내보내도록 설정 */
    "inlineSources": true,                 /* 하나의 파일 안에 소스와 소스 코드를 함께 내보내도록 설정. '--inlineSourceMap' 또는 '--sourceMap' 설정이 필요 */

    /* 실험적인 기능 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "experimentalDecorators": true,        /* ES7 데코레이터(decorators) 실험 기능 지원 설정 */
    "emitDecoratorMetadata": true,         /* 데코레이터를 위한 유형 메타데이터 방출 실험 기능 지원 설정 */
    
    /* 고급 옵션
     * ------------------------------------------------------------------------------------------------------------------------------------------------ */
    "skipLibCheck": true,                     /* 선언 파일 유형 검사 스킵 */
    "forceConsistentCasingInFileNames": true  /* 동일한 파일에 대한 일관되지 않은 케이스 참조를 허용하지 않음 */    
  }
}
```

<br>

---
