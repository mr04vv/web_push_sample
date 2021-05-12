Rails.application.routes.draw do
  namespace 'api' do
    resources :notifications
    post "sleep_notify", :to => "notifications#sleep_notify"
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
