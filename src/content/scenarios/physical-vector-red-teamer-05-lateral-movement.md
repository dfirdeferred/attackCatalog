---
title: "The Physical Vector — Chapter 5: Lateral Movement"
chain: "physical-vector"
chainOrder: 5
role: "red-teamer"
attack: "lateral-movement"
choices:
  - label: "Document all access paths and exfiltration routes"
    next: "debrief"
  - label: "Map the full attack graph for the engagement report"
    next: "debrief"
isDebrief: false
---

With Golden Tickets forged for six different identities, you begin systematic lateral movement across the target environment. Your methodology: authenticate as the role-appropriate user for each target to minimize anomaly detection.

Day 1: Using the ERP admin ticket, you access the Oracle ERP database via ODAT and dump the customer table — 4.2 million records with PII. Day 2: The R&D engineer ticket grants access to the engineering file server via SMB. You mirror the `product-roadmap` and `patent-pending` directories — 340 GB of intellectual property. Day 3: The HR admin ticket unlocks the PeopleSoft instance. Employee SSNs, salary data, performance reviews — all accessible. Day 4: The legal department's DMS accepts the Golden Ticket authenticated as the legal secretary. You access privileged attorney-client communications.

Your lateral movement used RDP, PsExec, WMI, and PSRemoting across 47 servers in 12 network segments. The target's micro-segmentation allowed all Kerberos-authenticated traffic — the Golden Ticket was a universal bypass. Total exfiltration: 3.8 terabytes staged to a cloud storage endpoint through the company's own internet proxy.

---

## What Is Lateral Movement?

Lateral movement in offensive operations leverages authenticated access to traverse network segments and access target systems. Key techniques: RDP (interactive desktop, high visibility), PsExec (SMB-based service creation, moderate artifacts), WMI (DCOM-based remote execution, lighter footprint), PSRemoting (WinRM, encrypted channel, low artifact), DCOM (distributed COM object activation), and SSH (modern Windows). Each method has a distinct detection signature — RDP creates Type 10 logons, PsExec creates a PSEXESVC service, WMI generates WmiPrvSe child processes. Operational security requires matching the authentication method and user identity to the target's normal access patterns. Network segmentation is only effective when it includes authentication-layer controls independent of Active Directory.
