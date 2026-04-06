---
title: "The Physical Vector — Chapter 3: Zerologon"
chain: "physical-vector"
chainOrder: 3
role: "red-teamer"
attack: "zerologon"
choices:
  - label: "Perform a DCSync to extract all domain credentials"
    next: "golden-ticket"
  - label: "Use the DC machine account to access the NTDS.dit"
    next: "golden-ticket"
isDebrief: false
---

Your VPN session gives you Layer 3 access to the internal network, but the cracked admin account only has local admin rights on workstations — not domain admin. Time to escalate. An nmap scan reveals the domain controllers are running Server 2016, build 14393. You check your vulnerability database: KB4571694 (the Zerologon patch) shows as missing in the SMB negotiation response.

You load the Zerologon exploit — Impacket's `zerologon_tester.py` confirms vulnerability in seconds. You execute `cve-2020-1472-exploit.py`, targeting the primary DC. The exploit sends Netlogon authentication attempts with zeroed AES-CFB8 credentials. On attempt 212 of the expected 256, the DC accepts the authentication and you reset its machine account password.

With the DC machine account credentials set to a known value, you use Impacket's `secretsdump.py` to perform a DCSync, replicating the NTDS.dit contents remotely. The full domain credential dump arrives: 4,247 accounts including the KRBTGT hash, all Domain Admin password hashes, and every service account in the directory.

---

## What Is Zerologon?

Zerologon (CVE-2020-1472) targets the Netlogon Remote Protocol's ComputeNetlogonCredential function, which uses AES-CFB8 with a static zero IV. For 1/256 of possible session keys, encrypting 8 zero bytes produces 8 zero bytes — meaning the attacker can authenticate by sending all-zero credentials. The exploit resets the DC's machine account password via the `NetrServerPasswordSet2` call, then uses that access for DCSync (replicating credentials via MS-DRSR) or direct NTDS.dit access. Post-exploitation must restore the original machine account password to prevent domain replication failures. The Impacket framework provides turnkey exploitation scripts.
