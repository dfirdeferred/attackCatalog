---
title: "The Domain Takeover — Chapter 7: Ransomware Deployment"
chain: "domain-takeover"
chainOrder: 7
role: "red-teamer"
attack: "ransomware"
choices:
  - label: "Initiate ransom negotiations via the Tor-based portal"
    next: "debrief"
  - label: "Publish a sample of the exfiltrated data as leverage"
    next: "debrief"
isDebrief: false
---

The operation reaches its culmination. You have exfiltrated 4TB of sensitive data to cloud storage: customer PII, financial records, intellectual property, and executive communications. Now you prepare the ransomware deployment.

You create a Group Policy Object linked to the domain root that executes your payload on startup. You disable Windows Defender across all systems via GPO and schedule the encryption for 3:00 AM Saturday to maximize time before detection. Before triggering, you delete all Volume Shadow Copies, destroy the Veeam backup repository, and erase recent tape backups. At the appointed hour, every domain-joined system encrypts simultaneously.

---

## What Is Ransomware Deployment?

Domain-wide ransomware deployment is the final phase of a full Active Directory compromise. The operator leverages Domain Admin access to push the ransomware binary via GPO, scheduled tasks, or remote execution frameworks. Pre-deployment actions include disabling security controls, destroying backups, and exfiltrating data for double extortion. The encryption event is timed for maximum impact — typically weekends or holidays when response teams are minimal.
