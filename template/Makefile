default: index.md
	pandoc \
		--katex \
		--template ./slide-template.html \
		--lua-filter ./filters/parseproof.lua \
		--lua-filter ./filters/razzle-sections.lua \
		-o index.html "$<"
