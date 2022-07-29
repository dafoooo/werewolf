declare global {
  interface Array<T> {
    uniq(): Array<T>
  }
}

Array.prototype.uniq = function uniq() {
  return this.filter((v, i, a) => a.indexOf(v) === i)
}

export {}
