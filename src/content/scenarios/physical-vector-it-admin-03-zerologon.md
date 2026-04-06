---
title: "The Physical Vector — Chapter 3: Zerologon"
chain: "physical-vector"
chainOrder: 3
role: "it-admin"
attack: "zerologon"
choices:
  - label: "Apply the Netlogon patch and enable enforcement mode"
    next: "golden-ticket"
  - label: "Isolate the domain controllers and begin forensic analysis"
    next: "golden-ticket"
isDebrief: false
---

Using one of the cracked IT admin credentials, the attacker pivoted from a workstation to the internal network. Your SIEM shows a successful VPN authentication from the admin account at 22:14, followed by Netlogon traffic to the primary domain controller that does not match any normal pattern.

You analyze the packet capture and recognize the signature: repeated Netlogon authentication attempts with zeroed-out credentials — the Zerologon exploit. The attacker sent approximately 256 handshake attempts in rapid succession, each taking advantage of the flawed AES-CFB8 initialization vector in the Netlogon protocol. On attempt 212, the DC accepted the zeroed credential and the attacker reset the machine account password.

You check the patch status of your domain controllers. The August 2020 patch (KB4571694) was tested but never deployed to production. A change advisory board note from nine months ago reads: "Deferred pending legacy application compatibility testing for the Netlogon enforcement phase." That testing was never completed.

---

## What Is Zerologon?

Zerologon (CVE-2020-1472) exploits a cryptographic flaw in the Netlogon Remote Protocol's AES-CFB8 implementation. The initialization vector is statically set to 16 zero bytes, meaning that for approximately 1 in 256 randomly generated session keys, the encrypted output will also be all zeros. An attacker exploits this by repeatedly attempting Netlogon authentication with zeroed credentials until the one-in-256 condition is met. Once authenticated, the attacker can change the domain controller's machine account password, then use that access to perform a DCSync operation and extract all domain credentials. The fix requires both patching and enabling Netlogon enforcement mode to reject vulnerable connections.
