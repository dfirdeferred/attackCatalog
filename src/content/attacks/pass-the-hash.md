---
title: "Pass-the-Hash Attack"
severity: "High"
category: "Credential Theft & Lateral Movement"
targets:
  - "NTLM Windows Endpoints"
  - "Active Directory"
killChains:
  - "silent-persistence"
roles:
  c-level:
    intro: "Pass-the-Hash allows attackers to authenticate as any user using just their stolen password hash — they never need to know the actual password."
    whyCare: "Business impact: one compromised workstation can cascade into domain-wide access as attackers hop between systems using harvested credential hashes."
  it-admin:
    intro: "Pass-the-Hash exploits NTLM authentication by substituting a stolen NTLM hash in place of the password during the challenge-response handshake."
    whyCare: "Detection: monitor for Event ID 4624 with Logon Type 3 (Network) combined with unusual source hosts. Restrict NTLM usage via Group Policy and enable SMB signing to limit relay attacks."
  end-user:
    intro: "If malware captures your Windows password hash, attackers can use it to log into other systems as you — even without cracking your actual password."
    whyCare: "Use unique passwords across systems and report any suspicious logon notifications. Enabling MFA adds a barrier that NTLM hashes alone cannot bypass."
  red-teamer:
    intro: "Extract NTLM hashes via Mimikatz, secretsdump, or SAM/NTDS.dit dumps, then authenticate using tools like pth-winexe, CrackMapExec, or Impacket's psexec/wmiexec."
    whyCare: "Core lateral movement technique for NTLM-heavy environments. Works against local admin accounts across multiple hosts sharing the same password. Pair with credential dumping for chain escalation."
---

Pass-the-Hash (PtH) is a credential theft and lateral movement technique where an attacker uses a stolen NTLM password hash to authenticate to remote systems without ever needing the plaintext password. It exploits the NTLM challenge-response protocol, which accepts the hash directly during authentication.

## How It Works

1. **Compromise a host** — the attacker gains local administrator access on a Windows machine
2. **Extract NTLM hashes** — using Mimikatz (`sekurlsa::logonpasswords`), secretsdump, or by extracting the SAM database, the attacker obtains NTLM hashes of logged-in or cached users
3. **Identify targets** — the attacker scans the network for systems where the compromised accounts have access (e.g., shared local admin passwords)
4. **Authenticate with the hash** — using tools like CrackMapExec, Impacket's `psexec.py`/`wmiexec.py`, or Mimikatz's `sekurlsa::pth`, the attacker authenticates to remote systems using the raw hash
5. **Expand access** — on each new system, additional hashes are harvested, creating a chain of lateral movement

## Impact

- Lateral movement across the entire network using a single compromised hash
- Local admin password reuse means one hash can unlock dozens or hundreds of systems
- No password cracking required — the hash is used as-is
- Bypasses password complexity requirements since the plaintext is never needed
- Difficult to distinguish from legitimate NTLM authentication in logs

## Key Mitigations

- **Deploy LAPS (Local Administrator Password Solution)** — ensure every machine has a unique local admin password, breaking hash reuse chains
- **Restrict NTLM authentication** — use Group Policy to limit NTLM and favor Kerberos wherever possible
- **Enable Credential Guard** — protects LSASS from hash extraction on Windows 10/11 and Server 2016+
- **Enforce SMB signing** — prevents NTLM relay attacks that complement Pass-the-Hash
- **Implement least privilege** — reduce the number of accounts with local admin access and avoid using domain admin credentials on workstations
