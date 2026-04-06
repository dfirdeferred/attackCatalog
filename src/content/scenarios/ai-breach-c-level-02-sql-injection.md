---
title: "The AI-Assisted Breach — Chapter 2: SQL Injection"
chain: "ai-breach"
chainOrder: 2
role: "c-level"
attack: "sql-injection"
choices:
  - label: "Retain a forensic firm to assess the database exposure"
    next: "lateral-movement"
  - label: "Notify the board and begin breach disclosure planning"
    next: "lateral-movement"
isDebrief: false
---

The exposed API endpoint from the chatbot prompt injection was just the beginning. Attackers used that endpoint to probe the backend application and discovered a SQL injection vulnerability in the customer search function. Through that single flaw, they extracted the entire customer database — 2.3 million records including names, email addresses, hashed passwords, and partial payment card data.

Your Chief Privacy Officer delivers the worst-case assessment: the breach triggers mandatory notification under GDPR, CCPA, and the breach notification laws of 47 U.S. states. The payment card data, even partial, requires PCI-DSS incident reporting. Your payment processor is threatening to increase your processing fees or terminate the relationship.

The financial projections are sobering. Breach notification costs, credit monitoring, regulatory fines, legal defense, and customer churn are estimated at $14.7 million in the first year. Your stock price dropped 6% on the security researcher's blog post alone — before the SQL injection breach was even disclosed.

---

## What Is SQL Injection?

SQL injection is a web application vulnerability that allows attackers to insert malicious database commands into application queries. When an application incorporates user input directly into SQL queries without proper validation or parameterization, an attacker can modify the query's logic to extract data, bypass authentication, modify records, or even execute operating system commands on the database server. Despite being one of the oldest and most well-documented web vulnerabilities, SQL injection consistently ranks in the OWASP Top 10 and remains a leading cause of data breaches. The fix is straightforward — parameterized queries and input validation — but legacy code and rapid development cycles continue to introduce vulnerable patterns.
