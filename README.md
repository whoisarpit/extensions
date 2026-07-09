# Browser Extensions

Monorepo for browser extensions.

## Extensions

- **[Gemini Always Temporary Chat](gemini-always-temp/)**: automatically enables temporary chat mode when you open Google Gemini.

## Repository Layout

Each extension lives in its own subdirectory with browser-specific builds inside that directory:

```text
<extension>/
  chrome/
  firefox/
  README.md
```

Shared GitHub Actions workflows live at the repository root in `.github/workflows/`; GitHub does not discover workflow files inside extension subdirectories. Each publish job should use an extension-specific job id, GitHub Environment, artifact name, release name, and release tag prefix. Extension-specific setup, install, and publish details live in each extension directory.
