---
title: "The Zero-Day Cascade — Chapter 4: Pass-the-Ticket"
chain: "zero-day-cascade"
chainOrder: 4
role: "end-user"
attack: "pass-the-ticket"
choices:
  - label: "Report the unauthorized access to IT immediately"
    next: "dcshadow"
  - label: "Document what files were accessed and alert your manager"
    next: "dcshadow"
isDebrief: false
---

You changed your password last night as instructed. This morning, everything seems normal — until a colleague from the legal department calls. She received an automated alert that someone accessed a confidential M&A document on the shared drive using your credentials, at 4:22 AM, hours after you changed your password.

You were asleep at 4:22 AM. You did not access any shared drives. But the access logs clearly show your username, your department, your permissions. IT confirms the access came from inside the corporate network, not from a remote VPN connection.

How is this possible? You changed your password. You followed every instruction. Yet someone is still impersonating you inside the network. The legal team is treating the document access as a potential data breach, and your name is on the audit trail. You feel simultaneously violated and falsely implicated.

---

## What Is a Pass-the-Ticket Attack?

When you log into your work computer, Windows gives you a digital "ticket" that proves your identity to other systems on the network — similar to a wristband at an event that lets you access different areas. In a Pass-the-Ticket attack, hackers steal a copy of your ticket and use it to pretend to be you. Because the ticket is separate from your password, changing your password does not cancel the ticket. The attacker can continue accessing files, emails, and systems as you until the ticket expires or IT takes special steps to invalidate it.
