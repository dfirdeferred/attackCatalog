---
title: "The Domain Takeover — Chapter 3: Kerberoasting"
chain: "domain-takeover"
chainOrder: 3
role: "red-teamer"
attack: "kerberoasting"
choices:
  - label: "Use the cracked service account to forge a Golden Ticket"
    next: "golden-ticket"
  - label: "Access the SQL cluster directly with the service account credentials"
    next: "golden-ticket"
isDebrief: false
---

With valid domain credentials from the password spray, you launch a targeted Kerberoasting attack. You use Rubeus in memory to request TGS tickets for all accounts with registered SPNs, filtering for high-value targets: accounts in Domain Admins, accounts with unconstrained delegation, and accounts with `adminCount=1`.

You extract seventeen tickets, fourteen encrypted with RC4-HMAC. You transfer the hashes to your cracking rig running Hashcat with a custom rule set. Within three hours, you crack the password for `svc_sqlprod` — a service account with Domain Admin privileges running the production SQL cluster. The password is "SqlServer2019!" and has not been changed in four years.

---

## What Is Kerberoasting?

Kerberoasting targets service accounts by requesting Kerberos TGS tickets encrypted with the service account's NTLM hash. Any authenticated domain user can request these tickets. The attacker exports the tickets and cracks them offline, bypassing detection and lockout controls. RC4-encrypted tickets are significantly faster to crack than AES, making legacy configurations especially vulnerable.
