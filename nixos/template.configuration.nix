# █▄░█ █ ▀▄▀ ▄▄ █░█ █▀█
# █░▀█ █ █░█ ░░ █▄█ █▀▀

# Edit this configuration file to define what should be installed on
# your system.  Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running ‘nixos-help’).

{ config, pkgs, ...}:

# ██╗ ██╗      ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗
# ╚██╗╚██╗     ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝
#  ╚██╗╚██╗    ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗
#  ██╔╝██╔╝    ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║
# ██╔╝██╔╝     ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║
# ╚═╝ ╚═╝      ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

let #####################################################################################################

HOME-MANAGER          = fetchTarball "https://github.com/nix-community/home-manager/archive/release-23.05.tar.gz";
UNSTABLE              = fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz";
ENABLE_GRUB           = true; # CORE
ENABLE_EFI            = false;  # CORE
ENABLE_NETWORKMANAGER = true;  # HARDWARE
ENABLE_SSH            = true;  # SERVER
ENABLE_NGINX          = true;  # SERVER
ENABLE_DOCKER         = true;  # VIRTUALISATION
ENABLE_FAIL2BAN       = true;  # SERVER

HOST_NIXOS_VERSION = "23.05"; # READ DOCUMENTATION BEFORE EDITING THIS VALUE
HOST_HOSTNAME      = "^NIX_HOSTNAME";
HOST_TIMEZONE      = "^NIX_TIMEZONE";
HOST_GRUB_DEVICE   = "^NIX_DISK";
HOST_INTERFACE     = "^NIX_INTERFACE";
HOST_ADDRESS       = "^NIX_IP";
HOST_GATEWAY       = "^NIX_GATEWAY";
HOST_NAMESERVERS   = ["1.1.1.1" "1.0.0.1"];
HOST_OPEN_PORTS    = [ 1992 80 443 ];
HOST_SWAP_SIZE     = 1024;
HOST_BIN           = with pkgs; [ git unstable.neovim ];
HOST_IP_WHITELIST  = [
	"^NIX_WHITELIST"
	"93.2.26.178"
	"127.0.0.0/8"
	"10.0.0.0/8"
	"172.16.0.0/12"
	"192.168.0.0/16"
	"8.8.8.8"
	"1.1.1.1"
	"1.0.0.1"
];

NGINX_ACME_EMAIL    = "o9b9qzaa@wsz.anonaddy.com";
NGINX_MAX_SIZE      = "100M";
NGINX_URL_ANALYTICS = "https://analytics.wszki.studio/share/0e1jkSr3A2S58Hvr/Studio%20Samuel";
NGINX_REDIRECTS     = {
#"domain.com"     = "http://localhost:3000";
};

USER_NAME          = "w1630";
USER_GROUPS        = [ "wheel" ];
USER_BIN           = with pkgs.unstable; [
	nodejs
	croc
	docker-compose
];

in  #####################################################################################################
{

# ██╗ ██╗       ██████╗ ██████╗ ██████╗ ███████╗
# ╚██╗╚██╗     ██╔════╝██╔═══██╗██╔══██╗██╔════╝
#  ╚██╗╚██╗    ██║     ██║   ██║██████╔╝█████╗
#  ██╔╝██╔╝    ██║     ██║   ██║██╔══██╗██╔══╝
# ██╔╝██╔╝     ╚██████╗╚██████╔╝██║  ██║███████╗
# ╚═╝ ╚═╝       ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

	swapDevices = [ { device = "/swapfile"; size = HOST_SWAP_SIZE; } ];

	documentation.nixos.enable                         = false;
	nix.settings.auto-optimise-store                   = true;
	programs.light.enable                              = false;
	system.autoUpgrade.enable                          = false;
	system.autoUpgrade.allowReboot                     = false;
	boot.loader.grub.enable                            = ENABLE_GRUB;
	boot.loader.grub.device                            = HOST_GRUB_DEVICE;
	boot.loader.systemd-boot.enable                    = ENABLE_EFI;
	boot.loader.efi.canTouchEfiVariables               = ENABLE_EFI;
	environment.systemPackages                         = HOST_BIN;
	nixpkgs.config.allowUnfree                         = true;
	services.openssh.enable                            = ENABLE_SSH;
	services.openssh.ports                             = [ 1992 ];
	system.stateVersion                                = HOST_NIXOS_VERSION;
	time.timeZone                                      = HOST_TIMEZONE;
	networking.hostName                                = HOST_HOSTNAME;
	networking.networkmanager.enable                   = ENABLE_NETWORKMANAGER; # Easiest to use and most distros use this by default. ;
	security.polkit.enable                             = true;
	virtualisation.docker.rootless.enable              = ENABLE_DOCKER;
	virtualisation.docker.rootless.setSocketVariable   = ENABLE_DOCKER;
	users.extraGroups.vboxusers.members                = [ USER_NAME ];


	nixpkgs.config = {
		packageOverrides = pkgs: {
			unstable = import UNSTABLE {
				config = config.nixpkgs.config;
			};
		};
	};



# ██╗ ██╗      ███████╗██╗██████╗ ███████╗██╗    ██╗ █████╗ ██╗     ██╗
# ╚██╗╚██╗     ██╔════╝██║██╔══██╗██╔════╝██║    ██║██╔══██╗██║     ██║
#  ╚██╗╚██╗    █████╗  ██║██████╔╝█████╗  ██║ █╗ ██║███████║██║     ██║
#  ██╔╝██╔╝    ██╔══╝  ██║██╔══██╗██╔══╝  ██║███╗██║██╔══██║██║     ██║
# ██╔╝██╔╝     ██║     ██║██║  ██║███████╗╚███╔███╔╝██║  ██║███████╗███████╗
# ╚═╝ ╚═╝      ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝

	networking = {
		firewall.enable            = true;
		firewall.allowedTCPPorts   = HOST_OPEN_PORTS;
		defaultGateway.address     = HOST_GATEWAY;
		defaultGateway.interface   = HOST_INTERFACE;
		nameservers                = HOST_NAMESERVERS;
		extraHosts                 = '' '';
		interfaces.${HOST_INTERFACE} = {
			useDHCP          = false;
			ipv4.addresses   = [{
				address      =  HOST_ADDRESS;
				prefixLength = 24;
			}];
		};
	};

	services.sshguard = {
		enable = ENABLE_FAIL2BAN;
		blocktime = 18000;
		whitelist = HOST_IP_WHITELIST;
	};
	services.fail2ban = {
		enable = ENABLE_FAIL2BAN;
		maxretry = 5;
		ignoreIP = HOST_IP_WHITELIST;
	};

# ██╗ ██╗      ███╗   ██╗ ██████╗ ██╗███╗   ██╗██╗  ██╗
# ╚██╗╚██╗     ████╗  ██║██╔════╝ ██║████╗  ██║╚██╗██╔╝
#  ╚██╗╚██╗    ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║ ╚███╔╝
#  ██╔╝██╔╝    ██║╚██╗██║██║   ██║██║██║╚██╗██║ ██╔██╗
# ██╔╝██╔╝     ██║ ╚████║╚██████╔╝██║██║ ╚████║██╔╝ ██╗
# ╚═╝ ╚═╝      ╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝

	security.acme = {
		acceptTerms    = ENABLE_NGINX;
		defaults.email = "${NGINX_ACME_EMAIL}"; # Replace with your email address ;
	};

	services.nginx = {
		enable                   = ENABLE_NGINX;
		recommendedGzipSettings  = true;
		recommendedOptimisation  = true;
		recommendedTlsSettings   = true;
		recommendedProxySettings = true;
		virtualHosts = let
			makeVirtualHost = proxyAddr: {
				forceSSL    = true;
				enableACME  = true;
				extraConfig = ''
					client_max_body_size ${NGINX_MAX_SIZE};
				add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload" always;
				add_header X-Content-Type-Options    "nosniff"                                      always;
				add_header X-Xss-Protection          "1; mode=block"                                always;
				add_header X-Frame-Options           "SAMEORIGIN"                                   always;
				add_header Referrer-Policy           "no-referrer-when-downgrade"                   always;
				'';
				locations."/" = {
					extraConfig = if proxyAddr == "REDIRECT_TO_ANALYTICS" then ''
						rewrite ^ ${NGINX_URL_ANALYTICS} permanent;
					'' else ''
						proxy_pass ${proxyAddr};
					proxy_set_header Host            $host;
					proxy_set_header X-Real-IP       $remote_addr;
					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
					proxy_set_header Upgrade         $http_upgrade;
					proxy_set_header Connection      "upgrade";
					'';
				};
			};
		in builtins.foldl' (acc: key: acc // {
				"${key}"     = makeVirtualHost NGINX_REDIRECTS."${key}";
				"www.${key}" = makeVirtualHost NGINX_REDIRECTS."${key}";
				}) {} (builtins.attrNames NGINX_REDIRECTS);
	};


# ██╗ ██╗      ██╗   ██╗███████╗███████╗██████╗ ███████╗
# ╚██╗╚██╗     ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝
#  ╚██╗╚██╗    ██║   ██║███████╗█████╗  ██████╔╝███████╗
#  ██╔╝██╔╝    ██║   ██║╚════██║██╔══╝  ██╔══██╗╚════██║
# ██╔╝██╔╝     ╚██████╔╝███████║███████╗██║  ██║███████║
# ╚═╝ ╚═╝       ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝

	programs.fish = {
		enable = true;
		shellAliases = {
			"vim"        = "nvim";
			"update_sql" = "sudo nix-channel --add https://nixos.org/channels/nixos-23.05 nixos && sudo nix-channel --update nixos";
			"rebuild"    = "sudo nixos-rebuild switch";
			"nrc"        = "sudo nvim /etc/nixos/configuration.nix";
			"linger"     = "loginctl enable-linger $UID";
			"INIT"       =  "update_sql && linger";
		};
	};
	users = {
		mutableUsers               = true; # change this
			users.root.hashedPassword  = "!";
		users."${USER_NAME}" = {
			isNormalUser = true;
			shell        = pkgs.fish;
			extraGroups  = USER_GROUPS;
			passwordFile = "/etc/passwordFile";
#hashedPassword = "8mnm89";
		};
	};

	imports = [
		"${HOME-MANAGER}/nixos"
			./hardware-configuration.nix
#./hosts.zero.nix
	];

	home-manager.users."${USER_NAME}" = { pkgs, ... }: {
		home.stateVersion = "${HOST_NIXOS_VERSION}";
		home.packages = USER_BIN;

		programs.git = {
			enable = true;
			userName  = USER_NAME;
			userEmail = NGINX_ACME_EMAIL;
		};

	}; # -- END HOME MANAGER

# ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗██████╗
# ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║██╔══██╗
# ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║██║  ██║
# ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║██║  ██║
# ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║██████╔╝
# ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═════╝

# ON HOST:
# cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
# chmod 600 ~/.ssh/authorized_keys
# ssh-keygen -R localhost
# ssh-keyscan localhost >> ~/.ssh/known_hosts

#systemd.services =
#(pkgs.lib.mapAttrs' (name: portMapping: {
#name  = "ssh-tunnel-${name}";
#value = {
#description   = "SSH tunnel to the virtual machine";
#after         = [ "network.target" ];
#wantedBy      = [ "multi-user.target" ];
#serviceConfig = {
#Type       = "simple";
#ExecStart  = "${pkgs.openssh}/bin/ssh -N -L :${portMapping}:22 localhost";
#Restart    = "always";
#RestartSec = "30";
#User       = "${USER_NAME}";
#};
#};
#}) SSH_TUNNELS)
#//
#(pkgs.lib.mapAttrs' (name: time: {
#name  = "backup_${name}";
#value = {
#script =  ''
#source /etc/profile
#cd /home/wsz/.config/nvim
#git add . && git commit -m "backup" && git push
#'';
#serviceConfig = {
#Type      = "oneshot";
#User      = "${USER_NAME}";
#OnFailure = "source /etc/profile && echo '❌ ${name} backup failed' | ${SMS_SEND}";
#};
#};
#}) BACKUPS);

#  ██████╗██████╗  ██████╗ ███╗   ██╗
# ██╔════╝██╔══██╗██╔═══██╗████╗  ██║
# ██║     ██████╔╝██║   ██║██╔██╗ ██║
# ██║     ██╔══██╗██║   ██║██║╚██╗██║
# ╚██████╗██║  ██║╚██████╔╝██║ ╚████║
#  ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

#systemd.services."disable-cpu-boost" = {
#description = "Disable CPU boost at boot";
#wantedBy = [ "multi-user.target" ];
#serviceConfig = {
#Type = "oneshot";
#ExecStart = ''
#source /etc/profile && echo "0" | sudo tee /sys/devices/system/cpu/cpufreq/boost
#'';
#};
#};


#systemd.services.backup_global = {
#script =  ''
#source /etc/profile
#PUSH(){
#git add . && git commit -m "Cron backup $(date)" && git push
#}
#HOME=/home/${USER_NAME}
#CONFIG=$HOME/.config
#notify-send "Global backup initiated"

#cd $HOME/.dot      && ./backup.sh
#cd $HOME/.playlist && PUSH
#cd $CONFIG/nvim    && PUSH
#cd $CONFIG/kitty   && PUSH
#'';
#serviceConfig = {
#Type      = "oneshot";
#User      = "${USER_NAME}";
#OnFailure = "source /etc/profile && echo '❌ global backup failed' | ${SMS_SEND}";
#Wants = [ "network-online.target" ];
#After = [ "network-online.target" ];
#};
#};

#systemd.timers.backup_global = {
#wantedBy    = [ "timers.target" ];
#timerConfig = {
##OnCalendar = "*-*-* 03:00:00";
#OnBootSec = "180m";
#OnUnitActiveSec = "180m";
#Unit       = "backup_global.service";
#};
#};

#systemd.services.garbage_collect = {
#script =  ''
#source /etc/profile
#notify-send "Garbage collector initiated"
#nix-store --gc
#'';
#serviceConfig = {
#Type      = "oneshot";
#User      = "${USER_NAME}";
#};
#};

#systemd.timers.garbage_collect = {
#wantedBy    = [ "timers.target" ];
#timerConfig = {
#OnCalendar = "*-*-* 03:00:00";
#Unit       = "garbage_collect.service";
#};
#};


#systemd.timers = (pkgs.lib.mapAttrs' (name: time: {
#name  = "backup_${name}";
#value = {
#wantedBy    = [ "timers.target" ];
#timerConfig = {
#OnCalendar = "${time}";
#Unit       = "backup_${name}.service";
#};
#};
#}) BACKUPS);

#  ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗ ██╗███╗   ██╗███████╗██████╗ ███████╗
# ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██║████╗  ██║██╔════╝██╔══██╗██╔════╝
# ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║██╔██╗ ██║█████╗  ██████╔╝███████╗
# ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║██║╚██╗██║██╔══╝  ██╔══██╗╚════██║
# ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║██║ ╚████║███████╗██║  ██║███████║
#  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝

#networking.nat = {
#enable             = true;
#internalInterfaces = ["ve-+"];
#externalInterface  = HOST_INTERFACE;
## Lazy IPv6 connectivity for the container
#enableIPv6 = true;
#};


#containers.wsz = {
#autoStart      = true;
#privateNetwork = true;
#hostAddress    = "192.168.100.1";
#localAddress   = "192.168.100.2";
##bindMounts."/" = {
##hostPath   = "/home/wsz/nixvm";
##isReadOnly = false;
##};
#config = { config, pkgs, ... }: {
#networking.firewall.allowPing = true;
#virtualisation.docker.enable  = true;
#environment.systemPackages    = with pkgs; [ nodejs ctop htop gotop neofetch docker-compose ];
#users.users.wsz               = {
#isNormalUser = true;
#home         = "/home/wsz";
#description  = "User for SSH access to the container";
#extraGroups  = [ "wheel" "docker" ];
#password     = "p";
#};
#system.stateVersion                     = "${HOST_NIXOS_VERSION}";
#services.openssh.passwordAuthentication = true;
#services.openssh.enable                 = true;
#services.openssh.ports                  = [ 22 80 443 ];
#environment.etc."resolv.conf".text = "nameserver 1.1.1.1";


##virtualisation.oci-containers.containers.whoogle = {
##image = "benbusby/whoogle-search";
##ports = [ "0.0.0.0:5000:5000" ];
##};

##systemd.services.umami = {
##description   = "Umami";
##after         = [ "network.target" ];
##wantedBy      = [ "multi-user.target" ];
##serviceConfig = {
##Type       = "simple";
##ExecStart  = "cd /home/${USER_NAME}/umami && ${pkgs.openssh}/bin/docker compose up -d";
##Restart    = "always";
##RestartSec = "30";
##User       = "wsz";
###Group      = "docker";
##};
##};
#};
#};























}  # -- END CORE
