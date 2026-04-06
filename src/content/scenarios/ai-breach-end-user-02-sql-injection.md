---
title: "The AI-Assisted Breach — Chapter 2: SQL Injection"
chain: "ai-breach"
chainOrder: 2
role: "end-user"
attack: "sql-injection"
choices:
  - label: "Change your passwords for any accounts linked to the company"
    next: "lateral-movement"
  - label: "Monitor your accounts for suspicious activity"
    next: "lateral-movement"
isDebrief: false
---

Two weeks after the chatbot incident, a company-wide email announces something much worse: attackers used the information leaked by the chatbot to break into the customer database. The personal information of 2.3 million customers has been stolen — names, email addresses, and partial payment card numbers.

The announcement does not mention employees specifically, but you know the customer support team uses the same database system. Your colleague in IT quietly confirms your fear: the employee directory, which shares the same backend infrastructure, was also accessible. Your name, employee ID, email, phone number, and department are in there.

Customers are calling in, angry and scared. You spend the day fielding calls from people demanding to know if their credit card information was stolen. You do not have clear answers — the official FAQ has not been updated since this morning. One customer tells you she has already seen a fraudulent charge on her card. You feel helpless, representing a company that let this happen, while your own information may be just as exposed.

---

## What Is SQL Injection?

SQL injection is a way for attackers to trick a website into giving them access to its database. When you fill out a search box or login form on a website, the website takes what you typed and uses it to look up information in a database. In a SQL injection attack, the attacker types special computer code into those same fields. If the website does not properly check what was typed, the code runs as a command on the database — like telling the database to hand over all its records instead of just the one being searched for. It is one of the oldest hacking techniques and, unfortunately, one of the most common.
