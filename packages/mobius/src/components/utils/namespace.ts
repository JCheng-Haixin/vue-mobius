const NAMESPACE = 'mo';

export function createBEM(block: string) {
  return () => {

  }
}

export function createNamespace(name: string): { name: string } {
  return { 
    name: `${NAMESPACE}-${name}` 
  }
}