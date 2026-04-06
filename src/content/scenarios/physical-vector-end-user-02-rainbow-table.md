---
title: "The Physical Vector — Chapter 2: Rainbow Table"
chain: "physical-vector"
chainOrder: 2
role: "end-user"
attack: "rainbow-table"
choices:
  - label: "Change your password to a long, unique passphrase"
    next: "zerologon"
  - label: "Set up a password manager to avoid reusing passwords"
    next: "zerologon"
isDebrief: false
---

The IT department sends another urgent email: "All employee passwords have been potentially compromised. You must change your password immediately." This is the second forced password reset in three months, and people around the office are grumbling.

During the required security briefing that follows, the IT security manager explains what happened. The attackers stole encrypted versions of everyone's passwords. Then they used a technique to reverse those encrypted passwords back into the original text. Your password — `Fluffy2024!` — named after your cat with a year and a symbol tacked on — was cracked in under three seconds.

You feel exposed. That was not just your work password. You used the same password for your personal email, your Amazon account, and your online banking. The security manager emphasizes that this time, you need to choose a genuinely strong password — not just a word with numbers appended. She recommends a passphrase: four or five random words strung together, at least 16 characters long.

---

## What Is a Rainbow Table Attack?

When you create a password, the computer stores a scrambled version of it called a "hash" — not the password itself. In theory, you cannot unscramble a hash to get the original password. But a rainbow table is like a giant cheat sheet. Attackers create enormous tables containing millions of passwords and their matching hashes, calculated in advance. When they steal the scrambled versions of passwords, they simply look them up in the table to find the original. Common passwords like `Password1!` or `Summer2024#` are always in these tables. The defense is using long, unpredictable passwords that are too unique to appear in any precomputed table.
