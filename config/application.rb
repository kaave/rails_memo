require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rails2019
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Don't generate system test files.
    config.generators.system_tests = nil

    # Timezone
    config.time_zone = 'Tokyo'
    # locales
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :ja

    # generator
    config.generators do |g|
      # no create helper
      g.helper false
      # no create JavaScript
      g.javascripts false
      # no create assets
      g.assets false

      # test settings: use RSpec
      g.test_framework :rspec,
        # create fixture
        fixtures: true,
        # no create view spec
        view_specs: false,
        # no create helper spec
        helper_specs: false,
        # no create router spec
        routing_specs: false,
        # create controller spec
        controller_specs: true,
        # no create request spec
        request_specs: false
      # use factories
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
    end
  end
end
