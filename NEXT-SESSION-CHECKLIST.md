# ✅ NEXT SESSION EXECUTION CHECKLIST - Phoenix BPMN

## 🎯 COMPLETE EXECUTION GUIDE

### **SESSION STARTUP (5 minutes)**
- [ ] **Read**: `CLAUDE-SESSION-INSTRUCTIONS.md` first
- [ ] **Review**: `PROJECT-RULES.md` for workflow discipline
- [ ] **Confirm**: All access verified in `ACCESS-TEST-RESULTS.md`
- [ ] **Navigate**: `cd /home/slimpunt/werkruimte/16-Phoenix.BPMN/`

---

### **PHASE 1: DEPLOYMENT PIPELINE (20 minutes)**

#### GitHub Repository Setup:
```bash
# Execute these commands exactly:
cd /home/slimpunt/werkruimte/16-Phoenix.BPMN/
git init
gh repo create phoenix-bpmn --private --description "Phoenix BPMN - Professional diagram tool"
git remote add origin https://github.com/N1MAB/phoenix-bpmn.git
mkdir -p original/ working/
git add .
git commit -m "init: Phoenix BPMN project structure and documentation"
git push -u origin main
```

#### DigitalOcean App Setup:
- [ ] **Login**: DigitalOcean dashboard
- [ ] **Create App**: Apps section → "Create App"
- [ ] **Connect**: GitHub → "phoenix-bpmn" repository
- [ ] **Configure**: Static site, main branch, auto-deploy enabled
- [ ] **Note**: Save app URL (phoenix-bpmn-[hash].ondigitalocean.app)

#### Domain Registration (Optional):
- [ ] **Register**: phoenix-bpmn.nl at mijndomein.nl
- [ ] **Configure DNS**: A record to DigitalOcean app
- [ ] **Add Domain**: In DO app settings
- [ ] **Wait**: SSL certificate (5-10 minutes)

---

### **PHASE 2: FOUNDATION EXTRACTION (15 minutes)**

#### Copy Proven Components:
```bash
# Copy React foundation from working project
cp /home/slimpunt/werkruimte/10-diagram-tool/package.json ./original/
cp /home/slimpunt/werkruimte/10-diagram-tool/vite.config.js ./original/
cp /home/slimpunt/werkruimte/10-diagram-tool/index.html ./original/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/src/ ./original/src/

# Copy n8n workflow
cp /home/slimpunt/werkruimte/16-Phoenix.BPMN/n8ndemo5.json ./original/n8n-bpmn-workflow.json
```

#### Modify package.json:
```json
{
  "name": "phoenix-bpmn",
  "private": true,
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "bpmn-js": "^17.0.0"
  }
}
```

---

### **PHASE 3: DEVELOPMENT ENVIRONMENT (10 minutes)**

#### Setup Working Directory:
```bash
# Copy to working directory
cp -r original/ working/

# Install dependencies
cd working/
npm install

# Start development server
npm run dev
```

#### Verification:
- [ ] **Localhost**: http://localhost:5173/ loads
- [ ] **React app**: Renders without errors
- [ ] **Build works**: `npm run build` creates dist/
- [ ] **No timeout issues**: Clean architecture from start

---

### **PHASE 4: FIRST DEPLOYMENT TEST (5 minutes)**

#### Test Deployment Flow:
```bash
# Create test index.html
echo '<html><body><h1>Phoenix BPMN - Live!</h1></body></html>' > index.html

# Commit and deploy
git add index.html
git commit -m "test: First deployment test"
git push origin main

# Wait 2-3 minutes, check live site
```

#### Success Indicators:
- [ ] **Auto-deploy**: Triggers on git push
- [ ] **Live site**: Updates within 3 minutes
- [ ] **HTTPS**: SSL certificate active
- [ ] **Domain**: Custom domain resolves (if configured)

---

### **PHASE 5: BPMN INTEGRATION START (20 minutes)**

#### Replace Mermaid with bpmn-js:
```bash
cd working/

# Install bpmn-js
npm install bpmn-js bpmn-js-properties-panel

# Remove mermaid dependency
npm uninstall mermaid
```

#### Basic BPMN Canvas Setup:
```javascript
// In working/src/components/BPMNCanvas.jsx
import BpmnViewer from 'bpmn-js/lib/Viewer'

const BPMNCanvas = () => {
  useEffect(() => {
    const viewer = new BpmnViewer({
      container: '#bpmn-canvas'
    })
    
    // Load sample BPMN
    const sampleBPMN = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL">
      <bpmn:process id="Process_1">
        <bpmn:startEvent id="StartEvent_1" />
      </bpmn:process>
    </bpmn:definitions>`
    
    viewer.importXML(sampleBPMN)
  }, [])
  
  return <div id="bpmn-canvas" style={{height: '500px'}} />
}
```

---

### **PHASE 6: SESSION COMPLETION (5 minutes)**

#### Document Progress:
```bash
# Commit working foundation
cd working/
git add .
git commit -m "feat: BPMN foundation with bpmn-js integration"
git push origin main

# Create milestone backup (only when working!)
cd ..
cp -r working/ v1-foundation/
```

#### Success Criteria Met:
- [ ] **Deployment pipeline**: Working (GitHub → DO → Live)
- [ ] **React foundation**: Copied and running
- [ ] **bpmn-js**: Installed and basic canvas renders
- [ ] **n8n workflow**: Available for AI integration
- [ ] **Clean architecture**: No timeout issues inherited
- [ ] **Discipline followed**: Single working directory

---

### **POST-SESSION VERIFICATION**

#### Working System Check:
- [ ] **Live URL**: Phoenix BPMN accessible online
- [ ] **Local dev**: `npm run dev` works in working/
- [ ] **BPMN rendering**: Basic diagram displays
- [ ] **Git workflow**: Push → auto-deploy in <3 minutes
- [ ] **Foundation solid**: Ready for feature development

#### Next Session Preparation:
- [ ] **AI integration**: Connect n8n webhook to BPMN generation
- [ ] **Professional UI**: Upgrade from Mermaid styling
- [ ] **Export features**: XML, SVG, PNG export functionality
- [ ] **Async architecture**: Implement timeout-proof AI calls

---

### **🚨 EMERGENCY PROCEDURES**

#### If GitHub Repo Creation Fails:
```bash
# Manual repository creation
# 1. Go to github.com/N1MAB
# 2. Create "phoenix-bpmn" repository (private)
# 3. Follow setup instructions on GitHub
```

#### If DigitalOcean App Setup Fails:
- **Continue with localhost development**
- **Deploy manually via file upload**
- **Troubleshoot in next session**

#### If bpmn-js Installation Fails:
```bash
# Fallback to basic React app
# Continue with proven foundation
# Add bpmn-js in next session
```

---

### **📋 SUCCESS DEFINITION**

**Session is successful when:**
1. **Phoenix BPMN repository exists** (private, on GitHub)
2. **DigitalOcean app deploys** from GitHub main branch
3. **React development environment** runs locally
4. **Basic BPMN canvas** renders (even minimal)
5. **Deployment pipeline** tested and working
6. **Foundation extracted** without timeout issues

**Ready for next session development of professional features.**

---

**🎯 TOTAL ESTIMATED TIME: 1.5 hours**
**🎯 PRIORITY ORDER: Deployment first, then development**
**🎯 SUCCESS METRIC: Live Phoenix BPMN site accessible online**