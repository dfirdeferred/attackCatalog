---
title: "The Domain Takeover — Chapter 6: Lateral Movement"
chain: "domain-takeover"
chainOrder: 6
role: "it-admin"
attack: "lateral-movement"
choices:
  - label: "Implement emergency network segmentation to contain the spread"
    next: "ransomware"
  - label: "Disable remote management protocols across all non-critical systems"
    next: "ransomware"
isDebrief: false
---

Your network monitoring tools reveal a cascade of remote logon events. The attacker is using PsExec and WMI to hop between systems, authenticating with harvested NTLM hashes via pass-the-hash. In the past hour, they have touched forty-seven systems across three network segments.

You trace their path: from the initial compromised workstation, to the IT jump server, to the domain controllers, and now to the backup servers. They are methodically accessing file shares, mapping network drives, and staging data in a temporary directory on a server with high-bandwidth external connectivity.

---

## What Is Lateral Movement?

Lateral movement encompasses the techniques attackers use to move through a network after initial compromise. Common methods include pass-the-hash (using NTLM hashes without cracking passwords), PsExec (remote command execution), WMI (Windows Management Instrumentation), and RDP. Attackers leverage harvested credentials and existing administrative tools already present in the environment, making detection dependent on behavioral analysis rather than signature matching.
