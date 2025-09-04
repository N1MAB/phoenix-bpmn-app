# 🏗️ FOUNDATION EXTRACTION PLAN - Phoenix BPMN

## 📋 PROVEN COMPONENTS TO EXTRACT

### **FROM 10-diagram-tool/ (Working React Base)**

#### Core Files to Copy:
```bash
# Essential React Setup
/package.json                    → ./original/package.json
/vite.config.js                  → ./original/vite.config.js  
/index.html                      → ./original/index.html
/src/App.jsx                     → ./original/src/App.jsx
/src/App.css                     → ./original/src/App.css
/src/main.jsx                    → ./original/src/main.jsx
/src/index.css                   → ./original/src/index.css

# Build Configuration
/eslint.config.js                → ./original/eslint.config.js
/.gitignore                      → ./original/.gitignore (merge with security rules)
```

#### Key Dependencies (package.json):
```json
{
  "name": "phoenix-bpmn",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "bpmn-js": "^17.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7", 
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

---

### **N8N AI WORKFLOW (Current Working)**

#### Workflow File Location:
```bash
# Source
/16-Phoenix.BPMN/n8ndemo5.json   → ./original/n8n-bpmn-workflow.json
```

#### Key Workflow Details:
- **Webhook URL**: `https://nimab.app.n8n.cloud/webhook/bpmn-generator`
- **AI Model**: Claude 3.7 Sonnet (claude-3-7-sonnet-20250219)
- **Input Format**: JSON with process_description, process_name, complexity
- **Output Format**: Complete BPMN 2.0 XML
- **Response Time**: <60 seconds (timeout prevention needed)

#### Workflow Node Structure:
1. **BPMN Webhook** - Receives POST requests
2. **Extract Request** - Processes input parameters
3. **BPMN Swimlane Generator** - AI agent with detailed BPMN prompt
4. **Send Response** - Returns generated BPMN XML
5. **Anthropic Chat Model** - Claude 3.7 Sonnet integration
6. **Simple Memory** - Context management

---

### **TIMEOUT PREVENTION ARCHITECTURE**

#### AVOID These Patterns (From 10.5-bpmn-tool):
```javascript
// ❌ NEVER DO THIS - Causes 99-second timeouts
await fetch('/api/generate-bpmn', {
  method: 'POST',
  body: JSON.stringify(data)
}).then(response => response.json())

// ❌ FAILED SOLUTIONS (Don't Copy)
- AbortController overrides
- XMLHttpRequest timeout modifications  
- Aggressive retry loops
- Browser timeout patches
- Complex polling mechanisms
```

#### ✅ IMPLEMENT Async Architecture:
```javascript
// Fire-and-forget pattern
const generateBPMN = async (data) => {
  // 1. Immediate UI feedback
  setStatus('Generating BPMN...')
  
  // 2. Fire webhook (no wait)
  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  
  // 3. Real-time updates via WebSocket/SSE
  // 4. Result delivered via callback/polling
}
```

---

### **BPMN-JS INTEGRATION PLAN**

#### Core bpmn-js Setup:
```javascript
// Replace Mermaid.js with bpmn-js
import BpmnViewer from 'bpmn-js/lib/Viewer'
import BpmnModeler from 'bpmn-js/lib/Modeler'

// Viewer for display
const viewer = new BpmnViewer({
  container: '#canvas'
})

// Modeler for editing
const modeler = new BpmnModeler({
  container: '#canvas'
})

// Import BPMN XML
await modeler.importXML(bpmnXML)
```

#### Required bpmn-js Dependencies:
```json
{
  "dependencies": {
    "bpmn-js": "^17.0.0",
    "bpmn-js-properties-panel": "^5.0.0",
    "camunda-bpmn-moddle": "^7.0.1"
  }
}
```

---

### **UI COMPONENT EXTRACTION**

#### From 10-diagram-tool React Components:
```javascript
// Reusable UI patterns
- Header component with export buttons
- Sidebar with input controls  
- Main canvas area
- Status indicators
- Theme switching system
- Modal dialogs for settings
- Loading states and progress
```

#### Professional UI Enhancements Needed:
```css
/* Corporate styling (not Mermaid colors) */
:root {
  --primary-blue: #0066cc;
  --secondary-gray: #6b7280; 
  --success-green: #059669;
  --warning-orange: #d97706;
  --error-red: #dc2626;
}

/* Professional typography */
.button, .input, .label {
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}
```

---

### **ARCHITECTURE MODIFICATIONS**

#### Key Changes for Phoenix BPMN:
1. **Replace Mermaid → bpmn-js**: Different rendering engine
2. **Add async AI calls**: Prevent timeout issues  
3. **Professional UI**: Commercial-grade interface
4. **BPMN-specific features**: Properties panel, validation
5. **Export options**: XML, SVG, PNG, PDF

#### File Structure Plan:
```
working/
├── src/
│   ├── components/
│   │   ├── BPMNCanvas.jsx        # bpmn-js integration
│   │   ├── ProcessInput.jsx      # AI input form
│   │   ├── ExportPanel.jsx       # File export options
│   │   └── StatusIndicator.jsx   # Real-time status
│   ├── utils/
│   │   ├── bpmnUtils.js          # BPMN XML handling
│   │   ├── aiIntegration.js      # n8n webhook calls
│   │   └── exportUtils.js        # File export logic
│   └── styles/
│       ├── bpmn.css              # BPMN-specific styling
│       └── professional.css     # Corporate theme
```

---

### **DEPLOYMENT-READY CHECKLIST**

#### Original Directory Contents:
- [ ] React + Vite foundation copied
- [ ] n8n workflow JSON preserved  
- [ ] bpmn-js dependencies listed
- [ ] Professional UI components outlined
- [ ] Timeout prevention architecture documented
- [ ] Export functionality planned
- [ ] Security rules integrated

#### Working Directory Ready When:
- [ ] `cp -r original/ working/` executed
- [ ] `cd working/ && npm install` successful
- [ ] `npm run dev` starts localhost:5173
- [ ] Basic BPMN canvas renders
- [ ] n8n webhook connection tested
- [ ] First git commit ready for deploy

---

### **EXTRACTION COMMANDS**

#### Execute in Next Session:
```bash
# 1. Copy proven foundation
cp -r /home/slimpunt/werkruimte/10-diagram-tool/package.json ./original/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/vite.config.js ./original/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/src/ ./original/src/
cp -r /home/slimpunt/werkruimte/10-diagram-tool/index.html ./original/

# 2. Modify package.json for Phoenix BPMN
# Replace "mermaid" with "bpmn-js" dependency
# Update project name to "phoenix-bpmn"

# 3. Copy to working directory
cp -r original/ working/

# 4. Install and test
cd working/
npm install
npm run dev

# 5. Verify localhost:5173 loads
```

---

**🎯 COMPLETE EXTRACTION PLAN READY**

*All information needed to extract proven foundation and avoid timeout issues documented in this directory.*