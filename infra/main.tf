terraform {
  required_version = ">= 1.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# ─── Cloudflare Pages Project ───────────────────────────────────────────────────

resource "cloudflare_pages_project" "site" {
  account_id        = var.cloudflare_account_id
  name              = "marksoper-me"
  production_branch = "main"

  build_config {
    build_command   = "npm run build"
    destination_dir = "dist"
  }

  deployment_configs {
    production {
      environment_variables = {
        NODE_VERSION = "22"
      }
    }
    preview {
      environment_variables = {
        NODE_VERSION = "22"
      }
    }
  }
}

# ─── DNS Zone (assumes marksoper.me zone already exists in Cloudflare) ───────

data "cloudflare_zone" "site" {
  name = "marksoper.me"
}

# ─── Custom Domain for Pages ────────────────────────────────────────────────────

resource "cloudflare_pages_domain" "apex" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  domain       = "marksoper.me"
}

resource "cloudflare_pages_domain" "www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  domain       = "www.marksoper.me"
}

# ─── DNS Records ────────────────────────────────────────────────────────────────

resource "cloudflare_record" "apex" {
  zone_id = data.cloudflare_zone.site.id
  name    = "@"
  content = cloudflare_pages_project.site.subdomain
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = data.cloudflare_zone.site.id
  name    = "www"
  content = cloudflare_pages_project.site.subdomain
  type    = "CNAME"
  proxied = true
}

# ─── Outputs ────────────────────────────────────────────────────────────────────

output "pages_url" {
  value       = "https://${cloudflare_pages_project.site.subdomain}"
  description = "Cloudflare Pages URL"
}

output "site_url" {
  value       = "https://marksoper.me"
  description = "Production site URL"
}
