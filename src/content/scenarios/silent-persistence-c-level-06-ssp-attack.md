---
title: "The Silent Persistence — Chapter 6: SSP Attack"
chain: "silent-persistence"
chainOrder: 6
role: "c-level"
attack: "ssp-attack"
choices:
  - label: "Authorize a complete domain controller rebuild from trusted media"
    next: "debrief"
  - label: "Mandate hardware security modules for all domain controller authentication"
    next: "debrief"
isDebrief: false
---

Your incident response team has identified the final layer of the attacker's persistence strategy. A malicious Security Support Provider has been installed on your domain controllers — a component that intercepts every authentication event and silently logs credentials to a hidden file.

Every time any employee logs in, their plaintext password is captured. Every password reset, every new hire's first login, every executive authentication — all recorded. Your CISO estimates the attacker has been harvesting credentials for weeks, building a continuously updated database of every password in the organization.

---

## What Is an SSP Attack?

A Security Support Provider (SSP) attack involves installing a malicious authentication module on a domain controller. The rogue SSP integrates with the Windows authentication process and intercepts credentials during every logon event. Unlike a one-time credential dump, an SSP continuously harvests new credentials — including passwords changed after the initial compromise. This gives the attacker an ever-fresh supply of valid credentials that persists across password rotation cycles.
