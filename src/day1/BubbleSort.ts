export default function bubble_sort(arr: number[]): void {
  // let swapped: boolean;
  // do {
  //   swapped = false;
  //   for (let i = 0; i < arr.length - 1; i++) {
  //     if (arr[i] > arr[i + 1]) {
  //       const temp = arr[i];
  //       arr[i] = arr[i + 1];
  //       arr[i + 1] = temp;
  //       swapped = true;
  //     }
  //   }
  // } while (swapped);

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}