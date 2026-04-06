---
title: "The Silent Persistence — Chapter 6: SSP Attack"
chain: "silent-persistence"
chainOrder: 6
role: "it-admin"
attack: "ssp-attack"
choices:
  - label: "Remove the malicious SSP and rebuild domain controllers from clean media"
    next: "debrief"
  - label: "Audit all registered SSPs and LSA extensions across every domain controller"
    next: "debrief"
isDebrief: false
---

In your forensic analysis of the domain controllers, you discover a DLL registered as a Security Support Provider in the registry at `HKLM\SYSTEM\CurrentControlSet\Control\Lsa\Security Packages`. The DLL — `mimilib.dll` — is Mimikatz's credential-logging SSP.

You find a hidden log file at `C:\Windows\System32\kiwissp.log` containing plaintext credentials for every authentication that has occurred on this domain controller since the SSP was installed. Three weeks of passwords — including every password that was changed during your remediation efforts. Every credential reset you performed has been captured.

---

## What Is an SSP Attack?

A Security Support Provider (SSP) attack installs a malicious DLL into the Windows LSASS authentication pipeline. The DLL is registered via the `Security Packages` registry key and is loaded by LSASS on startup (or injected at runtime). It hooks into the authentication process and logs plaintext credentials for every logon event. Unlike the Skeleton Key attack, an SSP backdoor persists across reboots and continuously harvests new credentials, making it a powerful long-term persistence mechanism.
