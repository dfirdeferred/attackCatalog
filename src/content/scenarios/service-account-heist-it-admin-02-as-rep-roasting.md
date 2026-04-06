---
title: "The Service Account Heist — Chapter 2: AS-REP Roasting"
chain: "service-account-heist"
chainOrder: 2
role: "it-admin"
attack: "as-rep-roasting"
choices:
  - label: "Enable Kerberos pre-authentication on all flagged accounts immediately"
    next: "gmsa-exploitation"
  - label: "Audit all accounts for the DONT_REQUIRE_PREAUTH UAC flag"
    next: "gmsa-exploitation"
isDebrief: false
---

Within the LDAP reconnaissance data, you notice the attacker zeroed in on accounts with the UserAccountControl flag 4194304 — DONT_REQUIRE_PREAUTH. Your domain has twelve accounts with this flag set, all service accounts created during a 2019 migration from a legacy Kerberos implementation that required pre-authentication to be disabled for compatibility.

Your SIEM captures the next phase: Kerberos AS-REQ packets for these twelve accounts, requesting TGTs with RC4-HMAC encryption. The domain controller dutifully responds with encrypted AS-REP messages — each one containing a ticket encrypted with the target account's password hash. No authentication was required; the attacker simply asked. These encrypted blobs are now in the attacker's possession for offline cracking. You check the password policy for service accounts: minimum eight characters, no complexity requirement, and the last rotation was twenty-seven months ago. Your password cracking benchmarks suggest these will fall within hours.

---

## What Is AS-REP Roasting?

AS-REP Roasting targets Active Directory accounts configured with the "Do not require Kerberos pre-authentication" flag. When this flag is set, anyone can send an Authentication Service Request (AS-REQ) to the domain controller for that account and receive an AS-REP containing a Ticket Granting Ticket encrypted with the account's password hash — without proving their identity first. The encrypted ticket can then be cracked offline using tools like Hashcat or John the Ripper, with no lockout mechanism and no further network interaction. Detection involves monitoring for AS-REQ packets without pre-authentication data (Event ID 4768 with pre-authentication type 0), auditing for the DONT_REQUIRE_PREAUTH UAC flag, and ensuring all accounts — especially service accounts — have pre-authentication enabled and use long, complex passwords.
