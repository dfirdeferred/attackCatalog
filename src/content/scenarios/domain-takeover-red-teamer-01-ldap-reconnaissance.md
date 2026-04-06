---
title: "The Domain Takeover — Chapter 1: LDAP Reconnaissance"
chain: "domain-takeover"
chainOrder: 1
role: "red-teamer"
attack: "ldap-reconnaissance"
choices:
  - label: "Target the weak SPN for a Kerberoasting attack"
    next: "password-spraying"
  - label: "Enumerate further to find password policy weaknesses"
    next: "password-spraying"
isDebrief: false
---

You have gained initial access to the corporate network through a phishing campaign. Your implant is running under a standard domain user account on a workstation in the marketing department. Before escalating privileges, you need to understand the terrain.

You deploy SharpHound in memory, careful to use the `--CollectionMethod Session,LoggedOn` flags to minimize LDAP query volume. Within minutes, BloodHound reveals a service account with a weak SPN configuration and a short path to Domain Admin through a nested group membership chain.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance is the first phase of an Active Directory attack, where the operator queries LDAP to enumerate users, groups, computers, trusts, and service principal names. Tools such as BloodHound, ADExplorer, and ldapdomaindump automate this process. The resulting data reveals attack paths — chains of misconfigurations and group memberships that connect a low-privilege foothold to Domain Admin.
