// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');
const countriesGrid = document.getElementById('countries-grid');
const countryDetail = document.getElementById('country-detail');
const backButton = document.getElementById('back-button');

// State
let allCountries = [];
let filteredCountries = [];

// Check page
const isHomePage = window.location.pathname.includes('index.html') || 
                   window.location.pathname === '/' || 
                   (window.location.pathname.endsWith('.html') === false && 
                    window.location.pathname.endsWith('/') === false);

const isDetailPage = !isHomePage;

// Theme Management 
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-mode';
    
    if (savedTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Light Mode';
    } else {
        themeToggle.innerHTML = '<i class="far fa-moon"></i> Dark Mode';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        document.body.className = 'light-mode';
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="far fa-moon"></i> Dark Mode';
    } else {
        document.body.className = 'dark-mode';
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Light Mode';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Load Countries From data.json 
async function fetchCountries() {
    try {
        // Load countries from local data.json file
        const response = await fetch('./data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const countriesData = await response.json();
        
        console.log(`Loaded ${countriesData.length} countries from data.json`);
        
        // Transform data to match our structure
        allCountries = countriesData.map(country => ({
            name: country.name,
            population: country.population ? country.population.toLocaleString() : '0',
            region: country.region || 'Unknown',
            capital: country.capital || 'N/A',
            flag: country.flags ? country.flags.png : '',
            alpha3Code: country.alpha3Code,
            nativeName: country.nativeName || country.name,
            subregion: country.subregion || 'N/A',
            topLevelDomain: country.topLevelDomain ? 
                (Array.isArray(country.topLevelDomain) ? country.topLevelDomain[0] : country.topLevelDomain) : '',
            currencies: country.currencies ? 
                (Array.isArray(country.currencies) ? 
                    country.currencies.map(c => c.name).join(', ') : 
                    JSON.stringify(country.currencies)) : '',
            languages: country.languages ? 
                (Array.isArray(country.languages) ? 
                    country.languages.map(l => l.name).join(', ') : 
                    JSON.stringify(country.languages)) : '',
            borders: country.borders || []
        }));
        
        filteredCountries = [...allCountries];
        displayCountries();
        
    } catch (error) {
        console.error('Error loading data.json:', error);
        if (countriesGrid) {
            countriesGrid.innerHTML = `
                <p class="loading">
                    Error loading country data. 
                    Please make sure data.json is in the same folder.
                    <br>
                    Error: ${error.message}
                </p>
            `;
        }
    }
}

// Display Countries 
function displayCountries() {
    if (!countriesGrid) return;
    
    countriesGrid.innerHTML = '';
    
    if (filteredCountries.length === 0) {
        countriesGrid.innerHTML = '<p class="loading">No countries found matching your search.</p>';
        return;
    }
    
    filteredCountries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.dataset.alpha3Code = country.alpha3Code;
        
        countryCard.innerHTML = `
            <img src="${country.flag}" alt="${country.name}" class="country-flag" 
                 onerror="this.src='https://via.placeholder.com/264x160/cccccc/666666?text=No+Flag'">
            <div class="country-info">
                <h3 class="country-name">${country.name}</h3>
                <div class="country-details">
                    <p><strong>Population:</strong> ${country.population}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                </div>
            </div>
        `;
        
        countryCard.addEventListener('click', () => {
            window.location.href = `detail.html?code=${country.alpha3Code}`;
        });
        
        countriesGrid.appendChild(countryCard);
    });
}

// Filter Functions 
function filterCountries() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const region = regionFilter ? regionFilter.value : '';
    
    filteredCountries = allCountries.filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm);
        const matchesRegion = !region || country.region === region;
        
        return matchesSearch && matchesRegion;
    });
    
    displayCountries();
}

if (searchInput) {
    searchInput.addEventListener('input', filterCountries);
}

if (regionFilter) {
    regionFilter.addEventListener('change', filterCountries);
}

// Load Country Detail From data.json 
async function loadCountryDetail() {
    if (!isDetailPage || !countryDetail) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('code');
    
    if (!countryCode) {
        countryDetail.innerHTML = '<p class="loading">Country not found. <a href="index.html">Go back home</a></p>';
        return;
    }
    
    try {
        // Load the data.json file
        const response = await fetch('./data.json');
        const countriesData = await response.json();
        
        // Find the specific country by alpha3Code
        const countryData = countriesData.find(country => 
            country.alpha3Code === countryCode
        );
        
        if (!countryData) {
            throw new Error(`Country with code ${countryCode} not found in data.json`);
        }
        
        // Get border country names from the same data
        const borderCodes = countryData.borders || [];
        const borderCountries = [];
        
        for (const code of borderCodes) {
            const borderCountry = countriesData.find(c => c.alpha3Code === code);
            if (borderCountry) {
                borderCountries.push({
                    code: borderCountry.alpha3Code,
                    name: borderCountry.name
                });
            } else {
                // If border country not found in data, just show the code
                borderCountries.push({
                    code: code,
                    name: code
                });
            }
        }
        
        // Format data for display
        const currencies = countryData.currencies ? 
            (Array.isArray(countryData.currencies) ? 
                countryData.currencies.map(c => c.name).join(', ') : 
                JSON.stringify(countryData.currencies)) : 'N/A';
        
        const languages = countryData.languages ? 
            (Array.isArray(countryData.languages) ? 
                countryData.languages.map(l => l.name).join(', ') : 
                JSON.stringify(countryData.languages)) : 'N/A';
        
        const tld = countryData.topLevelDomain ? 
            (Array.isArray(countryData.topLevelDomain) ? 
                countryData.topLevelDomain.join(', ') : 
                countryData.topLevelDomain) : 'N/A';
        
        // Render the detail page
        countryDetail.innerHTML = `
            <div class="country-detail-container">
                <img src="${countryData.flags ? countryData.flags.png : ''}" 
                     alt="${countryData.name}" 
                     class="detail-flag"
                     onerror="this.src='https://via.placeholder.com/560x400/cccccc/666666?text=No+Flag'">
                <div class="detail-content">
                    <h2>${countryData.name}</h2>
                    <div class="detail-grid">
                        <div class="detail-info">
                            <p><strong>Native Name:</strong> ${countryData.nativeName || countryData.name}</p>
                            <p><strong>Population:</strong> ${countryData.population ? countryData.population.toLocaleString() : 'N/A'}</p>
                            <p><strong>Region:</strong> ${countryData.region || 'N/A'}</p>
                            <p><strong>Sub Region:</strong> ${countryData.subregion || 'N/A'}</p>
                            <p><strong>Capital:</strong> ${countryData.capital || 'N/A'}</p>
                        </div>
                        <div class="detail-info">
                            <p><strong>Top Level Domain:</strong> ${tld}</p>
                            <p><strong>Currencies:</strong> ${currencies}</p>
                            <p><strong>Languages:</strong> ${languages}</p>
                        </div>
                    </div>
                    
                    ${borderCountries.length > 0 ? `
                    <div class="border-countries">
                        <span>Border Countries:</span>
                        ${borderCountries.map(border => 
                            `<button class="border-country" data-code="${border.code}">${border.name}</button>`
                        ).join('')}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Add event listeners to border buttons
        document.querySelectorAll('.border-country').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.target.dataset.code;
                window.location.href = `detail.html?code=${code}`;
            });
        });
        
    } catch (error) {
        console.error('Error loading country details:', error);
        countryDetail.innerHTML = `
            <p class="loading">
                Error loading country details: ${error.message}
                <br>
                <a href="index.html">Return to homepage</a>
            </p>
        `;
    }
}

// Back Button  
if (backButton) {
    backButton.addEventListener('click', () => {
        window.history.back();
    });
}

// Initialize App 
function initApp() {
    initTheme();
    
    if (isHomePage) {
        fetchCountries();
    } else if (isDetailPage) {
        loadCountryDetail();
    }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);