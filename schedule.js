// Winter Olympics 2026 Schedule Data
// Milano Cortina 2026 • February 6-22

const SCHEDULE_DATA = {
    feb6: {
        date: 'Thursday, February 6',
        events: [
            { time: '20:00', event: 'Opening Ceremony', venue: 'Milano San Siro', sport: 'Ceremony' }
        ]
    },
    feb7: {
        date: 'Friday, February 7',
        events: [
            { time: '10:00-11:45', event: "Men's Downhill Training", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '11:30-13:40', event: "Women's Downhill", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:05-15:35', event: 'Mixed Relay 4x6km', venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: 'Mixed Doubles Round Robin', venue: 'Cortina', sport: 'Curling' },
            { time: '14:00-21:00', event: 'Team Event - Men Short Program', venue: 'Torino', sport: 'Figure Skating' },
            { time: '14:00-16:30', event: 'Preliminaries (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '17:00-18:30', event: "Women's 3000m", venue: 'Baselga di Pinè', sport: 'Speed Skating' }
        ]
    },
    feb8: {
        date: 'Saturday, February 8',
        events: [
            { time: '11:30-13:40', event: "Men's Downhill", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:15', event: "Women's 7.5km Sprint", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: 'Mixed Doubles Round Robin', venue: 'Cortina', sport: 'Curling' },
            { time: '14:00-18:00', event: 'Team Event - Rhythm Dance', venue: 'Torino', sport: 'Figure Skating' },
            { time: '19:00-22:00', event: 'Team Event - Women Short Program', venue: 'Torino', sport: 'Figure Skating' },
            { time: '14:00-21:30', event: 'Preliminaries (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '16:00-18:30', event: "Women's 1500m, Men's 5000m", venue: 'Baselga di Pinè', sport: 'Speed Skating' }
        ]
    },
    feb9: {
        date: 'Sunday, February 9',
        events: [
            { time: '10:00-12:00', event: "Women's Super-G", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:15', event: "Men's 10km Sprint", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-20:30', event: 'Mixed Doubles Semifinals', venue: 'Cortina', sport: 'Curling' },
            { time: '14:00-18:00', event: 'Team Event - Pairs Short Program', venue: 'Torino', sport: 'Figure Skating' },
            { time: '19:00-22:00', event: 'Team Event - Free Dance', venue: 'Torino', sport: 'Figure Skating' },
            { time: '14:00-21:30', event: 'Preliminaries (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '09:30-11:30', event: "Men's 1500m Heats", venue: 'Baselga di Pinè', sport: 'Short Track' },
            { time: '19:00-21:15', event: "Women's 500m, Men's 1000m Finals", venue: 'Baselga di Pinè', sport: 'Short Track' }
        ]
    },
    feb10: {
        date: 'Monday, February 10',
        events: [
            { time: '11:00-13:00', event: "Men's Super-G", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Women's 10km Pursuit", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '15:00-20:30', event: 'Mixed Doubles Finals', venue: 'Cortina', sport: 'Curling' },
            { time: '14:00-18:00', event: 'Team Event Finals', venue: 'Torino', sport: 'Figure Skating' },
            { time: '10:00-11:30', event: "Women's Moguls Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '19:00-21:00', event: "Women's Moguls Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-21:30', event: 'Preliminaries (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '17:00-18:30', event: "Men's 5000m", venue: 'Baselga di Pinè', sport: 'Speed Skating' }
        ]
    },
    feb11: {
        date: 'Tuesday, February 11',
        events: [
            { time: '10:00-12:00', event: "Women's Slalom Run 1", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '13:00-14:30', event: "Women's Slalom Run 2", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Men's 12.5km Pursuit", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: "Women's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '10:00-11:30', event: "Men's Moguls Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '19:00-21:00', event: "Men's Moguls Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-21:30', event: 'Preliminaries (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '16:00-18:30', event: "Women's 3000m, Men's 1500m", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-21:15', event: "Men's 1500m, Women's 1000m Finals", venue: 'Baselga di Pinè', sport: 'Short Track' }
        ]
    },
    feb12: {
        date: 'Wednesday, February 12',
        events: [
            { time: '10:00-12:00', event: "Men's Slalom Run 1", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '13:00-14:30', event: "Men's Slalom Run 2", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:15', event: "Women's 15km Individual", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: "Women's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '19:00-21:30', event: 'Pairs Short Program', venue: 'Torino', sport: 'Figure Skating' },
            { time: '10:00-12:00', event: "Men's Slopestyle Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-21:30', event: 'Quarterfinals (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '17:00-18:30', event: "Women's 5000m", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '10:00-12:00', event: 'Normal Hill Individual Qualification', venue: 'Val di Fiemme', sport: 'Ski Jumping' }
        ]
    },
    feb13: {
        date: 'Thursday, February 13',
        events: [
            { time: '11:30-13:30', event: "Women's Giant Slalom Run 1", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Women's Giant Slalom Run 2", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:15', event: "Men's 20km Individual", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: "Women's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '19:00-21:30', event: 'Pairs Free Skating', venue: 'Torino', sport: 'Figure Skating' },
            { time: '12:30-14:30', event: "Men's Slopestyle Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-21:30', event: 'Quarterfinals (Men/Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '16:00-18:30', event: "Women's 1000m, Men's 10000m", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-21:15', event: "Women's 1500m, Men's 500m Finals", venue: 'Baselga di Pinè', sport: 'Short Track' },
            { time: '19:00-20:30', event: 'Normal Hill Individual Finals', venue: 'Val di Fiemme', sport: 'Ski Jumping' }
        ]
    },
    feb14: {
        date: 'Friday, February 14',
        events: [
            { time: '11:30-13:30', event: "Men's Giant Slalom Run 1", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Men's Giant Slalom Run 2", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Women's 4x6km Relay", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: "Women's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '11:00-13:00', event: "Women's Aerials Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '19:00-21:00', event: "Women's Aerials Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-21:30', event: 'Semifinals (Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '10:00-12:00', event: "Women's Halfpipe Qualification", venue: 'Livigno', sport: 'Snowboard' },
            { time: '12:00-14:00', event: "Women's Sprint Finals", venue: 'Tesero', sport: 'Cross-Country Skiing' },
            { time: '19:00-20:30', event: "Men's Normal Hill Team Finals", venue: 'Val di Fiemme', sport: 'Ski Jumping' }
        ]
    },
    feb15: {
        date: 'Saturday, February 15',
        events: [
            { time: '11:30-13:30', event: "Women's Combined Downhill", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:00-16:00', event: "Women's Combined Slalom", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Men's 4x7.5km Relay", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: "Women's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '19:00-21:30', event: "Men's Singles Short Program", venue: 'Torino', sport: 'Figure Skating' },
            { time: '11:00-13:00', event: "Men's Aerials Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '19:00-21:00', event: "Men's Aerials Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-16:00', event: 'Bronze Medal Game (Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '12:30-14:30', event: "Women's Halfpipe Finals", venue: 'Livigno', sport: 'Snowboard' },
            { time: '17:00-18:30', event: "Women's 500m", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-21:15', event: "Women's 3000m Relay Finals", venue: 'Baselga di Pinè', sport: 'Short Track' }
        ]
    },
    feb16: {
        date: 'Sunday, February 16',
        events: [
            { time: '11:30-13:30', event: "Men's Combined Downhill", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:00-16:00', event: "Men's Combined Slalom", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '10:00-21:30', event: "Men's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '14:00-17:00', event: 'Ice Dance Rhythm Dance', venue: 'Torino', sport: 'Figure Skating' },
            { time: '19:00-21:30', event: "Men's Singles Free Skating", venue: 'Torino', sport: 'Figure Skating' },
            { time: '14:00-21:30', event: 'Semifinals (Men)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '10:00-12:00', event: "Men's Halfpipe Qualification", venue: 'Livigno', sport: 'Snowboard' },
            { time: '11:30-13:30', event: "Women's 10km + 10km Skiathlon", venue: 'Tesero', sport: 'Cross-Country Skiing' },
            { time: '17:00-18:30', event: "Men's 500m", venue: 'Baselga di Pinè', sport: 'Speed Skating' }
        ]
    },
    feb17: {
        date: 'Monday, February 17',
        events: [
            { time: '10:00-21:30', event: "Men's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '19:00-21:30', event: 'Ice Dance Free Dance', venue: 'Torino', sport: 'Figure Skating' },
            { time: '10:00-12:00', event: "Women's Slopestyle Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-16:00', event: 'Bronze Medal Game (Men)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '12:30-14:30', event: "Men's Halfpipe Finals", venue: 'Livigno', sport: 'Snowboard' },
            { time: '16:00-18:30', event: "Women's 1500m, Men's 10000m", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-21:15', event: "Men's 5000m Relay Finals", venue: 'Baselga di Pinè', sport: 'Short Track' },
            { time: '12:00-14:00', event: "Men's 15km + 15km Skiathlon", venue: 'Tesero', sport: 'Cross-Country Skiing' }
        ]
    },
    feb18: {
        date: 'Tuesday, February 18',
        events: [
            { time: '11:30-13:30', event: "Women's Parallel Run 1", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Women's Parallel Finals", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '10:00-21:30', event: "Men's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '19:00-21:30', event: "Women's Singles Short Program", venue: 'Torino', sport: 'Figure Skating' },
            { time: '12:30-14:30', event: "Women's Slopestyle Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '17:00-21:30', event: 'Gold Medal Game (Women)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '17:00-18:30', event: "Women's Team Pursuit", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '10:00-12:00', event: 'Large Hill Individual Qualification', venue: 'Val di Fiemme', sport: 'Ski Jumping' }
        ]
    },
    feb19: {
        date: 'Wednesday, February 19',
        events: [
            { time: '11:30-13:30', event: "Men's Parallel Run 1", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '14:30-16:30', event: "Men's Parallel Finals", venue: 'Cortina', sport: 'Alpine Skiing' },
            { time: '10:00-21:30', event: "Men's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '19:00-21:30', event: "Women's Singles Free Skating", venue: 'Torino', sport: 'Figure Skating' },
            { time: '10:00-12:00', event: "Men's Slopestyle Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '17:00-18:30', event: "Men's Team Pursuit", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-20:30', event: 'Large Hill Individual Finals', venue: 'Val di Fiemme', sport: 'Ski Jumping' },
            { time: '12:00-14:00', event: "Women's 10km Classical", venue: 'Tesero', sport: 'Cross-Country Skiing' }
        ]
    },
    feb20: {
        date: 'Thursday, February 20',
        events: [
            { time: '14:30-16:30', event: "Women's 12.5km Mass Start", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '10:00-21:30', event: "Men's Round Robin", venue: 'Cortina', sport: 'Curling' },
            { time: '12:30-14:30', event: "Men's Slopestyle Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '17:00-21:30', event: 'Gold Medal Game (Men)', venue: 'Milano', sport: 'Ice Hockey' },
            { time: '17:00-18:30', event: "Women's Mass Start", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-21:15', event: 'Mixed Team Relay Finals', venue: 'Baselga di Pinè', sport: 'Short Track' },
            { time: '12:00-14:00', event: "Men's 15km Classical", venue: 'Tesero', sport: 'Cross-Country Skiing' }
        ]
    },
    feb21: {
        date: 'Friday, February 21',
        events: [
            { time: '14:30-16:30', event: "Men's 15km Mass Start", venue: 'Anterselva', sport: 'Biathlon' },
            { time: '15:00-20:30', event: "Women's Semifinals", venue: 'Cortina', sport: 'Curling' },
            { time: '10:00-12:00', event: "Women's Cross Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-16:00', event: "Women's Cross Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '17:00-18:30', event: "Men's Mass Start", venue: 'Baselga di Pinè', sport: 'Speed Skating' },
            { time: '19:00-20:30', event: "Men's Large Hill Team Finals", venue: 'Val di Fiemme', sport: 'Ski Jumping' },
            { time: '11:30-13:30', event: "Women's 30km Mass Start Classical", venue: 'Tesero', sport: 'Cross-Country Skiing' }
        ]
    },
    feb22: {
        date: 'Saturday, February 22',
        events: [
            { time: '15:00-20:30', event: "Men's Semifinals & Finals", venue: 'Cortina', sport: 'Curling' },
            { time: '10:00-12:00', event: "Men's Cross Qualification", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '14:00-16:00', event: "Men's Cross Finals", venue: 'Livigno', sport: 'Freestyle Skiing' },
            { time: '12:00-14:30', event: "Men's 50km Mass Start Classical", venue: 'Tesero', sport: 'Cross-Country Skiing' },
            { time: '20:00', event: 'Closing Ceremony', venue: 'Verona Arena', sport: 'Ceremony' }
        ]
    }
};

class ScheduleApp {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderSchedule();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Day filter buttons
        const dayButtons = document.querySelectorAll('.day-btn');
        dayButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                dayButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Update filter
                this.currentFilter = e.target.dataset.day;
                // Re-render schedule
                this.renderSchedule();
            });
        });
    }

    renderSchedule() {
        const scheduleContent = document.getElementById('scheduleContent');
        let html = '';

        // Get all days in order
        const days = Object.keys(SCHEDULE_DATA);

        days.forEach(dayKey => {
            const day = SCHEDULE_DATA[dayKey];

            // Apply filter
            if (this.currentFilter !== 'all' && this.currentFilter !== dayKey) {
                return; // Skip this day
            }

            html += `
                <div class="day-card" data-day="${dayKey}">
                    <div class="day-header">
                        <div class="day-title">${day.date}</div>
                    </div>
                    <div class="event-list">
            `;

            day.events.forEach(event => {
                html += `
                    <div class="event-item">
                        <div class="event-time">${event.time}</div>
                        <div class="event-name">${event.event}</div>
                        <div class="event-meta">${event.sport} • ${event.venue}</div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        scheduleContent.innerHTML = html;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScheduleApp();
});
