---
title: "The Service Account Heist — Chapter 1: LDAP Reconnaissance"
chain: "service-account-heist"
chainOrder: 1
role: "c-level"
attack: "ldap-reconnaissance"
choices:
  - label: "Request a full audit of LDAP exposure and service account inventory"
    next: "as-rep-roasting"
  - label: "Authorize a review of Active Directory access controls and query logging"
    next: "as-rep-roasting"
isDebrief: false
---

Your quarterly security review surfaces an uncomfortable finding. The penetration testing firm you hired discovered that your Active Directory environment responds to anonymous LDAP queries from any network-connected device. Within minutes, they mapped every user account, group membership, organizational unit, and service account in the domain — including forty-seven service accounts with descriptions like "SQL Production" and "Backup Admin" that reveal their purpose and privilege level.

Your CISO explains that LDAP is the phonebook of your corporate network, and you have been publishing it to anyone who asks. The service accounts are particularly concerning: many have passwords that have not been rotated in over three years, and their naming conventions broadcast exactly what systems they control. You authorized the pentest to validate your security posture before the annual board presentation. The findings suggest you need to delay that presentation.

---

## What Is LDAP Reconnaissance?

LDAP (Lightweight Directory Access Protocol) reconnaissance involves querying Active Directory to enumerate users, groups, computers, service accounts, and organizational structures. Attackers use LDAP queries to map an organization's internal landscape without triggering traditional security alerts, since LDAP queries are a normal part of network operations. The information gathered — especially service account names, descriptions, group memberships, and account attributes — helps attackers identify high-value targets for subsequent attack stages. Mitigations include restricting anonymous LDAP binds, implementing LDAP query logging and anomaly detection, minimizing information in account descriptions, and segmenting network access to domain controllers.
