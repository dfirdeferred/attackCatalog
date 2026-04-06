---
title: "The Physical Vector — Chapter 4: Golden Ticket"
chain: "physical-vector"
chainOrder: 4
role: "c-level"
attack: "golden-ticket"
choices:
  - label: "Approve a complete Active Directory rebuild"
    next: "lateral-movement"
  - label: "Bring in a third-party team for KRBTGT rotation and audit"
    next: "lateral-movement"
isDebrief: false
---

The attacker has forged a Golden Ticket — a master key that grants unlimited access to every resource in your Active Directory domain for as long as the KRBTGT account hash remains unchanged. Your CISO explains this in terms the board can understand: it is as if someone cloned the master key to every building, safe, and locked cabinet in the company, and the only way to invalidate that clone is to replace every lock.

The remediation is daunting. Rotating the KRBTGT hash requires careful sequencing to avoid a domain-wide authentication outage. Your IT team estimates a 72-hour window of elevated risk during the rotation process. Meanwhile, the attacker retains godlike access to every system.

Your insurance carrier calls with additional bad news: the policy's "failure to patch" exclusion may apply, given that the Zerologon vulnerability had a patch available for months. The legal team is preparing a coverage dispute.

---

## What Is a Golden Ticket Attack?

A Golden Ticket is a forged Kerberos Ticket Granting Ticket (TGT) created using the KRBTGT account's password hash — the most sensitive secret in any Active Directory domain. With this hash, an attacker can create TGTs for any user, with any group memberships, with any lifetime — effectively granting themselves unlimited domain access. A Golden Ticket is valid until the KRBTGT password is changed twice (to invalidate the current and previous hash). Because the forged ticket is cryptographically valid, it is accepted by all domain controllers without question. This attack represents the highest level of Active Directory compromise.
