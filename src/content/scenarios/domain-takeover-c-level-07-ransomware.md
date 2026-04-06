---
title: "The Domain Takeover — Chapter 7: Ransomware Deployment"
chain: "domain-takeover"
chainOrder: 7
role: "c-level"
attack: "ransomware"
choices:
  - label: "Refuse to pay and begin the long process of rebuilding from scratch"
    next: "debrief"
  - label: "Engage a ransomware negotiation firm while exploring recovery options"
    next: "debrief"
isDebrief: false
---

The nightmare scenario has materialized. At 3:00 AM on a Saturday, every server and workstation in your organization displays the same message: "Your files have been encrypted. Pay 50 BTC within 72 hours or your data will be published." The attacker has deployed ransomware across the entire domain simultaneously using Group Policy.

Your backups have been destroyed. The attacker deleted shadow copies, wiped the Veeam backup repository, and encrypted the offsite NAS. Your legal team warns of imminent regulatory action. The board wants to know: do you pay the ransom, or do you rebuild from scratch? Either path will cost millions and take months.

---

## What Is Ransomware Deployment?

Ransomware deployment is the final stage of many Active Directory attacks, where the attacker encrypts files across the entire network and demands payment for the decryption key. Modern ransomware operators often combine encryption with data exfiltration ("double extortion"), threatening to publish stolen data if the ransom is not paid. Domain-wide deployment is typically achieved through Group Policy, PsExec, or WMI, leveraging the domain admin access gained in earlier attack stages.
