type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item, next: this.head, prev: undefined } as Node<T>;

        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error('Index out of bounds');
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        let curr: Node<T> | undefined = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        const node = {
            value: item,
            next: curr,
            prev: curr?.prev
        } as Node<T>;

        if (curr?.prev) {
            curr.prev.next = node;
        }

        if (curr) {
            curr.prev = node;
        }
    }

    append(item: T): void {
        const node = { value: item, next: undefined, prev: this.tail } as Node<T>;

        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }

            curr = curr.next;
        }

        if (!curr) {
            return;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length || !this.head) {
            return undefined;
        }

        let curr: Node<T> | undefined = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        let curr: Node<T> | undefined = this.head;

        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        return node.value;
    }
}