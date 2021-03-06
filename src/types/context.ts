import { TypeChecker, Program } from 'typescript';
import { TypeModel } from './model';

export interface DeclVisitorContext {
  modules: Record<string, TypeRefs>;
  checker: TypeChecker;
  program: Program;
  refs: TypeRefs;
  ids: Array<number>;
  usedImports: Array<string>;
  availableImports: Array<string>;
  warn(message: string): void;
  error(message: string): void;
}

export type TypeRefs = Record<string, TypeModel>;
