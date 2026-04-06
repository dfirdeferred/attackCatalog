---
title: "The Domain Takeover — Chapter 6: Lateral Movement"
chain: "domain-takeover"
chainOrder: 6
role: "end-user"
attack: "lateral-movement"
choices:
  - label: "Save your work locally and disconnect from the network as instructed"
    next: "ransomware"
  - label: "Try connecting to the VPN from your personal device to keep working"
    next: "ransomware"
isDebrief: false
---

Your department's shared drive is suddenly inaccessible. When you try to open files, you get an "Access Denied" error. Your colleague in the next cubicle has the same problem. Across the building, you hear frustrated murmurs — it seems like everyone is having issues.

IT sends out a message: "We are experiencing network issues. Please save your work locally and disconnect from the network." The mood is tense. People start hearing that the company has been breached and that hackers are moving through the systems. Your manager calls a team meeting to discuss continuity plans.

---

## What Is Lateral Movement?

Lateral movement is when a hacker moves from computer to computer within your company's network. Think of it like a burglar who breaks into one room of a building and then picks locks to get into every other room. The hacker uses stolen passwords and built-in Windows tools to access servers, shared drives, and other systems, gathering more data and more control as they spread.
