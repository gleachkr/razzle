{
  description = "A very basic flake";

  inputs.flake-utils.url  = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils}: flake-utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system};
    in {

      packages.x86_64-linux.default = pkgs.stdenvNoCC.mkDerivation {
        name = "pandoc-razzle-slides";
        src = self;
        buildInputs = with pkgs; [ pandoc ];
      };

      devShell = with pkgs; mkShell { 

        buildInputs = [ 
          pandoc
          nodePackages.vscode-langservers-extracted
          nodePackages.typescript-language-server 
          nodePackages.browser-sync
        ]; 
      };
  });
}
