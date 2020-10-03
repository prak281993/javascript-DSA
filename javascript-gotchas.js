function fn() {
    this.h = 10;
    function b() {
      console.log(this);
    }
    b();
    console.log(this);
  }
  const obj = {
    prop: 1
  }
  const tobeCalled = fn.bind(obj);
  tobeCalled();
  
  {
    var blockScope = 10;
    let realblockScope = 20;
  }
  console.log(blockScope);
  
  for (var i = 0; i < 5; i++) {
  
  }
  console.log(i);
  
  for (let i = 0; i < 10; i++) {
  
  }
  console.log(i);
  
  const human = {
    first: 10
  }
  
  const animal = {
    __proto__: human,
    second: 20
  }
  
  console.log(animal.first + " " + animal.second);
  console.log(animal.hasOwnProperty('second'))
  console.log(human.isPrototypeOf(animal))
  
  function parent() {
    this.a = 10;
    return this;
  }
  
  function child() {
    parent.call(this);
    this.b = 20;
    return this;
  }
  const p = new parent();
  child.prototype.constructor = parent;
  
  const c = new child();
  console.log(c);
  
  const parentObj = {
    a:30
  }
  
  const childObj = {
    b:40
  }
  
  Object.setPrototypeOf(parentObj,childObj);
  console.log(childObj);
  
  const noProto = {
    first:1,
    __proto__:null
  }
  Object.freeze(noProto)
  noProto.second=2;
  console.log(noProto);
  // console.log(noProto.hasOwnProperty('first')) // will give false since __proto__ is null
  
  
  // we can make a property accessible to all the objects by adding that property to __proto__ of any object,
  // as the same __proto__ is shared by all objects
  // this is called prototype pollution
  const emptyFirst = {};
  const emptySecond = {};
  emptyFirst.__proto__.first = 1;
  console.log(emptyFirst.first);
  console.log(emptySecond.first);
  console.log(childObj.first)
  
  childObj.__proto__.globalProp = 100;
  console.log(emptySecond.globalProp);
  console.log(animal.globalProp);
  
  // functions also have access to __proto__
  function checkProto(){
    return 1;
  }
  checkProto.__proto__.newProp='New Property';
  console.log(checkProto.newProp);
  
  // modifying JSON.stringify using toJSON property in an object
  const person = {
    _id: 1,
    name: 'Arya',
    toJSON() {
      return {
        id: this._id,
        _name: this.name
      }
    }
  }
  
  const str = JSON.stringify(person);
  console.log(str);
  
  
  