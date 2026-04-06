---
title: "The Service Account Heist — Chapter 4: Silver Ticket"
chain: "service-account-heist"
chainOrder: 4
role: "c-level"
attack: "silver-ticket"
choices:
  - label: "Authorize funding for a PAM solution to vault all service account credentials"
    next: "service-account-attacks"
  - label: "Escalate to the board with a request for emergency security spending"
    next: "service-account-attacks"
isDebrief: false
---

The scenario your CISO warned about has materialized in the real world. A threat actor — not your penetration testers — used the same attack path to crack a service account password and forge a Kerberos service ticket. Unlike the Golden Ticket that requires the domain's master key, a Silver Ticket only needs a single service account's password hash. But that is enough to grant unlimited access to the specific service that account runs.

The compromised service account runs your primary SQL Server cluster. The forged ticket grants the attacker sysadmin-level access to every database — customer records, financial data, intellectual property. The ticket was forged offline and presented directly to the SQL Server, bypassing the domain controller entirely. Your SIEM never saw an authentication event because the domain controller was never involved. The attacker has been querying your databases for an estimated eleven days before network anomaly detection flagged the unusual data volume.

---

## What Is a Silver Ticket Attack?

A Silver Ticket attack involves forging a Kerberos Ticket Granting Service (TGS) ticket using the password hash of a service account. Unlike a Golden Ticket which provides domain-wide access, a Silver Ticket provides access to a specific service — such as SQL Server, a file share, or a web application — by impersonating any user to that service. Because the forged ticket is validated directly by the target service rather than the domain controller, the attack bypasses centralized authentication logging and is extremely difficult to detect. Mitigation requires strong service account passwords, regular rotation, monitoring for anomalous service access patterns, and implementing Privileged Access Management solutions that vault and rotate service account credentials automatically.
