---
title: "The Service Account Heist — Chapter 5: Service Account Attacks"
chain: "service-account-heist"
chainOrder: 5
role: "it-admin"
attack: "service-account-attacks"
choices:
  - label: "Conduct a full service account privilege audit and implement least-privilege"
    next: "ntds-dit"
  - label: "Deploy service account behavior monitoring across all critical systems"
    next: "ntds-dit"
isDebrief: false
---

The Silver Ticket compromise of the SQL Server was just the beginning. Using the SQL Server service account's local admin privileges, the attacker extracted additional credentials from the server's memory using Mimikatz. They found cached credentials for the backup service account — which has network access to every server in the domain for nightly backup operations.

You trace the cascading compromise through your environment. The backup account touched the monitoring server, which held credentials for the monitoring service account, which had read access to every server's event logs including domain controllers. The monitoring account accessed the deployment server, which stored the deployment service account credentials — an account with local admin on every application server. Each service account led to another, forming a chain of trust relationships that no one had ever mapped end to end. Your service account inventory audit reveals eighty-four service accounts with domain admin or equivalent privileges, most granted years ago for "temporary" operational needs that became permanent.

---

## What Is a Service Account Attack?

Service account attacks exploit the automated accounts that run enterprise applications, scheduled tasks, backup jobs, monitoring systems, and infrastructure services. These accounts present an outsized attack surface because they typically operate with elevated privileges across many systems, rarely have password rotation enforced, cannot use interactive MFA, and run continuously — making them ideal for persistent access. Attackers chain service account compromises by extracting credentials from compromised servers to discover additional service accounts. Defense requires maintaining a comprehensive service account inventory with documented owners, enforcing least-privilege access with regular attestation, implementing credential vaulting and automatic rotation, deploying behavioral monitoring to detect anomalous service account usage, and eliminating unnecessary service accounts and privilege grants.
