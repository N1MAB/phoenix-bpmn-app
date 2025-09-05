# 🔒 BEVEILIGDE DEPLOYMENT GUIDE - DIAGRAM TOOL
================================================

## 📋 DEPLOYMENT CHECKLIST

### STAP 1: VOORBEREIDING
- [ ] Backup maken van huidige website
- [ ] SSL certificaat geïnstalleerd (HTTPS)
- [ ] Domein naam toegevoegd aan configuratie files
- [ ] N8N webhook URLs geconfigureerd

### STAP 2: BESTANDEN AANPASSEN

#### A. Index.html aanpassen:
1. Open `index-secured.html`
2. Zoek regel met `ALLOWED_DOMAINS`
3. Vervang met jouw domeinen:
```javascript
const ALLOWED_DOMAINS = [
    'jouwdomein.nl',
    'www.jouwdomein.nl'
];
```

#### B. .htaccess aanpassen:
1. Open `.htaccess`
2. Zoek en vervang `yourdomain.com` met jouw domein
3. Als je SSL hebt, uncomment de HTTPS redirect regels (verwijder # aan begin)

#### C. Anti-copy.js (optioneel aanpassen):
- Regel 115: Pas licentie tekst aan
- Regel 28-86: Verwijder shortcuts die je WEL wilt toestaan

### STAP 3: UPLOADEN NAAR SERVER

#### Bestanden structuur:
```
httpdocs/
├── .htaccess                 (security configuratie)
├── index.html                (gebruik index-secured.html)
├── anti-copy.js              (anti-kopie bescherming)
├── vite.svg                  (favicon)
├── assets/                   (alle JS/CSS bestanden)
│   ├── index-Dabz_B46.js
│   ├── index-BVJmJdD9.css
│   └── ... (alle andere assets)
└── dist/                     (alleen als nodig)
```

#### Upload volgorde:
1. Maak eerst backup van huidige site
2. Upload `.htaccess` 
3. Upload `anti-copy.js`
4. Upload `index.html` (renamed van index-secured.html)
5. Upload complete `assets/` folder
6. Upload `vite.svg`

### STAP 4: TESTEN

#### Security checks:
- [ ] Website laadt correct op HTTPS
- [ ] Rechtermuisknop is geblokkeerd
- [ ] F12/DevTools waarschuwing werkt
- [ ] Ctrl+U (view source) is geblokkeerd
- [ ] Ctrl+S (save) is geblokkeerd
- [ ] Print functie is geblokkeerd
- [ ] Selecteren/kopiëren is geblokkeerd (behalve in input velden)

#### Functionaliteit checks:
- [ ] Diagram tool werkt normaal
- [ ] AI assistent (Clippy) werkt
- [ ] Export functies werken
- [ ] Thema switcher werkt

### STAP 5: EXTRA BEVEILIGING (OPTIONEEL)

#### A. IP Whitelist (alleen voor interne tools):
Voeg toe aan `.htaccess`:
```apache
<RequireAll>
    Require ip 192.168.1.0/24
    Require ip 10.0.0.0/8
    Require ip YOUR.PUBLIC.IP
</RequireAll>
```

#### B. Basic Authentication:
1. Maak `.htpasswd` file:
```bash
htpasswd -c .htpasswd username
```
2. Voeg toe aan `.htaccess`:
```apache
AuthType Basic
AuthName "Restricted Access"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

#### C. CloudFlare Protection:
- Zet CloudFlare aan voor DDoS bescherming
- Activeer "Under Attack Mode" bij verdachte activiteit
- Gebruik CloudFlare firewall rules

## 🚨 BELANGRIJKE WAARSCHUWINGEN

### AANPASSEN VOOR PRODUCTIE:
1. **N8N Webhook URLs**: Vervang in de code met jouw werkende N8N instance
2. **Domein Lock**: ALTIJD aanpassen naar jouw domein(en)
3. **CSP Headers**: Pas Content-Security-Policy aan voor externe resources
4. **Error Messages**: Vervang generieke errors met eigen pagina's

### MONITORING:
- Check regelmatig server logs voor verdachte activiteit
- Monitor 404 errors (mogelijk scan pogingen)
- Let op plotselinge traffic pieken
- Controleer of bestanden niet gewijzigd zijn

## 🛡️ WAT IS BEVEILIGD?

### Code Bescherming:
✅ JavaScript is geminified (moeilijk te lezen)
✅ Console/DevTools detectie met waarschuwing
✅ Rechtermuisknop geblokkeerd
✅ View source geblokkeerd
✅ Save page geblokkeerd
✅ Copy/paste geblokkeerd (behalve in forms)

### Server Bescherming:
✅ Directory listing uitgeschakeld
✅ Server signature verborgen
✅ Security headers geïmplementeerd
✅ Hotlink protection
✅ Bot/crawler blocking
✅ Rate limiting
✅ XSS protection
✅ Clickjacking protection

### Content Bescherming:
✅ Watermark met domein naam
✅ Domain lock (werkt alleen op jouw domein)
✅ Offline detection
✅ Integrity checking
✅ Print blocking

## ⚠️ BEPERKINGEN

**Belangrijk om te weten:**
- Bepaalde gebruikers met gevorderde kennis kunnen ALTIJD de client-side code bekijken
- Browser extensies kunnen sommige beschermingen omzeilen
- Network tab in DevTools kan API calls nog steeds tonen
- Screenshots kunnen altijd gemaakt worden

**Deze beveiliging is effectief tegen:**
- Casual kopiëren door normale gebruikers
- Automated scraping/bots
- Hotlinking van resources
- Basis hacking pogingen
- Ongeautoriseerd hergebruik

## 📞 SUPPORT

Bij problemen met deployment:
1. Check browser console voor errors (F12)
2. Controleer server error logs
3. Test zonder .htaccess om te zien of dat het probleem is
4. Probeer zonder anti-copy.js voor troubleshooting

## 🔄 UPDATES

Voor updates van de tool:
1. Download nieuwe versie
2. Backup huidige installatie
3. Upload nieuwe bestanden
4. Test alle functionaliteit
5. Pas security files aan indien nodig

---

**Laatste update:** September 2025
**Versie:** Security Package 1.0
**Tool versie:** 4.2.0-VERIFIED

---

SUCCES MET JE BEVEILIGDE DEPLOYMENT! 🚀