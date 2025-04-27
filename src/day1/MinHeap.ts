export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const currentValue = this.data[idx];

        if (parentValue > currentValue) {
            this.data[parentIdx] = currentValue;
            this.data[idx] = parentValue;
            this.heapifyUp(parentIdx);
        }
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }

    private heapifyDown(idx: number): void {
        const leftChildIdx = this.leftChild(idx);
        const rightChildIdx = this.rightChild(idx);

        if (leftChildIdx >= this.length) {
            return;
        }

        let smallestChildIdx = leftChildIdx;
        if (rightChildIdx < this.length && this.data[rightChildIdx] < this.data[leftChildIdx]) {
            smallestChildIdx = rightChildIdx;
        }

        if (this.data[idx] > this.data[smallestChildIdx]) {
            const temp = this.data[idx];
            this.data[idx] = this.data[smallestChildIdx];
            this.data[smallestChildIdx] = temp;
            this.heapifyDown(smallestChildIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.length++;
        this.heapifyUp(this.length - 1);

    }
    delete(): number {
        if (this.length === 0) {
            throw new Error('Heap is empty');
        }
        const minValue = this.data[0];
        this.data[0] = this.data[this.length - 1];
        this.length--;
        this.heapifyDown(0);
        return minValue;
    }
}