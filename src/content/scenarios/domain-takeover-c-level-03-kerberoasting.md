---
title: "The Domain Takeover — Chapter 3: Kerberoasting"
chain: "domain-takeover"
chainOrder: 3
role: "c-level"
attack: "kerberoasting"
choices:
  - label: "Order an immediate audit and rotation of all service account passwords"
    next: "golden-ticket"
  - label: "Approve budget for a privileged access management solution"
    next: "golden-ticket"
isDebrief: false
---

Your CISO's update grows more concerning. The attacker has moved beyond stolen passwords — they are now targeting service accounts that run critical business applications. These service accounts often have elevated privileges and, due to operational requirements, their passwords have not been rotated in years.

The security team explains that the attacker is exploiting a fundamental feature of Kerberos authentication to extract encrypted service tickets offline. If they crack even one service account password, they could gain access to database servers, file shares, and application infrastructure.

---

## What Is Kerberoasting?

Kerberoasting is an attack against the Kerberos authentication protocol where an attacker requests service tickets for accounts with Service Principal Names and then attempts to crack the ticket encryption offline. Because service accounts often have weak or stale passwords and elevated privileges, a single cracked ticket can give an attacker significant access to the domain.
