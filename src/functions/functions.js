/*
  name: James Conte
  course: CS-2430 — programming project 1
  section: CS-2430-501-Fall 2025
*/

/*sets: boolean arrays: 
   - u = ["a","b","c"] matches positions in arrays like [true,false,true]
   - true means "in the set", false means "not in the set"
*/

export const notA = (A) =>
  // flip each slot. true -> false, false -> true
  A.map(v => !v);

export const union = (A, B) =>
  // a or b. if either = true, result = true
  A.map((v, i) => v || B[i]);

export const intersection = (A, B) =>
  // a and b. only true when both = true
  A.map((v, i) => v && B[i]);

export const difference = (A, B) =>
  // a - b. keep only stuff in a that is not in b
  A.map((v, i) => v && !B[i]);

export const symmetricDifference = (A, B) =>
  // xor. true when exactly one is true
  A.map((v, i) => (v && !B[i]) || (!v && B[i]));

export const showSet = (bools, U) =>
  // turn boolean array into list of labels (pretty to read)
  bools.reduce((acc, v, i) => (v ? acc.concat(U[i]) : acc), []);


/* multisets: frequency arrays:
   - freqs like [2,0,1] with universe ["a","b","c"] means a x2, c x1
   - counts must be integers >= 0
*/

export const mUnion = (A, B) =>
  // element-wise max
  A.map((a, i) => Math.max(a, B[i]));

export const mIntersection = (A, B) =>
  // element-wise min
  A.map((a, i) => Math.min(a, B[i]));

export const mDifference = (A, B) =>
  // a - b but not below 0
  A.map((a, i) => Math.max(0, a - B[i]));

export const mAddition = (A, B) =>
  // element-wise add (bag sum)
  A.map((a, i) => a + B[i]);

export const expandMulti = (freqs, U) =>
  // repeat each label freqs[i] times
  freqs.flatMap((n, i) => Array(n).fill(U[i]));


