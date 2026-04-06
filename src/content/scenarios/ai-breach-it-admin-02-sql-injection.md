---
title: "The AI-Assisted Breach — Chapter 2: SQL Injection"
chain: "ai-breach"
chainOrder: 2
role: "it-admin"
attack: "sql-injection"
choices:
  - label: "Deploy a WAF rule to block SQL injection patterns"
    next: "lateral-movement"
  - label: "Audit the application code for parameterized queries"
    next: "lateral-movement"
isDebrief: false
---

While rotating the chatbot's credentials, you discover the damage has already progressed. The API endpoint exposed by the prompt injection was also vulnerable to SQL injection. The attacker found that the `/api/v2/customers/search` endpoint passes user input directly into a SQL WHERE clause without parameterization.

You examine the application logs and reconstruct the attack. The attacker started with a classic `' OR 1=1 --` probe to confirm the vulnerability, then escalated to UNION-based injection to enumerate database tables, column names, and row counts. Over eight hours, they systematically extracted the entire `customers` table — 2.3 million rows — using `UNION SELECT` queries that appended data to legitimate search results.

The database runs on PostgreSQL 14 with the `pg_execute_server_program` extension enabled — giving the SQL injection a path to operating system command execution via `COPY TO PROGRAM`. The attacker used this to run system commands on the database server, including `whoami` (returned `postgres`) and a reverse shell to their C2 infrastructure.

---

## What Is SQL Injection?

SQL injection occurs when an application constructs SQL queries by concatenating user-supplied input without proper sanitization or parameterization. The attacker manipulates the query structure by injecting SQL syntax — single quotes to break out of string contexts, `UNION SELECT` to append arbitrary queries, and database-specific functions for OS command execution. PostgreSQL's `COPY TO PROGRAM` and MSSQL's `xp_cmdshell` both provide paths from SQL injection to RCE. Defenses include parameterized queries (prepared statements), stored procedures, input validation, least-privilege database accounts, and Web Application Firewalls (WAFs) as a defense-in-depth layer. Static application security testing (SAST) and dynamic application security testing (DAST) can identify vulnerable patterns before deployment.
