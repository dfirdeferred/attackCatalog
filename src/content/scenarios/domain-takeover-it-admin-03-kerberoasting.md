---
title: "The Domain Takeover — Chapter 3: Kerberoasting"
chain: "domain-takeover"
chainOrder: 3
role: "it-admin"
attack: "kerberoasting"
choices:
  - label: "Disable RC4 encryption and enforce AES for all service accounts"
    next: "golden-ticket"
  - label: "Immediately reset passwords on all high-privilege service accounts"
    next: "golden-ticket"
isDebrief: false
---

You notice a suspicious pattern in your Kerberos logs: a single user account has requested TGS tickets for seventeen different service principal names in under two minutes. Normal users rarely interact with more than two or three services in an hour. The requests target SQL Server service accounts, Exchange, and several legacy application accounts.

You check the SPNs and realize several of these service accounts are running with Domain Admin privileges — a legacy misconfiguration no one has addressed. If the attacker cracks even one of these RC4-encrypted tickets offline, they will have the keys to the kingdom.

---

## What Is Kerberoasting?

Kerberoasting exploits the Kerberos TGS-REQ process. Any authenticated user can request a service ticket for any SPN in the domain, and that ticket is encrypted with the service account's password hash. The attacker extracts these tickets and cracks them offline using tools like Hashcat, completely bypassing account lockout policies. Service accounts with weak passwords and high privileges are the primary targets.
