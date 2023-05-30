# ALEISTER-PRIME

WordPress Theme

### Requirements

`Aleister Prime` requires the following dependencies:

- [Node.js](https://nodejs.org/)
- [NVM](https://wptraining.md10x.com/lessons/install-nvm/) 

### Quick Start

Clone or download this repository, change its name to something else (like, say, `md-bricks`), and then you'll need to do a nine-step find and replace on the name in all the templates. **Please make sure to on capslock before start search and replace.**

1. Search for `aleister-prime` the text replace with: `md-bricks` .
2. Search for `aleister_prime` the text replace with: `md_bricks` .
3. Search for `ALEISTER-PRIME` the text replace with: `MD-BRICKS` .
4. Search for `ALEISTER_PRIME` the text replace with: `MD_BRICKS` .
5. Search for `Aleister_Prime` the text replace with: `Md_Bricks` .
6. Search for `Aleister Prime` the text replace with: `MD Bricks` .
7. Delete `phpcbf.xml`, `phpcs.xml` and `composer.json` file from theme root directory.
8. Rename class file `aleister-prime-theme/inc/classes/class-aleister-prime.php` to `aleister-prime-theme/inc/classes/class-md-bricks.php` .
9. Rename theme folder `aleister-prime-theme` to `md-bricks` .


## Build Process

**Install**

Check for Proper node version

```bash
cd assets
nvm use
```

Install Dependency

```bash
npm install
```

**During development**

```bash
npm run start
```

**Production**

```bash
npm run build
```
