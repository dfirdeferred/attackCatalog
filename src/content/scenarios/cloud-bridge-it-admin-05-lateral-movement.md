---
title: "The Cloud Bridge — Chapter 5: Lateral Movement"
chain: "cloud-bridge"
chainOrder: 5
role: "it-admin"
attack: "lateral-movement"
choices:
  - label: "Document the full attack path and proceed to the debrief"
    next: "debrief"
  - label: "Isolate all affected systems and begin the post-incident review"
    next: "debrief"
isDebrief: false
---

The forged SAML assertions unlocked the entire federated landscape. Your investigation reveals the attacker's path: from Azure AD to AWS via SAML-based role assumption, then into your CI/CD pipeline using a service principal that had deployment permissions to production Kubernetes clusters. They pivoted through three cloud providers in under four hours.

Your CloudTrail logs show fourteen S3 buckets accessed with data exfiltration totaling two hundred gigabytes. Azure Key Vault audit logs reveal enumeration of every secret and certificate. The attacker deployed a cryptocurrency miner on the Kubernetes cluster — a noisy distraction while they quietly exfiltrated your proprietary datasets through an S3 replication rule they configured to an attacker-controlled bucket. You are now coordinating incident response across AWS, Azure, GCP, and two on-premises datacenters simultaneously.

---

## What Is Lateral Movement?

Lateral movement describes the techniques attackers use after initial access to traverse through networks and cloud environments toward high-value targets. In cloud environments, this includes abusing cross-account role assumptions, exploiting service principal credentials, leveraging federated trust relationships, pivoting through CI/CD pipelines, and exploiting misconfigured network peering. Attackers use legitimate tools and protocols — RDP, SSH, WinRM, PowerShell Remoting, cloud APIs — to blend with normal traffic. Detection requires monitoring for anomalous access patterns across all environments, implementing micro-segmentation, enforcing least-privilege access on all identities and service accounts, deploying cloud workload protection platforms, and maintaining comprehensive logging across every cloud provider and on-premises system in the environment.
