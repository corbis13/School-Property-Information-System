import re
from html.parser import HTMLParser

class IdParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name.lower() == 'id' and value:
                self.ids.add(value)

with open('index.html', 'r', encoding='utf-8') as f:
    parser = IdParser()
    parser.feed(f.read())

selectors = set()
with open('js/app.js', 'r', encoding='utf-8') as f:
    for line in f:
        m = re.search(r"document\.querySelector(All)?\(\s*['\"]([^'\"]+)['\"]", line)
        if m:
            selectors.add(m.group(2))
        m = re.search(r"document\.getElementById\(\s*['\"]([^'\"]+)['\"]\s*\)", line)
        if m:
            selectors.add('#' + m.group(1))

print('HTML ids:', len(parser.ids))
print('JS selectors:', len(selectors))
print('Missing selectors:')
for sel in sorted(selectors):
    if sel.startswith('#') and sel[1:] not in parser.ids:
        print(sel)
