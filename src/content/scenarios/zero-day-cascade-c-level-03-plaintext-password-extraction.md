---
title: "The Zero-Day Cascade — Chapter 3: Plaintext Password Extraction"
chain: "zero-day-cascade"
chainOrder: 3
role: "c-level"
attack: "plaintext-password-extraction"
choices:
  - label: "Order an enterprise-wide password reset effective immediately"
    next: "pass-the-ticket"
  - label: "Accelerate the rollout of passwordless authentication"
    next: "pass-the-ticket"
isDebrief: false
---

The forensic team has uncovered something alarming. The attackers used their PowerShell access to extract plaintext passwords directly from server memory. Senior executives, finance directors, and the IT operations team — credentials for all of them were harvested in a single sweep. The CISO estimates at least 340 accounts are compromised.

Your head of HR points out that an enterprise-wide forced password reset will disrupt 4,000 employees across three time zones during a critical quarter-end close. Your CFO is calculating the productivity cost. But leaving compromised credentials active is an existential risk — the attackers could use any one of those 340 accounts to re-enter the network even after the initial breach is contained.

Regulators in the EU are now asking whether personal data of employees or customers was exposed through these compromised accounts.

---

## What Is Plaintext Password Extraction?

Plaintext password extraction is a post-exploitation technique where attackers dump cleartext credentials from a system's memory. Tools like Mimikatz exploit the way Windows stores authentication data in the LSASS (Local Security Authority Subsystem Service) process. When users log in, Windows caches their credentials in memory for single sign-on convenience. Attackers with administrative access can read these cached credentials directly, obtaining usable passwords without needing to crack any hashes. This technique is devastating because a single compromised server can yield credentials for every user who has logged into it.
