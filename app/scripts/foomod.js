
class Foo {
  constructor() {
    this.val = 0;
    alert('inited');
  }

  get count() {
    return this.val;
  }
}

exports.Foo = Foo;
