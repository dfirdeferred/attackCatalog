---
title: "The AI-Assisted Breach — Chapter 3: Lateral Movement"
chain: "ai-breach"
chainOrder: 3
role: "c-level"
attack: "lateral-movement"
choices:
  - label: "Approve emergency network segmentation measures"
    next: "malware"
  - label: "Authorize a full threat hunt across the enterprise"
    next: "malware"
isDebrief: false
---

The database breach was not the endpoint — it was a stepping stone. The SQL injection gave the attackers command execution on the database server, which was hosted in the same network segment as your internal application infrastructure. From there, they harvested service account credentials and began moving laterally through the corporate network.

Your CISO presents the forensic timeline: the attackers pivoted from the web-facing database server to the internal application cluster, then to the development environment, and finally into the corporate directory. The entire path was traversed in under 72 hours.

The board is struggling to understand how an attack on a customer-facing chatbot led to compromise of internal corporate systems. The answer is network architecture: the web application tier, the database tier, and the internal network were not adequately segmented. A firewall existed between the internet and the web tier, but the database server had direct routes to internal systems — a design shortcut taken during a rapid cloud migration three years ago that was flagged in two separate audit reports but never remediated.

---

## What Is Lateral Movement?

Lateral movement refers to the techniques an attacker uses to move through a network after gaining initial access, progressively reaching higher-value targets. Attackers leverage stolen credentials, exploitation of trust relationships between systems, and misconfigured network segmentation to hop from one system to another. In modern hybrid environments, lateral movement can traverse from cloud-hosted web applications to on-premises corporate networks when segmentation boundaries are weak. The key defense is zero-trust architecture — treating every network boundary as potentially hostile and requiring independent authentication and authorization at each boundary, rather than trusting traffic based solely on its source network.
