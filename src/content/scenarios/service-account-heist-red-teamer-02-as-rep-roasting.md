---
title: "The Service Account Heist — Chapter 2: AS-REP Roasting"
chain: "service-account-heist"
chainOrder: 2
role: "red-teamer"
attack: "as-rep-roasting"
choices:
  - label: "Use the cracked service account to enumerate gMSA permissions"
    next: "gmsa-exploitation"
  - label: "Check if the compromised account can retrieve gMSA passwords"
    next: "gmsa-exploitation"
isDebrief: false
---

You target the twelve accounts with DONT_REQUIRE_PREAUTH using Rubeus. A single command sends AS-REQ packets for each account and captures the AS-REP responses — encrypted blobs containing TGTs encrypted with each account's password hash. No credentials were needed beyond your standard domain user. No failed logon events were generated because pre-authentication was never attempted.

You feed the hashes into Hashcat with a rule-based attack using the Rockyou wordlist augmented with company-specific terms scraped from the corporate website. Eight of twelve crack within two hours. Three are service accounts with elevated privileges: svc_sqlprod (SQL Server production — member of a group with local admin on the database tier), svc_backup (enterprise backup — network access to every server), and svc_deploy (application deployment — local admin on all app servers). The passwords follow a pattern: service name, year, exclamation mark. Svc_sqlprod's password was last changed twenty-seven months ago. You pick svc_sqlprod as your escalation path and check whether it can access any gMSA objects.

---

## What Is AS-REP Roasting?

AS-REP Roasting exploits accounts with Kerberos pre-authentication disabled. The attacker sends AS-REQ messages for target accounts and receives AS-REP responses containing TGTs encrypted with the account's password hash — no authentication required. The encrypted material is cracked offline using tools like Hashcat or John the Ripper with dictionary, rule-based, or brute-force attacks. The technique generates no failed logon events and requires no elevated privileges — only knowledge of the target account names, which are trivially obtained via LDAP enumeration. Service accounts are prime targets due to weak password policies and infrequent rotation. From an offensive perspective, AS-REP Roasting is lower-profile than Kerberoasting because it does not require a TGT for the requesting user, making it an ideal early-stage escalation technique.
