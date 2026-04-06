---
title: "The Zero-Day Cascade — Chapter 1: HAFNIUM"
chain: "zero-day-cascade"
chainOrder: 1
role: "it-admin"
attack: "hafnium"
choices:
  - label: "Run a web shell scan across all Exchange servers"
    next: "powershell-attacks"
  - label: "Check IIS logs for suspicious POST requests to /owa/"
    next: "powershell-attacks"
isDebrief: false
---

Your monitoring dashboard flags an anomaly at 05:48 UTC: an Exchange Server's w3wp.exe process spawned cmd.exe — something that should never happen in production. You pull the IIS logs and find HTTP POST requests targeting `/owa/auth/` endpoints with unfamiliar parameters. The requests originated from three different IP addresses, all geolocated to virtual private servers in Southeast Asia.

You check the Microsoft advisory published just hours ago. CVE-2021-26855 allows server-side request forgery on Exchange, and CVE-2021-27065 enables arbitrary file write. Together, they form the ProxyLogon chain. A quick filesystem scan of your Exchange server reveals two ASPX files in the `C:\inetpub\wwwroot\aspnet_client\` directory that were not part of any deployment. They are web shells.

Your Exchange environment serves 4,000 mailboxes across three on-premises servers, and all three may be compromised.

---

## What Is the HAFNIUM Attack?

HAFNIUM refers to a Chinese state-sponsored threat group that exploited four zero-day vulnerabilities in Microsoft Exchange Server in early 2021. The ProxyLogon exploit chain combined a server-side request forgery (SSRF) vulnerability with an arbitrary file write to achieve unauthenticated remote code execution. Attackers used these vulnerabilities to deploy web shells — small scripts that provide persistent remote command execution — on victim servers. The campaign affected an estimated 250,000 Exchange servers globally before Microsoft released emergency patches.
