---
title: "The Domain Takeover — Chapter 4: The Golden Ticket"
chain: "domain-takeover"
chainOrder: 4
role: "red-teamer"
attack: "golden-ticket"
choices:
  - label: "Perform a DCSync to extract all domain credentials"
    next: "dcsync"
  - label: "Establish persistence before the defenders detect the forged ticket"
    next: "dcsync"
isDebrief: false
---

With the KRBTGT hash extracted from the cracked service account's access to the domain controller, you forge a Golden Ticket using Mimikatz. You set the ticket lifetime to 10 years and assign the forged PAC with Domain Admin, Enterprise Admin, and Schema Admin group SIDs.

You inject the ticket into your current session and verify access by listing the C$ share on every domain controller. Full access confirmed. You are now operating as a phantom Domain Admin — an account that does not appear in any group membership query, yet has unrestricted access to the entire forest.

---

## What Is a Golden Ticket Attack?

A Golden Ticket is a forged Kerberos TGT created using the KRBTGT account's password hash. The forged ticket can impersonate any user with any group membership and any lifetime. Because the KDC trusts tickets encrypted with the KRBTGT hash implicitly, the forged ticket bypasses all normal authentication controls. Only resetting the KRBTGT password twice — to invalidate both current and previous hashes — can neutralize active Golden Tickets.
