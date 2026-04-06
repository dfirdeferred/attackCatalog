---
title: "The Silent Persistence — Chapter 3: AdminSDHolder Abuse"
chain: "silent-persistence"
chainOrder: 3
role: "c-level"
attack: "adminsdholder"
choices:
  - label: "Authorize an emergency AD security audit of all privileged objects"
    next: "dcshadow"
  - label: "Engage Active Directory security specialists for remediation"
    next: "dcshadow"
isDebrief: false
---

Your security team has discovered that the attacker has tampered with a critical Active Directory security mechanism. They have modified something called the "AdminSDHolder" — a hidden template that controls permissions on all privileged accounts. This means that even if your team removes the attacker's access, Active Directory will automatically restore it every 60 minutes.

The implications are staggering: the attacker has created a self-repairing backdoor within your identity infrastructure. Your CISO warns that simply resetting passwords or removing group memberships will not work — the system itself is now working against your defenders.

---

## What Is AdminSDHolder Abuse?

AdminSDHolder is a special Active Directory container that serves as a security template for all protected groups (Domain Admins, Enterprise Admins, etc.). Every 60 minutes, a process called SDProp overwrites the security descriptors on these protected accounts with the AdminSDHolder template. If an attacker modifies the AdminSDHolder ACL, they create a persistent backdoor that is automatically reapplied by Active Directory itself.
