-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    population INTEGER,
    median_age DECIMAL(4,2),
    median_income INTEGER,
    education_level VARCHAR(100),
    employment_rate DECIMAL(5,2),
    industry_focus TEXT[],
    growth_rate DECIMAL(4,2),
    cost_of_living_index INTEGER,
    business_friendliness_score DECIMAL(3,1),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    nuts_code VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create demographic_data table
CREATE TABLE IF NOT EXISTS demographic_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
    population INTEGER,
    age_15_29 INTEGER,
    age_30_49 INTEGER,
    age_50_64 INTEGER,
    age_65_plus INTEGER,
    median_income INTEGER,
    average_income INTEGER,
    male_population INTEGER,
    female_population INTEGER,
    higher_education INTEGER,
    employment_rate DECIMAL(5,2),
    services_employment INTEGER,
    industry_employment INTEGER,
    agriculture_employment INTEGER,
    data_source VARCHAR(50) DEFAULT 'eurostat',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign_performance table
CREATE TABLE IF NOT EXISTS campaign_performance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id VARCHAR(255) NOT NULL,
    city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    cost DECIMAL(10,2) DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(country);
CREATE INDEX IF NOT EXISTS idx_cities_population ON cities(population DESC);
CREATE INDEX IF NOT EXISTS idx_demographic_data_city_id ON demographic_data(city_id);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_city_id ON campaign_performance(city_id);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_date ON campaign_performance(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_cities_updated_at ON cities;
CREATE TRIGGER update_cities_updated_at
    BEFORE UPDATE ON cities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access on cities" ON cities
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on demographic_data" ON demographic_data
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on campaign_performance" ON campaign_performance
    FOR SELECT USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON cities TO anon, authenticated;
GRANT SELECT ON demographic_data TO anon, authenticated;
GRANT SELECT ON campaign_performance TO anon, authenticated;
