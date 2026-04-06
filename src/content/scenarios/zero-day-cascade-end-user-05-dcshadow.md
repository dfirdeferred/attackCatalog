---
title: "The Zero-Day Cascade — Chapter 5: DCShadow"
chain: "zero-day-cascade"
chainOrder: 5
role: "end-user"
attack: "dcshadow"
choices:
  - label: "Verify your account permissions with IT"
    next: "ransomware"
  - label: "Request a full audit of your account activity"
    next: "ransomware"
isDebrief: false
---

Your manager calls a team meeting with an unusual request: everyone needs to verify their system access levels. During the investigation, IT discovered that several employee accounts had been secretly given administrator-level permissions they never requested and should not have. Your account is one of them.

You check your network drives and are startled to discover you can now access folders belonging to the finance department, HR personnel files, and the executive leadership's shared space. Yesterday, you could only see your own department's folder. No one from IT authorized this change.

The situation feels surreal. The company directory shows new user accounts you have never heard of — people who apparently work in your department but whom no one has ever met. IT confirms these are phantom accounts created by the attackers to maintain hidden access to the network, camouflaged among legitimate employees.

---

## What Is a DCShadow Attack?

DCShadow is a highly advanced attack where hackers trick your company's network into accepting fake updates to the system that manages all user accounts and permissions. Think of it as someone sneaking into the HR department and modifying employee records — adding phantom employees, giving real employees unauthorized promotions, or changing who has keys to which offices. Because the changes are injected through the system's own trusted update process, they look completely legitimate. Even IT administrators may not notice the modifications without specifically comparing current records against known-good backups.
