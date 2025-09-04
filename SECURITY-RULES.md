# 🛡️ SECURITY RULES - Phoenix BPMN

## ⚠️ CRITICAL: Code & IP Protection Guidelines

### 📋 MANDATORY SECURITY WORKFLOW

## 1. 🔒 REPOSITORY PROTECTION

### GitHub Repository Rules (NEVER COMPROMISE)
- ✅ **ALWAYS Private**: Never make repo public
- ✅ **Access Control**: Only N1MAB account access
- ✅ **No Collaborators**: Unless absolutely necessary
- ✅ **Branch Protection**: Protect main branch from force pushes
- ✅ **Commit Messages**: Never include API keys or secrets

### Forbidden in Git Repository
```bash
❌ NEVER COMMIT:
- API keys (OpenAI, n8n, third-party)
- Database credentials  
- Environment variables with secrets
- Private configuration files
- Personal access tokens
- Email addresses in code comments
```

### Required in Repository
```bash
✅ ALWAYS INCLUDE:
- .gitignore (comprehensive)
- .env.example (template without real values)
- LICENSE file (copyright protection)
- README.md (public-safe description only)
```

## 2. 🔐 ENVIRONMENT SECURITY

### Environment Variables (LOCAL ONLY)
```bash
# Phoenix BPMN - NEVER COMMIT
OPENAI_API_KEY=sk-...
N8N_WEBHOOK_URL=https://nimab.app.n8n.cloud/webhook/...
GITHUB_TOKEN=ghp_...
DO_API_TOKEN=...

# Store in: .env (local) or DigitalOcean app settings
```

### .gitignore Template (MANDATORY)
```gitignore
# Secrets & Environment
.env
.env.local
.env.production
*.key
*.pem
config.json

# Dependencies
node_modules/
__pycache__/
.venv/
poetry.lock

# Build outputs
dist/
build/
.next/

# IDE & System
.vscode/
.DS_Store
Thumbs.db
*.swp
*.swo

# Logs
*.log
logs/
```

## 3. 🎯 FRONTEND CODE PROTECTION

### Client-Side Security Rules
- ✅ **Minify/Obfuscate**: Production JavaScript
- ✅ **No Secrets**: Never embed API keys in frontend
- ✅ **Rate Limiting**: Protect webhook endpoints
- ✅ **CORS Policy**: Restrict API access to your domain
- ✅ **Input Validation**: Sanitize all user input

### Intellectual Property Protection
```javascript
// Header for all source files:
/*
 * Phoenix BPMN - Professional Diagram Tool
 * Copyright (c) 2025 N1MAB. All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying, distribution, or use is prohibited.
 */
```

## 4. 🔒 BACKEND/API SECURITY

### n8n Webhook Protection
- ✅ **Authentication**: Use API keys/tokens
- ✅ **Rate Limiting**: Max requests per IP/hour
- ✅ **Input Validation**: Sanitize all webhook data
- ✅ **Error Handling**: Don't expose internal details
- ✅ **Logging**: Monitor suspicious activity

### API Security Headers
```javascript
// Required headers for all API responses
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY", 
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000",
  "Content-Security-Policy": "default-src 'self'"
}
```

## 5. 📋 DEPLOYMENT SECURITY

### DigitalOcean App Security
- ✅ **Environment Secrets**: Use DO app environment variables
- ✅ **Build Variables**: Separate from runtime secrets
- ✅ **Domain Restriction**: Only allow your domain(s)
- ✅ **HTTPS Only**: Force SSL/TLS encryption
- ✅ **Health Checks**: Monitor app status

### Pre-Deployment Checklist
```bash
# Security scan before each deployment
□ No secrets in code
□ .env files ignored
□ API keys in environment variables only
□ Copyright headers present
□ Input validation implemented  
□ Error messages sanitized
□ Rate limiting configured
□ CORS policy restrictive
```

## 6. 🚫 FORBIDDEN PRACTICES

### Never Do This
```bash
❌ git add .env
❌ console.log(API_KEY)  
❌ Hard-coded credentials
❌ Public repository
❌ Commit API responses with data
❌ Share webhook URLs publicly
❌ Store secrets in frontend code
❌ Expose internal error messages
```

### Security Anti-Patterns
- **Credentials in URLs**: Never put API keys in query parameters
- **Client-side secrets**: Never store sensitive data in localStorage
- **Verbose errors**: Don't expose stack traces to users
- **Unvalidated input**: Always sanitize user data
- **Open CORS**: Don't allow * origins in production

## 7. 🔍 MONITORING & INCIDENT RESPONSE

### Security Monitoring
- ✅ **Access Logs**: Monitor unusual API usage
- ✅ **Error Tracking**: Watch for injection attempts
- ✅ **Rate Limit Alerts**: Detect potential attacks
- ✅ **Git Activity**: Review all commits for secrets

### Incident Response Plan
1. **Immediate**: Revoke compromised credentials
2. **Assess**: Determine scope of potential breach
3. **Contain**: Update affected systems/passwords
4. **Document**: Record incident and lessons learned
5. **Prevent**: Update security measures

## 8. 🎯 COMPETITIVE PROTECTION

### Unique Value Protection
- ✅ **AI Prompts**: Keep in n8n workflow (not in frontend)
- ✅ **Business Logic**: Server-side processing only
- ✅ **Algorithms**: Core features via API calls
- ✅ **Database Schema**: Hidden backend structure
- ✅ **Integrations**: Webhook endpoints protected

### Legal Protection
- ✅ **Terms of Service**: Clear usage restrictions
- ✅ **Copyright Notices**: All source files
- ✅ **License File**: Proprietary/All Rights Reserved
- ✅ **DMCA Protection**: Report unauthorized copying

## 🚨 SECURITY BREACH PROTOCOL

### If Credentials Compromised:
1. **Immediately revoke** all affected API keys
2. **Generate new credentials** 
3. **Update environment variables**
4. **Force deployment** with new credentials
5. **Monitor logs** for suspicious activity
6. **Document incident** for future prevention

### Emergency Contacts & Resources:
- **GitHub Security**: security@github.com
- **DigitalOcean**: security@digitalocean.com  
- **OpenAI**: security@openai.com

---
**🔒 SECURITY FIRST - NO EXCEPTIONS**  
*These rules are mandatory for all Phoenix BPMN development*  
*Security is not optional - it's foundational*