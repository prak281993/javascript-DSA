class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.queue = [];
  }

  createBinaryTree(arr, root, i) {
    if (i < arr.length) {
      root = new Node(arr[i]);

      root.left = this.createBinaryTree(arr, root.left, 2 * i + 1);
      root.right = this.createBinaryTree(arr, root.right, 2 * i + 2);
    }
    this.root = root;
    return this.root;
  }

  treeHeight(node) {
    if (node === null)
      return -1;

    let leftHeight = this.treeHeight(node.left);
    let rightHeight = this.treeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  treeSize(node) {
    if (node === null)
      return 0;

    let leftNode = this.treeSize(node.left);
    let rightNode = this.treeSize(node.right);
    return leftNode + rightNode + 1;
  }

  preorderTraversal(root) {
    if (root === null)
      return;

    console.log(root.data);
    this.preorderTraversal(root.left);
    this.preorderTraversal(root.right);
  }

  inorderTraversal(root) {
    if (root === null)
      return;

    this.inorderTraversal(root.left);
    console.log(root.data);
    this.inorderTraversal(root.right);
  }

  postorderTraversal(root) {
    if (root === null)
      return;

    this.postorderTraversal(root.left);
    this.postorderTraversal(root.right);
    console.log(root.data);
  }

  levelOrderTraversal(node) {
    this.queue.push(node);
    let levelOrder = '';
    while (this.queue.length > 0) {
      let first = this.queue.shift();
      if (+first.data !== -1) {
        levelOrder += first.data + ' ';
      }
      if (first.left !== null)
        this.queue.push(first.left);
      if (first.right !== null)
        this.queue.push(first.right);
    }
    return levelOrder;
  }

  levelOrderAverage(node) {
    this.queue.push(node);
    while (this.queue.length > 0) {
      let sum = 0, count = 0;
      let temp = [];
      while (this.queue.length > 0) {
        let first = this.queue.shift();
        if (+first.data !== -1) {
          sum += +first.data;
          count++;
        }
        if (first.left !== null) {
          temp.push(first.left);
        }
        if (first.right !== null) {
          temp.push(first.right);
        }
      }
      this.queue = temp;
      let avg = sum / count;
      console.log(avg.toFixed(2));
    }
  }

  isCheckSum(node) {
    if (node === null) {
      return true;
    }
    let left = this.subtreeSum(node.left);
    let right = this.subtreeSum(node.right);
    if ((+node.data) === left + right)
      return true;

    return false;
  }

  subtreeSum(node) {
    if (node === null) {
      return 0;
    }
    let left = this.subtreeSum(node.left);
    let right = this.subtreeSum(node.right);
    return left + right + (+node.data);
  }

  checkMirror(first, second) {
    if (first === null && second === null)
      return true;
    if (first === null || second === null)
      return false;

    return first.data === second.data
      && this.checkMirror(first.left, second.right)
      && this.checkMirror(first.right, second.left);
  }

  maximumDistinct(node, obj = {}) {
    if (node === null)
      return Object.keys(obj).length;
    if (obj[node.data]) {
      obj[node.data] = obj[node.data] + 1;
    }
    else {
      obj[node.data] = 1;
    }
    let maxPath = Math.max(this.maximumDistinct(node.left, obj), this.maximumDistinct(node.right, obj));
    if (obj[node.data]) {
      obj[node.data] = obj[node.data] - 1;
    }
    if (obj[node.data] === 0) {
      delete obj[node.data];
    }

    return maxPath;
  }

  zigzagLevelOrder(treeHeight, node) {
    const levelOrder = [];
    this.queue.push(node);
    while (this.queue.length > 0) {
      const last = this.queue.shift();
      const subTreeHeight = this.treeHeight(last);
      const currentHeight = treeHeight - subTreeHeight;
      if (levelOrder[currentHeight]) {
        levelOrder[currentHeight] = [...levelOrder[currentHeight], last.data];
      }
      else {
        levelOrder[currentHeight] = [last.data];
      }
      if (last.left !== null) {
        this.queue.push(last.left);
      }
      if (last.right !== null) {
        this.queue.push(last.right);
      }
    }
    return levelOrder.map((item, index) => {
      if (index % 2 === 0)
        return item;
      else
        return item.reverse();
    });
  }

  zigzagLevelOrderRecursive(root) {
    const queue = [];
    const levelOrder = (node, level) => {
      if (!node)
        return;
      if (queue[level]) {
        queue[level] = [...queue[level], node.data];
      }
      else {
        queue[level] = [node.data];
      }
      levelOrder(node.left, level + 1);
      levelOrder(node.right, level + 1);
    }
    levelOrder(root, 0);
    return queue.map((item, ind) => (ind % 2 === 0) ? item : item.reverse());
  }
  treeDiameter(root){
    if(root == null)
     return 0;

    let leftHeight = this.treeHeight(root.left);
    let rightHeight = this.treeHeight(root.right);

    let leftDiameter = this.treeDiameter(root.left);
    let rightDiameter = this.treeDiameter(root.right);

    return Math.max((leftHeight+rightHeight+1),Math.max(leftDiameter,rightDiameter));
  }
}

const subSum = '96 24 24 6 6 6 6 3 3 3 3 3 3 3 3'.split(' ');
const arr1 = '5 4 1 3 2 6 7'.split(' ');
const arr2 = '5 1 4 7 6 2 3'.split(' ');
const maxDistinct = '2 7 3 5 3 -1 2 -1 7 2 2 -1 -1 -1 3'.split(' ');
const arrBTree = '1 2 3 -1 -1 4 5'.split(' ');
let bt = new BinaryTree();
bt.createBinaryTree(maxDistinct, bt.root, 0);
console.log(bt.treeHeight(bt.root));
console.log(bt.treeSize(bt.root));
console.log(bt.levelOrderTraversal(bt.root));
const treeHeight = bt.treeHeight(bt.root);
console.log(bt.zigzagLevelOrder(treeHeight, bt.root));
console.log(bt.zigzagLevelOrderRecursive(bt.root));
bt.levelOrderAverage(bt.root);
console.log(bt.isCheckSum(bt.root));

let bt1 = new BinaryTree();
bt1.createBinaryTree(arr1, bt1.root, 0);
let bt2 = new BinaryTree();
bt2.createBinaryTree(arr2, bt2.root, 0);

console.log(bt.checkMirror(bt1.root, bt2.root));

let bt3 = new BinaryTree();
bt3.createBinaryTree(maxDistinct, bt3.root, 0);
console.log(bt3.maximumDistinct(bt3.root))
// bt.preorderTraversal(bt.root);
// bt.inorderTraversal(bt.root);

let bt4 = new BinaryTree();
bt4.root = new Node(0);
bt4.root.left = new Node(2);
bt4.root.right = new Node(5);
bt4.root.left.left = new Node(4);
bt4.root.left.right = new Node(7);
bt4.root.left.left.left = new Node(8);
bt4.root.left.right.left = new Node(1);
bt4.root.right.left = new Node(3);
bt4.root.right.left.left = new Node(6);

console.log(bt4.treeDiameter(bt4.root));