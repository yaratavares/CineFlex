data "template_file" "s3-public-policy" {
  template = file("policy.json")

  vars = {
    bucket_name = local.domain
  }
}

module "logs" {
  source        = "github.com/chgasparoto/terraform-s3-object-notification?ref=v1.0.3"
  name          = "${local.domain}-logs"
  force_destroy = !local.has_domain
  acl           = "log-delivery-write"
  tags          = local.common_tags

}

module "website" {
  source        = "github.com/chgasparoto/terraform-s3-object-notification?ref=v1.0.3"
  name          = local.domain
  acl           = "public-read"
  force_destroy = !local.has_domain
  policy        = data.template_file.s3-public-policy.rendered
  tags          = local.common_tags


  versioning = {
    enabled = true
  }

  filepath = "${path.module}/../website/build"

  website = {
    index_document = "index.html"
    error_document = "index.html"
  }

  logging = {
    target_bucket = module.logs.name
    target_prefix = "access/"
  }
}

module "redirect" {
  source        = "github.com/chgasparoto/terraform-s3-object-notification?ref=v1.0.3"
  name          = "www.${local.domain}"
  force_destroy = !local.has_domain
  tags          = local.common_tags
  acl           = "public-read"



  website = {
    redirect_all_requests_to = local.has_domain ? var.domain : module.website.website
  }
}
