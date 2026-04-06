---
title: "The Domain Takeover — Chapter 5: DCSync"
chain: "domain-takeover"
chainOrder: 5
role: "red-teamer"
attack: "dcsync"
choices:
  - label: "Begin lateral movement using the harvested credentials"
    next: "lateral-movement"
  - label: "Establish backup persistence mechanisms across the domain"
    next: "lateral-movement"
isDebrief: false
---

With your Golden Ticket granting Domain Admin access, you execute a DCSync using Mimikatz's `lsadump::dcsync /domain:corp.local /all /csv` command. The domain controller dutifully responds, sending you the NTLM hash for every account in the domain — 14,000 users, 200 service accounts, and every privileged administrator.

You prioritize extracting the KRBTGT hash (for future Golden Tickets), the Domain Admin hashes, and the hashes of accounts with delegation privileges. You also pull the `ms-Mcs-AdmPwd` attribute for LAPS-managed local admin passwords. Your exfiltration package is complete.

---

## What Is DCSync?

DCSync leverages the MS-DRSR protocol to replicate credential data from a domain controller. Any principal with `Replicating Directory Changes All` rights — which Domain Admins possess by default — can request the NTLM hash, Kerberos keys, and password history for any account. This eliminates the need to access the NTDS.dit file directly, making the attack faster and stealthier than traditional credential harvesting.
