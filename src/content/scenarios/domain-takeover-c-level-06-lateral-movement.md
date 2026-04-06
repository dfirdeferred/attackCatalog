---
title: "The Domain Takeover — Chapter 6: Lateral Movement"
chain: "domain-takeover"
chainOrder: 6
role: "c-level"
attack: "lateral-movement"
choices:
  - label: "Authorize a full network segmentation and containment operation"
    next: "ransomware"
  - label: "Prioritize protecting customer data systems and backup infrastructure"
    next: "ransomware"
isDebrief: false
---

The incident response team reports that the attacker is now moving freely across your network. They have been detected on file servers, database servers, and backup systems. Every department is potentially affected — finance, legal, R&D, human resources. The attacker appears to be staging data for exfiltration.

Your legal counsel advises that if customer data has been accessed, you may have regulatory notification obligations within 72 hours. The board is demanding a briefing, and the press has started asking questions after a tip from an anonymous source. The situation is rapidly spiraling beyond a purely technical incident.

---

## What Is Lateral Movement?

Lateral movement is the process by which an attacker moves from one compromised system to another within a network, expanding their access and reach. Using stolen credentials, pass-the-hash techniques, or remote execution tools, attackers pivot through systems to reach high-value targets such as domain controllers, database servers, and backup infrastructure. Detecting lateral movement requires correlating authentication events across the entire environment.
