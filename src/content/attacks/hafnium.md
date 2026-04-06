---
title: "Hafnium Cyber Attack"
severity: "Critical"
category: "AD Infrastructure"
targets:
  - "Exchange Server"
  - "Active Directory"
killChains:
  - "zero-day-cascade"
roles:
  c-level:
    intro: "The Hafnium attack exploited four zero-day vulnerabilities in Microsoft Exchange Server, giving state-sponsored attackers remote access to email systems and, through them, the entire AD environment."
    whyCare: "This campaign compromised over 30,000 organizations globally, demonstrating that on-premises email infrastructure is a high-value target that can serve as a gateway to total enterprise compromise."
  it-admin:
    intro: "Hafnium chained CVE-2021-26855 (SSRF), CVE-2021-26857 (deserialization), CVE-2021-26858 and CVE-2021-27065 (arbitrary file write) to drop web shells on Exchange servers without authentication."
    whyCare: "Detection: scan for web shells in IIS directories, review Exchange HttpProxy logs for suspicious POST requests, and check for unexpected processes spawned by w3wp.exe on Exchange servers."
  end-user:
    intro: "The Hafnium attack targeted your organization's email server — if successful, attackers could read any mailbox, impersonate executives, and use email access to launch further social engineering."
    whyCare: "Be alert for unexpected password reset notifications, unusual emails sent from colleagues' accounts, or security team requests to change credentials following an Exchange compromise."
  red-teamer:
    intro: "The Hafnium chain demonstrates a classic zero-day-to-web-shell-to-domain-admin path: SSRF for authentication bypass, deserialization for code execution, and file write for persistent access."
    whyCare: "Post-exploitation from Exchange is powerful — SYSTEM-level access on a domain-joined server enables credential harvesting, DCSync via Exchange's AD permissions, and lateral movement to DCs."
---

The Hafnium attack refers to a series of zero-day exploits against on-premises Microsoft Exchange Server, attributed to the Chinese state-sponsored group HAFNIUM. Disclosed in March 2021, the attack chain allowed unauthenticated remote code execution on Exchange servers, leading to widespread compromise of email systems and Active Directory environments worldwide.

## How It Works

1. **Server-Side Request Forgery (SSRF)** — CVE-2021-26855 allows an unauthenticated attacker to send crafted HTTP requests to an Exchange server, bypassing authentication and accessing internal Exchange services as the SYSTEM account
2. **Insecure deserialization** — CVE-2021-26857 exploits the Unified Messaging service to deserialize untrusted data, achieving code execution as SYSTEM on the Exchange server
3. **Arbitrary file write** — CVE-2021-26858 and CVE-2021-27065 allow the attacker to write files to any path on the Exchange server after authenticating via the SSRF vulnerability
4. **Web shell deployment** — the attacker drops ASPX web shells (commonly "China Chopper" variants) into publicly accessible IIS directories, providing persistent remote command execution
5. **Post-exploitation** — from the Exchange server, attackers dump credentials with Procdump or Mimikatz, access mailboxes, exfiltrate data, and pivot into AD for domain-wide compromise

## Impact

- Unauthenticated remote code execution on Exchange servers exposed to the internet
- Full email access across the organization including executive mailboxes
- Persistent backdoor access via web shells surviving patches if not cleaned
- Lateral movement to Active Directory, enabling DCSync and domain takeover

## Key Mitigations

- **Patch Exchange immediately** — apply cumulative updates addressing all four CVEs, and verify with the Microsoft Exchange Server Health Checker script
- **Scan for web shells** — use Microsoft's EOMT tool and manual review of IIS web directories for unauthorized ASPX files
- **Restrict Exchange internet exposure** — place Exchange behind a reverse proxy or WAF, and limit access to Outlook Web Access where possible
- **Monitor Exchange processes** — alert on w3wp.exe spawning cmd.exe, PowerShell, or other unexpected child processes
- **Evaluate migration to Exchange Online** — reduce the attack surface by moving to cloud-hosted email where Microsoft manages patching and infrastructure security
