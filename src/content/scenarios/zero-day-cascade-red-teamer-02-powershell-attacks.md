---
title: "The Zero-Day Cascade — Chapter 2: PowerShell Attacks"
chain: "zero-day-cascade"
chainOrder: 2
role: "red-teamer"
attack: "powershell-attacks"
choices:
  - label: "Use a reflective loader to run Mimikatz in memory"
    next: "plaintext-password-extraction"
  - label: "Establish a PowerShell Remoting session to pivot internally"
    next: "plaintext-password-extraction"
isDebrief: false
---

Your web shell is functional but noisy — every command spawns a new process visible in EDR telemetry. You transition to PowerShell for stealth. Through the web shell, you execute a Base64-encoded PowerShell command that disables ScriptBlock logging, patches AMSI in memory, and establishes a reverse HTTPS connection to your C2 server using a legitimate cloud domain as a redirector.

Your payload never touches disk. The download cradle pulls a second-stage script that runs entirely in the .NET runtime. You disable PowerShell transcript logging via a registry modification and clear the existing transcripts. Your C2 now has an interactive PowerShell session running under the Exchange service account — which, conveniently, has Domain Admin privileges because the organization never followed least-privilege guidelines.

You test lateral movement by invoking `Enter-PSSession` against the primary domain controller. It connects immediately. You now have fileless, in-memory access to the DC through a legitimate Windows management channel.

---

## What Are PowerShell Attacks?

From an offensive perspective, PowerShell is the ideal post-exploitation framework. It provides native access to .NET, WMI, COM objects, the Windows API, and Active Directory — all through a signed Microsoft binary. Key techniques include AMSI bypass to evade runtime scanning, download cradles for fileless payload delivery, reflective assembly loading to run tools like Mimikatz without disk artifacts, and PSRemoting for encrypted lateral movement. PowerShell Constrained Language Mode and ScriptBlock logging are the primary defensive controls, making their presence (or absence) a critical factor in engagement planning.
