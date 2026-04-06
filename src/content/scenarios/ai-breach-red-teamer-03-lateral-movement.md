---
title: "The AI-Assisted Breach — Chapter 3: Lateral Movement"
chain: "ai-breach"
chainOrder: 3
role: "red-teamer"
attack: "lateral-movement"
choices:
  - label: "Pivot through CI/CD pipeline credentials to production"
    next: "malware"
  - label: "Exploit shared service accounts to reach the corporate network"
    next: "malware"
isDebrief: false
---

Your reverse shell on the PostgreSQL server drops you into the "data tier" VLAN. Network enumeration reveals 12 servers in the same subnet — application servers, cache layers, and a Jenkins CI/CD instance. Firewall rules between tiers are permissive: a rule tagged "TEMP-migration-2023" allows all TCP between the data and application VLANs.

You harvest credentials from application server configuration files: `/opt/app/config/database.yml` contains the production database master password, `/opt/app/.env` has API keys for three external services, and `/var/jenkins_home/credentials.xml` stores the Jenkins deployment token — encrypted with Jenkins' default key, which you decrypt in seconds.

The Jenkins token provides access to deployment pipelines for production, staging, and development environments. The production pipeline runs with a service account that has SSH access to all production servers. You pivot through Jenkins to the internal corporate network — a development server that bridges the DMZ and the corporate VLAN. From there, you enumerate Active Directory using the development machine's domain-joined computer account.

---

## What Is Lateral Movement?

Lateral movement in modern attack chains exploits the trust boundaries between application tiers, CI/CD pipelines, and corporate networks. Key pivot points include: configuration files with plaintext credentials, CI/CD systems with broad deployment access, shared service accounts across environments, and network segmentation gaps (especially "temporary" rules). The CI/CD pipeline is a particularly high-value target — it typically holds credentials for production deployment, code repositories, artifact storage, and cloud provider APIs. Effective defense requires secrets management (HashiCorp Vault, AWS Secrets Manager), network segmentation with automatic rule expiration, separate authentication domains for web-facing and internal infrastructure, and monitoring for anomalous access patterns between network tiers.
