# 🏅 Winter Olympics Fantasy Draft

A fantasy sports game for the **Milano Cortina 2026 Winter Olympics** (February 6-22, 2026).

## How It Works

1. **Draft Your Team**: Select 3-10 countries with a budget of 100 points
2. **Countries are Priced**: Based on historical performance (2018 & 2022 Olympics)
3. **Earn Points**: Your countries earn points for every medal they win:
   - 🥇 Gold = 3 points
   - 🥈 Silver = 2 points
   - 🥉 Bronze = 1 point
4. **Compete**: Watch the leaderboard to see who drafted the best team!

## Live Site

- **Draft Page**: [chrisalvey.github.io/olympics/draft.html](https://chrisalvey.github.io/olympics/draft.html)
- **Leaderboard**: [chrisalvey.github.io/olympics](https://chrisalvey.github.io/olympics)

## Automated Medal Updates

Medal counts are automatically updated every 6 hours during the Olympics using:
- **Wikipedia Scraper**: Fetches data from the official medal table
- **GitHub Actions**: Runs the scraper automatically and commits updates

### Manual Update

You can manually trigger a medal update:
```bash
npm run scrape
```

Or trigger the GitHub Action from the [Actions tab](../../actions/workflows/update-medals.yml).

## Project Structure

```
├── index.html           # Leaderboard page
├── draft.html           # Draft submission page
├── app.js              # Draft app logic
├── leaderboard.js      # Leaderboard logic
├── medals.json         # Current medal counts (auto-updated)
├── countries.json      # Country pricing data
├── scrape-medals.js    # Wikipedia medal scraper
├── update-pricing.js   # Historical data pricing tool
└── .github/workflows/
    └── update-medals.yml  # Automated update workflow
```

## Technologies

- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Backend**: Firebase Firestore (for storing team submissions)
- **Automation**: GitHub Actions, Node.js scraper
- **Hosting**: GitHub Pages

## Development

### Prerequisites
```bash
npm install
```

### Local Testing
```bash
# Start local server
npx http-server -p 8080

# Test medal scraper
npm run scrape

# Update country pricing (based on historical data)
npm run update-pricing
```

## License

MIT
