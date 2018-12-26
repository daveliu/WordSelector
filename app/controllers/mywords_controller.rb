class MywordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    word = Word.find(params[:id])
    session[:word_ids] << word.id
    @words = Word.find(session[:word_ids])
    render json: @words.to_json
  end

  def index
    @words = Word.find(session[:word_ids])
    render json: @words.to_json
  end

end
