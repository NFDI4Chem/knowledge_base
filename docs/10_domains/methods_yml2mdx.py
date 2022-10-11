#!/usr/bin/env python3

print('Hello methods_yml2mdx')

## find "methods.yml"-file as source for generator script
# if file exist
    # if yml-lint is ok

        ## delete all generated files but keep "_methods_table_mAll.mdx"
        # loop over all .md and .mdx files in this folder
            # if filename is "_methods_table_*.mdx"
                # if filename is not "_methods_table_mAll.mdx"
                    # delete file

        ## generate new method tables
        # loop over all .md and .mdx files in this folder
            # find generator artifacts in 
            # 1) header information
            # 2) "import NFDI4ChemMethods from './_methods_table.mdx';"-line 
            # 3) optional "<NFDI4ChemMethods />" in the text (eg if author changed sort of methods)

            # is file relevant for this "methods_yml2mdx"-script?
                # find methods

                # create new include line

                # create file for include

        # return "ok" to CI-pipeline to push new "_methods_table_m*.mdx" to repository

    
    # lint not ok: stop script, print message to CI-pipeline

# no file: stop script, print message to CI-pipeline

