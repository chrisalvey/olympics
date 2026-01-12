# Email Notification Setup

The GitHub Actions workflow will send you emails when:
- ✅ Medal counts are successfully updated
- ❌ The scraper encounters an error

## Setup Instructions

### 1. Create a Gmail App Password

If using Gmail (recommended):

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Select app: **Mail**
5. Select device: **Other** (type "GitHub Olympics Bot")
6. Click **Generate**
7. Copy the 16-character password (you'll need this in step 2)

### 2. Add Secrets to GitHub

1. Go to your repository: https://github.com/chrisalvey/olympics
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

   **Secret 1:**
   - Name: `EMAIL_USERNAME`
   - Value: Your Gmail address (e.g., `youremail@gmail.com`)

   **Secret 2:**
   - Name: `EMAIL_PASSWORD`
   - Value: The 16-character app password from step 1

   **Secret 3:**
   - Name: `EMAIL_TO`
   - Value: Email address to receive notifications (can be the same as EMAIL_USERNAME)

### 3. Test It

Once secrets are added, you can test by:
- Manually triggering the workflow from the Actions tab
- Waiting for the next scheduled run (every 6 hours during Olympics)

## Using a Different Email Provider

If not using Gmail, update these values in `.github/workflows/update-medals.yml`:

**Outlook/Hotmail:**
```yaml
server_address: smtp-mail.outlook.com
server_port: 587
secure: true
```

**Yahoo:**
```yaml
server_address: smtp.mail.yahoo.com
server_port: 465
secure: true
```

**Custom SMTP:**
```yaml
server_address: your.smtp.server
server_port: 587
secure: true
```

## Email Examples

### Success Email
```
Subject: ✅ Olympics Medal Update - 42

Medal counts have been updated successfully!

Run: 42
Time: 2026-02-10T14:30:00Z

View the updated leaderboard:
https://chrisalvey.github.io/olympics

View the commit:
https://github.com/chrisalvey/olympics/commit/abc123
```

### Error Email
```
Subject: ❌ Olympics Medal Scraper Failed - 43

The medal scraper encountered an error!

Run: 43
Time: 2026-02-10T20:30:00Z

View the failed run:
https://github.com/chrisalvey/olympics/actions/runs/12345

Please check the logs and fix the issue.
```

## Disable Notifications

To disable email notifications:
1. Comment out the email steps in `.github/workflows/update-medals.yml`
2. Or delete the GitHub secrets

## GitHub's Built-in Notifications

You can also enable GitHub's default notifications:
1. Go to https://github.com/settings/notifications
2. Check **"Email"** under "Actions"
3. You'll receive emails for all workflow runs (less customized)
