---
title: "The Silent Persistence — Chapter 2: Pass-the-Hash"
chain: "silent-persistence"
chainOrder: 2
role: "red-teamer"
attack: "pass-the-hash"
choices:
  - label: "Target an account with AdminSDHolder protection for persistent access"
    next: "adminsdholder"
  - label: "Move to domain controllers using a Domain Admin hash found in LSASS"
    next: "adminsdholder"
isDebrief: false
---

From the six compromised VPN sessions, you select the workstation with the most promise — a system in the IT department. You inject a Meterpreter payload and elevate to SYSTEM using a local privilege escalation exploit. With SYSTEM access, you run Mimikatz's `sekurlsa::logonpasswords` to dump all NTLM hashes from LSASS memory.

You extract the local administrator hash and test it across the network with CrackMapExec: `crackmapexec smb 10.0.0.0/16 -u Administrator -H <hash>`. The result: 1,650 systems return "Pwn3d!" — they all share the same local admin hash. You have just turned six footholds into 1,650 without touching Active Directory.

---

## What Is Pass-the-Hash?

Pass-the-hash abuses NTLM authentication by supplying the NTLM hash directly in place of the password during the authentication challenge-response. Tools like Mimikatz, Impacket, and CrackMapExec natively support PtH. The attack is devastating in environments with shared local administrator passwords, as a single hash provides lateral access to every system with matching credentials. Credential Guard and LAPS are the primary mitigations.
