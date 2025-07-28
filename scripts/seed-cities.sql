-- Insert Spanish cities with comprehensive demographic data
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
WHERE c.country = 'Spain';
