$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "boulder_math_plugin/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "boulder_math_plugin"
  s.version     = BoulderMathPlugin::VERSION
  s.authors     = ["Joshua Jarvis, Tom Luong, Krishna Pandravada, Jesse Flot"]
  s.email       = ["Joshua Jarvis"]
  s.homepage    = "http://cs2n.org"
  s.summary     = "Boulder Math for Rails - An educational game."
  s.description = "Boulder Math - Checkout CS2N for more details."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.15"

  s.add_development_dependency "sqlite3"
end
