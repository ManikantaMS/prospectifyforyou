# 🔌 Social Media Integration Implementation Guide

## 📋 **Current State Analysis**

### ✅ **What We Already Have:**
- Complete Analytics dashboard with performance metrics
- Campaign management with CRUD operations  
- Export functionality and filtering
- Supabase integration for data persistence
- Professional UI components and workflows

### ❌ **What We're Missing for Real-World Use:**
- **Social Media Account Integration** (Google Ads, Facebook Ads, etc.)
- **Real Campaign Data Import** from advertising platforms
- **Platform-Specific Metrics** (CTR, CPC, ROAS by platform)
- **OAuth Authentication** for social media platforms
- **API Rate Limiting** and error handling
- **Real-Time Data Synchronization**

---

## 🎯 **Implementation Roadmap**

### **Phase 1: Social Media Integration Hub (Completed ✅)**
- ✅ Created `/components/dashboard/social-media-integration.tsx`
- ✅ Added integration management to Analytics page with tabs
- ✅ Updated Settings page with social media platform options
- ✅ Created API service structure in `/lib/social-media-api.ts`

### **Phase 2: OAuth Integration (Next Steps)**
```javascript
// Example OAuth flow for Google Ads
const initiateGoogleAdsOAuth = () => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID,
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/integrations/callback/google-ads`,
    scope: 'https://www.googleapis.com/auth/adwords',
    response_type: 'code',
    access_type: 'offline'
  })
  
  window.location.href = `https://accounts.google.com/oauth/authorize?${params}`
}
```

### **Phase 3: Real API Integration**
```javascript
// Real Google Ads API call example
const fetchGoogleAdsCampaigns = async (customerId, accessToken) => {
  const query = `
    SELECT 
      campaign.id,
      campaign.name,
      campaign.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign 
    WHERE segments.date DURING LAST_30_DAYS
  `
  
  const response = await fetch(`https://googleads.googleapis.com/v13/customers/${customerId}/googleAds:searchStream`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  
  return response.json()
}
```

---

## 🔧 **Required Environment Variables**

```env
# Google Ads API
GOOGLE_ADS_CLIENT_ID=your_client_id
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token

# Facebook/Meta Ads API
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

# LinkedIn Ads API
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret

# Twitter Ads API
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
```

---

## 🏗️ **Database Schema Updates**

```sql
-- Social media accounts table
CREATE TABLE social_media_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'google-ads', 'facebook-ads', etc.
  account_id TEXT NOT NULL,
  account_name TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced campaigns table with platform data
ALTER TABLE campaigns ADD COLUMN platform TEXT;
ALTER TABLE campaigns ADD COLUMN external_id TEXT;
ALTER TABLE campaigns ADD COLUMN targeting JSONB;
ALTER TABLE campaigns ADD COLUMN performance_metrics JSONB;

-- Campaign sync log
CREATE TABLE campaign_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES social_media_accounts(id),
  campaigns_synced INTEGER,
  errors JSONB,
  sync_duration_ms INTEGER,
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔄 **Real Customer Journey Implementation**

### **Step 1: Account Connection**
```typescript
// Customer connects their Google Ads account
const connectGoogleAds = async (authCode: string) => {
  // Exchange auth code for access token
  const tokenResponse = await fetch('/api/integrations/google-ads/token', {
    method: 'POST',
    body: JSON.stringify({ code: authCode })
  })
  
  const { access_token, refresh_token } = await tokenResponse.json()
  
  // Save to database
  await supabase.from('social_media_accounts').insert({
    user_id: user.id,
    platform: 'google-ads',
    access_token,
    refresh_token,
    expires_at: new Date(Date.now() + 3600000) // 1 hour
  })
}
```

### **Step 2: Campaign Data Import**
```typescript
// Sync campaign data from connected accounts
const syncCampaignData = async () => {
  const accounts = await supabase
    .from('social_media_accounts')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)

  for (const account of accounts.data) {
    try {
      const campaigns = await fetchCampaignsFromPlatform(account)
      
      // Update local database
      await supabase.from('campaigns').upsert(
        campaigns.map(campaign => ({
          ...campaign,
          user_id: user.id,
          platform: account.platform,
          external_id: campaign.id,
          synced_at: new Date()
        }))
      )
    } catch (error) {
      console.error(`Sync failed for ${account.platform}:`, error)
    }
  }
}
```

### **Step 3: Real-Time Analytics Display**
```typescript
// Display unified analytics from all platforms
const getUnifiedAnalytics = async () => {
  const campaigns = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const analytics = {
    totalSpend: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    averageCTR: campaigns.reduce((sum, c) => sum + c.click_through_rate, 0) / campaigns.length,
    platformBreakdown: groupBy(campaigns, 'platform'),
    cityPerformance: analyzeCityPerformance(campaigns)
  }

  return analytics
}
```

---

## 📊 **What This Enables**

### **For Academic Submission:**
1. **Professional Integration Hub** - Shows understanding of real-world API integration
2. **Complete Customer Journey** - From demographic research → city selection → campaign creation → performance analysis
3. **Industry-Standard Approach** - OAuth, rate limiting, error handling
4. **Scalable Architecture** - Can easily add new platforms

### **For Real-World Deployment:**
1. **Actual Campaign Import** - Pull real data from Google/Facebook/LinkedIn
2. **Unified Analytics** - Compare performance across platforms
3. **Automated Insights** - City recommendations based on actual campaign performance
4. **ROI Tracking** - Real revenue and cost data

---

## 🚀 **Quick Implementation for Demo**

### **Option A: Full Integration (Recommended for Production)**
- Implement OAuth flows for each platform
- Set up real API integrations with proper error handling
- Add database schema for social accounts and sync logs
- Create background jobs for regular data synchronization

### **Option B: Enhanced Mock Integration (Recommended for Academic Demo)**
- Keep existing mock data but make it more realistic
- Add platform-specific UI flows and connection dialogs
- Show integration management and sync status
- Demonstrate understanding of API integration patterns

---

## 🎯 **Recommendation for Your CA Submission**

Since you have a **complete, professional dashboard** already, I recommend:

1. **Keep the Social Media Integration Hub** we just added - it shows API integration understanding
2. **Enhance the existing Analytics** with platform-specific views
3. **Add the Integration Settings** for managing connected accounts
4. **Include the API service structure** to demonstrate technical knowledge

This gives you:
- ✅ **Complete customer journey** (research → targeting → campaigns → analytics)
- ✅ **Professional UI/UX** with integration management
- ✅ **Technical depth** showing API integration patterns
- ✅ **Academic requirements** met with comprehensive functionality

The **Social Media Integration tab** in Analytics now provides the missing piece - showing how real campaign data would be imported and displayed alongside demographic insights.

---

**Status**: 🎯 **Enhanced for Academic Submission**  
**Features**: ✅ Social Media Integration Hub, ✅ Platform Management, ✅ API Structure  
**Ready for**: ✅ Academic Demo, ⚠️ Production (needs real OAuth)
