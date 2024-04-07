# Zero Dependacy CORS (zdcors)

## What is zdcors?

zdcors is a simple, zero-dependency, CORS middleware for Express.js. It is designed to be as simple as possible, and to be used as an effective replacement for the `cors` package.

> [!IMPORTANT]
> This package is not designed to be a full replacement for the `cors` package. It is designed to be a simple, zero-dependency, CORS middleware for Express.js.
>
> Future versions may include more features, and simplify the process of setting up the system.

## Installation

```bash
npm install @therealbenpai/zdcors
```

## Usage

There are mutiple classes that are available to be used.

The main code is housed in [index.js](./index.js).

The type definitions are housed in [defs.d.ts](./@types/defs.d.ts).

## Contributing

To contribute to the project, do the following steps:

First, you need to install [Node.js](https://nodejs.org/) and [npm](https://npmjs.com).

To install node, run the following command:

Windows:

```powershell
# Install Git
winget install --id Git.Git -e --source winget

# Install Node.js
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));
choco install nodejs
```

MacOS:

```bash
brew install node npm git
```

Linux:

```bash
# Ubuntu
sudo apt update
sudo apt install nodejs npm git -y
# Fedora / Red Hat
sudo dnf install nodejs npm git -y
# Arch
sudo pacman -Sy nodejs npm git
# openSUSE
sudo zypper install nodejs npm git -y
# CentOS
sudo yum install nodejs npm git -y
```

Then, clone the repository and run the following commands:

```bash
# cloning the repository
git clone "https://github.com/therealbenpai/zdcors.git"
cd zdcors
```

In your Javascript file, simply add the following code to be able to access the package:

```javascript
const cors = require('@therealbenpai/zdcors');
```
