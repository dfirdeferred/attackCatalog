---
title: "The Service Account Heist — Chapter 6: NTDS.dit Extraction"
chain: "service-account-heist"
chainOrder: 6
role: "c-level"
attack: "ntds-dit"
choices:
  - label: "Review the complete incident timeline and authorize the debrief"
    next: "debrief"
  - label: "Convene the executive crisis team for the post-mortem"
    next: "debrief"
isDebrief: false
---

The worst-case scenario has arrived. Using the cascading service account access, the attacker reached a domain controller and extracted the NTDS.dit file — the database containing every password hash for every account in your Active Directory domain. Every employee, every executive, every admin, every service account. Every credential your organization has ever created.

Your CISO delivers the assessment with a grim expression: this is a total identity compromise. The only complete remediation is resetting every password in the domain — all eight thousand user accounts, all two hundred and thirty-one service accounts, and the KRBTGT account twice. The estimated business disruption: three days of reduced operations, forty-eight hours of help desk saturation, and potential downtime for every application that uses domain authentication. The estimated cost: one point four million dollars in direct incident response, plus regulatory notification obligations for the customer data accessed via the SQL Server compromise. One service account password, never rotated, cascaded into this.

---

## What Is NTDS.dit Password Extraction?

The NTDS.dit file is the Active Directory database stored on every domain controller, containing password hashes for all domain accounts. Extracting this file gives an attacker offline access to every credential in the organization. Attackers obtain it through Volume Shadow Copy, ntdsutil, or direct file system access on a compromised domain controller. Once extracted, password hashes can be cracked offline or used directly in pass-the-hash attacks. This represents the most complete form of credential compromise possible in an Active Directory environment. Prevention requires treating domain controllers as the highest-security assets in the organization, restricting who and what can access them, monitoring for shadow copy creation and database access, and implementing tiered administration to limit the accounts that can log into domain controllers.
