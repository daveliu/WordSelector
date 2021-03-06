class HomeController < ApplicationController


  def index

  end

  def search
    limit  = 10

    # the fuzzily gem has some defects, so get more words first, then get 10 words from array
    @words = Word.where.not(id: session[:word_ids]).
                  find_by_fuzzy_name(params[:query], :limit => session[:word_ids].size + limit)
    @words = @words[0..9]
    render json: @words.to_json
  end

end
