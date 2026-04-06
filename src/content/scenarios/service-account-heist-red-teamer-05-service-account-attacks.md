---
title: "The Service Account Heist — Chapter 5: Service Account Attacks"
chain: "service-account-heist"
chainOrder: 5
role: "red-teamer"
attack: "service-account-attacks"
choices:
  - label: "Chain the compromised service accounts to reach the domain controller"
    next: "ntds-dit"
  - label: "Map the service account trust graph to identify a path to DC access"
    next: "ntds-dit"
isDebrief: false
---

The SQL Server compromise is the hub of a wheel with spokes reaching across the enterprise. You methodically exploit each service account trust relationship. From the SQL Server Agent credentials, you authenticate to the backup server as svc_backup, which has network-level access to every server for nightly backup jobs. On the backup server, you dump LSASS and find cached credentials for the monitoring service account, which has remote WMI access to every server for health checks — including domain controllers.

You map the complete service account trust graph: SQL leads to backup, backup leads to monitoring, monitoring leads to deployment, deployment has local admin on the application tier. Each hop is a legitimate service account performing actions consistent with its purpose — only the operator has changed. You identify that the monitoring service account (svc_monitor) has remote access to all domain controllers for event log collection. This is your path to the crown jewels. The organization never mapped these trust chains, so no one realized that compromising a single SQL service account creates a four-hop path to domain controller access.

---

## What Is a Service Account Attack?

Service account attacks exploit the trust relationships and elevated privileges inherent in automated infrastructure accounts. From an offensive perspective, service accounts are high-value targets because they have predictable behavior patterns that can be mimicked, broad network access required for their functions, cached credentials on multiple servers, and documented relationships through configuration files and scheduled tasks. The key technique is chaining: each compromised service account reveals credentials or access paths to additional service accounts, creating a cascading compromise. Effective service account attacks map the trust graph first using BloodHound or manual enumeration, then traverse it systematically, using each hop's legitimate access patterns to remain undetected by behavioral monitoring that expects these exact access patterns from these accounts.
