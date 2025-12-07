// ===== Stack Implementation =====
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length === 0) return undefined;
        return this.items.pop();
    }

    peek() {
        if (this.items.length === 0) return undefined;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

// ===== Queue Implementation =====
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.items.length === 0) return undefined;
        return this.items.shift();
    }

    front() {
        if (this.items.length === 0) return undefined;
        return this.items[0];
    }

    rear() {
        if (this.items.length === 0) return undefined;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

// ===== Linked List Node =====
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// ===== Linked List Implementation =====
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertAtHead(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    insertAtTail(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    insertAtPosition(data, position) {
        // Validate position
        if (position < 0 || position > this.size) {
            return { success: false, message: `Invalid position. Valid range: 0 to ${this.size}` };
        }

        // Insert at head
        if (position === 0) {
            this.insertAtHead(data);
            return { success: true, message: `Inserted ${data} at position 0 (head)` };
        }

        // Insert at tail
        if (position === this.size) {
            this.insertAtTail(data);
            return { success: true, message: `Inserted ${data} at position ${position} (tail)` };
        }

        // Insert at middle position
        const newNode = new Node(data);
        let current = this.head;
        for (let i = 0; i < position - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
        return { success: true, message: `Inserted ${data} at position ${position}` };
    }

    deleteHead() {
        if (this.head === null) return undefined;
        const data = this.head.data;
        this.head = this.head.next;
        this.size--;
        if (this.size === 0) {
            this.tail = null;
        }
        return data;
    }

    deleteTail() {
        if (this.head === null) return undefined;
        if (this.head === this.tail) {
            const data = this.head.data;
            this.head = null;
            this.tail = null;
            this.size--;
            return data;
        }
        let current = this.head;
        let prev = null;
        while (current.next !== null) {
            prev = current;
            current = current.next;
        }
        const data = current.data;
        prev.next = null;
        this.tail = prev;
        this.size--;
        return data;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current !== null) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }
}

// ===== Global Instances =====
const stack = new Stack();
const queue = new Queue();
const linkedList = new LinkedList();

// ===== Utility Functions =====
function showMessage(elementId, message, type = 'info') {
    const messageBox = document.getElementById(elementId);
    messageBox.textContent = message;
    messageBox.className = 'message-box ' + type;
    setTimeout(() => {
        messageBox.textContent = '';
        messageBox.className = 'message-box';
    }, 600);
}

// ===== Stack UI Functions =====
function updateStackUI() {
    const stackVisual = document.getElementById('stack-visual');
    stackVisual.innerHTML = '';
    
    for (let i = stack.size() - 1; i >= 0; i--) {
        const element = document.createElement('div');
        element.className = 'stack-element';
        element.textContent = stack.items[i];
        stackVisual.appendChild(element);
    }

    document.getElementById('stack-size').textContent = stack.size();
    document.getElementById('stack-top').textContent = stack.isEmpty() ? '—' : stack.peek();
    document.getElementById('stack-empty').textContent = stack.isEmpty() ? 'Yes' : 'No';
}

document.getElementById('stack-push').addEventListener('click', () => {
    const input = document.getElementById('stack-input');
    const value = input.value.trim();

    if (value === '') {
        showMessage('stack-message', '❌ Please enter a value', 'error');
        return;
    }

    if (stack.size() >= 10) {
        showMessage('stack-message', '⚠️ Stack Overflow! Maximum size reached', 'error');
        return;
    }

    stack.push(value);
    showMessage('stack-message', `✅ Pushed ${value} onto the stack`, 'success');
    document.getElementById('stack-operation').textContent = `Pushed: ${value}`;
    input.value = '';
    input.focus();
    updateStackUI();
});

document.getElementById('stack-pop').addEventListener('click', () => {
    if (stack.isEmpty()) {
        showMessage('stack-message', '⚠️ Stack Underflow! Stack is empty', 'error');
        return;
    }

    const popped = stack.pop();
    showMessage('stack-message', `✅ Popped ${popped} from the stack`, 'success');
    document.getElementById('stack-operation').textContent = `Popped: ${popped}`;
    updateStackUI();
});

document.getElementById('stack-peek').addEventListener('click', () => {
    if (stack.isEmpty()) {
        showMessage('stack-message', '⚠️ Stack is empty', 'error');
        return;
    }

    const top = stack.peek();
    showMessage('stack-message', `👁️ Top element: ${top}`, 'info');
    document.getElementById('stack-operation').textContent = `Peeked: ${top}`;
});

document.getElementById('stack-clear').addEventListener('click', () => {
    if (stack.isEmpty()) {
        showMessage('stack-message', '💡 Stack is already empty', 'info');
        return;
    }

    stack.clear();
    showMessage('stack-message', '✅ Stack cleared', 'success');
    document.getElementById('stack-operation').textContent = 'Cleared all elements';
    updateStackUI();
});

// ===== Queue UI Functions =====
function updateQueueUI() {
    const queueVisual = document.getElementById('queue-visual');
    queueVisual.innerHTML = '';
    
    for (let i = 0; i < queue.size(); i++) {
        const element = document.createElement('div');
        element.className = 'queue-element';
        element.textContent = queue.items[i];
        queueVisual.appendChild(element);
    }

    document.getElementById('queue-size').textContent = queue.size();
    document.getElementById('queue-front-val').textContent = queue.isEmpty() ? '—' : queue.front();
    document.getElementById('queue-rear-val').textContent = queue.isEmpty() ? '—' : queue.rear();
}

document.getElementById('queue-enqueue').addEventListener('click', () => {
    const input = document.getElementById('queue-input');
    const value = input.value.trim();

    if (value === '') {
        showMessage('queue-message', '❌ Please enter a value', 'error');
        return;
    }

    if (queue.size() >= 10) {
        showMessage('queue-message', '⚠️ Queue Overflow! Maximum size reached', 'error');
        return;
    }

    queue.enqueue(value);
    showMessage('queue-message', `✅ Enqueued ${value} to the queue`, 'success');
    document.getElementById('queue-operation').textContent = `Enqueued: ${value}`;
    input.value = '';
    input.focus();
    updateQueueUI();
});

document.getElementById('queue-dequeue').addEventListener('click', () => {
    if (queue.isEmpty()) {
        showMessage('queue-message', '⚠️ Queue Underflow! Queue is empty', 'error');
        return;
    }

    const dequeued = queue.dequeue();
    showMessage('queue-message', `✅ Dequeued ${dequeued} from the queue`, 'success');
    document.getElementById('queue-operation').textContent = `Dequeued: ${dequeued}`;
    updateQueueUI();
});

document.getElementById('queue-front').addEventListener('click', () => {
    if (queue.isEmpty()) {
        showMessage('queue-message', '⚠️ Queue is empty', 'error');
        return;
    }

    const frontElement = queue.front();
    showMessage('queue-message', `👁️ Front element: ${frontElement}`, 'info');
    document.getElementById('queue-operation').textContent = `Front: ${frontElement}`;
});

document.getElementById('queue-clear').addEventListener('click', () => {
    if (queue.isEmpty()) {
        showMessage('queue-message', '💡 Queue is already empty', 'info');
        return;
    }

    queue.clear();
    showMessage('queue-message', '✅ Queue cleared', 'success');
    document.getElementById('queue-operation').textContent = 'Cleared all elements';
    updateQueueUI();
});

// ===== Linked List UI Functions =====
function updateLinkedListUI() {
    const llVisual = document.getElementById('ll-visual');
    llVisual.innerHTML = '';
    
    const arr = linkedList.toArray();
    
    if (arr.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'Empty List';
        emptyMessage.style.color = '#999';
        emptyMessage.style.fontSize = '1.1rem';
        emptyMessage.style.fontWeight = '600';
        llVisual.appendChild(emptyMessage);
    } else {
        arr.forEach((data, index) => {
            const nodeContainer = document.createElement('div');
            nodeContainer.className = 'll-node';

            const nodeBox = document.createElement('div');
            nodeBox.className = 'll-node-box';
            nodeBox.textContent = data;
            nodeBox.title = `Position: ${index}`;

            nodeContainer.appendChild(nodeBox);

            if (index < arr.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'll-arrow';
                arrow.textContent = '→';
                nodeContainer.appendChild(arrow);
            } else {
                const arrow = document.createElement('div');
                arrow.className = 'll-arrow';
                arrow.textContent = '→';
                nodeContainer.appendChild(arrow);

                const nullBox = document.createElement('div');
                nullBox.className = 'll-null';
                nullBox.textContent = 'NULL';
                nodeContainer.appendChild(nullBox);
            }

            llVisual.appendChild(nodeContainer);
        });
    }

    document.getElementById('ll-size').textContent = linkedList.size;
    document.getElementById('ll-head').textContent = linkedList.head === null ? '—' : linkedList.head.data;
    document.getElementById('ll-tail').textContent = linkedList.tail === null ? '—' : linkedList.tail.data;
}

document.getElementById('ll-insert-head').addEventListener('click', () => {
    const input = document.getElementById('ll-input');
    const value = input.value.trim();

    if (value === '') {
        showMessage('ll-message', '❌ Please enter a value', 'error');
        return;
    }

    linkedList.insertAtHead(value);
    showMessage('ll-message', `✅ Inserted ${value} at head`, 'success');
    document.getElementById('ll-operation').textContent = `Inserted at Head: ${value}`;
    input.value = '';
    input.focus();
    updateLinkedListUI();
});

document.getElementById('ll-insert-tail').addEventListener('click', () => {
    const input = document.getElementById('ll-input');
    const value = input.value.trim();

    if (value === '') {
        showMessage('ll-message', '❌ Please enter a value', 'error');
        return;
    }

    linkedList.insertAtTail(value);
    showMessage('ll-message', `✅ Inserted ${value} at tail`, 'success');
    document.getElementById('ll-operation').textContent = `Inserted at Tail: ${value}`;
    input.value = '';
    input.focus();
    updateLinkedListUI();
});

document.getElementById('ll-insert-pos').addEventListener('click', () => {
    const input = document.getElementById('ll-input');
    const positionInput = document.getElementById('ll-position');
    const value = input.value.trim();
    const position = parseInt(positionInput.value);

    if (value === '') {
        showMessage('ll-message', '❌ Please enter a value', 'error');
        return;
    }

    if (positionInput.value === '' || isNaN(position)) {
        showMessage('ll-message', '❌ Please enter a valid position', 'error');
        return;
    }

    const result = linkedList.insertAtPosition(value, position);
    
    if (result.success) {
        showMessage('ll-message', `✅ ${result.message}`, 'success');
        document.getElementById('ll-operation').textContent = result.message;
        input.value = '';
        positionInput.value = '';
        input.focus();
    } else {
        showMessage('ll-message', `❌ ${result.message}`, 'error');
    }
    
    updateLinkedListUI();
});

document.getElementById('ll-delete-head').addEventListener('click', () => {
    if (linkedList.head === null) {
        showMessage('ll-message', '⚠️ List is empty', 'error');
        return;
    }

    const deleted = linkedList.deleteHead();
    showMessage('ll-message', `✅ Deleted ${deleted} from head`, 'success');
    document.getElementById('ll-operation').textContent = `Deleted from Head: ${deleted}`;
    updateLinkedListUI();
});

document.getElementById('ll-delete-tail').addEventListener('click', () => {
    if (linkedList.head === null) {
        showMessage('ll-message', '⚠️ List is empty', 'error');
        return;
    }

    const deleted = linkedList.deleteTail();
    showMessage('ll-message', `✅ Deleted ${deleted} from tail`, 'success');
    document.getElementById('ll-operation').textContent = `Deleted from Tail: ${deleted}`;
    updateLinkedListUI();
});

document.getElementById('ll-clear').addEventListener('click', () => {
    if (linkedList.head === null) {
        showMessage('ll-message', '💡 List is already empty', 'info');
        return;
    }

    linkedList.clear();
    showMessage('ll-message', '✅ List cleared', 'success');
    document.getElementById('ll-operation').textContent = 'Cleared all elements';
    updateLinkedListUI();
});

// ===== Navigation =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        btn.classList.add('active');
        const structure = btn.getAttribute('data-structure');
        document.getElementById(structure + '-section').classList.add('active');
    });
});

// (Removed persistence; no init logic required)

// ===== Keyboard Support =====
document.getElementById('stack-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('stack-push').click();
});

document.getElementById('queue-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('queue-enqueue').click();
});

document.getElementById('ll-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('ll-insert-tail').click();
});

document.getElementById('ll-position').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('ll-insert-pos').click();
});

// Initialize UI
updateStackUI();
updateQueueUI();
updateLinkedListUI();
