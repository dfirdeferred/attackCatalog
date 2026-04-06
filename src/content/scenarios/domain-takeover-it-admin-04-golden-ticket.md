---
title: "The Domain Takeover — Chapter 4: The Golden Ticket"
chain: "domain-takeover"
chainOrder: 4
role: "it-admin"
attack: "golden-ticket"
choices:
  - label: "Investigate the forged TGT in your SIEM"
    next: "dcsync"
  - label: "Reset the KRBTGT password immediately"
    next: "dcsync"
---

Your SIEM lights up with an alert you have never seen before. A Ticket Granting Ticket has been issued with a lifetime of 10 years — far beyond your domain's default policy of 10 hours. The ticket was issued for an account that does not appear in your recent authentication logs.

You pull up the Event ID 4769 details and notice the ticket encryption type is RC4-HMAC, even though your domain policy enforces AES256. Someone has forged a Golden Ticket.

The clock is ticking. Every second this ticket remains valid, the attacker has unrestricted access to your entire domain.

---

## What Is a Golden Ticket Attack?

A Golden Ticket attack exploits the Kerberos authentication protocol by forging a Ticket Granting Ticket using the KRBTGT account's password hash. With this forged ticket, an attacker can impersonate any user — including Domain Admins — and access any resource in the domain.
