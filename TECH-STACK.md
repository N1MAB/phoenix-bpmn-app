# Phoenix BPMN - Tech Stack Overview

## 🎯 Project Status
- **Current State**: Fresh start, clean slate
- **Goal**: Professional BPMN web application with AI-powered diagram generation
- **No Legacy**: Starting from zero, no timeout issues to inherit

## 🛠️ Available Technologies

### Backend AI Integration
- **n8n Cloud**: Active workflow at `nimab.app.n8n.cloud`
- **Claude 3.7 Sonnet**: AI model for BPMN generation
- **Webhook Ready**: Existing endpoint for diagram generation

### Development Environment
- **Python**: Available with Poetry dependency management
- **Node.js**: Available for React/TypeScript development
- **Git**: Repository management and version control
- **WSL2 Ubuntu**: Development environment on Windows 11

### Deployment Pipeline (Proven)
- **GitHub**: Private repository with auto-deploy capability
- **DigitalOcean**: App Platform with 2-3 minute deployment cycles
- **Domain Management**: Custom domain setup experience available
- **SSL**: Automatic certificate management

## 🤔 Technology Decisions Needed

### Frontend Framework Options
1. **React + TypeScript**
   - Industry standard for complex web apps
   - Rich ecosystem for diagram libraries
   - Professional development experience

2. **Python + Streamlit**
   - Rapid prototyping
   - Already familiar workflow
   - Poetry dependency management available

3. **Python + Flask/FastAPI**
   - Full control over web interface
   - API-first architecture
   - Python backend consistency

### BPMN Rendering Options
1. **bpmn-js** (Open Source)
   - Industry standard BPMN toolkit
   - Free to use
   - Extensive documentation

2. **Commercial Libraries**
   - JointJS+, Syncfusion, GoJS
   - Advanced features but licensing costs
   - Professional support included

### Architecture Approach
- **Async by Design**: Prevent timeout issues from start
- **Real-time Updates**: Progress indicators during AI generation  
- **Professional UX**: Competitive with existing BPMN tools
- **Scalable Backend**: Support growth from day one

## 🎯 Next Decisions Required
1. Choose frontend framework
2. Select BPMN rendering library
3. Define project structure
4. Set up repository and deployment

---
*Created: Today*  
*Status: Planning Phase*