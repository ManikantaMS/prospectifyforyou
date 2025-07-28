"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, ExternalLink, Copy, CheckCircle, AlertTriangle, Play, FileText, Settings } from "lucide-react"

export function DatabaseSetupGuide() {
  const [copiedScript, setCopiedScript] = useState<string | null>(null)

  const copyToClipboard = async (text: string, scriptName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedScript(scriptName)
      setTimeout(() => setCopiedScript(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const createTablesScript = `-- Enable necessary extensions
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

-- Enable Row Level Security (RLS)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
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
GRANT SELECT ON campaign_performance TO anon, authenticated;`

  const seedDataScript = `-- Insert Spanish cities with comprehensive demographic data
INSERT INTO cities (
    name, country, population, median_age, median_income, education_level, 
    employment_rate, industry_focus, growth_rate, cost_of_living_index, 
    business_friendliness_score, latitude, longitude, nuts_code
) VALUES 
(
    'Madrid', 'Spain', 6641000, 43.2, 35000, 'University', 92.5, 
    ARRAY['Technology', 'Finance', 'Tourism'], 2.1, 75, 8.2, 
    40.4168, -3.7038, 'ES30'
),
(
    'Barcelona', 'Spain', 5575000, 41.8, 32000, 'University', 89.3, 
    ARRAY['Technology', 'Design', 'Tourism'], 1.8, 72, 8.0, 
    41.3851, 2.1734, 'ES51'
),
(
    'Valencia', 'Spain', 1578000, 42.1, 28000, 'High School', 87.2, 
    ARRAY['Agriculture', 'Manufacturing', 'Services'], 1.5, 65, 7.5, 
    39.4699, -0.3763, 'ES52'
),
(
    'Seville', 'Spain', 1508000, 43.8, 26000, 'High School', 84.1, 
    ARRAY['Tourism', 'Agriculture', 'Aerospace'], 1.2, 62, 7.2, 
    37.3886, -5.9823, 'ES61'
),
(
    'Zaragoza', 'Spain', 674997, 44.1, 27500, 'High School', 85.8, 
    ARRAY['Manufacturing', 'Logistics', 'Services'], 1.3, 63, 7.3, 
    41.6488, -0.8891, 'ES24'
),
(
    'Málaga', 'Spain', 574654, 42.9, 25800, 'High School', 82.4, 
    ARRAY['Tourism', 'Technology', 'Services'], 2.3, 68, 7.8, 
    36.7213, -4.4214, 'ES61'
),
(
    'Murcia', 'Spain', 453258, 41.7, 24900, 'High School', 83.6, 
    ARRAY['Agriculture', 'Manufacturing', 'Services'], 1.7, 61, 7.1, 
    37.9922, -1.1307, 'ES62'
),
(
    'Palma', 'Spain', 416065, 43.5, 29200, 'High School', 88.9, 
    ARRAY['Tourism', 'Services', 'Maritime'], 1.9, 74, 7.9, 
    39.5696, 2.6502, 'ES53'
),
(
    'Las Palmas', 'Spain', 379925, 42.3, 26800, 'High School', 81.7, 
    ARRAY['Tourism', 'Maritime', 'Services'], 1.4, 69, 7.4, 
    28.1248, -15.4300, 'ES70'
),
(
    'Bilbao', 'Spain', 346843, 45.2, 33500, 'University', 91.2, 
    ARRAY['Industry', 'Finance', 'Technology'], 1.1, 76, 8.1, 
    43.2627, -2.9253, 'ES21'
);

-- Insert corresponding demographic data for each city
INSERT INTO demographic_data (
    city_id, population, age_15_29, age_30_49, age_50_64, age_65_plus,
    median_income, average_income, male_population, female_population,
    higher_education, employment_rate, services_employment, 
    industry_employment, agriculture_employment
)
SELECT 
    c.id,
    c.population,
    ROUND(c.population * 0.25)::INTEGER, -- age_15_29
    ROUND(c.population * 0.35)::INTEGER, -- age_30_49
    ROUND(c.population * 0.25)::INTEGER, -- age_50_64
    ROUND(c.population * 0.15)::INTEGER, -- age_65_plus
    c.median_income,
    ROUND(c.median_income * 1.15)::INTEGER, -- average_income
    ROUND(c.population * 0.49)::INTEGER, -- male_population
    ROUND(c.population * 0.51)::INTEGER, -- female_population
    ROUND(c.population * 0.35)::INTEGER, -- higher_education
    c.employment_rate,
    ROUND(c.population * 0.65)::INTEGER, -- services_employment
    ROUND(c.population * 0.25)::INTEGER, -- industry_employment
    ROUND(c.population * 0.10)::INTEGER  -- agriculture_employment
FROM cities c
WHERE c.country = 'Spain';

-- Insert sample campaign performance data
INSERT INTO campaign_performance (
    campaign_id, city_id, impressions, clicks, conversions, cost, revenue, date
)
SELECT 
    'CAMP_' || EXTRACT(YEAR FROM CURRENT_DATE) || '_' || LPAD(ROW_NUMBER() OVER()::TEXT, 3, '0'),
    c.id,
    ROUND(RANDOM() * 10000 + 1000)::INTEGER, -- impressions
    ROUND(RANDOM() * 500 + 50)::INTEGER,     -- clicks
    ROUND(RANDOM() * 25 + 5)::INTEGER,       -- conversions
    ROUND((RANDOM() * 1000 + 100)::NUMERIC, 2), -- cost
    ROUND((RANDOM() * 2000 + 200)::NUMERIC, 2), -- revenue
    CURRENT_DATE - INTERVAL '1 day' * FLOOR(RANDOM() * 30) -- random date within last 30 days
FROM cities c
WHERE c.country = 'Spain';`

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Database Setup Guide</span>
        </CardTitle>
        <CardDescription>
          Set up your Supabase database tables and seed data to enable live data functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Status Alert */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Database Setup Required:</strong> Your Supabase project needs tables to store city and demographic
              data. Follow the steps below to set up your database.
            </AlertDescription>
          </Alert>

          {/* Step-by-step guide */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-sm">
                Step 1
              </Badge>
              <span className="font-medium">Open Supabase SQL Editor</span>
            </div>

            <div className="pl-6 space-y-3">
              <p className="text-sm text-gray-600">
                Go to your Supabase dashboard and open the SQL Editor to run the database scripts.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://supabase.com/dashboard/project/jtlajmgmsbwjtqtphgyi/sql"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open SQL Editor
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-sm">
                Step 2
              </Badge>
              <span className="font-medium">Run Database Scripts</span>
            </div>

            <div className="pl-6">
              <Tabs defaultValue="create-tables" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create-tables" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Create Tables</span>
                  </TabsTrigger>
                  <TabsTrigger value="seed-data" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Seed Data</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create-tables" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">1. Create Tables Script</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(createTablesScript, "create-tables")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedScript === "create-tables" ? "Copied!" : "Copy Script"}
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-xs overflow-x-auto max-h-64">
                        <code>{createTablesScript}</code>
                      </pre>
                    </div>
                    <Alert>
                      <Play className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Run this first:</strong> Copy the script above and paste it into the Supabase SQL
                        Editor, then click "Run".
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>

                <TabsContent value="seed-data" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">2. Seed Data Script</h4>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(seedDataScript, "seed-data")}>
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedScript === "seed-data" ? "Copied!" : "Copy Script"}
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-xs overflow-x-auto max-h-64">
                        <code>{seedDataScript}</code>
                      </pre>
                    </div>
                    <Alert>
                      <Play className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Run this second:</strong> After creating tables, copy this script and run it to populate
                        your database with Spanish cities data.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-sm">
                Step 3
              </Badge>
              <span className="font-medium">Verify Setup</span>
            </div>

            <div className="pl-6 space-y-3">
              <p className="text-sm text-gray-600">
                After running both scripts, refresh this page to test the connection and verify your data is loaded.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Tables created: cities, demographic_data, campaign_performance</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Sample data: 10 Spanish cities with demographics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Permissions: Public read access configured</span>
              </div>
            </div>
          </div>

          {/* Final note */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🎉 What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your app will automatically detect the database tables</li>
              <li>• Live data will replace the mock data</li>
              <li>• You'll see real Spanish cities with demographic information</li>
              <li>• The dashboard will show "🟢 LIVE" status instead of "🔴 DEMO"</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
