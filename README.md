![WhatsApp Image 2026-02-18 at 3 02 29 PM](https://github.com/user-attachments/assets/02813538-dc1a-4059-aa61-849fc8847b8b)Perfect. Now we make this strong. Not just a student project — a system.

Here’s your upgraded **README.md** including:

* n8n RSS automation
* Why this is a Full Stack Web Application
* Clear architecture explanation

You can directly paste this into GitHub.

---

# 🚀 Sociality – Intelligent News Aggregation Platform

Sociality is a full stack news aggregation and visualization platform that automatically collects news using RSS feeds, processes structured data, stores it in a GitHub-based repository, and dynamically renders analytics through an interactive web interface.

It combines automation, data engineering, and frontend visualization into a unified system.

---

# 📌 What is Sociality?

Sociality is not just a static website.

It is an automated news pipeline:

RSS Sources → n8n Automation → Structured JSON → GitHub Repository → Dynamic Web App → Interactive Charts

It collects, structures, stores, and visualizes news data in a scalable and modular architecture.

---

# 🏗 Why This is a Full Stack Web Application

A full stack system consists of:

1. Frontend (Client Layer)
2. Backend / Processing Layer
3. Data Layer

Sociality includes all three.

---

## 🌐 Frontend Layer

Built using:

* HTML5
* CSS3
* Bootstrap
* Vanilla JavaScript
* Chart.js

Responsibilities:

* Dynamic rendering of news
* Date-based filtering
* Company-wise analytics
* Growth visualization charts
* Dark mode theme
* State management

The frontend fetches structured JSON data and updates UI without page reload.

---

## ⚙ Backend Automation Layer (n8n)

## n8n RSS Automation Workflow

![n8n Workflow](https://raw.githubusercontent.com/TheNova6000/Socality-Term2/main/n8n%20full%20rss.jpeg)

The backend logic is implemented using **n8n**, an open-source workflow automation platform.

### What n8n Does in This Project:

* Monitors multiple RSS feeds
* Extracts latest news articles
* Parses metadata (title, company, date, link, summary)
* Structures the data into JSON format
* Pushes the JSON file automatically to GitHub

This eliminates manual data entry.

It turns the system into an automated data pipeline.

---

## 📰 RSS Feed Integration

n8n uses RSS nodes to pull data from:

* Financial news websites
* Company press releases
* Market update feeds

Each RSS entry is transformed into structured format like:

```json
{
  "title": "Company X reports 15% growth",
  "company": "Company X",
  "date": "Fri, 30 Jan 2026 13:31:59 GMT",
  "category": "Finance",
  "link": "https://..."
}
```

The automation runs on schedule, keeping the repository updated.

---

## 🗄 Data Layer

Instead of traditional databases, this project uses:

* GitHub Repository as a Data Store
* Structured JSON files categorized by:

  * Year
  * Month

Example:

```
data/News/
   2026-01.json
   2026-02.json
```

This approach demonstrates:

* Serverless backend design
* Static hosting with dynamic behavior
* Distributed data management

---

# 🔄 Complete System Flow

1. RSS feed publishes news
2. n8n detects update
3. Data parsed and structured
4. JSON pushed to GitHub
5. Frontend fetches data via GitHub raw URL
6. Charts and UI update dynamically

This is an automated full-stack pipeline.

---

# 📊 Data Visualization

Charts implemented using:

* **Chart.js**

Features:

* Company distribution graph
* Click-based company growth visualization
* Chart instance destruction & recreation
* Dynamic monthly data rendering

---

# 🧠 Engineering Concepts Demonstrated

* Workflow automation
* RSS parsing
* JSON data structuring
* State management in frontend
* Dynamic URL generation
* Asynchronous fetch API
* Data visualization techniques
* Git-based storage architecture
* Serverless full-stack design

---

# 🛠 Tech Stack

Frontend:

* HTML
* CSS
* JavaScript
* Bootstrap
* Chart.js

Backend Automation:

* n8n
* RSS Feeds
* GitHub API

Data Storage:

* GitHub JSON repository

---

# 🚀 Why This Architecture is Powerful

* No traditional backend server required
* Fully automated data ingestion
* Scalable modular design
* Easily extensible to real-time APIs
* Can be deployed using GitHub Pages

This is a modern serverless full-stack model.

---

# 🔮 Future Scope

* Replace GitHub storage with MongoDB or PostgreSQL
* Add Node.js backend API
* Implement authentication system
* Add sentiment analysis using NLP
* Real-time WebSocket updates
* AI-based news categorization

---

## 👤 Author
**Sri Krishna Batkeeri**
**E. Vaishnavi**
**T. Rahul**
**S. Sanjana**
**S. Sahithi**
**P. Sai Bhavya**
B.Tech – Computer Science and Engineering


