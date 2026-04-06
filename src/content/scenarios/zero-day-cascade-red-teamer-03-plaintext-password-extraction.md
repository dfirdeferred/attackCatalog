---
title: "The Zero-Day Cascade — Chapter 3: Plaintext Password Extraction"
chain: "zero-day-cascade"
chainOrder: 3
role: "red-teamer"
attack: "plaintext-password-extraction"
choices:
  - label: "Export Kerberos tickets from memory for persistence"
    next: "pass-the-ticket"
  - label: "Spray the harvested credentials against other services"
    next: "pass-the-ticket"
isDebrief: false
---

With SYSTEM access on the Exchange server, you load Mimikatz reflectively into the PowerShell process and execute `sekurlsa::logonpasswords`. The output is a goldmine. WDigest is enabled on this server — a common oversight in organizations that upgraded from Server 2008 R2 without hardening the new deployment. You get plaintext passwords, not just hashes.

The credential dump yields 340 unique accounts. You filter for high-value targets: the Exchange service account (Domain Admin), three accounts in the `IT-Operations` security group, the CISO's account, and several accounts with SPNs registered — indicating service accounts that likely have elevated privileges.

You validate the Domain Admin credentials against the DC: `sekurlsa::pth /user:svc-exchange /domain:corp.target.com /ntlm:[hash]`. A new cmd.exe spawns under the DA context. You now have two independent paths to domain dominance — the PSRemoting session and the pass-the-hash session — providing operational redundancy.

---

## What Is Plaintext Password Extraction?

Plaintext password extraction targets the LSASS process, which caches credentials for SSO functionality. When WDigest authentication is enabled (default on pre-2012 R2 systems and often persisted through upgrades), credentials are stored in reversible form. Mimikatz's `sekurlsa::logonpasswords` command reads these from LSASS memory. Even with WDigest disabled, NTLM hashes and Kerberos keys are available for pass-the-hash and overpass-the-hash attacks. Credential Guard virtualizes LSASS to prevent this access, but requires UEFI Secure Boot, TPM 2.0, and cannot protect credentials on domain controllers themselves.
