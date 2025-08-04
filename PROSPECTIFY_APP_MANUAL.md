# Prospectify App Manual

## Overview
Prospectify is a Next.js 15.2.4 web application for campaign management, analytics, and city recommendations, integrated with Supabase and Eurostat data. It features modular dashboard pages, demo login, waitlist, and real-time insights for marketing teams.

---

## Key Features
- **Dashboard Navigation**: Unified navigation for campaigns, analytics, profile, and settings.
- **Campaign Management**: Create, view, and manage marketing campaigns.
- **Analytics**: Real-time metrics, city recommendations, and Eurostat demographic insights.
- **Profile Management**: View and update user info, activity, preferences, and security settings.
- **Settings**: Configure notifications, integrations, and campaign defaults.
- **Demo Login & Waitlist**: Try the app with demo credentials or join the waitlist.
- **Enhanced City Recommendations**: Live Eurostat data, mock fallback, and ranking for campaign targeting.
- **Error Handling**: Graceful fallback to cached/mock data if Supabase or Eurostat is unavailable.
- **Modern UI**: Built with shadcn/ui, lucide-react icons, and Tailwind CSS.

---

## Page-by-Page Guide

### 1. Login & Signup
- **Login**: Standard login, demo login option for quick access.
- **Signup**: Register new users, join waitlist if registration is closed.

### 2. Dashboard
- **Navigation**: Sidebar or top navigation to switch between Campaigns, Analytics, Profile, and Settings.
- **Stats**: Overview of campaigns, performance, and recommendations.
- **Customer Profile**: Define target customer demographics (age, income, education, interests, location) to get personalized city recommendations.
- **Quick Recommendations**: Real-time city matches based on your customer profile with match scores and reasoning.
- **Data Management**: Monitor database connections, data quality, and manage data sources with import/export capabilities. Features include CSV/JSON import with local storage persistence and data export functionality.

### 3. Campaigns
- **Create Campaign**: Dialog to add new campaigns with targeting options.
- **Campaign List**: View all campaigns, status, and quick actions.
- **Campaign Stats**: Metrics for each campaign (reach, engagement, ROI).

### 4. Analytics
- **City Recommendations**: Real-time ranking of cities for campaign targeting, based on Eurostat data.
- **Performance Overview**: Charts and metrics for campaign effectiveness.
- **Export Reports**: Download analytics data for offline review.

### 5. Profile
- **Profile Header**: User avatar, name, and quick links.
- **Profile Overview**: Personal info and account details.
- **Activity**: Recent actions and login history.
- **Preferences**: Notification and display settings.
- **Security**: Password, 2FA, and account protection.

### 6. Settings
- **Campaign Defaults**: Set default targeting and budget options.
- **Integration Settings**: Connect with external services (e.g., Supabase).
- **Notification Settings**: Email, SMS, and app notifications.
- **Profile Settings**: Update user info and preferences.

---

## How to Use
1. **Login or Signup**: Use demo login for quick access or register a new account.
2. **Navigate Dashboard**: Use sidebar/top navigation to access campaigns, analytics, profile, and settings.
3. **Create Campaigns**: Go to Campaigns, click 'Create', fill in details, and launch.
4. **View Analytics**: Check city recommendations and campaign performance in Analytics.
5. **Manage Profile**: Update your info, view activity, and set preferences in Profile.
6. **Configure Settings**: Adjust campaign defaults, integrations, and notifications in Settings.
7. **Export Data**: Download reports from Analytics for further analysis.

---

## Technical Details
- **Tech Stack**: Next.js, TypeScript, Supabase, shadcn/ui, lucide-react, Tailwind CSS.
- **Data Sources**: Eurostat API, Supabase database.
- **Error Handling**: Fallback to mock/cached data if live data is unavailable.
- **Version Control**: Git, GitHub, Vercel for deployment.

---

## Deployment
- **Local**: Run `npm install` then `npm run dev` to start the app at `http://localhost:3000`.
- **Production**: Merge feature branch to `main` and Vercel will auto-deploy.

---

## Notes
- Do not commit or push `node_modules` or large zip files.
- All features are modular and can be extended.
- For support, check the README or contact the maintainer.

---

## Maintainer
- GitHub: [ManikantaMS](https://github.com/ManikantaMS)
- For issues, open a GitHub issue or pull request.

---

## Enhancement: Local Storage for Imported Data

- **Feature**: Imported data in the Data Management panel is now stored in local storage.
- **Purpose**: Ensures imported data persists across page refreshes or browser restarts.
- **Scope**: This enhancement applies only to imported data. Other data continues to follow the existing logic.
- **Functionality**: 
  - CSV/JSON file import with real-time parsing
  - Data persistence using browser localStorage
  - Duplicate prevention by city name and country
  - Export current dataset as CSV
- **Testing**: Successfully tested with CSV import (Oslo, Krakow, Bologna cities)
- **Future Plan**: Integrate database storage for imported data to enable cross-device access.
