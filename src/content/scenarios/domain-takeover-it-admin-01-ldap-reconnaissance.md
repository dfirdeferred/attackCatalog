---
title: "The Domain Takeover — Chapter 1: LDAP Reconnaissance"
chain: "domain-takeover"
chainOrder: 1
role: "it-admin"
attack: "ldap-reconnaissance"
choices:
  - label: "Isolate the compromised workstation and revoke the user's credentials"
    next: "password-spraying"
  - label: "Monitor the queries silently to gather more intelligence on the attacker"
    next: "password-spraying"
isDebrief: false
---

Your SIEM flags an anomaly: a single workstation has issued over 15,000 LDAP queries in the past hour. The queries are pulling every user object, group membership, service principal name, and trust relationship in the domain. The source account belongs to a junior marketing employee who should have no reason to run such queries.

You pull the workstation's process logs and find an instance of `SharpHound.exe` running under the user's context. BloodHound collection is underway, and the attacker likely already has a full graph of your domain's attack paths.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance is the process of querying Active Directory via LDAP to enumerate objects such as users, computers, groups, and trust relationships. Tools like BloodHound automate this collection, generating attack path graphs that reveal the shortest route to Domain Admin. Because standard domain users have read access to most AD objects by default, this reconnaissance is difficult to prevent without restricting LDAP permissions.
