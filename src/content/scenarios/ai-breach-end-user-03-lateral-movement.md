---
title: "The AI-Assisted Breach — Chapter 3: Lateral Movement"
chain: "ai-breach"
chainOrder: 3
role: "end-user"
attack: "lateral-movement"
choices:
  - label: "Follow the new security procedures IT has implemented"
    next: "malware"
  - label: "Ask your manager how this affects your team's work"
    next: "malware"
isDebrief: false
---

IT sends a new round of emergency instructions. Several internal systems are being taken offline for "security remediation," and you are told to change your passwords again — this time for every internal application, not just your main login. The VPN is temporarily disabled. Remote workers are told to come into the office or stand by for further instructions.

Over coffee, a friend in the development team explains what happened in terms you can understand: the attackers got in through the customer-facing chatbot, broke into the database behind it, and then "walked" through the network to reach internal systems — like someone breaking into the lobby of a building and finding that all the internal doors were unlocked.

Your team's shared drive is one of the systems taken offline. Three months of project files, client deliverables, and your current sprint work are inaccessible. Your manager is on a conference call trying to get an ETA for restoration. A rumor circulates that the attackers may have accessed the development environment where the company's proprietary software is built. People are starting to update their LinkedIn profiles.

---

## What Is Lateral Movement?

Lateral movement is when attackers move from one system to another inside a company's network after breaking in. Imagine a building where breaking into one office gives you a keycard that works on every other office in the building. In a computer network, attackers use stolen passwords, security tokens, or software vulnerabilities to jump from one computer or server to the next, looking for more valuable data each time. They might start on a web server facing the internet, move to an internal database, then to the company's file servers and email systems. Good security design creates barriers between these areas, but when those barriers are missing or misconfigured, attackers can reach everything.
