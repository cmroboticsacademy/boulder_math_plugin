Rails.application.routes.draw do

  mount BoulderMathPlugin::Engine => "/boulder_math_plugin"
end
