---
title: "The Zero-Day Cascade — Chapter 5: DCShadow"
chain: "zero-day-cascade"
chainOrder: 5
role: "red-teamer"
attack: "dcshadow"
choices:
  - label: "Stage ransomware deployment across the domain"
    next: "ransomware"
  - label: "Delete backup infrastructure using the injected accounts"
    next: "ransomware"
isDebrief: false
---

The blue team rotated KRBTGT, killing your stolen tickets. But you still hold the Domain Admin NTLM hash from the credential dump. You need persistence that survives even a full credential rotation — time for DCShadow.

From your compromised DC session, you launch Mimikatz's DCShadow module. The first instance runs `lsadump::dcshadow /object:CN=svc-backup,OU=Service Accounts /attribute:memberOf /value:CN=Domain Admins,CN=Builtin` to inject a service account into Domain Admins through replication. The second instance triggers the push with `lsadump::dcshadow /push`.

You inject 14 changes total: three accounts added to Domain Admins, six SPN modifications for future Kerberoasting access, and five security descriptor changes granting `GenericAll` on critical OUs to accounts you control. Every change arrives through DRS replication — the legitimate DCs accept them without question, and the security event logs show only routine replication traffic.

Your persistence is now embedded in the directory itself. Even if they rebuild the Exchange servers and rotate every password, your injected accounts and permissions remain.

---

## What Is a DCShadow Attack?

DCShadow abuses the MS-DRSR replication protocol to inject arbitrary changes into Active Directory. The attacker uses Domain Admin privileges to register a rogue DC by creating `nTDSDSA` and `server` objects in the configuration partition. Mimikatz's DCShadow module then crafts replication requests that push attribute modifications to legitimate DCs. Changes propagate through normal replication and are indistinguishable from legitimate updates in standard audit logs. Detection requires monitoring for unauthorized `nTDSDSA` object creation, anomalous replication partner registration, or comparing AD state against known-good snapshots.
