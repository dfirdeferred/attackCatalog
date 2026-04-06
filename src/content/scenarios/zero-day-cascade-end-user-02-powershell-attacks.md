---
title: "The Zero-Day Cascade — Chapter 2: PowerShell Attacks"
chain: "zero-day-cascade"
chainOrder: 2
role: "end-user"
attack: "powershell-attacks"
choices:
  - label: "Report the strange window to the IT security hotline"
    next: "plaintext-password-extraction"
  - label: "Screenshot the activity and submit a help desk ticket"
    next: "plaintext-password-extraction"
isDebrief: false
---

A few days after the email incident, you notice something odd on your workstation. A blue command window flashes on your screen for a split second while you are reading a document — it appears and vanishes so fast you almost miss it. You are not running any programs that should open a command prompt.

A colleague two desks over mentions the same thing happened to her yesterday. She assumed it was a Windows update. Another team member says his laptop fan has been running loudly since last week, even when he is just browsing the web.

You remember the IT security awareness training from last quarter: "If you see something, say something." But the help desk has been overwhelmed since the email outage, and the average ticket response time has ballooned to 48 hours. You wonder if what you saw was really worth reporting or if you are being paranoid.

---

## What Are PowerShell Attacks?

PowerShell is a tool built into Windows that IT administrators use to manage computers and automate tasks. Unfortunately, attackers can also use it to run malicious commands on your computer. Because PowerShell is a normal part of Windows, your antivirus may not flag it as suspicious. When you see a command window flash briefly on your screen, it could be a normal system process — or it could be an attacker running hidden commands. PowerShell attacks are a "living off the land" technique, meaning attackers use tools already on your computer rather than installing new malware.
