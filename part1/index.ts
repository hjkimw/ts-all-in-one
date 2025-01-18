const a: string = '5';
const b: number = 5;
const c: boolean = false;
const d: undefined = undefined;
const e: null = null;

let f: any = 123;
    f = '123';
    f = true;


// 고정값
const g: true = true;
const h: 4 = 4;


function add(x: number, y: number): number {
  return x + y 
}

// const add2: (x: number, y: number) => number = (x, y) => x + y;

// type Add = (x: number, y: number) => number;
interface AddInterface{
  (x: number, y: number): number
}

const add2: AddInterface = (x, y) => x + y;

interface objInterface {
  lat: number,
  lon: number,
}
// const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
const obj: objInterface = { lat: 37.5, lon: 127.5 };

const arr1: string[] = ['123', '456'];
const arr2: Array<string> = ['123', '456'];

const arr3: number[] = [1, 2, 3];
const arr4: Array<number> = [1, 2, 3];

// 튜플
const arr5: [number, number, string] = [ 123, 456, 'hi'];

