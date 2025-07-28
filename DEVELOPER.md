# Developer Documentation 👨‍💻

## API Reference

### Supabase Service Layer

The application uses a service layer pattern for data access through `lib/supabase-demographic-service.ts`.

#### Key Functions

##### `getCitiesWithDemographics(limit?: number)`
Fetches cities with their demographic data using joins.

```typescript
const cities = await getCitiesWithDemographics(20);
```

##### `getCityRecommendations(profile: CustomerProfile)`
Returns recommended cities based on customer profile matching.

```typescript
const recommendations = await getCityRecommendations({
  age_range: [25, 35],
  income_range: [50000, 80000],
  education_levels: ['bachelor'],
  interests: ['technology'],
  location_preferences: ['urban']
});
```

#### Error Handling
The service layer implements automatic fallback to mock data when Supabase is unavailable.

## Component Architecture

### Dashboard Components

#### `SupabaseDataProvider`
Context provider that manages global data state and Supabase connection.

```typescript
const { data, isLoading, error, refreshData } = useSupabaseData();
```

#### `CityRecommendations`
Smart component that generates city recommendations based on user profiles.

```typescript
<CityRecommendations 
  profile={customerProfile}
  onRecommendationSelect={handleCitySelect}
/>
```

#### `DashboardStats`
Displays key performance indicators and metrics.

```typescript
<DashboardStats 
  data={analyticsData}
  timeRange="30d"
/>
```

### UI Components (shadcn/ui)

All UI components are built using shadcn/ui and are fully customizable:

- `Button` - Various button styles and sizes
- `Card` - Container components with consistent styling
- `Chart` - Recharts integration for data visualization
- `Dialog` - Modal dialogs and overlays
- `Form` - Form components with validation
- `Table` - Data tables with sorting and pagination

## Database Schema Details

### Tables

#### `cities`
```sql
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  nuts_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `demographic_data`
```sql
CREATE TABLE demographic_data (
  id SERIAL PRIMARY KEY,
  city_id INTEGER REFERENCES cities(id),
  population INTEGER,
  age_15_29 INTEGER,
  age_30_49 INTEGER,
  age_50_64 INTEGER,
  age_65_plus INTEGER,
  median_income DECIMAL(10, 2),
  average_income DECIMAL(10, 2),
  male_population INTEGER,
  female_population INTEGER,
  higher_education DECIMAL(5, 2),
  employment_rate DECIMAL(5, 2),
  services_employment DECIMAL(5, 2),
  industry_employment DECIMAL(5, 2),
  agriculture_employment DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS)

RLS policies are implemented for secure data access:

```sql
-- Enable RLS
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographic_data ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access for authenticated users" ON cities
FOR SELECT USING (auth.role() = 'authenticated');
```

## State Management

### Context Pattern

The application uses React Context for global state management:

```typescript
// lib/auth-context.tsx
interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

### Data Flow

1. **Component Mount** → `SupabaseDataProvider` initializes
2. **Data Fetch** → Service layer queries Supabase
3. **State Update** → Context updates with fresh data
4. **Component Re-render** → UI reflects new data
5. **Error Handling** → Fallback to mock data if needed

## Performance Optimizations

### React Optimizations

- **Memoization**: Components use `React.memo` for expensive renders
- **Lazy Loading**: Code splitting with `React.lazy`
- **Virtual Scrolling**: For large data sets
- **Debounced Search**: Prevents excessive API calls

### Supabase Optimizations

- **Connection Pooling**: Reuse database connections
- **Query Optimization**: Use joins instead of multiple queries
- **Caching**: Client-side caching of frequently accessed data
- **Pagination**: Limit data fetching with pagination

## Testing Strategy

### Unit Tests
```bash
# Test individual components
pnpm test components/

# Test utility functions
pnpm test lib/
```

### Integration Tests
```bash
# Test component interactions
pnpm test:integration
```

### E2E Tests
```bash
# Test complete user flows
pnpm test:e2e
```

## Debugging

### Development Tools

1. **React DevTools**: Component hierarchy and state inspection
2. **Supabase Dashboard**: Database queries and logs
3. **Network Tab**: API request/response monitoring
4. **Console Logs**: Strategic logging throughout the application

### Common Issues

#### Supabase Connection
```typescript
// Check connection status
const { data, error } = await supabase.from('cities').select('count');
if (error) console.error('Connection failed:', error);
```

#### RLS Policies
```sql
-- Check current policies
SELECT * FROM pg_policies WHERE tablename = 'cities';
```

## Deployment Configuration

### Environment Variables

```bash
# Production
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=prod_service_key

# Staging
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=staging_anon_key
SUPABASE_SERVICE_ROLE_KEY=staging_service_key
```

### Build Configuration

```javascript
// next.config.mjs
const config = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
};
```

## Security Best Practices

### Data Protection
- Environment variables for sensitive data
- RLS policies for database security
- Input validation and sanitization
- HTTPS enforcement in production

### Authentication
- Secure session management
- JWT token validation
- Password hashing (handled by Supabase)
- Multi-factor authentication support

## Monitoring & Analytics

### Application Monitoring
- Error tracking with boundaries
- Performance monitoring
- User analytics
- Database query monitoring

### Metrics to Track
- Page load times
- API response times
- Error rates
- User engagement
- Database performance

## Contributing Guidelines

### Code Style
- ESLint configuration enforced
- Prettier for code formatting
- TypeScript strict mode
- Consistent naming conventions

### Pull Request Process
1. Create feature branch
2. Write tests for new features
3. Update documentation
4. Submit PR with clear description
5. Code review and approval
6. Merge to main branch

### Commit Convention
```
feat: add new city recommendation algorithm
fix: resolve dashboard loading issue
docs: update API documentation
style: improve component styling
refactor: optimize database queries
test: add unit tests for service layer
```

---

For more detailed information, refer to the inline code comments and TypeScript type definitions.
