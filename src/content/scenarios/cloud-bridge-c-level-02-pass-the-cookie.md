---
title: "The Cloud Bridge — Chapter 2: Pass-the-Cookie"
chain: "cloud-bridge"
chainOrder: 2
role: "c-level"
attack: "pass-the-cookie"
choices:
  - label: "Fund a session token lifecycle review across all SaaS platforms"
    next: "abusing-entra-id"
  - label: "Direct IT to enforce conditional access policies immediately"
    next: "abusing-entra-id"
isDebrief: false
---

The compromised VP of Finance account was secured within hours — password reset, MFA enforced — yet the attacker is still inside. Your cloud security broker flags active sessions in Microsoft 365 and Salesforce originating from an IP in Eastern Europe. The attacker exported browser session cookies before the password change and is replaying them to bypass every authentication control you just deployed.

Your CFO's inbox has been silently forwarding copies of every email to an external address for the past nine hours. Board materials, acquisition targets, and quarterly financials are now in hostile hands. The stock-moving kind of data. Your general counsel is drafting an 8-K disclosure while you calculate the market-cap impact of a premature leak.

---

## What Is a Pass-the-Cookie Attack?

A Pass-the-Cookie attack involves stealing browser session tokens — stored as cookies — and replaying them from another device to impersonate an authenticated user. Because session cookies represent a completed authentication event, they bypass passwords and even multi-factor authentication entirely. Attackers harvest these tokens through malware, phishing pages, or compromised endpoints. The attack is especially dangerous in cloud environments where a single session cookie can grant access to email, file storage, and enterprise applications simultaneously. Mitigation requires short session lifetimes, token binding, and continuous access evaluation policies that re-validate sessions when risk signals change.
