---
title: "The Zero-Day Cascade — Chapter 3: Plaintext Password Extraction"
chain: "zero-day-cascade"
chainOrder: 3
role: "it-admin"
attack: "plaintext-password-extraction"
choices:
  - label: "Enable Credential Guard on all servers and workstations"
    next: "pass-the-ticket"
  - label: "Disable WDigest authentication and flush LSASS caches"
    next: "pass-the-ticket"
isDebrief: false
---

The memory dump from the compromised Exchange server tells a grim story. The attacker ran a Mimikatz variant — loaded reflectively through PowerShell — and dumped the LSASS process. The output file, exfiltrated before you contained the web shells, contains plaintext credentials for every account that authenticated to that server in the past 48 hours.

You cross-reference the server's authentication logs with your directory. Among the 340 compromised credentials: the Exchange service account (Domain Admin), three IT operations staff accounts, and the CISO's own email credentials. WDigest authentication was still enabled on these servers — a legacy configuration that stores reversible credentials in memory.

Your Credential Guard deployment, which would have protected LSASS, is only at 40% rollout. The compromised servers were in the remaining 60%. The attacker now holds plaintext passwords for accounts that have access to nearly every critical system.

---

## What Is Plaintext Password Extraction?

Plaintext password extraction targets the LSASS (Local Security Authority Subsystem Service) process in Windows, which caches user credentials in memory to enable single sign-on. When WDigest or similar legacy authentication protocols are enabled, credentials are stored in a reversible format. Tools like Mimikatz can read the LSASS process memory and extract these credentials in cleartext. Even without WDigest, NTLM hashes cached in LSASS can be extracted and used in pass-the-hash attacks. Credential Guard, introduced in Windows 10, isolates LSASS in a virtualization-based security container to prevent this extraction.
