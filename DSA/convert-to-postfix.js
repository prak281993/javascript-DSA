const convertToPostfix = (data) => {
    const stack = [];
    const op = "+-*^/";
    const inp = data.split("");
    let postFix = "";
    for (let val of inp) {
      if (!op.includes(val) && val !== '(' && val !== ')') {
        postFix += val;
      }
      else if (val === '(') {
        stack.push(val);
      }
      else if (val === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          postFix += stack.pop();
        }
        stack.pop();
      }
      else {
        let currentOp = priority(val);
        while (stack.length > 0
          && currentOp <= priority(stack[stack.length - 1]))
          postFix += stack.pop();
      stack.push(val);
      }
    }
    while (stack.length > 0 && stack[stack.length - 1] !== '(')
      postFix += stack.pop();
  
    return postFix;
  }
  
  function priority(op) {
    switch (op) {
      case "+": return 1;
      case "-": return 2;
      case "*": return 3;
      case "/": return 4;
      case "^": return 5;
    }
    return -1;
  }
  
  const str = "a+b-c-d+e-f*g+(h*i)";
  const postFix = 'abc-d-+efg*-+hi*+';
  console.log(convertToPostfix(str));