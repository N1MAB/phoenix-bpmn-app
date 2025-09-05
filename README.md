# BPMN AI Studio - Deployment Package

## 📋 Inhoud
Dit is de productie-klare versie van BPMN AI Studio, gebouwd voor deployment op **slimpunt.nl/demo5/**

### Bestanden:
- `index.html` - Main entry point
- `assets/` - CSS, JS en font bestanden
- `vite.svg` - Favicon

## 🚀 Deployment Instructies

### Voor slimpunt.nl:
1. Upload alle bestanden naar `/httpdocs/demo5/` op je webserver
2. Zorg dat de mapstructuur behouden blijft:
   ```
   httpdocs/demo5/
   ├── index.html
   ├── vite.svg
   └── assets/
       ├── index-[hash].js
       ├── index-[hash].css
       └── [font-files]
   ```

### URL Access:
- **Live URL**: https://slimpunt.nl/demo5/
- **Lokale test**: Open index.html in browser (relatieve paths werken lokaal ook)

## ⚙️ Features
- ✅ Enhanced AI BPMN generation met smart positioning
- ✅ Professional swimlane support
- ✅ Dark/Light mode toggle
- ✅ SVG/PNG/XML export functionaliteit
- ✅ Responsive interface
- ✅ n8n backend integration

## 🔧 Backend Requirement
Zorg dat je n8n webhook actief is op:
- **Endpoint**: `/bpmn-generator` 
- **Model**: Claude Sonnet 3.7
- **Enhanced prompt**: Gebruikt het verbeterde positioning algoritme

## 📱 Browser Support
- Chrome/Edge (aanbevolen)
- Firefox
- Safari
- Moderne mobile browsers

---
*Gebouwd: $(date)*
*Versie: Production-ready*
*Base Path: /demo5/*