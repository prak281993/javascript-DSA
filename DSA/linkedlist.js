class Node {
    constructor(d) {
      this.data = d;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null
    }
    insertNode(data) {
      let node = new Node(data);
      if (this.head == null) {
        this.head = node;
        this.tail = node;
      }
      else {
        while (this.tail.next != null)
          this.tail = this.tail.next;
          this.tail.next = node;
      }
    }
  
    insertBetween(data) {
      let node = new Node(data);
      let start = this.head;
      if (this.head == null || this.head.data >= data) { 
              node.next = this.head; 
              this.head = node; 
          }
       else{
        while (start.next !== null && start.next.data < data) {
          start = start.next;
        }
        node.next = start.next;
        start.next = node;
       }
    }
  
    reverseList(){
      let current = this.head;
      let prev = null;
      let next = null;
  
      while(current !== null){
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
      }
      this.head = prev;
    }
  
    reverseListInGroup(head,k){
      let current = head;
      let prev = null;
      let next = null;
      let count = 1;
      while(count <= k && current !== null){
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        count++;
      }
      if(next != null)
      head.next = this.reverseListInGroup(next,k);
  
      return prev;
    }
  
    displayList() {
      let start = this.head;
      let str = '';
      while (start.next != null) {
        str += start.data + " ";
        start = start.next;
      }
      str += start.data;
      console.log(str);
    }
  }
  
  const arr = [1,2,3,4];
  
  let list = new LinkedList();
  for(let i =0; i<arr.length; i++)
  list.insertNode(arr[i]);
  
  list.head = list.reverseListInGroup(list.head,2);
  list.displayList();