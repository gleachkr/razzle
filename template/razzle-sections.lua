function Para(el)
    if el.content == pandoc.Inlines({pandoc.Str "…"}) then
        return pandoc.RawBlock('html', '</razzle-slide><razzle-slide>')
    else
        return el
    end
end
