---
title: "The Silent Persistence — Chapter 6: SSP Attack"
chain: "silent-persistence"
chainOrder: 6
role: "red-teamer"
attack: "ssp-attack"
choices:
  - label: "Document all persistence mechanisms established and prepare the final report"
    next: "debrief"
  - label: "Test the resilience of your persistence by simulating a defender response"
    next: "debrief"
isDebrief: false
---

To ensure continuous credential harvesting that survives reboots (unlike the Skeleton Key), you deploy Mimikatz's SSP module. You copy `mimilib.dll` to `C:\Windows\System32` on the primary domain controller and register it as a Security Support Provider by adding it to the `Security Packages` value in `HKLM\SYSTEM\CurrentControlSet\Control\Lsa`.

After a brief LSASS restart, the malicious SSP begins logging plaintext credentials to `kiwissp.log` for every authentication. You set up a scheduled task to exfiltrate the log file daily. Now, even if defenders reset every password in the domain, you will capture the new credentials within hours. Combined with the AdminSDHolder persistence, DCShadow modifications, and Skeleton Key, your access is layered and resilient.

---

## What Is an SSP Attack?

An SSP attack installs a rogue Security Support Provider DLL into the LSASS authentication pipeline. The module intercepts the authentication process to log plaintext credentials for every logon. Unlike Skeleton Key (memory-only), the SSP persists across reboots via the registry `Security Packages` entry. It provides continuous credential harvesting, ensuring the operator always has current credentials even after enterprise-wide password resets. Detection requires monitoring LSA registry keys and validating loaded LSASS modules against a known-good baseline.
