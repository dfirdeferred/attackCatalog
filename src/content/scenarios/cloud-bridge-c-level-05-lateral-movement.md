---
title: "The Cloud Bridge — Chapter 5: Lateral Movement"
chain: "cloud-bridge"
chainOrder: 5
role: "c-level"
attack: "lateral-movement"
choices:
  - label: "Review the full incident timeline and authorize the debrief"
    next: "debrief"
  - label: "Convene the board for a post-incident strategic review"
    next: "debrief"
isDebrief: false
---

The forged SAML tokens gave the attacker carte blanche across your federated cloud ecosystem. They pivoted from Azure to AWS using cross-cloud role assumptions, then into your CI/CD pipeline via a service principal with deployment permissions. Within hours they had moved laterally through three cloud providers and two on-premises datacenters.

Your SOC is tracing a web of compromised resources: fourteen S3 buckets accessed, six Azure Key Vaults enumerated, and a Kubernetes cluster where the attacker deployed a cryptominer to mask their true objective — exfiltrating your proprietary machine learning models. Insurance adjusters are already asking for a damage estimate. Your preliminary number: twenty-two million dollars in direct costs, not counting regulatory fines or reputational damage. The breach started with a single password.

---

## What Is Lateral Movement?

Lateral movement refers to the techniques attackers use to navigate through a network or cloud environment after gaining initial access. Once inside, attackers exploit trust relationships, stolen credentials, misconfigured permissions, and legitimate remote administration tools to move between systems and escalate their reach. In cloud environments, lateral movement often leverages federated identity, cross-account roles, service principals, and shared secrets. The goal is to reach high-value targets — databases, intellectual property, financial systems — while avoiding detection. Effective defense requires network segmentation, least-privilege access, continuous monitoring, and zero-trust architecture that verifies every access request regardless of origin.
