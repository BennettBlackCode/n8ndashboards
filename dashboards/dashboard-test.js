// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
  // Create container
  const container = document.createElement('div');
  container.className = 'cat-dashboard-container';
  document.body.appendChild(container);

  // Create header
  const header = document.createElement('h1');
  header.textContent = 'Top 10 Cats Dashboard';
  header.className = 'dashboard-header';
  container.appendChild(header);

  // Cat data
  const cats = [
    { 
      name: 'Maine Coon', 
      popularity: 92, 
      traits: ['Large', 'Friendly', 'Intelligent'], 
      imageUrl: 'https://placekitten.com/300/200?image=1',
      description: 'One of the largest domestic cat breeds, known for their friendly personality.'
    },
    { 
      name: 'Ragdoll', 
      popularity: 89, 
      traits: ['Gentle', 'Calm', 'Affectionate'], 
      imageUrl: 'https://placekitten.com/300/200?image=2',
      description: 'Known for their docile temperament and tendency to go limp when held.'
    },
    { 
      name: 'Bengal', 
      popularity: 86, 
      traits: ['Energetic', 'Playful', 'Athletic'], 
      imageUrl: 'https://placekitten.com/300/200?image=3',
      description: 'Wild-looking cats with distinctive spotted or marbled coat patterns.'
    },
    { 
      name: 'Siamese', 
      popularity: 84, 
      traits: ['Vocal', 'Social', 'Active'], 
      imageUrl: 'https://placekitten.com/300/200?image=4',
      description: 'Distinctive color points and striking blue eyes with a chatty personality.'
    },
    { 
      name: 'Persian', 
      popularity: 83, 
      traits: ['Quiet', 'Sweet', 'Sedentary'], 
      imageUrl: 'https://placekitten.com/300/200?image=5',
      description: 'Long-haired cats known for their flat faces and luxurious coats.'
    },
    { 
      name: 'Scottish Fold', 
      popularity: 81, 
      traits: ['Adaptable', 'Playful', 'Intelligent'], 
      imageUrl: 'https://placekitten.com/300/200?image=6',
      description: 'Distinguished by their folded ears and sweet expressions.'
    },
    { 
      name: 'Sphynx', 
      popularity: 78, 
      traits: ['Energetic', 'Affectionate', 'Curious'], 
      imageUrl: 'https://placekitten.com/300/200?image=7',
      description: 'Hairless cats known for their outgoing, attention-seeking personality.'
    },
    { 
      name: 'British Shorthair', 
      popularity: 77, 
      traits: ['Easygoing', 'Calm', 'Independent'], 
      imageUrl: 'https://placekitten.com/300/200?image=8',
      description: 'Stocky cats with dense coats and typically copper-colored eyes.'
    },
    { 
      name: 'Abyssinian', 
      popularity: 75, 
      traits: ['Active', 'Playful', 'Intelligent'], 
      imageUrl: 'https://placekitten.com/300/200?image=9',
      description: 'One of the oldest known cat breeds with a distinctive ticked coat.'
    },
    { 
      name: 'Norwegian Forest Cat', 
      popularity: 73, 
      traits: ['Strong', 'Independent', 'Friendly'], 
      imageUrl: 'https://placekitten.com/300/200?image=10',
      description: 'Large, hardy cats with water-resistant coats built for harsh Scandinavian climates.'
    }
  ];

  // Create dashboard grid
  const dashboardGrid = document.createElement('div');
  dashboardGrid.className = 'dashboard-grid';
  container.appendChild(dashboardGrid);

  // Create popularity chart section
  const chartSection = document.createElement('div');
  chartSection.className = 'chart-section';
  container.appendChild(chartSection);
  
  const chartTitle = document.createElement('h2');
  chartTitle.textContent = 'Popularity Ratings';
  chartTitle.className = 'section-title';
  chartSection.appendChild(chartTitle);
  
  const chartCanvas = document.createElement('canvas');
  chartCanvas.id = 'popularityChart';
  chartSection.appendChild(chartCanvas);

  // Create cat cards
  cats.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    dashboardGrid.appendChild(card);

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    card.appendChild(cardHeader);

    const nameEl = document.createElement('h2');
    nameEl.textContent = cat.name;
    cardHeader.appendChild(nameEl);

    const popularityBadge = document.createElement('div');
    popularityBadge.className = 'popularity-badge';
    popularityBadge.textContent = cat.popularity;
    cardHeader.appendChild(popularityBadge);

    const imageEl = document.createElement('img');
    imageEl.src = cat.imageUrl;
    imageEl.alt = cat.name;
    imageEl.className = 'cat-image';
    card.appendChild(imageEl);

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = cat.description;
    descriptionEl.className = 'cat-description';
    card.appendChild(descriptionEl);

    const traitsList = document.createElement('div');
    traitsList.className = 'traits-list';
    card.appendChild(traitsList);

    cat.traits.forEach(trait => {
      const traitBadge = document.createElement('span');
      traitBadge.className = 'trait-badge';
      traitBadge.textContent = trait;
      traitsList.appendChild(traitBadge);
    });
  });

  // Add chart using Chart.js (assuming it's included in your HTML)
  // This will only work if you've included Chart.js in your HTML
  if (typeof Chart !== 'undefined') {
    const ctx = document.getElementById('popularityChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cats.map(cat => cat.name),
        datasets: [{
          label: 'Popularity Score',
          data: cats.map(cat => cat.popularity),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Cat Popularity Ratings'
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Add styles
  const styles = `
    .cat-dashboard-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f7fa;
    }
    
    .dashboard-header {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 2.5rem;
      border-bottom: 2px solid #e1e5ee;
      padding-bottom: 15px;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .cat-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    
    .cat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
      color: white;
    }
    
    .card-header h2 {
      margin: 0;
      font-size: 1.4rem;
    }
    
    .popularity-badge {
      background-color: white;
      color: #6a11cb;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
    }
    
    .cat-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    
    .cat-description {
      padding: 15px;
      color: #333;
      line-height: 1.5;
    }
    
    .traits-list {
      padding: 0 15px 15px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .trait-badge {
      background-color: #e9ecef;
      color: #495057;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    
    .chart-section {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin-top: 30px;
    }
    
    .section-title {
      color: #333;
      margin-top: 0;
      margin-bottom: 20px;
      text-align: center;
    }
    
    canvas {
      max-width: 100%;
    }
  `;
  
  // Add styles to document
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  // Add note about Chart.js if it's not available
  if (typeof Chart === 'undefined') {
    const chartNote = document.createElement('p');
    chartNote.textContent = "Note: Include Chart.js in your HTML to enable the popularity chart.";
    chartNote.style.textAlign = 'center';
    chartNote.style.color = '#666';
    chartNote.style.padding = '10px';
    chartSection.appendChild(chartNote);
  }
});