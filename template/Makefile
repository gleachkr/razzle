default: index.md
	pandoc \
		--katex \
		--template ./slide-template.html \
		--lua-filter ./parseproof.lua \
		--lua-filter ./razzle-sections.lua \
		-o index.html "$<"
