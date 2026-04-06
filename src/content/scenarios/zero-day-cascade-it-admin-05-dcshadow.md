---
title: "The Zero-Day Cascade — Chapter 5: DCShadow"
chain: "zero-day-cascade"
chainOrder: 5
role: "it-admin"
attack: "dcshadow"
choices:
  - label: "Audit the AD replication topology for unauthorized DCs"
    next: "ransomware"
  - label: "Compare AD snapshots to identify injected changes"
    next: "ransomware"
isDebrief: false
---

After the KRBTGT rotation, you begin auditing Active Directory for persistence mechanisms. Your replication monitoring tool shows something wrong: a replication partner that is not in your documented topology. A server object appeared in the `CN=Sites,CN=Configuration` container 72 hours ago — a rogue domain controller the attacker registered using the compromised Domain Admin credentials.

You run `repadmin /showrepl` and discover this phantom DC has been pushing changes. Cross-referencing with your AD backup from before the breach, you find 14 unauthorized modifications: three new accounts added to Domain Admins, SPN attributes modified on six service accounts, and five security descriptor changes that grant the attacker's accounts `GenericAll` permissions on critical OUs.

The attacker used Mimikatz's DCShadow module to push these changes through legitimate replication — your DCs accepted them as trusted updates. Your audit logs show nothing suspicious because the changes arrived through the replication channel, not through LDAP modifications.

---

## What Is a DCShadow Attack?

DCShadow is a late-stage Active Directory attack technique that leverages the MS-DRSR (Directory Replication Service Remote) protocol. The attacker uses compromised Domain Admin credentials to temporarily register a rogue server as a domain controller by modifying the AD configuration partition. Once registered, the rogue DC pushes malicious changes — new accounts, group membership modifications, SPN alterations, security descriptor changes — through the normal replication process. Because changes arrive through trusted replication rather than LDAP, they evade most security monitoring tools and SIEM detections.
