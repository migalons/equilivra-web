FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Install Node.js 20 (matching CI)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set the default shell to bash
SHELL ["/bin/bash", "-c"]

# Verify installations
RUN node --version && npm --version
