---
title: "The Silent Persistence — Chapter 1: Credential Stuffing"
chain: "silent-persistence"
chainOrder: 1
role: "red-teamer"
attack: "credential-stuffing"
choices:
  - label: "Harvest NTLM hashes from memory on the compromised sessions"
    next: "pass-the-hash"
  - label: "Enumerate the compromised users' access and group memberships"
    next: "pass-the-hash"
isDebrief: false
---

You have purchased a fresh credential dump from a recent breach — 500 million username/password pairs for $200 in cryptocurrency. You filter the dump for email addresses matching your target's domain: `@targetcorp.com`. You find 847 matches.

You configure your stuffing tool to test each credential pair against the target's OWA portal and VPN gateway, rotating through a pool of residential proxies to avoid IP-based blocking. Your throttling keeps attempts under detection thresholds. Within two hours, six credentials validate successfully. You now have legitimate remote access to the corporate network.

---

## What Is Credential Stuffing?

Credential stuffing weaponizes password reuse by testing breach-sourced credentials against target authentication endpoints. Operators filter massive breach databases for target-domain email addresses, then automate login attempts through proxy networks to evade rate limiting and IP blocking. The success rate is typically 0.5-2%, but even a small number of valid credentials provides legitimate access that bypasses network perimeter defenses.
