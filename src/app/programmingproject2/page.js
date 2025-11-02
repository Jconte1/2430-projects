"use client"

import React, { useState } from "react";

export default function SortLab() {
    /*
    name: James Conte
    course: CS-2430 (discrete math) — programming project 1
    section: CS-2430-501-Fall 2025
  
    
  */

    // make permutations of 0..n-1 and visit each one
    function eachPerm(n, visit) {
        const a = Array.from({ length: n }, (_, i) => i);
        const used = Array(n).fill(false);
        const cur = [];
        function go() {
            if (cur.length === n) { visit(cur.slice()); return; }
            for (let i = 0; i < n; i++) if (!used[i]) { used[i] = true; cur.push(a[i]); go(); cur.pop(); used[i] = false; }
        }
        go();
    }

    // count wrapper
    function counter() { return { c: 0 }; }
    function cmpf(k) { return (x, y) => { k.c++; return x < y ? -1 : x > y ? 1 : 0; }; }

    // mergesort (count compares in merge)
    function mergeSortCount(arr) {
        const k = counter(); const cmp = cmpf(k); const a = arr.slice(); const t = new Array(a.length);
        function m(lo, mid, hi) {
            let i = lo, j = mid, k2 = lo;
            while (i < mid && j < hi) t[k2++] = cmp(a[i], a[j]) <= 0 ? a[i++] : a[j++];
            while (i < mid) t[k2++] = a[i++];
            while (j < hi) t[k2++] = a[j++];
            for (let p = lo; p < hi; p++) a[p] = t[p];
        }
        function s(lo, hi) { if (hi - lo <= 1) return; const mid = (lo + hi) >> 1; s(lo, mid); s(mid, hi); m(lo, mid, hi); }
        s(0, a.length); return { comps: k.c };
    }

    // quicksort (hoare)
    function quickSortCount(arr) {
        const k = counter(); const cmp = cmpf(k); const a = arr.slice();
        function part(lo, hi) {
            const pv = a[(lo + hi) >> 1]; let i = lo - 1, j = hi + 1;
            while (true) { do { i++; } while (cmp(a[i], pv) < 0); do { j--; } while (cmp(a[j], pv) > 0); if (i >= j) return j;[a[i], a[j]] = [a[j], a[i]]; }
        }
        function s(lo, hi) { if (lo >= hi) return; const p = part(lo, hi); s(lo, p); s(p + 1, hi); }
        s(0, a.length - 1); return { comps: k.c };
    }

    // heapsort
    function heapSortCount(arr) {
        const k = counter(); const cmp = cmpf(k); const a = arr.slice(); const n = a.length;
        function down(i, sz) {
            while (true) { let l = i * 2 + 1, r = l + 1, b = i; if (l < sz && cmp(a[l], a[b]) > 0) b = l; if (r < sz && cmp(a[r], a[b]) > 0) b = r; if (b === i) return;[a[i], a[b]] = [a[b], a[i]]; i = b; }
        }
        for (let i = (n >> 1) - 1; i >= 0; i--) down(i, n);
        for (let end = n - 1; end > 0; end--) { [a[0], a[end]] = [a[end], a[0]]; down(0, end); }
        return { comps: k.c };
    }

    // shaker (cocktail)
    function shakerSortCount(arr) {
        const k = counter(); const cmp = cmpf(k); const a = arr.slice(); let s = 0, e = a.length - 1;
        while (s < e) {
            let sw = false; for (let i = s; i < e; i++) if (cmp(a[i], a[i + 1]) > 0) { [a[i], a[i + 1]] = [a[i + 1], a[i]]; sw = true; }
            e--; for (let i = e; i > s; i--) if (cmp(a[i - 1], a[i]) > 0) { [a[i - 1], a[i]] = [a[i], a[i - 1]]; sw = true; }
            s++; if (!sw) break;
        }
        return { comps: k.c };
    }

    // keep avg and top/bottom 10
    function makeStats() {
        return {
            total: 0, runs: 0, best: [], worst: [], push(x, arr) {
                this.total += x; this.runs++;
                this.best.push({ comps: x, arr: arr.slice() }); this.best.sort((a, b) => a.comps - b.comps); if (this.best.length > 10) this.best.pop();
                this.worst.push({ comps: x, arr: arr.slice() }); this.worst.sort((a, b) => b.comps - a.comps); if (this.worst.length > 10) this.worst.pop();
            }, avg() { return this.runs ? this.total / this.runs : 0; }
        };
    }

    const ALGOS = {
        MergeSort: mergeSortCount,
        QuickSort: quickSortCount,
        HeapSort: heapSortCount,
        ShakerSort: shakerSortCount,
    };

    const [out, setOut] = React.useState("");
    const [busy, setBusy] = React.useState(false);

    async function runN(n) {
        if (busy) return; setBusy(true);
        const stats = {}; for (const k of Object.keys(ALGOS)) stats[k] = makeStats();
        eachPerm(n, (perm) => {
            for (const [name, fn] of Object.entries(ALGOS)) {
                const { comps } = fn(perm);
                stats[name].push(comps, perm);
            }
        });
        let text = `n=${n}
`;
        for (const name of Object.keys(ALGOS)) {
            const s = stats[name];
            text += `
${name}
`;
            text += `avg: ${Math.round(s.avg())}
`;
            text += `best 10:
`;
            s.best.forEach((r, i) => {
                text += `${i + 1}. ${r.comps}  [${r.arr.join(', ')}]
`;
            });
            text += `worst 10:
`;
            s.worst.forEach((r, i) => {
                text += `${i + 1}. ${r.comps}  [${r.arr.join(', ')}]
`;
            });
        }
        setOut(text); setBusy(false);
    }

    return (
        <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: 18, fontWeight: 700 }}>CSIS 2430 – Sorting Comparisons</h1>
            <p style={{ fontSize: 12, color: '#666' }}>Author: James Conte · CS-2430-501-Fall 2025</p>
            <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
                <button disabled={busy} onClick={() => runN(4)}>run n=4</button>
                <button disabled={busy} onClick={() => runN(6)}>run n=6</button>
                <button disabled={busy} onClick={() => runN(8)}>run n=8</button>
            </div>
            <pre style={{ background: '#111', color: '#0f0', padding: 12, minHeight: 240, whiteSpace: 'pre-wrap' }}>{out || 'click a button to run.'}</pre>
            <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>

            </div>
        </div>
    );
}
