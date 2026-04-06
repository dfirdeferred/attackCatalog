---
title: "The Physical Vector — Chapter 5: Lateral Movement"
chain: "physical-vector"
chainOrder: 5
role: "it-admin"
attack: "lateral-movement"
choices:
  - label: "Conduct a full forensic timeline and containment review"
    next: "debrief"
  - label: "Map every system the attacker touched and begin remediation"
    next: "debrief"
isDebrief: false
---

The Golden Ticket has turned your network into an open floor plan. Over four days, the attacker systematically accessed every critical system. Your forensic timeline reconstructs the movement: RDP to the ERP database server (exfiltrated 4.2 million customer records), PsExec to the R&D file server (copied 340 GB of product designs), WMI to the HR application server (accessed employee PII), and PowerShell Remoting to the legal department's document management system.

The movement pattern was methodical. The attacker used the Golden Ticket to authenticate as different users on each hop — the ERP admin for database access, an R&D engineer for file server access — making the traffic blend with normal authentication patterns. Your network segmentation firewalls all permit Kerberos-authenticated traffic, so the micro-segmentation you implemented last year provided no barrier.

You count the compromised systems: 47 servers, 12 network segments, and data from six business-critical applications. Every one of them trusted Active Directory for authentication. The Golden Ticket was the universal bypass.

---

## What Is Lateral Movement?

Lateral movement encompasses the techniques an attacker uses to traverse a network after establishing an initial foothold. Key Windows-based methods include RDP (port 3389), PsExec (SMB-based remote execution), WMI (Windows Management Instrumentation remote commands), PowerShell Remoting (WinRM on ports 5985/5986), and SSH on modern Windows. Each method leaves distinct forensic artifacts: RDP creates Event ID 4624 Type 10 logons, PsExec creates a temporary service, WMI generates Event ID 4688 process creation entries. Defense-in-depth requires network segmentation that does not solely rely on AD authentication, endpoint detection for lateral tool usage, and monitoring for anomalous access patterns across authentication logs.
