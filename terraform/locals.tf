locals {
  has_domain = var.domain != ""
  domain     = local.has_domain ? var.domain : "cineflex-${random_pet.website.id}"

  common_tags = {
    Project = "Cineflex"
    Service = "Static Website"
    Owner   = "Yara Tavares"
  }
}
