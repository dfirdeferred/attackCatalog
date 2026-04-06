---
title: "Security Support Provider Attack"
severity: "Critical"
category: "Credential Theft & Password"
targets:
  - "Active Directory"
  - "Domain Controllers"
  - "LSASS"
killChains:
  - "silent-persistence"
roles:
  c-level:
    intro: "A Security Support Provider attack installs a malicious DLL into the Windows authentication process, silently capturing every user's plaintext credentials as they log in."
    whyCare: "Business impact: once installed on a domain controller, this attack harvests the credentials of every domain user who authenticates — including all administrators — providing the attacker with persistent, expanding access."
  it-admin:
    intro: "Attackers register a malicious SSP DLL with LSASS, which then calls the SSP's SpAcceptCredentials function for every interactive logon, receiving credentials in plaintext."
    whyCare: "Detection: monitor the Security Packages registry value under HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa for unexpected entries. Use Sysmon Event ID 7 to detect DLL loads into lsass.exe, and audit the LSASS process for unsigned modules."
  end-user:
    intro: "When a malicious Security Support Provider is installed on a server you log into, your username and password are silently captured in plaintext the moment you authenticate."
    whyCare: "If you are notified of a server compromise, change your password immediately — any login you performed on that server may have been intercepted."
  red-teamer:
    intro: "Use Mimikatz's misc::memssp to inject a memory-only SSP into LSASS without touching disk, or register mimilib.dll as a persistent SSP via the registry for reboot survival."
    whyCare: "Memory-only SSP avoids file-based detection but does not survive reboots. For persistence, add the DLL to HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\Security Packages. Pair with a Golden Ticket for a layered persistence strategy."
---

A Security Support Provider (SSP) attack exploits the Windows authentication architecture by registering a malicious DLL as a security package within the Local Security Authority Subsystem Service (LSASS). Once loaded, the malicious SSP receives plaintext credentials for every user who performs an interactive logon on the compromised system.

## How It Works

1. **Gain administrative access** — obtain local administrator or SYSTEM privileges on the target machine, typically a domain controller for maximum impact
2. **Deploy the malicious SSP** — either:
   - **Memory injection**: use Mimikatz's `misc::memssp` to inject a custom SSP directly into the LSASS process without writing a file to disk
   - **Persistent registration**: copy a malicious DLL (e.g., mimilib.dll) to `C:\Windows\System32\` and add its name to the `Security Packages` value under `HKLM\SYSTEM\CurrentControlSet\Control\Lsa`
3. **Capture credentials** — LSASS calls the SSP's `SpAcceptCredentials` function during every interactive logon. The malicious SSP logs the plaintext username, domain, and password to a file (commonly `C:\Windows\System32\kiwissp.log`) or transmits them to the attacker
4. **Harvest and expand** — collect captured credentials and use them for lateral movement, privilege escalation, or maintaining persistent access

## Impact

- Plaintext credential capture for every user who logs into the compromised system
- On domain controllers, this includes every interactive logon across the entire domain
- Persistent access that survives password changes (new passwords are captured on next logon)
- Memory-only variants leave minimal forensic evidence
- Enables cascading compromise as more credentials are harvested over time

## Mitigations

- **Enable Credential Guard** — Windows Credential Guard isolates LSASS in a virtualization-based security container, preventing SSP injection
- **Configure LSA protection** — enable RunAsPPL (Protected Process Light) for LSASS to block unsigned DLL loading
- **Monitor registry changes** — alert on modifications to the Security Packages value under the LSA registry key
- **Audit LSASS module loads** — use Sysmon Event ID 7 to detect new DLLs loaded into the lsass.exe process
- **Restrict domain controller access** — minimize the number of accounts with interactive logon rights to DCs, and use Remote Credential Guard for RDP sessions
