---
title: "The Domain Takeover — Chapter 1: LDAP Reconnaissance"
chain: "domain-takeover"
chainOrder: 1
role: "end-user"
attack: "ldap-reconnaissance"
choices:
  - label: "Report the unusual slowness to your IT helpdesk"
    next: "password-spraying"
  - label: "Ignore it — the restart fixed the problem"
    next: "password-spraying"
isDebrief: false
---

You arrive at work on a Tuesday morning and notice your computer is sluggish. Programs take longer to open, and your Outlook keeps freezing. You assume it is just Windows being slow and restart your machine.

After the reboot, things seem normal — but you did not notice the brief command-line window that flickered open during startup. In the background, a script has been harvesting information about every user and group in your company's network, all running silently under your account credentials.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance is when an attacker queries your company's Active Directory to map out all users, groups, and permissions. This typically happens after malware or a malicious script gains access to a user's account. The attacker uses your normal login privileges to gather information, which makes the activity hard for security teams to detect since it looks like regular network traffic.
