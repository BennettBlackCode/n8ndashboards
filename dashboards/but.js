```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/luxon@3.0.1/build/global/luxon.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"></script>
    <style>
        :root {
            --primary: #7c4dff;
            --secondary: #ff4081;
            --success: #00c853;
            --info: #00b0ff;
            --warning: #ffab00;
            --danger: #ff5252;
            --light: #f8f9fa;
            --dark: #212529;
            --bg: #f0f2f5;
            --card-bg: #ffffff;
            --shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            --transition: all 0.3s ease;
            --radius: 12px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--bg);
            color: var(--dark);
            min-height: 100vh;
            padding: 20px;
        }

        .dashboard {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .header h1 {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .header h1 i {
            font-size: 32px;
        }

        .date-display {
            font-size: 16px;
            color: var(--dark);
            opacity: 0.7;
        }

        .filter-bar {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .filter-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        select, button {
            background: var(--card-bg);
            border: 1px solid rgba(0,0,0,0.1);
            padding: 8px 15px;
            border-radius: var(--radius);
            font-size: 14px;
            cursor: pointer;
            transition: var(--transition);
        }

        select:hover, button:hover {
            border-color: var(--primary);
        }

        button {
            background: var(--primary);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        button:hover {
            background: #6d45d6;
        }

        button.secondary {
            background: var(--secondary);
        }

        button.secondary:hover {
            background: #e0357a;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .card {
            background: var(--card-bg);
            border-radius: var(--radius);
            padding: 20px;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .card-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--dark);
        }

        .card-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
        }

        .bg-primary { background-color: var(--primary); }
        .bg-secondary { background-color: var(--secondary); }
        .bg-success { background-color: var(--success); }
        .bg-info { background-color: var(--info); }

        .stat {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .stat-desc {
            font-size: 14px;
            color: #666;
        }

        .chart-container {
            position: relative;
            height: 250px;
            margin-top: 10px;
        }

        .activity-list {
            list-style: none;
        }

        .activity-item {
            padding: 12px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .activity-item:last-child {
            border-bottom: none;
        }

        .activity-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
            flex-shrink: 0;
        }

        .activity-content {
            flex-grow: 1;
        }

        .activity-title {
            font-weight: 600;
            margin-bottom: 3px;
        }

        .activity-time {
            font-size: 12px;
            color: #888;
        }

        .cat-list-container {
            height: 300px;
            overflow-y: auto;
        }

        .cat-list {
            list-style: none;
        }

        .cat-item {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            cursor: pointer;
            transition: var(--transition);
        }

        .cat-item:hover {
            background-color: rgba(0,0,0,0.02);
        }

        .cat-image {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            object-fit: cover;
            margin-right: 15px;
            background-color: #eee;
            flex-shrink: 0;
        }

        .cat-info {
            flex-grow: 1;
        }

        .cat-name {
            font-weight: 600;
            margin-bottom: 3px;
        }

        .cat-breed {
            font-size: 13px;
            color: #666;
        }

        .cat-age {
            font-size: 12px;
            background-color: var(--info);
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            white-space: nowrap;
        }

        .badge {
            font-size: 12px;
            padding: 3px 8px;
            border-radius: 12px;
            white-space: nowrap;
            margin-right: 5px;
        }

        .badge-primary {
            background-color: var(--primary);
            color: white;
        }

        .badge-success {
            background-color: var(--success);
            color: white;
        }

        .badge-warning {
            background-color: var(--warning);
            color: white;
        }

        .widget-container {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .widget-header {
            margin-bottom: 15px;
        }

        .widget-content {
            flex-grow: 1;
        }

        .progress-container {
            margin-top: 15px;
        }

        .progress-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 13px;
        }

        .progress-bar-bg {
            height: 8px;
            background-color: #eee;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            border-radius: 4px;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: var(--card-bg);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            width: 100%;
            max-width: 500px;
            padding: 25px;
            position: relative;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-title {
            font-size: 20px;
            font-weight: 700;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 22px;
            cursor: pointer;
            color: #666;
        }

        .cat-details {
            display: flex;
            gap: 25px;
            margin-bottom: 20px;
        }

        .cat-detail-image {
            width: 150px;
            height: 150px;
            border-radius: 12px;
            object-fit: cover;
            background-color: #eee;
        }

        .cat-detail-info {
            flex-grow: 1;
        }

        .cat-detail-name {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .detail-row {
            display: flex;
            margin-bottom: 8px;
        }

        .detail-label {
            width: 100px;
            font-weight: 600;
            color: #666;
        }

        .detail-value {
            flex-grow: 1;
        }

        .badge-container {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            margin-top: 10px;
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            .cat-details {
                flex-direction: column;
            }
            
            .cat-detail-image {
                width: 100%;
                height: 200px;
            }
        }

        .fade-in {
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #999;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <header class="header">
            <h1><i class="fas fa-cat"></i> Purrfect Dashboard</h1>
            <div class="date-display">Today: <span id="currentDate"></span></div>
        </header>

        <div class="filter-bar">
            <div class="filter-item">
                <label for="breed-filter">Breed:</label>
                <select id="breed-filter">
                    <option value="all">All Breeds</option>
                    <option value="siamese">Siamese</option>
                    <option value="persian">Persian</option>
                    <option value="maine-coon">Maine Coon</option>
                    <option value="bengal">Bengal</option>
                    <option value="ragdoll">Ragdoll</option>
                </select>
            </div>
            <div class="filter-item">
                <label for="age-filter">Age:</label>
                <select id="age-filter">
                    <option value="all">All Ages</option>
                    <option value="kitten">Kitten (0-1 year)</option>
                    <option value="young">Young (1-3 years)</option>
                    <option value="adult">Adult (3-10 years)</option>
                    <option value="senior">Senior (10+ years)</option>
                </select>
            </div>
            <div class="filter-item">
                <button id="refresh-btn"><i class="fas fa-sync-alt"></i> Refresh Data</button>
            </div>
            <div class="filter-item">
                <button class="secondary" id="add-cat-btn"><i class="fas fa-plus"></i> Add New Cat</button>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Total Cats</h2>
                    <div class="card-icon bg-primary">
                        <i class="fas fa-cat"></i>
                    </div>
                </div>
                <div class="stat" id="total-cats">32</div>
                <div class="stat-desc"><span class="positive-change">+5</span> from last month</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Available for Adoption</h2>
                    <div class="card-icon bg-secondary">
                        <i class="fas fa-home"></i>
                    </div>
                </div>
                <div class="stat" id="available-cats">24</div>
                <div class="stat-desc"><span class="positive-change">+2</span> new additions</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Recently Adopted</h2>
                    <div class="card-icon bg-success">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
                <div class="stat" id="adopted-cats">8</div>
                <div class="stat-desc">Last 30 days</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Veterinary Visits</h2>
                    <div class="card-icon bg-info">
                        <i class="fas fa-stethoscope"></i>
                    </div>
                </div>
                <div class="stat" id="vet-visits">12</div>
                <div class="stat-desc">This month</div>
            </div>
        </div>

        <div class="grid">
            <div class="card" style="grid-column: span 2;">
                <div class="card-header">
                    <h2 class="card-title">Adoption Trends</h2>
                    <select id="trend-period">
                        <option value="week">This Week</option>
                        <option value="month" selected>This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="adoptionChart"></canvas>
                </div>
            </div>
            <div class="card" style="grid-column: span 1;">
                <div class="card-header">
                    <h2 class="card-title">Cat Breeds</h2>
                </div>
                <div class="chart-container">
                    <canvas id="breedChart"></canvas>
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="card" style="grid-column: span 2;">
                <div class="widget-container">
                    <div class="widget-header">
                        <h2 class="card-title">Cat Registry</h2>
                    </div>
                    <div class="widget-content cat-list-container">
                        <ul class="cat-list" id="cat-list">
                            <!-- Cat items will be populated by JavaScript -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="widget-container">
                    <div class="widget-header">
                        <h2 class="card-title">Recent Activity</h2>
                    </div>
                    <div class="widget-content">
                        <ul class="activity-list" id="activity-list">
                            <!-- Activity items will be populated by JavaScript -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Shelter Capacity</h2>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Current Occupancy</span>
                        <span id="occupancy-rate">75%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar bg-primary" style="width: 75%;"></div>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Adoption Rate</span>
                        <span id="adoption-rate">62%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar bg-success" style="width: 62%;"></div>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Vaccination Status</span>
                        <span id="vaccination-rate">90%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar bg-info" style="width: 90%;"></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Age Distribution</h2>
                </div>
                <div class="chart-container">
                    <canvas id="ageChart"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Health Status</h2>
                </div>
                <div class="chart-container">
                    <canvas id="healthChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Cat Detail Modal -->
    <div class="modal" id="cat-modal">
        <div class="modal-content fade-in">
            <div class="modal-header">
                <h3 class="modal-title">Cat Details</h3>
                <button class="close-modal" id="close-modal">&times;</button>
            </div>
            <div class="cat-details" id="cat-details-container">
                <!-- Cat details will be populated by JavaScript -->
            </div>
            <div class="modal-actions">
                <button id="adopt-button"><i class="fas fa-heart"></i> Adopt</button>
                <button id="vet-button" style="background-color: var(--info);"><i class="fas fa-stethoscope"></i> Schedule Vet Visit</button>
            </div>
        </div>
    </div>

    <script>
        // Current date display
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Sample cat data
        const cats = [
            { id: 1, name: "Whiskers", breed: "Siamese", age: 2, image: "https://placekitten.com/200/300", status: "Available", health: "Excellent", color: "Cream", gender: "Male", arrived: "2023-10-15", vaccinated: true, neutered: true, personality: ["Playful", "Calm", "Friendly"] },
            { id: 2, name: "Mittens", breed: "Maine Coon", age: 4, image: "https://placekitten.com/201/301", status: "Available", health: "Good", color: "Tabby", gender: "Female", arrived: "2023-09-20", vaccinated: true, neutered: true, personality: ["Shy", "Gentle"] },
            { id: 3, name: "Shadow", breed: "Bengal", age: 1, image: "https://placekitten.com/202/302", status: "Pending Adoption", health: "Excellent", color: "Spotted", gender: "Male", arrived: "2023-11-01", vaccinated: true, neutered: false, personality: ["Active", "Curious", "Vocal"] },
            { id: 4, name: "Luna", breed: "Ragdoll", age: 3, image: "https://placekitten.com/203/303", status: "Available", health: "Good", color: "Cream & Brown", gender: "Female", arrived: "2023-10-05", vaccinated: true, neutered: true, personality: ["Calm", "Gentle", "Affectionate"] },
            { id: 5, name: "Oliver", breed: "Persian", age: 5, image: "https://placekitten.com/204/304", status: "Available", health: "Fair", color: "White", gender: "Male", arrived: "2023-08-15", vaccinated: true, neutered: true, personality: ["Lazy", "Quiet"] },
            { id: 6, name: "Bella", breed: "Siamese", age: 1, image: "https://placekitten.com/205/305", status: "Available", health: "Excellent", color: "Seal Point", gender: "Female", arrived: "2023-11-10", vaccinated: true, neutered: false, personality: ["Playful", "Vocal", "Energetic"] },
            { id: 7, name: "Max", breed: "Bengal", age: 2, image: "https://placekitten.com/206/306", status: "Recently Adopted", health: "Excellent", color: "Brown Spotted", gender: "Male", arrived: "2023-09-01", vaccinated: true, neutered: true, personality: ["Adventurous", "Athletic"] },
            { id: 8, name: "Daisy", breed: "Persian", age: 7, image: "https://placekitten.com/207/307", status: "Available", health: "Good", color: "Grey", gender: "Female", arrived: "2023-07-20", vaccinated: true, neutered: true, personality: ["Calm", "Independent"] },
            { id: 9, name: "Charlie", breed: "Maine Coon", age: 3, image: "https://placekitten.com/208/308", status: "Recently Adopted", health: "Excellent", color: "Brown Tabby", gender: "Male", arrived: "2023-08-25", vaccinated: true, neutered: true, personality: ["Friendly", "Intelligent"] },
            { id: 10, name: "Lucy", breed: "Ragdoll", age: 2, image: "https://placekitten.com/209/309", status: "Available", health: "Good", color: "Seal Mitted", gender: "Female", arrived: "2023-10-10", vaccinated: true, neutered: true, personality: ["Sweet", "Relaxed", "Affectionate"] },
            { id: 11, name: "Simba", breed: "Maine Coon", age: 1, image: "https://placekitten.com/210/310", status: "Available", health: "Excellent", color: "Orange", gender: "Male", arrived: "2023-11-05", vaccinated: true, neutered: false, personality: ["Bold", "Adventurous", "Social"] },
            { id: 12, name: "Chloe", breed: "Bengal", age: 4, image: "https://placekitten.com/211/311", status: "Available", health: "Good", color: "Snow Spotted", gender: "Female", arrived: "2023-09-15", vaccinated: true, neutered: true, personality: ["Energetic", "Intelligent", "Playful"] }
        ];

        // Sample activity data
        const activities = [
            { type: "adoption", title: "Max was adopted", time: "2 hours ago", icon: "fas fa-heart", bgColor: "bg-success" },
            { type: "new", title: "Luna arrived at the shelter", time: "Yesterday", icon: "fas fa-plus", bgColor: "bg-primary" },
            { type: "medical", title: "Whiskers had a vet checkup", time: "2 days ago", icon: "fas fa-stethoscope", bgColor: "bg-info" },
            { type: "adoption", title: "Charlie was adopted", time: "3 days ago", icon: "fas fa-heart", bgColor: "bg-success" },
            { type: "medical", title: "Vaccination day for 5 cats", time: "1 week ago", icon: "fas fa-syringe", bgColor: "bg-info" }
        ];

        // Populate the cat list
        function populateCatList() {
            const catList = document.getElementById('cat-list');
            catList.innerHTML = '';
            
            const breedFilter = document.getElementById('breed-filter').value;
            const ageFilter = document.getElementById('age-filter').value;
            
            const filteredCats = cats.filter(cat => {
                const breedMatch = breedFilter === 'all' || cat.breed.toLowerCase() === breedFilter;
                
                let ageMatch = true;
                if (ageFilter === 'kitten') ageMatch = cat.age < 1;
                else if (ageFilter === 'young') ageMatch = cat.age >= 1 && cat.age < 3;
                else if (ageFilter === 'adult') ageMatch = cat.age >= 3 && cat.age < 10;
                else if (ageFilter === 'senior') ageMatch = cat.age >= 10;
                
                return breedMatch && ageMatch;
            });
            
            filteredCats.forEach(cat => {
                const item = document.createElement('li');
                item.className = 'cat-item';
                item.setAttribute('data-id', cat.id);
                
                const statusClass = cat.status === 'Available' ? 'badge-success' : 
                                    cat.status === 'Recently Adopted' ? 'badge-primary' : 'badge-warning';
                
                item.innerHTML = `
                    <img src="${cat.image}" alt="${cat.name}" class="cat-image">
                    <div class="cat-info">
                        <div class="cat-name">${cat.name}</div>
                        <div class="cat-breed">${cat.breed}</div>
                    </div>
                    <div class="badge ${statusClass}">${cat.status}</div>
                    <div class="cat-age">${cat.age} yr${cat.age !== 1 ? 's' : ''}</div>
                `;
                
                item.addEventListener('click', () => showCatDetails(cat));
                catList.appendChild(item);
            });
            
            // Update total numbers
            document.getElementById('total-cats').textContent = cats.length;
            document.getElementById('available-cats').textContent = cats.filter(cat => cat.status === 'Available').length;
            document.getElementById('adopted-cats').textContent = cats.filter(cat => cat.status === 'Recently Adopted').length;
        }

        // Populate activity list
        function populateActivityList() {
            const activityList = document.getElementById('activity-list');
            activityList.innerHTML = '';
            
            activities.forEach(activity => {
                const item = document.createElement('li');
                item.className = 'activity-item';
                
                item.innerHTML = `
                    <div class="activity-icon ${activity.bgColor}">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                `;
                
                activityList.appendChild(item);
            });
        }

        // Show cat details modal
        function showCatDetails(cat) {
            const modal = document.getElementById('cat-modal');
            const detailsContainer = document.getElementById('cat-details-container');
            
            detailsContainer.innerHTML = `
                <img src="${cat.image}" alt="${cat.name}" class="cat-detail-image">
                <div class="cat-detail-info">
                    <div class="cat-detail-name">${cat.name}</div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Breed:</div>
                        <div class="detail-value">${cat.breed}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Age:</div>
                        <div class="detail-value">${cat.age} year${cat.age !== 1 ? 's' : ''}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Gender:</div>
                        <div class="detail-value">${cat.gender}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Color:</div>
                        <div class="detail-value">${cat.color}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Health:</div>
                        <div class="detail-value">${cat.health}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Status:</div>
                        <div class="detail-value">${cat.status}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Arrived:</div>
                        <div class="detail-value">${new Date(cat.arrived).toLocaleDateString()}</div>
                    </div>
                    
                    <div class="badge-container">
                        ${cat.vaccinated ? '<span class="badge badge-primary">Vaccinated</span>' : ''}
                        ${cat.neutered ? '<span class="badge badge-primary">Neutered/Spayed</span>' : ''}
                    </div>
                    
                    <div class="badge-container">
                        ${cat.personality.map(trait => `<span class="badge badge-success">${trait}</span>`).join('')}
                    </div>
                </div>
            `;
            
            // Set modal button state based on cat status
            const adoptButton = document.getElementById('adopt-button');
            if (cat.status === 'Available') {
                adoptButton.style.display = 'inline-block';
                adoptButton.textContent = 'Adopt';
            } else if (cat.status === 'Pending Adoption') {
                adoptButton.style.display = 'inline-block';
                adoptButton.textContent = 'Adoption Pending';
                adoptButton.disabled = true;
            } else {
                adoptButton.style.display = 'none';
            }
            
            // Show the modal
            modal.style.display = 'flex';
        }

        // Close modal
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('cat-modal').style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('cat-modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Setup Charts
        function setupCharts() {
            // Adoption trends chart
            const adoptionCtx = document.getElementById('adoptionChart').getContext('2d');
            const adoptionChart = new Chart(adoptionCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Incoming Cats',
                        data: [5, 7, 4, 6, 8, 10, 8, 12, 9, 11, 13, 8],
                        borderColor: '#7c4dff',
                        backgroundColor: 'rgba(124, 77, 255, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }, {
                        label: 'Adoptions',
                        data: [3, 5, 3, 4, 6, 7, 6, 8, 7, 9, 8, 6],
                        borderColor: '#ff4081',
                        backgroundColor: 'rgba(255, 64, 129, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Breed distribution chart
            const breedCtx = document.getElementById('breedChart').getContext('2d');
            const breedChart = new Chart(breedCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Siamese', 'Maine Coon', 'Persian', 'Bengal', 'Ragdoll', 'Other'],
                    datasets: [{
                        data: [20, 15, 12, 18, 10, 25],
                        backgroundColor: [
                            '#7c4dff', '#ff4081', '#00c853', '#00b0ff', '#ffab00', '#ff5252'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    }
                }
            });

            // Age distribution chart
            const ageCtx = document.getElementById('ageChart').getContext('2d');
            const ageChart = new Chart(ageCtx, {
                type: 'bar',
                data: {
                    labels: ['Kitten (0-1)', 'Young (1-3)', 'Adult (3-10)', 'Senior (10+)'],
                    datasets: [{
                        label: 'Number of Cats',
                        data: [15, 25, 40, 20],
                        backgroundColor: [
                            'rgba(255, 171, 0, 0.7)', 
                            'rgba(0, 176, 255, 0.7)', 
                            'rgba(124, 77, 255, 0.7)', 
                            'rgba(0, 200, 83, 0.7)'
                        ],
                        borderColor: [
                            'rgb(255, 171, 0)', 
                            'rgb(0, 176, 255)', 
                            'rgb(124, 77, 255)', 
                            'rgb(0, 200, 83)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Health status chart
            const healthCtx = document.getElementById('healthChart').getContext('2d');
            const healthChart = new Chart(healthCtx, {
                type: 'pie',
                data: {
                    labels: ['Excellent', 'Good', 'Fair', 'Needs Attention'],
                    datasets: [{
                        data: [45, 30, 15, 10],
                        backgroundColor: [
                            'rgba(0, 200, 83, 0.7)',
                            'rgba(0, 176, 255, 0.7)',
                            'rgba(255, 171, 0, 0.7)',
                            'rgba(255, 82, 82, 0.7)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Chart period change handler
            document.getElementById('trend-period').addEventListener('change', function() {
                const period = this.value;
                if (period === 'week') {
                    adoptionChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    adoptionChart.data.datasets[0].data = [2, 1, 3, 1, 2, 4, 3];
                    adoptionChart.data.datasets[1].data = [1, 0, 2, 1, 1, 3, 2];
                } else if (period === 'month') {
                    const days = Array.from({length: 30}, (_, i) => i + 1);
                    adoptionChart.data.labels = days;
                    adoptionChart.data.datasets[0].data = Array.from({length: 30}, () => Math.floor(Math.random() * 4) + 1);
                    adoptionChart.data.datasets[1].data = adoptionChart.data.datasets[0].data.map(val => Math.max(0, val - Math.floor(Math.random() * 2)));
                } else if (period === 'year') {
                    adoptionChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    adoptionChart.data.datasets[0].data = [5, 7, 4, 6, 8, 10, 8, 12, 9, 11, 13, 8];
                    adoptionChart.data.datasets[1].data = [3, 5, 3, 4, 6, 7, 6, 8, 7, 9, 8, 6];
                }
                adoptionChart.update();
            });
        }

        // Initialize all components
        function initializeDashboard() {
            populateCatList();
            populateActivityList();
            setupCharts();
            
            // Set up filter change listeners
            document.getElementById('breed-filter').addEventListener('change', populateCatList);
            document.getElementById('age-filter').addEventListener('change', populateCatList);
            
            // Set up refresh button
            document.getElementById('refresh-btn').addEventListener('click', () => {
                document.getElementById('refresh-btn').classList.add('fa-spin');
                setTimeout(() => {
                    populateCatList();
                    populateActivityList();
                    document.getElementById('refresh-btn').classList.remove('fa-spin');
                }, 800);
            });
            
            // Add cat button (just shows a simple alert for demo)
            document.getElementById('add-cat-btn').addEventListener('click', () => {
                alert('Opens a form to add a new cat (not implemented in this demo)');
            });
            
            // Adopt button in modal
            document.getElementById('adopt-button').addEventListener('click', function() {
                alert('Adoption process initiated! A staff member will contact you soon.');
                document.getElementById('cat-modal').style.display = 'none';
            });
            
            // Schedule vet button
            document.getElementById('vet-button').addEventListener('click', function() {
                alert('Veterinary visit scheduled!');
                document.getElementById('cat-modal').style.display = 'none';
            });
        }

        // Initialize dashboard when DOM is ready
        document.addEventListener('DOMContentLoaded', initializeDashboard);
    </script>
</body>
</html>
```