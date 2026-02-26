let data = [];
// Calendar Variables

let companyMonthChart;
let companyGrowthChart;
let currentDate = new Date();
let selectedDate = new Date();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    updateSelectedDate();
    // Event listeners for navigation buttons
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
});

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month display
    document.getElementById('currentMonth').textContent = monthNames[month] + ' ' + year;

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get calendar dates container
    const calendarDates = document.getElementById('calendarDates');
    calendarDates.innerHTML = '';

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'date-cell';
        calendarDates.appendChild(emptyCell);
    }

    // Add cells for each day of the month
    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'date-cell';
        dateCell.textContent = day;

        // Check if this is today's date
        if (day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()) {
            dateCell.classList.add('today');
        }

        // Check if this is the selected date
        if (day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear()) {
            dateCell.classList.add('active');
        }

        // Add click event to select date
        dateCell.addEventListener('click', function() {
            selectedDate = new Date(year, month, day);
            renderCalendar();
            updateSelectedDate();
            dataextract(data); // 🔥 REQUIRED
        });


        calendarDates.appendChild(dateCell);
    }
}

function updateSelectedDate() {
    const day = selectedDate.getDate();
    const month = monthNames[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();


    document.getElementById('selectedDate').textContent = month + ' ' + day + ', ' + year;
}



let errorEl = document.getElementById('errorwarning')
let todaynwsEl = document.getElementById('todaynws')
let yesterdaynwsEl = document.getElementById('yesterdaynws')
let selectedDatenwsEl = document.getElementById('selectedDatenws')
let errortodayEl = document.getElementById('errortoday')
let errorwarningEl = document.getElementById('errorwarning')
let no_of_articlesEl = document.getElementById('no_of_articles')
no_of_articlesEl.textContent = ""

function getYesterday(date) {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    return d;
}

function sameDay(a, b) {
    const d1 = new Date(a);
    const d2 = new Date(b);

    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}


// data fetch and card implimentation
function getArticleDate(article) {

    // 1️⃣ Best source: ISO timestamp
    if (article.fetchedAt) {
        const d = new Date(article.fetchedAt);
        if (!isNaN(d.getTime())) return d;
    }

    // 2️⃣ Older field name
    if (article.fetch_at) {
        const d = new Date(article.fetch_at);
        if (!isNaN(d.getTime())) return d;
    }

    // 3️⃣ RSS pubDate
    if (article.pubDate) {
        const d = new Date(article.pubDate);
        if (!isNaN(d.getTime())) return d;
    }

    // 4️⃣ Last fallback: "Feb 16" format
    if (article.date) {
        const currentYear = new Date().getFullYear();
        const d = new Date(`${article.date} ${currentYear}`);
        if (!isNaN(d.getTime())) return d;
    }

    return null;
}

function parseAIBusiness(raw, result, articleDate) {

    let detail_titleEl = document.getElementById("detail-title");
    let detail_dateEl = document.getElementById("detail-date");
    let detail_bodyEl = document.getElementById("detail-body");

    let start = raw.indexOf("Picture of");
    if (start === -1) {
        detail_bodyEl.innerHTML = "Article structure not recognized.";
        return;
    }

    raw = raw.substring(start);

    let end = raw.indexOf("Related:");
    if (end !== -1) {
        raw = raw.substring(0, end);
    }

    raw = raw.replace(/!\[.*?\]\(.*?\)/g, "");
    raw = raw.replace(/\[([^\]]*)\]\([^\)]*\)/g, "");
    raw = raw.replace(/Picture of.*?\n/g, "");
    raw = raw.replace(/\d+\sMin Read/g, "");
    raw = raw.replace(/via Getty Images/g, "");
    raw = raw.replace(/\n\s*\n/g, "\n\n");

    let paragraphs = raw
        .split("\n")
        .map(p => p.trim())
        .filter(p => p.length > 40);

    detail_titleEl.textContent = result.title;
    detail_dateEl.textContent =
        articleDate.toLocaleDateString("en-GB", {
            timeZone: "UTC"
        });

    detail_bodyEl.innerHTML = paragraphs.join("<br><br>");
}

function parseGenericArticle(raw, result, articleDate) {

    let detail_titleEl = document.getElementById("detail-title");
    let detail_dateEl = document.getElementById("detail-date");
    let detail_bodyEl = document.getElementById("detail-body");

    raw = raw.replace(/URL Source:.*/g, "");
    raw = raw.replace(/!\[.*?\]\(.*?\)/g, "");
    raw = raw.replace(/\[([^\]]*)\]\([^\)]*\)/g, "");
    raw = raw.replace(/\n\s*\n/g, "\n\n");

    let paragraphs = raw
        .split("\n")
        .map(p => p.trim())
        .filter(p =>
            p.length > 60 &&
            !p.includes(".svg") &&
            !p.includes("width=")
        );

    detail_titleEl.textContent = result.title;
    detail_dateEl.textContent =
        articleDate.toLocaleDateString("en-GB", {
            timeZone: "UTC"
        });

    detail_bodyEl.innerHTML = paragraphs.join("<br><br>");
}

function createCard(result, articleDate) {
    let card = document.createElement("div");
    card.classList.add("mb-5", );
    card.style.cursor = "pointer";

    card.addEventListener("click", function() {

        display("section-details");
        let detail_titleEl = document.getElementById("detail-title")
        detail_titleEl.textContent = ""
        let detail_dateEl = document.getElementById("detail-date")
        detail_dateEl.textContent = ""
        let detail_author = document.getElementById("detail-author")
        detail_author.textContent = ""
        document.getElementById("detail-body").innerHTML = "Loading...."
        console.log("RESULT OBJECT:", result);
        console.log("URL VALUE:", result.url, result.link);









        let url = result.url || result.link;

        if (!url) {
            document.getElementById("detail-body").innerHTML =
                "Invalid or missing article URL.";
            return;
        }

        fetch("https://r.jina.ai/" + url)
            .then(res => res.text())
            .then(raw => {

                if (!raw || raw.length < 50) {
                    document.getElementById("detail-body").innerHTML =
                        "No readable article content.";
                    return;
                }

                if (url.includes("aibusiness.com")) {
                    parseAIBusiness(raw, result, articleDate);
                } else {
                    parseGenericArticle(raw, result, articleDate);
                }

            })
            .catch(err => {
                console.error("Fetch error:", err);
                document.getElementById("detail-body").innerHTML =
                    "Article could not be loaded.";
            });






        // let url = result.url;

    });
    let title = document.createElement("h3");
    title.textContent = result.title;
    card.appendChild(title);

    let link = document.createElement("a");
    link.href = result.link || result.url;
    link.target = "_blank";
    link.textContent = result.url || result.link
    card.appendChild(link);

    let date = document.createElement("p");
    date.textContent = articleDate.toString();
    card.appendChild(date);

    let desc = document.createElement("p");
    desc.textContent = desc.textContent = result.Description || result.description;

    card.appendChild(desc);
    card.classList.add("article-card")


    return card;
}

function dataextract(data) {
    selectedDatenwsEl.innerHTML = ""
    todaynwsEl.innerHTML = "";
    yesterdaynwsEl.innerHTML = "";

    let todayCount = 0;
    let yesterdayCount = 0;
    let selectedcount = 0;

    const realToday = new Date();
    const yesterday = getYesterday(realToday);



    for (let result of data) {

        const articleDate = getArticleDate(result);
        if (!articleDate) continue;

        // -------- TODAY --------
        if (sameDay(articleDate, realToday)) {
            todayCount++;
            todaynwsEl.appendChild(createCard(result, articleDate));




        }
        if (sameDay(articleDate, selectedDate)) {
            selectedcount++
            selectedDatenwsEl.appendChild(createCard(result, articleDate));


        }
        // -------- YESTERDAY --------
        if (sameDay(articleDate, yesterday)) {
            yesterdayCount++;
            yesterdaynwsEl.appendChild(createCard(result, articleDate));

        }

    }

    if (todayCount === 0) {
        errortodayEl.textContent = "No news available for this date.";
    } else {
        errorEl.textContent = "";
        if (yesterdayCount === 0) {
            errorwarningEl.textContent = "No News Yesterday Posted"
        }
    }
    no_of_articlesEl.textContent = (selectedcount) + " articles"
}

function fetchdata() {

    const baseUrl = "https://raw.githubusercontent.com/TheNova6000/Sociality_newsfeed/refs/heads/master";

    const mainUrl = `${baseUrl}/data/News/News.json`;

    // Build the second URL dynamically using selectedDate
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    const dateUrl = `${baseUrl}/news/${year}-${month}-${day}.json`;

    Promise.all([
            fetch(mainUrl).then(res => res.json()),
            fetch(dateUrl).then(res => {
                if (!res.ok) return {
                    data: []
                }; // If file doesn't exist, treat as empty
                return res.json();
            })
        ])
        .then(([mainJson, dateJson]) => {

            // Both should have `.data` arrays
            const arr1 = Array.isArray(mainJson) ?
                mainJson :
                Array.isArray(mainJson.data) ?
                mainJson.data : [];

            const arr2 = Array.isArray(dateJson) ?
                dateJson :
                Array.isArray(dateJson.data) ?
                dateJson.data : [];
            // Merge
            data = [...arr1, ...arr2];

            // Optional sorting (newest first)
            data.sort((a, b) => {
                const da = getArticleDate(a);
                const db = getArticleDate(b);
                return db - da;
            });
            const currentMonth = getYearMonth(new Date());
            generateMonthlyCompanyChart(currentMonth);
            generateCompanyGrowthChart("OpenAI");



            dataextract(data);

        })
        .catch(err => {
            console.error("Fetching failed:", err);
        });
}
fetchdata();

// SEARCH
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        dataextract(data); // Reset if empty
        return;
    }

    const filtered = data.filter(article => {
        const title = article.title ? article.title.toLowerCase() : "";
        const desc = article.description ? article.description.toLowerCase() : "";
        const author = article.author ? article.author.toLowerCase() : "";

        return (
            title.includes(query) ||
            desc.includes(query) ||
            author.includes(query)
        );
    });

    renderSearchResults(filtered, query);
}

function renderSearchResults(results, query) {
    todaynwsEl.innerHTML = "";
    yesterdaynwsEl.innerHTML = "";
    selectedDatenwsEl.innerHTML = "";
    let heading_yeaterdaysnEl = document.getElementById('heading_yeaterdaysn')
    let heading_todaysnEl = document.getElementById('heading_todaysn')
    if (results.length === 0) {
        todaynwsEl.innerHTML = `<p>No results found for "<strong>${query}</strong>"</p>`;
        return;
    }

    for (let article of results) {
        const articleDate = getArticleDate(article);
        if (!articleDate) continue;

        todaynwsEl.appendChild(createCard(article, articleDate));
        heading_todaysnEl.textContent = ""
        heading_yeaterdaysnEl.textContent = ""
    }
}

// Weather
let weathercityinputEl = document.getElementById('weathercityinput')
let citynameEl = document.getElementById('cityname')
let tempEl = document.getElementById('temp')
let skyEl = document.getElementById('sky')
let dateEl = document.getElementById('date')
let timeEl = document.getElementById('time')

function fetchWeather(city) {
    if (!city) return;
    citynameEl.textContent = "Loading...";
    // First convert city to coordinates
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(res => res.json())
        .then(geo => {

            if (!geo.results) throw new Error("City not found");

            const lat = geo.results[0].latitude;
            const lon = geo.results[0].longitude;

            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        })
        .then(res => res.json())
        .then(data => {

            const temperature = data.current_weather.temperature;

            const now = new Date();

            citynameEl.textContent = city;
            tempEl.innerHTML = `${temperature} &deg;C`;
            skyEl.textContent = "Current conditions";
            dateEl.textContent = now.toDateString();
            timeEl.textContent = now.toLocaleTimeString();
        })
        .catch(() => {
            citynameEl.textContent = "City not found";
            tempEl.textContent = "--";
            skyEl.textContent = "Weather fetch failed";
        });
}
weathercityinputEl.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        fetchWeather(weathercityinputEl.value.trim());

    }
});

// Compnay graphs
function getYearMonth(dateInput) {
    const d = new Date(dateInput);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
}
const AI_COMPANIES = [
    "OpenAI",
    "Google",
    "Microsoft",
    "Anthropic",
    "Meta",
    "Amazon",
    "Tesla",
    "Nvidia",
    "Apple",
    "IBM"
];

function generateMonthlyCompanyChart(selectedYearMonth) {

    const companyCounts = {};

    AI_COMPANIES.forEach(c => companyCounts[c] = 0);

    data.forEach(article => {

        const articleDate = getArticleDate(article);
        if (!articleDate) return;

        const ym = getYearMonth(articleDate);
        if (ym !== selectedYearMonth) return;

        const text = (
            (article.title || "") + " " +
            (article.description || "")
        ).toLowerCase();

        AI_COMPANIES.forEach(company => {
            if (text.includes(company.toLowerCase())) {
                companyCounts[company]++;
            }
        });
    });

    const labels = AI_COMPANIES;
    const values = AI_COMPANIES.map(c => companyCounts[c]);

    const ctx = document.getElementById("companyMonthChart").getContext("2d");

    if (companyMonthChart) companyMonthChart.destroy();

    companyMonthChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: `Articles in ${selectedYearMonth}`,
                data: values,
                backgroundColor: "rgba(75,115,220,0.7)"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, elements) => {

                if (elements.length > 0) {

                    const index = elements[0].index;
                    const companyName = labels[index];

                    generateCompanyGrowthChart(companyName);

                }
            }
        }
    });
}

function generateCompanyGrowthChart(companyName) {

    const monthlyCounts = {};

    data.forEach(article => {

        const articleDate = getArticleDate(article);
        if (!articleDate) return;

        const ym = getYearMonth(articleDate);

        const text = (
            (article.title || "") + " " +
            (article.description || "")
        ).toLowerCase();

        if (text.includes(companyName.toLowerCase())) {

            if (!monthlyCounts[ym]) {
                monthlyCounts[ym] = 0;
            }

            monthlyCounts[ym]++;
        }
    });

    // Sort months chronologically
    const sortedMonths = Object.keys(monthlyCounts).sort();

    const values = sortedMonths.map(month => monthlyCounts[month]);

    const ctx = document.getElementById("companyGrowthChart").getContext("2d");

    if (companyGrowthChart) companyGrowthChart.destroy();

    companyGrowthChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: sortedMonths,
            datasets: [{
                label: `${companyName} Monthly Growth`,
                data: values,
                borderColor: "rgba(220,75,75,1)",
                backgroundColor: "rgba(220,75,75,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}