# Installation

Currently, the only way to run the application is to clone the repo,
and compile it yourself. Releases in the somewhat near future.

## Requirements

Things required to do to get this up and running.

 * [node.js](https://nodejs.org)
   * If _not_ on Windows, use of [nvm](https://github.com/creationix/nvm)
     is strongly recommended instead of manually installing a certain version.
   * For Windows users, use [nodist](https://github.com/marcelklehr/nodist)
     instead. (_Note: If you get this to build on Windows, HMU. Have not had the
     time to resolve installation issues_)
 * The PepperFlash plug-in from Chrome
   * Location can be found by going to the URL `chrome://plugins/` and
     looking up the location of the Adobe Flash Plugin.
     
## Building manually

Assuming `node` is now installed, go to the repo root folder and
 
    $ npm install
    
    ... dependency installation ...
    
    $ npm run package
    
    ... packaging ...
    
    $ open release/darwin-x64/Dockyard-darwin-x64/Dockyard.app

And the application should start right up. Log in like manually.

If you prefer to not use the packaged version, instead

    $ npm run dev
    
will start Dockyard in developer mode. Assuming default settings,
remote debugging is available at `http://localhost:8642`.
