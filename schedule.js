// Winter Olympics 2026 Schedule Data
// Milano Cortina 2026 • February 6-22
// All times in CET (Central European Time, UTC+1)
// 🥇 = Medal Event

const SCHEDULE_DATA = {
    feb6: {
        date: 'Thursday, February 6',
        events: [
            { time: '20:00', event: 'Opening Ceremony', venue: 'Milano San Siro', sport: '🎆 Ceremony', isMedal: false }
        ]
    },
    feb7: {
        date: 'Friday, February 7',
        events: [
            { time: '11:30-13:40', event: "Women's Downhill 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:05-15:35', event: 'Mixed Relay 4x6km 🥇', venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '10:00-21:30', event: 'Mixed Doubles Round Robin', venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '14:00-21:00', event: 'Team Event - Various', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '14:00-23:40', event: 'Preliminaries', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '17:00-18:30', event: "Women's 3000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true }
        ]
    },
    feb8: {
        date: 'Saturday, February 8',
        events: [
            { time: '11:30-13:40', event: "Men's Downhill 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:30-16:15', event: "Women's 7.5km Sprint 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '10:00-21:30', event: 'Mixed Doubles Round Robin', venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '14:00-22:00', event: 'Team Event - Various', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '14:00-23:40', event: 'Preliminaries', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '16:00-18:30', event: "Women's 1500m 🥇, Men's 5000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true }
        ]
    },
    feb9: {
        date: 'Sunday, February 9',
        events: [
            { time: '10:00-12:00', event: "Women's Super-G 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:30-16:15', event: "Men's 10km Sprint 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '10:00-20:30', event: 'Mixed Doubles Semifinals', venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '14:00-22:00', event: 'Team Event - Various', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '14:00-23:40', event: 'Preliminaries', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '19:00-21:15', event: "Women's 500m 🥇, Men's 1000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Short Track', isMedal: true }
        ]
    },
    feb10: {
        date: 'Monday, February 10',
        events: [
            { time: '11:00-13:00', event: "Men's Super-G 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '11:15-15:50', event: "Women's 10km Pursuit 🥇, Men's 12.5km Pursuit 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '14:05-20:20', event: 'Mixed Doubles Medal Finals 🥇', venue: 'Cortina', sport: '🥌 Curling', isMedal: true },
            { time: '14:00-18:00', event: 'Team Event Finals 🥇', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: true },
            { time: '19:00-21:00', event: "Women's Moguls Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '14:00-23:40', event: 'Preliminaries', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '17:00-18:30', event: "Men's 5000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true }
        ]
    },
    feb11: {
        date: 'Tuesday, February 11',
        events: [
            { time: '10:00-15:10', event: "Women's Slalom 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:30-16:30', event: "Men's 12.5km Pursuit 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '09:05-22:05', event: "Women's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-21:00', event: "Men's Moguls Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '14:00-23:40', event: 'Preliminaries', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '16:00-18:30', event: "Women's 3000m 🥇, Men's 1500m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-21:15', event: "Men's 1500m 🥇, Women's 1000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Short Track', isMedal: true }
        ]
    },
    feb12: {
        date: 'Wednesday, February 12',
        events: [
            { time: '10:00-15:10', event: "Men's Slalom 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:15-16:05', event: "Women's 15km Individual 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '09:05-22:05', event: "Women's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-21:30', event: 'Pairs Short Program', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '10:00-12:00', event: "Men's Slopestyle Qualification", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: false },
            { time: '14:00-23:40', event: 'Quarterfinals', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '17:00-18:30', event: "Women's 5000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '10:00-12:00', event: 'Normal Hill Qualification', venue: 'Val di Fiemme', sport: '🎿 Ski Jumping', isMedal: false },
            { time: '12:00-14:00', event: "Women's Sprint 🥇, Men's Sprint 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb13: {
        date: 'Thursday, February 13',
        events: [
            { time: '11:30-16:30', event: "Women's Giant Slalom 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '13:30-15:25', event: "Men's 20km Individual 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '09:05-22:05', event: "Women's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-21:30', event: 'Pairs Free Skating 🥇', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: true },
            { time: '12:30-14:30', event: "Men's Slopestyle Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '14:00-23:40', event: 'Quarterfinals', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '16:00-18:30', event: "Women's 1000m 🥇, Men's 10000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-21:15', event: "Women's 1500m 🥇, Men's 500m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Short Track', isMedal: true },
            { time: '19:00-20:30', event: 'Normal Hill Individual 🥇', venue: 'Val di Fiemme', sport: '🎿 Ski Jumping', isMedal: true }
        ]
    },
    feb14: {
        date: 'Friday, February 14',
        events: [
            { time: '11:30-16:30', event: "Men's Giant Slalom 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:45-16:15', event: "Women's 4x6km Relay 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '09:05-22:05', event: "Women's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-21:00', event: "Women's Aerials Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '16:40-23:40', event: 'Semifinals (Women)', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '10:00-12:00', event: "Women's Halfpipe Qualification", venue: 'Livigno', sport: '🏂 Snowboard', isMedal: false },
            { time: '11:45-13:45', event: "Women's Sprint 🥇, Men's Sprint 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true },
            { time: '19:00-20:30', event: "Men's Normal Hill Team 🥇", venue: 'Val di Fiemme', sport: '🎿 Ski Jumping', isMedal: true }
        ]
    },
    feb15: {
        date: 'Saturday, February 15',
        events: [
            { time: '11:30-16:00', event: "Women's Combined 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '14:30-16:05', event: "Men's 4x7.5km Relay 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '09:05-22:05', event: "Women's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-21:30', event: "Men's Singles Short Program", venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '19:00-21:00', event: "Men's Aerials Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '14:00-16:00', event: 'Bronze Medal Game 🥉', venue: 'Milano', sport: '🏒 Ice Hockey (Women)', isMedal: true },
            { time: '12:30-14:30', event: "Women's Halfpipe Finals 🥇", venue: 'Livigno', sport: '🏂 Snowboard', isMedal: true },
            { time: '17:00-18:30', event: "Women's 500m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-21:15', event: "Women's 3000m Relay 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Short Track', isMedal: true },
            { time: '13:00-14:40', event: "Women's 10km+10km Skiathlon 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb16: {
        date: 'Sunday, February 16',
        events: [
            { time: '11:30-16:00', event: "Men's Combined 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '09:05-22:05', event: "Men's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '14:00-17:00', event: 'Ice Dance Rhythm Dance', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '19:00-23:10', event: "Men's Singles Free Skating 🥇", venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: true },
            { time: '16:40-23:40', event: 'Semifinals (Men)', venue: 'Milano', sport: '🏒 Ice Hockey', isMedal: false },
            { time: '10:00-12:00', event: "Men's Halfpipe Qualification", venue: 'Livigno', sport: '🏂 Snowboard', isMedal: false },
            { time: '11:30-13:30', event: "Women's 10km+10km Skiathlon 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true },
            { time: '17:00-18:30', event: "Men's 500m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true }
        ]
    },
    feb17: {
        date: 'Monday, February 17',
        events: [
            { time: '09:05-22:05', event: "Men's Round Robin", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-23:05', event: 'Ice Dance Free Dance 🥇', venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: true },
            { time: '10:00-12:00', event: "Women's Slopestyle Qualification", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: false },
            { time: '14:00-16:00', event: 'Bronze Medal Game 🥉', venue: 'Milano', sport: '🏒 Ice Hockey (Men)', isMedal: true },
            { time: '12:30-14:30', event: "Men's Halfpipe Finals 🥇", venue: 'Livigno', sport: '🏂 Snowboard', isMedal: true },
            { time: '16:00-18:30', event: "Women's 1500m 🥇, Men's 10000m 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-21:15', event: "Men's 5000m Relay 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Short Track', isMedal: true },
            { time: '12:00-14:00', event: "Men's 15km+15km Skiathlon 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb18: {
        date: 'Tuesday, February 18',
        events: [
            { time: '11:30-16:30', event: "Women's Parallel 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '09:05-22:20', event: "Men's Medal Finals 🥇", venue: 'Cortina', sport: '🥌 Curling', isMedal: true },
            { time: '19:00-23:00', event: "Women's Singles Short Program", venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: false },
            { time: '12:30-14:10', event: "Women's Slopestyle Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '17:00-22:10', event: 'Gold Medal Game 🥇', venue: 'Milano', sport: '🏒 Ice Hockey (Women)', isMedal: true },
            { time: '17:00-18:30', event: "Women's Team Pursuit 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '10:00-12:00', event: 'Large Hill Qualification', venue: 'Val di Fiemme', sport: '🎿 Ski Jumping', isMedal: false },
            { time: '13:00-14:45', event: "Women's 10km Free 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb19: {
        date: 'Wednesday, February 19',
        events: [
            { time: '11:30-16:30', event: "Men's Parallel 🥇", venue: 'Cortina', sport: '⛷️ Alpine Skiing', isMedal: true },
            { time: '09:05-22:05', event: "Men's Round Robin / Semifinals", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '19:00-23:10', event: "Women's Singles Free Skating 🥇", venue: 'Torino', sport: '⛸️ Figure Skating', isMedal: true },
            { time: '10:00-12:00', event: "Men's Slopestyle Qualification", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: false },
            { time: '17:00-18:30', event: "Men's Team Pursuit 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-20:30', event: 'Large Hill Individual 🥇', venue: 'Val di Fiemme', sport: '🎿 Ski Jumping', isMedal: true },
            { time: '12:00-14:00', event: "Women's 10km Classical 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb20: {
        date: 'Thursday, February 20',
        events: [
            { time: '14:15-15:10', event: "Women's 12.5km Mass Start 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '09:05-22:05', event: "Men's Round Robin / Bronze Medal", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '12:30-14:10', event: "Men's Slopestyle Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '17:00-23:30', event: 'Gold Medal Game 🥇', venue: 'Milano', sport: '🏒 Ice Hockey (Men)', isMedal: true },
            { time: '17:00-18:30', event: "Women's Mass Start 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-21:15', event: 'Mixed Team Relay 🥇', venue: 'Baselga di Pinè', sport: '⛸️ Short Track', isMedal: true },
            { time: '12:00-14:00', event: "Men's 15km Classical 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb21: {
        date: 'Friday, February 21',
        events: [
            { time: '14:15-15:15', event: "Men's 15km Mass Start 🥇", venue: 'Anterselva', sport: '🎯 Biathlon', isMedal: true },
            { time: '15:00-20:30', event: "Women's Semifinals", venue: 'Cortina', sport: '🥌 Curling', isMedal: false },
            { time: '14:00-16:00', event: "Women's Cross Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '17:00-18:30', event: "Men's Mass Start 🥇", venue: 'Baselga di Pinè', sport: '⛸️ Speed Skating', isMedal: true },
            { time: '19:00-20:30', event: "Men's Large Hill Team 🥇", venue: 'Val di Fiemme', sport: '🎿 Ski Jumping', isMedal: true },
            { time: '11:30-13:30', event: "Women's 30km Mass Start 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true }
        ]
    },
    feb22: {
        date: 'Saturday, February 22',
        events: [
            { time: '15:00-20:30', event: "Men's Semifinals & Gold Medal 🥇", venue: 'Cortina', sport: '🥌 Curling', isMedal: true },
            { time: '14:00-16:00', event: "Men's Cross Finals 🥇", venue: 'Livigno', sport: '🎿 Freestyle Skiing', isMedal: true },
            { time: '12:00-14:30', event: "Men's 50km Mass Start 🥇", venue: 'Tesero', sport: '⛷️ Cross-Country Skiing', isMedal: true },
            { time: '20:00', event: 'Closing Ceremony', venue: 'Verona Arena', sport: '🎆 Ceremony', isMedal: false }
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
                const medalClass = event.isMedal ? 'medal-event' : '';
                html += `
                    <div class="event-item ${medalClass}">
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
