# 📋 PROJECT DISCIPLINE RULES - BPMN Development

## 🎯 CORE PRINCIPLE: CLEAN DEVELOPMENT WORKFLOW

### 🏗️ DIRECTORY STRUCTURE (MANDATORY)
```
16-Phoenix.BPMN/
├── original/           # Source werkende versie (NOOIT WIJZIGEN)
├── working/            # ENIGE werkmap - alle changes hier
├── v1-solution/        # Milestone backup (als working werkt)
├── v2-improvements/    # Volgende milestone backup
└── final-production/   # Eindresultaat voor deployment
```

### ⚡ WORKFLOW RULES

#### REGEL 1: SINGLE WORKING DIRECTORY
- **ALTIJD** beginnen met: `cp -r original/ working/`
- **ALLEEN** werken in `working/` map
- **NOOIT** direct in original/ wijzigen
- **GEEN** parallel bestanden maken

#### REGEL 2: NO FILE POLLUTION  
- **GEEN** `-v2`, `-test`, `-demo`, `-backup` bestanden
- **GEEN** multiple `.tar.gz` packages
- **GEEN** experimental files buiten working/
- **ÉÉN** versie per keer, maak die compleet

#### REGEL 3: COMPLETION BEFORE BACKUP
- Werk door tot working/ versie **VOLLEDIG** werkt
- Test grondig vanuit working/
- **ALLEEN** dan backup maken naar v1-xxx/
- Dan pas beginnen aan volgende feature

#### REGEL 4: MILESTONE NAMING
```
v1-core-bpmn-editor/             # Beschrijf WAT werd opgelost
v2-ai-integration/               # Beschrijf WAT werd toegevoegd
v3-ui-improvements/               # Beschrijf WAT werd verbeterd
v4-performance-optimization/     # Beschrijf WAT werd geoptimaliseerd
```

### 🚫 FORBIDDEN ACTIONS
- ❌ Patches/hacks proberen (bewezen falend)
- ❌ Multiple deployment packages maken
- ❌ Test bestanden parallel ontwikkelen  
- ❌ Halfwerk opslaan als "milestone"
- ❌ Original/ directory modificeren
- ❌ Experimental code buiten working/

### ✅ REQUIRED ACTIONS
- ✅ Architecturele oplossing kiezen
- ✅ Volledig implementeren in working/
- ✅ Grondig testen vanuit working/
- ✅ Documenteren wat werkt
- ✅ Clean backup maken bij succes
- ✅ Rollback plan voor elke stap

### 📝 DOCUMENTATION PER MILESTONE
Elke vX-xxx/ map bevat:
- **CHANGES.md** - Wat werd gedaan
- **DEPLOYMENT.md** - Hoe te deployen
- **ROLLBACK.md** - Hoe terug te rollen
- **TESTING.md** - Hoe te testen

### 🎯 SUCCESS CRITERIA
Een milestone is ALLEEN succesvol als:
1. Problem is volledig opgelost
2. Alle functionality werkt
3. Deployment instructies kloppen
4. Rollback mogelijk is
5. Documentatie compleet is

**Discipline = Success. Chaos = Failure.**