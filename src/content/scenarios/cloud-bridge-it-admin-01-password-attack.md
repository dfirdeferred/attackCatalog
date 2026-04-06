---
title: "The Cloud Bridge — Chapter 1: Password Attack"
chain: "cloud-bridge"
chainOrder: 1
role: "it-admin"
attack: "password-attack"
choices:
  - label: "Analyze the failed login patterns in Azure AD sign-in logs"
    next: "pass-the-cookie"
  - label: "Enable smart lockout and deploy banned password lists"
    next: "pass-the-cookie"
isDebrief: false
---

Your monitoring dashboard erupts at 3:12 AM. Azure AD sign-in logs show a sustained brute-force campaign hitting your tenant — forty-two thousand failed authentications in under two hours, distributed across three hundred source IPs to stay below per-IP lockout thresholds. The attack is targeting a curated list of executives and finance team members, using password variants that combine names, company terminology, and common patterns.

You pull the logs into your SIEM and correlate with Have I Been Pwned data. Three of the targeted accounts used passwords found in previous breach dumps. Those three accounts now show successful authentications from unfamiliar geolocations. You immediately trigger a conditional access policy to block sign-ins from untrusted locations, but the damage window is already open.

---

## What Is a Password Attack?

A password attack encompasses any method of compromising user credentials through guessing, cracking, or bypassing authentication. Brute-force attacks systematically try all possible combinations. Dictionary attacks use wordlists of common passwords and variations. Credential stuffing replays stolen username-password pairs from other breaches. Hybrid attacks combine dictionary words with character substitutions and appended numbers. From a defensive standpoint, mitigation involves enforcing long and complex passwords, deploying banned password lists, enabling account lockout policies with smart lockout to prevent denial of service, requiring MFA on all accounts, and monitoring authentication logs for anomalous patterns such as impossible travel or distributed low-rate spraying.
