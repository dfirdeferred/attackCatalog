---
title: "The Domain Takeover — Chapter 6: Lateral Movement"
chain: "domain-takeover"
chainOrder: 6
role: "red-teamer"
attack: "lateral-movement"
choices:
  - label: "Deploy the ransomware payload across all compromised systems"
    next: "ransomware"
  - label: "Exfiltrate sensitive data before deploying ransomware for double extortion"
    next: "ransomware"
isDebrief: false
---

With the complete hash dump from DCSync, you begin systematic lateral movement. You use CrackMapExec to spray the local administrator hash across all 2,000 workstations — 1,847 share the same local admin password. For servers, you authenticate using the Domain Admin NTLM hash via pass-the-hash with `wmiexec.py`.

You establish footholds on the file server (containing 12TB of corporate data), the SQL database cluster (customer records and financial data), and critically, the backup server running Veeam. You disable the backup schedule and delete the most recent backup copies. The ransomware deployment path is clear.

---

## What Is Lateral Movement?

Lateral movement is the technique of pivoting through a network using compromised credentials and remote execution capabilities. Operators use tools like CrackMapExec, Impacket's wmiexec/smbexec, PsExec, and RDP to move between systems. The goal is to reach high-value targets: domain controllers, file servers, database servers, and backup infrastructure. Controlling backup systems is a critical pre-ransomware objective.
