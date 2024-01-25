locals {
  has_domain      = var.domain != ""
  domain          = local.has_domain ? var.domain : "cineflex-${random_pet.website.id}"
  regional_domain = module.website.regional_domain_name

  common_tags = {
    Project = "Cineflex"
    Service = "Static Website"
    Owner   = "Yara Tavares"
  }
}
