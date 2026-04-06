---
title: "The Physical Vector — Chapter 3: Zerologon"
chain: "physical-vector"
chainOrder: 3
role: "c-level"
attack: "zerologon"
choices:
  - label: "Authorize emergency patching of all domain controllers"
    next: "golden-ticket"
  - label: "Engage a specialized AD security firm for containment"
    next: "golden-ticket"
isDebrief: false
---

The cracked IT administrator credentials gave the attacker a foothold on the internal network. Now, the forensic team has discovered something far worse: the attacker exploited a vulnerability in the Netlogon protocol to reset the domain controller's machine account password to an empty string. In a single unauthenticated request, they gained Domain Admin access.

Your CISO explains that the vulnerability — CVE-2020-1472, known as Zerologon — was patched by Microsoft months ago, but the patch was never applied to your domain controllers due to concerns about compatibility with legacy systems. Those legacy systems — three aging line-of-business applications that the IT team has been requesting budget to replace for two years — are now the reason your entire Active Directory has been compromised.

The board asks the question you have been dreading: how much would replacing those legacy systems have cost? The answer: $340,000 — a fraction of the breach's projected impact.

---

## What Is Zerologon?

Zerologon (CVE-2020-1472) is a critical vulnerability in the Microsoft Netlogon Remote Protocol (MS-NRPC) that allows an unauthenticated attacker with network access to a domain controller to completely compromise the Active Directory domain. The flaw lies in a cryptographic weakness in the Netlogon authentication handshake, where the initialization vector is set to all zeros. By sending a series of Netlogon messages with zeroed credentials, an attacker can reset the domain controller's machine account password, then use that access to obtain Domain Admin privileges. The vulnerability received a CVSS score of 10.0.
