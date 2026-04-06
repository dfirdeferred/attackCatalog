---
title: "The Zero-Day Cascade — Chapter 1: HAFNIUM"
chain: "zero-day-cascade"
chainOrder: 1
role: "red-teamer"
attack: "hafnium"
choices:
  - label: "Deploy web shells for persistent remote access"
    next: "powershell-attacks"
  - label: "Chain the SSRF with the file write for RCE"
    next: "powershell-attacks"
isDebrief: false
---

Your recon identified three internet-facing Exchange servers running build 15.1.2106 — vulnerable to the full ProxyLogon chain. You craft the SSRF payload for CVE-2021-26855, targeting the autodiscover endpoint to leak the backend SID and mailbox FQDN. The server responds with a 200 and the internal distinguished name of the administrator mailbox.

With the SID in hand, you pivot to CVE-2021-27065. You forge the authentication cookie, set the external URL field of a virtual directory to your ASPX payload, and trigger a configuration export. The Exchange server obligingly writes your web shell to `C:\inetpub\wwwroot\aspnet_client\system_web\frowny.aspx`. A quick curl confirms command execution as `NT AUTHORITY\SYSTEM`.

You now have unauthenticated RCE on a domain-joined server running as SYSTEM. The web shell provides your persistence layer — even if the vulnerability is patched tomorrow, your shell survives. You deploy two additional shells to the other Exchange servers for redundancy.

---

## What Is the HAFNIUM Attack?

The HAFNIUM attack chain exploits four Exchange Server CVEs: CVE-2021-26855 (SSRF), CVE-2021-26857 (insecure deserialization), CVE-2021-26858 and CVE-2021-27065 (arbitrary file write). The SSRF allows unauthenticated requests to internal Exchange endpoints, leaking backend identifiers. These identifiers are used to forge authentication tokens, which then allow the arbitrary file write primitives to drop web shells into web-accessible directories. The resulting access runs as SYSTEM on a domain-joined server — an ideal pivot point for Active Directory compromise.
