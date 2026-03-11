variable "cloudflare_api_token" {
  description = "Cloudflare API token with Pages and DNS permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "turnstile_secret_key" {
  description = "Cloudflare Turnstile secret key"
  type        = string
  sensitive   = true
}

variable "resend_api_key" {
  description = "Resend API key for email notifications"
  type        = string
  sensitive   = true
  default     = ""
}

variable "notification_email" {
  description = "Email address for contact form notifications"
  type        = string
  default     = ""
}
