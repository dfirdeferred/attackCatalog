---
title: "The Zero-Day Cascade — Chapter 6: Ransomware"
chain: "zero-day-cascade"
chainOrder: 6
role: "red-teamer"
attack: "ransomware"
choices:
  - label: "Review the full kill chain and operational tradecraft"
    next: "debrief"
  - label: "Analyze detection gaps exploited at each stage"
    next: "debrief"
isDebrief: false
---

The final objective is maximum impact. Three days before detonation, you use the DCShadow-injected backup admin account to log into the Veeam server and delete all recovery points. You then modify the backup job schedules to point at a null target, so the deletion is not immediately obvious.

On detonation night, you compile a custom ransomware payload — AES-256 for file encryption, RSA-4096 for key wrapping, multi-threaded I/O for speed. You use PsExec with the Domain Admin credentials to deploy the binary to every server in the domain simultaneously. The payload checks for backup processes, shadow copies, and recovery partitions, eliminating them before beginning encryption.

The attack detonates at 02:47 — chosen to maximize the window before the first admin arrives. Within 12 minutes, 97% of server volumes are encrypted. The ransom note deploys to every accessible desktop. You monitor your exfiltration staging server: 2.3 terabytes of data already copied out over the past week provides the double-extortion leverage.

---

## What Is Ransomware?

From an offensive perspective, ransomware is the monetization phase of a network compromise. Modern ransomware operations involve weeks of pre-deployment activity: credential harvesting, backup destruction, data exfiltration, and staging. The encryption payload itself is typically commodity code — the operational value lies in the access and preparation. Deployment via PsExec, Group Policy, or WMI provides simultaneous execution across thousands of endpoints. Double extortion (encrypt + exfiltrate) and triple extortion (adding DDoS or contacting victims' clients) increase payment pressure. Ransomware-as-a-Service platforms offer affiliate programs with 70-80% revenue splits.
