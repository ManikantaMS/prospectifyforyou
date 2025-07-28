# Prospectify v2 🎯

A comprehensive demographic analytics dashboard for market research and customer profiling, built with Next.js and Supabase.

## 🌟 Overview

Prospectify v2 is a powerful demographic analytics platform that helps businesses understand their target markets through detailed city-level demographic data. The application provides intelligent city recommendations based on customer profiles and offers comprehensive analytics for campaign performance tracking.

## ✨ Features

### 🏙️ Core Features
- **Smart City Recommendations**: AI-powered city suggestions based on customer demographic profiles
- **Real-time Demographics**: Live demographic data integration with Supabase
- **Interactive Dashboard**: Comprehensive analytics with charts and visualizations
- **Campaign Performance**: Track and analyze marketing campaign effectiveness
- **ROI Analysis**: Detailed return on investment calculations and reporting

### 📊 Analytics & Reporting
- **Performance Overview**: Key metrics and KPIs at a glance
- **Campaign Timeline**: Visual timeline of campaign activities
- **City Performance**: Comparative analysis across different cities
- **Export Reports**: Generate and download detailed analytics reports
- **Custom Metrics**: Configurable dashboard widgets

### 🎨 User Experience
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme switching support
- **Interactive Charts**: Powered by Recharts for dynamic visualizations
- **Real-time Updates**: Live data synchronization

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4 (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **TypeScript**: Full type safety
- **State Management**: React Context API

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **API**: REST APIs with Row Level Security (RLS)

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in bundling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ManikantaMS/prospectifyforyou.git
   cd prospectifyforyou
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Database Setup**
   - Run the SQL scripts in `/scripts/` directory in your Supabase SQL editor:
     - `create-tables-v2.sql` - Creates the database schema
     - `seed-cities-v2.sql` - Populates with sample data

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
prospectifyv2/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   │   ├── analytics/     # Analytics sub-pages
│   │   └── page.tsx       # Main dashboard
│   ├── login/             # Authentication pages
│   ├── signup/
│   ├── pricing/
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── analytics/         # Analytics components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── ...               # Other components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client configuration
│   ├── supabase-demographic-service.ts  # Data service layer
│   ├── database.types.ts # TypeScript database types
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── scripts/              # Database scripts
│   ├── create-tables-v2.sql
│   └── seed-cities-v2.sql
└── styles/               # Global styles
```

## 🗄️ Database Schema

### Core Tables
- **users**: User authentication and profiles
- **cities**: City master data with geographic information
- **demographic_data**: Demographic statistics for each city
- **campaigns**: Marketing campaign information
- **campaign_performance**: Campaign metrics and results

### Key Relationships
- Cities → Demographic Data (1:N)
- Users → Campaigns (1:N)
- Campaigns → Campaign Performance (1:N)

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the provided SQL scripts
3. Configure Row Level Security (RLS) policies
4. Set up authentication providers if needed

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |

## 📊 Features in Detail

### City Recommendations Engine
The application uses an intelligent algorithm to recommend cities based on:
- Age demographics
- Income levels
- Education statistics
- Employment rates
- Industry distribution

### Analytics Dashboard
- **Performance Metrics**: Track key performance indicators
- **Demographic Insights**: Analyze population characteristics
- **Campaign Effectiveness**: Monitor marketing campaign success
- **ROI Calculations**: Calculate return on investment
- **Trend Analysis**: Identify patterns and trends

### Data Management
- **Real-time Sync**: Live data updates from Supabase
- **Data Validation**: Input validation and error handling
- **Fallback System**: Mock data fallback for offline scenarios
- **Export Capabilities**: Download reports in various formats

## 🧪 Development

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Building for Production
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Code Quality
```bash
# Lint code
pnpm lint

# Type check
pnpm type-check
```

## 🔒 Security Features

- **Row Level Security**: Database-level security with Supabase RLS
- **Environment Protection**: Sensitive data excluded from version control
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Client and server-side validation
- **Error Boundaries**: Graceful error handling

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layouts and touch interactions
- **Mobile**: Mobile-first design with simplified navigation

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
pnpm build

# Deploy the .next folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the amazing backend platform
- **Vercel** for Next.js and hosting
- **shadcn/ui** for beautiful UI components
- **Recharts** for interactive charts
- **Tailwind CSS** for styling utilities

## 📧 Support

For support and questions:
- Create an issue on GitHub
- Contact: [Your email/contact information]

## 🗺️ Roadmap

### Upcoming Features
- [ ] Advanced filtering and search
- [ ] Custom report builder
- [ ] API integrations with external data sources
- [ ] Machine learning predictions
- [ ] Multi-language support
- [ ] Advanced user permissions
- [ ] Real-time collaboration features

---

**Built with ❤️ by [ManikantaMS](https://github.com/ManikantaMS)**
