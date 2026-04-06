---
title: "The Cloud Bridge — Chapter 5: Lateral Movement"
chain: "cloud-bridge"
chainOrder: 5
role: "end-user"
attack: "lateral-movement"
choices:
  - label: "Attend the security awareness briefing to learn what happened"
    next: "debrief"
  - label: "Review the incident summary email and complete the post-incident training"
    next: "debrief"
isDebrief: false
---

The full scope of the breach becomes clear in the all-hands meeting. What started with your compromised password cascaded across the entire company. The attacker moved from email accounts to cloud storage, then to internal applications, then to systems in other divisions. Files you shared with your team were accessed. Client data you worked with was exposed. The attacker touched systems in three different cloud providers and multiple internal networks.

You feel a wave of guilt, even though IT leadership emphasizes this was a systemic failure, not an individual one. The password you reused was the first domino, but the security architecture should have prevented it from toppling everything else. Still, you now understand viscerally how a single weak password can open a path that leads to enterprise-wide compromise. The company is offering voluntary security awareness training, and for the first time, you actually want to attend.

---

## What Is Lateral Movement?

Lateral movement is when an attacker who has broken into one account or system uses that foothold to access other accounts and systems across the organization. Imagine a burglar who finds an unlocked window in one office and then uses the hallways and internal doors to reach the executive suite, the server room, and the filing cabinets. In the digital world, attackers hop between email accounts, cloud storage, internal applications, and business systems using stolen credentials and trusted connections between services. This is why organizations implement security controls at every level — so that even if an attacker gets through one door, they cannot move freely through the rest of the building.
