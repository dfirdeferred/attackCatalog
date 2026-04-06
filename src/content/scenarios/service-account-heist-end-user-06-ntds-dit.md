---
title: "The Service Account Heist — Chapter 6: NTDS.dit Extraction"
chain: "service-account-heist"
chainOrder: 6
role: "end-user"
attack: "ntds-dit"
choices:
  - label: "Complete the mandatory password reset and security training"
    next: "debrief"
  - label: "Follow all recovery instructions and attend the security briefing"
    next: "debrief"
isDebrief: false
---

Friday morning brings the message everyone was dreading. A company-wide email from the CEO: "We are requiring all employees to reset their passwords immediately. This is not optional. Please also change passwords on any personal accounts where you used the same password as your work account." The help desk has extended hours. IT is personally walking floor to floor to assist anyone who needs help.

The reason is the worst possible outcome of the incident. The attacker reached the heart of the company's identity system and stole a file containing password information for every account in the organization. Even though the passwords are stored in a scrambled format, attackers have powerful tools to unscramble them, especially short or common passwords. If you reused your work password anywhere else — your bank, your personal email, your social media — those accounts are now at risk too. The company is also monitoring for the stolen data appearing on criminal marketplaces. This breach started with compromised automated accounts and ended with every employee's credentials in hostile hands.

---

## What Is NTDS.dit Password Extraction?

NTDS.dit is the master database that stores all account information for your company's network, including encrypted versions of everyone's passwords. When an attacker steals this file, they get a scrambled copy of every password in the organization. Using powerful computers, they can attempt to unscramble these passwords — starting with the shortest and most common ones. This is why the company is requiring immediate password changes: every minute that passes gives the attacker more time to crack passwords. It is also why you must change passwords on personal accounts where you reused your work password. Using unique passwords for every account — managed through a password manager — ensures that a breach at one organization does not cascade into your personal life.
