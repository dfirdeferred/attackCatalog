---
title: "The Zero-Day Cascade — Chapter 4: Pass-the-Ticket"
chain: "zero-day-cascade"
chainOrder: 4
role: "red-teamer"
attack: "pass-the-ticket"
choices:
  - label: "Establish DCShadow persistence before tickets expire"
    next: "dcshadow"
  - label: "Forge a Golden Ticket using the KRBTGT hash"
    next: "dcshadow"
isDebrief: false
---

Anticipating that the target will eventually force a password reset, you prepare your persistence layer. Using Mimikatz on the compromised Exchange server, you run `sekurlsa::tickets /export` and harvest 847 Kerberos tickets — TGTs and TGS tickets for every account that authenticated through the server in the past ten hours.

You sort the tickets by privilege level. The Domain Admin TGT is your priority — you inject it into a clean session with `kerberos::ptt` and verify access to SYSVOL, ADMIN$ shares, and the DC's registry. The ticket has eight hours of validity remaining.

When the enterprise password reset hits at 03:00, you are ready. Your injected tickets continue to authenticate successfully because Kerberos ticket validation does not check whether the underlying password has changed — only whether the ticket itself was properly signed by the KRBTGT key. The blue team thinks the reset contained the breach. Your access is uninterrupted.

---

## What Is a Pass-the-Ticket Attack?

Pass-the-Ticket exploits Kerberos ticket mechanics. TGTs are encrypted with the KRBTGT key and contain the user's PAC (Privilege Attribute Certificate). Once issued, a TGT is validated by decrypting it with the KRBTGT key — the DC does not check whether the user's password has changed since issuance. Attackers export tickets from LSASS memory using `sekurlsa::tickets /export` and inject them into new sessions with `kerberos::ptt`. This provides authenticated access that survives password resets. The only remediation is KRBTGT password rotation (done twice to invalidate all outstanding tickets) or waiting for natural ticket expiration.
