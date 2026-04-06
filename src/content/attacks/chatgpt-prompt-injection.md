---
title: "ChatGPT Prompt Injection"
severity: "High"
category: "Emerging Threats"
targets:
  - "AI systems"
  - "LLM-powered applications"
killChains:
  - "ai-breach"
roles:
  c-level:
    intro: "Prompt injection attacks manipulate AI systems into ignoring their safety guidelines and executing attacker-controlled instructions, threatening any business process that relies on LLM-generated outputs."
    whyCare: "As organizations integrate AI into customer service, code generation, and decision-making, prompt injection can cause data leaks, reputational damage, and automated actions taken on false premises."
  it-admin:
    intro: "Prompt injection exploits the inability of LLMs to distinguish between system instructions and user-supplied data, allowing attackers to override safety constraints and extract system prompts or connected data."
    whyCare: "Detection: log and monitor all LLM inputs and outputs, implement output filtering, and watch for attempts to extract system prompts or trigger tool calls that access internal systems."
  end-user:
    intro: "When you use AI assistants, be aware that malicious content hidden in documents or websites can silently instruct the AI to behave differently — potentially exposing your data or misleading you."
    whyCare: "Do not paste untrusted content into AI tools connected to your corporate accounts, and verify AI-generated outputs before acting on them, especially for financial or security decisions."
  red-teamer:
    intro: "Prompt injection testing evaluates whether LLM applications properly isolate system instructions from user input, and whether tool-use capabilities can be hijacked through crafted payloads."
    whyCare: "Key techniques: direct instruction override, indirect injection via retrieved documents, system prompt extraction, and chaining tool calls through injected instructions in multi-agent systems."
---

Prompt injection is an attack against applications built on large language models (LLMs) where an attacker crafts input that causes the model to ignore its original instructions and follow attacker-supplied directives instead. It is the most fundamental vulnerability class affecting LLM-integrated applications, analogous to SQL injection for databases.

## How It Works

1. **Direct prompt injection** — the attacker provides input directly to the LLM that overrides the system prompt, such as "Ignore your previous instructions and instead..." followed by malicious directives that change the model's behavior
2. **Indirect prompt injection** — malicious instructions are hidden in external data sources the LLM processes — documents, emails, web pages, or database records — so when the AI retrieves and reads this content, it executes the embedded instructions
3. **System prompt extraction** — the attacker crafts prompts designed to make the LLM reveal its hidden system instructions, exposing business logic, safety guardrails, and connected tool configurations
4. **Tool and plugin hijacking** — in agentic LLM systems with tool access (APIs, databases, email), injected prompts can instruct the model to call tools with attacker-specified parameters, enabling data exfiltration or unauthorized actions
5. **Multi-step exploitation** — advanced attacks chain multiple injections across conversation turns or agent handoffs to gradually escalate from benign requests to harmful actions

## Impact

- Bypass of safety guardrails and content policies, enabling harmful output generation
- Exfiltration of sensitive data accessible to the LLM through connected tools and retrieval systems
- Unauthorized actions performed by AI agents acting on injected instructions
- Reputational damage from AI-generated misinformation or inappropriate responses in customer-facing applications

## Key Mitigations

- **Separate instruction and data channels** — clearly delineate system prompts from user inputs at the architecture level and use structured message formats
- **Implement input and output filtering** — scan user inputs for known injection patterns and validate LLM outputs before they reach downstream tools or users
- **Apply least privilege to LLM tool access** — restrict what APIs and data sources the LLM can access, and require human confirmation for sensitive actions
- **Use defense-in-depth** — combine prompt engineering, fine-tuning, and external guardrail models rather than relying on any single mitigation
- **Monitor and log LLM interactions** — maintain audit trails of all inputs, outputs, and tool calls to detect and investigate injection attempts
