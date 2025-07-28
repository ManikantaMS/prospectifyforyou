-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY, -- Will be set to auth.uid() from Supabase Auth
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company_name TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  nuts_code TEXT UNIQUE NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create demographic_data table
CREATE TABLE IF NOT EXISTS demographic_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  population INTEGER NOT NULL,
  age_15_29 INTEGER NOT NULL,
  age_30_49 INTEGER NOT NULL,
  age_50_64 INTEGER NOT NULL,
  age_65_plus INTEGER NOT NULL,
  median_income INTEGER NOT NULL,
  average_income INTEGER NOT NULL,
  male_population INTEGER NOT NULL,
  female_population INTEGER NOT NULL,
  higher_education INTEGER NOT NULL,
  employment_rate DECIMAL(5, 2) NOT NULL,
  services_employment INTEGER NOT NULL,
  industry_employment INTEGER NOT NULL,
  agriculture_employment INTEGER NOT NULL,
  data_source TEXT NOT NULL DEFAULT 'eurostat',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(city_id)
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  target_cities TEXT[] NOT NULL,
  age_min INTEGER NOT NULL,
  age_max INTEGER NOT NULL,
  gender TEXT NOT NULL,
  min_income INTEGER NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign_performance table
CREATE TABLE IF NOT EXISTS campaign_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  revenue DECIMAL(10, 2) NOT NULL DEFAULT 0,
  cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, city_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(country);
CREATE INDEX IF NOT EXISTS idx_cities_nuts_code ON cities(nuts_code);
CREATE INDEX IF NOT EXISTS idx_demographic_data_city_id ON demographic_data(city_id);
CREATE INDEX IF NOT EXISTS idx_demographic_data_last_updated ON demographic_data(last_updated);
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_campaign_id ON campaign_performance(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_date ON campaign_performance(date);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (simplified for demo)
CREATE POLICY "Enable read access for all users" ON cities FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON demographic_data FOR SELECT USING (true);

-- Allow authenticated users to read their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own campaigns" ON campaigns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own campaign performance" ON campaign_performance FOR ALL USING (
  campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid())
);
