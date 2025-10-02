// Rwanda Genocide Timeline Interactive Functionality

class RwandaTimeline {
    constructor() {
        this.currentPeriod = 'before';
        this.init();
    }

    init() {
        this.bindEvents();
        this.animateOnLoad();
    }

    bindEvents() {
        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.getAttribute('data-period');
                this.switchPeriod(period);
            });
        });

        // Timeline item clicks for details
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                this.toggleDetails(item);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.navigateWithKeyboard(e.key);
            }
        });
    }

    switchPeriod(period) {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');

        // Update active timeline period
        document.querySelectorAll('.timeline-period').forEach(periodEl => {
            periodEl.classList.remove('active');
        });
        document.querySelector(`.timeline-period[data-period="${period}"]`).classList.add('active');

        this.currentPeriod = period;
        this.animateTimelineItems();
    }

    toggleDetails(item) {
        const details = item.querySelector('.details');
        if (details) {
            details.classList.toggle('hidden');
            
            // Add visual feedback
            if (!details.classList.contains('hidden')) {
                item.classList.add('expanded');
                details.style.animation = 'slideDown 0.3s ease-in-out';
            } else {
                item.classList.remove('expanded');
            }
        }
    }

    navigateWithKeyboard(key) {
        const periods = ['before', 'april', 'may', 'july', 'aftermath'];
        const currentIndex = periods.indexOf(this.currentPeriod);
        let newIndex;

        if (key === 'ArrowRight' && currentIndex < periods.length - 1) {
            newIndex = currentIndex + 1;
        } else if (key === 'ArrowLeft' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        }

        if (newIndex !== undefined) {
            this.switchPeriod(periods[newIndex]);
        }
    }

    animateOnLoad() {
        // Animate header elements
        const header = document.querySelector('header');
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);

        // Animate navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                btn.style.transition = 'all 0.5s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

        this.animateTimelineItems();
    }

    animateTimelineItems() {
        const activeTimeline = document.querySelector('.timeline-period.active');
        if (!activeTimeline) return;

        const items = activeTimeline.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }

    // Add method for creating dynamic content
    addTimelineEvent(period, eventData) {
        const timeline = document.querySelector(`.timeline-period[data-period="${period}"] .timeline`);
        if (!timeline) return;

        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-item';
        eventElement.setAttribute('data-event', eventData.id);
        
        eventElement.innerHTML = `
            <div class="timeline-marker ${eventData.type}"></div>
            <div class="timeline-content">
                <div class="timeline-date">${eventData.date}</div>
                <h3>${eventData.title}</h3>
                <p>${eventData.description}</p>
                ${eventData.details ? `
                    <div class="details hidden">
                        ${eventData.details}
                    </div>
                ` : ''}
            </div>
        `;

        timeline.appendChild(eventElement);
        
        // Bind click event to new element
        eventElement.addEventListener('click', () => {
            this.toggleDetails(eventElement);
        });
    }

    // Method to highlight specific events
    highlightEvent(eventId) {
        const event = document.querySelector(`[data-event="${eventId}"]`);
        if (event) {
            event.scrollIntoView({ behavior: 'smooth' });
            event.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            
            setTimeout(() => {
                event.style.backgroundColor = '';
            }, 2000);
        }
    }

    // Search functionality
    searchEvents(query) {
        const allItems = document.querySelectorAll('.timeline-item');
        const results = [];
        
        allItems.forEach(item => {
            const content = item.textContent.toLowerCase();
            if (content.includes(query.toLowerCase())) {
                results.push({
                    element: item,
                    period: item.closest('.timeline-period').getAttribute('data-period'),
                    title: item.querySelector('h3').textContent
                });
            }
        });
        
        return results;
    }
}

// Additional data and functionality
const historicalData = {
    statistics: {
        totalKilled: 800000,
        tutsiKilled: 600000,
        hutuOppositionKilled: 200000,
        durationDays: 100,
        killRate: 8000, // per day average
        refugeesCreated: 2000000
    },
    
    keyFigures: {
        perpetrators: [
            { name: "Juvénal Habyarimana", role: "Président (tué 6 avril)" },
            { name: "Ferdinand Nahimana", role: "RTLM grundlægger" },
            { name: "Hassan Ngeze", role: "Kangura redaktør" },
            { name: "Georges Ruggiu", role: "Belgisk RTLM journalist" }
        ],
        witnesses: [
            { name: "Romeo Dallaire", role: "UNAMIR chef" },
            { name: "Gloriose", role: "Tutsi overlevende" }
        ],
        bystanders: [
            { name: "Bill Clinton", role: "USA præsident" },
            { name: "Kofi Annan", role: "FN fredsbevarende styrker" },
            { name: "François Mitterrand", role: "Fransk præsident" }
        ]
    },
    
    locations: {
        massacreSites: [
            { name: "Murambi Technical School", victims: 20000, description: "65.000 tutsierer lokket med løfte om fransk beskyttelse" },
            { name: "Kirker i hele landet", victims: "Tusindvis", description: "Tutsiiere søgte tilflugt, blev dræbt samlet" },
            { name: "Vejspærringer", victims: "Dagligt", description: "Identitetskort brugt til systematisk identifikation" }
        ]
    }
};

// Initialize the timeline when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new RwandaTimeline();
    
    // Add search functionality if needed
    const searchBox = document.getElementById('search');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const results = timeline.searchEvents(e.target.value);
            // Display search results
        });
    }
    
    // Add keyboard navigation hint
    console.log('Brug venstre/højre piletaster til at navigere mellem perioder');
    
    // Add additional interactive features
    setupTooltips();
    setupProgressIndicator();
});

// Tooltip functionality for enhanced information
function setupTooltips() {
    const markers = document.querySelectorAll('.timeline-marker');
    
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', (e) => {
            const item = e.target.closest('.timeline-item');
            const eventType = getEventType(marker.className);
            showTooltip(e.target, eventType);
        });
        
        marker.addEventListener('mouseleave', () => {
            hideTooltip();
        });
    });
}

function getEventType(className) {
    const types = {
        'genocide': 'Folkedrab begivenhed',
        'massacre': 'Massakre',
        'crisis': 'Økonomisk/social krise',
        'propaganda': 'Propaganda kampagne',
        'abandonment': 'International passivitet',
        'peace': 'Fredsbestræbelser',
        'warning': 'Advarsel',
        'political': 'Politisk begivenhed',
        'intervention': 'International intervention',
        'victory': 'Militær sejr',
        'justice': 'Retfærdighedssag'
    };
    
    for (const [key, value] of Object.entries(types)) {
        if (className.includes(key)) {
            return value;
        }
    }
    return 'Historisk begivenhed';
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        transform: translateX(-50%);
        top: -40px;
        left: 50%;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Progress indicator
function setupProgressIndicator() {
    const periods = ['before', 'april', 'may', 'july', 'aftermath'];
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-color), var(--genocide-color));
        transition: width 0.3s ease;
        z-index: 1001;
        width: ${(periods.indexOf('before') + 1) * 20}%;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress when switching periods
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-btn')) {
            const period = e.target.getAttribute('data-period');
            const index = periods.indexOf(period);
            progressBar.style.width = `${(index + 1) * 20}%`;
        }
    });
}

// Enhanced statistics display
function updateStatistics() {
    const stats = document.querySelectorAll('.stat .number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        stat.textContent = '0';
        
        // Animate numbers counting up
        animateNumber(stat, finalValue);
    });
}

function animateNumber(element, finalValue) {
    const cleanValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = cleanValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= cleanValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            if (finalValue.includes('~')) {
                element.textContent = `~${displayValue.toLocaleString()}`;
            } else if (finalValue.includes('%')) {
                element.textContent = `${displayValue}%`;
            } else {
                element.textContent = displayValue.toLocaleString();
            }
        }
    }, duration / steps);
}

// Add dynamic content loading
function loadAdditionalContent() {
    // This could load more detailed events from a JSON file
    const additionalEvents = {
        april: [
            {
                date: "7. april 1994",
                title: "Premierminister Uwilingiyimana dræbes",
                description: "Agathe Uwilingiyimana, Rwandas premierminister, dræbes sammen med hendes belgiske livvagter.",
                type: "genocide"
            },
            {
                date: "9-10. april 1994",
                title: "Massakrer i Gikondo og Nyamirambo",
                description: "Store massakrer i Kigali's forstæder. RTLM radio koordinerer angrebene.",
                type: "massacre"
            }
        ]
    };
    
    // Could be implemented to add more granular events
}

// Theme switching (if desired)
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        padding: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: var(--shadow);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
}

// Print functionality
function setupPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.textContent = '🖨️ Print Timeline';
    printBtn.className = 'print-btn';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        z-index: 1000;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-2px)';
        printBtn.style.boxShadow = '0 5px 20px rgba(231, 76, 60, 0.3)';
    });
    
    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'translateY(0)';
        printBtn.style.boxShadow = 'var(--shadow)';
    });
    
    document.body.appendChild(printBtn);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Timeline error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    console.log('Rwanda Genocide Timeline loaded successfully');
    
    // Optional: Add analytics or performance tracking
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Accessibility enhancements
function setupAccessibility() {
    // Add ARIA labels
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-expanded', 'false');
        
        const title = item.querySelector('h3').textContent;
        item.setAttribute('aria-label', `Udvid detaljer for: ${title}`);
        
        // Add keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                timeline.toggleDetails(item);
                item.setAttribute('aria-expanded', 
                    !item.querySelector('.details').classList.contains('hidden')
                );
            }
        });
    });
    
    // Add skip navigation
    const skipNav = document.createElement('a');
    skipNav.href = '#main-content';
    skipNav.textContent = 'Spring til hovedindhold';
    skipNav.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 3px;
        z-index: 1002;
    `;
    
    skipNav.addEventListener('focus', () => {
        skipNav.style.top = '6px';
    });
    
    skipNav.addEventListener('blur', () => {
        skipNav.style.top = '-40px';
    });
    
    document.body.prepend(skipNav);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupAccessibility();
    setupThemeToggle();
    setupPrintButton();
    updateStatistics();
});