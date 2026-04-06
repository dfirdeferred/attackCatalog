---
title: "The Domain Takeover — Chapter 2: Password Spraying"
chain: "domain-takeover"
chainOrder: 2
role: "it-admin"
attack: "password-spraying"
choices:
  - label: "Force-reset passwords on all twelve compromised accounts immediately"
    next: "kerberoasting"
  - label: "Trace the attacker's lateral movement from the compromised accounts"
    next: "kerberoasting"
isDebrief: false
---

Your monitoring dashboard lights up with Event ID 4625 entries — failed logon attempts. But the pattern is unusual: each account sees exactly one failure before the attacker moves on. They are spraying "Welcome2026!" and "Company123!" across your entire user directory, staying one attempt below your five-try lockout threshold.

You cross-reference the source IPs and find they rotate through a pool of compromised workstations. Twelve accounts have already authenticated successfully with the sprayed passwords. The attacker now has a dozen valid credential sets to choose from.

---

## What Is Password Spraying?

Password spraying is an authentication attack that tests a small set of commonly used passwords against a large number of accounts simultaneously. Unlike traditional brute-force attacks, it avoids lockout thresholds by limiting attempts per account. Organizations with weak password policies or no MFA are particularly vulnerable, as even one successful match gives the attacker a legitimate foothold.
