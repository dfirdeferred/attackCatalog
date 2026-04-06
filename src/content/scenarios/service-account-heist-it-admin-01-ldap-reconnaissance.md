---
title: "The Service Account Heist — Chapter 1: LDAP Reconnaissance"
chain: "service-account-heist"
chainOrder: 1
role: "it-admin"
attack: "ldap-reconnaissance"
choices:
  - label: "Review LDAP query logs for anomalous enumeration patterns"
    next: "as-rep-roasting"
  - label: "Restrict anonymous LDAP binds and audit directory permissions"
    next: "as-rep-roasting"
isDebrief: false
---

Your network monitoring system flags a subtle anomaly: a single workstation on the engineering VLAN has issued over twelve thousand LDAP queries in the past thirty minutes. The queries are methodical — first enumerating all user objects, then all group memberships, then all computer objects, and now focusing specifically on accounts with servicePrincipalName attributes set.

You pull up the LDAP query details and recognize the pattern immediately. Someone is running an enumeration tool — likely ldapsearch or SharpHound — mapping your entire Active Directory structure. The queries are all authenticated, using a standard domain user account belonging to a recently onboarded contractor. Every query is technically legitimate LDAP traffic, indistinguishable from normal directory lookups except for the volume and systematic pattern. Your directory is answering every question faithfully: user accounts, service accounts, group nesting, OU structure, account creation dates, last password changes, and UAC flags that reveal which accounts have pre-authentication disabled.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance is the systematic enumeration of Active Directory objects through Lightweight Directory Access Protocol queries. Any authenticated domain user can, by default, read most directory attributes — including user accounts, group memberships, service principal names, computer objects, and organizational structure. Tools like ldapsearch, ADExplorer, BloodHound, and PowerView automate this enumeration to build a comprehensive map of the domain. The information gathered identifies high-value targets: service accounts with SPNs for Kerberoasting, accounts without pre-authentication for AS-REP Roasting, and group membership chains for privilege escalation. Detection requires monitoring LDAP query volume and patterns, implementing tiered directory permissions, and restricting access to sensitive attributes like msDS-GroupMSAMembership and adminCount.
