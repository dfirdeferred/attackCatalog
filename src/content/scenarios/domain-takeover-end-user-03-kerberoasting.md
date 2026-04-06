---
title: "The Domain Takeover — Chapter 3: Kerberoasting"
chain: "domain-takeover"
chainOrder: 3
role: "end-user"
attack: "kerberoasting"
choices:
  - label: "You notice nothing — continue with your workday"
    next: "golden-ticket"
  - label: "You mention to a colleague that your PC was slow earlier"
    next: "golden-ticket"
isDebrief: false
---

You have no idea anything is happening. Your workday continues as normal — emails, meetings, spreadsheets. But behind the scenes, the attacker is using the credentials they stole from your compromised account to request encrypted tickets from your company's authentication system.

These tickets are for service accounts that run the applications you use every day: the email server, the file shares, the HR portal. The attacker is not accessing these services directly — they are collecting encrypted data they can crack at their leisure on their own hardware, completely invisible to your company's defenses.

---

## What Is Kerberoasting?

Kerberoasting is an attack where a hacker uses a compromised employee account to request special encrypted tickets from the company's login system. These tickets protect service accounts — the accounts that run your email, file shares, and applications. The attacker takes these encrypted tickets home and uses powerful computers to crack the passwords, gaining access to critical company systems.
