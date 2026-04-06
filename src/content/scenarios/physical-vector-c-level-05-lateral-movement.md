---
title: "The Physical Vector — Chapter 5: Lateral Movement"
chain: "physical-vector"
chainOrder: 5
role: "c-level"
attack: "lateral-movement"
choices:
  - label: "Review the full attack timeline and authorize the recovery plan"
    next: "debrief"
  - label: "Assess the total business impact and inform stakeholders"
    next: "debrief"
isDebrief: false
---

Armed with the Golden Ticket, the attacker has moved freely across your entire network for the past 96 hours. The forensic timeline reveals the scope: they accessed the ERP system and downloaded customer records, pivoted to the R&D file server and exfiltrated product designs, entered the HR system and copied employee Social Security numbers, and accessed the legal department's privileged attorney-client communications.

The attacker moved laterally using a mix of techniques — Remote Desktop Protocol, PsExec, Windows Management Instrumentation, and PowerShell Remoting — all authenticated with forged Kerberos tickets that appeared completely legitimate. Your network segmentation was designed to separate departments, but every segment trusted Active Directory for authentication. The Golden Ticket was the skeleton key that opened every door.

Notification obligations now span three federal regulations, four state breach notification laws, and GDPR for your European customers. Outside counsel estimates notification and credit monitoring costs alone at $8.5 million.

---

## What Is Lateral Movement?

Lateral movement refers to the techniques attackers use to progressively move through a network after initial access, searching for key data and assets. Common methods include Remote Desktop Protocol (RDP), PsExec for remote command execution, Windows Management Instrumentation (WMI), SSH, and pass-the-hash or pass-the-ticket for authentication. Effective lateral movement depends on stolen credentials and inadequate network segmentation. The goal is to escalate from an initial foothold to access high-value targets — financial systems, intellectual property, customer databases — while remaining undetected. Network segmentation, least-privilege access, and monitoring for anomalous authentication patterns are the primary defenses.
