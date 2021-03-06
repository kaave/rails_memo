source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.2'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'mini_racer', platforms: :ruby

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# use a ruby hash as a readonly datasource for an ActiveRecord-like model
gem 'active_hash'

# add decorator
gem 'activemodel-serializers-xml', git: 'https://github.com/rails/activemodel-serializers-xml'
gem 'draper'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

group :development, :test, :staging do
  gem 'rubocop'
  gem 'rubocop-airbnb'
end

group :development, :test do
  # run rails with npm script
  gem 'foreman'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  # change repl engine to pry
  gem 'pry-rails'
  gem 'pry-doc'
  gem 'pry-byebug'

  # check n+1 problems
  gem 'bullet'

  # load .env from project root
  gem 'dotenv-rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # watch and livereload
  gem 'guard-livereload', require: false
  # use VSCode debugger
  gem 'ruby-debug-ide'
  gem 'debase'
end

group :test do
  # test runner
  gem 'rspec-rails'
  gem 'spring-commands-rspec'
  # create dummy data
  gem 'factory_girl_rails'
  # watch code on test
  gem 'guard-rspec', require: false
  # create dummy user
  gem 'faker'
  gem 'faker-japanese'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
