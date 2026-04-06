---
title: "The Silent Persistence — Chapter 3: AdminSDHolder Abuse"
chain: "silent-persistence"
chainOrder: 3
role: "red-teamer"
attack: "adminsdholder"
choices:
  - label: "Register a rogue domain controller using DCShadow for deeper persistence"
    next: "dcshadow"
  - label: "Layer additional persistence via a Skeleton Key on the DC"
    next: "dcshadow"
isDebrief: false
---

You need persistence that survives credential resets and group membership changes. You target the AdminSDHolder container — Active Directory's built-in security template for all privileged accounts.

Using PowerShell and your Domain Admin access, you add a controlled service account with `GenericAll` permissions to the AdminSDHolder ACL. You verify the modification and wait. Sixty minutes later, SDProp runs and propagates your permissions to every protected object in the domain. Even if defenders remove your access from Domain Admins, SDProp will restore your `GenericAll` permissions within the hour.

---

## What Is AdminSDHolder Abuse?

AdminSDHolder is an AD container whose ACL is automatically stamped onto all protected groups and accounts by the SDProp process every 60 minutes. By adding a controlled principal to the AdminSDHolder ACL with broad permissions (`GenericAll`, `WriteDacl`, etc.), an operator creates self-healing persistence. Defenders who clean up group memberships without checking AdminSDHolder will find their remediation undone within an hour. Detection requires monitoring changes to the `CN=AdminSDHolder,CN=System` object.
