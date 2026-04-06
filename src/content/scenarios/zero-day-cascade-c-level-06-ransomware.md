---
title: "The Zero-Day Cascade — Chapter 6: Ransomware"
chain: "zero-day-cascade"
chainOrder: 6
role: "c-level"
attack: "ransomware"
choices:
  - label: "Review the full attack chain and lessons learned"
    next: "debrief"
  - label: "Assess the strategic impact and chart the recovery path"
    next: "debrief"
isDebrief: false
---

At 2:47 AM, the nightmare scenario materializes. Ransomware detonates across your network simultaneously, encrypting file servers, database systems, and backup repositories. A ransom note demands 75 Bitcoin — approximately $4.5 million at current prices — with a 72-hour deadline before the attackers threaten to publish exfiltrated data on their leak site.

The entire attack chain — from the initial Exchange zero-day to this moment — was a carefully orchestrated campaign. The weeks of lateral movement, credential theft, and directory manipulation were preparation for this final payload. The attackers ensured they had maximum leverage before pulling the trigger.

Your crisis management team is assembled. The FBI's cyber division is on the line. Outside counsel is advising on the legal implications of payment. Your board must decide: pay the ransom with no guarantee of recovery, or attempt to rebuild from scratch — a process your CTO estimates will take six to eight weeks.

---

## What Is Ransomware?

Ransomware is malicious software that encrypts a victim's files, systems, or entire networks and demands payment — typically in cryptocurrency — for the decryption key. Modern ransomware operations have evolved into "double extortion" schemes where attackers both encrypt data and exfiltrate it, threatening to publish sensitive information if the ransom is not paid. Ransomware-as-a-Service (RaaS) platforms have industrialized these attacks, with affiliate programs, customer support portals, and negotiation teams. The average ransomware payment exceeded $800,000 in 2024, with total costs including downtime, remediation, and reputational damage often reaching ten times the ransom amount.
