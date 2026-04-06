---
title: "The Zero-Day Cascade — Chapter 4: Pass-the-Ticket"
chain: "zero-day-cascade"
chainOrder: 4
role: "c-level"
attack: "pass-the-ticket"
choices:
  - label: "Engage a Kerberos security specialist for emergency remediation"
    next: "dcshadow"
  - label: "Authorize a full Kerberos infrastructure rebuild"
    next: "dcshadow"
isDebrief: false
---

Even after the password reset, the attacks continue. The incident response team explains why: the attackers stole Kerberos authentication tickets before the reset, and those tickets remain valid. They are using a technique called Pass-the-Ticket to impersonate legitimate users — including a domain administrator — without needing any passwords at all.

Your CTO likens it to someone making copies of every office key in the building. Changing the locks does not help if the copies still work. The board wants to know why a password reset — which cost the company an estimated $2.1 million in lost productivity — did not stop the bleeding.

The attacker's persistence is shaking confidence at every level. Your largest enterprise client has requested a formal security assurance letter, and the procurement team reports two pending deals are now "on hold" pending resolution.

---

## What Is a Pass-the-Ticket Attack?

Pass-the-Ticket is a credential theft technique that targets the Kerberos authentication protocol used in Windows Active Directory environments. Rather than stealing passwords, attackers steal Kerberos tickets — encrypted tokens that prove a user's identity to network services. By injecting a stolen ticket into their own session, an attacker can impersonate the ticket's owner and access any resource that user is authorized to reach. Because no password is involved, standard password resets do not invalidate existing tickets.
