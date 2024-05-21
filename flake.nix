{
  description = "Razzle: HTML Presentation Primitives";

  inputs.flake-utils.url  = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system};
    in {

      devShell = with pkgs; mkShell { 
        buildInputs = [ 
          nodePackages.vscode-langservers-extracted
          nodePackages.typescript-language-server 
          nodePackages.browser-sync
        ]; 
      };

    }) // {
      templates.default = { 
        path = ./template; 
        description = "A pandoc-powered razzle presentation";
      };
    };
}
