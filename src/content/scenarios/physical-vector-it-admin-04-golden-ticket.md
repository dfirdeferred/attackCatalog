---
title: "The Physical Vector — Chapter 4: Golden Ticket"
chain: "physical-vector"
chainOrder: 4
role: "it-admin"
attack: "golden-ticket"
choices:
  - label: "Begin the double KRBTGT password rotation procedure"
    next: "lateral-movement"
  - label: "Deploy advanced Kerberos anomaly detection rules"
    next: "lateral-movement"
isDebrief: false
---

With the domain controller's machine account compromised via Zerologon, the attacker performed a DCSync to replicate the KRBTGT account hash. Your SIEM captured the DRS replication request — `GetNCChanges` for the KRBTGT account — but it was buried in a backlog of 14,000 alerts generated during the incident.

Now you are seeing impossible authentication patterns. A TGT with a 10-year lifetime was presented to a service. An account that was disabled three months ago is authenticating to file shares. A user in the Sydney office is simultaneously authenticated on servers in New York and London. The attacker has forged a Golden Ticket.

You check the KRBTGT account's password last-set date: 847 days ago. Best practice recommends rotation every 180 days. The password was last changed during the initial domain deployment and never touched again. Every day of that 847-day window gave the attacker confidence that the KRBTGT hash — once obtained — would remain valid indefinitely.

---

## What Is a Golden Ticket Attack?

A Golden Ticket is forged by using the KRBTGT account's password hash to create arbitrary Kerberos TGTs. The attacker obtains the hash via DCSync, NTDS.dit extraction, or memory dumping, then uses Mimikatz's `kerberos::golden` command to generate tickets with any username, any group membership (including Domain Admins, Enterprise Admins), and any lifetime. Because the TGT is encrypted with the real KRBTGT key, domain controllers accept it as legitimate. Detection focuses on anomalies: TGTs with unusual lifetimes, encryption types not matching domain policy (RC4 when AES is enforced), or PAC information inconsistent with the actual user account. Remediation requires resetting the KRBTGT password twice.
