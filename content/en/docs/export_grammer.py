import re

a = re.compile(r'### (\S+)\s+([^#]+)')

import glob

fs = glob.glob('**/*.md', recursive=True)
for f in fs:
  content = open(f).read()
  if f.startswith('新版标准日本语初级上册'):
    nn = 'n5'
  elif f.startswith('新版标准日本语初级下册'):
    nn = 'n4'
  elif f.startswith('五十音'):
    continue
  else:
    nn = 'n3'
  for t in a.findall(content):
    grammer_title = t[0].replace('/', '').replace('<sub>', '')
    grammer_content = t[1].replace('>', '')
    fw = open('../grammar/'+nn+'/'+grammer_title + ".md", 'w+')
    fw.write("""---
title: ${title}
toc: false
date: 2022-08-05T22:39:19+08:00
lastmod: 2022-08-05T22:39:19+08:00
contributors: ["HarborZeng"]
---

""".replace("${title}", '【'+nn.upper()+'】'+grammer_title))
    fw.write(grammer_content)
    fw.flush()
    fw.close()
