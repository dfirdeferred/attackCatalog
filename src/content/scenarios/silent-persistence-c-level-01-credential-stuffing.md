---
title: "The Silent Persistence — Chapter 1: Credential Stuffing"
chain: "silent-persistence"
chainOrder: 1
role: "c-level"
attack: "credential-stuffing"
choices:
  - label: "Mandate immediate deployment of MFA across all remote access points"
    next: "pass-the-hash"
  - label: "Contract a dark web monitoring service to identify exposed credentials"
    next: "pass-the-hash"
isDebrief: false
---

Your CISO brings a troubling report to your weekly security briefing. Over the past 48 hours, automated login attempts have been detected against your organization's VPN gateway and Outlook Web Access portal. The credentials being used are not random — they are real username/password combinations sourced from data breaches at other companies.

Several employees reused their corporate passwords on external services that were subsequently breached. The attacker has purchased these credential dumps on the dark web and is now systematically testing them against your infrastructure. Six accounts have already been compromised.

---

## What Is Credential Stuffing?

Credential stuffing is an automated attack that uses lists of stolen username/password pairs from previous data breaches to gain unauthorized access. Because people frequently reuse passwords across multiple services, credentials stolen from a consumer website can unlock corporate accounts. Unlike password spraying, credential stuffing uses known-valid credentials, making it far more efficient.
