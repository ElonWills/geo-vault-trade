# Vercel Deployment Guide for Geo Vault Trade

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

### Step 1: Connect Repository to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `ElonWills/geo-vault-trade` from the list
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**
   - Set project name: `geo-vault-trade`
   - Or use custom domain if preferred

2. **Framework Preset**
   - Select "Vite" from the framework dropdown
   - Vercel should auto-detect this

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Environment Variables Configuration

**Critical Step**: Add the following environment variables in Vercel dashboard:

1. **Navigate to Project Settings**
   - Go to your project dashboard
   - Click "Settings" tab
   - Click "Environment Variables"

2. **Add Each Variable**:
   ```
   VITE_CHAIN_ID = 11155111
   VITE_RPC_URL = your_rpc_endpoint_here
   VITE_WALLET_CONNECT_PROJECT_ID = your_wallet_connect_project_id
   VITE_INFURA_API_KEY = your_infura_api_key
   VITE_FALLBACK_RPC_URL = your_fallback_rpc_url
   ```

3. **Environment Scope**
   - Set all variables for: Production, Preview, and Development
   - Click "Save" for each variable

### Step 4: Deploy Configuration

1. **Deployment Settings**
   - Go to "Deployments" tab
   - Click "Deploy" on the latest commit
   - Or push to main branch to trigger auto-deployment

2. **Build Process**
   - Vercel will automatically:
     - Install dependencies (`npm install`)
     - Build the project (`npm run build`)
     - Deploy to CDN

### Step 5: Domain Configuration (Optional)

1. **Custom Domain**
   - Go to "Domains" tab in project settings
   - Add your custom domain if desired
   - Configure DNS records as instructed

2. **Default Domain**
   - Vercel provides: `geo-vault-trade.vercel.app`
   - This is immediately available after deployment

### Step 6: Post-Deployment Verification

1. **Test the Application**
   - Visit your deployed URL
   - Test wallet connection functionality
   - Verify all features work correctly

2. **Monitor Deployment**
   - Check "Functions" tab for any serverless function logs
   - Monitor "Analytics" for usage statistics

### Step 7: Continuous Deployment Setup

1. **Auto-Deploy Configuration**
   - Ensure "Auto Deploy" is enabled in project settings
   - Every push to main branch will trigger new deployment
   - Preview deployments for pull requests

2. **Branch Protection**
   - Configure branch protection rules in GitHub
   - Require pull request reviews before merging

### Troubleshooting Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Wallet Connection Issues**
   - Ensure RPC URLs are accessible
   - Verify WalletConnect project ID is correct
   - Test with different wallet providers

3. **Environment Variables**
   - Double-check all variables are set
   - Ensure no typos in variable names
   - Verify values match the configuration

### Production Checklist

- [ ] All environment variables configured
- [ ] Build completes successfully
- [ ] Wallet connection works
- [ ] All pages load correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Analytics configured (optional)

### Support and Maintenance

1. **Monitoring**
   - Use Vercel Analytics for performance monitoring
   - Set up error tracking with Sentry (optional)

2. **Updates**
   - Push changes to main branch for automatic deployment
   - Use preview deployments for testing changes

3. **Scaling**
   - Vercel automatically handles scaling
   - Upgrade to Pro plan for advanced features if needed

### Important Notes

- **Security**: Never commit sensitive keys to repository
- **Performance**: Vercel CDN provides global distribution
- **Costs**: Free tier includes 100GB bandwidth and 100 serverless function executions
- **Backup**: Keep local copies of important configurations

### Deployment URL

Once deployed, your application will be available at:
`https://geo-vault-trade.vercel.app`

Or your custom domain if configured.

---

**Need Help?**
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- GitHub repository: [github.com/ElonWills/geo-vault-trade](https://github.com/ElonWills/geo-vault-trade)
- Project README for development setup
