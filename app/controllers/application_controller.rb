class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :init_session

  def init_session
    session[:word_ids] ||= []
  end


end
