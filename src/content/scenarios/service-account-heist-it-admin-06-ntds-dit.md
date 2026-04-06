---
title: "The Service Account Heist — Chapter 6: NTDS.dit Extraction"
chain: "service-account-heist"
chainOrder: 6
role: "it-admin"
attack: "ntds-dit"
choices:
  - label: "Initiate domain-wide password reset and proceed to the debrief"
    next: "debrief"
  - label: "Preserve forensic evidence and begin the post-incident review"
    next: "debrief"
isDebrief: false
---

The cascading service account compromise reached its inevitable conclusion. The monitoring service account, with its domain controller access, was used to create a Volume Shadow Copy on DC01. Event ID 4799 logged the shadow copy creation, but your alert rule for this event had been disabled six months ago during a false-positive tuning exercise. The attacker used the shadow copy to extract NTDS.dit along with the SYSTEM registry hive — everything needed to extract every password hash in the domain offline.

You discover the breach when your SIEM correlates unusual outbound data transfer from the domain controller — the NTDS.dit file being exfiltrated over an encrypted channel. The file contains password hashes for all eight thousand user accounts, two hundred and thirty-one service accounts, and the KRBTGT account. Full domain password reset is the only complete remediation. You begin planning the most disruptive security operation of your career: resetting every credential in the domain while maintaining business operations.

---

## What Is NTDS.dit Password Extraction?

The NTDS.dit file is the Active Directory database residing on domain controllers, storing all domain account information including password hashes. Attackers extract it using Volume Shadow Copy Service (vssadmin), ntdsutil, or direct disk access on a compromised domain controller. Combined with the SYSTEM registry hive for the boot key, the password hashes can be extracted offline using tools like secretsdump or DSInternals. Detection requires monitoring for shadow copy creation on domain controllers (Event IDs 4799, 8222), ntdsutil invocations, unusual file access to the NTDS.dit path, and anomalous data exfiltration from domain controllers. Prevention demands treating domain controllers as Tier 0 assets with the strictest access controls, implementing tiered administration, and restricting which accounts can log into domain controllers to the absolute minimum set.
