---
title: "The Zero-Day Cascade — Chapter 2: PowerShell Attacks"
chain: "zero-day-cascade"
chainOrder: 2
role: "c-level"
attack: "powershell-attacks"
choices:
  - label: "Approve an enterprise-wide PowerShell lockdown policy"
    next: "plaintext-password-extraction"
  - label: "Fund an advanced endpoint detection platform immediately"
    next: "plaintext-password-extraction"
isDebrief: false
---

The incident response team delivers their first detailed report. The attackers did not deploy traditional malware. Instead, they are living off the land — using PowerShell, a tool already installed on every Windows machine in your enterprise, to execute commands, exfiltrate data, and establish persistence. Because PowerShell is a legitimate administrative tool, the activity blended seamlessly into normal operations for days.

Your CISO explains that this approach makes traditional antivirus nearly useless. The board is pressing for a clear answer: how did millions of dollars in security tooling fail to catch a tool that ships with the operating system? Meanwhile, your legal team warns that regulators will scrutinize whether you had reasonable controls in place.

The financial exposure is mounting. Forensic consultants bill at premium rates, and every day the investigation continues is another day of reputational risk.

---

## What Are PowerShell Attacks?

PowerShell attacks exploit Windows PowerShell — a powerful scripting language and command-line shell built into every modern Windows system — to execute malicious actions. Because PowerShell is a trusted, signed Microsoft binary, attackers use it to bypass application whitelisting, download payloads, manipulate the registry, and move laterally without ever dropping a traditional executable to disk. This "living off the land" technique makes detection extremely difficult, as malicious PowerShell usage can look identical to legitimate administrative activity.
