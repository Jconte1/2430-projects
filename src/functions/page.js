/*
  name: James Conte
  course: CS-2430 (discrete math) — programming project 1
  section: CS-2430-501-Fall 2025

  - main page that shows sets and multisets
*/

import styles from "@/styles/ProgrammingProject1.module.css";

// importing all of our functions from functions.js
import {
  notA,
  union,
  intersection,
  difference,
  symmetricDifference,
  showSet,
  mUnion,
  mIntersection,
  mDifference,
  mAddition,
  expandMulti
} from "@/functions/functions";

export default function Home() {
  /*
    boolean arrays:
    - universe u = a..h
    - a means present = true, not in set = false
  */

  // U array with character a through h 
  const U = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // A boolean Array
  const A = [true, false, true, false, false, true, false, false];

  // B boolean Array 
  const B = [false, true, true, false, true, false, false, true];

  // do the set math, get new boolean arrays back
  const notARes = notA(A);               // everything in u that is not in a
  const unionRes = union(A, B);          // in a or b or both
  const interRes = intersection(A, B);   // only in both a and b
  const diffRes = difference(A, B);      // in a but not in b
  const xorRes = symmetricDifference(A, B); // in a or b but not both (exclusive)

  /*
    multiset section (frequency arrays)
    - here numbers are counts. like how many apples etc
    - counts are >= 0 
  */
  const UM = ["apple", "banana", "cherry", "pear", "orange"]; // multiset 

  // a multiset a
  // IE: apple x2, cherry x1, pear x3
  const AM = [2, 0, 1, 3, 0];

  // multiset b
  // IE: apple x1, banana x2, pear x1, orange x4
  const BM = [1, 2, 0, 1, 4];

  // do the multiset math (works element-by-element)
  const mU = mUnion(AM, BM);        // max of each position
  const mI = mIntersection(AM, BM); // min of each position
  const mD = mDifference(AM, BM);   // a - b but clamp at 0
  const mAdd = mAddition(AM, BM);     // add counts

  /*
    displays a row of "chips"
    - title shows what operation this is
    - items is the pretty list (labels) we already converted
    
  */
  const List = ({ title, items }) => (
    <div className={styles.card}>
      <h3 className={styles.h3}>
        {title}
      </h3>

      {/* the line with the chips */}
      <div className={styles.row}>
        {items.length === 0
          ? <span className={styles.empty}>∅ (empty)</span> // empty set symbol. 
          : items.map((x, i) => (
            <span key={i} className={styles.badge}>
              {/* show the actual element label */}
              {x}
            </span>
          ))
        }
      </div>
    </div>
  );

  /*
    page layout notes:
    - first card: show inputs 
    - then show each operation result as a chip list
    - then switch to multiset, show inputs and results
    - formatting is black/white only so super readable
  */

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>
        Programming Project 1 — Sets & Multisets
      </h1>

      {/* reminder card so future me remembers what u/a/b are */}
      <section className={styles.card}>
        <h2 className={styles.subTitle}>universe & inputs (sets)</h2>

        {/* code-style block so the arrays line up nice */}
        <pre className={styles.code}>
          {`u = [${U.join(", ")}]

a = { ${showSet(A, U).join(", ")} }
  -> boolean array backing: [${A.map(v => (v ? 1 : 0)).join(", ")}]
  

b = { ${showSet(B, U).join(", ")} }
  -> boolean array backing: [${B.map(v => (v ? 1 : 0)).join(", ")}]
`}
        </pre>
      </section>

      {/* results for set operations (converted to labels for easy reading) */}
      <List title="not(a)" items={showSet(notARes, U)} />
      <List title="a ∪ b" items={showSet(unionRes, U)} />
      <List title="a ∩ b" items={showSet(interRes, U)} />
      <List title="a – b" items={showSet(diffRes, U)} />
      <List title="a ⊕ b" items={showSet(xorRes, U)} />

      {/* multiset inputs display */}
      <section className={styles.card} style={{ marginTop: 28 }}>
        <h2 className={styles.subTitle}>universe & inputs (multisets)</h2>
        <pre className={styles.code}>
          {`u = [${UM.join(", ")}]

a (counts) = [${AM.join(", ")}]
  -> expanded: ${JSON.stringify(expandMulti(AM, UM))}

b (counts) = [${BM.join(", ")}]
  -> expanded: ${JSON.stringify(expandMulti(BM, UM))}


`}
        </pre>
      </section>

      {/* multiset result block (kept in code style so alignment is nice) */}
      <section className={styles.card}>
        <h3 className={styles.h3}>results (multisets)</h3>
        <pre className={styles.code}>
          {`union (max):       [${mU.join(", ")}]
  -> expanded: ${JSON.stringify(expandMulti(mU, UM))}

intersection (min): [${mI.join(", ")}]
  -> expanded: ${JSON.stringify(expandMulti(mI, UM))}

difference (a - b): [${mD.join(", ")}]
  -> expanded: ${JSON.stringify(expandMulti(mD, UM))}

addition (bag sum): [${mAdd.join(", ")}]
  -> expanded: ${JSON.stringify(expandMulti(mAdd, UM))}
`}
        </pre>
      </section>
    </main>
  );
}
