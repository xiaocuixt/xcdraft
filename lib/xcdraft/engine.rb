module Xcdraft
  class Engine < ::Rails::Engine
    initializer 'xcdraft.load_static_assets' do |app|
      app.middleware.use ::ActionDispatch::Static, "#{root}/vendor"
    end
  end
end