default: index.md
	pandoc \
		--template ./slide-template.html \
		--lua-filter ./parseproof.lua \
		--lua-filter ./razzle-sections.lua \
		-o index.html "$<"
