---
title: "The Zero-Day Cascade — Chapter 4: Pass-the-Ticket"
chain: "zero-day-cascade"
chainOrder: 4
role: "it-admin"
attack: "pass-the-ticket"
choices:
  - label: "Purge all Kerberos tickets and force re-authentication"
    next: "dcshadow"
  - label: "Rotate the KRBTGT account password twice in succession"
    next: "dcshadow"
isDebrief: false
---

You executed the enterprise-wide password reset at 03:00 UTC during a maintenance window. By 03:47, your SIEM fires again. The same compromised service account is authenticating to file servers — but the password was changed 47 minutes ago. The attacker is not using passwords at all.

Digging into the Kerberos event logs, you find Event ID 4769 entries showing Ticket Granting Service tickets issued before the password reset. The tickets have a 10-hour default lifetime, and the attacker exported them using Mimikatz's `sekurlsa::tickets /export` command prior to the reset. They are injecting these stolen tickets into new sessions with `kerberos::ptt`, bypassing password-based authentication entirely.

The realization hits: you need to invalidate every Kerberos ticket in the domain, which means rotating the KRBTGT account — a change that, if done incorrectly, could bring down authentication for the entire enterprise.

---

## What Is a Pass-the-Ticket Attack?

Pass-the-Ticket (PtT) is a Kerberos credential theft technique where an attacker steals Ticket Granting Tickets (TGTs) or Ticket Granting Service (TGS) tickets from a compromised system and injects them into another session to impersonate the ticket's owner. Unlike Pass-the-Hash, PtT does not require the user's password or hash — just the exported ticket blob. Because Kerberos tickets remain valid until they expire, a password reset does not immediately revoke access. The only way to invalidate all existing TGTs is to reset the KRBTGT account password twice, which forces all tickets to be reissued.
