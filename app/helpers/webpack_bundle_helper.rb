module WebpackBundleHelper
  class BundleNotFound < StandardError; end

  def javascript_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.js")

    options = {
      src: path,
      defer: true
    }.merge(options)

    # async と defer を両方指定した場合、ふつうは async が優先されるが、
    # defer しか対応してない古いブラウザの挙動を考えるのが面倒なので、両方指定は防いでおく
    if options[:async]
      options.delete(:defer)
    end

    javascript_include_tag '', **options
  end

  def stylesheet_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.css")

    options = {
      href: path
    }.merge(options)

    stylesheet_link_tag '', **options
  end

  # image_bundle_tag の場合は、entry はちゃんと拡張子付きで書いて欲しい
  def image_bundle_tag(entry, **options)
    raise ArgumentError, "Extname is missing with #{entry}" unless File.extname(entry).present?
    image_tag asset_bundle_path(entry), **options
  end

  private

  MANIFEST_PATH = 'public/packs/manifest.json'.freeze

  private

    def asset_host
      Rails.application.config.asset_host || ''
    end

    def dev_server_host
      # "http://#{Rails.application.config.dev_server_host}"
      "http://localhost:13000"
    end

    def pro_manifest
      File.read('public/packs/manifest.json')
    end

    def dev_manifest
      OpenURI.open_uri("#{dev_server_host}/packs/manifest.json").read
    end

    def test_manifest
      File.read('public/packs-test/manifest.json')
    end

    def manifest
      return @manifest ||= JSON.parse(pro_manifest) if Rails.env.production?
      return @manifest ||= JSON.parse(dev_manifest) if Rails.env.development?
      return @manifest ||= JSON.parse(test_manifest)
    end

    def valid_entry?(entry)
      return true if manifest.key?(entry)
      raise BundleNotFound, "Could not find bundle with name #{entry}"
    end

    def asset_bundle_path(entry, **options)
      valid_entry?(entry)
      asset_path(asset_host + manifest.fetch(entry), **options)
    end
end
