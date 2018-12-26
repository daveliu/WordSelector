Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  get '/search', to: 'home#search'
  

  resources :mywords, only: [:index, :create]
end