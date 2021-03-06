import { getRefName } from '../helpers';
import { DeclVisitorContext } from '../types';

export function createBinding(context: DeclVisitorContext, lib: string, name: string) {
  // if we did not use the given lib yet, add it to the used libs
  if (!context.usedImports.includes(lib)) {
    context.usedImports.push(lib);
  }

  return `${getRefName(lib)}.${name}`;
}

export function swapName(context: DeclVisitorContext, newName: string, oldName: string) {
  if (oldName !== newName) {
    const isdef = oldName === 'default';

    if (isdef) {
      oldName = '_default';
    }

    context.refs[newName] = context.refs[oldName];
    delete context.refs[oldName];

    if (isdef) {
      delete context.refs.default;
    }
  }
}
