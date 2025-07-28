-- Insert major Spanish cities
INSERT INTO cities (name, country, nuts_code, latitude, longitude) VALUES
('Madrid', 'Spain', 'ES30', 40.4168, -3.7038),
('Barcelona', 'Spain', 'ES51', 41.3851, 2.1734),
('Valencia', 'Spain', 'ES52', 39.4699, -0.3763),
('Seville', 'Spain', 'ES61', 37.3886, -5.9823),
('Zaragoza', 'Spain', 'ES24', 41.6488, -0.8891),
('Málaga', 'Spain', 'ES61', 36.7213, -4.4217),
('Murcia', 'Spain', 'ES62', 37.9922, -1.1307),
('Palma', 'Spain', 'ES53', 39.5696, 2.6502),
('Las Palmas', 'Spain', 'ES70', 28.1235, -15.4363),
('Bilbao', 'Spain', 'ES21', 43.2627, -2.9253)
ON CONFLICT (nuts_code) DO NOTHING;

-- Insert major French cities
INSERT INTO cities (name, country, nuts_code, latitude, longitude) VALUES
('Paris', 'France', 'FR10', 48.8566, 2.3522),
('Lyon', 'France', 'FR71', 45.7640, 4.8357),
('Marseille', 'France', 'FR93', 43.2965, 5.3698),
('Toulouse', 'France', 'FR62', 43.6047, 1.4442),
('Nice', 'France', 'FR93', 43.7102, 7.2620),
('Nantes', 'France', 'FR51', 47.2184, -1.5536),
('Strasbourg', 'France', 'FR42', 48.5734, 7.7521),
('Montpellier', 'France', 'FR81', 43.6108, 3.8767)
ON CONFLICT (nuts_code) DO NOTHING;

-- Insert major German cities
INSERT INTO cities (name, country, nuts_code, latitude, longitude) VALUES
('Berlin', 'Germany', 'DE30', 52.5200, 13.4050),
('Hamburg', 'Germany', 'DE60', 53.5511, 9.9937),
('Munich', 'Germany', 'DE21', 48.1351, 11.5820),
('Cologne', 'Germany', 'DEA2', 50.9375, 6.9603),
('Frankfurt', 'Germany', 'DE71', 50.1109, 8.6821),
('Stuttgart', 'Germany', 'DE11', 48.7758, 9.1829),
('Düsseldorf', 'Germany', 'DEA1', 51.2277, 6.7735),
('Dortmund', 'Germany', 'DEA5', 51.5136, 7.4653)
ON CONFLICT (nuts_code) DO NOTHING;

-- Add sample demographic data for Spanish cities
INSERT INTO demographic_data (
  city_id, population, age_15_29, age_30_49, age_50_64, age_65_plus,
  median_income, average_income, male_population, female_population,
  higher_education, employment_rate, services_employment, 
  industry_employment, agriculture_employment, data_source
) 
SELECT 
  c.id,
  CASE c.name
    WHEN 'Madrid' THEN 3223334
    WHEN 'Barcelona' THEN 1620343
    WHEN 'Valencia' THEN 794875
    WHEN 'Seville' THEN 688440
    WHEN 'Zaragoza' THEN 674997
    WHEN 'Málaga' THEN 574654
    WHEN 'Murcia' THEN 453258
    WHEN 'Palma' THEN 416065
    WHEN 'Las Palmas' THEN 379925
    WHEN 'Bilbao' THEN 346843
    ELSE 500000
  END as population,
  CASE c.name
    WHEN 'Madrid' THEN 805834
    WHEN 'Barcelona' THEN 405086
    WHEN 'Valencia' THEN 198719
    WHEN 'Seville' THEN 172110
    ELSE 125000
  END as age_15_29,
  CASE c.name
    WHEN 'Madrid' THEN 1128167
    WHEN 'Barcelona' THEN 567120
    WHEN 'Valencia' THEN 278206
    WHEN 'Seville' THEN 241354
    ELSE 175000
  END as age_30_49,
  CASE c.name
    WHEN 'Madrid' THEN 805834
    WHEN 'Barcelona' THEN 405086
    WHEN 'Valencia' THEN 198719
    WHEN 'Seville' THEN 172110
    ELSE 125000
  END as age_50_64,
  CASE c.name
    WHEN 'Madrid' THEN 483500
    WHEN 'Barcelona' THEN 243051
    WHEN 'Valencia' THEN 119231
    WHEN 'Seville' THEN 103266
    ELSE 75000
  END as age_65_plus,
  CASE c.name
    WHEN 'Madrid' THEN 45200
    WHEN 'Barcelona' THEN 42800
    WHEN 'Valencia' THEN 38900
    WHEN 'Seville' THEN 35600
    ELSE 32000
  END as median_income,
  CASE c.name
    WHEN 'Madrid' THEN 52000
    WHEN 'Barcelona' THEN 49220
    WHEN 'Valencia' THEN 44735
    WHEN 'Seville' THEN 40940
    ELSE 36800
  END as average_income,
  CASE c.name
    WHEN 'Madrid' THEN 1579454
    WHEN 'Barcelona' THEN 793968
    WHEN 'Valencia' THEN 389449
    WHEN 'Seville' THEN 337336
    ELSE 245000
  END as male_population,
  CASE c.name
    WHEN 'Madrid' THEN 1643880
    WHEN 'Barcelona' THEN 826375
    WHEN 'Valencia' THEN 405426
    WHEN 'Seville' THEN 351104
    ELSE 255000
  END as female_population,
  CASE c.name
    WHEN 'Madrid' THEN 1128167
    WHEN 'Barcelona' THEN 567120
    WHEN 'Valencia' THEN 278206
    WHEN 'Seville' THEN 241354
    ELSE 175000
  END as higher_education,
  CASE c.name
    WHEN 'Madrid' THEN 78.5
    WHEN 'Barcelona' THEN 76.2
    WHEN 'Valencia' THEN 74.8
    WHEN 'Seville' THEN 72.1
    ELSE 70.0
  END as employment_rate,
  CASE c.name
    WHEN 'Madrid' THEN 2095167
    WHEN 'Barcelona' THEN 1053223
    WHEN 'Valencia' THEN 516669
    WHEN 'Seville' THEN 447486
    ELSE 325000
  END as services_employment,
  CASE c.name
    WHEN 'Madrid' THEN 805834
    WHEN 'Barcelona' THEN 405086
    WHEN 'Valencia' THEN 198719
    WHEN 'Seville' THEN 172110
    ELSE 125000
  END as industry_employment,
  CASE c.name
    WHEN 'Madrid' THEN 322333
    WHEN 'Barcelona' THEN 162034
    WHEN 'Valencia' THEN 79488
    WHEN 'Seville' THEN 68844
    ELSE 50000
  END as agriculture_employment,
  'sample_data' as data_source
FROM cities c
WHERE c.country = 'Spain'
ON CONFLICT (city_id) DO NOTHING;
