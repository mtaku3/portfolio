local lsp = require("lsp")
local none_ls = require("none-ls")

lsp.setup("tsserver", {})
lsp.setup("tailwindcss", {})

none_ls.register({
  none_ls.builtins.formatting.prettierd,
})
