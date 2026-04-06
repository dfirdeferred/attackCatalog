---
title: "The Service Account Heist — Chapter 6: NTDS.dit Extraction"
chain: "service-account-heist"
chainOrder: 6
role: "red-teamer"
attack: "ntds-dit"
choices:
  - label: "Document the complete attack path and prepare the engagement debrief"
    next: "debrief"
  - label: "Compile all findings for the final penetration test report"
    next: "debrief"
isDebrief: false
---

The monitoring service account gets you onto DC01 via WMI. You escalate to SYSTEM through a scheduled task — a technique consistent with the monitoring agent's normal behavior. Now you execute the final objective: NTDS.dit extraction.

You use vssadmin to create a Volume Shadow Copy of the C: drive, then copy NTDS.dit and the SYSTEM registry hive from the shadow. The extraction takes twelve seconds. You clean up the shadow copy to reduce forensic artifacts but leave the VSS event logs intact — the client's alert for Event ID 4799 was disabled six months ago during a tuning exercise. You exfiltrate the database over an encrypted channel to your assessment infrastructure. Using secretsdump, you extract all eight thousand user hashes, two hundred and thirty-one service account hashes, and the KRBTGT hash. Total time from initial domain user to complete domain credential extraction: sixty-one hours. Attack path: LDAP enumeration to AS-REP Roasting to gMSA extraction to Silver Ticket to service account chaining to NTDS.dit. Six stages, zero alerts triggered.

---

## What Is NTDS.dit Password Extraction?

NTDS.dit is the Active Directory database file stored on domain controllers at %SystemRoot%\NTDS\ntds.dit. It contains all domain account data including NTLM password hashes, Kerberos keys, and credential history. Extraction methods include Volume Shadow Copy (vssadmin create shadow), ntdsutil (IFM creation), WMI shadow copy, and direct file system access. The SYSTEM registry hive provides the boot key needed to decrypt the database. Post-extraction, tools like secretsdump, DSInternals, or NTDSXtract recover all password hashes for offline cracking or pass-the-hash attacks. The NTDS.dit extraction represents complete domain compromise — every credential in the environment. Defensive focus should be on preventing domain controller access through tiered administration, monitoring for VSS operations and NTDS.dit access, and implementing alerts that cannot be casually disabled during tuning exercises.
