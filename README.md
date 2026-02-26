Alright. Here’s a clean, professional **README.md** for your **Sociality** project.
Structured, clear, and strong enough for GitHub + academic submission.

---

# 🚀 Sociality – Stay Informed

Sociality is a dynamic newsfeed web application that fetches and displays structured news data from a GitHub-hosted JSON repository. It provides date-based filtering, company-specific visualization, and growth analytics using interactive charts.

The project demonstrates frontend architecture, API-based data fetching, state management, and data visualization.

---

## 📌 Project Overview

Sociality is designed to:

* Fetch news data dynamically from GitHub
* Filter content based on selected date
* Display company-related data
* Visualize company growth using charts
* Implement dark mode UI
* Manage application state efficiently

This project emphasizes clean UI design, structured JSON data handling, and dynamic rendering using JavaScript.

---

## 🧠 Core Features

### ✅ Dynamic Data Fetching

* Fetches JSON data from GitHub raw URLs
* Uses dynamic date-based URL generation
* Handles asynchronous data loading

### ✅ Date-Based News Filtering

* Select date from calendar
* Auto-fetch corresponding monthly news file
* Format handling for GMT dates

### ✅ Interactive Charts

* Company-wise monthly performance chart
* Click-based growth visualization
* Chart rendering using JavaScript charting libraries

### ✅ Dark Mode Support

* Toggle-based theme switching
* CSS-controlled UI theme states

### ✅ State Management

* Maintains selected date state
* Tracks company selection
* Dynamically updates UI without reload

---

## 🛠 Tech Stack

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* **Bootstrap 4**
* **Chart.js (for visualization)**
* **GitHub Raw Content API (Data Source)**

---

## 📂 Project Structure

```
Sociality/
│
├── index.html
├── style.css
├── script.js
│
└── data/
    └── News/
        ├── News.json
        ├── 2026-01.json
        ├── 2026-02.json
        └── ...
```

---

## 🔄 Data Flow Architecture

1. User selects a date
2. JavaScript extracts:

   * Year
   * Month
3. Constructs dynamic GitHub raw URL
4. Fetches JSON data
5. Filters relevant entries
6. Updates UI and charts

---

## 📊 Chart Behavior

* Initial chart: Company monthly distribution
* On company click: Growth chart of that company
* Chart instances are destroyed and recreated to prevent duplication

---

## 🧩 Concepts Demonstrated

* API-based dynamic content loading
* Asynchronous JavaScript (fetch + promises)
* State-driven UI updates
* Dynamic DOM manipulation
* Data visualization techniques
* UI/UX theme switching
* Structured JSON design

---

## 🚀 How to Run

1. Clone the repository:

   ```
   git clone https://github.com/TheNova6000/Sociality_newsfeed.git
   ```

2. Open `index.html` in browser

No backend server required.

---

## 📈 Future Improvements

* Add backend with database
* User authentication
* Real-time news API integration
* Advanced filtering (category, company, sentiment)
* Performance optimization with caching
* Progressive Web App (PWA) version

---

## 🎯 Academic Relevance

This project demonstrates practical implementation of:

* Frontend engineering
* Data visualization
* State management
* API integration
* UI/UX principles

It can be extended into a full-stack production-level system.

---

## 👤 Author
**Sri Krishna Batkeeri**
**E. Vaishnavi**
**T. Rahul**
**S. Sanjana**
**S. Sahithi**
**P. Sai Bhavya**
B.Tech – Computer Science and Engineering


