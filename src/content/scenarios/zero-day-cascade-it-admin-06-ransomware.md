---
title: "The Zero-Day Cascade — Chapter 6: Ransomware"
chain: "zero-day-cascade"
chainOrder: 6
role: "it-admin"
attack: "ransomware"
choices:
  - label: "Analyze the full kill chain and document IOCs"
    next: "debrief"
  - label: "Begin the technical recovery and hardening process"
    next: "debrief"
isDebrief: false
---

At 02:47, PsExec connections fan out from a compromised admin workstation to every server in your environment simultaneously. A binary named `svchost_update.exe` drops on each target and begins encrypting files with AES-256, appending a `.locked` extension. Within twelve minutes, your file servers, SQL databases, and SharePoint farms are encrypted.

You check your backup infrastructure — the attackers thought of that too. Three days ago, one of the DCShadow-injected admin accounts logged into your Veeam backup server and deleted all recovery points. The offsite tape rotation was on a two-week cycle, meaning your latest clean backup is 13 days old.

The ransomware note directs you to a Tor-hosted portal. The attackers claim to have exfiltrated 2.3 terabytes of data and will publish it in 72 hours. Your disaster recovery plan assumed backups would be intact. They are not. The network segmentation that should have protected your backup VLAN was bypassed through the compromised Domain Admin credentials.

---

## What Is Ransomware?

Ransomware is malicious software designed to deny access to systems or data until a ransom is paid. Modern ransomware typically uses strong symmetric encryption (AES-256) to encrypt files and asymmetric encryption (RSA) to protect the encryption keys. Enterprise ransomware operators conduct extensive pre-deployment reconnaissance — disabling backups, mapping network shares, and staging encryption tools across the environment — before detonating simultaneously for maximum impact. The evolution to "double extortion" adds data theft to the encryption threat, and "triple extortion" extends pressure to victims' customers and partners.
