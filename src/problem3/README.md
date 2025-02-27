# 🚀 Optimizing `WalletPage.tsx`

## **🔍 Issues & Optimizations**

## **❌ Issues in the Current Code**

### **1. Inefficient `getPriority` Function**

#### **Problem:**

- Uses a `switch-case` to determine blockchain priority, leading to an **O(n) complexity** lookup.
- Uses `any` type for `blockchain`, reducing type safety.
- The function is invoked multiple times in `.sort()`, causing redundant computations.

#### **Solution:**

- Replace `switch-case` with a **lookup object (map object)** for **O(1) access time**.
- Define **TypeScript types** for blockchain to enhance type safety.

---

### **2. Inefficient `useMemo` Usage**

#### **Problem:**

- Calls `getPriority()` **twice per element** in `.sort()`, making sorting inefficient.
- Uses separate `.filter()` and `.sort()` calls, resulting in **multiple iterations over the array**.

#### **Solution:**

- Compute `priority` once before sorting to avoid redundant calls.
- Merge `.filter()`, `.map()`, and `.sort()` into **one iteration**.

---

### **3. Logical Error in Filtering (`lhsPriority` Undefined)**

#### **Problem:**

```ts
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
```

- `lhsPriority` is not defined, causing runtime errors.
- Filtering logic is unclear (should balances with `amount <= 0` be kept or removed?).

#### **Solution:**

- **Clarify the filtering condition** by removing balances with `amount <= 0` early.

---

### **4. Unnecessary `formattedBalances` Variable**

#### **Problem:**

- Creates an unused variable (`formattedBalances`), wasting memory.

#### **Solution:**

- Remove it and handle formatting directly inside JSX.

---

### **5. Anti-Pattern: Using `index` as `key`**

#### **Problem:**

- Using `index` as the `key` in `.map()` can cause rendering issues when the list order changes.

#### **Solution:**

- Use `currency` as a **stable key** instead.

---

## **✅ Optimized & Professional Code**

### **Improvements in the New Code:**

✅ **O(1) lookup** for blockchain priority using a map object.
✅ **Avoids multiple calls to `getPriority()`** by computing it once.
✅ **Merges filter + map + sort into a single pass** for better efficiency.
✅ **Removes unnecessary variables (`formattedBalances`).**
✅ **Uses `currency` as `key`, ensuring stable rendering.**
