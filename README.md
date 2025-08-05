# Prospectify v2 🎯

A comprehensive demographic analytics dashboard for market research and customer profiling, built with Next.js and Supabase.

## 🌟 Overview

Prospectify v2 is a powerful demographic analytics platform that helps small and medium-sized businesses (SMBs) identify the best European cities for targeted marketing campaigns. The application provides intelligent city recommendations based on customer demographic profiles and offers comprehensive analytics for campaign performance tracking using real-time data from trusted sources like Eurostat and INSEE.

## ✨ Features

### 🏙️ Core Features
- **Smart City Recommendations**: AI-powered city suggestions based on customer demographic profiles
- **AI Chatbot Assistant**: Intelligent conversational AI for product recommendations and business guidance
- **Event Discovery & Management**: Discover relevant events and manage registrations with comprehensive search
- **Physical Marketing Hub**: Book event stalls, manage campaigns, and track physical marketing performance
- **European Market Focus**: Specialized targeting for European cities with verified demographic data
- **Real-time Demographics**: Live demographic data integration with Supabase
- **Interactive Dashboard**: Comprehensive analytics with charts and visualizations
- **Campaign Performance**: Track and analyze marketing campaign effectiveness across digital and physical channels
- **ROI Analysis**: Detailed return on investment calculations and reporting

### 📊 Analytics & Reporting
- **Performance Overview**: Key metrics and KPIs for both digital and physical campaigns
- **Event Analytics**: Track event attendance, engagement, and conversion rates
- **Physical Campaign Metrics**: Monitor foot traffic, leads generated, and stall performance
- **Campaign Timeline**: Visual timeline of campaign activities across all channels
- **City Performance**: Comparative analysis across different cities and event locations
- **Lead Management**: Comprehensive lead tracking and conversion analysis
- **Export Reports**: Generate and download detailed analytics reports (PDF, Excel)
- **Custom Metrics**: Configurable dashboard widgets with real-time updates

### 🤖 AI & Automation Features
- **Smart Chatbot**: 23-step conversation flows for product recommendations and business guidance
- **Event Discovery**: AI-powered event matching based on business profile and target demographics
- **Campaign Optimization**: Intelligent suggestions for improving campaign performance
- **Market Intelligence**: Automated insights and recommendations for market expansion

### 🎪 Event & Physical Marketing
- **Event Discovery**: Browse and search 6+ curated European events with detailed venue information
- **Registration Management**: Complete event registration system with status tracking
- **Stall Booking**: Book and manage physical marketing stalls with different tier options
- **Location Scouting**: Intelligence-driven venue recommendations with demographic analysis
- **Lead Capture**: Integrated lead management system for physical campaigns
- **Performance Tracking**: Real-time monitoring of foot traffic, leads, and conversion rates

### 🎨 User Experience
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Light Theme**: Clean, professional design with consistent branding
- **Interactive Charts**: Powered by Recharts for dynamic visualizations

### 🛡️ Compliance & Security
- **GDPR Compliance**: Full adherence to European data protection regulations
- **Data Privacy**: Comprehensive privacy protection with user consent management
- **Security Standards**: ISO 27001 aligned security measures and protocols
- **Ethical AI**: Transparent and bias-free AI recommendations
- **Legal Framework**: Complete legal documentation and terms of service
- **Audit Trail**: Compliance monitoring dashboard with activity tracking
- **Incident Response**: Structured security incident reporting procedures
- **Real-time Updates**: Live data synchronization
- **Consistent Navigation**: Smart navigation patterns across all pages

### 🔐 Authentication & Security
- **Real Supabase Authentication**: Complete user registration and login system
- **Email/Password Auth**: Secure authentication with metadata support
- **Profile Management**: Automatic user profile creation with company/industry data
- **Protected Routes**: Middleware-based route protection
- **Row Level Security**: Database-level security policies

### 📄 Complete Page Coverage
- **Homepage**: Modern landing page with hero, features, testimonials, and CTA sections
- **About Page**: Comprehensive founder and mentor profiles with LinkedIn integration
- **Contact Page**: Professional contact form with business information
- **Terms & Privacy**: Complete legal pages with GDPR compliance
- **Pricing Page**: Detailed pricing tiers with feature comparisons
- **Dashboard**: Full analytics dashboard with multiple views
- **Authentication**: Complete login/signup flow with error handling

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript 5+ (Full type safety)
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React 0.454.0
- **Charts**: Recharts (latest)
- **Forms**: React Hook Form 7.54.1 + Zod validation
- **State Management**: React Context API
- **Theme**: Light theme with consistent branding

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (@supabase/auth-helpers-nextjs 0.10.0)
- **Real-time**: Supabase Realtime subscriptions
- **API**: REST APIs with Row Level Security (RLS)
- **Storage**: Supabase Storage for file uploads
- **Database Client**: @supabase/supabase-js (latest)
- **SSR Support**: @supabase/ssr 0.6.1

### Development & Build Tools
- **Package Manager**: pnpm (recommended)
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript with strict mode
- **Build Tool**: Next.js built-in bundling
- **CSS Processing**: PostCSS + Autoprefixer
- **Code Quality**: Prettier + ESLint integration

### External Data Sources
- **Eurostat**: European demographic and economic statistics
- **INSEE**: French national statistics
- **Open Government APIs**: Various European statistical offices

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
   
   # Optional: For admin operations only
   # SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
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
   Navigate to [http://localhost:3002](http://localhost:3002)
   
   > **Note**: The app runs on port 3002 for development to avoid conflicts

## 📁 Project Structure

```
prospectifyv2/
├── app/                      # Next.js 15 app directory
│   ├── (auth)/              # Auth route group
│   │   ├── login/           # Login page with Supabase auth
│   │   └── signup/          # Registration with company metadata
│   ├── dashboard/           # Protected dashboard pages
│   │   ├── analytics/       # Analytics sub-pages with breadcrumbs
│   │   └── page.tsx         # Main dashboard with city recommendations
│   ├── about/               # About page with founder/mentor profiles
│   ├── contact/             # Contact page with form and business info
│   ├── pricing/             # Pricing tiers page
│   ├── terms/               # Terms of Service
│   ├── privacy/             # Privacy Policy (GDPR compliant)
│   ├── globals.css          # Global Tailwind styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Homepage with landing sections
├── components/              # React components
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── city-recommendations.tsx
│   │   ├── dashboard-stats.tsx
│   │   ├── dashboard-header.tsx
│   │   └── customer-profile-form.tsx
│   ├── analytics/           # Analytics visualization components
│   │   ├── performance-overview.tsx
│   │   ├── campaign-metrics.tsx
│   │   ├── roi-analysis.tsx
│   │   └── export-reports.tsx
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx       # Button variants
│   │   ├── card.tsx         # Card layouts
│   │   ├── form.tsx         # Form components
│   │   ├── input.tsx        # Input fields
│   │   └── [30+ components] # Complete UI component library
│   ├── page-header.tsx      # Consistent navigation component
│   ├── breadcrumb.tsx       # Dashboard breadcrumb navigation
│   ├── navbar.tsx           # Main navigation with responsive design
│   ├── footer.tsx           # Footer with links and branding
│   ├── hero-section.tsx     # Homepage hero section
│   ├── features-section.tsx # Feature highlights
│   ├── testimonials-section.tsx # Customer testimonials
│   └── cta-section.tsx      # Call-to-action sections
├── lib/                     # Utility libraries and configuration
│   ├── supabase.ts          # Supabase client configuration
│   ├── auth-context.tsx     # Authentication context provider
│   ├── supabase-demographic-service.ts # Data service layer
│   ├── database.types.ts    # Auto-generated TypeScript types
│   ├── eurostat-api.ts      # European statistics API integration
│   ├── demographic-service.ts # Demographic data processing
│   └── utils.ts             # Utility functions and helpers
├── hooks/                   # Custom React hooks
│   ├── use-mobile.tsx       # Mobile device detection
│   └── use-toast.ts         # Toast notification system
├── public/                  # Static assets
│   ├── placeholder-logo.svg # Logo and branding assets
│   └── [images]             # Placeholder images
├── scripts/                 # Database setup scripts
│   ├── create-tables-v2.sql # Complete database schema
│   └── seed-cities-v2.sql   # Sample data population
├── middleware.ts            # Route protection and auth middleware
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── components.json          # shadcn/ui configuration
└── tsconfig.json           # TypeScript configuration
```

## 🗄️ Database Schema

### Core Tables
- **users**: User authentication and profiles with company metadata
- **user_profiles**: Extended user information and preferences
- **cities**: European city master data with geographic information
- **demographic_data**: Real-time demographic statistics for each city
- **campaigns**: Marketing campaign information and tracking
- **campaign_performance**: Campaign metrics and ROI analysis
- **analytics_events**: User interaction and engagement tracking

### Authentication & Security
- **Row Level Security (RLS)**: Database-level security policies
- **User Triggers**: Automatic profile creation on signup
- **Real-time Subscriptions**: Live data updates via Supabase
- **API Rate Limiting**: Protection against abuse

### Key Relationships
- Users → User Profiles (1:1)
- Users → Campaigns (1:N)
- Cities → Demographic Data (1:N)
- Campaigns → Campaign Performance (1:N)
- Users → Analytics Events (1:N)

## 🎨 Design System

### Theme & Branding
- **Primary Colors**: Blue gradient theme (`from-blue-50 to-indigo-100`)
- **Accent Colors**: Purple, Green, Orange for categorization
- **Typography**: Clean, professional font hierarchy
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation with hover effects

### Component Library
- **30+ UI Components**: Complete shadcn/ui implementation
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Consistent Patterns**: Unified design language across all pages

### Navigation Patterns
- **Marketing Pages**: Full navbar + footer (Home, Pricing)
- **Standalone Pages**: PageHeader with smart back navigation (About, Contact, Terms)
- **Auth Pages**: Minimal design with "back to home" (Login, Signup)
- **Dashboard**: DashboardHeader + breadcrumb navigation (Dashboard, Analytics)

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
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for admin operations) | ⚠️ Optional |

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

- **Real Authentication**: Complete Supabase Auth implementation with email/password
- **Row Level Security**: Database-level security with Supabase RLS policies
- **Route Protection**: Middleware-based authentication for protected pages
- **Environment Protection**: All sensitive data in environment variables
- **Type Safety**: Full TypeScript implementation with strict mode
- **Input Validation**: Client and server-side validation with Zod schemas
- **Error Boundaries**: Graceful error handling throughout the application
- **CSRF Protection**: Built-in Next.js security features
- **Session Management**: Secure session handling with Supabase

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience with detailed analytics
- **Tablet**: Optimized layouts and touch interactions
- **Mobile**: Mobile-first design with simplified navigation and touch-friendly UI
- **Progressive Enhancement**: Works across all modern browsers

## 🚦 Performance Optimization

- **Next.js 15**: Latest framework with app directory and React 19
- **Server Components**: Optimized rendering performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: Browser and CDN caching strategies
- **Bundle Analysis**: Optimized bundle sizes

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

## 📧 Support & Contact

For support, questions, and business inquiries:
- **Email**: ManiRamaiah@prospectify.com
- **Address**: Mayor Street Lower, International Financial Services Centre, Dublin 1, Ireland
- **LinkedIn**: [Connect with Manikanta MS](https://www.linkedin.com/in/mani-kanta-ms)
- **GitHub Issues**: Create an issue for technical problems
- **Business Hours**: Monday-Friday, 9:00 AM - 6:00 PM (GMT)

## 🗺️ Roadmap & Completed Features

### ✅ Completed Features (v2.0)
- [x] Complete authentication system with Supabase
- [x] Full responsive design with modern UI
- [x] About page with founder and mentor profiles
- [x] Contact page with business information
- [x] Terms of Service and Privacy Policy pages
- [x] Consistent navigation patterns across all pages
- [x] Dashboard with city recommendations
- [x] Analytics dashboard with charts and metrics
- [x] Real-time data integration
- [x] Professional landing page with all sections
- [x] Pricing page with detailed tiers
- [x] Complete form handling and validation
- [x] Error boundaries and graceful error handling
- [x] TypeScript implementation with full type safety
- [x] Mobile-first responsive design

### 🚀 Upcoming Features (v2.1)
- [ ] Advanced filtering and search capabilities
- [ ] Custom report builder with export options
- [ ] API integrations with external European data sources
- [ ] Machine learning predictions for campaign optimization
- [ ] Multi-language support (EN, FR, DE, ES, IT)
- [ ] Advanced user permissions and team collaboration
- [ ] Real-time collaboration features
- [ ] Enhanced data visualization with interactive maps
- [ ] Campaign automation and scheduling
- [ ] Advanced analytics with predictive insights

---

**Built with ❤️ by [ManikantaMS](https://github.com/ManikantaMS)**
