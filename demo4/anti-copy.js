// ==========================================
// ANTI-KOPIE BESCHERMING
// ==========================================

(function() {
    'use strict';
    
    // Blokkeer rechtermuisknop
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Blokkeer selectie van tekst
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });
    
    // Blokkeer drag van elementen
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Blokkeer print
    window.addEventListener('beforeprint', function(e) {
        console.warn('Printing disabled');
        return false;
    });
    
    // Blokkeer keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // F12 (DevTools)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+A (Select All) - alleen buiten input/textarea
        if (e.ctrlKey && e.keyCode === 65) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        }
        
        // Ctrl+C (Copy) - alleen buiten input/textarea
        if (e.ctrlKey && e.keyCode === 67) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        }
    });
    
    // DevTools detector
    let devtools = {open: false, orientation: null};
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.clear();
                console.log('%cWAARSCHUWING!', 'color: red; font-size: 50px; font-weight: bold;');
                console.log('%cDeze browser console is alleen voor ontwikkelaars.', 'color: red; font-size: 20px;');
                console.log('%cAls iemand je heeft gevraagd hier iets te plakken, is dit waarschijnlijk een poging tot fraude.', 'color: red; font-size: 16px;');
                
                // Optioneel: redirect of disable functionaliteit
                // window.location.href = "about:blank";
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // Console methods overschrijven
    const noop = () => {};
    ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir'].forEach(method => {
        console[method] = noop;
    });
    
    // Watermark toevoegen
    const addWatermark = () => {
        const watermark = document.createElement('div');
        watermark.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            opacity: 0.5;
            z-index: 99999;
            pointer-events: none;
            color: #888;
            font-size: 12px;
            user-select: none;
        `;
        watermark.textContent = 'Licensed to: ' + window.location.hostname;
        document.body.appendChild(watermark);
    };
    
    // Voeg watermark toe na laden
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addWatermark);
    } else {
        addWatermark();
    }
    
    // Integrity check
    const checkIntegrity = () => {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            // Check of scripts niet gemodificeerd zijn
            if (script.src.indexOf(window.location.origin) !== 0 && 
                script.src.indexOf('cdn.jsdelivr.net') === -1) {
                console.error('Unauthorized script detected:', script.src);
                script.remove();
            }
        });
    };
    
    // Check integrity elke 5 seconden
    setInterval(checkIntegrity, 5000);
    
    // Offline detectie
    window.addEventListener('offline', function() {
        alert('Internet verbinding vereist voor deze applicatie.');
    });
    
})();