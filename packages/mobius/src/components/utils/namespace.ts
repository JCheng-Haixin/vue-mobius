import { camelCase, kebabCase, upperFirst } from 'lodash-es'

const NAMESPACE = 'mo';

type Mod = { [key: string]: boolean }

export interface Bem {
  (): string
  (mods: Mod): string
  (el: string): string
  (el: string, mods: Mod): string
}

export function createBEM(block: string): Bem {
  const normalize = (v?: string) => v ? kebabCase(v.trim()) : ''
  const _block = normalize(block)

  return (...args: any[]): string => {
    if (args.length === 0) return _block

    const el = typeof args[0] === 'string' ? normalize(args[0]) : ''
    const base = el ? `${_block}__${el}` : _block

    // 仅传入 element 参数时，直接返回 element 类名
    if (args.length === 1 && el) return base

    const mods: Mod = typeof args[0] === 'object' 
      ? args[0] 
      : typeof args[1] === 'object' 
        ? args[1] 
        : {}
    
    const list = Object.keys(mods).filter(key => mods[key]).map(key => normalize(key)).filter(key => mods[key])

    return list.map(mod => `${base}--${mod}`).join(' ')
  }
}

export function createNamespace(name: string): { name: string, bem: Bem } {
  const _name = upperFirst(camelCase(`${NAMESPACE}-${name}`))
  const bem = createBEM(_name)
  return { 
    name: _name,
    bem
  }
}