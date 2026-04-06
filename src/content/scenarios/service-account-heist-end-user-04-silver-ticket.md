---
title: "The Service Account Heist — Chapter 4: Silver Ticket"
chain: "service-account-heist"
chainOrder: 4
role: "end-user"
attack: "silver-ticket"
choices:
  - label: "Report the suspicious data access notification to IT security"
    next: "service-account-attacks"
  - label: "Change your application passwords and monitor your accounts"
    next: "service-account-attacks"
isDebrief: false
---

You receive an automated notification from your company's data loss prevention system: "Unusual access detected on records associated with your department." The notification is vague, and when you call IT, the help desk agent sounds unusually stressed. They ask you to log out of all company applications immediately and not to log back in until further notice.

The truth is more alarming than IT is letting on. An attacker has forged what amounts to a fake VIP pass for your company's database system. This counterfeit pass looks completely legitimate to the database — it bears the right cryptographic signatures and claims the holder has full administrative access. The attacker has been quietly browsing customer records, financial data, and internal documents for almost two weeks. The data associated with your department was accessed, and IT is now working to determine exactly what was viewed and whether any of it was copied. The "unusual access" notification you received is the tip of a much larger iceberg.

---

## What Is a Silver Ticket Attack?

A Silver Ticket attack is like counterfeiting a backstage pass for a specific venue. In your company's computer systems, employees use digital "tickets" to prove they are allowed to access databases, file shares, and applications. A Silver Ticket is a forged version of this pass that the attacker creates using a stolen service password. The fake pass looks completely real to the target system, and because it is verified locally rather than checked with a central authority, there is no record of it being issued. This means the attacker can access sensitive data without triggering normal security alerts. If IT asks you to log out of applications unexpectedly, it may be because they have detected or suspect this kind of attack and need to secure the affected systems.
