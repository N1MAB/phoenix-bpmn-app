# 🚀 DEPLOYMENT SETUP GUIDE - Phoenix BPMN

## 📋 COMPLETE DEPLOYMENT CHECKLIST

### **PHASE 1: GITHUB REPOSITORY SETUP**

#### Commands to Execute:
```bash
# Navigate to project directory
cd /home/slimpunt/werkruimte/16-Phoenix.BPMN/

# Initialize git repository
git init

# Create GitHub private repository
gh repo create phoenix-bpmn --private --description "Phoenix BPMN - Professional diagram tool"

# Add remote origin
git remote add origin https://github.com/N1MAB/phoenix-bpmn.git

# Create initial commit structure
mkdir -p original/ working/

# Add all project files
git add .

# Initial commit
git commit -m "init: Phoenix BPMN project structure and documentation"

# Push to GitHub
git push -u origin main
```

#### Verification:
- ✅ Repository created: https://github.com/N1MAB/phoenix-bpmn
- ✅ Repository is private
- ✅ All files pushed to main branch
- ✅ GitHub CLI authenticated (confirmed in access test)

---

### **PHASE 2: DIGITALOCEAN APP SETUP**

#### DigitalOcean Dashboard Steps:
1. **Login to DigitalOcean account**
2. **Navigate to Apps section**
3. **Click "Create App"**
4. **Select "GitHub" as source**
5. **Choose "phoenix-bpmn" repository**
6. **Configure app settings:**
   - **Name**: phoenix-bpmn
   - **Branch**: main
   - **Auto-deploy**: Enabled
   - **Environment**: Static Site
   - **Build Command**: (leave empty for static)
   - **Output Directory**: / (root)

#### App Platform Configuration:
```yaml
name: phoenix-bpmn
region: ams
static_sites:
- name: phoenix-bpmn-frontend
  source_dir: /
  github:
    repo: N1MAB/phoenix-bpmn
    branch: main
  build_command: ""
  output_dir: /
```

#### Expected Results:
- **App URL**: `https://phoenix-bpmn-[random].ondigitalocean.app`
- **Deploy Time**: 2-3 minutes per push
- **SSL Certificate**: Auto-generated
- **Auto-deploy**: Triggered on git push to main

---

### **PHASE 3: DOMAIN REGISTRATION & DNS**

#### Domain Options:
1. **phoenix-bpmn.nl** (recommended)
2. **bpmn.slimpunt.nl** (subdomain if slimpunt.nl owned)
3. **phoenixbpmn.nl** (alternative)

#### Domain Registration Steps (mijndomein.nl):
1. **Search domain availability**
2. **Register domain** (€10-15/year)
3. **Access DNS management panel**
4. **Configure DNS records:**

```dns
# DNS Configuration
Type    Name    Value                           TTL
A       @       [DigitalOcean App IP]          300
CNAME   www     phoenix-bpmn.nl                300
```

#### DigitalOcean Domain Setup:
1. **Go to Apps > phoenix-bpmn > Settings**
2. **Click "Domains" tab**
3. **Add Custom Domain**: phoenix-bpmn.nl
4. **Add www subdomain**: www.phoenix-bpmn.nl
5. **Wait for SSL certificate** (5-10 minutes)

---

### **PHASE 4: DEPLOYMENT TESTING**

#### Test Deployment Workflow:
```bash
# Create test HTML file
echo '<html><body><h1>Phoenix BPMN - Deployment Test</h1></body></html>' > index.html

# Commit and push
git add index.html
git commit -m "test: Initial deployment test"
git push origin main

# Monitor DigitalOcean build logs
# Check live site in ~2-3 minutes
```

#### Verification Checklist:
- [ ] Site loads at DO app URL
- [ ] Custom domain resolves
- [ ] HTTPS certificate active
- [ ] Deploy time under 3 minutes
- [ ] Auto-deploy triggers on git push

---

### **PHASE 5: PROVEN FOUNDATION EXTRACTION**

#### From 10-diagram-tool (Working Base):
```bash
# Copy proven React foundation
cp -r /home/slimpunt/werkruimte/10-diagram-tool/package.json ./original/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/vite.config.js ./original/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/src/ ./original/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/public/ ./original/

# Copy n8n workflow
cp /home/slimpunt/werkruimte/16-Phoenix.BPMN/n8ndemo5.json ./original/n8n-bpmn-workflow.json
```

#### Dependencies to Install:
```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "bpmn-js": "^17.0.0",
    "mermaid": "^11.10.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.1.2",
    "eslint": "^9.33.0"
  }
}
```

---

### **PHASE 6: ENVIRONMENT & SECURITY SETUP**

#### Environment Variables (DigitalOcean App):
```bash
# Add in DO App Settings > Environment Variables
N8N_WEBHOOK_URL=https://nimab.app.n8n.cloud/webhook/bpmn-generator
ENVIRONMENT=production
APP_NAME=Phoenix BPMN
```

#### Security Headers (index.html):
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
```

#### .gitignore (Already in SECURITY-RULES.md):
```gitignore
.env
.env.local
.env.production
node_modules/
dist/
build/
*.log
```

---

### **ESTIMATED TIMELINE**

#### Setup Phase:
- **GitHub Repo**: 5 minutes
- **DigitalOcean App**: 10 minutes  
- **Domain Registration**: 15 minutes
- **DNS Configuration**: 10 minutes
- **First Deployment Test**: 5 minutes
- **Foundation Copy**: 10 minutes

**Total Setup Time**: ~1 hour

#### Ongoing Development:
- **Code → Deploy**: 2-3 minutes per push
- **Domain Propagation**: One-time 15-30 minutes
- **SSL Certificate**: One-time 5-10 minutes

---

### **SUCCESS CRITERIA**

#### Deployment Pipeline Working When:
- ✅ `git push origin main` triggers automatic deployment
- ✅ Site updates live within 3 minutes
- ✅ Custom domain loads with HTTPS
- ✅ No manual upload/FTP required
- ✅ Rollback possible via git revert

#### Ready for Development When:
- ✅ React foundation copied to working/
- ✅ bpmn-js dependency available
- ✅ n8n webhook configured
- ✅ Local dev environment: `npm run dev`
- ✅ Production build: `npm run build` → auto-deploy

---

**🎯 ALL INFORMATION COLLECTED - READY FOR NEXT SESSION EXECUTION**

*This guide contains everything needed to set up Phoenix BPMN deployment pipeline without leaving this directory.*