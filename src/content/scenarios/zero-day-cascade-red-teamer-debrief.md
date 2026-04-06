---
title: "The Zero-Day Cascade — Debrief"
chain: "zero-day-cascade"
chainOrder: 99
role: "red-teamer"
attack: "debrief"
choices: []
isDebrief: true
---

The Zero-Day Cascade is complete. As a red teamer, you executed a full kill chain from initial zero-day exploitation to ransomware deployment, exploiting defensive gaps at every stage.

**The attack chain you executed:**

1. **HAFNIUM** — Exploited ProxyLogon (CVE-2021-26855 + CVE-2021-27065) for unauthenticated RCE, deploying redundant web shells across three Exchange servers.
2. **PowerShell Attacks** — Transitioned to fileless execution with AMSI bypass, disabled logging, and established C2 through a cloud redirector.
3. **Plaintext Password Extraction** — Dumped LSASS via reflective Mimikatz, harvesting 340 plaintext credentials thanks to enabled WDigest authentication.
4. **Pass-the-Ticket** — Exported 847 Kerberos tickets pre-password-reset, maintaining uninterrupted access after the blue team's remediation attempt.
5. **DCShadow** — Injected 14 malicious changes into AD replication, embedding persistent backdoor accounts and permissions in the directory itself.
6. **Ransomware** — Destroyed backups, exfiltrated 2.3 TB, and deployed AES-256 encryption across the domain via PsExec for double extortion.

**Offensive takeaways:** The engagement succeeded because of compounding defensive failures — unpatched Exchange, legacy WDigest configuration, over-privileged service accounts, no Credential Guard, absent replication monitoring, and backup infrastructure on the same domain. Each gap enabled the next stage. A single hardened control at any point could have broken the chain.
