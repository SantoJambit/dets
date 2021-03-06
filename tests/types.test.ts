import { runTestFor } from './helper';

test('should be able to handle a simple mapped type', () => {
  const result = runTestFor('type1.ts');
  expect(result).toBe(`declare module "test" {
  export type Foo = {
    [index: string]: string;
  };
}`);
});

test('should handle mapping of keyof with selection', () => {
  const result = runTestFor('type2.ts');
  expect(result).toBe(`declare module "test" {
  export type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T];
}`);
});

test('should handle inference of arguments in conditionals', () => {
  const result = runTestFor('type3.ts');
  expect(result).toBe(`declare module "test" {
  export type RemainingArgs<T> = T extends {
    (_: any, ...args: infer U): any;
  } ? U : never;
}`);
});

test('should correctly display conditionals of generics', () => {
  const result = runTestFor('type4.ts');
  expect(result).toBe(`declare module "test" {
  export type Diff<T, U> = T extends U ? never : T;
}`);
});

test('should replicate the type name type alias', () => {
  const result = runTestFor('type5.ts');
  expect(result).toBe(`declare module "test" {
  export type TypeName<T> = T extends string ? "string" : T extends number ? "number" : T extends boolean ? "boolean" : T extends undefined ? "undefined" : T extends Function ? "function" : "object";
}`);
});

test('should not expand a keyof operator usage', () => {
  const result = runTestFor('type6.ts');
  expect(result).toBe(`declare module "test" {
  export interface CustomMerged {
    C: string;
    D: string;
  }

  export interface Merged extends CustomMerged {
    A: string;
    B: string;
  }

  export type MergedKeys = keyof Merged;

  export const mergedParams: {
    (key: MergedKeys): boolean;
  };
}`);
});

test('should export literal types', () => {
  const result = runTestFor('type7.ts');
  expect(result).toBe(`declare module "test" {
  export type Fail1 = string;

  export type Fail2 = "hello" | "world";
}`);
});
