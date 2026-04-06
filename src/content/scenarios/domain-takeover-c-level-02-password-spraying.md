---
title: "The Domain Takeover — Chapter 2: Password Spraying"
chain: "domain-takeover"
chainOrder: 2
role: "c-level"
attack: "password-spraying"
choices:
  - label: "Authorize the emergency password reset across all accounts"
    next: "kerberoasting"
  - label: "Mandate immediate MFA deployment for all user accounts"
    next: "kerberoasting"
isDebrief: false
---

Your CISO calls with grim news: the security team has detected a wave of failed authentication attempts across hundreds of accounts, each failing exactly once before moving to the next. The attacker is being careful to stay just below your account lockout threshold, testing common passwords like "Spring2026!" against your entire user base.

Worse, the pattern indicates at least twelve accounts have already been compromised. The attacker has valid credentials and is now inside the network with legitimate access. Your CISO recommends an immediate organization-wide password reset, but that will disrupt business operations for thousands of employees.

---

## What Is Password Spraying?

Password spraying is a brute-force technique where an attacker tries one or two common passwords against many accounts, rather than many passwords against one account. This approach avoids triggering account lockout policies. It is devastatingly effective against organizations that allow weak passwords or do not enforce multi-factor authentication.
