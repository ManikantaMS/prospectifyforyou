import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Upload, Download, AlertCircle } from 'lucide-react';
import { useSupabaseData } from './supabase-data-provider';

export function DataManagementPanel() {
  const { cities, isLoading, error, addImportedCities } = useSupabaseData();
  const [importStatus, setImportStatus] = useState<string>('');

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Upload, Download, AlertCircle } from 'lucide-react';
import { useSupabaseData } from './supabase-data-provider';

export function DataManagementPanel() {
  const { cities, loading, error, addImportedCities } = useSupabaseData();
  const [importStatus, setImportStatus] = useState<string>('');

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        setImportStatus('Processing file...');
        const text = await file.text();
        
        let data;
        if (file.name.endsWith('.csv')) {
          // Simple CSV parsing
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          data = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',').map(v => v.trim());
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = values[index] || '';
            });
            return obj;
          });
        } else {
          data = JSON.parse(text);
        }

        if (Array.isArray(data) && data.length > 0) {
          const importedCities = data.map((item, index) => ({
            id: `imported-${Date.now()}-${index}`,
            name: item.name || item.city || 'Unknown City',
            country: item.country || 'Unknown Country',
            population: parseInt(item.population) || 0,
            median_age: parseFloat(item.median_age || item.age_median) || 0,
            median_income: parseFloat(item.median_income || item.income) || 0,
            education_level: item.education_level || item.education || 'Unknown',
            employment_rate: parseFloat(item.employment_rate || item.unemployment_rate) || 0,
            industry_focus: Array.isArray(item.industry_focus) ? item.industry_focus : [item.industry_focus || 'General'],
            growth_rate: parseFloat(item.growth_rate) || 0,
            cost_of_living_index: parseFloat(item.cost_of_living_index) || 0,
            business_friendliness_score: parseFloat(item.business_friendliness_score) || 0,
            match_score: Math.random() * 100,
            reasons: [`Imported from ${file.name}`]
          }));

          addImportedCities(importedCities);
          setImportStatus(`Successfully imported ${importedCities.length} cities`);
        } else {
          setImportStatus('No valid data found in file');
        }
      } catch (error) {
        console.error('Import error:', error);
        setImportStatus('Error processing file');
      }
    };
    input.click();
  };

  const handleExport = () => {
    if (cities.length === 0) {
      setImportStatus('No data to export');
      return;
    }

    const exportData = cities.map(city => ({
      name: city.name,
      country: city.country,
      population: city.population,
      median_age: city.median_age,
      median_income: city.median_income,
      education_level: city.education_level,
      employment_rate: city.employment_rate,
      industry_focus: city.industry_focus,
      growth_rate: city.growth_rate,
      cost_of_living_index: city.cost_of_living_index,
      business_friendliness_score: city.business_friendliness_score,
      match_score: city.match_score
    }));

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prospectify-cities-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setImportStatus(`Exported ${cities.length} cities`);
  };

  // Connection status check
  const getConnectionStatus = () => {
    if (loading) return { status: 'checking', color: 'yellow', text: 'Checking connection...' };
    if (error) return { status: 'error', color: 'red', text: 'Connection failed' };
    return { status: 'connected', color: 'green', text: 'Connected' };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Data Management</h2>
        <p className="text-muted-foreground">Monitor your data connections and manage data sources.</p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {connectionStatus.status === 'connected' && <CheckCircle className="h-5 w-5 text-green-600" />}
            {connectionStatus.status === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
            {connectionStatus.status === 'checking' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
            Database Connection
          </CardTitle>
          <CardDescription>Current status of your data connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Supabase Database</p>
              <p className="text-sm text-muted-foreground">{connectionStatus.text}</p>
            </div>
            <Badge variant={connectionStatus.color === 'green' ? 'default' : 'destructive'}>
              {connectionStatus.text}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Data Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>Summary of your available data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">{cities.length}</p>
              <p className="text-sm text-muted-foreground">Total Cities</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">{cities.filter(c => c.id.toString().startsWith('imported')).length}</p>
              <p className="text-sm text-muted-foreground">Imported Cities</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">{cities.filter(c => !c.id.toString().startsWith('imported')).length}</p>
              <p className="text-sm text-muted-foreground">Database Cities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Import/Export */}
      <Card>
        <CardHeader>
          <CardTitle>Import & Export</CardTitle>
          <CardDescription>Manage your data by importing or exporting city information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button onClick={handleImport} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Data
            </Button>
            <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
          {importStatus && (
            <Alert>
              <AlertDescription>{importStatus}</AlertDescription>
            </Alert>
          )}
          <div className="text-sm text-muted-foreground mt-4">
            <p>• Import: Supports CSV and JSON files with city demographic data</p>
            <p>• Export: Downloads all city data as JSON format</p>
            <p>• Imported data is stored locally and persists across sessions</p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to connect to the database. Using fallback data for demonstration purposes.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
