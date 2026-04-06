---
title: "PowerShell Attacks"
severity: "High"
category: "Post-Exploitation"
targets:
  - "Windows endpoints"
killChains:
  - "zero-day-cascade"
roles:
  c-level:
    intro: "PowerShell attacks weaponize a legitimate administration tool built into every Windows system, allowing attackers to execute sophisticated attacks that blend in with normal IT operations."
    whyCare: "Business impact: because PowerShell is a trusted, signed Microsoft tool, traditional antivirus often overlooks malicious PowerShell activity, enabling attackers to operate undetected within your environment."
  it-admin:
    intro: "Attackers use PowerShell for fileless malware execution, credential theft, lateral movement, and data exfiltration — all without dropping traditional malware binaries to disk."
    whyCare: "Detection: enable PowerShell Script Block Logging (Event ID 4104), Module Logging, and Transcription Logging. Monitor for encoded commands (-EncodedCommand), download cradles (IEX/Invoke-Expression), and AMSI bypass attempts."
  end-user:
    intro: "Phishing emails may trick you into running PowerShell commands that look harmless but actually download and execute malware entirely in memory, leaving no files for antivirus to scan."
    whyCare: "Never run PowerShell commands from emails, websites, or tech support callers. If you see a blue PowerShell window appear unexpectedly on your computer, disconnect from the network and alert IT immediately."
  red-teamer:
    intro: "PowerShell provides a full .NET-backed scripting environment on every Windows host — frameworks like PowerShell Empire, PowerSploit, and Nishang offer ready-made modules for every stage of the kill chain."
    whyCare: "Use download cradles (IEX(New-Object Net.WebClient).DownloadString()) for fileless execution. Bypass execution policy with -ep bypass. For AMSI bypass, patch amsi.dll in memory before loading offensive modules."
---

PowerShell attacks leverage Windows PowerShell — a powerful scripting language and automation framework installed on every modern Windows system — as an attack platform. Because PowerShell has deep access to the Windows operating system, .NET framework, WMI, and COM objects, it provides attackers with a legitimate, signed tool capable of executing virtually any offensive operation without deploying traditional malware.

## How It Works

1. **Initial execution** — attackers deliver PowerShell payloads through phishing macros, malicious documents, HTA files, or social engineering that convinces victims to run a command. The payload is typically a download cradle that fetches and executes code from a remote server directly in memory
2. **AMSI and execution policy bypass** — disable or patch the Antimalware Scan Interface (AMSI) in memory and bypass execution policies using flags like `-ExecutionPolicy Bypass` or `-EncodedCommand` to run obfuscated scripts
3. **Fileless operations** — execute entire attack frameworks in memory using reflective loading. Tools like Invoke-Mimikatz, PowerView, and Invoke-Kerberoast run without writing files to disk
4. **Lateral movement** — use PowerShell Remoting (WinRM), Invoke-Command, and Enter-PSSession to execute commands across the network using stolen credentials
5. **Data exfiltration** — use PowerShell's built-in web request capabilities to compress and transmit stolen data to attacker-controlled infrastructure over HTTP/S or DNS

## Impact

- Fileless malware execution that evades traditional endpoint protection
- Credential harvesting directly from memory using tools like Invoke-Mimikatz
- Lateral movement across the entire Windows environment via PowerShell Remoting
- Persistent access through PowerShell-based scheduled tasks, WMI event subscriptions, and profile scripts
- Defense evasion through obfuscation, encoding, and AMSI bypass techniques

## Mitigations

- **Enable comprehensive logging** — configure Script Block Logging (Event ID 4104), Module Logging, and Transcription Logging to capture all PowerShell activity
- **Deploy Constrained Language Mode** — use AppLocker or WDAC to restrict PowerShell to constrained language mode for standard users, blocking access to .NET and COM objects
- **Implement AMSI-aware security** — ensure endpoint protection solutions leverage AMSI for real-time script inspection
- **Restrict PowerShell Remoting** — limit WinRM access to authorized administrator accounts and networks using GPO and Windows Firewall rules
- **Use Just Enough Administration (JEA)** — create restricted PowerShell endpoints that limit available commands to only what administrators need
