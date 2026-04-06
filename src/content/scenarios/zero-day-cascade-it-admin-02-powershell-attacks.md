---
title: "The Zero-Day Cascade — Chapter 2: PowerShell Attacks"
chain: "zero-day-cascade"
chainOrder: 2
role: "it-admin"
attack: "powershell-attacks"
choices:
  - label: "Enable PowerShell ScriptBlock and Module logging enterprise-wide"
    next: "plaintext-password-extraction"
  - label: "Deploy Constrained Language Mode via AppLocker policy"
    next: "plaintext-password-extraction"
isDebrief: false
---

After containing the web shells, you analyze the execution chain. The ASPX web shell invoked PowerShell with a Base64-encoded command. Decoding it reveals a download cradle: `IEX(New-Object Net.WebClient).DownloadString()` pulling a second-stage payload from a compromised WordPress site. The payload runs entirely in memory — no file ever touches disk.

You check your endpoint protection logs. Nothing. The PowerShell execution was signed by Microsoft, ran under a legitimate service account, and used standard .NET classes. Your antivirus saw a trusted binary doing trusted things.

Searching the PowerShell event logs reveals the attackers disabled transcript logging on the compromised servers within minutes of initial access. You have a six-hour gap with no visibility into what commands were executed. The only trace is in the deeper Module logging — if it was even enabled.

---

## What Are PowerShell Attacks?

PowerShell attacks weaponize Windows PowerShell to execute malicious code while evading detection. Attackers leverage PowerShell's deep integration with the Windows operating system to download payloads, execute code in memory, access the registry, query Active Directory, and move laterally — all without dropping files to disk. Common techniques include encoded commands, download cradles, reflective loading, and AMSI bypass. Because PowerShell is a legitimate signed Microsoft tool, these attacks often evade application whitelisting and traditional antivirus solutions.
