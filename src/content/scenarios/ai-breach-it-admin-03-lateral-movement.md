---
title: "The AI-Assisted Breach — Chapter 3: Lateral Movement"
chain: "ai-breach"
chainOrder: 3
role: "it-admin"
attack: "lateral-movement"
choices:
  - label: "Implement emergency micro-segmentation rules"
    next: "malware"
  - label: "Hunt for compromised service accounts across all systems"
    next: "malware"
isDebrief: false
---

The reverse shell on the PostgreSQL server gave the attacker a foothold inside your network perimeter. You trace their path through your logs. The database server sits in a "data tier" VLAN that was supposed to be isolated — but a firewall rule added during a migration project two years ago allows unrestricted traffic between the data tier and the application tier. That rule was meant to be temporary. It became permanent through neglect.

From the database server, the attacker harvested service account credentials stored in application configuration files — connection strings, API keys, and a Jenkins deployment token all stored in plaintext on the application servers. The Jenkins token provided access to the CI/CD pipeline, which has deployment credentials for production, staging, and development environments.

Your network topology diagram shows clean segmentation. The actual firewall rules tell a different story: 847 rules accumulated over five years, with 214 marked as "temporary" that were never removed. The attacker exploited three of these gaps to traverse from the web tier to internal corporate infrastructure.

---

## What Is Lateral Movement?

Lateral movement in modern hybrid environments exploits trust relationships and segmentation gaps between network tiers. Attackers move from web-facing infrastructure to internal systems by harvesting credentials from configuration files, environment variables, CI/CD systems, and service account tokens. Common pivot techniques include SSH key reuse, shared service account credentials across environments, overly permissive firewall rules, and cloud IAM role chaining. Effective defense requires regular firewall rule audits with automatic expiration of temporary rules, secrets management solutions that eliminate plaintext credentials in configuration files, and network monitoring for anomalous east-west traffic patterns.
