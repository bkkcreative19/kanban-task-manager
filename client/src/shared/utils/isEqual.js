export const isEqual = (arr1, arr2) => {
  console.log(arr1);
  console.log(arr2);
  // If length is not equal
  if (arr1.length != arr2.length) return "False";
  else {
    // Comparing each element of array
    for (var i = 0; i < arr1.length; i++)
      if (arr1[i] != arr2[i]) return "False";
    return "True";
  }
};
