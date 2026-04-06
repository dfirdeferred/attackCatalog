---
title: "The Domain Takeover — Chapter 5: DCSync"
chain: "domain-takeover"
chainOrder: 5
role: "c-level"
attack: "dcsync"
choices:
  - label: "Engage a crisis communications firm alongside the IR team"
    next: "lateral-movement"
  - label: "Begin planning a full Active Directory rebuild from scratch"
    next: "lateral-movement"
isDebrief: false
---

Your CISO delivers the worst news yet. The attacker has replicated your entire Active Directory database — every username, every password hash, every secret stored in the directory. They used a technique that mimics legitimate domain controller replication, making it nearly impossible to distinguish from normal operations.

This means the attacker now possesses credentials for every employee, every service account, and every administrator in the organization. Even if you reset every password today, the attacker has a blueprint of your entire identity infrastructure. The breach containment estimate has jumped from days to weeks.

---

## What Is DCSync?

DCSync is an attack that abuses Active Directory's domain controller replication protocol (MS-DRSR) to request password hashes for any account in the domain. By impersonating a domain controller, the attacker can extract the NTLM hash of every account — including the KRBTGT account — without ever touching the NTDS.dit file on disk. This makes DCSync extremely stealthy and devastatingly effective.
