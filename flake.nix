{
  description = "Zangendeutsch development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    pkgs = nixpkgs.legacyPackages."x86_64-linux";
  in {
    devShells."x86_64-linux".default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs
      ];

      shellHook = ''
        # initialize direnv, if missing
        if [ ! -f .envrc ]; then
          echo "Initializing direnv..."
          echo "use flake" >> .envrc && direnv allow
        fi

        # initialize git repo, if missing
        if [ ! -d .git ]; then
          echo "Initializing git repository..."
          git init
        fi
      '';
    };
  };
}
