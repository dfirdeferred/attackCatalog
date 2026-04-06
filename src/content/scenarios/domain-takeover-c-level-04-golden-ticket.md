---
title: "The Domain Takeover — Chapter 4: The Golden Ticket"
chain: "domain-takeover"
chainOrder: 4
role: "c-level"
attack: "golden-ticket"
choices:
  - label: "Authorize the KRBTGT password reset despite business disruption"
    next: "dcsync"
  - label: "Bring in external forensic investigators before taking action"
    next: "dcsync"
isDebrief: false
---

The situation has escalated dramatically. Your CISO explains that the attacker has forged what is known as a "Golden Ticket" — essentially a master key to your entire Active Directory domain. With this forged credential, the attacker can impersonate anyone in the organization, including the CEO, the CFO, or any Domain Administrator.

The security team warns that even resetting user passwords will not invalidate this ticket. The only remedy is to reset the KRBTGT account password — twice — which will temporarily disrupt Kerberos authentication across the entire organization. Every employee, every service, every application will be affected.

---

## What Is a Golden Ticket Attack?

A Golden Ticket attack occurs when an attacker obtains the KRBTGT account's password hash and uses it to forge Kerberos Ticket Granting Tickets. These forged tickets grant unlimited access to any resource in the domain and can be set to remain valid for years. The KRBTGT account is the cornerstone of Kerberos authentication, making this one of the most devastating Active Directory attacks.
