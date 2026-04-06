---
title: "The Cloud Bridge — Chapter 5: Lateral Movement"
chain: "cloud-bridge"
chainOrder: 5
role: "red-teamer"
attack: "lateral-movement"
choices:
  - label: "Document all compromised paths and prepare the engagement debrief"
    next: "debrief"
  - label: "Map the complete blast radius for the final report"
    next: "debrief"
isDebrief: false
---

With forged SAML assertions granting you any identity across any federated service, the lateral movement phase is methodical devastation. In Azure, you assume Global Administrator and enumerate every subscription, resource group, and Key Vault. In AWS, you use the OrganizationAccountAccessRole to traverse every account in the organization, accessing S3 buckets, RDS snapshots, and Secrets Manager entries.

You pivot into the CI/CD pipeline through a service principal with AKS deployment credentials, gaining access to production Kubernetes clusters. A quick enumeration of environment variables reveals database connection strings, API keys, and third-party service credentials. You deploy a proof-of-concept container that demonstrates data exfiltration capability through DNS tunneling — subtle enough to evade standard network monitoring. Your attack path report now documents complete compromise from a single password to full organizational control across three cloud providers and on-premises infrastructure, achieved in under seventy-two hours.

---

## What Is Lateral Movement?

Lateral movement encompasses the post-initial-access techniques used to navigate through an environment toward objectives. In cloud environments, key techniques include cross-account role assumption via STS, service principal credential abuse, federation trust exploitation, CI/CD pipeline compromise, Kubernetes service account escalation, and cross-cloud pivoting through shared credentials or federated identity. Effective lateral movement leverages legitimate protocols and trusted relationships to minimize detection. The goal is to expand access to high-value targets — data stores, secret management systems, production infrastructure — while maintaining multiple persistence paths. Understanding lateral movement patterns is essential for both red team operations and building effective detection and segmentation controls.
