---
title: "SQL Injection / PowerUpSQL"
severity: "High"
category: "Web Application & Injection"
targets:
  - "SQL Server"
  - "Databases"
killChains:
  - "ai-breach"
roles:
  c-level:
    intro: "SQL injection attacks exploit database-connected applications to steal, modify, or destroy data, while tools like PowerUpSQL can turn a compromised SQL Server into a launchpad for domain-wide attacks."
    whyCare: "Database breaches carry severe regulatory and financial consequences — a single SQL injection can expose millions of customer records and provide attackers a path into your Active Directory environment."
  it-admin:
    intro: "SQL injection targets input validation failures in web applications, while PowerUpSQL is a post-exploitation toolkit that discovers and abuses SQL Server misconfigurations like linked servers and xp_cmdshell."
    whyCare: "Detection: monitor for unusual SQL queries in application logs, alert on xp_cmdshell or sp_OACreate execution, and audit SQL Server linked server configurations and service account privileges."
  end-user:
    intro: "SQL injection attacks target the web applications you use daily — if successful, your personal data, login credentials, and transaction history stored in databases can be stolen without you knowing."
    whyCare: "Use unique passwords for every service so that a database breach at one site does not compromise your other accounts, and watch for breach notification emails."
  red-teamer:
    intro: "PowerUpSQL automates SQL Server discovery, privilege escalation through impersonation and linked servers, and OS command execution via xp_cmdshell — ideal for pivoting from web app to domain compromise."
    whyCare: "Key techniques: enumerate SQL instances via SPN scanning, escalate through IMPERSONATE privileges and trustworthy databases, and chain linked server hops to reach sensitive segments."
---

SQL injection is a code injection technique that exploits security vulnerabilities in applications that interface with databases. When combined with tools like PowerUpSQL — a PowerShell toolkit for attacking SQL Server — what begins as a web application flaw can escalate into full domain compromise through the deep integration between SQL Server and Active Directory.

## How It Works

1. **Identify injection points** — the attacker finds application inputs (forms, URL parameters, API fields) where user-supplied data is concatenated directly into SQL queries without parameterization
2. **Extract data** — using UNION-based, error-based, or blind SQL injection techniques, the attacker retrieves database contents including user tables, credentials, and configuration data
3. **Escalate on SQL Server** — if the application connects to SQL Server, the attacker uses PowerUpSQL to enumerate linked servers, test for impersonation privileges, and identify service accounts with excessive AD permissions
4. **Achieve OS command execution** — through xp_cmdshell, sp_OACreate, or CLR assemblies, the attacker executes operating system commands on the SQL Server host under the SQL service account context
5. **Pivot to domain resources** — leveraging the SQL Server's service account (often a domain account with elevated privileges), the attacker moves laterally to other servers, accesses file shares, or performs attacks against Active Directory

## Impact

- Unauthorized access to sensitive database contents including PII, financial records, and credentials
- Data modification or destruction through INSERT, UPDATE, and DELETE injection
- Remote code execution on database servers leading to full host compromise
- Lateral movement into Active Directory if the SQL service account has domain privileges

## Key Mitigations

- **Use parameterized queries** — never concatenate user input into SQL statements; use prepared statements or stored procedures with parameters
- **Apply least privilege to SQL service accounts** — run SQL Server under managed service accounts with minimal AD permissions and no local admin rights
- **Disable dangerous features** — turn off xp_cmdshell, CLR integration, and OLE automation unless explicitly required, and audit their use
- **Audit linked servers** — review and remove unnecessary linked server connections and ensure they do not use overprivileged credentials
- **Deploy a web application firewall** — use WAF rules to detect and block common SQL injection patterns as a defense-in-depth measure
