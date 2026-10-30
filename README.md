# 🍽️ MealMate • Modern Mess Meal Calculation & Management

A modern, fast, and responsive web application designed for shared apartments, hostels, and bachelor messes to calculate monthly meal rates, member grocery/bazar contributions, individual meal costs, and settlement balances with precision.

🔗 **Live Application:** [https://souravsahapartho.github.io/mess-meal-calculation/](https://souravsahapartho.github.io/mess-meal-calculation/)

---

## ✨ Features

- 📅 **Month & Year Selection:** Flexible billing period configuration with custom mess/group branding.
- 👥 **Dynamic Member Management:**
  - Add, remove, and rename members effortlessly.
  - Keyboard shortcuts (`Enter` to save edits).
  - Safety confirmation modal before deleting a member.
  - Persistent member profiles stored locally in your browser (`localStorage`) for quick reuse month after month.
- 🧮 **Precise Financial Engine:**
  - `Total Bazar = Σ Member Bazar Contributions`
  - `Total Meals = Σ Member Meals`
  - `Meal Rate = Total Bazar / Total Meals`
  - `Individual Meal Cost = Member Meals × Meal Rate`
  - `Balance = Member Bazar − Meal Cost`
  - Smart decimal and integer formatting without floating-point drift.
  - Automatic rounding adjustment tracker.
- 📊 **Responsive Dashboard:**
  - Responsive KPI summary cards (Total Bazar, Total Meals, Meal Rate, Active Members).
  - Desktop breakdown table and mobile-optimized individual cards.
  - Visual settlement summary: Who gets money back (🟢 Receive) vs who needs to pay (🔴 Pay).
- 📄 **Export & Share Options:**
  - **High-Definition PDF Report:** Formatted with headers, summary metrics, breakdown table, settlement list, and calculation details.
  - **Crisp Shareable PNG Image:** Optimized for instant sharing on WhatsApp, Messenger, and Telegram.
  - Live Report Preview modal before downloading.
- 🌙 **Dark & Light Mode:** Seamless theme switching with persistent local storage.

---

## 🚀 Tech Stack

- **React 18** with Functional Components & Hooks
- **Vite** for fast builds and hot module reloading
- **Tailwind CSS** for responsive styling and dark mode
- **Lucide React** for modern UI icons
- **jsPDF & jsPDF-AutoTable** for client-side PDF document generation
- **html-to-image** for high-resolution PNG exports
- **canvas-confetti** for milestone celebrations

---

## 💻 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/souravsahapartho/mess-meal-calculation.git
cd mess-meal-calculation
npm install
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

---

## 📦 Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Designed and developed with ❤️ for simplified shared living meal management.
