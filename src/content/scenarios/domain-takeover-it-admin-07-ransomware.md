---
title: "The Domain Takeover — Chapter 7: Ransomware Deployment"
chain: "domain-takeover"
chainOrder: 7
role: "it-admin"
attack: "ransomware"
choices:
  - label: "Boot domain controllers from clean media and begin AD forest recovery"
    next: "debrief"
  - label: "Preserve forensic evidence before attempting any recovery operations"
    next: "debrief"
isDebrief: false
---

Your phone rings at 3:17 AM. The on-call team reports that every system is displaying a ransom note. You VPN in and confirm the worst: the attacker deployed ransomware via a Group Policy Object linked to the domain root. Every domain-joined system executed the payload at the same time.

You check the backup infrastructure — the Veeam server is encrypted, the tape library shows all recent tapes as erased, and the offsite replication target has been wiped. Volume Shadow Copies were deleted across all servers before encryption. Your disaster recovery plan assumed at least one backup tier would survive. None did.

---

## What Is Ransomware Deployment?

Ransomware deployment in an Active Directory environment leverages domain-wide execution capabilities. Attackers commonly use Group Policy to push the ransomware binary to every domain-joined system, PsExec for targeted deployment, or WMI for fileless execution. Pre-deployment preparation includes disabling antivirus via GPO, deleting Volume Shadow Copies, destroying backup infrastructure, and staging exfiltrated data. The encryption itself is the final act in a chain that began weeks or months earlier.
