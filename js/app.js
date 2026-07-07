/* -------------------------------------------------------------
   PROJECT 1MOR - Brand Logic & State Management
   Features: LocalStorage database, pace/BMI calculators, 
   Canvas GPS route, cart checkout, admin dashboard, community feed.
   ------------------------------------------------------------- */
// Global State Object
let appState = {
    members: [],
    events: [],
    products: [],
    blogs: [],
    feed: [],
    registrations: [],
    contactInquiries: [],
    cart: []
};
// Initial Preset Database (Used if localStorage is empty)
const defaultPresets = {
    members: [
        { id: "M-101", name: "David Kiptum", dist: 78.4, runs: 6, elevation: 1240, badges: ["🌅", "⛰️", "💯"] },
        { id: "M-102", name: "Elena Rostova", dist: 64.2, runs: 5, elevation: 320, badges: ["🌅", "💯"] },
        { id: "M-103", name: "Marcus Brody", dist: 52.8, runs: 4, elevation: 780, badges: ["⛰️", "🤝"] },
        { id: "M-104", name: "Sarah Chen", dist: 45.0, runs: 5, elevation: 210, badges: ["🌅", "🤝"] },
        { id: "M-105", name: "Alex Rivera", dist: 38.2, runs: 3, elevation: 150, badges: ["🌅"] },
        { id: "M-106", name: "Jessica Miller", dist: 28.5, runs: 3, elevation: 80, badges: ["🌅"] }
    ],
    events: [
        { 
            id: "evt-01", 
            title: "Sunday Sunrise 10K", 
            type: "social", 
            date: "July 12, 6:00 AM", 
            loc: "Marina Green Gate", 
            dist: "10 Km", 
            desc: "Join us for our weekly signature social pacing run. Refreshments and coffee post-run.",
            timestamp: new Date("July 12, 2026 06:00:00").getTime()
        },
        { 
            id: "evt-02", 
            title: "Summer Classic 10K", 
            type: "race", 
            date: "August 15, 7:30 AM", 
            loc: "Presidio National Park", 
            dist: "10 Km", 
            desc: "Project 1MOR flagship summer race event. Timing chips, runner jerseys, and achievement badges.",
            timestamp: new Date("August 15, 2026 07:30:00").getTime()
        },
        { 
            id: "evt-03", 
            title: "Midnight City Lights Half", 
            type: "race", 
            date: "September 05, 10:00 PM", 
            loc: "Embarcadero Plaza", 
            dist: "21.1 Km", 
            desc: "An electric half marathon under the cityscape lights. Neon apparel recommended.",
            timestamp: new Date("September 05, 2026 22:00:00").getTime()
        },
        {
            id: "evt-04",
            title: "Thursday Track Intervals",
            type: "track",
            date: "July 16, 6:30 PM",
            loc: "Kezar Stadium Track",
            dist: "8x 800m",
            desc: "Focused speed endurance session. Certified pacers leading sub-4, sub-5, sub-6 min groups.",
            timestamp: new Date("July 16, 2026 18:30:00").getTime()
        }
    ],
    products: [
        { id: "prd-01", title: "Project 1MOR Performance Tee", price: 450.00, cat: "apparel", img: "tee", desc: "Super lightweight, moisture-wicking short sleeve top featuring electric blue flatlock stitching, dynamic side vents, and a high-visibility brand logo on the chest. Designed to keep you dry and fast." },
        { id: "prd-02", title: "Project 1MOR Stealth Windbreaker", price: 899.00, cat: "apparel", img: "windbreaker", desc: "Water-resistant, ultra-packable running windshell with targeted laser-cut ventilation zones, 360-degree reflectivity, zippered pockets, and an elasticated hood. Ideal for breezy dawn patrols." },
        { id: "prd-03", title: "Project 1MOR Pace Running Cap", price: 299.00, cat: "accessories", img: "cap", desc: "Breathable mesh panels, speed-dry fabrics, adjustable back buckle clasp, and a semi-flexible glare-reducing brim. Highlights reflecting accents for low-light night running safety." },
        { id: "prd-04", title: "Project 1MOR Insulated Hydro Flask", price: 399.00, cat: "accessories", img: "bottle", desc: "Double-wall stainless steel sports bottle. Keeps water freezing cold for up to 24 hours. Leak-proof straw cap and electric blue silicone protective sleeve." }
    ],
    blogs: [
        {
            id: "blg-01",
            title: "Mastering Your Zone 2 Cardio",
            author: "Coach Marcus",
            date: "July 2, 2026",
            readtime: "5 min read",
            category: "Training",
            excerpt: "Learn how slowing down your average pacing actually unlocks massive aerobic efficiency for long-distance runs.",
            body: "<p>We often think that to run faster, we must train harder and faster during every run. However, elite coaches globally agree that up to 80% of your training volume should be logged at a conversational, easy pace. This is Zone 2 aerobic training.</p><h3>Why Zone 2 Matters</h3><p>Zone 2 represents the exercise intensity where your body relies primarily on fat oxidation rather than carbohydrates for energy. By staying in this zone, you increase mitochondrial density in your muscle cells and build capillary beds that transport oxygen much more efficiently to working fibers.</p><h3>How to Find Your Zone 2</h3><p>A simple formula is the MAF (Maximum Aerobic Function) test: Subtract your age from 180 (180 - age). Adjust downwards if returning from injury. Try to run at or slightly below this heart rate for your long slow runs and notice your stamina soar after a few weeks.</p>"
        },
        {
            id: "blg-02",
            title: "Fueling and Carbohydrate Loading",
            author: "Nutritionist Sarah",
            date: "June 28, 2026",
            readtime: "6 min read",
            category: "Nutrition",
            excerpt: "The science of glycogen storage: how to feed your muscles for half marathons and full marathons.",
            body: "<p>Hitting the wall at kilometer 32 is a classic marathon experience, but it isn't inevitable. It is almost always a direct consequence of running dry of muscle glycogen stores. Let's analyze how to fuel properly beforehand.</p><h3>The Carbohydrate Loading Window</h3><p>True carbohydrate loading doesn't mean eating a single plate of pasta the night before a major race. That often leaves runners feeling bloated and heavy. Instead, focus on increasing carbohydrate intake to 8-10g per kilogram of body weight starting 36 to 48 hours before the gun fires, while lowering overall fat and fiber to prevent gastrointestinal stress.</p><h3>Intra-Race Fueling Strategies</h3><p>Your body can store roughly 90 minutes of glycogen. Past that, you need ingestion. Plan to consume 30 to 60 grams of simple carbohydrates (gels, chews, or sports drinks) per hour, accompanied by small water sips to ensure swift absorption in the small intestine.</p>"
        },
        {
            id: "blg-03",
            title: "Preventing IT Band Syndrome",
            author: "Physio Elena",
            date: "June 20, 2026",
            readtime: "4 min read",
            category: "Recovery",
            excerpt: "Targeted strength routines and mobility work to keep your knees pain-free during training cycles.",
            body: "<p>Iliotibial Band (ITB) Syndrome is one of the most frustrating lateral knee issues runners encounter. Although you feel the pain on the outside of the knee joint, the root cause is rarely the band itself.</p><h3>The Gluteus Medius Link</h3><p>In most runners, ITB pain is triggered by a lack of lateral hip stability. When your hip drops on your weight-bearing step, it puts excess rotational tension on the IT band. Strengthening the gluteus medius and tensor fasciae latae is the ultimate remedy.</p><h3>Essential Strengthening Exercises</h3><ul><li><strong>Clamshells:</strong> 3 sets of 15 repeats on each side.</li><li><strong>Side-lying Leg Raises:</strong> Keep toe pointed slightly down to isolate the lateral hip.</li><li><strong>Single-leg Glute Bridges:</strong> Hold for 3 seconds at the peak extension.</li></ul>"
        }
    ],
    feed: [
        {
            id: "post-01",
            author: "David Kiptum",
            content: "Sunset miles over the Bay Bridge with the Tuesday crew. Paced a smooth 4:55/km! Stride felt effortless.",
            dist: 12.4,
            pace: "4:55",
            likes: 24,
            comments: [
                { author: "Sarah Chen", text: "Stunning pace, David! See you Thursday." }
            ],
            time: "2 hours ago",
            liked: false
        },
        {
            id: "post-02",
            author: "Jessica Miller",
            content: "First time breaking 5km without walking breaks! Couch to Community Run schedule is working wonders.",
            dist: 5.1,
            pace: "6:20",
            likes: 42,
            comments: [],
            time: "5 hours ago",
            liked: false
        }
    ],
    registrations: [
        { eventId: "evt-01", eventTitle: "Sunday Sunrise 10K", runnerName: "Sam Wilson", runnerEmail: "sam@example.com", runnerPace: "5:30" }
    ],
    contactInquiries: []
};
// Route Maps Coordinate Database (for dynamic Canvas drawing)
const routeCoordinates = {
    "route-bridge": [
        {x: 50, y: 300}, {x: 120, y: 250}, {x: 200, y: 200}, {x: 320, y: 200},
        {x: 450, y: 220}, {x: 580, y: 180}, {x: 650, y: 240}, {x: 720, y: 300},
        {x: 680, y: 320}, {x: 550, y: 310}, {x: 400, y: 330}, {x: 280, y: 320},
        {x: 150, y: 340}, {x: 50, y: 300}
    ],
    "route-trail": [
        {x: 80, y: 320}, {x: 140, y: 280}, {x: 180, y: 220}, {x: 220, y: 150},
        {x: 280, y: 100}, {x: 380, y: 80}, {x: 450, y: 130}, {x: 500, y: 200},
        {x: 560, y: 260}, {x: 640, y: 290}, {x: 700, y: 330}, {x: 580, y: 340},
        {x: 420, y: 320}, {x: 260, y: 330}, {x: 80, y: 320}
    ],
    "route-downtown": [
        {x: 100, y: 100}, {x: 250, y: 100}, {x: 250, y: 250}, {x: 450, y: 250},
        {x: 450, y: 100}, {x: 650, y: 100}, {x: 650, y: 320}, {x: 500, y: 320},
        {x: 500, y: 200}, {x: 350, y: 200}, {x: 350, y: 320}, {x: 100, y: 320},
        {x: 100, y: 100}
    ]
};
const routeElevations = {
    "route-bridge": [10, 12, 15, 18, 22, 28, 35, 32, 25, 20, 18, 15, 12, 10, 10, 10, 12, 14, 12, 10],
    "route-trail": [50, 70, 95, 120, 155, 190, 220, 240, 235, 210, 180, 150, 130, 110, 90, 75, 60, 50, 50, 50],
    "route-downtown": [20, 20, 22, 25, 28, 35, 45, 50, 65, 80, 95, 110, 100, 85, 70, 55, 40, 30, 22, 20]
};
// Canvas drawing loop settings
let routeAnimId = null;
let routeAnimProgress = 0;
/* Initialize Application */
document.addEventListener("DOMContentLoaded", () => {
    initDatabase();
    initNavbar();
    initStatsCounters();
    initProgramsTabs();
    initRouteLibrary();
    initEventsCountdown();
    initEventsList();
    initLeaderboard();
    initCommunityFeed();
    initCalculators();
    initStore();
    initBlog();
    initTestimonials();
    initContactForms();
    initAdminPanel();
});
/* Database State Loader */
function initDatabase() {
    if (!localStorage.getItem("p1mor_db_initialized")) {
        localStorage.setItem("p1mor_members", JSON.stringify(defaultPresets.members));
        localStorage.setItem("p1mor_events", JSON.stringify(defaultPresets.events));
        localStorage.setItem("p1mor_products", JSON.stringify(defaultPresets.products));
        localStorage.setItem("p1mor_blogs", JSON.stringify(defaultPresets.blogs));
        localStorage.setItem("p1mor_feed", JSON.stringify(defaultPresets.feed));
        localStorage.setItem("p1mor_registrations", JSON.stringify(defaultPresets.registrations));
        localStorage.setItem("p1mor_contactInquiries", JSON.stringify(defaultPresets.contactInquiries));
        localStorage.setItem("p1mor_db_initialized", "true");
    }
    appState.members = JSON.parse(localStorage.getItem("p1mor_members"));
    appState.events = JSON.parse(localStorage.getItem("p1mor_events"));
    appState.products = JSON.parse(localStorage.getItem("p1mor_products"));
    appState.blogs = JSON.parse(localStorage.getItem("p1mor_blogs"));
    appState.feed = JSON.parse(localStorage.getItem("p1mor_feed"));
    appState.registrations = JSON.parse(localStorage.getItem("p1mor_registrations"));
    appState.contactInquiries = JSON.parse(localStorage.getItem("p1mor_contactInquiries"));
}
function saveDatabaseToLocalStorage() {
    localStorage.setItem("p1mor_members", JSON.stringify(appState.members));
    localStorage.setItem("p1mor_events", JSON.stringify(appState.events));
    localStorage.setItem("p1mor_products", JSON.stringify(appState.products));
    localStorage.setItem("p1mor_blogs", JSON.stringify(appState.blogs));
    localStorage.setItem("p1mor_feed", JSON.stringify(appState.feed));
    localStorage.setItem("p1mor_registrations", JSON.stringify(appState.registrations));
    localStorage.setItem("p1mor_contactInquiries", JSON.stringify(appState.contactInquiries));
}
/* Navbar Logic */
function initNavbar() {
    const navbar = document.getElementById("main-navbar");
    const menuToggle = document.getElementById("menu-toggle");
    
    // Scroll state transform
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    // Mobile nav drawer
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("mobile-open");
    });
    // Close mobile nav on click item
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            navbar.classList.remove("mobile-open");
        });
    });
}
/* Stats Counter Animation */
function initStatsCounters() {
    const counters = document.querySelectorAll(".counter");
    const observerOptions = {
        threshold: 0.5
    };
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetVal = parseInt(target.getAttribute("data-target"));
                let currentVal = 0;
                const increment = Math.ceil(targetVal / 100);
                const timer = setInterval(() => {
                    currentVal += increment;
                    if (currentVal >= targetVal) {
                        target.innerText = targetVal.toLocaleString();
                        clearInterval(timer);
                    } else {
                        target.innerText = currentVal.toLocaleString();
                    }
                }, 15);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    counters.forEach(counter => statsObserver.observe(counter));
}
/* Programs Tab Panels */
function initProgramsTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetId = btn.getAttribute("data-tab");
            document.querySelectorAll(".tab-pane").forEach(pane => {
                pane.classList.remove("active");
            });
            document.getElementById(targetId).classList.add("active");
        });
    });
}
function showProgramDetails(programName) {
    alert(`Guide Requested: An interactive training PDF manual for the ${programName} program has been simulated as starting download!`);
}
/* GPS Routes Canvas & Elevations Drawer */
function initRouteLibrary() {
    const cards = document.querySelectorAll(".route-selector-card");
    
    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            
            const routeId = card.getAttribute("data-route-id");
            loadRouteDetails(routeId);
        });
    });
    // Initial load
    loadRouteDetails("route-bridge");
}
function loadRouteDetails(routeId) {
    const title = document.getElementById("display-route-title");
    const distance = document.getElementById("display-route-dist");
    const elev = document.getElementById("display-route-elev");
    const pace = document.getElementById("display-route-pace");
    const terrain = document.getElementById("display-route-terrain");
    if (routeId === "route-bridge") {
        title.innerText = "Bay Bridge Sunset Loop";
        distance.innerText = "6.2 km";
        elev.innerText = "+35m";
        pace.innerText = "5:15 /km";
        terrain.innerText = "Tarmac Boardwalk";
    } else if (routeId === "route-trail") {
        title.innerText = "Redwood Trail Summit";
        distance.innerText = "10.5 km";
        elev.innerText = "+240m";
        pace.innerText = "6:10 /km";
        terrain.innerText = "Dirt & Loose Gravel";
    } else if (routeId === "route-downtown") {
        title.innerText = "City Lights Midnight Run";
        distance.innerText = "16.0 km";
        elev.innerText = "+110m";
        pace.innerText = "5:05 /km";
        terrain.innerText = "Concrete sidewalks";
    }
    // Populate Elevation Bars
    const elevProfile = routeElevations[routeId];
    const elevContainer = document.getElementById("elev-chart-bars");
    elevContainer.innerHTML = "";
    
    const maxVal = Math.max(...elevProfile);
    
    elevProfile.forEach((val) => {
        const barHeight = (val / maxVal) * 100;
        const bar = document.createElement("div");
        bar.className = "elev-bar";
        bar.style.height = `${barHeight}%`;
        bar.setAttribute("title", `${val}m`);
        elevContainer.appendChild(bar);
    });
    // Draw GPS coordinates on Canvas
    drawRouteCanvas(routeId);
}
function drawRouteCanvas(routeId) {
    const canvas = document.getElementById("route-map-canvas");
    const ctx = canvas.getContext("2d");
    
    // Stop any previous drawing animation loop
    if (routeAnimId) cancelAnimationFrame(routeAnimId);
    
    // Set fixed high definition dimensions
    canvas.width = 800;
    canvas.height = 350;
    
    const coords = routeCoordinates[routeId];
    routeAnimProgress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Grid background drawing
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let j = 0; j < canvas.height; j += 40) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(canvas.width, j);
            ctx.stroke();
        }
        // Draw static route outline path (Electric Blue subtle glow)
        ctx.beginPath();
        ctx.moveTo(coords[0].x, coords[0].y);
        for(let i=1; i < coords.length; i++) {
            ctx.lineTo(coords[i].x, coords[i].y);
        }
        ctx.strokeStyle = "rgba(0, 82, 255, 0.35)";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        // Draw moving animated line segment
        const animatedSegments = Math.floor(coords.length * routeAnimProgress);
        ctx.beginPath();
        ctx.moveTo(coords[0].x, coords[0].y);
        for(let i=1; i <= animatedSegments; i++) {
            if(i < coords.length) {
                ctx.lineTo(coords[i].x, coords[i].y);
            }
        }
        
        // Calculate point between segment
        if (animatedSegments < coords.length - 1) {
            const lastCoord = coords[animatedSegments];
            const nextCoord = coords[animatedSegments + 1];
            const segmentProgress = (coords.length * routeAnimProgress) - animatedSegments;
            const currentX = lastCoord.x + (nextCoord.x - lastCoord.x) * segmentProgress;
            const currentY = lastCoord.y + (nextCoord.y - lastCoord.y) * segmentProgress;
            ctx.lineTo(currentX, currentY);
            
            // Draw runner dot
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#00e5ff";
            ctx.beginPath();
            ctx.arc(currentX, currentY, 8, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.strokeStyle = "#0052ff";
        ctx.lineWidth = 4;
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 12;
        ctx.stroke();
        // Draw start / finish icons
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px Outfit";
        ctx.fillText("START/END", coords[0].x - 30, coords[0].y - 12);
        
        ctx.fillStyle = "#00e5ff";
        ctx.beginPath();
        ctx.arc(coords[0].x, coords[0].y, 6, 0, 2 * Math.PI);
        ctx.fill();
        routeAnimProgress += 0.003;
        if (routeAnimProgress > 1) {
            routeAnimProgress = 0; // restart loop
        }
        
        routeAnimId = requestAnimationFrame(animate);
    }
    
    animate();
}
/* Event Countdown Timer */
function initEventsCountdown() {
    const raceCountdownElement = document.getElementById("race-countdown-timer");
    
    // Find next race event
    const races = appState.events.filter(e => e.type === "race" && e.timestamp > Date.now());
    if (races.length === 0) {
        document.querySelector(".countdown-banner").style.display = "none";
        return;
    }
    
    // Sort ascending by time
    races.sort((a, b) => a.timestamp - b.timestamp);
    const targetRace = races[0];
    
    document.getElementById("countdown-race-name").innerText = targetRace.title;
    function updateTimer() {
        const now = Date.now();
        const difference = targetRace.timestamp - now;
        if (difference <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timer-days").innerText = "00";
            document.getElementById("timer-hours").innerText = "00";
            document.getElementById("timer-mins").innerText = "00";
            document.getElementById("timer-secs").innerText = "00";
            return;
        }
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);
        document.getElementById("timer-days").innerText = String(days).padStart(2, "0");
        document.getElementById("timer-hours").innerText = String(hours).padStart(2, "0");
        document.getElementById("timer-mins").innerText = String(mins).padStart(2, "0");
        document.getElementById("timer-secs").innerText = String(secs).padStart(2, "0");
    }
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}
/* Render Events Section */
function initEventsList() {
    const container = document.getElementById("events-list-container");
    const filters = document.querySelectorAll(".filter-btn");
    
    let activeFilter = "all";
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter");
            render();
        });
    });
    function render() {
        container.innerHTML = "";
        
        let filteredEvents = appState.events;
        if (activeFilter !== "all") {
            filteredEvents = appState.events.filter(e => e.type === activeFilter);
        }
        // Sort events chronologically
        filteredEvents.forEach(evt => {
            const card = document.createElement("div");
            card.className = "event-card";
            
            let badgeText = "Run";
            if (evt.type === "social") badgeText = "Social Group Run";
            if (evt.type === "race") badgeText = "Official Race";
            if (evt.type === "track") badgeText = "Track Session";
            card.innerHTML = `
                <div class="event-card-body">
                    <span class="badge badge-blue event-type-badge">${badgeText}</span>
                    <h3 class="event-card-title">${evt.title}</h3>
                    <p class="event-card-desc">${evt.desc}</p>
                    <ul class="event-details">
                        <li><strong>Date:</strong> ${evt.date}</li>
                        <li><strong>Start:</strong> ${evt.loc}</li>
                        <li><strong>Distance:</strong> ${evt.dist}</li>
                    </ul>
                </div>
                <div class="event-card-footer">
                    <button class="btn btn-primary btn-block" onclick="openEventRegModal('${evt.id}')">Register Spot</button>
                </div>
            `;
            container.appendChild(card);
        });
        if (filteredEvents.length === 0) {
            container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 3rem 0;">No upcoming runs matching this filter.</p>`;
        }
    }
    render();
}
// Event Registration Modal Controls
window.openEventRegModal = function(eventId) {
    const evt = appState.events.find(e => e.id === eventId);
    if (!evt) return;
    document.getElementById("event-reg-id").value = evt.id;
    document.getElementById("modal-event-details").innerText = `${evt.title} - scheduled for ${evt.date} starting from ${evt.loc}. Target: ${evt.dist}`;
    document.getElementById("event-reg-modal").style.display = "flex";
};
window.closeEventRegModal = function() {
    document.getElementById("event-reg-modal").style.display = "none";
    document.getElementById("event-reg-form").reset();
};
document.getElementById("event-reg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const eventId = document.getElementById("event-reg-id").value;
    const evt = appState.events.find(ev => ev.id === eventId);
    const runnerName = document.getElementById("event-user-name").value;
    const runnerEmail = document.getElementById("event-user-email").value;
    const runnerPace = document.getElementById("event-user-pace").value;
    appState.registrations.push({
        eventId: eventId,
        eventTitle: evt.title,
        runnerName: runnerName,
        runnerEmail: runnerEmail,
        runnerPace: runnerPace
    });
    saveDatabaseToLocalStorage();
    closeEventRegModal();
    renderRegistrationsAdmin();
    alert(`Success! Registration confirmed. We have logged your spot for the ${evt.title}. See you on the run!`);
});
/* Leaderboard */
function initLeaderboard() {
    const search = document.getElementById("leaderboard-search");
    const sortBy = document.getElementById("leaderboard-sort");
    
    search.addEventListener("input", render);
    sortBy.addEventListener("change", render);
    function render() {
        const query = search.value.toLowerCase();
        const sortMetric = sortBy.value;
        const rowsContainer = document.getElementById("leaderboard-rows");
        rowsContainer.innerHTML = "";
        // Copy and sort
        let list = [...appState.members];
        
        // Filter
        if (query) {
            list = list.filter(m => m.name.toLowerCase().includes(query));
        }
        // Sort
        list.sort((a, b) => b[sortMetric] - a[sortMetric]);
        list.forEach((runner, idx) => {
            const row = document.createElement("tr");
            
            // Format rank styles
            let rankClass = "";
            let rankDisplay = idx + 1;
            if (idx === 0) rankClass = "rank-1";
            if (idx === 1) rankClass = "rank-2";
            if (idx === 2) rankClass = "rank-3";
            // Format badges html
            let badgesHtml = runner.badges.map(b => `<span class="badge-item-icon" title="Unlocked Badge">${b}</span>`).join(" ");
            row.innerHTML = `
                <td class="rank-col ${rankClass}">${rankDisplay}</td>
                <td class="runner-name">${runner.name}</td>
                <td class="dist-col">${runner.dist.toFixed(1)} km</td>
                <td>${runner.runs}</td>
                <td>+${runner.elevation}m</td>
                <td class="badges-col">${badgesHtml || '-'}</td>
            `;
            rowsContainer.appendChild(row);
        });
    }
    render();
}
/* Community Feed */
function initCommunityFeed() {
    const postForm = document.getElementById("community-post-form");
    
    postForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const author = document.getElementById("feed-post-author").value;
        const content = document.getElementById("feed-post-content").value;
        const distVal = parseFloat(document.getElementById("feed-post-dist").value);
        const paceVal = document.getElementById("feed-post-pace").value;
        const newPost = {
            id: `post-${Date.now()}`,
            author: author,
            content: content,
            dist: isNaN(distVal) ? null : distVal,
            pace: paceVal || null,
            likes: 0,
            comments: [],
            time: "Just now",
            liked: false
        };
        appState.feed.unshift(newPost);
        saveDatabaseToLocalStorage();
        postForm.reset();
        renderFeed();
    });
    renderFeed();
}
function renderFeed() {
    const container = document.getElementById("community-feed-posts");
    container.innerHTML = "";
    appState.feed.forEach(post => {
        const postCard = document.createElement("div");
        postCard.className = "feed-post";
        
        // Activity stats overlay html
        let statsHtml = "";
        if (post.dist || post.pace) {
            statsHtml = `
                <div class="feed-post-metrics">
                    ${post.dist ? `<div><span class="detail-label">Distance</span><span class="feed-metric-val">${post.dist} km</span></div>` : ""}
                    ${post.pace ? `<div><span class="detail-label">Pace</span><span class="feed-metric-val">${post.pace} /km</span></div>` : ""}
                </div>
            `;
        }
        // Render Comments List
        let commentsListHtml = post.comments.map(c => `
            <div style="background-color: rgba(255,255,255,0.01); border-left: 2px solid var(--electric-blue); padding: 0.5rem 1rem; margin-top: 0.5rem; font-size: 0.85rem;">
                <strong>${c.author}:</strong> <span style="color: var(--color-grey-light);">${c.text}</span>
            </div>
        `).join("");
        postCard.innerHTML = `
            <div class="feed-post-header">
                <span class="feed-post-user">${post.author}</span>
                <span class="feed-post-time">${post.time}</span>
            </div>
            <div class="feed-post-content">
                <p>${post.content}</p>
            </div>
            ${statsHtml}
            <div class="feed-post-actions">
                <button class="feed-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLikePost('${post.id}')">
                    🧡 <span id="like-count-${post.id}">${post.likes}</span> Likes
                </button>
                <button class="feed-action-btn" onclick="toggleCommentBox('${post.id}')">
                    💬 Comment
                </button>
            </div>
            <div id="comment-section-${post.id}" style="margin-top: 1rem;">
                <div id="comments-list-${post.id}">
                    ${commentsListHtml}
                </div>
                <div class="d-none" id="comment-input-container-${post.id}" style="display: grid; grid-template-columns: 1fr 80px; gap: 0.5rem; margin-top: 1rem;">
                    <input type="text" id="comment-text-${post.id}" placeholder="Write encouragement..." class="form-control" style="padding: 0.5rem;">
                    <button class="btn btn-primary" style="padding: 0.5rem;" onclick="addCommentToPost('${post.id}')">Post</button>
                </div>
            </div>
        `;
        container.appendChild(postCard);
    });
}
window.toggleLikePost = function(postId) {
    const post = appState.feed.find(f => f.id === postId);
    if (!post) return;
    if (post.liked) {
        post.likes--;
        post.liked = false;
    } else {
        post.likes++;
        post.liked = true;
    }
    saveDatabaseToLocalStorage();
    renderFeed();
};
window.toggleCommentBox = function(postId) {
    const box = document.getElementById(`comment-input-container-${postId}`);
    box.classList.toggle("d-none");
};
window.addCommentToPost = function(postId) {
    const post = appState.feed.find(f => f.id === postId);
    const input = document.getElementById(`comment-text-${postId}`);
    const text = input.value.trim();
    if (!text) return;
    
    post.comments.push({
        author: "You",
        text: text
    });
    saveDatabaseToLocalStorage();
    input.value = "";
    renderFeed();
};
/* Athlete Toolkit Calculators */
function initCalculators() {
    const paceTabBtns = document.querySelectorAll("#pace-calc-container .calc-tab-btn");
    const paceCalcBtn = document.getElementById("btn-run-pace-calc");
    const bmiCalcBtn = document.getElementById("btn-run-bmi-calc");
    
    let activePaceMode = "pace"; // pace | time
    // Pace presets select
    document.getElementById("pace-dist-preset").addEventListener("change", (e) => {
        const val = e.target.value;
        if (val !== "custom") {
            document.getElementById("pace-dist-input").value = val;
        }
    });
    paceTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            paceTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activePaceMode = btn.getAttribute("data-calc-mode");
            
            if (activePaceMode === "pace") {
                document.getElementById("calc-time-inputs").classList.remove("d-none");
                document.getElementById("calc-pace-inputs").classList.add("d-none");
                paceCalcBtn.innerText = "Calculate Pace";
            } else {
                document.getElementById("calc-time-inputs").classList.add("d-none");
                document.getElementById("calc-pace-inputs").classList.remove("d-none");
                paceCalcBtn.innerText = "Calculate Target Time";
            }
        });
    });
    paceCalcBtn.addEventListener("click", () => {
        const distance = parseFloat(document.getElementById("pace-dist-input").value);
        if (isNaN(distance) || distance <= 0) {
            alert("Please enter a valid target distance.");
            return;
        }
        if (activePaceMode === "pace") {
            // Calculate Pace based on Time/Dist
            const hours = parseInt(document.getElementById("pace-hours").value) || 0;
            const mins = parseInt(document.getElementById("pace-mins").value) || 0;
            const secs = parseInt(document.getElementById("pace-secs").value) || 0;
            
            const totalSeconds = (hours * 3600) + (mins * 60) + secs;
            if (totalSeconds <= 0) {
                alert("Please enter a valid time duration.");
                return;
            }
            const paceSecondsPerKm = Math.floor(totalSeconds / distance);
            const paceMin = Math.floor(paceSecondsPerKm / 60);
            const paceSec = paceSecondsPerKm % 60;
            
            const speedKmh = (distance / (totalSeconds / 3600)).toFixed(2);
            
            document.getElementById("pace-calc-val").innerText = `${paceMin}:${String(paceSec).padStart(2, "0")} / km`;
            document.getElementById("pace-calc-desc").innerText = `Requires maintaining a constant speed of ${speedKmh} km/h (or ${(speedKmh / 1.609).toFixed(2)} mph).`;
        } else {
            // Calculate Time based on Pace/Dist
            const paceMin = parseInt(document.getElementById("target-pace-min").value) || 0;
            const paceSec = parseInt(document.getElementById("target-pace-sec").value) || 0;
            const unit = document.getElementById("target-pace-unit").value;
            const paceTotalSeconds = (paceMin * 60) + paceSec;
            if (paceTotalSeconds <= 0) {
                alert("Please enter a valid target running pace.");
                return;
            }
            let factor = 1;
            if (unit === "mile") factor = 1.60934;
            const totalFinishSeconds = Math.floor(distance * paceTotalSeconds * (unit === "mile" ? 1/factor : 1));
            
            const hours = Math.floor(totalFinishSeconds / 3600);
            const minutes = Math.floor((totalFinishSeconds % 3600) / 60);
            const seconds = totalFinishSeconds % 60;
            let timeDisplay = `${minutes}:${String(seconds).padStart(2, "0")}`;
            if (hours > 0) {
                timeDisplay = `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            }
            document.getElementById("pace-calc-val").innerText = timeDisplay;
            document.getElementById("pace-calc-desc").innerText = `Estimated overall finish duration over ${distance} km at target pacing.`;
        }
    });
    // BMI Calculator logic
    bmiCalcBtn.addEventListener("click", () => {
        const weight = parseFloat(document.getElementById("bmi-weight").value);
        const height = parseFloat(document.getElementById("bmi-height").value);
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert("Please input valid metrics for weight and height.");
            return;
        }
        const heightMeters = height / 100;
        const bmi = (weight / (heightMeters * heightMeters)).toFixed(2);
        
        const valElem = document.getElementById("bmi-calc-val");
        const categoryElem = document.getElementById("bmi-category-val");
        const descElem = document.getElementById("bmi-calc-desc");
        valElem.innerText = bmi;
        // Reset categories classes
        categoryElem.className = "bmi-badge";
        
        let category = "Normal";
        let tip = "Healthy weight range. Ideal cardiovascular training capacity. Keep maintaining active mileage.";
        
        if (bmi < 18.5) {
            category = "Underweight";
            categoryElem.classList.add("category-under");
            tip = "Below typical range. Focus on nutrient-rich carbohydrate loading and strength building to increase muscle density.";
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Normal";
            categoryElem.classList.add("category-normal");
            tip = "Optimal cardiovascular conditioning weight. Ideal base for half-marathons and high-intensity interval repeats.";
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
            categoryElem.classList.add("category-over");
            tip = "Slightly elevated. Focus on structural volume pacing runs in Zone 2 to optimize metabolizing fat stores.";
        } else {
            category = "Obese";
            categoryElem.classList.add("category-obese");
            tip = "High index. Recommend low-impact walking intervals combined with light cycling before initiating heavy mileage training blocks.";
        }
        categoryElem.innerText = category;
        descElem.innerText = tip;
    });
}
/* Gear Store & Shopping Cart */
function initStore() {
    const filters = document.querySelectorAll(".store-filter-btn");
    let activeFilter = "all";
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-shop-filter");
            renderProducts();
        });
    });
    // Cart Sidebar toggles
    const cartToggle = document.getElementById("cart-toggle");
    const cartClose = document.getElementById("cart-close");
    const cartSidebar = document.getElementById("cart-sidebar");
    cartToggle.addEventListener("click", () => {
        cartSidebar.classList.add("open");
    });
    cartClose.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
    });
    // Checkout Simulation
    document.getElementById("cart-checkout-btn").addEventListener("click", () => {
        if (appState.cart.length === 0) {
            alert("Your shopping cart is empty!");
            return;
        }
        alert("Proceeding to payment Gateway! Submitting order total of " + document.getElementById("cart-subtotal").innerText);
        appState.cart = [];
        updateCartUI();
        cartSidebar.classList.remove("open");
    });
    renderProducts();
}
function renderProducts() {
    const container = document.getElementById("shop-products-container");
    const activeFilter = document.querySelector(".store-filter-btn.active").getAttribute("data-shop-filter");
    container.innerHTML = "";
    let list = appState.products;
    if (activeFilter !== "all") {
        list = appState.products.filter(p => p.cat === activeFilter);
    }
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image" style="background-image: url('assets/products/${p.img}.jpg')"></div>
            <div class="product-body">
                <span class="product-category">${p.cat}</span>
                <h4 class="product-title">${p.title}</h4>
                <div class="product-footer">
                    <span class="product-price">₹${p.price.toFixed(2)}</span>
                    <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem;" onclick="openProductModal('${p.id}')">View Details</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
window.openProductModal = function(productId) {
    const p = appState.products.find(item => item.id === productId);
    if (!p) return;
    document.getElementById("modal-product-title").innerText = p.title;
    document.getElementById("modal-product-price").innerText = `₹${p.price.toFixed(2)}`;
    document.getElementById("modal-product-desc").innerText = p.desc;
    document.getElementById("modal-product-cat").innerText = p.cat;
    document.getElementById("modal-product-img").style.backgroundImage = `url('assets/products/${p.img}.jpg')`;
    const addAction = document.getElementById("btn-add-to-cart-action");
    // Remove old listeners
    const newAddAction = addAction.cloneNode(true);
    addAction.parentNode.replaceChild(newAddAction, addAction);
    newAddAction.addEventListener("click", () => {
        const size = document.getElementById("product-size-select").value;
        addToCart(p, size);
        closeProductModal();
    });
    document.getElementById("product-modal").style.display = "flex";
};
function closeProductModal() {
    document.getElementById("product-modal").style.display = "none";
}
document.getElementById("product-modal-close").addEventListener("click", closeProductModal);
function addToCart(product, size) {
    appState.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img,
        size: size
    });
    
    updateCartUI();
    document.getElementById("cart-sidebar").classList.add("open"); // open side panel immediately
}
function updateCartUI() {
    const countLabel = document.getElementById("cart-count");
    countLabel.innerText = appState.cart.length;
    const listContainer = document.getElementById("cart-items-list");
    listContainer.innerHTML = "";
    let subtotal = 0;
    appState.cart.forEach((item, idx) => {
        subtotal += item.price;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-img" style="background-image: url('assets/products/${item.img}.jpg')"></div>
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>Size: ${item.size}</p>
                <button class="cart-item-remove" onclick="removeFromCart(${idx})">Remove</button>
            </div>
            <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
        `;
        listContainer.appendChild(cartItem);
    });
    document.getElementById("cart-subtotal").innerText = `₹${subtotal.toFixed(2)}`;
}
window.removeFromCart = function(index) {
    appState.cart.splice(index, 1);
    updateCartUI();
};
/* Dynamic Blog Loading */
function initBlog() {
    const container = document.getElementById("blog-grid-container");
    container.innerHTML = "";
    appState.blogs.forEach(post => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.innerHTML = `
            <div class="blog-card-img" style="background-image: url('assets/hero-bg.jpg')"></div>
            <div class="blog-card-body">
                <div class="blog-card-meta">
                    <span>${post.category}</span> | <span>${post.date}</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="javascript:void(0)" class="blog-card-link" onclick="openBlogReadModal('${post.id}')">Read Full Article &rarr;</a>
            </div>
        `;
        container.appendChild(card);
    });
}
window.openBlogReadModal = function(blogId) {
    const post = appState.blogs.find(b => b.id === blogId);
    if (!post) return;
    document.getElementById("blog-modal-title").innerText = post.title;
    document.getElementById("blog-modal-cat").innerText = post.category;
    document.getElementById("blog-modal-author").innerText = `By ${post.author}`;
    document.getElementById("blog-modal-date").innerText = post.date;
    document.getElementById("blog-modal-readtime").innerText = post.readtime;
    document.getElementById("blog-modal-body").innerHTML = post.body;
    const modal = document.getElementById("blog-read-modal");
    modal.style.display = "flex";
    // Dynamic scroll reading indicator inside modal
    const scrollContainer = modal;
    const bar = document.getElementById("blog-reading-bar");
    
    scrollContainer.addEventListener("scroll", () => {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        bar.style.width = `${scrollPercentage}%`;
    });
};
window.closeBlogReadModal = function() {
    document.getElementById("blog-read-modal").style.display = "none";
    document.getElementById("blog-reading-bar").style.width = "0%";
};
/* Testimonials Carousel */
function initTestimonials() {
    const track = document.getElementById("testimonial-track");
    const cards = document.querySelectorAll(".testimonial-card");
    let index = 0;
    setInterval(() => {
        index++;
        if (index >= cards.length) index = 0;
        track.style.transform = `translateX(-${index * 100}%)`;
    }, 6000);
}
/* Lightbox Photo View */
window.openLightbox = function(element) {
    const bgUrl = element.querySelector('.gallery-img-placeholder').style.backgroundImage;
    const caption = element.querySelector('.gallery-caption').innerText;
    
    const lightboxImg = document.getElementById("lightbox-image");
    lightboxImg.style.backgroundImage = bgUrl;
    document.getElementById("lightbox-caption").innerText = caption;
    
    document.getElementById("lightbox-modal").style.display = "flex";
};
window.closeLightbox = function() {
    document.getElementById("lightbox-modal").style.display = "none";
};
/* Contact Forms Validation & Local Messages Logging */
function initContactForms() {
    const form = document.getElementById("direct-contact-form");
    const newsletter = document.getElementById("newsletter-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("contact-name").value;
        const email = document.getElementById("contact-email").value;
        const type = document.getElementById("contact-subject").value;
        const message = document.getElementById("contact-message").value;
        // Save inquiry in state
        appState.contactInquiries.push({
            name: name,
            email: email,
            subject: type,
            message: message
        });
        saveDatabaseToLocalStorage();
        form.reset();
        renderRegistrationsAdmin();
        alert(`Thank you, ${name}! Your inquiry has been securely sent. A Coach will reach out shortly.`);
    });
    newsletter.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Subscription successful! You are now locked in for weekly running club updates.");
        newsletter.reset();
    });
}
/* Admin Panel System Panel */
function initAdminPanel() {
    const overlay = document.getElementById("admin-panel-overlay");
    const toggleBtn = document.getElementById("admin-dashboard-toggle");
    const closeBtn = document.getElementById("admin-close-btn");
    
    toggleBtn.addEventListener("click", () => {
        overlay.classList.add("open");
        renderAdminTables();
    });
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("open");
        // Reload page elements to reflect changes
        initDatabase();
        initEventsList();
        initLeaderboard();
        initBlog();
        renderProducts();
    });
    // Sidebar tab buttons
    const tabBtns = document.querySelectorAll(".admin-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTab = btn.getAttribute("data-admin-tab");
            document.querySelectorAll(".admin-tab-section").forEach(sec => {
                sec.classList.remove("active");
            });
            document.getElementById(targetTab).classList.add("active");
        });
    });
    // Form Submission Actions
    document.getElementById("admin-add-member-form").addEventListener("submit", handleAddMember);
    document.getElementById("admin-add-event-form").addEventListener("submit", handleAddEvent);
    document.getElementById("admin-add-product-form").addEventListener("submit", handleAddProduct);
    document.getElementById("admin-add-blog-form").addEventListener("submit", handleAddBlog);
}
function renderAdminTables() {
    renderMembersAdmin();
    renderEventsAdmin();
    renderProductsAdmin();
    renderBlogsAdmin();
    renderRegistrationsAdmin();
}
// 1. Members
function renderMembersAdmin() {
    const tbody = document.getElementById("admin-members-rows");
    tbody.innerHTML = "";
    appState.members.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${m.id}</td>
            <td><strong>${m.name}</strong></td>
            <td>${m.dist} km</td>
            <td>${m.runs}</td>
            <td>+${m.elevation}m</td>
            <td>
                <button class="admin-action-delete" onclick="deleteMemberAdmin('${m.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
window.openAddMemberForm = function() {
    document.getElementById("add-member-form-container").classList.remove("d-none");
};
window.closeAddMemberForm = function() {
    document.getElementById("add-member-form-container").classList.add("d-none");
    document.getElementById("admin-add-member-form").reset();
};
function handleAddMember(e) {
    e.preventDefault();
    const name = document.getElementById("am-name").value;
    const dist = parseFloat(document.getElementById("am-dist").value) || 0;
    const runs = parseInt(document.getElementById("am-runs").value) || 0;
    const elev = parseInt(document.getElementById("am-elev").value) || 0;
    const newMember = {
        id: `M-${Math.floor(100 + Math.random() * 900)}`,
        name: name,
        dist: dist,
        runs: runs,
        elevation: elev,
        badges: dist > 50 ? ["🌅"] : []
    };
    appState.members.push(newMember);
    saveDatabaseToLocalStorage();
    closeAddMemberForm();
    renderMembersAdmin();
}
window.deleteMemberAdmin = function(memberId) {
    if (confirm("Are you sure you want to remove this runner from the database?")) {
        appState.members = appState.members.filter(m => m.id !== memberId);
        saveDatabaseToLocalStorage();
        renderMembersAdmin();
    }
};
// 2. Events
function renderEventsAdmin() {
    const tbody = document.getElementById("admin-events-rows");
    tbody.innerHTML = "";
    appState.events.forEach(evt => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${evt.title}</strong></td>
            <td><span class="badge badge-blue">${evt.type}</span></td>
            <td>${evt.date}</td>
            <td>${evt.loc}</td>
            <td>${evt.dist}</td>
            <td>
                <button class="admin-action-delete" onclick="deleteEventAdmin('${evt.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
window.openAddEventForm = function() {
    document.getElementById("add-event-form-container").classList.remove("d-none");
};
window.closeAddEventForm = function() {
    document.getElementById("add-event-form-container").classList.add("d-none");
    document.getElementById("admin-add-event-form").reset();
};
function handleAddEvent(e) {
    e.preventDefault();
    const title = document.getElementById("ae-title").value;
    const type = document.getElementById("ae-type").value;
    const date = document.getElementById("ae-date").value;
    const loc = document.getElementById("ae-loc").value;
    const dist = document.getElementById("ae-dist").value;
    const desc = document.getElementById("ae-desc").value;
    const newEvt = {
        id: `evt-${Date.now()}`,
        title: title,
        type: type,
        date: date,
        loc: loc,
        dist: dist,
        desc: desc,
        timestamp: new Date().getTime() + (7 * 24 * 60 * 60 * 1000) // preset to 7 days from now
    };
    appState.events.push(newEvt);
    saveDatabaseToLocalStorage();
    closeAddEventForm();
    renderEventsAdmin();
}
window.deleteEventAdmin = function(eventId) {
    if (confirm("Are you sure you want to delete this event?")) {
        appState.events = appState.events.filter(e => e.id !== eventId);
        saveDatabaseToLocalStorage();
        renderEventsAdmin();
    }
};
// 3. Products
function renderProductsAdmin() {
    const tbody = document.getElementById("admin-products-rows");
    tbody.innerHTML = "";
    appState.products.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td><strong>${p.title}</strong></td>
            <td>${p.cat}</td>
            <td>₹${p.price.toFixed(2)}</td>
            <td>
                <button class="admin-action-delete" onclick="deleteProductAdmin('${p.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
window.openAddProductForm = function() {
    document.getElementById("add-product-form-container").classList.remove("d-none");
};
window.closeAddProductForm = function() {
    document.getElementById("add-product-form-container").classList.add("d-none");
    document.getElementById("admin-add-product-form").reset();
};
function handleAddProduct(e) {
    e.preventDefault();
    const title = document.getElementById("ap-title").value;
    const cat = document.getElementById("ap-cat").value;
    const price = parseFloat(document.getElementById("ap-price").value) || 0;
    const img = document.getElementById("ap-img").value;
    const desc = document.getElementById("ap-desc").value;
    const newProduct = {
        id: `prd-${Date.now()}`,
        title: title,
        cat: cat,
        price: price,
        img: img,
        desc: desc
    };
    appState.products.push(newProduct);
    saveDatabaseToLocalStorage();
    closeAddProductForm();
    renderProductsAdmin();
}
window.deleteProductAdmin = function(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        appState.products = appState.products.filter(p => p.id !== productId);
        saveDatabaseToLocalStorage();
        renderProductsAdmin();
    }
};
// 4. Blogs
function renderBlogsAdmin() {
    const tbody = document.getElementById("admin-blogs-rows");
    tbody.innerHTML = "";
    appState.blogs.forEach(post => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${post.title}</strong></td>
            <td>${post.author}</td>
            <td>${post.category}</td>
            <td>${post.date}</td>
            <td>
                <button class="admin-action-delete" onclick="deleteBlogAdmin('${post.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
window.openAddBlogForm = function() {
    document.getElementById("add-blog-form-container").classList.remove("d-none");
};
window.closeAddBlogForm = function() {
    document.getElementById("add-blog-form-container").classList.add("d-none");
    document.getElementById("admin-add-blog-form").reset();
};
function handleAddBlog(e) {
    e.preventDefault();
    const title = document.getElementById("ab-title").value;
    const cat = document.getElementById("ab-cat").value;
    const author = document.getElementById("ab-author").value;
    const read = document.getElementById("ab-read").value;
    const body = document.getElementById("ab-body").value;
    const dateToday = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newBlog = {
        id: `blg-${Date.now()}`,
        title: title,
        author: author,
        date: dateToday,
        readtime: read,
        category: cat,
        excerpt: body.substring(0, 100) + "...",
        body: body
    };
    appState.blogs.push(newBlog);
    saveDatabaseToLocalStorage();
    closeAddBlogForm();
    renderBlogsAdmin();
}
window.deleteBlogAdmin = function(blogId) {
    if (confirm("Are you sure you want to delete this blog post?")) {
        appState.blogs = appState.blogs.filter(b => b.id !== blogId);
        saveDatabaseToLocalStorage();
        renderBlogsAdmin();
    }
};
// 5. Registrations & Inquiries
function renderRegistrationsAdmin() {
    const tbodyReg = document.getElementById("admin-reg-rows");
    tbodyReg.innerHTML = "";
    appState.registrations.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${r.eventTitle}</td>
            <td>${r.runnerName}</td>
            <td>${r.runnerEmail}</td>
            <td>${r.runnerPace} min/km</td>
        `;
        tbodyReg.appendChild(tr);
    });
    const tbodyMsg = document.getElementById("admin-msg-rows");
    tbodyMsg.innerHTML = "";
    appState.contactInquiries.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${m.name}</strong><br><span style="font-size:0.75rem; color:var(--color-grey-muted);">${m.email}</span></td>
            <td>${m.subject}</td>
            <td>${m.message}</td>
        `;
        tbodyMsg.appendChild(tr);
    });
}