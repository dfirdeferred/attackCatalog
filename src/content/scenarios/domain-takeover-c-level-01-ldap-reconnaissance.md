---
title: "The Domain Takeover — Chapter 1: LDAP Reconnaissance"
chain: "domain-takeover"
chainOrder: 1
role: "c-level"
attack: "ldap-reconnaissance"
choices:
  - label: "Authorize funding for enhanced LDAP monitoring tools"
    next: "password-spraying"
  - label: "Escalate to the board and engage an incident response firm"
    next: "password-spraying"
isDebrief: false
---

Your CISO requests an emergency meeting on Monday morning. Over the weekend, the security operations team detected unusual LDAP query patterns originating from an internal IP address. Someone — or something — is systematically enumerating every user account, group membership, and organizational unit in your Active Directory.

The queries are technically legitimate; any authenticated domain user can perform them. But the volume and pattern suggest automated reconnaissance, not normal business activity. Your CISO estimates the attacker now has a complete map of your directory structure.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance involves querying Active Directory's Lightweight Directory Access Protocol to enumerate users, groups, service accounts, and organizational structure. Attackers use tools like BloodHound or ldapsearch to build a complete picture of the domain before launching targeted attacks. Because LDAP queries are a normal part of domain operations, this activity often flies under the radar.
