---
title: "The Silent Persistence — Chapter 3: AdminSDHolder Abuse"
chain: "silent-persistence"
chainOrder: 3
role: "end-user"
attack: "adminsdholder"
choices:
  - label: "Offer to help IT staff — even just bringing them coffee"
    next: "dcshadow"
  - label: "Start looking for news articles about your company being hacked"
    next: "dcshadow"
isDebrief: false
---

You overhear IT staff in the break room speaking in hushed, worried tones. They mention something about a "backdoor that fixes itself" and how they keep removing the attacker's access but it keeps coming back. Someone says, "It's like the system is fighting us."

You do not understand the technical details, but the mood in the office has shifted. IT staff are working late every night, and there is talk of bringing in outside security experts. Your manager assures the team that everything is under control, but the dark circles under the IT director's eyes tell a different story.

---

## What Is AdminSDHolder Abuse?

AdminSDHolder abuse is when a hacker changes a hidden setting in your company's login system that controls who has administrator access. Normally, this setting protects important accounts by checking their permissions every hour. The hacker adds themselves to this hidden setting, so even when IT removes their access, the system automatically gives it back within 60 minutes. It is like changing the master blueprint for a building's locks.
