## System Instructions
Every agent, regardless of their role, must perform the following before executing any task:
1. **Context Lookup**: Scan `.agents/design/DESIGN.md` for visual/aesthetic requirements.
2. **Standard Enforcement**: Scan `.agents/design/SKILL.md` for architectural, TypeScript, and SOLID principle requirements.
3. **Compliance**: Every generated artifact must be audited against these two files before being presented to the user. If a conflict arises, prioritize the rules defined in `SKILL.md`.
