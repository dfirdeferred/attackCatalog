---
title: "The Silent Persistence — Chapter 1: Credential Stuffing"
chain: "silent-persistence"
chainOrder: 1
role: "it-admin"
attack: "credential-stuffing"
choices:
  - label: "Kill the six VPN sessions and disable the compromised accounts"
    next: "pass-the-hash"
  - label: "Deploy rate limiting and geo-blocking on the VPN gateway"
    next: "pass-the-hash"
isDebrief: false
---

Your VPN concentrator logs show a disturbing pattern: hundreds of authentication attempts from rotating IP addresses, each trying different username/password combinations. Unlike a brute-force attack, many of these attempts are succeeding on the first try — the attacker has valid credentials.

You cross-reference the compromised accounts with a breach database and confirm: every successful authentication used a password that matches credentials leaked in the MegaData breach six months ago. Six users reused their corporate passwords on that platform. The attacker is now inside your network with six legitimate VPN sessions.

---

## What Is Credential Stuffing?

Credential stuffing automates the testing of stolen credential pairs against authentication endpoints. Attackers purchase credential dumps from dark web marketplaces and use tools like Sentry MBA or custom scripts to test thousands of login combinations per minute. The attack exploits password reuse — when users set the same password for their corporate account and external services, a breach at the external service compromises the corporate account.
