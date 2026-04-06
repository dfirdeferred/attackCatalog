---
title: "The Silent Persistence — Chapter 2: Pass-the-Hash"
chain: "silent-persistence"
chainOrder: 2
role: "it-admin"
attack: "pass-the-hash"
choices:
  - label: "Deploy LAPS to randomize local admin passwords across all workstations"
    next: "adminsdholder"
  - label: "Enable Credential Guard and restrict NTLM authentication via GPO"
    next: "adminsdholder"
isDebrief: false
---

Your investigation of the compromised VPN sessions reveals something alarming. The attacker has run Mimikatz on one of the compromised workstations and dumped NTLM hashes from LSASS memory. They are now authenticating to other systems using these hashes directly — no password cracking required.

You see Event ID 4624 logon events with Type 3 (Network) across multiple servers, all originating from a single workstation but using different account credentials. The attacker is passing hashes for a local administrator account that shares the same password across 90% of your workstations — a legacy image standardization issue.

---

## What Is Pass-the-Hash?

Pass-the-hash exploits the NTLM authentication protocol, which accepts password hashes as proof of identity. When an attacker extracts NTLM hashes from LSASS process memory using tools like Mimikatz, they can authenticate to any system that accepts NTLM without knowing the plaintext password. If local administrator accounts share the same password (and therefore the same hash) across systems, a single compromised hash grants access to the entire fleet.
