---
title: "The Silent Persistence — Chapter 4: DCShadow"
chain: "silent-persistence"
chainOrder: 4
role: "it-admin"
attack: "dcshadow"
choices:
  - label: "Cross-reference replication metadata with your known DC inventory"
    next: "skeleton-key"
  - label: "Implement monitoring for nTDSDSA object creation in the Configuration partition"
    next: "skeleton-key"
isDebrief: false
---

Your investigation takes a disturbing turn when you notice replication metadata anomalies. Changes are appearing in Active Directory that do not match any administrator actions. A service account's SPN was modified, a user was added to a sensitive group, and a GPO link was changed — all replicated from a domain controller GUID you do not recognize.

You check your DC inventory: you have three domain controllers. But AD replication metadata shows a fourth. The attacker has used DCShadow to temporarily register a rogue DC, push malicious changes, and then deregister it — leaving almost no trace in your standard event logs.

---

## What Is DCShadow?

DCShadow exploits the Active Directory replication protocol by temporarily registering an attacker-controlled machine as a domain controller. The rogue DC pushes changes through standard replication (using DRSUAPI), which legitimate DCs accept as trusted updates. Because the changes arrive through replication rather than LDAP modifications, they bypass LDAP-based audit logging and most SIEM detection rules. The rogue DC can be deregistered after pushing changes, minimizing the forensic footprint.
