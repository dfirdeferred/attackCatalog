# CYOA Attack Catalog — Design Spec

## Overview

An interactive "choose your own adventure" cybersecurity education site built from Netwrix's 33-article attack catalog. Users select a role and explore attacks through two distinct modes: a professional reference hub and an immersive narrative scenario experience.

**Source content:** 33 attack articles from https://netwrix.com/en/cybersecurity-glossary/cyber-security-attacks/
**Reference site:** https://techbrandon.github.io/security/2026/03/26/passkey-path/ (static CYOA with role-based paths, progress tracking, achievements)

## Tech Stack

- **Framework:** Astro (static site generator)
- **Output:** Static HTML (local dev via `npm run dev`)
- **Content:** Markdown files in Astro content collections
- **Interactivity:** Vanilla JS islands for progress tracking, achievements, theme switching
- **Hosting:** Local for dev team demos; deployable to any static host later

## Two Modes, One Site

### Reference Mode (Professional/Corporate Theme)
- Light background, clean sans-serif typography, color-coded role cards
- Role-based learning hub: pick your role, browse attacks relevant to you
- Each attack article framed for the selected role's perspective
- "Dig deeper" links and cross-role badges (like the reference site)
- Link to scenario mode for each attack's kill chain appearances

### Scenario Mode (Dark Hacker/Terminal Theme)
- Dark background (#0d1117), monospace headings, green/amber accents
- Kill chain narratives with branching choices
- Same 33 attacks woven into 7 realistic attack sequences
- Scenario text frames each attack, then educational content follows
- Branching choices advance the kill chain ("What do you do next?")
- Debrief page at end of each chain with lessons learned

### Theme Transition
- Landing page uses professional theme
- Reference mode maintains professional theme throughout
- Scenario mode switches to dark terminal aesthetic on entry
- The theme shift itself signals the mode change

## Four Role Paths

| Role | Color | Perspective | Focus |
|------|-------|-------------|-------|
| C-Level / IT Manager | Red (#cf222e / #ff6b6b) | Strategic | Business impact, cost, risk, board-level decisions |
| IT Administrator | Blue (#0550ae / #58a6ff) | Defensive | Detection, hardening, incident response, SIEM alerts |
| End User | Green (#1a7f37 / #3fb950) | Victim | What attacks look like, how to stay safe, what to do |
| Red Teamer | Gold (#9a6700 / #d29922) | Offensive | Attack chains, techniques, exploitation paths |

### Content Strategy: Overlap Freely
All 33 attacks appear in every role path, reframed for that role's perspective:
- Same base article (markdown content collection)
- Role-specific frontmatter fields: intro paragraph, "why you care" section, emphasized mitigations
- AI-generated scenario narratives for all roles × all kill chains

## Seven Kill Chains (Scenario Mode)

### Chain 1: The Domain Takeover
LDAP Reconnaissance → Password Spraying → Kerberoasting → Golden Ticket → DCSync → Lateral Movement → Ransomware

### Chain 2: The Silent Persistence
Credential Stuffing → Pass-the-Hash → AdminSDHolder Modification → DCShadow → Skeleton Key → SSP Attack

### Chain 3: The Cloud Bridge
Password Attack → Pass-the-Cookie → Abusing Entra ID → Golden SAML → Lateral Movement

### Chain 4: The Service Account Heist
LDAP Reconnaissance → AS-REP Roasting → gMSA Exploitation → Silver Ticket → Service Account Attacks → NTDS.dit Extraction

### Chain 5: The Zero-Day Cascade
Hafnium/Zero-Day → PowerShell Attacks → Plaintext Password Extraction → Pass-the-Ticket → DCShadow → Ransomware

### Chain 6: The Physical Vector
Mousejacking → Rainbow Table Attack → Zerologon → Golden Ticket → Lateral Movement

### Chain 7: The AI-Assisted Breach
ChatGPT Prompt Injection → SQL Injection → Lateral Movement → Malware

### Role Perspectives Per Chain
- **C-Level/IT Manager:** Business impact, cost, timeline, authorization decisions
- **IT Administrator:** Detection signals, response procedures, containment choices
- **End User:** Victim experience, warning signs, what to do when targeted
- **Red Teamer:** Attacker perspective, technique selection, exploitation decisions

## URL Structure

```
/                              → Landing page (professional theme)
/[role]/                       → Role landing page (reference mode)
/[role]/[attack-slug]/         → Attack article (reference mode)
/scenario/[role]/              → Scenario mode role entry
/scenario/[role]/[chain-slug]/ → Kill chain narrative pages
/progress/                     → Progress & achievements dashboard
/glossary/                     → Shared glossary
```

**Role slugs:** `c-level`, `it-admin`, `end-user`, `red-teamer`
**Chain slugs:** `domain-takeover`, `silent-persistence`, `cloud-bridge`, `service-account-heist`, `zero-day-cascade`, `physical-vector`, `ai-breach`

## Landing Page

- **Hero:** Title, subtitle ("33 attack vectors. 7 kill chains. 4 perspectives. Choose your path.")
- **Mode cards (side by side):**
  - "Learn at Your Own Pace" → Reference Mode
  - "Play the Scenario" → Scenario Mode (subtle dark theme hint)
- **Role cards (2×2 grid):** 4 roles with color coding, description, "Start path →"
- **Persistent header:** Home, Progress, Glossary, Threat Level badge
- Role selection happens after mode selection

## Navigation Patterns

### Reference Mode
1. Landing → Mode selection → Role landing page
2. Role landing → Foundation articles + categorized attack cards
3. Attack page: breadcrumbs, role-specific intro, article content, "Dig Deeper" cards, cross-role badges
4. Bottom: "See this in Scenario Mode" link to relevant kill chain(s)

### Scenario Mode
1. Landing → Mode selection → Role landing page
2. Role landing → 7 kill chain cards (name, attacks listed, completion status)
3. Kill chain page: scenario text → educational content → branching choice
4. Each choice → next attack in chain
5. Chain end → debrief page (summary, lessons, links to reference mode)
6. Bottom: "Read the full article" link to reference mode

### Cross-Mode Linking
- Every reference article links to its kill chain appearances in scenario mode
- Every scenario page links to the full reference article
- Progress earned in either mode counts toward overall threat level

## Gamification & Progress System

### Core Tracking (localStorage)
- Auto-read detection: 80% scroll + 15 seconds on page
- Manual "Mark as read" button
- Separate progress tracking for Reference Mode and Scenario Mode
- Key: `attackCatalog` → `{ pages: {}, achievements: [], threatLevel: "" }`

### Progress Indicators
- Per-role progress bars on landing page and role hubs
- Per-kill-chain progress in scenario mode ("Chapter 3 of 7")
- Overall site completion percentage on progress dashboard

### Threat Level Score
Persistent badge in nav bar, progresses based on total pages read:

| Level | Threshold |
|-------|-----------|
| Vulnerable | 0% |
| Aware | 10% |
| Informed | 30% |
| Hardened | 50% |
| Fortified | 75% |
| Impenetrable | 100% |

### Achievements (16)

| Achievement | Trigger |
|-------------|---------|
| First Contact | Read 1 page |
| Role Player | Complete any role's reference path |
| Chain Breaker | Complete any kill chain scenario |
| C-Suite Ready | Complete C-Level reference path |
| Sysadmin Shield | Complete IT Admin reference path |
| Street Smart | Complete End User reference path |
| Red Badge | Complete Red Teamer reference path |
| Domain Defender | Complete Chain 1 (Domain Takeover) |
| Ghost Hunter | Complete Chain 2 (Silent Persistence) |
| Cloud Watcher | Complete Chain 3 (Cloud Bridge) |
| Key Master | Complete Chain 4 (Service Account Heist) |
| Zero Day Survivor | Complete Chain 5 (Zero-Day Cascade) |
| Signal Catcher | Complete Chain 6 (Physical Vector) |
| Prompt Guardian | Complete Chain 7 (AI-Assisted Breach) |
| Explorer | Read at least 1 page from every role |
| Omniscient | 100% completion across both modes |

- Toast notifications on unlock (terminal-styled green flash effect)

## Content Collections (Astro)

### Attack Articles (`src/content/attacks/`)
```yaml
---
title: "Golden Ticket Attack"
slug: "golden-ticket-attack"
severity: "Critical"
category: "Kerberos / Active Directory Authentication"
targets: ["Active Directory", "Domain Controllers"]
killChains: ["domain-takeover", "physical-vector"]
roles:
  c-level:
    intro: "A Golden Ticket attack grants an attacker..."
    whyCare: "Business impact: complete domain compromise..."
  it-admin:
    intro: "When an attacker forges a TGT using..."
    whyCare: "Detection: monitor Event IDs 4768/4769..."
  end-user:
    intro: "You may never see a Golden Ticket attack directly..."
    whyCare: "This is why password policies matter..."
  red-teamer:
    intro: "With the KRBTGT hash in hand..."
    whyCare: "Persistence technique enabling..."
---

[Base article content from Netwrix, rewritten]
```

### Scenario Narratives (`src/content/scenarios/`)
```yaml
---
title: "The Domain Takeover — Chapter 4: The Golden Ticket"
chain: "domain-takeover"
chainOrder: 4
role: "it-admin"
attack: "golden-ticket-attack"
choices:
  - label: "Investigate the forged TGT in your SIEM"
    next: "dcsync-attack"
  - label: "Reset the KRBTGT password immediately"
    next: "dcsync-attack"
---

[Scenario narrative text]
```

## The 33 Attacks (Complete Inventory)

### Kerberos / AD Authentication (10)
1. Golden Ticket Attack (Critical)
2. Silver Ticket Attack (High)
3. Kerberoasting (High)
4. AS-REP Roasting (High)
5. Pass-the-Ticket Attack (High)
6. Pass-the-Hash Attack (High)
7. Golden SAML Attack (Critical)
8. Skeleton Key Attack (Critical)
9. DCSync Attack (Critical)
10. DCShadow Attack (Critical)

### Credential Theft & Password (8)
11. Password Attack (Medium)
12. Password Spraying Attack (Medium)
13. Credential Stuffing (Medium)
14. Rainbow Table Attack (High)
15. Plaintext Password Extraction (High)
16. NTDS.dit Password Extraction (Critical)
17. gMSA Exploitation Attack (High)
18. Security Support Provider Attack (Critical)

### AD Infrastructure (4)
19. AdminSDHolder Modification (Critical)
20. Zerologon Vulnerability (Critical)
21. LDAP Reconnaissance (Low-Medium)
22. Hafnium Cyber Attack (Critical)

### Lateral Movement & Post-Exploitation (3)
23. Lateral Movement (Critical)
24. Service Account Attacks (High)
25. PowerShell Attacks (High)

### Web Application & Injection (2)
26. SQL Injection / PowerUpSQL (High)
27. ChatGPT Prompt Injection (High)

### Network & Communication (2)
28. Man-in-the-Middle Attack (Critical)
29. Mousejacking Attack (High)

### Cloud & Identity Federation (2)
30. Abusing Entra ID Application Permissions (High)
31. Pass-the-Cookie Attack (High)

### Malware & Ransomware (2)
32. Ransomware Attack (Critical)
33. Malware Attacks (High)
