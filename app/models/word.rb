class Word < ApplicationRecord
  fuzzily_searchable :name

  def self.import_text
    words = []
    File.open(File.join(Rails.root, "words.txt"), "r").each do |line|
      words << Word.new(name: line.strip)
    end
    Word.import words
  end

end
