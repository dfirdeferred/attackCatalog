---
title: "The Service Account Heist — Chapter 2: AS-REP Roasting"
chain: "service-account-heist"
chainOrder: 2
role: "c-level"
attack: "as-rep-roasting"
choices:
  - label: "Fund an immediate Kerberos pre-authentication compliance project"
    next: "gmsa-exploitation"
  - label: "Direct IT to enforce pre-authentication on all accounts within 48 hours"
    next: "gmsa-exploitation"
isDebrief: false
---

The penetration test results get worse. Using the service account inventory from LDAP, the testers identified twelve accounts with Kerberos pre-authentication disabled — a legacy configuration that was never cleaned up after a migration five years ago. They requested encrypted authentication data for these accounts from the domain controller, no credentials required, and cracked eight of the twelve passwords offline within hours.

Your CISO explains the business impact: these are not ordinary user accounts. They are service accounts running your ERP system, your backup infrastructure, and your financial reporting platform. An attacker with these credentials could access every transaction your company processes. The remediation seems simple — enable a checkbox on twelve accounts — but your IT team warns that changing authentication settings on production service accounts without testing could cause application outages. You need to balance security urgency against operational stability.

---

## What Is AS-REP Roasting?

AS-REP Roasting exploits Active Directory accounts configured without Kerberos pre-authentication. Normally, a user must prove their identity before receiving an encrypted Kerberos ticket. When pre-authentication is disabled, anyone can request an encrypted ticket for that account, take it offline, and attempt to crack the password using brute-force or dictionary attacks without any network interaction or failed-login alerts. The attack requires no credentials to execute — only knowledge of the account name. Service accounts are frequent targets because they often have weak passwords and elevated privileges. Mitigation requires ensuring all accounts have pre-authentication enabled and that service account passwords are long, complex, and regularly rotated.
