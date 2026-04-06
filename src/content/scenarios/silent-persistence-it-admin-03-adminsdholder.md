---
title: "The Silent Persistence — Chapter 3: AdminSDHolder Abuse"
chain: "silent-persistence"
chainOrder: 3
role: "it-admin"
attack: "adminsdholder"
choices:
  - label: "Immediately audit and clean the AdminSDHolder ACL"
    next: "dcshadow"
  - label: "Disable the SDProp service temporarily while you investigate"
    next: "dcshadow"
isDebrief: false
---

During your investigation, you discover something that makes your blood run cold. The attacker has modified the Access Control List on the AdminSDHolder object in Active Directory. They have added a seemingly innocuous service account with `GenericAll` permissions on the AdminSDHolder container.

You know what this means: every 60 minutes, the SDProp process copies these permissions to every protected account in the domain — Domain Admins, Enterprise Admins, Schema Admins, and more. Even if you remove the attacker's access from a privileged group, SDProp will silently restore it within the hour.

---

## What Is AdminSDHolder Abuse?

AdminSDHolder abuse is a persistence technique that exploits Active Directory's built-in security propagation mechanism. The AdminSDHolder container's ACL is automatically applied to all protected objects (accounts in privileged groups like Domain Admins) every 60 minutes by the SDProp process. By modifying the AdminSDHolder ACL, an attacker creates a backdoor that AD itself maintains and restores, making it extremely difficult to eradicate without specifically knowing to check the AdminSDHolder object.
